use std::sync::Arc;
use chrono::{DateTime, Local};
use colored::Colorize;
use futures_util::future;
use teo_result::{Error, Result};
use teo_runtime::config::server::Server;
use teo_runtime::namespace::Namespace;
use actix_http::body::MessageBody;
use actix_http::{Method as HttpMethod};
use actix_web::{App, FromRequest, HttpRequest, HttpResponse, HttpServer, web};
use actix_web::dev::{ServiceFactory, ServiceRequest, ServiceResponse};
use actix_web::middleware::DefaultHeaders;
use key_path::path;
use teo_parser::ast::handler::HandlerInputFormat;
use teo_runtime::action::Action;
use teo_runtime::handler::action::builtin_action_handler_from_name;
use teo_runtime::handler::Handler;
use teo_runtime::handler::handler::Method;
use teo_runtime::{connection, request};
use teo_runtime::connection::transaction;
use teo_runtime::handler::default::{create, find_first, find_many, find_unique, update, upsert, copy, create_many, update_many, copy_many, delete_many, count, aggregate, group_by, delete};
use teo_runtime::model::Model;
use teo_runtime::response::Response;
use teo_teon::Value;
use crate::cli::entrance::Entrance;
use crate::cli::runtime_version::RuntimeVersion;
use crate::server::parse::{parse_form_body, parse_json_body};
use teo_runtime::handler::input::{validate_and_transform_json_input_for_handler, validate_and_transform_json_input_for_builtin_action};
use crate::server::error::WrapError;
use crate::server::request::RequestImpl;
use crate::server::responder::IntoHttpResponse;

fn make_server_app(
    main_namespace: &'static Namespace,
    conf: &'static Server,
) -> App<impl ServiceFactory<
    ServiceRequest,
    Response = ServiceResponse<impl MessageBody>,
    Config = (),
    InitError = (),
    Error = actix_web::Error,
> + 'static> {
    let app = App::new()
        .wrap(DefaultHeaders::new()
            .add(("Access-Control-Allow-Origin", "*"))
            .add(("Access-Control-Allow-Methods", "OPTIONS, POST, GET"))
            .add(("Access-Control-Allow-Headers", "*"))
            .add(("Access-Control-Max-Age", "86400")))
        .default_service(web::route().to(move |http_request: HttpRequest, mut payload: web::Payload| async move {

            // validate path
            let path = main_namespace.handler_map.remove_path_prefix(http_request.path(), conf.path_prefix.as_ref().map(|s| s.as_str()));
            let method = method_from(http_request.method())?;
            let match_result = if let Some(m_result) = main_namespace.handler_map.r#match(method, path) {
                m_result
            } else if let Some(m_result) = main_namespace.handler_map.default_match(method, path) {
                m_result
            } else {
                Err(teo_runtime::path::Error::not_found(path![]))?
            };
            let dest_namespace = if let Some(d) = main_namespace.namespace_at_path(&match_result.namespace_path()) {
                d
            } else {
                Err(teo_runtime::path::Error::not_found_message_only())?
            };
            let handler_resolved = if let Some(model) = dest_namespace.models.get(match_result.group_name()) {
                if let Some(group) = dest_namespace.model_handler_groups.get(match_result.group_name()) {
                    if let Some(handler) = group.handlers.get(match_result.handler_name()) {
                        (dest_namespace, HandlerResolved::Custom(handler))
                    } else {
                        if let Some(action) = builtin_action_handler_from_name(match_result.handler_name()) {
                            (dest_namespace, HandlerResolved::Builtin(model, action))
                        } else {
                            Err(teo_runtime::path::Error::not_found_message_only())?
                        }
                    }
                } else {
                    if let Some(action) = builtin_action_handler_from_name(match_result.handler_name()) {
                        (dest_namespace, HandlerResolved::Builtin(model, action))
                    } else {
                        Err(teo_runtime::path::Error::not_found_message_only())?
                    }
                }
            } else if let Some(group) = dest_namespace.handler_groups.get(match_result.group_name()) {
                if let Some(handler) = group.handlers.get(match_result.handler_name()) {
                    (dest_namespace, HandlerResolved::Custom(handler))
                } else {
                    Err(teo_runtime::path::Error::not_found_message_only())?
                }
            } else {
                Err(teo_runtime::path::Error::not_found_message_only())?
            };
            let dest_namespace = handler_resolved.0;
            let handler_resolved = handler_resolved.1;
            if method == Method::Options {
                // special handle for options
                let conn_ctx = connection::Ctx::from_namespace(main_namespace);
                let transaction_ctx = transaction::Ctx::new(conn_ctx);
                let ctx = request::Ctx::new(
                    request::Request::new(Arc::new(RequestImpl::new(http_request.clone()))),
                    Arc::new(Value::Null),
                    transaction_ctx,
                    match_result
                );
                return Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async {
                    Ok(Response::empty())
                }).await?.into_http_response(http_request.clone()));
            }
            // parse body
            let mut format = HandlerInputFormat::Json;
            match handler_resolved {
                HandlerResolved::Custom(handler) => {
                    format = handler.format;
                }
                _ => (),
            }
            let json_body = match format {
                HandlerInputFormat::Json => parse_json_body(payload).await?,
                HandlerInputFormat::Form => parse_form_body(http_request.clone(), payload).await?,
            };
            match handler_resolved {
                HandlerResolved::Builtin(model, action) => {
                    let body = validate_and_transform_json_input_for_builtin_action(model, action, &json_body, main_namespace)?;
                    let conn_ctx = connection::Ctx::from_namespace(main_namespace);
                    let transaction_ctx = transaction::Ctx::new(conn_ctx);
                    let ctx = request::Ctx::new(
                        request::Request::new(Arc::new(RequestImpl::new(http_request.clone()))),
                        Arc::new(body),
                        transaction_ctx,
                        match_result.clone(),
                    );
                    return match match_result.handler_name() {
                        "findMany" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            find_many(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "findFirst" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            find_many(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "findUnique" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            find_unique(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "create" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            create(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "delete" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            delete(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "update" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            update(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "upsert" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            upsert(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "copy" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            copy(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "createMany" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            create_many(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "updateMany" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            update_many(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "copyMany" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            copy_many(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "deleteMany" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            delete_many(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "count" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            count(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "aggregate" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            aggregate(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        "groupBy" => Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, &|ctx: request::Ctx| async move {
                            group_by(&ctx).await
                        }).await?.into_http_response(http_request.clone())),
                        _ => Err(teo_runtime::path::Error::not_found_message_only())?,
                    };
                },
                HandlerResolved::Custom(handler) => {
                    let body = validate_and_transform_json_input_for_handler(handler, &json_body, main_namespace)?;
                    let conn_ctx = connection::Ctx::from_namespace(main_namespace);
                    let transaction_ctx = transaction::Ctx::new(conn_ctx);
                    let ctx = request::Ctx::new(
                        request::Request::new(Arc::new(RequestImpl::new(http_request.clone()))),
                        Arc::new(body),
                        transaction_ctx,
                        match_result
                    );
                    return Ok::<HttpResponse, WrapError>(dest_namespace.middleware_stack.call(ctx, handler.call).await?.into_http_response(http_request.clone()));
                }
            }
        }));
    app
}

pub(crate) async fn serve(
    namespace: &'static Namespace,
    conf: &'static Server,
    runtime_version: &'static RuntimeVersion,
    entrance: &'static Entrance,
    silent: bool,
) -> Result<()> {
    let bind = conf.bind.clone();
    let port = bind.1;
    let server = HttpServer::new(move || {
        make_server_app(namespace, conf)
    })
        .bind((bind.0, bind.1 as u16))
        .unwrap()
        .run();
    let result = future::join(server, server_start_message(port as u16, runtime_version, entrance, silent)).await;
    result.1
}

async fn server_start_message(port: u16, runtime_version: &'static RuntimeVersion, entrance: &'static Entrance, silent: bool) -> Result<()> {
    if silent { return Ok(()) }
    // Introducing
    let now: DateTime<Local> = Local::now();
    let now_formatted = format!("{now}").dimmed();
    let teo_version = env!("CARGO_PKG_VERSION");
    let teo = format!("Teo {}", teo_version);
    println!("{} {} ({}, {})", now_formatted, teo, runtime_version.to_string(), entrance.to_str());
    // Listening
    let now: DateTime<Local> = Local::now();
    let now_formatted = format!("{now}").dimmed();
    let port_str = format!("{port}").bold();
    let text = "Listening";
    println!("{} {} on port {}", now_formatted, text, port_str);
    Ok(())
}

fn method_from(m: &HttpMethod) -> Result<Method> {
    Ok(match m.as_str() {
        "GET" => Method::Get,
        "POST" => Method::Post,
        "PATCH" => Method::Patch,
        "PUT" => Method::Put,
        "DELETE" => Method::Delete,
        "OPTIONS" => Method::Options,
        _ => Err(Error::new(format!("unknown http method {}", m.as_str())))?
    })
}

enum HandlerResolved<'a> {
    Custom(&'a Handler),
    Builtin(&'a Model, Action),
}
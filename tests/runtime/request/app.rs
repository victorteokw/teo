use teo_runtime::request::Request;
use teo_runtime::response::Response;
use teo_runtime::{request, teon};
use teo::app::App;
use teo::result::Result;
use crate::lib::schema_path::schema_path_args;

pub fn load_app() -> Result<App> {
    let app = App::new_with_argv(
        schema_path_args(file!(), "schema.teo")
    )?;
    app.main_namespace().define_handler("inspect", |req: Request| async move {
        let content_type = req.headers().get("content-type").unwrap().to_str().unwrap();
        Ok(Response::teon(teon!({
            "path": req.path(),
            "queryString": req.query_string(),
            "contentTypeFromHeader": content_type,
            "contentType": req.content_type(),
            "method": req.method(),
        })))
    });
    app.main_namespace().define_handler("echo", |ctx: request::Ctx| async move {
        let captures = ctx.handler_match().captures();
        let echo = captures.get("data").unwrap();
        Ok(Response::string(echo, "text/plain"))
    });
    app.main_namespace().define_handler("echoMore", |ctx: request::Ctx| async move {
        let captures = ctx.handler_match().captures();
        let echo = captures.get("data").unwrap();
        Ok(Response::string(echo, "text/plain"))
    });
    app.main_namespace().define_handler("echoJsonBody", |ctx: request::Ctx| async move {
        Ok(Response::teon(ctx.body().clone()))
    });
    app.main_namespace().define_handler("echoFormBody", |ctx: request::Ctx| async move {
        let filepath = ctx.body().get("avatar").unwrap().as_file().unwrap().filepath.clone();
        Ok(Response::teon(teon!({
            "name": ctx.body().get("name").unwrap(),
            "avatar": filepath
        })))
    });
    Ok(app)
}
use std::sync::Arc;
use teo_result::{Result};
use teo_runtime::config::connector::Connector;
use teo_runtime::connection::connection::Connection;
use teo_runtime::database::database::Database;
use teo_runtime::namespace::Namespace;
use teo_sql_connector::connector::SQLConnection;
use teo_sql_connector::schema::dialect::SQLDialect;

pub async fn connect_databases(namespace: &mut Namespace) -> Result<()> {
    may_connect_database(namespace).await?;
    for namespace in namespace.namespaces.values_mut() {
        may_connect_database(namespace).await?;
    }
    Ok(())
}

pub async fn may_connect_database(namespace: &mut Namespace) -> Result<()> {
    if namespace.connector.is_none() { return Ok(()) }
    let connector = namespace.connector.as_ref().unwrap();
    let connection = connection_for_connector(connector).await;
    namespace.connection = Some(connection);
    Ok(())
}

async fn connection_for_connector(connector: &Connector) -> Arc<dyn Connection> {
    Arc::new(SQLConnection::new(
        match connector.provider {
            Database::MongoDB => unreachable!(),
            Database::MySQL => SQLDialect::MySQL,
            Database::PostgreSQL => SQLDialect::PostgreSQL,
            Database::SQLite => SQLDialect::SQLite,
        },
        connector.url.as_str(),
        false,
    ).await)
}
pub mod core;
pub(crate) mod parser;
pub(crate) mod connectors;
pub(crate) mod gen;
pub(crate) mod seeder;
pub(crate) mod purger;
pub mod app;

pub mod prelude {
    pub use crate::app::App;
    pub use crate::app::builder::AppBuilder;
    pub use crate::core::graph::Graph;
    pub use crate::core::graph::builder::GraphBuilder;
    pub use crate::core::teon::Value;
    pub use crate::teon;
    pub use crate::core::object::Object;
    pub extern crate tokio;
    pub use tokio::main;
    pub extern crate key_path;
    pub use key_path::path;
    pub use crate::core::result::Result;
    pub use crate::core::error::Error;
}

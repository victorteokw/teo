use async_trait::async_trait;
use crate::core::pipeline::item::Item;
use crate::core::pipeline::ctx::Ctx;
use crate::prelude::Value;
use crate::core::result::Result;
#[derive(Debug, Clone)]
pub struct EllipsisModifier {
    ellipsis: String,
    width: Value,
}

impl EllipsisModifier {
    pub fn new(ellipsis: impl Into<String>, width: impl Into<Value>) -> Self {
        Self { ellipsis: ellipsis.into(), width: width.into() }
    }
}

#[async_trait]
impl Item for EllipsisModifier {
    async fn call<'a>(&self, ctx: Ctx<'a>) -> Result<Ctx<'a>> {
        match ctx.value.as_str() {
            None => ctx.internal_server_error("Value is not string."),
            Some(s) => {
                let arg = self.width.resolve(ctx.clone()).await?;
                let width = arg.as_i64().unwrap() as usize;
                if s.len() <= width {
                    ctx
                } else {
                    let ellipsis = &self.ellipsis;
                    ctx.with_value(Value::String(s.chars().take(width).collect::<String>() + ellipsis))
                }
            }
        }
    }
}

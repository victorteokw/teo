use crate::parser::ast::comment_block::CommentBlock;
use crate::parser::ast::decorator::Decorator;
use crate::parser::ast::field::ASTField;
use crate::parser::ast::identifier::ASTIdentifier;
use crate::parser::ast::span::Span;

#[derive(Debug)]
pub struct ASTModel {
    pub(crate) id: usize,
    pub(crate) source_id: usize,
    pub(crate) identifier: ASTIdentifier,
    pub(crate) comment_block: Option<CommentBlock>,
    pub(crate) fields: Vec<ASTField>,
    pub(crate) decorators: Vec<Decorator>,
    pub(crate) span: Span,
    pub(crate) resolved: bool,
    pub(crate) scalar_field_enum: Vec<String>,
    pub(crate) scalar_field_and_cached_property_enum: Vec<String>,
    pub(crate) direct_relation_enum: Vec<String>,
}

impl ASTModel {
    pub(crate) fn new(id: usize, source_id: usize, identifier: ASTIdentifier, comment_block: Option<CommentBlock>, fields: Vec<ASTField>, decorators: Vec<Decorator>, span: Span) -> Self {
        Self {
            id, source_id, identifier, comment_block, fields, decorators, span, resolved: false,
            scalar_field_enum: vec![], scalar_field_and_cached_property_enum: vec![],
            direct_relation_enum: vec![],
        }
    }

    pub(crate) fn resolve(&mut self, scalar_field_enum: Vec<String>, scalar_field_and_cached_property_enum: Vec<String>, direct_relation_enum: Vec<String>) {
        self.scalar_field_enum = scalar_field_enum;
        self.scalar_field_and_cached_property_enum = scalar_field_and_cached_property_enum;
        self.direct_relation_enum = direct_relation_enum;
    }
}

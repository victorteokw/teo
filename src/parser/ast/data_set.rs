use crate::parser::ast::expression::DictionaryLiteral;
use crate::parser::ast::identifier::ASTIdentifier;
use crate::parser::ast::span::Span;
use crate::prelude::Value;

#[derive(Debug, Clone)]
pub struct ASTDataSet {
    pub(crate) id: usize,
    pub(crate) source_id: usize,
    pub(crate) span: Span,
    pub(crate) identifier: ASTIdentifier,
    pub(crate) auto_seed: bool,
    pub(crate) notrack: bool,
    pub(crate) groups: Vec<DataSetGroup>,

}

impl ASTDataSet {
    pub(crate) fn new(span: Span, source_id: usize, item_id: usize, identifier: ASTIdentifier, auto_seed: bool, notrack: bool, groups: Vec<DataSetGroup>) -> Self {
        Self {
            id: item_id, span, source_id, auto_seed, groups, identifier, notrack,
        }
    }
}

#[derive(Debug, Clone)]
pub struct DataSetGroup {
    pub(crate) id: usize,
    pub(crate) source_id: usize,
    pub(crate) identifier: ASTIdentifier,
    pub(crate) span: Span,
    pub(crate) records: Vec<DataSetRecord>,
}

impl DataSetGroup {
    pub(crate) fn new(source_id: usize, item_id: usize, identifier: ASTIdentifier, span: Span, records: Vec<DataSetRecord>) -> Self {
        Self {
            id: item_id, span, source_id, identifier, records
        }
    }
}

#[derive(Debug, Clone)]
pub struct DataSetRecord {
    pub(crate) id: usize,
    pub(crate) source_id: usize,
    pub(crate) identifier: ASTIdentifier,
    pub(crate) span: Span,
    pub(crate) dictionary: DictionaryLiteral,
    pub(crate) resolved: Option<Value>,
}

impl DataSetRecord {
    pub(crate) fn new(source_id: usize, item_id: usize, identifier: ASTIdentifier, span: Span, dictionary: DictionaryLiteral) -> Self {
        Self {
            id: item_id, source_id, identifier, span, dictionary, resolved: None
        }
    }
}
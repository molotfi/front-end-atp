use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Query {
    #[serde(default = "default_bool")]
    reduction: bool,

    #[serde(default = "default_bool")]
    extension: bool,

    #[serde(default = "default_bool")]
    extension_inc: bool,

    #[serde(default = "default_bool")]
    extension_exc: bool,

    #[serde(default = "default_limit_depth")]
    limit_search_depth: i32,

    #[serde(default = "default_bool")]
    conjunctive: bool,

    #[serde(default = "default_bool")]
    sort: bool,

    problem: String,
}

fn default_bool() -> bool {
    false
}

fn default_limit_depth() -> i32 {
    1
}
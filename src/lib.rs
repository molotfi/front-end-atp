mod utils;
use utils::log;

use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use meancop::main;

#[derive(Serialize, Deserialize, Debug)]
struct Query {
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

#[wasm_bindgen]
pub fn run(data : &str) {
    /*
     * TODO: error handling
     * possible solution is to return serde_json::Result;
     * that way the frontend would be able to print error message if one occurs.
     */
    let json : Query = serde_json::from_str(data).unwrap();
    log(&*format!("{:?}", json));
}
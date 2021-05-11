use wasm_bindgen::prelude::*;
use wasm_logger;
use log::info;
use meancop::Query;
use meancop::start::{test, wasm_main};



#[wasm_bindgen]
pub fn run(data : &str) {
    wasm_logger::init(wasm_logger::Config::default());
    /*
     * TODO: error handling
     * possible solution is to return serde_json::Result;
     * that way the frontend would be able to print error message if one occurs.
     */
    let json : Query = serde_json::from_str(data).unwrap();
    info!("{}", &*format!("{:?}", json));
    test();
    wasm_main();
}
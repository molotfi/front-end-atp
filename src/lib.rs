use wasm_bindgen::prelude::*;
use meancop::start::main;


#[wasm_bindgen]
pub fn run(data : &str) -> String {
    main(data)
}
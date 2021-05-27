use wasm_bindgen::prelude::*;
use meancop::start::main;
extern crate console_error_panic_hook;


#[wasm_bindgen]
pub fn run(data : &str) -> String {
    init_panic_hook();
    main(data)
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}
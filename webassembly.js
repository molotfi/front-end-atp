import init, { helloworld } from './pkg/webassembly.js'

async function run() {
    await init()
    const input = document.getElementById("webassembly_input").value
    document.getElementById("webassembly_output").textContent = helloworld(input)
    return false
}

window.run = run
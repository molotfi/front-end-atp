import init, { run } from './pkg/webassembly.js'

async function webassembly(json) {
    await init()
    run(json)
    return false
}

async function debug() {
    let debugJSON = '{"problem": "fof(1, conjecture, ((![X]: ((~p(X) | q(f(X))) => (q(X) & (q(a) => r(b)) & ~r(X))) & q(f(b))) => p(a)))."}'
    webassembly(debugJSON)
}

debug()
window.webassembly = webassembly
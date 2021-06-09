import init, {run} from './pkg/webassembly.js'

export async function webassembly(json) {
    await init()
    return run(json)
}

export async function debug() {
    let debugJSON = '{' +
        '"cuts": {' +
            '"reduction": false, ' +
            '"extension": null' +
        '}, ' +
        '"conj": true, ' +
        '"nopaths": false, ' +
        '"lim": null, ' + // Meant to give errors
        '"problem": "fof(1, conjecture, ((![X]: ((~p(X) | q(f(X))) => (q(X) & (q(a) => r(b)) & ~r(X))) & q(f(b))) => p(a))).\\n"' +
        '}'
    console.log(JSON.parse(debugJSON))
    console.log(await webassembly(debugJSON))
}

window.webassembly = webassembly
window.debug = debug
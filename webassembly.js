import init, { run } from './pkg/webassembly.js'

export async function webassembly(json) {
    await init()
    let proof = run(json)
    //document.getElementById("output").innerHTML = proof;
    return proof
}

export async function debug() {
    let debugJSON = '{' +
        '"cuts": {' +
            '"reduction": false, ' +
            '"extension": null' +
        '}, ' +
        '"conj": false, ' +
        '"nopaths": false, ' +
        '"lim": 1, ' +
        '"problem": "% This problem corresponds to the formula F# given in Section 2 of the article\\n% \\"nanoCoP: A Non-clausal Connection Prover\\" by Jens Otten,\\n% published at IJCAR 2016.\\nfof(1, conjecture, (\\n  ( p(a)\\n  & ( ( (q(f(f(c))) & ![X]: (q(f(X)) => q(X)))\\n      & ~q(c)\\n      )\\n    | ![Y]: (p(Y) => p(g(Y)))\\n    )\\n  ) => ?[Z]: p(g(g(Z))))).\\n\\n% (~((q(f(f(c))) & ![X]: (q(f(X)) => q(X))) => q(c))))).\\n\\n"' +
        '}'
    console.log(JSON.parse(debugJSON))
    console.log(await webassembly(debugJSON))
}

window.webassembly = webassembly
window.debug = debug
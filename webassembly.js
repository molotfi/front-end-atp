import init, { run } from './pkg/webassembly.js'

export async function webassembly(json) {
    await init()
    let proof = run(json)
    console.log(proof)
    return false
}

export async function debug() {
    let debugJSON = '{' +
        '"cut": true, ' +
        '"cuts": {' +
            '"reduction": true, ' +
            '"extension": "Inclusive"' +
        '}, ' +
        '"conj": false, ' +
        '"nopaths": false, ' +
        '"lim": null, ' +
        '"problem": "% This problem corresponds to the formula F# given in Section 2 of the article\\n% \\"nanoCoP: A Non-clausal Connection Prover\\" by Jens Otten,\\n% published at IJCAR 2016.\\nfof(1, conjecture, (\\n  ( p(a)\\n  & ( ( (q(f(f(c))) & ![X]: (q(f(X)) => q(X)))\\n      & ~q(c)\\n      )\\n    | ![Y]: (p(Y) => p(g(Y)))\\n    )\\n  ) => ?[Z]: p(g(g(Z))))).\\n\\n% (~((q(f(f(c))) & ![X]: (q(f(X)) => q(X))) => q(c))))).\\n\\n"' +
        '}'
    webassembly(debugJSON)
}

window.webassembly = webassembly
window.debug = debug
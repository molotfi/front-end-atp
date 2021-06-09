//import {webassembly} from "./webassembly.js";

let contents = new Map();

function enableEvalFileSelection() {
    document.getElementById('file-selector').style.display = "inline-block"
}

function start() {
    return new Date();
}

function end(startTime) {
    var endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    // timeDiff /= 1000;

    // get seconds
    // console.log(milliseconds + " seconds");
    return Math.round(timeDiff)
}

function cfgAndProblemToJson(cfg, problem) {
    // Starting with the default obj with everything disabled and no problem
    let obj = {
        cuts: {
            reduction: false,
            extension: null
        },
        conj: false,
        nopaths: false,
        lim: null,
        problem: ""
    };

    // overwriting the properties of the object with parameter data
    if (cfg.includes("reduction")) obj.cuts.reduction = true;

    if (cfg.includes("extension-inc")) obj.cuts.extension = "Inclusive"
    else if (cfg.includes("extension-exc")) obj.cuts.extension = "Exclusive"

    if (cfg.includes("conj")) obj.conj = true;

    obj.problem = problem;

    return obj
}

async function wasmEval() {

    const cfgs = [
        ["conj"],
        ["conj", "reduction"],
        ["conj", "extension-inc"],
        ["conj", "extension-exc"],
        ["conj", "reduction", "extension-inc"],
        ["conj", "reduction", "extension-exc"],
    ]

    var outputs = {}
    var zip = new JSZip();

    for (const cfg of cfgs) {
        const cutsr = cfg.indexOf("reduction");
        const cutsex = cfg.indexOf("extension-exc");
        const cutsei = cfg.indexOf("extension-inc");

        var configStr = JSON.parse(JSON.stringify(cfg))
        if (cutsr !== -1 && cutsex !== -1) {
            configStr.splice(Math.min(cutsr, cutsex), 2, "cutsrex")
        } else if (cutsr !== -1 && cutsei !== -1) {
            configStr.splice(Math.min(cutsr, cutsei), 2, "cutsrei")
        } else if (cutsr === -1 && cutsex !== -1) {
            configStr.splice(cutsex, 1, "cutsex")
        } else if (cutsr === -1 && cutsei !== -1) {
            configStr.splice(cutsei, 1, "cutsei")
        } else if (cutsr !== -1 && cutsei === -1 && cutsex === -1) {
            configStr.splice(cutsr, 1, "cutsr")
        }

        configStr = "meancop--" + configStr.join("--")
        outputs[configStr] = {}

        for (const [filename, problem] of contents) {
            let jsonObj = cfgAndProblemToJson(cfg, problem.replace(/\r\n/g, "\n"));
            const startTime = start();
            await webassembly(JSON.stringify(jsonObj));
            outputs[configStr][filename] = end(startTime);
        }

        var folder = zip.folder(configStr);
        Object.entries(outputs).forEach(([config, configResults]) => {
            Object.entries(configResults).forEach(([filename, time]) => {
                // console.log(config, filename, time)
                var filenameStr = filename.toString() + ".time"
                folder.file(filenameStr, time.toString())
            })
        })
    }

    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "o.zip");
        });
}

// var textFile = null,
// makeTextFile = function (text) {
//     var data = new Blob([text], {type: 'text/plain'});
//
//     // If we are replacing a previously generated file we need to
//     // manually revoke the object URL to avoid memory leaks.
//     if (textFile !== null) {
//         window.URL.revokeObjectURL(textFile);
//     }
//
//     textFile = window.URL.createObjectURL(data);
//     console.log(textFile)
//
//     // returns a URL you can use as a href
//     return textFile;
// };
//
// var create = document.getElementById('download');
//
// create.addEventListener('click', function () {
//     var link = document.createElement('a');
//     link.setAttribute('download', 'info.txt');
//     link.href = makeTextFile(output);
//     document.body.appendChild(link);
//
//     // wait for the link to be added to the document
//     window.requestAnimationFrame(function () {
//         var event = new MouseEvent('click');
//         link.dispatchEvent(event);
//         document.body.removeChild(link);
//     });
//
// }, false);

/**
 *  Simple JavaScript Promise that reads a file as text.
 **/
function readFileAsText(file){
    return new Promise(function(resolve,reject){
        let fr = new FileReader();

        fr.onload = function(){
            resolve(fr.result);
        };

        fr.onerror = function(){
            reject(fr);
        };

        fr.readAsText(file);
    });
}

// Handle multiple fileuploads
window.onload=function(){
    document.getElementById("file-selector").addEventListener("change", function(ev){
        let files = ev.currentTarget.files;
        let readers = [];

        // Abort if there were no files selected
        if(!files.length) return;

        // Store promises in array
        for(let i = 0;i < files.length;i++){
            readers.push(readFileAsText(files[i]));
        }

        let problems;
        // Trigger Promises
        Promise.all(readers).then((values) => {
            // Values will be an array that includes an item
            // with the text of every selected file
            // ["File1 Content", "File2 Content" ... "FileN Content"]
            for(let i = 0;i < files.length;i++){
                contents.set(files[i].name, values[i])
            }
        });

    }, false);
}

window.wasmEval = wasmEval
window.enableEvalFileSelection = enableEvalFileSelection
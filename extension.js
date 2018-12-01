let vscode = require('vscode');
let fs = require("fs");

function activate(context) {
    let codeReplace = vscode.commands.registerCommand("extension.codeReplace", function () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) return;
        let ename = editor.document.fileName.substring(editor.document.fileName.lastIndexOf("."), editor.document.fileName.length);
        let res = editor.document.getText().match(/\{\{(((?!}}).)+)\}\}/g); //["{{key}}","{{key1}}"]

        let errorArr = [];
        let cacheObj = {};
        editor.edit(function (builder) {
            res.map(function (value) {
                let text = editor.document.getText();
                let prop = value.replace(/[{}\s]/g, ""); //key
                let start = editor.document.positionAt(text.indexOf(value));
                let end = editor.document.positionAt(text.indexOf(value) + value.length);
                let range = editor.document.validateRange(new vscode.Range(start, end));
                // editor.document.getWordRangeAtPosition();

                let path = prop + ename;
                try {
                    if (cacheObj[path]) {
                        builder.replace(range, cacheObj[path]);
                    } else {
                        let filestr = fs.readFileSync(`${vscode.workspace.rootPath}/ctr-tmps/${path}`).toString();
                        cacheObj[path] = filestr;
                        builder.replace(range, filestr);
                        // fs.readFile(`${vscode.workspace.rootPath}/ctr-tmps/${prop}${ename}`,(err,filestr)=>{
                        //     filestr = filestr.toString();
                        //     cacheObj[`${prop}${ename}`] = filestr;
                        //     builder.replace(range, filestr);
                        // })
                    }
                } catch (error) {
                    console.warn('error: ', error);
                    errorArr.push(prop);
                }
            })
        }).then(function (res) {
            console.log(...errorArr);
        }, err => {
            console.log('err: ', err);
        });
    })
    context.subscriptions.push(codeReplace);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
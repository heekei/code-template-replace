let vscode = require('vscode');
let fs = require("fs");

function activate(context) {
    let codeReplace = vscode.commands.registerCommand("extension.codeReplace", function () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) return;
        let ename = editor.document.fileName.substring(editor.document.fileName.lastIndexOf("."), editor.document.fileName.length);
        let res = editor.document.getText().match(/\{\{(((?!}}).)+)\}\}/g); //["{{key}}","{{key1}}"]

        let errorArr = [];
        editor.edit(function (builder) {
            res.map(function (value) {
                let text = editor.document.getText();
                let prop = value.replace(/[{}\s]/g, ""); //key
                let start = editor.document.positionAt(text.indexOf(value));
                let end = editor.document.positionAt(text.indexOf(value) + value.length);
                let range = new vscode.Range(start, end);
                try {
                    let filestr = fs.readFileSync(`${vscode.workspace.rootPath}/ctr-tmps/${prop}${ename}`);
                    builder.replace(range, filestr.toString());
                } catch (error) {
                    errorArr.push(prop);
                }
            })
        }).then(function (res) {
            console.log(res, errorArr);
        });
    })
    context.subscriptions.push(codeReplace);
}
exports.activate = activate;
function deactivate() {}
exports.deactivate = deactivate;

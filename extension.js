// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let fs = require("fs");

function activate(context) {
    let codeReplace = vscode.commands.registerCommand("extension.codeReplace", function () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        // let fname = editor.document.fileName.substring(0, editor.document.fileName.lastIndexOf("."));
        let ename = editor.document.fileName.substring(editor.document.fileName.lastIndexOf("."), editor.document.fileName.length);
        // let getConfig = vscode.workspace.getConfiguration;
        // let config = getConfig("codeReplace");
        // let templates = config.templates;
        let res = editor.document.getText().match(/\{\{([^}}]+)?\}\}/g); //["{{key}}","{{key1}}"]
        // let reg = new RegExp(/\{\{(\w+?)\}\}/g);

        let errorArr = [];
        editor.edit(function (builder) {
            res.map(function (value) {
                let text = editor.document.getText();
                let prop = value.replace(/[\{|\}]/g, ""); //key
                let start = editor.document.positionAt(text.indexOf(value));
                let end = editor.document.positionAt(text.indexOf(value) + value.length);
                let range = new vscode.Range(start, end);
                try {
                    let filestr = fs.readFileSync(vscode.workspace.rootPath + "/ctr-tmps/" + prop + ename);
                    builder.replace(range, filestr.toString());
                } catch (error) {
                    errorArr.push(prop);
                }
            })
        }).then(function (res) {
            console.log(res, errorArr);
        });
        // res.map(function (value) {
        //     let text = editor.document.getText();
        //     let prop = value.replace(/[\{|\}]/g, ""); //key
        //     let start = editor.document.positionAt(text.indexOf(value));
        //     let end = editor.document.positionAt(text.indexOf(value) + value.length);
        //     let range = new vscode.Range(start, end);
        //     // var data = fs.readFileSync(vscode.workspace.rootPath + "/templates/" + prop + ename)
        //     // console.log(data)

        //     let filestr = fs.readFileSync(vscode.workspace.rootPath + "/ctr-tmps/" + prop + ename);
        // })
    })
    context.subscriptions.push(codeReplace);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
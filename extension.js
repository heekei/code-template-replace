// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let fs = require("fs");

function activate(context) {
    let codeReplace = vscode.commands.registerCommand("extension.codeReplace", function () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) { return; }
        // let fname = editor.document.fileName.substring(0, editor.document.fileName.lastIndexOf("."));
        let ename = editor.document.fileName.substring(editor.document.fileName.lastIndexOf("."), editor.document.fileName.length);
        // let getConfig = vscode.workspace.getConfiguration;
        // let config = getConfig("codeReplace");
        // let templates = config.templates;
        let res = editor.document.getText().match(/\{\{(\w+?)\}\}/g);//["{{key}}","{{key1}}"]
        // let reg = new RegExp(/\{\{(\w+?)\}\}/g);

        // let edit = new vscode.WorkspaceEdit();
        res.map(function (value) {
            let text = editor.document.getText();
            let prop = value.replace(/[\{|\}]/g, "");//key
            let start = editor.document.positionAt(text.indexOf(value));
            let end = editor.document.positionAt(text.indexOf(value) + value.length);
            let range = new vscode.Range(start, end);
            fs.readFile(vscode.workspace.rootPath + "/templates/" + prop + ename, function (err, data) {
                // if (err) { return console.error(err); }
                if (err) { return; }
                // applyEdit(editor,coords,data.toString())
                // var edit = new vscode.WorkspaceEdit();
                // edit.replace(editor.document.uri, range, data.toString());
                // vscode.workspace.applyEdit(edit)    

                editor.edit(function (builder) {
                    builder.replace(range, data.toString());
                    // editor.document.save();
                }).then(function (b) {
                    console.log(prop + " " + b)
                })
                
            });
            // var data = fs.readFileSync(vscode.workspace.rootPath + "/templates/" + prop + ename);
            // edit.replace(editor.document.uri, range, data.toString());
            // vscode.workspace.applyEdit(edit)
        })
    })
    context.subscriptions.push(codeReplace);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
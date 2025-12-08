import * as vscode from 'vscode';

const insertSnippet = async (text: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    // Create a new snippet
    const snippet = new vscode.SnippetString();
    
    // Split the text by lines and append each line
    const lines = text.split('\n');
    lines.forEach((line, index) => {
        snippet.appendText(line);
        // Add newline for all lines except the last one
        if (index < lines.length - 1) {
            snippet.appendText('\n');
        }
    });

    // Insert the snippet at the current cursor position
    await editor.insertSnippet(snippet);
}

export default insertSnippet;
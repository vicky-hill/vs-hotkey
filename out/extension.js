"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const handleController_1 = __importDefault(require("./cases/handleController"));
const handleFunctions_1 = __importDefault(require("./cases/handleFunctions"));
const handleModel_1 = __importDefault(require("./cases/handleModel"));
const expressView_1 = __importDefault(require("./view/expressView"));
const sequelizeView_1 = __importDefault(require("./view/sequelizeView"));
const editor_1 = require("./utils/editor");
const handleRoutes_1 = __importDefault(require("./cases/handleRoutes"));
function activate(context) {
    console.log('Hot Key extension is now active!');
    // Register the hello world command
    const helloWorld = vscode.commands.registerCommand('hotkey.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Hot Key!');
    });
    // Register the insert snippet command (triggered by F14 key - remapped from Caps Lock)
    const insertSnippet = vscode.commands.registerCommand('hotkey.insertSnippet', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return vscode.commands.executeCommand('type', { text: '\n' });
        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line);
        const lineText = line.text;
        await vscode.env.clipboard.writeText(lineText.trim());
        console.log(lineText);
        const input = lineText.trim();
        const untrimmedInput = lineText.trimEnd();
        await editor.edit(editBuilder => {
            editBuilder.delete(line.range);
        });
        const fileType = (0, editor_1.getFileType)();
        if (fileType === 'controller')
            await (0, handleController_1.default)(input);
        if (fileType === 'functions')
            await (0, handleFunctions_1.default)(untrimmedInput);
        if (fileType === 'model')
            await (0, handleModel_1.default)(input);
        if (fileType === 'routes')
            await (0, handleRoutes_1.default)(input);
    });
    // Register the express prompts command
    const expressPrompts = vscode.commands.registerCommand('hotkey.expressPrompts', async () => {
        // Create and show webview panel
        const panel = vscode.window.createWebviewPanel('expressPrompts', 'Express Prompts', vscode.ViewColumn.One, {});
        panel.webview.html = expressView_1.default;
    });
    const sequelizePrompts = vscode.commands.registerCommand('hotkey.sequelizePrompts', async () => {
        // Create and show webview panel
        const panel = vscode.window.createWebviewPanel('sequelizePrompts', 'Sequelize Prompts', vscode.ViewColumn.One, {});
        panel.webview.html = sequelizeView_1.default;
    });
    // Register the create route folders command
    const createRouteFolders = vscode.commands.registerCommand('hotkey.createRouteFolders', async (uri) => {
        // Determine the target folder
        let targetPath;
        // Try to get URI from parameter (context menu)
        if (uri && uri.fsPath) {
            try {
                const stat = fs.statSync(uri.fsPath);
                targetPath = stat.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath);
            }
            catch (error) {
                console.error('Error reading path:', error);
            }
        }
        // If no URI, prompt user to select a folder
        if (!targetPath) {
            console.log('No URI, prompting user to select folder');
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders || workspaceFolders.length === 0) {
                vscode.window.showErrorMessage('No workspace folder open');
                return;
            }
            const selectedFolder = await vscode.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                defaultUri: workspaceFolders[0].uri,
                openLabel: 'Select Folder'
            });
            if (!selectedFolder || selectedFolder.length === 0) {
                return; // User cancelled
            }
            targetPath = selectedFolder[0].fsPath;
            console.log('Target path from user selection:', targetPath);
        }
        // Prompt user for route name
        const routeName = await vscode.window.showInputBox({
            prompt: 'Enter the route name (e.g., products)',
            placeHolder: 'products',
            validateInput: (value) => {
                if (!value || value.trim() === '') {
                    return 'Route name cannot be empty';
                }
                if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                    return 'Route name can only contain letters, numbers, hyphens, and underscores';
                }
                return null;
            }
        });
        if (!routeName) {
            return; // User cancelled
        }
        const folderPath = path.join(targetPath, routeName);
        try {
            // Create the folder
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            // Create the 4 files
            const files = [
                `${routeName}.controller.ts`,
                `${routeName}.functions.ts`,
                `${routeName}.model.ts`,
                `${routeName}.routes.ts`
            ];
            for (const fileName of files) {
                const filePath = path.join(folderPath, fileName);
                if (!fs.existsSync(filePath)) {
                    fs.writeFileSync(filePath, '', 'utf8');
                }
            }
            vscode.window.showInformationMessage(`Created route folder "${routeName}" with 4 files`);
            // Open the first file
            const firstFilePath = path.join(folderPath, files[0]);
            const document = await vscode.workspace.openTextDocument(firstFilePath);
            await vscode.window.showTextDocument(document);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error creating route folder: ${error}`);
        }
    });
    context.subscriptions.push(helloWorld, insertSnippet, expressPrompts, sequelizePrompts, createRouteFolders);
}
/**
 * This method is called when your extension is deactivated
 */
function deactivate() { }
//# sourceMappingURL=extension.js.map
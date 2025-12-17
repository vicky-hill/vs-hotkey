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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepoName = exports.getProjectName = exports.getFileResourceName = exports.getFileType = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const getFileType = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.log('No editor');
        return 'none';
    }
    const filename = editor.document.fileName.split('/').pop() || 'untitled';
    const fileType = filename.split('.')[1];
    return fileType;
};
exports.getFileType = getFileType;
const getFileResourceName = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.log('No editor');
        return 'none';
    }
    const filename = editor.document.fileName.split('/').pop() || 'untitled';
    const fileResourceName = filename.split('.')[0] || 'none';
    return fileResourceName;
};
exports.getFileResourceName = getFileResourceName;
const getProjectName = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.log('No editor');
        return 'none';
    }
    const projectName = path.basename(path.dirname(path.dirname(editor.document.fileName)));
    return projectName;
};
exports.getProjectName = getProjectName;
const getRepoName = () => {
    const repoName = path.basename(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '');
    return repoName;
};
exports.getRepoName = getRepoName;
//# sourceMappingURL=editor.js.map
import { FileType } from '../extension'
import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

export const getFileType = () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        console.log('No editor')
        return 'none';
    }

    const filename = editor.document.fileName.split('/').pop() || 'untitled';
    const fileType: FileType = filename.split('.')[1] as FileType;

    return fileType;
}

export const getFileResourceName = () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        console.log('No editor')
        return 'none';
    }

    const filename = editor.document.fileName.split('/').pop() || 'untitled';
    const fileResourceName = filename.split('.')[0] || 'none';

    return fileResourceName;
}

export const getProjectName = () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        console.log('No editor')
        return 'none';
    }

    const projectName = path.basename(path.dirname(path.dirname(editor.document.fileName)));

    return projectName;
}

export const getRepoName = () => {
    const repoName = path.basename(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '');
    return repoName;
}
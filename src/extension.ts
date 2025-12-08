import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import handleController from './cases/handleController'
import handleFunctions from './cases/handleFunctions'
import handleModel from './cases/handleModel'
import expressView from './view/expressView'

export type FileType = 'controller' | 'functions' | 'routes' | 'model' | 'slice' | 'tsx'


export function activate(context: vscode.ExtensionContext) {
	console.log('Hot Key extension is now active!');

	// Register the hello world command
	const helloWorld = vscode.commands.registerCommand('hotkey.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Hot Key!');
	});

	// Register the insert snippet command (triggered by F14 key - remapped from Caps Lock)
	const insertSnippet = vscode.commands.registerCommand('hotkey.insertSnippet', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) return vscode.commands.executeCommand('type', { text: '\n' });

		const position = editor.selection.active;
		const line = editor.document.lineAt(position.line);
		const lineText = line.text.trim();

		const input = lineText.trim();
		const filename = editor.document.fileName.split('/').pop() || 'untitled';

		const fileResourceName: string = filename.split('.')[0];
		const fileType: FileType = filename.split('.')[1] as FileType;
		const projectName = path.basename(path.dirname(path.dirname(editor.document.fileName)));
		const repoName = path.basename(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '');

		// Delete the trigger text
		await editor.edit(editBuilder => {
			editBuilder.delete(line.range);
		});

		if (fileType === 'controller') await handleController(input, fileResourceName);
		if (fileType === 'functions') await handleFunctions(input, fileResourceName);
		if (fileType === 'model') await handleModel(input, fileResourceName, projectName, repoName);
	});

	// Register the express prompts command
	const expressPrompts = vscode.commands.registerCommand('hotkey.expressPrompts', async () => {
		// Create and show webview panel
		const panel = vscode.window.createWebviewPanel(
			'expressPrompts',
			'Express Prompts',
			vscode.ViewColumn.One,
			{}
		);

		panel.webview.html = expressView;
	});

	// Register the create route folders command
	const createRouteFolders = vscode.commands.registerCommand('hotkey.createRouteFolders', async (uri?: vscode.Uri) => {
		// Determine the target folder
		let targetPath: string | undefined;

		// Try to get URI from parameter (context menu)
		if (uri && uri.fsPath) {
			try {
				const stat = fs.statSync(uri.fsPath);
				targetPath = stat.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath);
			} catch (error) {
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

		} catch (error) {
			vscode.window.showErrorMessage(`Error creating route folder: ${error}`);
		}
	});

	context.subscriptions.push(helloWorld, insertSnippet, expressPrompts, createRouteFolders);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() { }

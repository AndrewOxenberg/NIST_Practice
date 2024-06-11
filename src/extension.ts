import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { TopLevelProvider } from './topLevelExplorer';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('test.sayHello', () => { console.log('Hello World!'); }));

	const rootPath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
			? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

			
	if (rootPath) {
		const topLevelProvider = new TopLevelProvider(rootPath);

		vscode.window.createTreeView('topLevelExplorer', {
			treeDataProvider: topLevelProvider
		});
		vscode.commands.registerCommand('topLevelExplorer.refreshEntry', () =>
			topLevelProvider.refresh()
		);

		vscode.workspace.onDidCreateFiles(() => topLevelProvider.refresh());
        vscode.workspace.onDidDeleteFiles(() => topLevelProvider.refresh());
        vscode.workspace.onDidChangeWorkspaceFolders(() => topLevelProvider.refresh());
	}

	
	
}

// this method is called when your extension is deactivated
export function deactivate() {}




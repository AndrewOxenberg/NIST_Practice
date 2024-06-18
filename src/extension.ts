import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { TopLevelProvider } from './topLevelExplorer';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	// let openCommand = vscode.commands.registerCommand('extension.openFile', (fileUri: vscode.Uri) => {
	// 	// Open the file
	// openFile(fileUri);});
	// context.subscriptions.push(openCommand);
	
	context.subscriptions.push(vscode.commands.registerCommand('test.sayHello', () => { console.log('Hello World!'); }));

	const rootPath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
			? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

			
	// vscode.commands.registerCommand('topLevelExplorer.openFile', (fileUri: vscode.Uri) => { 
	// 	openFile(fileUri);
	// });

	let topLevelProvider: TopLevelProvider;

	if (rootPath) {
		
		topLevelProvider = new TopLevelProvider(rootPath);
		vscode.window.createTreeView('topLevelExplorer', {
			treeDataProvider: topLevelProvider
		});
		vscode.commands.registerCommand('topLevelExplorer.refreshEntry', () =>
			topLevelProvider.refresh()
		);

		
		// const config = vscode.workspace.getConfiguration('andrew');
		// const settingConfig: string | undefined = config.get(`autorefresh`);

		// // vscode.commands.executeCommand('setContext', 'andrew.autorefresh', settingConfig);

		// if (settingConfig && settingConfig.localeCompare("true") === 0) {
		// 	console.log("HERE TRUE");
		// 	vscode.workspace.onDidCreateFiles(() => topLevelProvider.refresh());
        // 	vscode.workspace.onDidDeleteFiles(() => topLevelProvider.refresh());
        // 	vscode.workspace.onDidChangeWorkspaceFolders(() => topLevelProvider.refresh());
		// }

		

	}

	
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('andrew.autorefresh')) {
			logSettings(context, topLevelProvider);
		}
	}));

	
	
	
	
}

// this method is called when your extension is deactivated
export function deactivate() {}


async function openFile(fileUri: vscode.Uri) {
	console.log(fileUri);
	try {
		const document = await vscode.workspace.openTextDocument(fileUri);
		await vscode.window.showTextDocument(document);
	} catch (err: any) {
		vscode.window.showErrorMessage(`Failed to open file: ${err.message}`);
	}

}


function logSettings(context: vscode.ExtensionContext, topLevelProvider: TopLevelProvider) { 
	const config = vscode.workspace.getConfiguration('andrew');
	const settingConfig = config.get(`autorefresh`);
	// console.log(`autorefresh: ${settingConfig}`);

	// context.subscriptions.forEach(subscription => subscription.dispose());

	if (settingConfig === true) {
		// console.log("TRUE");
        context.subscriptions.push(
            vscode.workspace.onDidCreateFiles(() => topLevelProvider.refresh()),
            vscode.workspace.onDidDeleteFiles(() => topLevelProvider.refresh()),
            vscode.workspace.onDidChangeWorkspaceFolders(() => topLevelProvider.refresh())
        );
    }
	if (settingConfig === false) {
		// console.log("FALSE");
		context.subscriptions.forEach(subscription => subscription.dispose());
	}
}


import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as readdirSync from 'fs';

import { setDescription } from './utils';

export class TopLevelProvider implements vscode.TreeDataProvider<File> {



    private _onDidChangeTreeData: vscode.EventEmitter<File | undefined | void> = new vscode.EventEmitter<File | undefined | void>();
    readonly  onDidChangeTreeData: vscode.Event<File | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) {}
   

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getChildren(element?: File | undefined): Thenable<File[]> {

        const files = this.getFiles();
        
        // files.forEach( element => console.log(element.tooltip));

        const result = Promise.resolve(files);

        return result;
    
    }

    getTreeItem(element: File): vscode.TreeItem {
        return new vscode.TreeItem(element);
    }
    getFiles(element?: string | undefined): File[] {

        let children: string[] = [];
        let files: File[] = [];

        if (element) {
            children = readdirSync.readdirSync(element);
        }
        children = readdirSync.readdirSync(this.workspaceRoot);

        if (children) {
            children.forEach(element => {
                const stats = fs.statSync(path.join(this.workspaceRoot!, element));
				if (stats.isFile()) {
                    const file = new File(element, this.workspaceRoot,  vscode.TreeItemCollapsibleState.None);
					files.push(file);
                    // console.log(file.description);
				}
            });
        }

        files.forEach(element => console.log(element.tooltip));
        return files;
    }


}


export class File extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly root: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,

    ) {
        super(label, collapsibleState);

        // Set the description
        // this.description = this.setDescription(label);
        this.tooltip = setDescription(label);
        
        // console.log(this.description);

        // this.resourceUri = vscode.Uri.file(path.join(root, label));

    }


}
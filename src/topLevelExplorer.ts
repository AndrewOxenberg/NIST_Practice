import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as readdirSync from 'fs';

import { setDescription } from './utils';
import { File } from './utils';

export class TopLevelProvider implements vscode.TreeDataProvider<File> {



    private _onDidChangeTreeData: vscode.EventEmitter<File | undefined | void> = new vscode.EventEmitter<File | undefined | void>();
    readonly  onDidChangeTreeData: vscode.Event<File | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) {
        this.workspaceRoot = workspaceRoot;
    }
   

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getChildren(element?: File | undefined): Thenable<File[]> {

        if (element) {
            return Promise.resolve(this.getFiles(element.root));
        }
        else {
            return Promise.resolve(this.getFiles());
        }
    
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
                    const file = new File(element, this.workspaceRoot,  vscode.TreeItemCollapsibleState.None, path.join(this.workspaceRoot!, element));
					files.push(file);
                    // console.log(file.description);
				}
            });
        }

        // files.forEach(element => console.log(element.tooltip));
        return files;
    }


}


//extension settings
/*
- one textbox (console.log on change)
- one other (checkbox to change auto saving or manual)
        - reload arrow is hidden when automatic is true

^^^
- am i creating custom settings or just changing them in the settings.json?

add icons
built in icons in doumentation
product icons

^^^
- used product icon reference but output is always "[object Object]"


create an issue on github repo
make a make to implement feature

associate commits to an issue
github smart comments
# (numnber of issue)
in pull request message "closes #num"
close issue
*/

/*
dynamic programming (recursion (leetcode))
*/



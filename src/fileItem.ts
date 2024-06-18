
import * as vscode from 'vscode';
import { setDescription } from './utils';


export class File extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly root: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly uri: string
    ) {
        super(label, collapsibleState);

        // Set the description
        // this.description = this.setDescription(label);
        this.tooltip = setDescription(label);
        
        // console.log(this.description);

        
        this.resourceUri = vscode.Uri.file(uri);
        
        if (this.resourceUri) {
            this.command = {
                command: 'vscode.open',
                title: 'Open File',
                arguments: [this.resourceUri]
            };
        }

        this.label = `$(eye)` + " " + label;
        this.iconPath = `$(eye)`;
        


    }


}
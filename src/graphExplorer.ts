import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as readdirSync from 'fs';
import { makeGraph } from './utils';
import { File } from './fileItem';

export class graphExplorer implements vscode.TreeDataProvider<File> {

    private _onDidChangeTreeData: vscode.EventEmitter<File | undefined | void> = new vscode.EventEmitter<File | undefined | void>();
    readonly  onDidChangeTreeData?: vscode.Event<File | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) {}

    getTreeItem(element: File): vscode.TreeItem {
        return new vscode.TreeItem(element);
    }
    getChildren(element?: File | undefined): vscode.ProviderResult<File[]> {
        
        const files = this.getFiles(element);
        const result = Promise.resolve(files);

        return files;
    }
    
    private getFiles(element?: File | undefined): File[] { 

        let files: File[] = [];

        let path: string = element ? element.root : this.workspaceRoot;

        //imported (dynamic) map
        let staticMap: Map<String, Set<String>> = makeGraph();

       

        return files;
        

    }
    
}
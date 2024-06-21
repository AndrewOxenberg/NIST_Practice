"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode3 = __toESM(require("vscode"));

// src/topLevelExplorer.ts
var vscode2 = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var readdirSync = __toESM(require("fs"));

// src/fileItem.ts
var vscode = __toESM(require("vscode"));

// src/utils.ts
var path = __toESM(require("path"));
function setDescription(label) {
  if (label.endsWith(".ts")) {
    return "TypeScript";
  } else if (label.endsWith(".js")) {
    return "JavaScript";
  } else {
    return path.basename(label);
  }
}

// src/fileItem.ts
var File = class extends vscode.TreeItem {
  constructor(label, root, collapsibleState, uri) {
    super(label, collapsibleState);
    this.label = label;
    this.root = root;
    this.collapsibleState = collapsibleState;
    this.uri = uri;
    this.tooltip = setDescription(label);
    this.resourceUri = vscode.Uri.file(uri);
    if (this.resourceUri) {
      this.command = {
        command: "vscode.open",
        title: "Open File",
        arguments: [this.resourceUri]
      };
    }
    this.label = `$(eye) ` + label;
    this.iconPath = `$(eye)`;
  }
};

// src/topLevelExplorer.ts
var TopLevelProvider = class {
  constructor(workspaceRoot) {
    this.workspaceRoot = workspaceRoot;
    this.workspaceRoot = workspaceRoot;
  }
  _onDidChangeTreeData = new vscode2.EventEmitter();
  onDidChangeTreeData = this._onDidChangeTreeData.event;
  refresh() {
    this._onDidChangeTreeData.fire();
  }
  getChildren(element) {
    if (element) {
      return Promise.resolve(this.getFiles(element.root));
    } else {
      return Promise.resolve(this.getFiles());
    }
  }
  getTreeItem(element) {
    return new vscode2.TreeItem(element);
  }
  getFiles(element) {
    let children = [];
    let files = [];
    if (element) {
      children = readdirSync.readdirSync(element);
    }
    children = readdirSync.readdirSync(this.workspaceRoot);
    if (children) {
      children.forEach((element2) => {
        const stats = fs.statSync(path2.join(this.workspaceRoot, element2));
        if (stats.isFile()) {
          const file = new File(element2, this.workspaceRoot, vscode2.TreeItemCollapsibleState.None, path2.join(this.workspaceRoot, element2));
          files.push(file);
        }
      });
    }
    return files;
  }
};

// src/extension.ts
function activate(context) {
  context.subscriptions.push(vscode3.commands.registerCommand("test.sayHello", () => {
    console.log("Hello World!");
  }));
  const rootPath = vscode3.workspace.workspaceFolders && vscode3.workspace.workspaceFolders.length > 0 ? vscode3.workspace.workspaceFolders[0].uri.fsPath : void 0;
  let topLevelProvider;
  if (rootPath) {
    topLevelProvider = new TopLevelProvider(rootPath);
    vscode3.window.createTreeView("topLevelExplorer", {
      treeDataProvider: topLevelProvider
    });
    vscode3.commands.registerCommand(
      "topLevelExplorer.refreshEntry",
      () => topLevelProvider.refresh()
    );
  }
  context.subscriptions.push(vscode3.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("andrew.autorefresh")) {
      logSettings(context, topLevelProvider);
    }
  }));
}
function deactivate() {
}
function logSettings(context, topLevelProvider) {
  const config = vscode3.workspace.getConfiguration("andrew");
  const settingConfig = config.get(`autorefresh`);
  if (settingConfig === true) {
    context.subscriptions.push(
      vscode3.workspace.onDidCreateFiles(() => topLevelProvider.refresh()),
      vscode3.workspace.onDidDeleteFiles(() => topLevelProvider.refresh()),
      vscode3.workspace.onDidChangeWorkspaceFolders(() => topLevelProvider.refresh())
    );
  }
  if (settingConfig === false) {
    context.subscriptions.forEach((subscription) => subscription.dispose());
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map

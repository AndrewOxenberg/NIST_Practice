

// import * as vscode from 'vscode';

import * as path from 'path';




export function setDescription(label: string): string {

    if (label.endsWith('.ts')) {
        return 'TypeScript';
    } else if (label.endsWith('.js')) {
        return 'JavaScript';
    } else {
        return path.basename(label);
    }
    
}

export function makeGraph(): Map<String, Set<String>> {

    let map: Map<String, Set<String>>= new Map();

    map.set('A', new Set());
    map.set('B', new Set());
    map.set('C', new Set());
    map.set('D', new Set());
    map.set('E', new Set());
    map.set('F', new Set());
    map.set('G', new Set());
    map.set('H', new Set());


    map.get('A')?.add('B');
    map.get('A')?.add('C');
    

    map.get('B')?.add('E');
    map.get('B')?.add('F');
    map.get('B')?.add('C');

    map.get('C')?.add('D');
    map.get('C')?.add('E');
    map.get('C')?.add('G');

    map.get('D')?.add('A');
    map.get('D')?.add('F');
    map.get('D')?.add('G');

    map.get('E')?.add('H');

    map.get('F')?.add('H');

    map.get('G')?.add('H');

    return map;
}




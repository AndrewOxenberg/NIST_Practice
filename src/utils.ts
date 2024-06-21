

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

    const map: Map<String, Set<String>>= new Map();

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

export function hasCycle(graph: Map<String, Set<String>>): boolean {

    const visited = new Set();
    const stack = new Set();
    const parentMap = new Map();

    for (const key of graph.keys()) {
        if (dfs(key)) { 
            return true;
        }
    }

    return false;

    function dfs(key: string | String): boolean {
         // If the node is already in the recursion stack, a cycle is detected
         if (stack.has(key)) {

            const cyclePath = [];
            let currentNode = key;
            do {
                cyclePath.push(currentNode);
                currentNode = parentMap.get(currentNode);
            } while (currentNode !== key);
            cyclePath.push(key); // To complete the cycle
            cyclePath.reverse();
            console.log(cyclePath);

            return true;
        }

        // If the node is already visited and not in the recursion stack, no cycle here
        if (visited.has(key)) {

            console.log("No Cycle");
            return false;
        }

        // Mark the node as visited and add it to the recursion stack
        visited.add(key);
        stack.add(key);

        // Recur for all the vertices adjacent to this vertex
        const neighbors = graph.get(key);
        if (neighbors) {
            for (const neighbor of neighbors) {
                parentMap.set(neighbor, key);
                if (dfs(neighbor)) {
                    return true;
                }
            }
        }

        // Remove the node from the recursion stack
        stack.delete(key);
        return false;
    }


}

export function makeJSONGraph(path: string): Map<String, Set<String>> {

    const json = require(path);
    const map: Map<String, Set<String>> = new Map();
    console.log(json);


    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const innerSet: Set<String> = new Set();
            if (json[key].nodes) {
                for (const node of json[key].nodes) {
                    innerSet.add(node);
                }
            }
            map.set(key, innerSet);
        }
    }

    return map;
}




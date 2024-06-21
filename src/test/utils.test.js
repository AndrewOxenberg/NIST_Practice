
import { expect, test } from 'vitest';
import { setDescription } from '../utils';
import { makeGraph } from '../utils';
import { hasCycle } from '../utils';
import { makeJSONGraph } from '../utils';

test('testing setDescription', () => {
    expect(setDescription("test.js")).toBe("JavaScript");
    expect(setDescription("test.ts")).toBe("TypeScript");
    expect(setDescription("test.tsx")).toBe("test.tsx");
});

test('testing multimap operations', () => {

    let cyclicMap = makeGraph();

    expect(hasCycle(cyclicMap)).toBe(true);

    let nonCyclicMap = new Map();
    nonCyclicMap.set('A', new Set(['B']));
    nonCyclicMap.set('B', new Set(['C']));
    nonCyclicMap.set('C', new Set(['D']));

    expect(hasCycle(nonCyclicMap)).toBe(false);
});

test('testing JSON map', () => {

    const map = makeJSONGraph("../letterGraph.json");

    console.log(map);

    expect(hasCycle(map)).toBe(true);

});

/*
create new branch when adding a feature
when you want to merge, yml file tests if your code works with tests before merging
if successful, merges, otherwise doesnt.
*/
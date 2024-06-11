
import { expect, test } from 'vitest';
import { setDescription } from '../utils';

test('testing setDescription', () => {
    expect(setDescription("test.js")).toBe("JavaSycript");
    expect(setDescription("test.ts")).toBe("TypeScript");
    expect(setDescription("test.tsx")).toBe("test.tsx");
});



/*
create new branch when adding a feature
when you want to merge, yml file tests if your code works with tests before merging
if successful, merges, otherwise doesnt.
*/
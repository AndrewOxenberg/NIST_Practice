
import { expect, test } from 'vitest';
import { setDescription } from '../utils';

test('testing setDescription', () => {
    expect(setDescription("test.js")).toBe("JavaScript");
    expect(setDescription("test.ts")).toBe("TypeScript");
    expect(setDescription("test.tsx")).toBe("test.tsx");
});

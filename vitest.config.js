/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
// import viteConfig from './vitest.config.js';

export default defineConfig({
    test: {
        include: ['**/src/test/**/*.test.{js,ts}'],
        exclude: ['**/out/**']

    }
});



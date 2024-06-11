/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
// import viteConfig from './vitest.config.js';

export default defineConfig({
    test: {
        include: ['**/src/test/**/*.test.{js,ts}'],
        exclude: ['**/out/**']

    }
});


// import { defineConfig, mergeConfig } from 'vitest/config';
// import viteConfig from './vite.config';

// export default mergeConfig(viteConfig, defineConfig({
//   test: {
//     include: ['src/test/**/*.test.{js,ts}'],
//     exclude: ['out/**', '**/node_modules/**']
//   }
// }));

// import { defineConfig } from 'vitest/config';

// export default defineConfig({
//   test: {
//     // ...
//   },
// })

//gitignore to ignore node_modules, out folder, 
// config github workflow to run tests when commiting code to main branch
//      c
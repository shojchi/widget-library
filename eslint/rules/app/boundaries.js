// eslint/rules/app/boundaries.js
/**
 * Demo App — architectural boundaries
 * Ensures the app consumes the library only via its public API.
 */

export const demoAppRestrictedImports = [
  {
    group: ['**/projects/widget-library/src/lib/**'],
    message:
      '⛔ Forbidden: Import from library internals. Use public API: `import { X } from "widget-library"`',
  },
  {
    group: ['**/projects/widget-library/src/public-api.ts'],
    message: '⛔ Import from "widget-library", not public-api.ts directly',
  },
];

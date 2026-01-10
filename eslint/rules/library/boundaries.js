// eslint/rules/library/boundaries.js
/**
 * Library — self-containment enforcement
 * Ensures the library has no hidden dependencies on the demo app (src/).
 */

export const libraryRestrictedImports = [
  {
    group: ['../**/src/**'],
    message:
      '⛔ Forbidden: Library must not depend on demo app (src/). Keep it publishable and independent.',
  },
  {
    group: ['@app/**', '@demo/**', '@/src/**'],
    message: '⛔ Path aliases to demo app are not allowed in library code.',
  },
];

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';

import { demoAppRules } from './rules/app/coding-style.js';
import { demoAppRestrictedImports } from './rules/app/boundaries.js';

import { libraryRules } from './rules/library/coding-style.js';
import { libraryRestrictedImports } from './rules/library/boundaries.js';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  ...tseslint.configs.recommended,
  ...angular.configs.tsRecommended,
  {
    files: ['src/**/*.{ts,js,html}'],
    rules: {
      ...demoAppRules,
      'no-restricted-imports': ['error', { patterns: demoAppRestrictedImports }],
    },
  },
  {
    files: ['projects/widget-library/**/*.{ts,js,html}'],
    rules: {
      ...libraryRules,
      'no-restricted-imports': ['error', { patterns: libraryRestrictedImports }],
    },
  },
]);

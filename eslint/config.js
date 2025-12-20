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
    ignores: [
      // Angular & build artifacts
      '**/.angular/**',
      '**/.ai/**',
      '**/dist/**',
      '**/out-tsc/**',
      '**/coverage/**',
      '**/.vite/**',
      '**/.cache/**',
      '**/.eslintcache',

      // Node/tooling
      '**/node_modules/**',
      '**/tmp/**',
      '**/temp/**',

      // Optional: generated JS/DTS
      '**/*.min.js',
      '**/*.d.ts',
    ],
  },

  // 🌐 Base: all JS/TS — only non-type-aware rules
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'warn',
    },
  },
  ...tseslint.configs.recommended,
  ...angular.configs.tsRecommended,

  // 🟢 Demo App: TS/JS files
  {
    files: ['src/**/*.{ts,js}'],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...demoAppRules,
      'no-restricted-imports': ['error', { patterns: demoAppRestrictedImports }],
    },
  },
  // 🟢 Demo App: HTML templates
  {
    files: ['src/**/*.{html}'],
    ...angular.configs.templateRecommended[0],
    ...angular.configs.templateAccessibility[0],
    rules: {
      '@angular-eslint/template/no-call-expression': 'warn',
      '@angular-eslint/template/cyclomatic-complexity': ['warn', 10],
    },
  },
  // 🟢 Library: TS/JS
  {
    files: ['projects/widget-library/**/*.{ts,js}'],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...libraryRules,
      'no-restricted-imports': ['error', { patterns: libraryRestrictedImports }],
    },
  },
  // 🟢 Library: HTML templates
  {
    files: ['projects/widget-library/**/*.{html}'],
    ...angular.configs.templateRecommended[0],
    ...angular.configs.templateAccessibility[0],
    rules: {
      '@angular-eslint/template/no-call-expression': 'error',
      '@angular-eslint/template/cyclomatic-complexity': ['error', 5],
      '@angular-eslint/template/no-negated-async': 'error',
    },
  },
]);

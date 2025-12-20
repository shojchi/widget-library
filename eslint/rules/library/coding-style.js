// projects/widget-library/eslint.config.js
// This file ONLY exports library-specific rule overrides
// It does NOT export a full config - just the rules object

/**
 * Library-specific ESLint rules
 * These rules are stricter because library code is consumed by external users
 */
export const libraryRules = {
  // ==========================================
  // STRICTER TYPE SAFETY FOR LIBRARY CODE
  // ==========================================
  '@typescript-eslint/no-explicit-any': 'error', // ❌ No 'any' in library
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    },
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'error',

  // ==========================================
  // NO CONSOLE IN LIBRARY CODE
  // ==========================================
  'no-console': 'error', // ❌ Libraries should never use console

  // ==========================================
  // STRICT NAMING CONVENTIONS
  // ==========================================
  '@typescript-eslint/naming-convention': [
    'error',
    // Default: camelCase for most things
    {
      selector: 'default',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    // Variables: camelCase, UPPER_CASE (constants), or PascalCase (classes)
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    // Types, Classes, Interfaces: PascalCase
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    // Enum members: PascalCase or UPPER_CASE
    {
      selector: 'enumMember',
      format: ['PascalCase', 'UPPER_CASE'],
    },
    // Private members: leading underscore allowed
    {
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    },
  ],

  // ==========================================
  // LIBRARY-SPECIFIC ANGULAR RULES
  // ==========================================
  '@angular-eslint/no-input-rename': 'error',
  '@angular-eslint/no-output-rename': 'error',
  '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
};

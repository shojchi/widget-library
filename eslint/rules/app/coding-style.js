// src/eslint.config.js
// This file ONLY exports demo-app-specific rule overrides
// It does NOT export a full config - just the rules object

/**
 * Demo App-specific ESLint rules
 * These rules are more lenient to allow rapid development and experimentation
 */
export const demoAppRules = {
  // ==========================================
  // LENIENT TYPE SAFETY FOR DEMO
  // ==========================================
  '@typescript-eslint/no-explicit-any': 'warn', // ⚠️ Warn but allow 'any'
  '@typescript-eslint/explicit-function-return-type': 'off', // No requirement

  // ==========================================
  // RELAXED NAMING CONVENTIONS
  // ==========================================
  '@typescript-eslint/naming-convention': [
      'warn', // Just warn, don't error
      {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
      },
      {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
          selector: 'typeLike',
          format: ['PascalCase'],
      },
  ],

  // ==========================================
  // DEMO APP ANGULAR RULES
  // ==========================================
  '@angular-eslint/no-input-rename': 'error',
  '@angular-eslint/no-output-rename': 'error',
  '@angular-eslint/prefer-on-push-component-change-detection': 'warn',

  // ==========================================
  // RELAXED COMPLEXITY FOR DEMO CODE
  // ==========================================
  complexity: ['warn', 20], // Allow more complex functions
  'max-lines-per-function': 'off', // No limit on function length
};
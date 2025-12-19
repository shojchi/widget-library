export default tseslint.config(
    // 1. Global ignores
    { ignores: [...] },

    // 2. Base rules for ALL TypeScript files
    {
        files: ['**/*.ts'],
        extends: [...], // TypeScript, Angular base rules
        rules: { /* common rules */ }
    },

    // 3. Demo app specific rules
    {
        files: ['src/**/*.ts'],
        rules: {
            '@angular-eslint/component-selector': [
                'error',
                { prefix: 'app' }  // ✅ Demo app uses 'app-'
            ]
        }
    },

    // 4. Library specific rules
    {
        files: ['projects/widget-library/**/*.ts'],
        rules: {
            '@angular-eslint/component-selector': [
                'error',
                { prefix: 'lib' }  // ✅ Library uses 'lib-'
            ]
        }
    },

    // 5. HTML templates
    { files: ['**/*.html'], ... },

    // 6. Prettier (must be last!)
    prettier
);
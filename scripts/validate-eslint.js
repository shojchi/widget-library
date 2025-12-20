// scripts/validate-eslint.js
import { ESLint } from 'eslint';

async function main() {
  // Create ESLint instance with current config
  const eslint = new ESLint({
    // Use config from eslint.config.js (default behavior)
    // No need to pass config manually
  });

  try {
    // This will load and validate your flat config
    await eslint.calculateConfigForFile('src/app/app.component.ts');
    console.log('✅ ESLint config loaded successfully');
    
    // Optional: test library file too
    await eslint.calculateConfigForFile('projects/widget-library/src/lib/button/button.component.ts');
    console.log('✅ Library config loaded successfully');
    
    console.log('🎉 All ESLint configs are valid!');
  } catch (err) {
    console.error('❌ ESLint config validation failed:');
    console.error(err.message);
    if (err.stack) {
      console.error('\nStack trace:');
      console.error(err.stack.split('\n').slice(0, 5).join('\n'));
    }
    process.exit(1);
  }
}

main();
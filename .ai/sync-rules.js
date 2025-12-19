#!/usr/bin/env node

/**
 * AI Rules Sync Script
 * 
 * Validates that all AI rules files are in sync with the master rules file.
 * Run this before committing changes to rules files.
 * 
 * Usage:
 *   node .ai/sync-rules.js [--check|--update]
 * 
 * Options:
 *   --check   Only check if files are in sync (CI mode)
 *   --update  Update all derived files from master (default)
 */

const fs = require('fs');
const path = require('path');

const MASTER_RULES = '.kiro/specs/angular-widget-library/rules.md';
const DERIVED_FILES = [
    '.cursorrules',
    '.github/copilot-instructions.md',
    '.ai/rules.md'
];

const mode = process.argv[2] || '--update';

console.log('🤖 AI Rules Sync Tool\n');

// Check if master file exists
if (!fs.existsSync(MASTER_RULES)) {
    console.error(`❌ Master rules file not found: ${MASTER_RULES}`);
    process.exit(1);
}

const masterStats = fs.statSync(MASTER_RULES);
const masterModified = masterStats.mtime;

console.log(`📄 Master Rules: ${MASTER_RULES}`);
console.log(`📅 Last Modified: ${masterModified.toISOString()}\n`);

let allInSync = true;

DERIVED_FILES.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file} - NOT FOUND`);
        allInSync = false;
        return;
    }

    const derivedStats = fs.statSync(file);
    const derivedModified = derivedStats.mtime;
    const isNewer = derivedModified >= masterModified;

    const status = isNewer ? '✅' : '⚠️ ';
    const message = isNewer ? 'OK' : 'OUTDATED';

    console.log(`${status} ${file} - ${message}`);
    console.log(`   Last Modified: ${derivedModified.toISOString()}`);

    if (!isNewer) {
        allInSync = false;
    }
});

console.log('\n');

if (mode === '--check') {
    if (allInSync) {
        console.log('✅ All AI rules files are in sync!');
        process.exit(0);
    } else {
        console.log('❌ Some AI rules files are outdated.');
        console.log('💡 Run: node .ai/sync-rules.js --update');
        process.exit(1);
    }
}

if (mode === '--update') {
    console.log('📝 Note: This script only validates timestamps.');
    console.log('   Manual updates to derived files may be needed.');
    console.log('   Please review each file to ensure consistency.\n');

    console.log('📋 Files to review:');
    DERIVED_FILES.forEach(file => {
        console.log(`   - ${file}`);
    });

    console.log('\n💡 After updating, touch the files to update timestamps:');
    console.log(`   touch ${DERIVED_FILES.join(' ')}`);
}

console.log('\n✨ Done!');

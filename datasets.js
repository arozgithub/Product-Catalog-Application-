#!/usr/bin/env node

/**
 * This is a simpler script to manage Sanity datasets by running commands
 * directly in the Sanity studio directory.
 * 
 * Usage:
 *   node datasets.js <action> [args]
 * 
 * Examples:
 *   node datasets.js list
 *   node datasets.js create staging
 *   node datasets.js delete staging
 *   node datasets.js copy production staging
 */

const { execSync } = require('child_process');
const path = require('path');

// Get action and arguments
const action = process.argv[2];
const args = process.argv.slice(3);

if (!action) {
  console.error('❌ Please specify an action: list, create, delete, or copy');
  process.exit(1);
}

// Change to sanity directory first
try {
  process.chdir(path.join(__dirname, 'sanity'));
  console.log(`Changed directory to: ${process.cwd()}`);
  
  // Execute Sanity command
  const command = `npx sanity dataset ${action} ${args.join(' ')}`;
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
  
  // Show success message
  if (action === 'create' && args[0]) {
    console.log(`\n✅ Dataset '${args[0]}' created successfully!`);
    console.log(`\nTo start using this dataset, run:`);
    console.log(`npm run use-${args[0]}`);
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
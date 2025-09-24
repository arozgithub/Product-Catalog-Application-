#!/usr/bin/env node

/**
 * This script helps create, delete, and list Sanity datasets
 * Usage:
 *   node manage-datasets.js <action> [dataset-name]
 * 
 * Actions:
 *   create <dataset-name> - Create a new dataset
 *   delete <dataset-name> - Delete an existing dataset
 *   copy <source> <target> - Copy data from source to target dataset
 *   list                  - List all datasets
 *   info                  - Show current dataset
 * 
 * Examples:
 *   node manage-datasets.js create staging
 *   node manage-datasets.js delete staging
 *   node manage-datasets.js copy production staging
 *   node manage-datasets.js list
 *   node manage-datasets.js info
 * 
 * NOTE: This script must be run from the root directory
 *       as it will change to the sanity directory internally.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if Sanity CLI is installed
try {
  execSync('npx sanity --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Sanity CLI is not installed or not available in PATH');
  console.log('Please install it with: npm install -g @sanity/cli');
  process.exit(1);
}

// Get action and dataset from command line arguments
const action = process.argv[2];
const dataset = process.argv[3];
const targetDataset = process.argv[4];

// Read current project ID from .env.local file
let projectId = '';
try {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/NEXT_PUBLIC_SANITY_PROJECT_ID=([a-z0-9]+)/);
    if (match && match[1]) {
      projectId = match[1];
    }
  }
} catch (error) {
  console.error('❌ Failed to read project ID from .env.local:', error.message);
}

// If project ID is still empty, try to get it from sanity folder
if (!projectId) {
  try {
    const sanityEnvPath = path.join(__dirname, 'sanity', '.env.local');
    if (fs.existsSync(sanityEnvPath)) {
      const envContent = fs.readFileSync(sanityEnvPath, 'utf8');
      const match = envContent.match(/SANITY_STUDIO_PROJECT_ID=([a-z0-9]+)/);
      if (match && match[1]) {
        projectId = match[1];
      }
    }
  } catch (error) {
    console.error('❌ Failed to read project ID from sanity/.env.local:', error.message);
  }
}

if (!projectId) {
  console.error('❌ Could not find Sanity project ID in environment files');
  console.log('Please set up your Sanity project first');
  process.exit(1);
}

// Execute Sanity command with the given arguments
const executeSanityCommand = (command, args = []) => {
  // Change to the sanity directory first to ensure context is correct
  process.chdir(path.join(__dirname, 'sanity'));
  
  const fullCommand = `npx sanity ${command} ${args.join(' ')}`;
  try {
    console.log(`Running from sanity directory: ${fullCommand}`);
    return execSync(fullCommand, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Error executing '${fullCommand}':`);
    console.error(`   ${error.message}`);
    process.exit(1);
  }
};

// Handle different actions
switch (action) {
  case 'create':
    if (!dataset) {
      console.error('❌ Dataset name is required for create action');
      console.log('Usage: node manage-datasets.js create <dataset-name>');
      process.exit(1);
    }
    executeSanityCommand('dataset', ['create', dataset]);
    console.log(`\n✅ Dataset '${dataset}' created successfully!`);
    console.log(`\nTo start using this dataset, run:`);
    console.log(`npm run use-${dataset}`);
    break;
    
  case 'delete':
    if (!dataset) {
      console.error('❌ Dataset name is required for delete action');
      console.log('Usage: node manage-datasets.js delete <dataset-name>');
      process.exit(1);
    }
    
    if (dataset === 'production') {
      console.error('❌ Cannot delete the production dataset!');
      console.log('This is a safeguard to prevent accidental deletion of production data.');
      process.exit(1);
    }
    
    console.log(`⚠️ WARNING: You are about to delete the dataset '${dataset}'`);
    console.log('This action cannot be undone and all data will be lost.');
    console.log('To confirm, press Ctrl+C to abort or wait 5 seconds to continue...');
    
    // Wait for 5 seconds before proceeding
    setTimeout(() => {
      executeSanityCommand('dataset', ['delete', dataset]);
      console.log(`\n✅ Dataset '${dataset}' deleted successfully!`);
    }, 5000);
    break;
    
  case 'copy':
    if (!dataset || !targetDataset) {
      console.error('❌ Source and target dataset names are required for copy action');
      console.log('Usage: node manage-datasets.js copy <source-dataset> <target-dataset>');
      process.exit(1);
    }
    executeSanityCommand('dataset', ['copy', dataset, targetDataset]);
    console.log(`\n✅ Data copied from '${dataset}' to '${targetDataset}' successfully!`);
    break;
    
  case 'list':
    executeSanityCommand('dataset', ['list']);
    break;
    
  case 'info':
    // Try to read current dataset from environment files
    let currentDataset = '';
    try {
      const envPath = path.join(__dirname, '.env.local');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/NEXT_PUBLIC_SANITY_DATASET=([a-z0-9]+)/);
        if (match && match[1]) {
          currentDataset = match[1];
        }
      }
      
      if (currentDataset) {
        console.log(`✅ Current dataset: ${currentDataset}`);
        console.log(`Project ID: ${projectId}`);
      } else {
        console.log('❌ No current dataset found in environment files');
        console.log('Run one of:');
        console.log('npm run use-production');
        console.log('npm run use-staging');
        console.log('npm run use-development');
      }
    } catch (error) {
      console.error('❌ Failed to read current dataset:', error.message);
    }
    break;
    
  default:
    console.error(`❌ Unknown action: ${action}`);
    console.log('Available actions:');
    console.log('  create <dataset-name>  - Create a new dataset');
    console.log('  delete <dataset-name>  - Delete an existing dataset');
    console.log('  copy <source> <target> - Copy data from source to target dataset');
    console.log('  list                   - List all datasets');
    console.log('  info                   - Show current dataset');
    process.exit(1);
}
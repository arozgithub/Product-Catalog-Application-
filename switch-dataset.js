#!/usr/bin/env node

/**
 * This script helps switch between Sanity datasets for your project.
 * Usage:
 *   node switch-dataset.js [dataset-name]
 * 
 * Example:
 *   node switch-dataset.js staging
 *   node switch-dataset.js production
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get dataset from command line argument or use production as default
const dataset = process.argv[2] || 'production';
const validDatasets = ['production', 'staging', 'development', 'test'];

// Check if dataset is valid
if (!validDatasets.includes(dataset)) {
  console.error(`❌ Invalid dataset: ${dataset}`);
  console.log(`Valid datasets are: ${validDatasets.join(', ')}`);
  process.exit(1);
}

// Sanity studio environment file
const sanityEnvPath = path.join(__dirname, 'sanity', '.env.local');
// Main app environment file
const mainEnvPath = path.join(__dirname, '.env.local');

// Sanity project ID - update with your actual ID
const projectId = '5fxm68gv'; // Your project ID

// Update Sanity studio environment file
const sanityEnvContent = `SANITY_STUDIO_PROJECT_ID=${projectId}
SANITY_STUDIO_DATASET=${dataset}`;

// Update main app environment file  
const mainEnvContent = `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}
NEXT_PUBLIC_SANITY_DATASET=${dataset}`;

try {
  // Write environment files
  fs.writeFileSync(sanityEnvPath, sanityEnvContent);
  fs.writeFileSync(mainEnvPath, mainEnvContent);

  console.log(`✅ Switched to ${dataset} dataset!`);
  console.log(`Updated both environment files with project ID: ${projectId}`);
  
  // Show next steps
  console.log(`\n🚀 Next Steps:`);
  console.log(`1. Start Sanity Studio:   cd sanity && npm run dev`);
  console.log(`2. Start Next.js app:     cd .. && npm run dev`);
  console.log(`3. Manage content at:     http://localhost:3333`);
  console.log(`4. View your app at:      http://localhost:3000`);
  
  if (dataset !== 'production') {
    console.log(`\n⚠️ Note: You're now using ${dataset} dataset, not production.`);
  }
  
} catch (error) {
  console.error('❌ Failed to update environment files:', error.message);
  process.exit(1);
}
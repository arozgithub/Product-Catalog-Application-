#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Sanity CMS for Product Catalog...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the root directory of your project');
  process.exit(1);
}

async function setup() {
  try {
    // Step 1: Check if sanity folder exists
    if (!fs.existsSync('sanity')) {
      console.log('❌ Sanity folder not found. Please make sure the sanity folder is present.');
      return;
    }

    // Step 2: Install Sanity Studio dependencies
    console.log('📦 Installing Sanity Studio dependencies...');
    process.chdir('sanity');
    execSync('npm install', { stdio: 'inherit' });
    
    // Step 3: Check environment variables
    const envPath = '.env.local';
    if (!fs.existsSync(envPath)) {
      console.log('⚠️  Creating .env.local file...');
      fs.writeFileSync(envPath, `SANITY_STUDIO_PROJECT_ID=your-project-id-here
SANITY_STUDIO_DATASET=production
`);
    }

    // Step 4: Instructions
    console.log('\n✅ Sanity Studio setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Create a Sanity account at https://sanity.io');
    console.log('2. Create a new project and copy your Project ID');
    console.log('3. Update sanity/.env.local with your actual Project ID');
    console.log('4. Update main .env.local with the same Project ID');
    console.log('5. Run: cd sanity && npx sanity deploy');
    console.log('6. Run: cd sanity && npm run dev');
    console.log('7. Add products in Sanity Studio at http://localhost:3333');
    console.log('\n🎯 See SANITY_SETUP.md for detailed instructions!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();
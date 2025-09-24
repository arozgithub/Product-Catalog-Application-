// get-sanity-token.js
// This script saves your Sanity API token to .env.local

// Add token to .env.local file
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// The API token provided
const token = 'skvz5tq2XewZWSejr8VEJ7OHYZiEpV72DhOMEum7ToX6dJJYcyLC0x3a5RiTcP8TK3WgAHnIFACkrAo9nkhC9zz7tHc11k66fMSGIRvAmfZ2kI73cCdt1vpxHwsLOHFOMDdYjkjgYgcf1fHsVsyn09DtqQ9kHBwa0MWWOG4JwTtYXM0BbRVU';

// Path to .env.local file
const envPath = path.join(__dirname, '.env.local');

// Read existing .env file
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Check if token is already in the file
if (envContent.includes('SANITY_API_TOKEN=')) {
  console.log('⚠️ SANITY_API_TOKEN is already set in .env.local');
  console.log('Updating with the new token...');
  
  // Replace existing token
  envContent = envContent.replace(
    /SANITY_API_TOKEN=.*/,
    `SANITY_API_TOKEN=${token}`
  );
} else {
  // Add token to env content
  envContent += `\nSANITY_API_TOKEN=${token}`;
}

// Write back to .env.local file
fs.writeFileSync(envPath, envContent);
console.log('✅ SANITY_API_TOKEN added to .env.local');
console.log('\n🔐 Token has been saved! You can now use it to:');
console.log('1. Add sample data to your dataset');
console.log('2. Import/export data between datasets');
console.log('3. Use management API features\n');

console.log('To add sample products, run:');
console.log('node add-sample-products.js');

// Instructions for manual adding in case the user doesn't want to create a token
console.log('\n=== Manual Alternative ===');
console.log('\nIf you prefer to add products manually through Sanity Studio:');
console.log('1. Open http://localhost:3333');
console.log('2. Make sure "staging" dataset is selected in the top navigation');
console.log('3. Click "Create new" and select "Product"');
console.log('4. Fill in the details for each product');
console.log('5. Click "Publish" to save the product');

// Display example product details
console.log('\n=== Example Product Details ===');
console.log('\nProduct 1:');
console.log('Title: Premium Wireless Headphones');
console.log('Description: High-quality wireless headphones with noise cancellation and premium sound quality.');
console.log('Category: Electronics');
console.log('Price: 199.99');
console.log('Availability: Yes (checked)');

console.log('\nProduct 2:');
console.log('Title: Organic Cotton T-Shirt');
console.log('Description: Comfortable organic cotton t-shirt, ethically produced.');
console.log('Category: Clothing');
console.log('Price: 29.99');
console.log('Availability: Yes (checked)');
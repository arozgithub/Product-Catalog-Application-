// refresh-products.js
// This script updates products to ensure they show properly in Sanity Studio

const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging',
  apiVersion: '2023-09-24',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function refreshProducts() {
  console.log('=== Refreshing Products for Sanity Studio ===\n');
  
  try {
    // Get all products
    const products = await client.fetch('*[_type == "product"]');
    console.log(`Found ${products.length} products to refresh`);
    
    // Update each product to trigger Studio refresh
    for (const product of products) {
      console.log(`Refreshing product: ${product.title}`);
      
      // Simply patch each product to trigger an update
      await client.patch(product._id).set({ 
        _updatedAt: new Date().toISOString(),
        // Ensure description exists
        description: product.description || `High-quality ${product.title.toLowerCase()} with premium features.`
      }).commit();
      
      console.log(`✅ Refreshed: ${product.title}`);
    }
    
    console.log('\n🎉 All products have been refreshed!');
    console.log('\nNow try:');
    console.log('1. Refresh your Sanity Studio at http://localhost:3333');
    console.log('2. Make sure "staging" dataset is selected');
    console.log('3. Products should now appear in the dashboard');
    
  } catch (error) {
    console.error('\nError refreshing products:', error.message);
  }
}

refreshProducts();
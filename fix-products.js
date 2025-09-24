// fix-products.js
// This script ensures all products have the proper image structure

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const token = process.env.SANITY_API_TOKEN;
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging',
  apiVersion: '2023-09-24',
  token: token,
  useCdn: false,
});

async function fixProducts() {
  console.log('Checking and fixing products...');
  
  try {
    // Fetch all products
    const products = await client.fetch('*[_type == "product"]');
    console.log(`Found ${products.length} products to check`);
    
    for (const product of products) {
      console.log(`\nChecking product: ${product.title}`);
      
      // Check if the product has all required fields
      const updates = {};
      let needsUpdate = false;
      
      // Ensure availability is set
      if (typeof product.availability === 'undefined') {
        updates.availability = true;
        needsUpdate = true;
        console.log('  - Adding availability: true');
      }
      
      // Ensure image has proper structure
      if (!product.image || !product.image.alt) {
        updates.image = {
          _type: 'image',
          alt: `${product.title} image`
        };
        needsUpdate = true;
        console.log('  - Adding proper image structure');
      }
      
      if (needsUpdate) {
        await client.patch(product._id).set(updates).commit();
        console.log('  ✅ Updated product');
      } else {
        console.log('  ✅ Product is properly formatted');
      }
    }
    
    console.log('\n🎉 All products have been checked and updated!');
    
    // Test the query that your Next.js app uses
    console.log('\nTesting the PRODUCTS_QUERY...');
    const testQuery = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      image,
      category,
      price,
      availability
    }`;
    
    const queryResults = await client.fetch(testQuery);
    console.log(`Query returned ${queryResults.length} products:`);
    
    queryResults.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price} (${product.availability ? 'Available' : 'Not available'})`);
    });
    
  } catch (error) {
    console.error('Error fixing products:', error.message);
  }
}

fixProducts();
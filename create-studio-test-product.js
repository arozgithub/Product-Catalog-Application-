// create-studio-test-product.js
// Creates a single test product optimized for Sanity Studio

const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging',
  apiVersion: '2023-09-24',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function createTestProduct() {
  console.log('Creating a test product for Sanity Studio...');
  
  const testProduct = {
    _type: 'product',
    _id: 'test-product-001', // Fixed ID for easier testing
    title: 'Studio Test Product',
    slug: {
      _type: 'slug',
      current: 'studio-test-product'
    },
    description: 'This product was created specifically to test Sanity Studio visibility.',
    category: 'Electronics',
    price: 99.99,
    availability: true,
    image: {
      _type: 'image',
      alt: 'Studio Test Product'
    }
  };
  
  try {
    await client.createOrReplace(testProduct);
    console.log('✅ Test product created successfully!');
    console.log('\nNow check Sanity Studio:');
    console.log('1. Go to http://localhost:3333');
    console.log('2. Make sure "staging" dataset is selected');
    console.log('3. Look for "Studio Test Product" in the products list');
    console.log('4. If you see it, the issue was with the original products');
    console.log('5. If you don\'t see it, there\'s a configuration issue');
  } catch (error) {
    console.error('❌ Error creating test product:', error.message);
  }
}

createTestProduct();
// import-sample-products.js
// This script adds sample products to your Sanity staging dataset

const sanityClient = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv',
  dataset: 'staging',
  apiVersion: '2023-09-24',
  token: process.env.SANITY_API_TOKEN, // You'll need a token with write access
  useCdn: false
});

const sampleProducts = [
  {
    _type: 'product',
    title: 'Premium Wireless Headphones',
    slug: {
      _type: 'slug',
      current: 'premium-wireless-headphones'
    },
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 199.99,
    category: 'Electronics',
    availability: true,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-1' // This won't work without an actual image reference
      },
      alt: 'Premium Wireless Headphones'
    }
  },
  {
    _type: 'product',
    title: 'Organic Cotton T-Shirt',
    slug: {
      _type: 'slug',
      current: 'organic-cotton-t-shirt'
    },
    description: 'Comfortable organic cotton t-shirt, ethically produced.',
    price: 29.99,
    category: 'Clothing',
    availability: true,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-2' // This won't work without an actual image reference
      },
      alt: 'Organic Cotton T-Shirt'
    }
  },
  {
    _type: 'product',
    title: 'Smart Home Security Camera',
    slug: {
      _type: 'slug',
      current: 'smart-home-security-camera'
    },
    description: 'Full HD security camera with night vision, motion detection and smartphone notifications.',
    price: 89.99,
    category: 'Electronics',
    availability: true,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-3' // This won't work without an actual image reference
      },
      alt: 'Smart Home Security Camera'
    }
  }
];

console.log('NOTE: This script will NOT work without a valid SANITY_API_TOKEN in .env.local');
console.log('You need to manually add content through the Sanity Studio interface instead.');
console.log('\nTo add sample products:');
console.log('1. Open http://localhost:3333');
console.log('2. Make sure "staging" dataset is selected');
console.log('3. Click "Create new" and select "Product"');
console.log('4. Fill in the required fields with the sample data below:');

sampleProducts.forEach((product, index) => {
  console.log(`\n--- PRODUCT ${index + 1} ---`);
  console.log(`Title: ${product.title}`);
  console.log(`Description: ${product.description}`);
  console.log(`Price: ${product.price}`);
  console.log(`Category: ${product.category}`);
  console.log(`Availability: ${product.availability}`);
});

/* 
// This part requires a Sanity write token (SANITY_API_TOKEN) to work
// Uncomment if you have a token configured

async function importProducts() {
  try {
    for (const product of sampleProducts) {
      console.log(`Creating product: ${product.title}...`);
      await client.create(product);
    }
    console.log('All sample products imported successfully!');
  } catch (error) {
    console.error('Error importing products:', error.message);
  }
}

if (process.env.SANITY_API_TOKEN) {
  importProducts();
} else {
  console.error('SANITY_API_TOKEN not found in .env.local');
  console.error('Please add your token or use the Sanity Studio to add products manually.');
}
*/
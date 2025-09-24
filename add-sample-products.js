// add-sample-products.js
// This script adds sample products directly to your Sanity staging dataset

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Get token from environment
const token = process.env.SANITY_API_TOKEN || 'skvz5tq2XewZWSejr8VEJ7OHYZiEpV72DhOMEum7ToX6dJJYcyLC0x3a5RiTcP8TK3WgAHnIFACkrAo9nkhC9zz7tHc11k66fMSGIRvAmfZ2kI73cCdt1vpxHwsLOHFOMDdYjkjgYgcf1fHsVsyn09DtqQ9kHBwa0MWWOG4JwTtYXM0BbRVU';

// Create a Sanity client with the token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging',
  apiVersion: '2023-09-24',
  token: token,
  useCdn: false,
});

// Sample product data
const sampleProducts = [
  {
    _type: 'product',
    title: 'Premium Wireless Headphones',
    slug: {
      _type: 'slug',
      current: 'premium-wireless-headphones'
    },
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Features include 30-hour battery life, comfortable ear cushions, and crystal clear audio.',
    price: 199.99,
    category: 'Electronics',
    availability: true,
  },
  {
    _type: 'product',
    title: 'Organic Cotton T-Shirt',
    slug: {
      _type: 'slug',
      current: 'organic-cotton-t-shirt'
    },
    description: 'Comfortable organic cotton t-shirt, ethically produced. Made from 100% sustainable materials and available in multiple colors.',
    price: 29.99,
    category: 'Clothing',
    availability: true,
  },
  {
    _type: 'product',
    title: 'Smart Home Security Camera',
    slug: {
      _type: 'slug',
      current: 'smart-home-security-camera'
    },
    description: 'Full HD security camera with night vision, motion detection and smartphone notifications. Easy to install and connects to your home WiFi.',
    price: 89.99,
    category: 'Electronics',
    availability: true,
  },
  {
    _type: 'product',
    title: 'Professional Running Shoes',
    slug: {
      _type: 'slug',
      current: 'professional-running-shoes'
    },
    description: 'Lightweight, responsive running shoes with superior cushioning and support. Perfect for professional runners and casual joggers alike.',
    price: 129.99,
    category: 'Sports',
    availability: true,
  },
  {
    _type: 'product',
    title: 'Vintage Leather Wallet',
    slug: {
      _type: 'slug',
      current: 'vintage-leather-wallet'
    },
    description: 'Handcrafted genuine leather wallet with multiple card slots and a coin pocket. Classic design with modern functionality.',
    price: 49.99,
    category: 'Clothing',
    availability: true,
  }
];

// Main function to create products
async function createProducts() {
  console.log('\n🚀 Using the provided Sanity API token');

  console.log('Creating sample products in your Sanity staging dataset...');
  
  try {
    console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging'}`);
    console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv'}`);
    console.log('\nCreating products:');
    
    // First check if any products already exist
    const existingProducts = await client.fetch('*[_type == "product"].title');
    if (existingProducts.length > 0) {
      console.log('\n⚠️ Found existing products in dataset:');
      existingProducts.forEach((title, i) => {
        console.log(`${i+1}. ${title}`);
      });
      console.log('\nContinuing to add more products...');
    }

    // Add each product
    for (const product of sampleProducts) {
      console.log(`\nCreating: ${product.title}...`);
      
      // Add placeholder for image
      const productWithImage = {
        ...product,
        image: {
          _type: 'image',
          alt: `${product.title} image`
        }
      };
      
      const result = await client.create(productWithImage);
      console.log(`✅ Created! Document ID: ${result._id}`);
    }
    
    console.log('\n🎉 Successfully created all sample products!');
    console.log('\nNext steps:');
    console.log('1. Open Sanity Studio: http://localhost:3333');
    console.log('2. Add real images to the products');
    console.log('3. View them in your Next.js app: http://localhost:3000');
  } catch (error) {
    console.error('\n❌ Error creating products:', error.message);
    
    if (error.message.includes('Insufficient permissions')) {
      console.log('\n⚠️ Permission error: Your token might not have write access.');
      console.log('Make sure your token has "Editor" permissions in the Sanity project settings.');
    } else if (error.message.includes('schema')) {
      console.log('\n⚠️ Schema error: There might be an issue with the product schema.');
      console.log('Make sure your schema is properly deployed to the staging dataset.');
    }
    
    console.log('\nTroubleshooting:');
    console.log('1. Check that Sanity Studio is running (cd sanity && npx sanity dev)');
    console.log('2. Verify your token has proper permissions');
    console.log('3. Ensure your schema is correctly deployed');
  }
}

// Execute the function
createProducts();
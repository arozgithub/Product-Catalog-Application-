const { createClient } = require('@sanity/client')

// Test Sanity connection
async function testConnection() {
  console.log('Testing Sanity connection...')
  
  try {
    const client = createClient({
      projectId: '5fxm68gv',
      dataset: 'staging',
      apiVersion: '2023-12-01',
      useCdn: false,
    })
    
    console.log('Client created, testing query...')
    
    const products = await client.fetch(`*[_type == "product"]{
      _id,
      title,
      price
    } | order(title asc)`)
    
    console.log(`✅ Connection successful! Found ${products.length} products:`)
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price}`)
    })
    
    // Check if the Next.js app can access this
    const nextjsClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging',
      apiVersion: '2023-12-01',
      useCdn: true,
    })
    
    console.log('\nTesting with Next.js environment variables...')
    const nextProducts = await nextjsClient.fetch(`*[_type == "product"]{title}`)
    console.log(`Next.js client found ${nextProducts.length} products`)
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection()
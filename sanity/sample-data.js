// Sample products data for importing into Sanity
// Use this in Sanity Studio's Vision tool or import script

export const sampleProductsForSanity = [
  {
    _type: 'product',
    title: 'Premium Wireless Headphones',
    slug: {
      _type: 'slug',
      current: 'premium-wireless-headphones'
    },
    description: 'Experience crystal-clear audio with these premium wireless headphones featuring active noise cancellation, 30-hour battery life, and premium materials. Perfect for music lovers and professionals alike.',
    category: 'Electronics',
    price: 199.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Organic Cotton T-Shirt',
    slug: {
      _type: 'slug',
      current: 'organic-cotton-tshirt'
    },
    description: 'Sustainable and comfortable organic cotton t-shirt made from 100% certified organic materials. Available in multiple colors and sizes. Perfect for everyday wear with a conscience.',
    category: 'Clothing',
    price: 29.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Smart Home Security Camera',
    slug: {
      _type: 'slug',
      current: 'smart-home-security-camera'
    },
    description: 'Keep your home secure with this advanced WiFi security camera featuring 1080p HD video, night vision, two-way audio, and mobile app control. Easy setup and cloud storage included.',
    category: 'Electronics',
    price: 89.99,
    availability: false
  },
  {
    _type: 'product',
    title: 'Premium Yoga Mat',
    slug: {
      _type: 'slug',
      current: 'premium-yoga-mat'
    },
    description: 'Professional-grade yoga mat with superior grip and cushioning. Made from eco-friendly materials with alignment lines. Perfect for all yoga styles and fitness routines.',
    category: 'Sports',
    price: 45.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Bestseller Fiction Novel',
    slug: {
      _type: 'slug',
      current: 'bestseller-fiction-novel'
    },
    description: 'Immerse yourself in this captivating bestselling novel that has taken the literary world by storm. A perfect blend of mystery, romance, and adventure that will keep you turning pages.',
    category: 'Books',
    price: 14.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Natural Skincare Set',
    slug: {
      _type: 'slug',
      current: 'natural-skincare-set'
    },
    description: 'Complete skincare routine with natural and organic ingredients. Includes cleanser, toner, serum, and moisturizer. Suitable for all skin types and cruelty-free.',
    category: 'Beauty',
    price: 79.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Bluetooth Car Adapter',
    slug: {
      _type: 'slug',
      current: 'bluetooth-car-adapter'
    },
    description: 'Transform your car stereo with this wireless Bluetooth adapter. Features hands-free calling, music streaming, and dual USB charging ports. Easy plug-and-play installation.',
    category: 'Automotive',
    price: 24.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Educational Building Blocks',
    slug: {
      _type: 'slug',
      current: 'educational-building-blocks'
    },
    description: 'Stimulate creativity and learning with these premium wooden building blocks. Safe, non-toxic materials perfect for children ages 3+. Includes carrying case and instruction booklet.',
    category: 'Toys & Games',
    price: 39.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Indoor Plant Collection',
    slug: {
      _type: 'slug',
      current: 'indoor-plant-collection'
    },
    description: 'Bring nature indoors with this curated collection of low-maintenance houseplants. Perfect for beginners and includes care instructions and decorative pots.',
    category: 'Home & Garden',
    price: 54.99,
    availability: false
  },
  {
    _type: 'product',
    title: 'Professional Running Shoes',
    slug: {
      _type: 'slug',
      current: 'professional-running-shoes'
    },
    description: 'High-performance running shoes designed for serious athletes. Features advanced cushioning, breathable mesh upper, and durable rubber outsole. Available in multiple colors.',
    category: 'Sports',
    price: 129.99,
    availability: true
  }
]

// GROQ query to use in Sanity Vision tool for importing:
/*
Copy and paste this into Sanity's Vision tool to create all products at once:

[
  ...paste the sampleProductsForSanity array here...
]

Then click "Execute" to import all products.
*/
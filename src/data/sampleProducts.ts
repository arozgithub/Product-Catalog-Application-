// Sample product data for development and testing
// This data can be imported into Sanity or used for mock data during development

// Define the Product type locally to avoid import issues during fallback
interface ProductImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

interface ProductSlug {
  current: string
}

export interface SampleProduct {
  title: string
  slug: ProductSlug
  description: string
  image: ProductImage
  category: string
  price: number
  availability: boolean
}

export const sampleProducts: SampleProduct[] = [
  {
    title: "Premium Wireless Headphones",
    slug: { current: "premium-wireless-headphones" },
    description: "Experience crystal-clear audio with these premium wireless headphones featuring active noise cancellation, 30-hour battery life, and premium materials. Perfect for music lovers and professionals alike.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Premium wireless headphones in black"
    },
    category: "Electronics",
    price: 199.99,
    availability: true
  },
  {
    title: "Organic Cotton T-Shirt",
    slug: { current: "organic-cotton-tshirt" },
    description: "Sustainable and comfortable organic cotton t-shirt made from 100% certified organic materials. Available in multiple colors and sizes. Perfect for everyday wear with a conscience.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Organic cotton t-shirt"
    },
    category: "Clothing",
    price: 29.99,
    availability: true
  },
  {
    title: "Smart Home Security Camera",
    slug: { current: "smart-home-security-camera" },
    description: "Keep your home secure with this advanced WiFi security camera featuring 1080p HD video, night vision, two-way audio, and mobile app control. Easy setup and cloud storage included.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Smart security camera"
    },
    category: "Electronics",
    price: 89.99,
    availability: false
  },
  {
    title: "Premium Yoga Mat",
    slug: { current: "premium-yoga-mat" },
    description: "Professional-grade yoga mat with superior grip and cushioning. Made from eco-friendly materials with alignment lines. Perfect for all yoga styles and fitness routines.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Premium yoga mat"
    },
    category: "Sports",
    price: 45.99,
    availability: true
  },
  {
    title: "Bestseller Fiction Novel",
    slug: { current: "bestseller-fiction-novel" },
    description: "Immerse yourself in this captivating bestselling novel that has taken the literary world by storm. A perfect blend of mystery, romance, and adventure that will keep you turning pages.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Fiction novel book cover"
    },
    category: "Books",
    price: 14.99,
    availability: true
  },
  {
    title: "Natural Skincare Set",
    slug: { current: "natural-skincare-set" },
    description: "Complete skincare routine with natural and organic ingredients. Includes cleanser, toner, serum, and moisturizer. Suitable for all skin types and cruelty-free.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Natural skincare products set"
    },
    category: "Beauty",
    price: 79.99,
    availability: true
  },
  {
    title: "Bluetooth Car Adapter",
    slug: { current: "bluetooth-car-adapter" },
    description: "Transform your car stereo with this wireless Bluetooth adapter. Features hands-free calling, music streaming, and dual USB charging ports. Easy plug-and-play installation.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Bluetooth car adapter"
    },
    category: "Automotive",
    price: 24.99,
    availability: true
  },
  {
    title: "Educational Building Blocks",
    slug: { current: "educational-building-blocks" },
    description: "Stimulate creativity and learning with these premium wooden building blocks. Safe, non-toxic materials perfect for children ages 3+. Includes carrying case and instruction booklet.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Wooden building blocks set"
    },
    category: "Toys & Games",
    price: 39.99,
    availability: true
  },
  {
    title: "Indoor Plant Collection",
    slug: { current: "indoor-plant-collection" },
    description: "Bring nature indoors with this curated collection of low-maintenance houseplants. Perfect for beginners and includes care instructions and decorative pots.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Collection of indoor plants"
    },
    category: "Home & Garden",
    price: 54.99,
    availability: false
  },
  {
    title: "Professional Running Shoes",
    slug: { current: "professional-running-shoes" },
    description: "High-performance running shoes designed for serious athletes. Features advanced cushioning, breathable mesh upper, and durable rubber outsole. Available in multiple colors.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Professional running shoes"
    },
    category: "Sports",
    price: 129.99,
    availability: true
  },
  {
    title: "Vintage Leather Wallet",
    slug: { current: "vintage-leather-wallet" },
    description: "Handcrafted genuine leather wallet with vintage styling. Features multiple card slots, bill compartment, and coin pocket. Ages beautifully with use.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Vintage leather wallet"
    },
    category: "Clothing",
    price: 49.99,
    availability: true
  },
  {
    title: "Wireless Charging Station",
    slug: { current: "wireless-charging-station" },
    description: "Multi-device wireless charging station supporting smartphones, earbuds, and smartwatches. Fast charging with overheating protection and LED indicators.",
    image: {
      asset: {
        _ref: "image-placeholder",
        _type: "reference"
      },
      alt: "Wireless charging station"
    },
    category: "Electronics",
    price: 69.99,
    availability: true
  }
]

export const categories = [
  "Electronics",
  "Clothing", 
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
  "Automotive",
  "Toys & Games"
]
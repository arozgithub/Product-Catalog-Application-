import Image from 'next/image'
import Link from 'next/link'
import { ProductCardProps } from '@/types'

// Try to import urlFor, but handle if Sanity is not configured
let urlFor: any = null
try {
  urlFor = require('@/lib/sanity').urlFor
} catch (error) {
  console.log('Sanity not configured, using placeholder images')
}

export default function ProductCard({ product }: ProductCardProps) {
  // Handle image URL generation with fallback
  let imageUrl = '/api/placeholder/400/300'
  
  if (product.image && urlFor) {
    try {
      imageUrl = urlFor(product.image).width(400).height(300).url()
    } catch (error) {
      imageUrl = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center`
    }
  } else {
    // Use a category-based placeholder image from Unsplash
    const categoryImages: { [key: string]: string } = {
      'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      'Clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      'Home & Garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'Sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'Books': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      'Automotive': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
      'Toys & Games': 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop'
    }
    imageUrl = categoryImages[product.category] || categoryImages['Electronics']
  }
  
  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.image?.alt || product.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+0VsNf/9k="
        />
        {!product.availability && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          
          <Link 
            href={`/product/${product.slug.current}`}
            className={`btn-primary text-sm ${!product.availability ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            View Details
          </Link>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.availability 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.availability ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  )
}
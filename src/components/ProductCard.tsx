import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { ProductCardProps } from '@/types'

// Try to import urlFor, but handle if Sanity is not configured
let urlFor: any = null
try {
  urlFor = require('@/lib/sanity').urlFor
} catch (error) {
  console.log('Sanity not configured, using placeholder images')
}

interface ExtendedProductCardProps extends ProductCardProps {
  onDelete?: (productId: string) => void
  showDeleteButton?: boolean
}

export default function ProductCard({ product, onDelete, showDeleteButton = false }: ExtendedProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleDelete = async () => {
    if (!onDelete) return
    
    try {
      setIsDeleting(true)
      await onDelete(product._id)
      setShowConfirmDialog(false)
    } catch (error) {
      console.error('Error deleting product:', error)
    } finally {
      setIsDeleting(false)
    }
  }
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
    <div className="product-card group relative">
      {/* Delete Button */}
      {showDeleteButton && (
        <button
          onClick={() => setShowConfirmDialog(true)}
          disabled={isDeleting}
          className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50"
          title="Delete Product"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      )}

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
      
      {/* Delete Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{product.title}"? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, PRODUCT_BY_SLUG_QUERY, RELATED_PRODUCTS_QUERY, urlFor } from '@/lib/sanity'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import { ArrowLeftIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return

      try {
        setLoading(true)
        
        // Fetch product details
        const productData = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
        setProduct(productData)

        // Fetch related products if product exists
        if (productData) {
          const relatedData = await client.fetch(RELATED_PRODUCTS_QUERY, { 
            category: productData.category,
            slug: productData.slug.current 
          })
          setRelatedProducts(relatedData || [])
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [slug])

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="bg-gray-200 h-8 w-32 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-200 h-96 rounded"></div>
          <div className="space-y-4">
            <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-12 w-1/3 rounded"></div>
            <div className="space-y-2">
              <div className="bg-gray-200 h-4 rounded"></div>
              <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
              <div className="bg-gray-200 h-4 w-4/6 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="btn-primary">
          Back to Products
        </Link>
      </div>
    )
  }

  const imageUrl = product.image ? urlFor(product.image).width(800).height(600).url() : '/placeholder-image.jpg'

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm">
        <Link href="/" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={imageUrl}
              alt={product.image?.alt || product.title}
              width={800}
              height={600}
              className="w-full h-96 lg:h-[500px] object-cover"
              priority
            />
            {!product.availability && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div>
            <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ShareIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.availability 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.availability ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              disabled={!product.availability}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
                product.availability
                  ? 'bg-primary-500 hover:bg-primary-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.availability ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="w-full py-3 px-6 border-2 border-primary-500 text-primary-500 hover:bg-primary-50 rounded-lg font-semibold text-lg transition-all">
              Add to Wishlist
            </button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                High quality materials
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                Fast and secure shipping
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                30-day return policy
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                Customer support
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
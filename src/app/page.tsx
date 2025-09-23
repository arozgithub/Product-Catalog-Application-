'use client'

import { useState, useEffect, useMemo } from 'react'
import { Product, FilterState } from '@/types'
import ProductGrid from '@/components/ProductGrid'
import ProductFilters from '@/components/ProductFilters'
import DemoNotice from '@/components/DemoNotice'
import ErrorBoundary from '@/components/ErrorBoundary'
import { sampleProducts } from '@/data/sampleProducts'

// Try to import Sanity client, but fallback to sample data if not available
let client: any = null
let PRODUCTS_QUERY = ''

try {
  const sanity = require('@/lib/sanity')
  client = sanity.client
  PRODUCTS_QUERY = sanity.PRODUCTS_QUERY
} catch (error) {
  console.log('Sanity not configured, using sample data')
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isUsingDemoData, setIsUsingDemoData] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'title-asc'
  })

  // Fetch products from Sanity or use sample data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        if (client && PRODUCTS_QUERY) {
          // Try to fetch from Sanity
          const data = await client.fetch(PRODUCTS_QUERY)
          setProducts(data || [])
        } else {
          // Use sample data as fallback
          console.log('Using sample products data')
          setIsUsingDemoData(true)
          // Add mock _id to sample products
          const productsWithId = sampleProducts.map((product: any, index: number) => ({
            ...product,
            _id: `sample-${index}`
          }))
          setProducts(productsWithId)
        }
      } catch (error) {
        console.error('Error fetching products, using sample data:', error)
        setIsUsingDemoData(true)
        // Fallback to sample data
        const productsWithId = sampleProducts.map((product: any, index: number) => ({
          ...product,
          _id: `sample-${index}`
        }))
        setProducts(productsWithId)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))]
    return uniqueCategories.sort()
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category === filters.category
      )
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [products, filters])

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        {/* Demo Notice */}
        {isUsingDemoData && <DemoNotice />}
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium products with advanced search and filtering capabilities.
          </p>
        </div>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-1 mb-8 lg:mb-0">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
          />
        </div>

        {/* Main Content - Products */}
        <div className="lg:col-span-3">
          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              {loading ? (
                'Loading products...'
              ) : (
                <>
                  Showing {filteredProducts.length} of {products.length} products
                  {filters.search && (
                    <span className="ml-2 text-primary-600 font-medium">
                      for "{filters.search}"
                    </span>
                  )}
                  {filters.category && (
                    <span className="ml-2 text-primary-600 font-medium">
                      in {filters.category}
                    </span>
                  )}
                </>
              )}
            </div>
            
            {!loading && filteredProducts.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <span>Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev: FilterState) => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </div>
      </div>
    </ErrorBoundary>
  )
}
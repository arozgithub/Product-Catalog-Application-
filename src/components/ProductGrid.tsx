import ProductCard from './ProductCard'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="bg-gray-200 h-3 rounded w-1/2"></div>
              <div className="bg-gray-200 h-6 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.712-3.714M14 40v-4a9.971 9.971 0 01.712-3.714m0 0A9.971 9.971 0 0118 32a9.971 9.971 0 013.288 2.286m-.712 9.714L18 32l-2.288 11.714"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 mb-4">
          We couldn't find any products matching your search criteria.
        </p>
        <p className="text-sm text-gray-400">
          Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div key={product._id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
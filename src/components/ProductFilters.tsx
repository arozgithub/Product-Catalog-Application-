import { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { FilterState } from '@/types'

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  categories: string[]
}

export default function ProductFilters({ filters, onFiltersChange, categories }: ProductFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const resetFilters = () => {
    // Calculate max price from available products
    const maxProductPrice = Math.max(1000, filters.maxPrice) // Ensure at least 1000 as fallback
    onFiltersChange({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: maxProductPrice,
      sortBy: 'title-asc'
    })
  }

  return (
    <div className="filter-section">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 btn-secondary w-full justify-center"
        >
          <FunnelIcon className="h-5 w-5" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block space-y-6`}>
        {/* Search Bar */}
        <div className="relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by title..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field pl-10"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="minPrice" className="block text-xs text-gray-500 mb-1">
                Min Price
              </label>
              <input
                id="minPrice"
                type="number"
                min="0"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-xs text-gray-500 mb-1">
                Max Price
              </label>
              <input
                id="maxPrice"
                type="number"
                min="0"
                placeholder={filters.maxPrice?.toString() || "1000"}
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || filters.maxPrice)}
                className="input-field"
              />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            ${filters.minPrice} - ${filters.maxPrice}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
            className="input-field"
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Reset Filters */}
        <div>
          <button
            onClick={resetFilters}
            className="btn-secondary w-full text-sm"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}
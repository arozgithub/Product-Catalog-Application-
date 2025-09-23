export interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  category: string
  price: number
  availability: boolean
}

export interface FilterState {
  search: string
  category: string
  minPrice: number
  maxPrice: number
  sortBy: 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc'
}

export interface ProductCardProps {
  product: Product
}

export interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}
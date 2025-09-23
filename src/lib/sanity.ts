import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  image,
  category,
  price,
  availability
}`

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  image,
  category,
  price,
  availability
}`

export const RELATED_PRODUCTS_QUERY = `*[_type == "product" && category == $category && slug.current != $slug] | order(_createdAt desc) [0...4] {
  _id,
  title,
  slug,
  description,
  image,
  category,
  price,
  availability
}`

export const CATEGORIES_QUERY = `*[_type == "product"] | order(category asc) {
  category
}`
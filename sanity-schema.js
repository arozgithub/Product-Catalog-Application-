// This is the Sanity schema for your Product Catalog
// Copy this to your Sanity Studio project

export const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().min(10).max(500)
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Electronics', value: 'Electronics' },
          { title: 'Clothing', value: 'Clothing' },
          { title: 'Home & Garden', value: 'Home & Garden' },
          { title: 'Sports', value: 'Sports' },
          { title: 'Books', value: 'Books' },
          { title: 'Beauty', value: 'Beauty' },
          { title: 'Automotive', value: 'Automotive' },
          { title: 'Toys & Games', value: 'Toys & Games' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'availability',
      title: 'Available',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category',
      price: 'price'
    },
    prepare(selection) {
      const { title, media, subtitle, price } = selection
      return {
        title,
        media,
        subtitle: `${subtitle} - $${price}`
      }
    }
  }
}

// To use this schema in your Sanity Studio:
// 1. Install Sanity CLI: npm install -g @sanity/cli
// 2. Create a new Sanity project: sanity init
// 3. Add this schema to your schemas/index.js file:
//    import { productSchema } from './product'
//    export default createSchema({
//      name: 'default',
//      types: schemaTypes.concat([productSchema])
//    })
// 4. Deploy your schema: sanity deploy
//
// Sample products to add to your Sanity dataset:
export const sampleProducts = [
  {
    _type: 'product',
    title: 'Premium Wireless Headphones',
    slug: { current: 'premium-wireless-headphones' },
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    category: 'Electronics',
    price: 199.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Organic Cotton T-Shirt',
    slug: { current: 'organic-cotton-tshirt' },
    description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
    category: 'Clothing',
    price: 29.99,
    availability: true
  },
  {
    _type: 'product',
    title: 'Smart Home Security Camera',
    slug: { current: 'smart-home-security-camera' },
    description: 'WiFi-enabled security camera with night vision and mobile app control.',
    category: 'Electronics',
    price: 89.99,
    availability: false
  },
  {
    _type: 'product',
    title: 'Yoga Mat Premium',
    slug: { current: 'yoga-mat-premium' },
    description: 'Non-slip, eco-friendly yoga mat perfect for all types of yoga practice.',
    category: 'Sports',
    price: 45.99,
    availability: true
  }
]
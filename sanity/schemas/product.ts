import {defineField, defineType} from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().min(10).max(1000)
    }),
    defineField({
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
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Electronics', value: 'Electronics'},
          {title: 'Clothing', value: 'Clothing'},
          {title: 'Home & Garden', value: 'Home & Garden'},
          {title: 'Sports', value: 'Sports'},
          {title: 'Books', value: 'Books'},
          {title: 'Beauty', value: 'Beauty'},
          {title: 'Automotive', value: 'Automotive'},
          {title: 'Toys & Games', value: 'Toys & Games'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'availability',
      title: 'Available',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category',
      price: 'price'
    },
    prepare(selection) {
      const {title, media, subtitle, price} = selection
      return {
        title,
        media,
        subtitle: `${subtitle} - $${price?.toFixed(2) || '0.00'}`
      }
    }
  }
})
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const product = await request.json()
    
    // Create slug from title
    const slug = product.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Prepare product document
    const productDoc = {
      _type: 'product',
      title: product.title,
      slug: {
        _type: 'slug',
        current: slug
      },
      description: product.description,
      category: product.category,
      price: parseFloat(product.price),
      availability: product.availability,
      ...(product.image && {
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: product.image._ref
          },
          alt: product.title
        }
      })
    }

    const result = await client.create(productDoc)
    
    return NextResponse.json({ 
      success: true, 
      data: result 
    })
    
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create product' 
      }, 
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('id')
    
    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await client.delete(productId)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    })
    
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete product' 
      }, 
      { status: 500 }
    )
  }
}
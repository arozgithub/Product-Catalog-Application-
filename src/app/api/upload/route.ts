import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      )
    }

    // Upload image to Sanity
    const imageAsset = await writeClient.assets.upload('image', image, {
      filename: image.name
    })
    
    return NextResponse.json({ 
      success: true, 
      data: imageAsset 
    })
    
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload image' 
      }, 
      { status: 500 }
    )
  }
}
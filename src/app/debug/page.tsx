'use client'

import { useEffect, useState } from 'react'

export default function DiagnosticPage() {
  const [diagnostics, setDiagnostics] = useState<any>({})
  
  useEffect(() => {
    const runDiagnostics = async () => {
      const results: any = {}
      
      // Check environment variables
      results.envVars = {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        hasToken: !!process.env.SANITY_API_TOKEN
      }
      
      // Test Sanity connection
      try {
        const { client, PRODUCTS_QUERY } = await import('@/lib/sanity')
        console.log('Client imported successfully')
        
        const products = await client.fetch(PRODUCTS_QUERY)
        results.sanity = {
          connected: true,
          productCount: products?.length || 0,
          products: products?.map((p: any) => ({ title: p.title, price: p.price })) || []
        }
      } catch (error: any) {
        console.error('Sanity connection failed:', error)
        results.sanity = {
          connected: false,
          error: error.message
        }
      }
      
      // Check sample data
      try {
        const { sampleProducts } = await import('@/data/sampleProducts')
        results.sampleData = {
          count: sampleProducts.length,
          titles: sampleProducts.map(p => p.title)
        }
      } catch (error: any) {
        results.sampleData = {
          error: error.message
        }
      }
      
      setDiagnostics(results)
    }
    
    runDiagnostics()
  }, [])
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">System Diagnostics</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Environment Variables</h2>
          <pre className="text-sm">{JSON.stringify(diagnostics.envVars, null, 2)}</pre>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Sanity Connection</h2>
          <pre className="text-sm">{JSON.stringify(diagnostics.sanity, null, 2)}</pre>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Sample Data</h2>
          <pre className="text-sm">{JSON.stringify(diagnostics.sampleData, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
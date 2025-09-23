import type { Metadata } from 'next'
import '../styles/globals.css'

// Using system fonts as fallback to avoid Google Fonts fetch issues
const fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

export const metadata: Metadata = {
  title: 'Product Catalog - Premium Shopping Experience',
  description: 'Discover amazing products with advanced search and filtering capabilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily }}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Product Catalog
                  </h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Home
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Categories
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About
                  </a>
                </nav>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <footer className="bg-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Catalog</h3>
                  <p className="text-gray-400">
                    Your premium destination for quality products with advanced search capabilities.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Clothing</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Home & Garden</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Sports</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Facebook
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Product Catalog. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
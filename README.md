# Product Catalog Application

A modern, responsive product catalog application built with Next.js, TypeScript, Sanity CMS, and Tailwind CSS. Features advanced search, filtering, and product detail functionality.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Advanced Search**: Real-time product title search
- **Smart Filtering**: Filter by category, price range, and availability
- **Sorting Options**: Sort products by price (high/low) and title (A-Z)
- **Product Details**: Detailed product pages with related products
- **Modern UI**: Clean, professional design with smooth animations
- **SEO Optimized**: Built with Next.js 14 and optimized for search engines

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **CMS**: Sanity (Headless CMS)
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Image Optimization**: Next.js Image component
- **Responsive Design**: Mobile-first approach

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account (free tier available)

## 🚀 Quick Start

### Option 1: Demo Mode (Immediate)
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) - works immediately with sample data!

### Option 2: Full Sanity CMS Integration

1. **Install Dependencies**:
```bash
npm install
npm run setup-sanity
```

2. **Create Sanity Project**:
   - Go to [sanity.io](https://sanity.io) and create account
   - Create new project and copy Project ID

3. **Configure Environment**:
   - Update `sanity/.env.local` with your Project ID
   - Update main `.env.local` with same Project ID

4. **Deploy & Run**:
```bash
npm run sanity-deploy  # Deploy schema to Sanity
npm run sanity-dev     # Start Sanity Studio
npm run dev           # Start main app (separate terminal)
```

5. **Add Products**: 
   - Open Sanity Studio at http://localhost:3333
   - Add products with images
   - Your app automatically updates!

📖 **See [SANITY_SETUP.md](SANITY_SETUP.md) for detailed instructions**

## 📊 Sanity Schema

The application uses a comprehensive Product schema with the following fields:

- `title` (string, required): Product name
- `slug` (slug, required): URL-friendly identifier
- `description` (text, required): Product description
- `image` (image, required): Product image with alt text
- `category` (string, required): Product category
- `price` (number, required): Product price
- `availability` (boolean): Stock availability

### Sample Categories

- Electronics
- Clothing
- Home & Garden  
- Sports
- Books
- Beauty
- Automotive
- Toys & Games

## 🎨 Design Features

- **Product Cards**: Hover effects with smooth transitions
- **Responsive Grid**: 1-4 columns based on screen size
- **Loading States**: Skeleton loading for better UX
- **Empty States**: Friendly messages when no products found
- **Mobile Filters**: Collapsible filter section on mobile
- **Image Optimization**: Next.js Image with blur placeholders

## 🔍 Search & Filter Features

### Search
- Real-time search by product title
- Case-insensitive matching

### Filters
- **Category Filter**: Dropdown with all available categories
- **Price Range**: Min/max price inputs
- **Sort Options**: 
  - Title A-Z / Z-A
  - Price Low to High / High to Low

### Results
- Live result count
- Filter combination support
- Smooth animations

## 📱 Pages

### Home Page (`/`)
- Product grid with search and filters
- Responsive design
- Real-time filtering and sorting

### Product Detail Page (`/product/[slug]`)
- Full product information
- High-quality image display
- Related products section
- Favorite and share functionality
- Availability status
- Call-to-action buttons

## 🎯 Performance Optimizations

- **Next.js 14**: App Router with server components
- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Built-in caching for Sanity queries
- **Bundle Optimization**: Tree-shaking and minification

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── product/
│       └── [slug]/
│           └── page.tsx    # Product detail page
├── components/
│   ├── ProductCard.tsx     # Individual product card
│   ├── ProductFilters.tsx  # Search and filter controls
│   └── ProductGrid.tsx     # Products grid layout
├── lib/
│   └── sanity.ts          # Sanity client configuration
├── types/
│   └── index.ts           # TypeScript type definitions
└── styles/
    └── globals.css        # Global styles
```

## 🎨 Styling

Built with Tailwind CSS featuring:
- Custom color palette
- Responsive design utilities
- Hover and transition effects
- Component-based styling
- Dark mode ready (extendable)

## 🔧 Development

### Key Components

1. **ProductCard**: Displays individual products with image, title, price
2. **ProductFilters**: Handles search, category, and price filtering
3. **ProductGrid**: Manages product layout and loading states

### State Management

Uses React hooks for local state:
- `useState` for component state
- `useEffect` for data fetching
- `useMemo` for computed values (filtering, sorting)

### Data Fetching

- Sanity client for CMS data
- GROQ queries for efficient data retrieval
- Error handling and loading states

## 📈 Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Product reviews and ratings
- [ ] Advanced filtering (brand, ratings, etc.)
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Search suggestions
- [ ] Infinite scroll/pagination

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Sanity for the powerful headless CMS
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful icons

---

Built with ❤️ using Next.js, TypeScript, Sanity, and Tailwind CSS
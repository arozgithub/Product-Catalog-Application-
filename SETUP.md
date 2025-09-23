# Product Catalog Application - Setup Guide

## Quick Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env.local` file with your Sanity configuration:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run Development Server
```bash
npm run dev
```

## Sanity CMS Setup

### Option 1: New Sanity Project
1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Install Sanity CLI: `npm install -g @sanity/cli`
4. Initialize studio: `sanity init`
5. Use the schema from `sanity-schema.js`
6. Deploy: `sanity deploy`

### Option 2: Use Mock Data
For quick testing, the application includes sample data. The components will work with mock data during development.

## Project Features

✅ **Implemented Features:**
- Responsive product grid layout
- Advanced search and filtering
- Product detail pages
- Category filtering
- Price range filtering
- Sort functionality
- Loading states
- Error handling
- SEO optimization
- Mobile-responsive design

## Folder Structure
```
src/
├── app/                 # Next.js 14 App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── product/        
│       └── [slug]/     # Dynamic product pages
├── components/         # Reusable components
├── lib/               # Utility functions
├── types/             # TypeScript definitions
├── styles/            # Global styles
└── data/              # Sample data
```

## Technology Stack
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Sanity**: Headless CMS
- **Heroicons**: Icon library

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues:
1. **Module not found errors**: Run `npm install`
2. **Sanity connection**: Check environment variables
3. **Image loading**: Ensure Sanity images are publicly accessible
4. **Build errors**: Check TypeScript types

### Development Tips:
- Use React DevTools for debugging
- Check browser console for errors
- Sanity Studio provides content management interface
- Tailwind CSS classes can be customized in `tailwind.config.js`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
Compatible with any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform
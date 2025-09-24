# 🚀 Vercel Deployment Guide

## Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/cli) (optional)
- Git repository pushed to GitHub/GitLab/Bitbucket

## Method 1: Deploy via Vercel Dashboard (Recommended)

### 1. Connect Your Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Select "Product-Catalog-Application-" repository

### 2. Configure Project Settings
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 3. Set Environment Variables
Go to "Environment Variables" section and add:

```bash
# Required Environment Variables
NEXT_PUBLIC_SANITY_PROJECT_ID=5fxm68gv
NEXT_PUBLIC_SANITY_DATASET=staging
SANITY_API_TOKEN=skvz5tq2XewZWSejr8VEJ7OHYZiEpV72DhOMEum7ToX6dJJYcyLC0x3a5RiTcP8TK3WgAHnIFACkrAo9nkhC9zz7tHc11k66fMSGIRvAmfZ2kI73cCdt1vpxHwsLOHFOMDdYjkjgYgcf1fHsVsyn09DtqQ9kHBwa0MWWOG4JwTtYXM0BbRVU
```

**Important**: Set these for **Production**, **Preview**, and **Development** environments.

### 4. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be live at `https://your-app-name.vercel.app`

## Method 2: Deploy via Vercel CLI

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
# From your project root
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? (enter desired name)
# - Directory? ./
```

### 4. Set Environment Variables
```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET  
vercel env add SANITY_API_TOKEN
```

## Post-Deployment Steps

### 1. Update Sanity CORS Settings
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project (5fxm68gv)
3. Go to "API" → "CORS origins"
4. Add your Vercel URL: `https://your-app-name.vercel.app`
5. Enable credentials: `true`

### 2. Test Your Deployment
- ✅ Products load correctly
- ✅ Product detail pages work
- ✅ Admin panel functions (add products)
- ✅ Delete functionality works
- ✅ Images display properly

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Products Don't Load
- Check Sanity CORS settings
- Verify environment variables
- Check browser console for errors

### Images Don't Display
- Update next.config.js if needed
- Check Sanity image URLs
- Verify CORS settings

## Production Recommendations

### 1. Use Production Dataset
Update environment variable:
```bash
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Enable ISR (Incremental Static Regeneration)
Products are automatically cached and revalidated.

### 3. Monitor Performance
- Use Vercel Analytics
- Monitor Core Web Vitals
- Check Sanity API usage

## Custom Domain (Optional)
1. Go to Vercel dashboard → Your project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Sanity CORS settings with new domain

---

Your Product Catalog Application is now ready for production! 🎉
# Sanity CMS Integration Guide

## 🚀 Complete Setup Instructions

Follow these steps to connect your Product Catalog Application with Sanity CMS:

### Step 1: Create Sanity Account & Project

1. **Go to [sanity.io](https://sanity.io)** and create a free account
2. **Create a new project**:
   - Choose "Create new project"
   - Give it a name like "Product Catalog"
   - Choose "Production" dataset
   - Copy the **Project ID** (you'll need this)

### Step 2: Install Sanity CLI

```bash
npm install -g @sanity/cli
```

### Step 3: Set Up Sanity Studio

Navigate to the sanity folder and install dependencies:

```bash
cd sanity
npm install
```

### Step 4: Configure Environment Variables

1. **Update `sanity/.env.local`** with your project details:
```env
SANITY_STUDIO_PROJECT_ID=your-actual-project-id
SANITY_STUDIO_DATASET=production
```

2. **Update main project `.env.local`** with the same details:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

Alternatively, you can set up the environment with our helper script:

```bash
# Run after updating your project ID in the file
node switch-dataset.js production
```

### Step 5: Deploy Schema to Sanity

From the sanity folder, run:

```bash
cd sanity
npx sanity deploy
```

This will:
- Deploy your Product schema to Sanity
- Create the Studio interface
- Give you a URL to access your Sanity Studio

### Step 6: Start Sanity Studio

```bash
cd sanity
npm run dev
```

This starts the Sanity Studio at `http://localhost:3333`

### Step 7: Add Sample Products

1. Open your Sanity Studio (usually at `http://localhost:3333`)
2. Click "Product" to create new products
3. Fill in all required fields:
   - **Title**: Product name
   - **Slug**: Auto-generated from title
   - **Description**: Product description
   - **Image**: Upload product image
   - **Category**: Select from dropdown
   - **Price**: Enter price as number
   - **Available**: Check if in stock

### Step 8: Test Connection

1. Go back to your main application: `http://localhost:3000`
2. The demo notice should disappear
3. Your Sanity products should now appear
4. Search, filters, and product details should work with your data

## 📊 Product Schema Structure

Your Sanity schema includes:

```typescript
{
  title: string (required)
  slug: slug (required, auto-generated)
  description: text (required)
  image: image (required, with alt text)
  category: string (required, dropdown selection)
  price: number (required)
  availability: boolean (default: true)
}
```

## 🎯 Sample Products to Add

Create these sample products in your Sanity Studio:

### Electronics
- **Premium Wireless Headphones** ($199.99)
- **Smart Home Security Camera** ($89.99)
- **Wireless Charging Station** ($69.99)

### Clothing
- **Organic Cotton T-Shirt** ($29.99)
- **Vintage Leather Wallet** ($49.99)

### Sports
- **Premium Yoga Mat** ($45.99)
- **Professional Running Shoes** ($129.99)

## 🔧 Troubleshooting

### Common Issues:

1. **"Cannot connect to Sanity"**
   - Check your project ID in both `.env.local` files
   - Ensure the project exists in your Sanity dashboard

2. **"Schema not found"**
   - Run `npx sanity deploy` from the sanity folder
   - Check that the schema deployed successfully

3. **"No products showing"**
   - Add at least one product in Sanity Studio
   - Check that the product has all required fields filled

4. **"Images not loading"**
   - Ensure images are uploaded to Sanity (not just referenced)
   - Check that alt text is provided for images

## � Working with Multiple Datasets

This application supports multiple Sanity datasets for different environments:

### Creating Datasets

Create additional datasets using the management tool:

```bash
# Create staging dataset
npm run datasets create staging

# Create development dataset
npm run datasets create development
```

### Switching Between Datasets

Easily switch between datasets:

```bash
# Switch to production
npm run use-production

# Switch to staging
npm run use-staging

# Switch to development
npm run use-development
```

### Managing Dataset Content

After switching datasets, you can manage content in Sanity Studio:

1. Start Sanity Studio: `npm run sanity-dev`
2. Navigate to [http://localhost:3333](http://localhost:3333)
3. Add/edit content in the current dataset

### Copying Data Between Datasets

You can copy data from one dataset to another:

```bash
# Copy production data to staging for testing
npm run datasets copy production staging

# List all available datasets
npm run datasets list

# Show current dataset info
npm run datasets info
```

## 🚀 Quick Commands

```bash
# Start main Next.js app
npm run dev

# Start Sanity Studio (in separate terminal)
npm run sanity-dev

# Deploy schema changes
npm run sanity-deploy

# Build for production
npm run build
cd sanity && npm run build

# Dataset Management
npm run datasets list         # List all datasets
npm run datasets info         # Show current dataset
npm run datasets create name  # Create new dataset
npm run datasets copy src dst # Copy data between datasets
```

## ✅ Verification Checklist

- [ ] Sanity account created
- [ ] Project created with Project ID copied
- [ ] Environment variables updated in both files
- [ ] Schema deployed successfully
- [ ] Sanity Studio accessible and running
- [ ] Sample products added with all required fields
- [ ] Main application shows Sanity data (no demo notice)
- [ ] Search and filters work with real data
- [ ] Product detail pages work with real products
- [ ] Multiple datasets created (production, staging, development)
- [ ] Dataset switching working properly
- [ ] Content copied between datasets as needed

## 🎯 Final Result

Once connected, your application will:
- Load products from Sanity CMS
- Show real product data instead of samples
- Allow content management through Sanity Studio
- Support real-time updates when products change
- Remove the demo mode banner

**Your Product Catalog will be fully production-ready!** 🎉
# How to Add Datasets in Sanity

## 📊 What are Datasets?

Datasets in Sanity are separate data environments within the same project. Common use cases:
- `production` - Live data for your website
- `staging` - Testing environment
- `development` - Local development data

## 🚀 Methods to Add Datasets

### Method 1: Using Sanity CLI (Recommended)

1. **Install Sanity CLI** (if not already installed):
```bash
npm install -g @sanity/cli
```

2. **Login to Sanity**:
```bash
sanity login
```

3. **Navigate to your sanity folder**:
```bash
cd sanity
```

4. **Create a new dataset**:
```bash
sanity dataset create [dataset-name]
```

**Examples:**
```bash
sanity dataset create staging
sanity dataset create development  
sanity dataset create testing
```

### Method 2: Using Sanity Dashboard (Web Interface)

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click on your project: **Product Catalog**
3. Go to **Datasets** tab
4. Click **"Add dataset"**
5. Enter dataset name (e.g., `staging`, `development`)
6. Click **Create**

### Method 3: Programmatically (Advanced)

```bash
# Using Sanity CLI with options
sanity dataset create my-dataset --visibility=public
sanity dataset create my-dataset --visibility=private
```

## 🔧 Configure Your Project to Use Different Datasets

### Update Environment Variables

**For Production Dataset:**
```env
# .env.local (main project)
NEXT_PUBLIC_SANITY_PROJECT_ID=5fxm68gv
NEXT_PUBLIC_SANITY_DATASET=production

# sanity/.env.local (studio)
SANITY_STUDIO_PROJECT_ID=5fxm68gv
SANITY_STUDIO_DATASET=production
```

**For Staging Dataset:**
```env
# .env.staging
NEXT_PUBLIC_SANITY_PROJECT_ID=5fxm68gv
NEXT_PUBLIC_SANITY_DATASET=staging

# sanity/.env.staging  
SANITY_STUDIO_PROJECT_ID=5fxm68gv
SANITY_STUDIO_DATASET=staging
```

**For Development Dataset:**
```env
# .env.development
NEXT_PUBLIC_SANITY_PROJECT_ID=5fxm68gv
NEXT_PUBLIC_SANITY_DATASET=development

# sanity/.env.development
SANITY_STUDIO_PROJECT_ID=5fxm68gv
SANITY_STUDIO_DATASET=development
```

## 📋 Step-by-Step: Add a Staging Dataset

Let's create a staging dataset for your project:

### 1. Create the Dataset
```bash
cd sanity
sanity dataset create staging
```

### 2. Create Environment File for Staging
```bash
# Create sanity/.env.staging
echo "SANITY_STUDIO_PROJECT_ID=5fxm68gv" > .env.staging
echo "SANITY_STUDIO_DATASET=staging" >> .env.staging
```

### 3. Create Main Project Staging Environment
```bash
# Create .env.staging in root
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=5fxm68gv" > ../.env.staging
echo "NEXT_PUBLIC_SANITY_DATASET=staging" >> ../.env.staging
```

### 4. Update Scripts in package.json

Add these scripts to your main `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:staging": "next dev --env=staging",
    "sanity-dev": "cd sanity && npm run dev",
    "sanity-dev:staging": "cd sanity && npm run dev --env=staging"
  }
}
```

## 🎯 Working with Multiple Datasets

### List All Datasets
```bash
cd sanity
sanity dataset list
```

### Copy Data Between Datasets
```bash
# Export from production
sanity dataset export production backup.tar.gz

# Import to staging
sanity dataset import backup.tar.gz staging
```

### Delete a Dataset
```bash
sanity dataset delete [dataset-name]
```

## 🔐 Dataset Visibility & Permissions

### Public vs Private Datasets
- **Public**: Readable by anyone (good for blogs, marketing sites)
- **Private**: Requires authentication (good for user data, sensitive content)

```bash
# Create private dataset
sanity dataset create staging --visibility=private

# Create public dataset  
sanity dataset create blog --visibility=public
```

## 🚀 Quick Commands for Your Project

**With your current setup (Project ID: 5fxm68gv):**

```bash
# Create staging dataset
cd sanity
sanity dataset create staging

# Create development dataset
sanity dataset create development

# List all your datasets
sanity dataset list

# Deploy schema to specific dataset
sanity deploy --dataset=staging
sanity deploy --dataset=development
```

## ⚙️ Advanced Configuration

### Multiple Studio Configs

Create different studio configs for different datasets:

**sanity/sanity.config.production.ts:**
```typescript
export default defineConfig({
  name: 'production',
  title: 'Product Catalog (Production)',
  projectId: '5fxm68gv',
  dataset: 'production',
  // ... rest of config
})
```

**sanity/sanity.config.staging.ts:**
```typescript
export default defineConfig({
  name: 'staging', 
  title: 'Product Catalog (Staging)',
  projectId: '5fxm68gv',
  dataset: 'staging',
  // ... rest of config
})
```

### Environment-Specific Scripts

Update your `sanity/package.json`:

```json
{
  "scripts": {
    "dev": "sanity dev",
    "dev:staging": "sanity dev --dataset=staging",
    "dev:production": "sanity dev --dataset=production",
    "deploy": "sanity deploy",
    "deploy:staging": "sanity deploy --dataset=staging"
  }
}
```

## ✅ Quick Start for Your Project

Since you already have production set up, here's the fastest way to add a staging environment:

```bash
# 1. Navigate to sanity folder
cd sanity

# 2. Create staging dataset
sanity dataset create staging

# 3. Deploy schema to staging
sanity deploy --dataset=staging

# 4. Start studio with staging data
sanity dev --dataset=staging
```

Now you can:
- Use **production** dataset for live site
- Use **staging** dataset for testing
- Keep them completely separate

## 🎯 Best Practices

1. **Always start with production dataset**
2. **Use staging for testing schema changes**  
3. **Use development for local testing**
4. **Never delete production dataset**
5. **Regular backups of production data**

Your project is now ready for multiple environments! 🚀
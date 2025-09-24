// copy-dataset.js
// This script copies all documents from one dataset to another

const sanityClient = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5fxm68gv';
const token = process.env.SANITY_API_TOKEN;

// Source dataset to copy from
const sourceDataset = 'production';
// Target dataset to copy to
const targetDataset = 'staging';

console.log(`This script would copy all content from "${sourceDataset}" to "${targetDataset}"`);
console.log('However, it requires a SANITY_API_TOKEN with write access to work.');
console.log('\nAlternative approaches:');
console.log('1. Use the Sanity dashboard to copy datasets:');
console.log('   - Go to https://www.sanity.io/manage');
console.log('   - Select your project');
console.log('   - Go to Datasets section');
console.log('   - Use the "Copy" option next to your production dataset');
console.log('\n2. Use the Sanity CLI to export/import:');
console.log('   npx sanity dataset export production production.tar.gz');
console.log('   npx sanity dataset import production.tar.gz staging');
console.log('\n3. Add products manually through the Sanity Studio interface:');
console.log('   - Open http://localhost:3333');
console.log('   - Make sure "staging" dataset is selected');
console.log('   - Create products manually');

/* 
// This part requires a Sanity write token (SANITY_API_TOKEN) to work
// Uncomment if you have a token configured

async function copyDataset() {
  if (!token) {
    console.error('SANITY_API_TOKEN not found in .env.local');
    console.error('Please add your token to use this script.');
    return;
  }

  // Source client (read from)
  const sourceClient = sanityClient({
    projectId,
    dataset: sourceDataset,
    apiVersion: '2023-09-24',
    token,
    useCdn: false,
  });

  // Target client (write to)
  const targetClient = sanityClient({
    projectId,
    dataset: targetDataset,
    apiVersion: '2023-09-24',
    token,
    useCdn: false,
  });

  try {
    // Fetch all documents from source dataset
    const documents = await sourceClient.fetch('*');
    console.log(`Found ${documents.length} documents in "${sourceDataset}" dataset`);

    // Create documents in target dataset
    let createdCount = 0;
    for (const doc of documents) {
      // Create a new document without the _rev field
      const { _rev, ...docWithoutRev } = doc;
      await targetClient.createOrReplace(docWithoutRev);
      createdCount++;
      console.log(`Copied document ${createdCount}/${documents.length}: ${doc._id}`);
    }

    console.log(`\nSuccessfully copied ${createdCount} documents from "${sourceDataset}" to "${targetDataset}"`);
  } catch (error) {
    console.error('Error copying documents:', error.message);
  }
}

copyDataset();
*/
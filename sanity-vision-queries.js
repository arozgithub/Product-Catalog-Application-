// sanity-vision-queries.js
// Useful GROQ queries to run in Sanity Vision tool

console.log('=== Useful Sanity Vision Queries ===\n');

console.log('1. All products:');
console.log('*[_type == "product"]');

console.log('\n2. Products with all fields:');
console.log('*[_type == "product"] {');
console.log('  _id,');
console.log('  title,');
console.log('  slug,');
console.log('  description,');
console.log('  category,');
console.log('  price,');
console.log('  availability,');
console.log('  image,');
console.log('  _createdAt,');
console.log('  _updatedAt');
console.log('}');

console.log('\n3. Count products:');
console.log('count(*[_type == "product"])');

console.log('\n4. Products by category:');
console.log('*[_type == "product"] | group by category');

console.log('\n5. All document types:');
console.log('array::unique(*[]._type)');

console.log('\n=== Instructions ===');
console.log('1. Open Sanity Studio: http://localhost:3333');
console.log('2. Look for the "Vision" tab in the top navigation');
console.log('3. Copy and paste any of the queries above');
console.log('4. Click "Execute" to run the query');
console.log('5. This will show you exactly what data exists in your dataset');

console.log('\n=== Expected Results ===');
console.log('You should see 5 products:');
console.log('- Premium Wireless Headphones ($199.99)');
console.log('- Organic Cotton T-Shirt ($29.99)');
console.log('- Smart Home Security Camera ($89.99)');
console.log('- Professional Running Shoes ($129.99)');
console.log('- Vintage Leather Wallet ($49.99)');

console.log('\nIf you don\'t see these products, check:');
console.log('- Dataset selector in top bar shows "staging"');
console.log('- Browser console for any errors');
console.log('- Try refreshing the Studio page');
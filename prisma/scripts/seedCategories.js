/**
* Seed Default Property Categories
*
* Creates default categories for properties.
* Safe to run multiple times (idempotent).
*/

import { prisma } from '../../src/config/db.js';

const defaultCategories = [
{ name: 'Apartment', description: 'Residential apartments' },
{ name: 'House', description: 'Independent houses' },
{ name: 'Studio', description: 'Small studio units' },
{ name: 'Villa', description: 'Luxury villas' },
];

async function seedCategories() {
console.log('🌱 Seeding property categories...');

for (const category of defaultCategories) {
await prisma.categories.upsert({
where: { name: category.name },
update: {}, // do nothing if exists
create: category,
});
}

console.log('✅ Categories seeded successfully');
}

// Execute the script if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
seedCategories()
.catch((e) => console.error('❌ Category seed failed:', e))
.finally(() => prisma.$disconnect());
}

export default seedCategories;
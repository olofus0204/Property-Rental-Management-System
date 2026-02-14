/**
* Seed Default Property Managers
*
* Creates manager users and assigns the "manager" role.
* Safe to run multiple times (idempotent).
*/

import bcrypt from 'bcrypt';
import { prisma } from '../../src/config/db.js';
import { UserRole } from '../../src/models/roles.js';

const defaultManagers = [
{ first_name: 'John', last_name: 'Doe', email: 'manager1@example.com', password: 'password123' },
{ first_name: 'Jane', last_name: 'Smith', email: 'manager2@example.com', password: 'password123' },
];

async function seedManagers() {
console.log('🌱 Seeding property managers...');

// Find manager role
const managerRole = await prisma.roles.findUnique({
where: { name: UserRole.MANAGER },
});
if (!managerRole) throw new Error('Manager role does not exist! Run roles seed first.');

for (const manager of defaultManagers) {
// Check if user exists
let user = await prisma.users.findUnique({ where: { email: manager.email } });
if (!user) {
const hashedPassword = await bcrypt.hash(manager.password, 12);
user = await prisma.users.create({
data: {
first_name: manager.first_name,
last_name: manager.last_name,
email: manager.email,
password_hash: hashedPassword,
},
});
console.log(`✅ Manager user created: ${manager.email}`);
} else {
console.log(`ℹ️ Manager user already exists: ${manager.email}`);
}

// Assign manager role (only if not already assigned)
const existingRole = await prisma.user_roles.findFirst({
where: {
user_id: user.id,
role_id: managerRole.id,
revoked_at: null,
},
});

if (!existingRole) {
await prisma.user_roles.create({
data: {
user_id: user.id,
role_id: managerRole.id,
assigned_at: new Date(),
},
});
console.log(`✅ Manager role assigned to: ${manager.email}`);
} else {
console.log(`ℹ️ Manager role already assigned to: ${manager.email}`);
}
}

console.log('🎉 Property managers seeded successfully');
}

// Execute the script if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
seedManagers()
.catch((e) => console.error('❌ Manager seed failed:', e))
.finally(() => prisma.$disconnect());
}

export default seedManagers;
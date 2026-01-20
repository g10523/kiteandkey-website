import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

/**
 * Run this script once (e.g. `npx ts-node scripts/hashPasswords.ts`).
 * It will iterate over all users and replace any password that does NOT look
 * like a bcrypt hash (i.e. does not start with "$2a$" or "$2b$") with a
 * properly hashed version.
 */
async function main() {
    const users = await prisma.user.findMany();
    for (const user of users) {
        // Skip already‑hashed passwords
        if (typeof user.password === 'string' && user.password.startsWith('$2')) {
            continue;
        }
        const plain = user.password ?? '';
        const hashed = await bcrypt.hash(plain, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashed },
        });
        console.log(`🔐 Updated password for ${user.email}`);
    }
}

main()
    .catch((e) => {
        console.error('❌ Error hashing passwords:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

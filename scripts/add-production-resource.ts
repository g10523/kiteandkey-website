// This script can be run on Vercel to add the selective paper to production
// Run with: DATABASE_URL="your-production-url" npx tsx scripts/add-production-resource.ts

import prisma from '../lib/prisma';

async function addProductionResource() {
    console.log('📄 Adding selective exam paper to production...');

    const resource = {
        title: 'Mathematical Reasoning Practice Paper',
        description: 'Sample mathematical reasoning paper for selective schools entrance examination. Covers problem-solving, logical thinking, and mathematical concepts.',
        type: 'PDF' as const,
        category: 'SELECTIVE' as const,
        fileName: '1.pdf',
        fileUrl: '/resources/1.pdf',
        fileSize: 399360, // 390 KB
        mimeType: 'application/pdf',
        yearLevel: 'Year 6',
        tags: ['selective', 'mathematics', 'reasoning', 'practice paper', 'exam preparation'],
        isPublic: true,
        isPinned: true,
    };

    try {
        // Check if it already exists
        const existing = await prisma.resource.findFirst({
            where: { fileUrl: '/resources/1.pdf' }
        });

        if (existing) {
            console.log('✅ Resource already exists in database');
            console.log('📌 Title:', existing.title);
            return;
        }

        const created = await prisma.resource.create({
            data: resource,
        });

        console.log('✅ Successfully added resource to production!');
        console.log('📌 Title:', created.title);
        console.log('📁 File:', created.fileUrl);
        console.log('🔗 Category:', created.category);
        console.log('⭐ Pinned:', created.isPinned);
        console.log('\n🎉 Your resource is now live!');
    } catch (error) {
        console.error('❌ Error adding resource:', error);
        process.exit(1);
    }
}

addProductionResource()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import prisma from './lib/prisma';

async function seedProductionResources() {
    console.log('🌱 Seeding production resources...');

    // Check if resources already exist
    const existingCount = await prisma.resource.count();

    if (existingCount > 0) {
        console.log(`✅ Resources already seeded (${existingCount} resources found)`);
        return;
    }

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
        const created = await prisma.resource.create({
            data: resource,
        });

        console.log('✅ Successfully seeded resource!');
        console.log('📌 Title:', created.title);
        console.log('📁 File:', created.fileUrl);
        console.log('🔗 Category:', created.category);
    } catch (error) {
        console.error('❌ Error seeding resource:', error);
        throw error;
    }
}

seedProductionResources()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

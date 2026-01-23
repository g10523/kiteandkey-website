import prisma from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

async function addSelectivePaper() {
    console.log('📄 Adding selective exam paper...');

    const filePath = path.join(process.cwd(), 'public', 'resources', '1.pdf');

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.error('❌ File not found at:', filePath);
        console.log('Please ensure the file is at: public/resources/1.pdf');
        process.exit(1);
    }

    // Get file size
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    const resource = {
        title: 'Mathematical Reasoning Practice Paper',
        description: 'Sample mathematical reasoning paper for selective schools entrance examination. Covers problem-solving, logical thinking, and mathematical concepts.',
        type: 'PDF' as const,
        category: 'SELECTIVE' as const,
        fileName: '1.pdf',
        fileUrl: '/resources/1.pdf',
        fileSize: fileSize,
        mimeType: 'application/pdf',
        yearLevel: 'Year 6',
        tags: ['selective', 'mathematics', 'reasoning', 'practice paper', 'exam preparation'],
        isPublic: true,
        isPinned: true, // Pin it since it's your first resource!
    };

    try {
        const created = await prisma.resource.create({
            data: resource,
        });

        console.log('✅ Successfully added resource!');
        console.log('📌 Title:', created.title);
        console.log('📁 File:', created.fileUrl);
        console.log('📊 Size:', (fileSize / 1024).toFixed(2), 'KB');
        console.log('🔗 Category:', created.category);
        console.log('⭐ Pinned:', created.isPinned);
        console.log('\n🎉 Your resource is now live at /resources');
    } catch (error) {
        console.error('❌ Error adding resource:', error);
        process.exit(1);
    }
}

addSelectivePaper()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

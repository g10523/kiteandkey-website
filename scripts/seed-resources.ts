import prisma from '../lib/prisma';

async function seedResources() {
    console.log('🌱 Seeding resources...');

    const resources = [
        {
            title: 'Year 7 English Grammar Guide',
            description: 'Comprehensive guide covering all essential grammar topics for Year 7 students.',
            type: 'GUIDE',
            category: 'ENGLISH',
            fileName: 'year-7-grammar-guide.pdf',
            fileUrl: '/sample-resources/year-7-grammar-guide.pdf',
            fileSize: 2457600, // 2.4 MB
            mimeType: 'application/pdf',
            yearLevel: 'Year 7',
            tags: ['grammar', 'punctuation', 'sentence structure'],
            isPublic: true,
            isPinned: true,
        },
        {
            title: 'Algebra Practice Worksheet',
            description: 'Practice problems for basic algebraic equations and expressions.',
            type: 'WORKSHEET',
            category: 'MATHS',
            fileName: 'algebra-practice.pdf',
            fileUrl: '/sample-resources/algebra-practice.pdf',
            fileSize: 1048576, // 1 MB
            mimeType: 'application/pdf',
            yearLevel: 'Year 8',
            tags: ['algebra', 'equations', 'practice'],
            isPublic: true,
            isPinned: false,
        },
        {
            title: 'Science Lab Safety Guide',
            description: 'Essential safety procedures and guidelines for science laboratory work.',
            type: 'GUIDE',
            category: 'SCIENCE',
            fileName: 'lab-safety-guide.pdf',
            fileUrl: '/sample-resources/lab-safety-guide.pdf',
            fileSize: 1572864, // 1.5 MB
            mimeType: 'application/pdf',
            yearLevel: null,
            tags: ['safety', 'laboratory', 'procedures'],
            isPublic: true,
            isPinned: true,
        },
        {
            title: 'Selective Schools Exam Tips',
            description: 'Strategies and tips for preparing for the selective schools entrance exam.',
            type: 'GUIDE',
            category: 'SELECTIVE',
            fileName: 'selective-exam-tips.pdf',
            fileUrl: '/sample-resources/selective-exam-tips.pdf',
            fileSize: 2097152, // 2 MB
            mimeType: 'application/pdf',
            yearLevel: 'Year 6',
            tags: ['selective', 'exam preparation', 'study tips'],
            isPublic: true,
            isPinned: true,
        },
        {
            title: 'Effective Study Techniques',
            description: 'Research-backed study methods to improve learning and retention.',
            type: 'GUIDE',
            category: 'STUDY_SKILLS',
            fileName: 'study-techniques.pdf',
            fileUrl: '/sample-resources/study-techniques.pdf',
            fileSize: 1310720, // 1.25 MB
            mimeType: 'application/pdf',
            yearLevel: null,
            tags: ['study skills', 'memory', 'time management'],
            isPublic: true,
            isPinned: false,
        },
        {
            title: 'Parent Guide to Supporting Learning',
            description: 'Tips for parents on how to support their child\'s educational journey.',
            type: 'GUIDE',
            category: 'PARENT_RESOURCES',
            fileName: 'parent-support-guide.pdf',
            fileUrl: '/sample-resources/parent-support-guide.pdf',
            fileSize: 1835008, // 1.75 MB
            mimeType: 'application/pdf',
            yearLevel: null,
            tags: ['parenting', 'support', 'education'],
            isPublic: true,
            isPinned: false,
        },
        {
            title: 'Essay Writing Template',
            description: 'Structured template for writing persuasive and analytical essays.',
            type: 'TEMPLATE',
            category: 'ENGLISH',
            fileName: 'essay-template.pdf',
            fileUrl: '/sample-resources/essay-template.pdf',
            fileSize: 524288, // 512 KB
            mimeType: 'application/pdf',
            yearLevel: 'Year 9',
            tags: ['essay', 'writing', 'template'],
            isPublic: true,
            isPinned: false,
        },
        {
            title: 'Geometry Formulas Cheat Sheet',
            description: 'Quick reference guide for all essential geometry formulas.',
            type: 'PDF',
            category: 'MATHS',
            fileName: 'geometry-formulas.pdf',
            fileUrl: '/sample-resources/geometry-formulas.pdf',
            fileSize: 786432, // 768 KB
            mimeType: 'application/pdf',
            yearLevel: 'Year 10',
            tags: ['geometry', 'formulas', 'reference'],
            isPublic: true,
            isPinned: false,
        },
    ];

    for (const resource of resources) {
        await prisma.resource.create({
            data: resource,
        });
        console.log(`✅ Created: ${resource.title}`);
    }

    console.log('✨ Resources seeded successfully!');
}

seedResources()
    .catch((e) => {
        console.error('❌ Error seeding resources:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

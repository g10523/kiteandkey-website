import { z } from 'zod'

// ==========================================
// GOAL OPTIONS (Max 3 per group)
// ==========================================

export const ACADEMIC_GOALS = [
    'Improve overall grades',
    'Build confidence in specific subjects',
    'Prepare for upcoming exams',
    'Catch up on missed content',
    'Get ahead of the curriculum',
    'Develop critical thinking skills',
    'Master essay writing',
    'Improve problem-solving abilities',
    'Strengthen foundational knowledge',
    'Achieve specific grade targets',
] as const

export const LEARNING_GOALS = [
    'Develop effective study habits',
    'Improve time management',
    'Build organizational skills',
    'Enhance focus and concentration',
    'Learn note-taking strategies',
    'Master exam techniques',
    'Reduce procrastination',
    'Build independent learning skills',
    'Improve homework completion',
    'Create sustainable routines',
] as const

export const PERSONAL_GOALS = [
    'Reduce academic anxiety',
    'Build self-confidence',
    'Increase motivation',
    'Improve resilience',
    'Develop growth mindset',
    'Enhance communication skills',
    'Build peer relationships',
    'Manage school-related stress',
    'Foster love of learning',
    'Prepare for high school transition',
] as const

export const GRADE_LEVELS = [
    'Year 5',
    'Year 6',
    'Year 7',
    'Year 8',
    'Year 9',
    'Year 10',
] as const

export const SUBJECTS = ['Maths', 'English', 'Science'] as const

export const REFERRAL_SOURCES = [
    'Google search',
    'Social media (Facebook, Instagram)',
    'Friend or family recommendation',
    'School recommendation',
    'Another professional (psychologist, paediatrician)',
    'Local community group',
    'Website',
    'Other',
] as const

// ==========================================
// TIER A SCHEMA (Consultation + Sign-Up)
// ==========================================

export const TierAStudentSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    gradeIn2026: z.enum(GRADE_LEVELS),
    school: z.string().optional(),
})

export const TierASchema = z.object({
    // Parent/Guardian
    parentFirstName: z.string().min(2, 'First name required'),
    parentLastName: z.string().min(2, 'Last name required'),
    parentEmail: z.string().email('Valid email required'),
    parentPhone: z.string().min(10, 'Valid phone number required'),

    // Discovery
    howDidYouHear: z.enum(REFERRAL_SOURCES).optional(),

    // Goals (max 3 per group)
    academicGoals: z.array(z.enum(ACADEMIC_GOALS)).max(3, 'Maximum 3 academic goals'),
    learningGoals: z.array(z.enum(LEARNING_GOALS)).max(3, 'Maximum 3 learning goals'),
    personalGoals: z.array(z.enum(PERSONAL_GOALS)).max(3, 'Maximum 3 personal goals'),

    // Students (1-4)
    students: z.array(TierAStudentSchema).min(1, 'At least 1 student required').max(4, 'Maximum 4 students'),
})

// ==========================================
// TIER B SCHEMA (Sign-Up Only)
// ==========================================

export const PackageAllocationSchema = z.object({
    package: z.enum(['ELEVATE', 'GLIDE', 'SOAR']),
    subjects: z.array(z.enum(SUBJECTS)).min(1).max(3),
    weeklyHours: z.number().min(1).max(3),
    hourAllocation: z.record(z.string(), z.number()), // {"Maths": 1.5, "English": 1.5}
    hourlyRate: z.number(),
    weeklyTotal: z.number(),
    preferredDays: z.array(z.string()),
    preferredTimes: z.array(z.string()),
})

export const TierBStudentSchema = TierAStudentSchema.extend({
    email: z.string().email('Student email required for LMS account'),
    packageConfig: PackageAllocationSchema,
})

export const TierBSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms'),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
})

// ==========================================
// FULL SCHEMAS
// ==========================================

export const ConsultationSchema = TierASchema.extend({
    selectedSlotId: z.string().optional(),
    agreeToPrivacy: z.boolean().refine(val => val === true, 'Privacy consent required'),
})

export const SignUpSchema = z.object({
    // Tier A fields
    ...TierASchema.shape,
    // Override students to use TierB version
    students: z.array(TierBStudentSchema).min(1).max(4),
    // Tier B fields
    ...TierBSchema.shape,
})

// ==========================================
// PACKAGE VALIDATION RULES
// ==========================================

export function getValidAllocations(
    packageType: 'ELEVATE' | 'GLIDE' | 'SOAR',
    subjects: string[]
): Array<{ label: string; allocation: Record<string, number> }> {
    const subjectCount = subjects.length

    if (packageType === 'ELEVATE') {
        // 1 subject, 1 hour total
        if (subjectCount !== 1) return []
        return [{ label: `1 hour ${subjects[0]}`, allocation: { [subjects[0]]: 1 } }]
    }

    if (packageType === 'GLIDE') {
        // 1-2 subjects, 2 hours total
        if (subjectCount === 1) {
            return [{ label: `2 hours ${subjects[0]}`, allocation: { [subjects[0]]: 2 } }]
        }
        if (subjectCount === 2) {
            return [
                {
                    label: `1 hour ${subjects[0]} + 1 hour ${subjects[1]}`,
                    allocation: { [subjects[0]]: 1, [subjects[1]]: 1 },
                },
            ]
        }
        return []
    }

    if (packageType === 'SOAR') {
        // 1-3 subjects, 3 hours total
        if (subjectCount === 1) {
            return [{ label: `3 hours ${subjects[0]}`, allocation: { [subjects[0]]: 3 } }]
        }
        if (subjectCount === 2) {
            return [
                {
                    label: `1.5 hours ${subjects[0]} + 1.5 hours ${subjects[1]}`,
                    allocation: { [subjects[0]]: 1.5, [subjects[1]]: 1.5 },
                },
                {
                    label: `2 hours ${subjects[0]} + 1 hour ${subjects[1]}`,
                    allocation: { [subjects[0]]: 2, [subjects[1]]: 1 },
                },
                {
                    label: `1 hour ${subjects[0]} + 2 hours ${subjects[1]}`,
                    allocation: { [subjects[0]]: 1, [subjects[1]]: 2 },
                },
            ]
        }
        if (subjectCount === 3) {
            return [
                {
                    label: `1 hour each (${subjects.join(', ')})`,
                    allocation: { [subjects[0]]: 1, [subjects[1]]: 1, [subjects[2]]: 1 },
                },
            ]
        }
        return []
    }

    return []
}

export function getPackageLimits(packageType: 'ELEVATE' | 'GLIDE' | 'SOAR') {
    const limits = {
        ELEVATE: { maxSubjects: 1, totalHours: 1 },
        GLIDE: { maxSubjects: 2, totalHours: 2 },
        SOAR: { maxSubjects: 3, totalHours: 3 },
    }
    return limits[packageType]
}

// ==========================================
// TYPE EXPORTS
// ==========================================

export type TierAData = z.infer<typeof TierASchema>
export type TierBData = z.infer<typeof TierBSchema>
export type ConsultationData = z.infer<typeof ConsultationSchema>
export type SignUpData = z.infer<typeof SignUpSchema>
export type PackageAllocation = z.infer<typeof PackageAllocationSchema>

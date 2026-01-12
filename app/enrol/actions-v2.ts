'use server'

import prisma from '@/lib/prisma'
import { SignUpSchema } from '@/lib/enrolment-schemas'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export async function getEnrolmentByToken(token: string) {
    try {
        const enrolment = await prisma.enrolment.findUnique({
            where: { continuationToken: token },
            include: { students: true }
        })

        if (!enrolment) {
            return { success: false, error: 'Invalid token' }
        }

        if (enrolment.tokenUsed) {
            return { success: false, error: 'Token already used' }
        }

        if (enrolment.tokenExpiresAt && enrolment.tokenExpiresAt < new Date()) {
            return { success: false, error: 'Token expired' }
        }

        // Return pre-fill data
        return {
            success: true,
            data: {
                enrolmentId: enrolment.id,
                parentFirstName: enrolment.parentFirstName,
                parentLastName: enrolment.parentLastName,
                parentEmail: enrolment.parentEmail,
                parentPhone: enrolment.parentPhone,
                howDidYouHear: enrolment.howDidYouHear,
                academicGoals: enrolment.academicGoals,
                learningGoals: enrolment.learningGoals,
                personalGoals: enrolment.personalGoals,
                students: enrolment.students.map(s => ({
                    id: s.id,
                    firstName: s.firstName,
                    lastName: s.lastName,
                    gradeIn2026: s.gradeIn2026,
                    school: s.school,
                }))
            }
        }
    } catch (error) {
        console.error('Token fetch error:', error)
        return { success: false, error: 'Failed to fetch enrolment' }
    }
}

export async function submitSignUpV2(formData: any, enrolmentId?: string) {
    try {
        console.log('📝 Submitting sign-up (V2):', { enrolmentId, hasData: !!formData })

        // Validate with Zod
        const validated = SignUpSchema.parse(formData)

        // Hash password
        const hashedPassword = await bcrypt.hash(validated.password, 10)

        if (enrolmentId) {
            // UPDATE existing enrolment (continuation flow)
            const enrolment = await prisma.enrolment.update({
                where: { id: enrolmentId },
                data: {
                    // Update Tier B fields
                    password: hashedPassword,
                    termsAccepted: validated.termsAccepted,
                    status: 'SIGNUP_COMPLETED',
                    stage: 'SIGNUP',
                    tokenUsed: true,

                    // Update students with Tier B data
                    students: {
                        updateMany: validated.students.map((student: any, index: number) => ({
                            where: { id: student.id }, // Assumes student.id is passed from pre-fill
                            data: {
                                email: student.email,
                                package: student.packageConfig.package,
                                subjects: student.packageConfig.subjects,
                                weeklyHours: student.packageConfig.weeklyHours,
                                hourAllocation: student.packageConfig.hourAllocation,
                                hourlyRate: student.packageConfig.hourlyRate,
                                weeklyTotal: student.packageConfig.weeklyTotal,
                                preferredDays: student.packageConfig.preferredDays,
                                preferredTimes: student.packageConfig.preferredTimes,
                            }
                        }))
                    }
                },
                include: { students: true }
            })

            console.log('✅ Enrolment updated:', enrolment.id)
            return { success: true, enrolmentId: enrolment.id }

        } else {
            // CREATE new enrolment (direct sign-up flow)
            const enrolment = await prisma.enrolment.create({
                data: {
                    // Tier A
                    parentFirstName: validated.parentFirstName,
                    parentLastName: validated.parentLastName,
                    parentEmail: validated.parentEmail,
                    parentPhone: validated.parentPhone,
                    howDidYouHear: validated.howDidYouHear,
                    academicGoals: validated.academicGoals,
                    learningGoals: validated.learningGoals,
                    personalGoals: validated.personalGoals,

                    // Tier B
                    password: hashedPassword,
                    termsAccepted: validated.termsAccepted,
                    status: 'SIGNUP_COMPLETED',
                    stage: 'SIGNUP',

                    // Students
                    students: {
                        create: validated.students.map((student: any) => ({
                            // Tier A
                            firstName: student.firstName,
                            lastName: student.lastName,
                            gradeIn2026: student.gradeIn2026,
                            school: student.school,

                            // Tier B
                            email: student.email,
                            package: student.packageConfig.package,
                            subjects: student.packageConfig.subjects,
                            weeklyHours: student.packageConfig.weeklyHours,
                            hourAllocation: student.packageConfig.hourAllocation,
                            hourlyRate: student.packageConfig.hourlyRate,
                            weeklyTotal: student.packageConfig.weeklyTotal,
                            preferredDays: student.packageConfig.preferredDays,
                            preferredTimes: student.packageConfig.preferredTimes,
                        }))
                    }
                },
                include: { students: true }
            })

            console.log('✅ New enrolment created:', enrolment.id)
            return { success: true, enrolmentId: enrolment.id }
        }

    } catch (error: any) {
        console.error('❌ Sign-up submission error:', error)

        if (error.name === 'ZodError') {
            return {
                success: false,
                error: 'Validation failed: ' + error.errors.map((e: any) => e.message).join(', ')
            }
        }

        return {
            success: false,
            error: error.message || 'Failed to submit sign-up'
        }
    }
}

// Admin function to generate continuation token
export async function generateContinuationToken(enrolmentId: string) {
    try {
        const token = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        await prisma.enrolment.update({
            where: { id: enrolmentId },
            data: {
                continuationToken: token,
                tokenExpiresAt: expiresAt,
                status: 'PENDING_SIGNUP'
            }
        })

        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        return {
            success: true,
            link: `${baseUrl}/enrol?token=${token}`
        }
    } catch (error) {
        console.error('Token generation error:', error)
        return { success: false, error: 'Failed to generate link' }
    }
}

'use server'

import prisma from '@/lib/prisma'
import { SignUpSchema } from '@/lib/enrolment-schemas'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { stripe } from '@/lib/stripe'

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

        let savedEnrolment;

        if (enrolmentId) {
            // UPDATE existing enrolment (continuation flow)
            savedEnrolment = await prisma.enrolment.update({
                where: { id: enrolmentId },
                data: {
                    // Update Tier B fields
                    password: hashedPassword,
                    termsAccepted: validated.termsAccepted,
                    status: 'ENROLLED',
                    stage: 'ACTIVE',
                    tokenUsed: true,
                    students: {
                        deleteMany: {},
                        create: validated.students.map((student: any) => ({
                            firstName: student.firstName,
                            lastName: student.lastName,
                            gradeIn2026: student.gradeIn2026,
                            school: student.school,
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
        } else {
            // CREATE new enrolment
            savedEnrolment = await prisma.enrolment.create({
                data: {
                    parentFirstName: validated.parentFirstName,
                    parentLastName: validated.parentLastName,
                    parentEmail: validated.parentEmail,
                    parentPhone: validated.parentPhone,
                    howDidYouHear: validated.howDidYouHear,
                    academicGoals: validated.academicGoals,
                    learningGoals: validated.learningGoals,
                    personalGoals: validated.personalGoals,

                    password: hashedPassword,
                    termsAccepted: validated.termsAccepted,
                    status: 'ENROLLED',
                    stage: 'ACTIVE',

                    students: {
                        create: validated.students.map((student: any) => ({
                            firstName: student.firstName,
                            lastName: student.lastName,
                            gradeIn2026: student.gradeIn2026,
                            school: student.school,
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
        }

        console.log('✅ Enrolment saved:', savedEnrolment.id)

        // --- STRIPE CHECKOUT (OPTIONAL) ---
        // Only attempt Stripe if API key is configured
        if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
            try {
                const lineItems = validated.students.map((student: any) => {
                    const pkg = student.packageConfig.package; // 'ELEVATE', 'GLIDE', 'SOAR'
                    let amount = 0
                    let name = 'Tuition'

                    if (pkg === 'ELEVATE') { amount = 75000; name = 'Elevate Term Package' } // $750.00
                    else if (pkg === 'GLIDE') { amount = 140000; name = 'Glide Term Package' } // $1400.00
                    else if (pkg === 'SOAR') { amount = 195000; name = 'Soar Term Package' } // $1950.00

                    return {
                        price_data: {
                            currency: 'aud',
                            product_data: {
                                name: `${name} - ${student.firstName} ${student.lastName}`,
                                description: `Term tuition for ${student.firstName} ${student.lastName}`,
                            },
                            unit_amount: amount,
                        },
                        quantity: 1,
                    }
                })

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/enrol/thank-you?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/enrol?error=cancelled`,
                    client_reference_id: savedEnrolment.id,
                    customer_email: validated.parentEmail,
                    metadata: {
                        enrolmentId: savedEnrolment.id
                    }
                })

                return { success: true, enrolmentId: savedEnrolment.id, redirectUrl: session.url }

            } catch (stripeError: any) {
                console.error('Stripe Error:', stripeError)
                // Stripe failed but enrollment is saved - redirect to thank you anyway
                console.log('Continuing without payment (Stripe error)')
                return { success: true, enrolmentId: savedEnrolment.id }
            }
        } else {
            // Stripe not configured - skip payment, go straight to thank you
            console.log('Stripe not configured, skipping payment')
            return { success: true, enrolmentId: savedEnrolment.id }
        }

    } catch (error: any) {
        console.error('❌ Sign-up submission error:', error)
        console.error('Error name:', error.name)
        console.error('Error message:', error.message)
        console.error('Full error:', JSON.stringify(error, null, 2))

        if (error.name === 'ZodError') {
            return {
                success: false,
                error: 'Validation failed: ' + error.errors.map((e: any) => e.message).join(', ')
            }
        }

        // Check if it's a Prisma error
        if (error.code) {
            return {
                success: false,
                error: `Database error (${error.code}): ${error.message}`
            }
        }

        return {
            success: false,
            error: error.message || 'Failed to submit sign-up. Please try again or contact support.'
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

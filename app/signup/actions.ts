'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const signupSchema = z.object({
    address: z.string().optional(),
    school: z.string().optional(),
    concerns: z.string().optional(),
    preferredDays: z.array(z.string()).min(1, 'Please select at least one day'),
    preferredTimes: z.array(z.string()).min(1, 'Please select at least one time'),
    learningPackage: z.enum(['Elevate', 'Lift', 'Soar']),
    subjects: z.array(z.string()).min(1, 'Please select at least one subject'),
    consentGiven: z.boolean().refine(val => val === true, 'Consent is required'),
    marketingOptIn: z.boolean(),
})

export async function validateToken(token: string) {
    try {
        const consultation = await prisma.consultation.findUnique({
            where: {
                continuationToken: token,
            },
            include: {
                lead: true,
            },
        })

        if (!consultation) {
            return { valid: false, error: 'Invalid token' }
        }

        if (consultation.tokenUsed) {
            return { valid: false, error: 'This link has already been used' }
        }

        if (consultation.tokenExpiresAt && new Date() > consultation.tokenExpiresAt) {
            return { valid: false, error: 'This link has expired' }
        }

        return {
            valid: true,
            lead: {
                id: consultation.lead.id,
                parentName: consultation.lead.parentName,
                email: consultation.lead.email,
                phone: consultation.lead.phone,
                studentName: consultation.lead.studentName,
                yearLevel: consultation.lead.yearLevel,
                subjects: JSON.parse(consultation.lead.subjects),
            },
        }
    } catch (error) {
        console.error('Token validation error:', error)
        return { valid: false, error: 'Failed to validate token' }
    }
}

export async function completeSignup(formData: FormData, leadId?: string) {
    try {
        const rawData = {
            address: formData.get('address') as string,
            school: formData.get('school') as string,
            concerns: formData.get('concerns') as string,
            preferredDays: formData.getAll('preferredDays') as string[],
            preferredTimes: formData.getAll('preferredTimes') as string[],
            learningPackage: formData.get('learningPackage') as string,
            subjects: formData.getAll('subjects') as string[],
            consentGiven: formData.get('consentGiven') === 'on',
            marketingOptIn: formData.get('marketingOptIn') === 'on',
        }

        const validated = signupSchema.parse(rawData)

        // Map package to hours
        const hoursMap: Record<string, number> = {
            'Elevate': 1,
            'Lift': 2,
            'Soar': 3
        }

        let lead
        if (leadId) {
            // Update existing lead from consultation
            lead = await prisma.lead.update({
                where: { id: leadId },
                data: {
                    address: validated.address,
                    school: validated.school,
                    concerns: validated.concerns,
                    subjects: JSON.stringify(validated.subjects), // Update subjects in case they changed
                    status: 'SIGNED_UP',
                },
            })

            // Mark consultation token as used
            await prisma.consultation.updateMany({
                where: { leadId },
                data: { tokenUsed: true },
            })
        } else {
            // Create new lead for direct signup
            const parentName = formData.get('parentName') as string
            const email = formData.get('email') as string
            const phone = formData.get('phone') as string
            const studentName = formData.get('studentName') as string
            const yearLevel = formData.get('yearLevel') as string

            lead = await prisma.lead.create({
                data: {
                    parentName,
                    email,
                    phone,
                    studentName,
                    yearLevel,
                    subjects: JSON.stringify(validated.subjects),
                    address: validated.address,
                    school: validated.school,
                    concerns: validated.concerns,
                    status: 'SIGNED_UP',
                },
            })
        }

        // Create signup record with package info
        await prisma.signup.create({
            data: {
                leadId: lead.id,
                preferredDays: JSON.stringify(validated.preferredDays),
                preferredTimes: JSON.stringify(validated.preferredTimes),
                learningPackage: validated.learningPackage,
                hours: hoursMap[validated.learningPackage],
                consentGiven: validated.consentGiven,
                marketingOptIn: validated.marketingOptIn,
                status: 'PENDING',
            },
        })

        revalidatePath('/admin')
        revalidatePath('/admin/leads')

        return { success: true }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message }
        }
        console.error('Signup error:', error)
        return { success: false, error: 'Failed to complete signup. Please try again.' }
    }
}

'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// --- SCHEMA DEFINITION ---
const enrollmentSchema = z.object({
    // Student Details
    studentName: z.string().min(1, "Student name is required"),
    yearLevel: z.string().min(1, "Year level is required"),
    studentEmail: z.string().email("Invalid student email").optional().or(z.literal('')),

    // Parent Details
    parentName: z.string().min(1, "Parent name is required"),
    email: z.string().email("Invalid parent email address"),
    phone: z.string().min(8, "Valid phone number is required"),

    // Additional Details
    address: z.string().optional(),
    school: z.string().optional(),
    concerns: z.string().optional(),
    notes: z.string().optional(),

    // Package & Preferences
    learningPackage: z.enum(['Elevate', 'Lift', 'Soar']),
    paymentFrequency: z.enum(['Monthly', 'Quarterly']),
    subjects: z.array(z.string()).min(1, 'Please select at least one subject'),
    preferredDays: z.array(z.string()).min(1, 'Please select at least one day'),
    preferredTimes: z.array(z.string()).min(1, 'Please select at least one time'),

    // Consent
    consentGiven: z.boolean().refine(val => val === true, 'Consent is required'),
    marketingOptIn: z.boolean(),
})

// --- FETCH PRE-FILL DATA ---
export async function getConsultationToken(token: string) {
    if (!token) return null

    try {
        const consultation = await prisma.consultation.findUnique({
            where: { continuationToken: token },
            include: { lead: true }
        })

        if (!consultation || consultation.tokenUsed) return null

        // Return flattened data structure suitable for the form
        return {
            studentName: consultation.lead.studentName,
            yearLevel: consultation.lead.yearLevel,
            parentName: consultation.lead.parentName,
            email: consultation.lead.email,
            phone: consultation.lead.phone,
            address: consultation.lead.address,
            school: consultation.lead.school,
            concerns: consultation.lead.concerns, // Map concerns/notes
            subjects: JSON.parse(consultation.lead.subjects || '[]'),
            leadId: consultation.lead.id
        }
    } catch (error) {
        console.error('Error fetching token:', error)
        return null
    }
}

// --- SUBMIT ACTION ---
export async function submitEnrollment(formData: FormData, leadId?: string) {
    try {
        const rawData = {
            studentName: formData.get('studentName'),
            yearLevel: formData.get('yearLevel'),
            studentEmail: formData.get('studentEmail'),
            parentName: formData.get('parentName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            school: formData.get('school'),
            concerns: formData.get('concerns'),
            notes: formData.get('notes'),
            learningPackage: formData.get('learningPackage'),
            paymentFrequency: formData.get('paymentFrequency'),
            consentGiven: formData.get('consentGiven') === 'on',
            marketingOptIn: formData.get('marketingOptIn') === 'on',
            subjects: formData.getAll('subjects'),
            preferredDays: formData.getAll('preferredDays'),
            preferredTimes: formData.getAll('preferredTimes'),
        }

        const validated = enrollmentSchema.parse(rawData)

        const hoursMap: Record<string, number> = {
            'Elevate': 1,
            'Lift': 2,
            'Soar': 3
        }

        let lead

        if (leadId) {
            // UPDATE existing lead from consultation
            lead = await prisma.lead.update({
                where: { id: leadId },
                data: {
                    studentName: validated.studentName,
                    yearLevel: validated.yearLevel,
                    studentEmail: validated.studentEmail || null,
                    parentName: validated.parentName,
                    email: validated.email,
                    phone: validated.phone,
                    address: validated.address,
                    school: validated.school,
                    concerns: validated.concerns,
                    notes: validated.notes,
                    subjects: JSON.stringify(validated.subjects),
                    status: 'ENROLMENT_SUBMITTED',
                }
            })

            // Mark token as used
            await prisma.consultation.updateMany({
                where: { leadId },
                data: { tokenUsed: true }
            })

        } else {
            // CREATE new lead
            lead = await prisma.lead.create({
                data: {
                    parentName: validated.parentName,
                    email: validated.email,
                    phone: validated.phone,
                    studentName: validated.studentName,
                    yearLevel: validated.yearLevel,
                    studentEmail: validated.studentEmail || null,
                    address: validated.address,
                    school: validated.school,
                    concerns: validated.concerns,
                    notes: validated.notes,
                    subjects: JSON.stringify(validated.subjects),
                    status: 'ENROLMENT_SUBMITTED',
                }
            })
        }

        // Create or Update Signup Record
        // (Upsert allows correcting if they try submitting twice)
        await prisma.signup.upsert({
            where: { leadId: lead.id },
            update: {
                learningPackage: validated.learningPackage,
                hours: hoursMap[validated.learningPackage],
                paymentFrequency: validated.paymentFrequency,
                preferredDays: JSON.stringify(validated.preferredDays),
                preferredTimes: JSON.stringify(validated.preferredTimes),
                consentGiven: validated.consentGiven,
                marketingOptIn: validated.marketingOptIn,
                status: 'PENDING_PAYMENT',
            },
            create: {
                leadId: lead.id,
                learningPackage: validated.learningPackage,
                hours: hoursMap[validated.learningPackage],
                paymentFrequency: validated.paymentFrequency,
                preferredDays: JSON.stringify(validated.preferredDays),
                preferredTimes: JSON.stringify(validated.preferredTimes),
                consentGiven: validated.consentGiven,
                marketingOptIn: validated.marketingOptIn,
                status: 'PENDING_PAYMENT',
            }
        })

        revalidatePath('/admin/leads')
        return { success: true, leadId: lead.id }

    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message }
        }
        console.error('Enrollment error:', error)
        return { success: false, error: 'Failed to submit enrollment. Please try again.' }
    }
}

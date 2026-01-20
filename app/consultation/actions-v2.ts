'use server'

import prisma from '@/lib/prisma'
import { ConsultationSchema } from '@/lib/enrolment-schemas'
import { sendConsultationEmail } from '@/lib/email'


import { revalidatePath } from 'next/cache'

export async function submitConsultationV2(formData: any) {
    try {
        console.log('📝 Submitting consultation (V2):', formData)

        // Validate with Zod
        const validated = ConsultationSchema.parse(formData)

        // Get slot details if selected
        let scheduledAt = new Date()
        if (validated.selectedSlotId) {
            const slot = await prisma.availabilitySlot.findUnique({
                where: { id: validated.selectedSlotId }
            })
            if (slot) {
                scheduledAt = slot.startTime
            }
        }

        // SEQUENTIAL: Create Enrolment first
        console.log('1. Creating enrolment...')
        const enrolment = await prisma.enrolment.create({
            data: {
                parentFirstName: validated.parentFirstName,
                parentLastName: validated.parentLastName,
                parentEmail: validated.parentEmail,
                parentPhone: validated.parentPhone,
                howDidYouHear: validated.howDidYouHear,
                academicGoals: validated.academicGoals,
                learningGoals: validated.learningGoals,
                personalGoals: validated.personalGoals,
                status: validated.selectedSlotId ? 'CONSULTATION_SCHEDULED' : 'CONSULTATION_REQUESTED',
                stage: 'CONSULTATION',
                consultationSlotId: validated.selectedSlotId,
                students: {
                    create: validated.students.map(student => ({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        gradeIn2026: student.gradeIn2026,
                        school: student.school,
                    }))
                }
            },
            include: { students: true, consultationSlot: true }
        })
        console.log('✅ Enrolment created:', enrolment.id)

        // SEQUENTIAL: Create Lead
        console.log('2. Creating lead...')
        const lead = await prisma.lead.create({
            data: {
                parentName: `${validated.parentFirstName} ${validated.parentLastName}`,
                email: validated.parentEmail,
                phone: validated.parentPhone,
                studentName: validated.students.map(s => `${s.firstName} ${s.lastName}`).join(', '),
                yearLevel: validated.students.map(s => s.gradeIn2026).join(', '),
                subjects: JSON.stringify([]),
                school: validated.students[0]?.school || '',
                notes: [
                    `Academic Goals: ${validated.academicGoals.join(', ')}`,
                    `Learning Goals: ${validated.learningGoals.join(', ')}`,
                    `Personal Goals: ${validated.personalGoals.join(', ')}`,
                    validated.howDidYouHear ? `Source: ${validated.howDidYouHear}` : ''
                ].filter(Boolean).join('\n'),
                status: validated.selectedSlotId ? 'CONSULTATION_BOOKED' : 'NEW',
                source: validated.howDidYouHear || 'website',
            }
        })
        console.log('✅ Lead created:', lead.id)


        // If slot selected, schedule consultation & update slot
        if (validated.selectedSlotId) {
            console.log('3. Linking consultation slot...')
            await prisma.consultation.create({
                data: {
                    leadId: lead.id,
                    scheduledAt: scheduledAt,
                    status: 'SCHEDULED',
                }
            })

            await prisma.availabilitySlot.update({
                where: { id: validated.selectedSlotId },
                data: { isBooked: true, currentBookings: { increment: 1 } }
            })
        }

        // Send Email (DISABLED DEBUG: Isolating hang issue)
        // sendConsultationEmail({ ... }); 
        console.log('Skipping email for stability check')

        console.log('✅ Consultation workflow complete:', enrolment.id)

        // Force Admin UI to refresh properly
        revalidatePath('/admin')
        revalidatePath('/admin/leads')
        revalidatePath('/admin/calendar')

        return {
            success: true,
            enrolmentId: enrolment.id,
            leadId: lead.id,
            studentNames: validated.students.map(s => s.firstName)
        }

    } catch (error: any) {
        console.error('❌ Consultation submission error:', error)

        if (error.name === 'ZodError') {
            return {
                success: false,
                error: 'Validation failed: ' + error.errors.map((e: any) => e.message).join(', ')
            }
        }

        return {
            success: false,
            error: error.message || 'Failed to submit consultation'
        }
    }
}

export async function getAvailableSlotsV2() {
    try {
        return await prisma.availabilitySlot.findMany({
            where: {
                isBooked: false,
                isEnabled: true,
                startTime: {
                    gte: new Date()
                }
            },
            orderBy: {
                startTime: 'asc'
            },
            take: 20
        })
    } catch (error) {
        console.error('Failed to fetch slots:', error)
        return []
    }
}

'use server'

import prisma from '@/lib/prisma'
import { ConsultationSchema } from '@/lib/enrolment-schemas'
import { sendConsultationEmail } from '@/lib/email'


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

        // PARALLEL: Create Enrolment and Lead simultaneously
        // These are independent of each other
        const [enrolment, lead] = await Promise.all([
            // 1. Create Enrolment
            prisma.enrolment.create({
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
            }),

            // 2. Create Lead
            prisma.lead.create({
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
        ])

        // PARALLEL: Execute secondary actions (Consultation, Slot Update, Email)
        const secondaryActions = []

        // If slot selected, schedule consultation & update slot
        if (validated.selectedSlotId) {
            secondaryActions.push(
                prisma.consultation.create({
                    data: {
                        leadId: lead.id,
                        scheduledAt: scheduledAt,
                        status: 'SCHEDULED',
                    }
                })
            )

            secondaryActions.push(
                prisma.availabilitySlot.update({
                    where: { id: validated.selectedSlotId },
                    data: { isBooked: true, currentBookings: { increment: 1 } }
                })
            )
        }

        // Send Email (Don't let email failure block the user response, but await it to ensure execution in serverless)
        secondaryActions.push(
            sendConsultationEmail({
                parentName: `${validated.parentFirstName} ${validated.parentLastName}`,
                parentEmail: validated.parentEmail,
                parentPhone: validated.parentPhone,
                studentName: validated.students.map(s => `${s.firstName} ${s.lastName}`).join(', '),
                yearLevel: validated.students.map(s => s.gradeIn2026).join(', '),
                concerns: [
                    `Academic Goals: ${validated.academicGoals.join(', ')}`,
                    `Learning Goals: ${validated.learningGoals.join(', ')}`,
                    `Personal Goals: ${validated.personalGoals.join(', ')}`
                ].join('\n')
            }).catch(err => console.error('Background Email Failed:', err))
        )

        // Wait for all secondary actions to complete
        await Promise.all(secondaryActions)

        console.log('✅ Consultation workflow complete:', enrolment.id)

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

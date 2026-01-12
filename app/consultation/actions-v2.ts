'use server'

import prisma from '@/lib/prisma'
import { ConsultationSchema } from '@/lib/enrolment-schemas'
import { sendConsultationEmail } from '@/lib/email'
import bcrypt from 'bcryptjs'

export async function submitConsultationV2(formData: any) {
    try {
        console.log('📝 Submitting consultation (V2):', formData)

        // Validate with Zod
        const validated = ConsultationSchema.parse(formData)

        // Create Enrolment record
        const enrolment = await prisma.enrolment.create({
            data: {
                // Parent/Guardian
                parentFirstName: validated.parentFirstName,
                parentLastName: validated.parentLastName,
                parentEmail: validated.parentEmail,
                parentPhone: validated.parentPhone,

                // Discovery
                howDidYouHear: validated.howDidYouHear,

                // Goals
                academicGoals: validated.academicGoals,
                learningGoals: validated.learningGoals,
                personalGoals: validated.personalGoals,

                // Status
                status: validated.selectedSlotId ? 'CONSULTATION_SCHEDULED' : 'CONSULTATION_REQUESTED',
                stage: 'CONSULTATION',

                // Link to slot if selected
                consultationSlotId: validated.selectedSlotId,

                // Students
                students: {
                    create: validated.students.map(student => ({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        gradeIn2026: student.gradeIn2026,
                        school: student.school,
                    }))
                }
            },
            include: {
                students: true,
                consultationSlot: true,
            }
        })

        // Mark slot as booked if selected
        if (validated.selectedSlotId) {
            await prisma.availabilitySlot.update({
                where: { id: validated.selectedSlotId },
                data: {
                    isBooked: true,
                    currentBookings: { increment: 1 }
                }
            })
        }

        // Send notification email
        await sendConsultationEmail({
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
        })

        console.log('✅ Consultation created:', enrolment.id)

        return {
            success: true,
            enrolmentId: enrolment.id,
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

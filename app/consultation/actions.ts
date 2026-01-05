'use server'

import prisma from '@/lib/prisma'
import { sendConsultationEmail } from '@/lib/email'

export async function submitConsultation(formData: any) {
    try {
        console.log("Submitting consultation", formData)

        // 1. Create Lead
        const lead = await prisma.lead.create({
            data: {
                parentName: `${formData.parentFirstName} ${formData.parentLastName}`,
                email: formData.parentEmail,
                phone: formData.parentPhone,
                studentName: `${formData.studentFirstName} ${formData.studentLastName}`,
                yearLevel: formData.yearLevel,
                subjects: JSON.stringify(formData.subjects),
                school: formData.schoolName,
                notes: `
                    Performance: ${formData.currentPerformance}
                    Challenges: ${formData.learningChallenges.join(', ')}
                    Goals: ${formData.learningGoals}
                    Concerns: ${formData.primaryConcerns}
                `.trim(),
                concerns: formData.primaryConcerns,
                status: 'CONSULTATION_BOOKED'
            }
        })

        // 2. Parse scheduled time from slot ID or direct value
        // The form sends 'selectedSlotId' if we implement the picker correctly
        const slotId = formData.selectedSlotId

        let scheduledAt = new Date() // Default fallback
        if (slotId) {
            const slot = await prisma.availabilitySlot.findUnique({ where: { id: slotId } })
            if (slot) {
                // Mark slot as booked
                await prisma.availabilitySlot.update({
                    where: { id: slotId },
                    data: { isBooked: true, currentBookings: { increment: 1 } }
                })
                scheduledAt = slot.startTime
            }
        } else {
            // Fallback logic if we allowed arbitrary scheduling, but we should enforce slots
            // For now, let's just pick a date next week if not provided (hack for demo if slot fails)
            scheduledAt.setDate(scheduledAt.getDate() + 7)
        }

        // 3. Create Consultation
        const consultation = await prisma.consultation.create({
            data: {
                leadId: lead.id,
                scheduledAt: scheduledAt,
                status: 'SCHEDULED'
            }
        })


        // 4. Send Notification Email
        await sendConsultationEmail({
            parentName: lead.parentName,
            parentEmail: lead.email,
            parentPhone: lead.phone,
            studentName: lead.studentName,
            yearLevel: lead.yearLevel,
            concerns: lead.concerns || ''
        })

        return { success: true, leadId: lead.id }

    } catch (error) {
        console.error('Error submitting consultation:', error)
        return { success: false, error: 'Failed to submit consultation' }
    }
}

export async function getAvailableSlots() {
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
}

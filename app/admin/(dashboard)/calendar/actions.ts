'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function cancelConsultation(consultationId: string) {
    try {
        // 1. Find the consultation to get the scheduled time
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            include: { lead: true }
        })

        if (!consultation) {
            return { success: false, error: 'Consultation not found' }
        }

        // 2. Find the associated slot (approximate by time for now since we didn't strictly link ID)
        // Ideally we should have stored slotId on consultation, but we can match by time
        const slot = await prisma.availabilitySlot.findFirst({
            where: {
                startTime: consultation.scheduledAt
            }
        })

        // 3. Update slot to be free again
        if (slot) {
            await prisma.availabilitySlot.update({
                where: { id: slot.id },
                data: { isBooked: false, currentBookings: { decrement: 1 } }
            })
        }

        // 4. Update consultation status
        await prisma.consultation.update({
            where: { id: consultationId },
            data: { status: 'CANCELLED' }
        })

        // 5. Update lead status if needed
        await prisma.lead.update({
            where: { id: consultation.leadId },
            data: { status: 'CANCELLED' }
        })

        revalidatePath('/admin/calendar')

        return { success: true }
    } catch (error) {
        console.error('Failed to cancel:', error)
        return { success: false, error: 'Failed to cancel consultation' }
    }
}

export async function rescheduleConsultation(consultationId: string, newSlotId: string) {
    try {
        const slot = await prisma.availabilitySlot.findUnique({ where: { id: newSlotId } })
        if (!slot) return { success: false, error: 'Slot not found' }

        // 1. Cancel old slot booking (logic similar to cancel above)
        const consultation = await prisma.consultation.findUnique({ where: { id: consultationId } })
        if (consultation) {
            const oldSlot = await prisma.availabilitySlot.findFirst({
                where: { startTime: consultation.scheduledAt }
            })
            if (oldSlot) {
                await prisma.availabilitySlot.update({
                    where: { id: oldSlot.id },
                    data: { isBooked: false, currentBookings: { decrement: 1 } }
                })
            }
        }

        // 2. Book new slot
        await prisma.availabilitySlot.update({
            where: { id: newSlotId },
            data: { isBooked: true, currentBookings: { increment: 1 } }
        })

        // 3. Update consultation
        await prisma.consultation.update({
            where: { id: consultationId },
            data: {
                scheduledAt: slot.startTime,
                status: 'SCHEDULED'
            }
        })

        revalidatePath('/admin/calendar')
        return { success: true }
    } catch (error) {
        return { success: false, error: 'Failed to reschedule' }
    }
}

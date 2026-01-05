'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteLead(leadId: string) {
    try {
        // 1. Check for active consultation to free up slot
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
            include: { consultation: true }
        })

        if (!lead) {
            return { success: false, error: 'Lead not found' }
        }

        // 2. If scheduled consultation exists, free up the slot
        if (lead.consultation && lead.consultation.status === 'SCHEDULED') {
            const slot = await prisma.availabilitySlot.findFirst({
                where: {
                    startTime: lead.consultation.scheduledAt
                }
            })

            if (slot) {
                await prisma.availabilitySlot.update({
                    where: { id: slot.id },
                    data: {
                        isBooked: false,
                        currentBookings: { decrement: 1 }
                    }
                })
            }
        }

        // 3. Delete the lead (cascades to Consultation and Signup)
        await prisma.lead.delete({
            where: { id: leadId }
        })

        revalidatePath('/admin/leads')
        return { success: true }
    } catch (error) {
        console.error('Error deleting lead:', error)
        return { success: false, error: 'Failed to delete lead' }
    }
}

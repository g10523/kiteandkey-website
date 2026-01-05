'use server'

import { signOut } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { randomBytes } from 'crypto'

export async function handleSignOut() {
    await signOut({ redirectTo: '/admin/login' })
}

export async function generateSignupLink(leadId: string) {
    try {
        // Find existing non-expired token or create new one
        const consultation = await prisma.consultation.findUnique({
            where: { leadId },
        })

        if (!consultation) {
            return { success: false, error: 'No consultation record found for this lead' }
        }

        let token = consultation.continuationToken

        // If no token or expired (though we don't strictly enforce expiry for admin regeneration usually, let's just make sure one exists)
        if (!token) {
            token = randomBytes(32).toString('hex')
            await prisma.consultation.update({
                where: { leadId },
                data: {
                    continuationToken: token,
                    tokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
                    tokenUsed: false,
                },
            })
        }

        // Determine base URL (in prod use env var, fallback to localhost)
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        const link = `${baseUrl}/signup?token=${token}`

        return { success: true, link }
    } catch (error) {
        console.error('Error generating link:', error)
        return { success: false, error: 'Failed to generate link' }
    }
}

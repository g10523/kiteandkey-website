import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: Request) {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature') as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === 'checkout.session.completed') {
        const enrolmentId = session.client_reference_id

        if (enrolmentId) {
            try {
                await prisma.enrolment.update({
                    where: { id: enrolmentId },
                    data: {
                        status: 'ENROLLED',
                    }
                })
                console.log(`✅ Enrolment ${enrolmentId} marked as ENROLLED`)
            } catch (error) {
                console.error('Error updating enrolment:', error)
                return new NextResponse('Database Error', { status: 500 })
            }
        }
    }

    return new NextResponse(null, { status: 200 })
}

'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AlertCircle } from 'lucide-react'

function StatusContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    if (error === 'cancelled') {
        return (
            <div className="fixed top-24 left-0 right-0 z-50 flex justify-center px-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">Payment was cancelled.</p>
                    <p>Please check your details or try a different card.</p>
                </div>
            </div>
        )
    }

    return null
}

export default function PaymentStatusCheck() {
    return (
        <Suspense fallback={null}>
            <StatusContent />
        </Suspense>
    )
}

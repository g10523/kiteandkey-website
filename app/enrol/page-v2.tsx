import { Suspense } from 'react'
import SignUpFormV2 from './SignUpFormV2'

export const dynamic = 'force-dynamic'

export default function EnrolPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E5574] mx-auto mb-4"></div>
                    <p className="text-[#6B647F]">Loading...</p>
                </div>
            </div>
        }>
            <SignUpFormV2 />
        </Suspense>
    )
}

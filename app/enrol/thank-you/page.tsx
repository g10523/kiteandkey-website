'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Mail, Calendar, BookOpen, Shield, Users } from 'lucide-react'

function ThankYouContent() {
    const searchParams = useSearchParams()
    const [studentName, setStudentName] = useState('')

    useEffect(() => {
        const name = searchParams.get('name') || sessionStorage.getItem('studentName') || 'there'
        setStudentName(name)
    }, [searchParams])

    const nextSteps = [
        {
            icon: Mail,
            title: 'Check Your Email',
            description: "We've sent a confirmation email with your login credentials and next steps."
        },
        {
            icon: Calendar,
            title: 'Schedule Your First Session',
            description: 'Our team will contact you within 24 hours to confirm your schedule and match you with the perfect tutor.'
        },
        {
            icon: BookOpen,
            title: 'Access Your LMS',
            description: "You'll receive login credentials to access your personalized learning dashboard and resources."
        }
    ]

    return (
        <div className="min-h-screen bg-[#F7F5FB] flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F7F5FB] via-white to-[#FAFBFF]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E6E0F5]/50 rounded-full filter blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D9CFF2]/40 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-3xl w-full z-10"
            >
                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 rounded-full bg-[#5E5574]/10 blur-xl" />
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#5E5574] to-[#7C6B94] flex items-center justify-center shadow-2xl shadow-[#5E5574]/30">
                            <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
                        </div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="font-julius text-4xl md:text-5xl font-bold mb-4 text-[#3F3A52]"
                    >
                        Welcome to Kite & Key, {studentName.split(' ')[0]}!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-[#6B647F] mb-8"
                    >
                        Your enrollment has been successfully submitted.
                    </motion.p>
                </div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white border-2 border-[#E6E0F2] rounded-3xl p-8 md:p-10 shadow-xl shadow-[#5E5574]/5 mb-8"
                >
                    <h2 className="text-2xl font-bold text-[#3F3A52] mb-6">What happens next?</h2>

                    <div className="space-y-6">
                        {nextSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="flex gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#FAFBFF] border-2 border-[#E6E0F2] flex items-center justify-center flex-shrink-0 text-[#5E5574]">
                                    <step.icon size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#3F3A52] mb-1">{step.title}</h3>
                                    <p className="text-[#6B647F] text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Features Included */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                    className="bg-white border-2 border-[#E6E0F2] rounded-2xl p-6 mb-8 shadow-sm"
                >
                    <h3 className="text-xs font-bold text-[#8C84A8] mb-4 uppercase tracking-wide">Your account includes</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: BookOpen, label: 'Garden LMS Access' },
                            { icon: Users, label: 'Expert Tutors' },
                            { icon: Shield, label: 'Progress Tracking' },
                            { icon: Calendar, label: 'Weekly Sessions' }
                        ].map(feature => (
                            <div key={feature.label} className="flex items-center gap-2 text-[#5E5574]">
                                <feature.icon size={16} />
                                <span className="text-sm font-medium">{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#5E5574] to-[#7C6B94] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#5E5574]/20 hover:shadow-xl hover:shadow-[#5E5574]/30 transition-all hover:scale-105"
                    >
                        Return to Homepage
                        <ArrowRight size={18} />
                    </Link>
                    <Link
                        href="/key-method"
                        className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#E6E0F2] text-[#5E5574] px-8 py-4 rounded-xl font-bold hover:bg-[#FAFBFF] hover:border-[#D9CFF2] hover:text-[#3F3A52] transition-all"
                    >
                        Learn About KEY Method
                    </Link>
                </motion.div>

                {/* Support Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center text-sm text-[#8C84A8] mt-8"
                >
                    Questions? Contact us at{' '}
                    <a href="mailto:hello@kiteandkey.com.au" className="text-[#5E5574] hover:text-[#3F3A52] font-bold transition-colors">
                        hello@kiteandkey.com.au
                    </a>
                </motion.p>
            </motion.div>
        </div>
    )
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F7F5FB] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#5E5574] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#6B647F]">Loading...</p>
                </div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    )
}

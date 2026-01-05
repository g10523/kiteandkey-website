import { validateToken, completeSignup } from './actions'
import { redirect } from 'next/navigation'
import { CheckCircle2, Calendar, User } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIME_SLOTS = [
    'Before school (7am-9am)',
    'After school (3pm-5pm)',
    'Early evening (5pm-7pm)',
    'Evening (7pm-9pm)',
    'Weekend morning',
    'Weekend afternoon',
]

export default async function SignupPage({
    searchParams,
}: {
    searchParams: { token?: string; success?: string }
}) {
    // Show success state
    if (searchParams.success === 'true') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F7F5FB] via-white to-[#EEEAF8] py-20">
                <div className="mx-auto max-w-2xl px-6">
                    <div className="rounded-3xl border-2 border-[#E6E0F2] bg-white p-12 text-center shadow-xl">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#5E5574] to-[#7C6B94]">
                            <CheckCircle2 size={40} className="text-white" />
                        </div>

                        <h1 className="text-3xl font-bold text-[#3F3A52] mb-4">
                            Welcome to Kite & Key!
                        </h1>

                        <p className="text-lg text-[#6B647F] mb-8">
                            Thank you for signing up. We'll be in touch shortly to discuss the next steps and schedule your first session.
                        </p>

                        <a
                            href="/"
                            className="inline-block rounded-xl bg-gradient-to-r from-[#5E5574] to-[#7C6B94] px-8 py-4 text-base font-bold text-white transition-all hover:shadow-lg hover:scale-105"
                        >
                            Return to Home
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    // Validate token if provided
    let tokenData = null
    if (searchParams.token) {
        const result = await validateToken(searchParams.token)
        if (!result.valid) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-[#F7F5FB] via-white to-[#EEEAF8] py-20">
                    <div className="mx-auto max-w-2xl px-6">
                        <div className="rounded-3xl border-2 border-red-200 bg-white p-12 text-center shadow-xl">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">
                                Invalid or Expired Link
                            </h1>
                            <p className="text-[#6B647F] mb-8">
                                {result.error}. Please contact us directly or book a new consultation.
                            </p>
                            <a
                                href="/consultation"
                                className="inline-block rounded-xl bg-gradient-to-r from-[#5E5574] to-[#7C6B94] px-8 py-4 text-base font-bold text-white transition-all hover:shadow-lg"
                            >
                                Book Consultation
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
        tokenData = result.lead
    }

    async function handleSubmit(formData: FormData) {
        'use server'
        const result = await completeSignup(formData, tokenData?.id)
        if (result.success) {
            redirect('/signup?success=true')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F5FB] via-white to-[#EEEAF8] py-20">
            <div className="mx-auto max-w-5xl px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F1FB] px-4 py-2 text-sm font-semibold text-[#5E5574] mb-4">
                        <User size={16} />
                        Student Signup
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#3F3A52] mb-4">
                        {tokenData ? 'Complete Your Enrollment' : 'Sign Up'}
                    </h1>
                    <p className="text-lg text-[#6B647F] max-w-2xl mx-auto">
                        {tokenData
                            ? `We're excited to work with ${tokenData.studentName}! Choose your learning package below.`
                            : 'Join Kite & Key Academy and start your learning journey.'}
                    </p>
                </div>

                {/* Pre-filled Info (if from consultation) */}
                {tokenData && (
                    <div className="mb-8 rounded-2xl border-2 border-[#E6E0F2] bg-white p-6 max-w-3xl mx-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar size={18} className="text-[#5E5574]" />
                            <h3 className="font-semibold text-[#3F3A52]">Your Information</h3>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 text-sm">
                            <div>
                                <span className="text-[#8C84A8]">Student:</span>
                                <p className="font-medium text-[#3F3A52]">{tokenData.studentName}</p>
                            </div>
                            <div>
                                <span className="text-[#8C84A8]">Year Level:</span>
                                <p className="font-medium text-[#3F3A52]">{tokenData.yearLevel}</p>
                            </div>
                            <div>
                                <span className="text-[#8C84A8]">Parent/Guardian:</span>
                                <p className="font-medium text-[#3F3A52]">{tokenData.parentName}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Signup Form */}
                <form action={handleSubmit}>

                    {/* Package Selection */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#3F3A52] mb-6 text-center">Select Your Package</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* ELEVATE */}
                            <label className="relative cursor-pointer group">
                                <input type="radio" name="learningPackage" value="Elevate" className="peer sr-only" required />
                                <div className="h-full rounded-3xl border-2 border-[#E6E0F2] bg-white p-6 transition-all peer-checked:border-[#5E5574] peer-checked:bg-[#5E5574] peer-checked:text-white hover:border-[#D9CFF2] hover:shadow-lg">
                                    <h3 className="text-xl font-bold mb-2">Elevate</h3>
                                    <div className="text-3xl font-bold mb-4">$85<span className="text-sm font-normal opacity-70">/week</span></div>
                                    <div className="flex items-center gap-2 mb-6 text-sm font-medium opacity-90">
                                        <div className="p-1 rounded bg-black/5 dark:bg-white/20">1 Hour</div>
                                        <span>Tutoring</span>
                                    </div>
                                    <p className="text-sm opacity-80 leading-relaxed">
                                        Perfect for focused support in one specific subject area or homework help.
                                    </p>
                                </div>
                            </label>

                            {/* LIFT */}
                            <label className="relative cursor-pointer group">
                                <input type="radio" name="learningPackage" value="Lift" className="peer sr-only" required />
                                <div className="h-full rounded-3xl border-2 border-[#E6E0F2] bg-white p-6 transition-all peer-checked:border-[#5E5574] peer-checked:bg-[#5E5574] peer-checked:text-white hover:border-[#D9CFF2] hover:shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-[#F4D03F] text-[#3F3A52] text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                                    <h3 className="text-xl font-bold mb-2">Lift</h3>
                                    <div className="text-3xl font-bold mb-4">$160<span className="text-sm font-normal opacity-70">/week</span></div>
                                    <div className="flex items-center gap-2 mb-6 text-sm font-medium opacity-90">
                                        <div className="p-1 rounded bg-black/5 dark:bg-white/20">2 Hours</div>
                                        <span>Tutoring</span>
                                    </div>
                                    <p className="text-sm opacity-80 leading-relaxed">
                                        Ideal for comprehensive support across two subjects (e.g., Maths & English).
                                    </p>
                                </div>
                            </label>

                            {/* SOAR */}
                            <label className="relative cursor-pointer group">
                                <input type="radio" name="learningPackage" value="Soar" className="peer sr-only" required />
                                <div className="h-full rounded-3xl border-2 border-[#E6E0F2] bg-white p-6 transition-all peer-checked:border-[#5E5574] peer-checked:bg-[#5E5574] peer-checked:text-white hover:border-[#D9CFF2] hover:shadow-lg">
                                    <h3 className="text-xl font-bold mb-2">Soar</h3>
                                    <div className="text-3xl font-bold mb-4">$225<span className="text-sm font-normal opacity-70">/week</span></div>
                                    <div className="flex items-center gap-2 mb-6 text-sm font-medium opacity-90">
                                        <div className="p-1 rounded bg-black/5 dark:bg-white/20">3 Hours</div>
                                        <span>Tutoring</span>
                                    </div>
                                    <p className="text-sm opacity-80 leading-relaxed">
                                        Maximum support for catching up or getting ahead in all core subjects.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-[#E6E0F2] bg-white p-8 md:p-12 shadow-xl max-w-3xl mx-auto space-y-8">

                        {/* Subjects - Always show this so they can confirm/change */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#3F3A52] mb-6">Select Subjects</h2>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {['Mathematics', 'English', 'Science'].map((subject) => (
                                    <label
                                        key={subject}
                                        className="flex items-center gap-3 rounded-xl border-2 border-[#E6E0F2] px-4 py-3 cursor-pointer transition-all hover:border-[#D9CFF2] has-[:checked]:border-[#5E5574] has-[:checked]:bg-[#F7F5FB]"
                                    >
                                        <input
                                            type="checkbox"
                                            name="subjects"
                                            value={subject}
                                            defaultChecked={tokenData?.subjects.includes(subject)}
                                            className="h-5 w-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]"
                                        />
                                        <span className="text-sm font-medium text-[#3F3A52]">{subject}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#3F3A52] mb-6">Additional Information</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#3F3A52]">
                                        Home Address (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="w-full rounded-xl border-2 border-[#E6E0F2] px-4 py-3 text-[#3F3A52] transition-all focus:border-[#5E5574] focus:outline-none"
                                        placeholder="123 Main St, Sydney NSW 2000"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#3F3A52]">
                                        School Name (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="school"
                                        className="w-full rounded-xl border-2 border-[#E6E0F2] px-4 py-3 text-[#3F3A52] transition-all focus:border-[#5E5574] focus:outline-none"
                                        placeholder="Sydney Grammar School"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#3F3A52]">
                                        Learning Concerns or Goals (Optional)
                                    </label>
                                    <textarea
                                        name="concerns"
                                        rows={4}
                                        className="w-full rounded-xl border-2 border-[#E6E0F2] px-4 py-3 text-[#3F3A52] transition-all focus:border-[#5E5574] focus:outline-none"
                                        placeholder="Tell us about any specific challenges, goals, or areas you'd like to focus on..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#3F3A52] mb-6">Availability Preferences</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-[#3F3A52]">
                                        Preferred Days *
                                    </label>
                                    <div className="grid gap-3 md:grid-cols-4">
                                        {DAYS.map((day) => (
                                            <label
                                                key={day}
                                                className="flex items-center gap-3 rounded-xl border-2 border-[#E6E0F2] px-4 py-3 cursor-pointer transition-all hover:border-[#D9CFF2] has-[:checked]:border-[#5E5574] has-[:checked]:bg-[#F7F5FB]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="preferredDays"
                                                    value={day}
                                                    className="h-5 w-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]"
                                                />
                                                <span className="text-sm font-medium text-[#3F3A52]">{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-[#3F3A52]">
                                        Preferred Times *
                                    </label>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {TIME_SLOTS.map((time) => (
                                            <label
                                                key={time}
                                                className="flex items-center gap-3 rounded-xl border-2 border-[#E6E0F2] px-4 py-3 cursor-pointer transition-all hover:border-[#D9CFF2] has-[:checked]:border-[#5E5574] has-[:checked]:bg-[#F7F5FB]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="preferredTimes"
                                                    value={time}
                                                    className="h-5 w-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]"
                                                />
                                                <span className="text-sm font-medium text-[#3F3A52]">{time}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Consent */}
                        <div className="space-y-4">
                            <div className="rounded-2xl border-2 border-[#E6E0F2] bg-[#F7F5FB] p-6">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="consentGiven"
                                        required
                                        className="mt-1 h-5 w-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]"
                                    />
                                    <span className="text-sm text-[#3F3A52]">
                                        I consent to Kite & Key Academy collecting and storing this information for enrollment purposes. *
                                    </span>
                                </label>
                            </div>

                            <div className="rounded-2xl border-2 border-[#E6E0F2] bg-white p-6">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="marketingOptIn"
                                        className="mt-1 h-5 w-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]"
                                    />
                                    <span className="text-sm text-[#6B647F]">
                                        I'd like to receive updates about Kite & Key programs and resources (optional)
                                    </span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-[#5E5574] to-[#7C6B94] px-6 py-4 text-base font-bold text-white transition-all hover:shadow-lg hover:scale-105"
                        >
                            Complete Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

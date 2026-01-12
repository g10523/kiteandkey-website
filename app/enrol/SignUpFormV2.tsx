'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Lock, Mail, User, Edit2 } from 'lucide-react'
import { getEnrolmentByToken, submitSignUpV2 } from './actions-v2'
import PackageConfigurator from '@/components/PackageConfigurator'
import GoalCheckboxGroup from '@/components/GoalCheckboxGroup'
import { ACADEMIC_GOALS, LEARNING_GOALS, PERSONAL_GOALS, GRADE_LEVELS, REFERRAL_SOURCES } from '@/lib/enrolment-schemas'

interface Student {
    id?: string
    firstName: string
    lastName: string
    gradeIn2026: string
    school: string
    email: string
    packageConfig: {
        package: 'ELEVATE' | 'GLIDE' | 'SOAR' | null
        subjects: string[]
        hourAllocation: Record<string, number>
        weeklyHours: number
        hourlyRate: number
        weeklyTotal: number
        preferredDays: string[]
        preferredTimes: string[]
    }
}

const initialPackageConfig = {
    package: null,
    subjects: [],
    hourAllocation: {},
    weeklyHours: 0,
    hourlyRate: 70,
    weeklyTotal: 0,
    preferredDays: [],
    preferredTimes: [],
}

export default function SignUpFormV2() {
    const searchParams = useSearchParams()
    const token = searchParams?.get('token')

    const [isLoading, setIsLoading] = useState(!!token)
    const [isTokenFlow, setIsTokenFlow] = useState(false)
    const [enrolmentId, setEnrolmentId] = useState<string | undefined>()
    const [tierALocked, setTierALocked] = useState(true)

    const [formData, setFormData] = useState({
        // Tier A
        parentFirstName: '',
        parentLastName: '',
        parentEmail: '',
        parentPhone: '',
        howDidYouHear: '',
        academicGoals: [] as string[],
        learningGoals: [] as string[],
        personalGoals: [] as string[],
        students: [{
            firstName: '',
            lastName: '',
            gradeIn2026: '',
            school: '',
            email: '',
            packageConfig: { ...initialPackageConfig }
        }] as Student[],

        // Tier B
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    })

    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const totalSteps = 5

    // Load token data on mount
    useEffect(() => {
        if (token) {
            loadTokenData(token)
        }
    }, [token])

    const loadTokenData = async (token: string) => {
        setIsLoading(true)
        const result = await getEnrolmentByToken(token)

        if (result.success && result.data) {
            setIsTokenFlow(true)
            setEnrolmentId(result.data.enrolmentId)
            setFormData(prev => ({
                ...prev,
                parentFirstName: result.data.parentFirstName,
                parentLastName: result.data.parentLastName,
                parentEmail: result.data.parentEmail,
                parentPhone: result.data.parentPhone,
                howDidYouHear: result.data.howDidYouHear || '',
                academicGoals: result.data.academicGoals,
                learningGoals: result.data.learningGoals,
                personalGoals: result.data.personalGoals,
                students: result.data.students.map((s: any) => ({
                    ...s,
                    email: '',
                    packageConfig: { ...initialPackageConfig }
                }))
            }))
        } else {
            alert(result.error || 'Invalid or expired link')
        }

        setIsLoading(false)
    }

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const updateStudent = (index: number, field: string, value: any) => {
        const newStudents = [...formData.students]
        newStudents[index] = { ...newStudents[index], [field]: value }
        setFormData(prev => ({ ...prev, students: newStudents }))
    }

    const updateStudentPackage = (index: number, packageConfig: any) => {
        const newStudents = [...formData.students]
        newStudents[index] = { ...newStudents[index], packageConfig }
        setFormData(prev => ({ ...prev, students: newStudents }))
    }

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {}

        if (step === 1 && !tierALocked) {
            if (!formData.parentFirstName.trim()) newErrors.parentFirstName = 'Required'
            if (!formData.parentLastName.trim()) newErrors.parentLastName = 'Required'
            if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Required'
            if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Required'
        }

        if (step === 2) {
            formData.students.forEach((student, i) => {
                if (!student.email.trim()) newErrors[`student${i}Email`] = 'Email required for LMS account'
            })
        }

        if (step === 4) {
            formData.students.forEach((student, i) => {
                if (!student.packageConfig.package) newErrors[`student${i}Package`] = 'Package required'
                if (student.packageConfig.subjects.length === 0) newErrors[`student${i}Subjects`] = 'Select subjects'
                if (Object.keys(student.packageConfig.hourAllocation).length === 0) newErrors[`student${i}Allocation`] = 'Select allocation'
            })
        }

        if (step === 5) {
            if (!formData.password) newErrors.password = 'Required'
            if (formData.password.length < 8) newErrors.password = 'Min 8 characters'
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match'
            if (!formData.termsAccepted) newErrors.terms = 'Required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps))
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return

        setIsSubmitting(true)
        const result = await submitSignUpV2(formData, enrolmentId)

        if (result.success) {
            setIsSubmitted(true)
        } else {
            alert(result.error || 'Something went wrong')
        }

        setIsSubmitting(false)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E5574] mx-auto mb-4"></div>
                    <p className="text-[#6B647F]">Loading your information...</p>
                </div>
            </div>
        )
    }

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-white">
                <section className="relative overflow-hidden pt-32 pb-24">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB] via-white to-white" />
                    <div className="relative mx-auto max-w-2xl px-6 text-center">
                        <div className="rounded-3xl border-2 border-[#D9CFF2] bg-white/80 backdrop-blur-sm p-12 shadow-xl">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#E6E0F5] to-[#F7F5FB] shadow-lg">
                                <CheckCircle2 className="h-10 w-10 text-[#5E5574]" />
                            </div>
                            <h1 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
                                Enrolment Complete!
                            </h1>
                            <p className="mt-4 text-lg text-[#6B647F]">
                                Welcome to Kite & Key Academy. We'll be in touch shortly to confirm your schedule.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB] via-[#FAFBFF] to-white" />
                <div className="relative mx-auto max-w-3xl px-6 text-center">
                    <h1 className="font-julius text-4xl md:text-5xl text-[#3F3A52]">
                        {isTokenFlow ? 'Complete Your Enrolment' : 'Enrol at Kite & Key'}
                    </h1>
                    <p className="mt-6 text-lg text-[#6B647F]">
                        {isTokenFlow
                            ? "We've pre-filled your details. Just add student emails and choose your packages."
                            : "Start your personalized learning journey today."
                        }
                    </p>
                </div>
            </section>

            {/* Progress */}
            <section className="relative pb-8">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="flex items-center justify-between mb-4 relative">
                        <div className="absolute top-5 left-5 right-5 h-0.5 bg-[#E6E1F2]" />
                        <div
                            className="absolute top-5 left-5 h-0.5 bg-[#5E5574] transition-all duration-500"
                            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                        />
                        {[
                            { step: 1, label: 'Parent' },
                            { step: 2, label: 'Students' },
                            { step: 3, label: 'Goals' },
                            { step: 4, label: 'Packages' },
                            { step: 5, label: 'Account' },
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center relative z-10">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${currentStep >= item.step
                                        ? 'bg-[#5E5574] text-white shadow-lg'
                                        : 'bg-white border-2 border-[#E6E1F2] text-[#8C84A8]'
                                    }`}>
                                    {currentStep > item.step ? <CheckCircle2 size={20} /> : item.step}
                                </div>
                                <span className={`mt-2 text-xs font-medium hidden sm:block ${currentStep >= item.step ? 'text-[#5E5574]' : 'text-[#8C84A8]'
                                    }`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="relative pb-24">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="rounded-3xl border-2 border-[#E6E0F2] bg-white/80 backdrop-blur-sm p-8 md:p-12 shadow-xl">

                        {/* Step 1: Parent (Pre-filled if token) */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                {isTokenFlow && tierALocked && (
                                    <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4 flex items-start justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-blue-900">Pre-filled from consultation</p>
                                            <p className="text-xs text-blue-700 mt-1">Your information has been saved</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setTierALocked(false)}
                                            className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                                        >
                                            <Edit2 size={14} />
                                            Edit
                                        </button>
                                    </div>
                                )}

                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Parent Details</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Confirm your contact information</p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InputField
                                        label="First Name"
                                        value={formData.parentFirstName}
                                        onChange={(v) => updateField('parentFirstName', v)}
                                        disabled={isTokenFlow && tierALocked}
                                        error={errors.parentFirstName}
                                        required
                                    />
                                    <InputField
                                        label="Last Name"
                                        value={formData.parentLastName}
                                        onChange={(v) => updateField('parentLastName', v)}
                                        disabled={isTokenFlow && tierALocked}
                                        error={errors.parentLastName}
                                        required
                                    />
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InputField
                                        label="Email"
                                        type="email"
                                        value={formData.parentEmail}
                                        onChange={(v) => updateField('parentEmail', v)}
                                        disabled={isTokenFlow && tierALocked}
                                        error={errors.parentEmail}
                                        required
                                    />
                                    <InputField
                                        label="Phone"
                                        type="tel"
                                        value={formData.parentPhone}
                                        onChange={(v) => updateField('parentPhone', v)}
                                        disabled={isTokenFlow && tierALocked}
                                        error={errors.parentPhone}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Student Emails */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Student Email Addresses</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Required for LMS account access</p>
                                </div>

                                {formData.students.map((student, index) => (
                                    <div key={index} className="rounded-2xl border-2 border-[#E6E0F2] p-6 bg-[#FAFBFF]">
                                        <h3 className="text-sm font-bold text-[#5E5574] mb-4">
                                            {student.firstName} {student.lastName}
                                        </h3>
                                        <InputField
                                            label="Student Email"
                                            type="email"
                                            value={student.email}
                                            onChange={(v) => updateStudent(index, 'email', v)}
                                            error={errors[`student${index}Email`]}
                                            placeholder="student@email.com"
                                            helperText="If your child doesn't have an email, use a parent/guardian email you can access."
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Goals (Pre-filled if token) */}
                        {currentStep === 3 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Learning Goals</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">
                                        {isTokenFlow ? 'Review your selected goals' : 'What would you like to achieve?'}
                                    </p>
                                </div>

                                <GoalCheckboxGroup
                                    title="Academic Performance Goals"
                                    description="Focus on grades and achievement"
                                    options={ACADEMIC_GOALS}
                                    selected={formData.academicGoals}
                                    onChange={(goals) => updateField('academicGoals', goals)}
                                />

                                <GoalCheckboxGroup
                                    title="Learning & Study Skills"
                                    description="Build effective habits"
                                    options={LEARNING_GOALS}
                                    selected={formData.learningGoals}
                                    onChange={(goals) => updateField('learningGoals', goals)}
                                />

                                <GoalCheckboxGroup
                                    title="Personal & Social Development"
                                    description="Confidence and wellbeing"
                                    options={PERSONAL_GOALS}
                                    selected={formData.personalGoals}
                                    onChange={(goals) => updateField('personalGoals', goals)}
                                />
                            </div>
                        )}

                        {/* Step 4: Package Configuration */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Choose Packages</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Configure learning package for each student</p>
                                </div>

                                {formData.students.map((student, index) => (
                                    <PackageConfigurator
                                        key={index}
                                        studentName={`${student.firstName} ${student.lastName}`}
                                        config={student.packageConfig}
                                        onChange={(config) => updateStudentPackage(index, config)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Step 5: Account Setup */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Create Account</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Set up your parent portal access</p>
                                </div>

                                <InputField
                                    label="Password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(v) => updateField('password', v)}
                                    error={errors.password}
                                    placeholder="Min 8 characters"
                                    required
                                />

                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(v) => updateField('confirmPassword', v)}
                                    error={errors.confirmPassword}
                                    required
                                />

                                <label className="flex items-start gap-3 cursor-pointer p-5 rounded-xl bg-gradient-to-r from-[#F7F5FB] to-[#FAFBFF] border-2 border-[#E6E0F2]">
                                    <input
                                        type="checkbox"
                                        checked={formData.termsAccepted}
                                        onChange={(e) => updateField('termsAccepted', e.target.checked)}
                                        className="mt-1 h-5 w-5 rounded border-2 border-[#D9CFF2] text-[#5E5574]"
                                    />
                                    <span className="text-sm text-[#5E5574]">
                                        I agree to the Terms & Conditions and understand that enrollment confirms my spot for the term.
                                    </span>
                                </label>
                                {errors.terms && <p className="text-red-600 text-sm">{errors.terms}</p>}
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="mt-10 flex justify-between items-center pt-8 border-t-2 border-[#E6E0F2]">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#E6E0F2] bg-white px-6 py-3 text-sm font-semibold text-[#5E5574]"
                                >
                                    Back
                                </button>
                            ) : <div />}

                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-3.5 text-sm font-semibold text-white"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Complete Enrolment'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

// Helper Components
function InputField({ label, value, onChange, type = 'text', error, required, placeholder, helperText, disabled }: any) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#3F3A52] mb-2">
                {label}{required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full rounded-xl border-2 px-4 py-3 text-[#3F3A52] bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 ${error ? 'border-red-300' : disabled ? 'border-[#E6E1F2] bg-gray-50' : 'border-[#E6E1F2]'
                    }`}
            />
            {helperText && <p className="mt-1 text-xs text-[#8C84A8]">{helperText}</p>}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    )
}

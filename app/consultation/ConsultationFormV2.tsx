'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Calendar, Clock, Plus, X } from 'lucide-react'
import { submitConsultationV2 } from './actions-v2'
import GoalCheckboxGroup from '@/components/GoalCheckboxGroup'
import {
    ACADEMIC_GOALS,
    LEARNING_GOALS,
    PERSONAL_GOALS,
    GRADE_LEVELS,
    REFERRAL_SOURCES
} from '@/lib/enrolment-schemas'

interface Student {
    firstName: string
    lastName: string
    gradeIn2026: string
    school: string
}

interface FormData {
    parentFirstName: string
    parentLastName: string
    parentEmail: string
    parentPhone: string
    howDidYouHear: string
    academicGoals: string[]
    learningGoals: string[]
    personalGoals: string[]
    students: Student[]
    selectedSlotId: string
    agreeToPrivacy: boolean
}

const initialStudent: Student = {
    firstName: '',
    lastName: '',
    gradeIn2026: '',
    school: ''
}

const initialFormData: FormData = {
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    howDidYouHear: '',
    academicGoals: [],
    learningGoals: [],
    personalGoals: [],
    students: [{ ...initialStudent }],
    selectedSlotId: '',
    agreeToPrivacy: false
}

export default function ConsultationFormV2({ availableSlots }: { availableSlots: any[] }) {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const totalSteps = 4

    const updateField = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const updateStudent = (index: number, field: keyof Student, value: string) => {
        const newStudents = [...formData.students]
        newStudents[index] = { ...newStudents[index], [field]: value }
        setFormData(prev => ({ ...prev, students: newStudents }))
    }

    const addStudent = () => {
        if (formData.students.length < 4) {
            setFormData(prev => ({
                ...prev,
                students: [...prev.students, { ...initialStudent }]
            }))
        }
    }

    const removeStudent = (index: number) => {
        if (formData.students.length > 1) {
            setFormData(prev => ({
                ...prev,
                students: prev.students.filter((_, i) => i !== index)
            }))
        }
    }

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {}

        if (step === 1) {
            if (!formData.parentFirstName.trim()) newErrors.parentFirstName = 'Required'
            if (!formData.parentLastName.trim()) newErrors.parentLastName = 'Required'
            if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Required'
            if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Required'
        }

        if (step === 2) {
            formData.students.forEach((student, i) => {
                if (!student.firstName.trim()) newErrors[`student${i}FirstName`] = 'Required'
                if (!student.lastName.trim()) newErrors[`student${i}LastName`] = 'Required'
                if (!student.gradeIn2026) newErrors[`student${i}Grade`] = 'Required'
            })
        }

        if (step === 3) {
            const totalGoals = formData.academicGoals.length + formData.learningGoals.length + formData.personalGoals.length
            if (totalGoals === 0) {
                newErrors.goals = 'Please select at least one goal'
            }
        }

        if (step === 4) {
            if (!formData.agreeToPrivacy) newErrors.privacy = 'Required'
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
        const result = await submitConsultationV2(formData)

        if (result.success) {
            setIsSubmitted(true)
        } else {
            alert(result.error || 'Something went wrong')
        }

        setIsSubmitting(false)
    }

    // Group slots by date
    const slotsByDate = availableSlots.reduce((acc, slot) => {
        const date = new Date(slot.startTime).toDateString()
        if (!acc[date]) acc[date] = []
        acc[date].push(slot)
        return acc
    }, {} as Record<string, any[]>)

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
                                Request Received!
                            </h1>
                            <p className="mt-4 text-lg text-[#6B647F] leading-relaxed">
                                Thanks {formData.parentFirstName}. We'll confirm your appointment shortly.
                            </p>
                            <Link
                                href="/"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#4F4865]"
                            >
                                Back to Home
                            </Link>
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
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/80 px-4 py-1.5 text-xs font-medium text-[#5E5574] backdrop-blur-sm mb-6">
                        <Calendar size={14} />
                        Free 15-minute consultation
                    </div>
                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl text-[#3F3A52]">
                        Book Your Free Consultation
                    </h1>
                    <p className="mt-6 text-lg text-[#6B647F] max-w-2xl mx-auto">
                        Share your child's learning journey with us. We'll create a personalised path forward.
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
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                        />
                        {[
                            { step: 1, label: 'Parent' },
                            { step: 2, label: 'Students' },
                            { step: 3, label: 'Goals' },
                            { step: 4, label: 'Schedule' },
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

                        {/* Step 1: Parent Details */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Your Details</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Let's start with your contact information</p>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InputField
                                        label="First Name"
                                        value={formData.parentFirstName}
                                        onChange={(v) => updateField('parentFirstName', v)}
                                        error={errors.parentFirstName}
                                        required
                                    />
                                    <InputField
                                        label="Last Name"
                                        value={formData.parentLastName}
                                        onChange={(v) => updateField('parentLastName', v)}
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
                                        error={errors.parentEmail}
                                        required
                                    />
                                    <InputField
                                        label="Phone"
                                        type="tel"
                                        value={formData.parentPhone}
                                        onChange={(v) => updateField('parentPhone', v)}
                                        error={errors.parentPhone}
                                        required
                                    />
                                </div>
                                <SelectField
                                    label="How did you hear about us?"
                                    value={formData.howDidYouHear}
                                    onChange={(v) => updateField('howDidYouHear', v)}
                                    options={[...REFERRAL_SOURCES]}
                                />
                            </div>
                        )}

                        {/* Step 2: Students */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Student Information</h2>
                                        <p className="mt-2 text-sm text-[#8C84A8]">Tell us about your child(ren)</p>
                                    </div>
                                    {formData.students.length < 4 && (
                                        <button
                                            type="button"
                                            onClick={addStudent}
                                            className="flex items-center gap-2 text-sm font-semibold text-[#5E5574] hover:text-[#4F4865]"
                                        >
                                            <Plus size={16} /> Add Student
                                        </button>
                                    )}
                                </div>

                                {formData.students.map((student, index) => (
                                    <div key={index} className="relative rounded-2xl border-2 border-[#E6E0F2] p-6 bg-[#FAFBFF]">
                                        {formData.students.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeStudent(index)}
                                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                            >
                                                <X size={20} />
                                            </button>
                                        )}
                                        <h3 className="text-sm font-bold text-[#5E5574] mb-4">Student {index + 1}</h3>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <InputField
                                                label="First Name"
                                                value={student.firstName}
                                                onChange={(v) => updateStudent(index, 'firstName', v)}
                                                error={errors[`student${index}FirstName`]}
                                                required
                                            />
                                            <InputField
                                                label="Last Name"
                                                value={student.lastName}
                                                onChange={(v) => updateStudent(index, 'lastName', v)}
                                                error={errors[`student${index}LastName`]}
                                                required
                                            />
                                            <SelectField
                                                label="Grade in 2026"
                                                value={student.gradeIn2026}
                                                onChange={(v) => updateStudent(index, 'gradeIn2026', v)}
                                                options={[...GRADE_LEVELS]}
                                                error={errors[`student${index}Grade`]}
                                                required
                                            />
                                            <InputField
                                                label="School"
                                                value={student.school}
                                                onChange={(v) => updateStudent(index, 'school', v)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Goals */}
                        {currentStep === 3 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Learning Goals</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">What would you like to achieve? Select up to 3 per category</p>
                                </div>

                                <GoalCheckboxGroup
                                    title="Academic Performance Goals"
                                    description="Focus on grades, subjects, and academic achievement"
                                    options={ACADEMIC_GOALS}
                                    selected={formData.academicGoals}
                                    onChange={(goals) => updateField('academicGoals', goals)}
                                />

                                <GoalCheckboxGroup
                                    title="Learning & Study Skills"
                                    description="Build effective habits and strategies"
                                    options={LEARNING_GOALS}
                                    selected={formData.learningGoals}
                                    onChange={(goals) => updateField('learningGoals', goals)}
                                />

                                <GoalCheckboxGroup
                                    title="Personal & Social Development"
                                    description="Confidence, motivation, and wellbeing"
                                    options={PERSONAL_GOALS}
                                    selected={formData.personalGoals}
                                    onChange={(goals) => updateField('personalGoals', goals)}
                                    error={errors.goals}
                                />
                            </div>
                        )}

                        {/* Step 4: Schedule */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Select a Time</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Choose a time for your free 15-minute consultation</p>
                                </div>

                                {availableSlots.length === 0 ? (
                                    <div className="rounded-xl bg-amber-50 p-6 border-2 border-amber-200 text-amber-900 text-sm">
                                        <p className="font-semibold mb-2">No slots currently available</p>
                                        <p>Submit anyway and we'll contact you to arrange a time.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {Object.entries(slotsByDate).map(([date, slots]: [string, any[]]) => (
                                            <div key={date} className="rounded-2xl border border-[#E6E0F2] bg-[#FAFBFF] p-6">
                                                <h3 className="font-semibold text-[#3F3A52] mb-4 flex items-center gap-2">
                                                    <Calendar size={16} className="text-[#5E5574]" />
                                                    {date}
                                                </h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {slots.map(slot => {
                                                        const timeStr = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                        return (
                                                            <button
                                                                key={slot.id}
                                                                type="button"
                                                                onClick={() => updateField('selectedSlotId', slot.id)}
                                                                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${formData.selectedSlotId === slot.id
                                                                        ? 'border-[#5E5574] bg-[#5E5574] text-white'
                                                                        : 'border-[#E6E0F2] bg-white text-[#5E5574] hover:border-[#D9CFF2]'
                                                                    }`}
                                                            >
                                                                <Clock size={14} />
                                                                {timeStr}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <label className="flex items-start gap-3 cursor-pointer p-5 rounded-xl bg-gradient-to-r from-[#F7F5FB] to-[#FAFBFF] border-2 border-[#E6E0F2]">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToPrivacy}
                                        onChange={(e) => updateField('agreeToPrivacy', e.target.checked)}
                                        className="mt-1 h-5 w-5 rounded border-2 border-[#D9CFF2] text-[#5E5574]"
                                    />
                                    <span className="text-sm text-[#5E5574]">
                                        I agree to the Privacy Policy and consent to Kite & Key storing my information.
                                    </span>
                                </label>
                                {errors.privacy && <p className="text-red-600 text-sm">{errors.privacy}</p>}
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
                                    {isSubmitting ? 'Submitting...' : 'Book Consultation'}
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
function InputField({ label, value, onChange, type = 'text', error, required, placeholder }: any) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#3F3A52] mb-2">
                {label}{required && <span className="text-[#5E5574] ml-1">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full rounded-xl border-2 px-4 py-3 text-[#3F3A52] bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 ${error ? 'border-red-300' : 'border-[#E6E1F2]'
                    }`}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    )
}

function SelectField({ label, value, onChange, options, error, required }: any) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#3F3A52] mb-2">
                {label}{required && <span className="text-[#5E5574] ml-1">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-xl border-2 px-4 py-3 bg-white text-[#3F3A52] ${error ? 'border-red-300' : 'border-[#E6E1F2]'
                    }`}
            >
                <option value="">Select...</option>
                {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    )
}

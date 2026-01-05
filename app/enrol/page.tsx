'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Star, Shield, Clock, Users, Mail, User, BookOpen, Calendar, CreditCard } from 'lucide-react'
import { submitEnrollment, getConsultationToken } from './actions'
import { useSearchParams } from 'next/navigation'

// --- MULTI-STEP WIZARD CONFIG ---
const STEPS = [
  { id: 'student', title: "Student Profile", icon: User },
  { id: 'parent', title: "Parent Details", icon: Users },
  { id: 'academic', title: "Academic Goals", icon: BookOpen },
  { id: 'package', title: "Choose Package", icon: Star },
  { id: 'schedule', title: "Schedule", icon: Calendar }
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TIME_SLOTS = ['3:30 PM', '4:30 PM', '5:30 PM', '6:30 PM', 'Saturday AM']

function EnrollmentContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    // Student
    studentName: '',
    yearLevel: '',
    studentEmail: '',
    school: '',

    // Parent
    parentName: '',
    email: '',
    phone: '',
    address: '',

    // Academic
    subjects: [] as string[],
    concerns: '',
    notes: '',

    // Package
    learningPackage: 'Lift' as 'Elevate' | 'Lift' | 'Soar' | null,
    paymentFrequency: 'Quarterly' as 'Monthly' | 'Quarterly',

    // Schedule
    preferredDays: [] as string[],
    preferredTimes: [] as string[],

    // Consent
    consentGiven: false,
    marketingOptIn: false,
  })

  // Fetch Token Data on Mount
  useEffect(() => {
    if (token) {
      getConsultationToken(token).then(data => {
        if (data) {
          setFormData(prev => ({
            ...prev,
            studentName: data.studentName,
            yearLevel: data.yearLevel,
            parentName: data.parentName,
            email: data.email,
            phone: data.phone,
            address: data.address || '',
            school: data.school || '',
            concerns: data.concerns || '',
            subjects: data.subjects || [],
          }))
          setLeadId(data.leadId)
        }
      })
    }
  }, [token])

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayField = (field: 'subjects' | 'preferredDays' | 'preferredTimes', value: string) => {
    setFormData(prev => {
      const current = prev[field]
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  async function handleSubmit() {
    if (!formData.consentGiven) {
      alert("Please provide your consent to proceed.")
      return
    }

    setLoading(true)
    const formPayload = new FormData()

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formPayload.append(key, v))
      } else if (value !== null) {
        formPayload.append(key, String(value))
      }
    })
    formPayload.set('marketingOptIn', formData.marketingOptIn ? 'on' : 'off')
    formPayload.set('consentGiven', formData.consentGiven ? 'on' : 'off')

    const res = await submitEnrollment(formPayload, leadId || undefined)

    if (res.success) {
      alert("Application Submitted! Proceeding to payment...")
      // Here we would redirect to Stripe
    } else {
      alert(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFE] selection:bg-[#5E5574] selection:text-white pb-20">
      <AnimatePresence mode="wait">
        {isWelcomeOpen ? (
          <WelcomeOverlay
            studentName={formData.studentName}
            onComplete={() => setIsWelcomeOpen(false)}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto px-6 py-12"
          >
            {/* Progress Header */}
            <div className="mb-12">
              <div className="flex justify-between mb-4">
                {STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center gap-2 relative z-10 ${index <= currentStep ? 'text-[#3F3A52]' : 'text-[#D9CFF2]'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${index < currentStep ? 'bg-[#3F3A52] text-white' :
                      index === currentStep ? 'bg-[#5E5574] text-white ring-4 ring-[#E6E0F2]' :
                        'bg-[#F7F5FB] text-[#8C84A8]'
                      }`}>
                      {index < currentStep ? <Check size={14} /> : index + 1}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">{step.title}</span>
                  </div>
                ))}
                {/* Progress Bar Background */}
                <div className="absolute top-16 left-0 w-full h-0.5 bg-[#F7F5FB] -z-0 hidden md:block" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3F3A52] text-center mt-8">
                {STEPS[currentStep].title}
              </h1>
            </div>

            {/* Step Content */}
            <form className="bg-white rounded-[2rem] border border-[#E6E0F2] shadow-xl shadow-[#5E5574]/5 p-8 md:p-12 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && (
                    <StepStudent
                      data={formData}
                      update={updateField}
                    />
                  )}
                  {currentStep === 1 && (
                    <StepParent
                      data={formData}
                      update={updateField}
                    />
                  )}
                  {currentStep === 2 && (
                    <StepAcademic
                      data={formData}
                      update={updateField}
                      toggle={toggleArrayField}
                    />
                  )}
                  {currentStep === 3 && (
                    <StepPackage
                      data={formData}
                      update={updateField}
                    />
                  )}
                  {currentStep === 4 && (
                    <StepSchedule
                      data={formData}
                      toggle={toggleArrayField}
                      update={updateField}
                      loading={loading}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#F7F5FB]">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 text-sm font-bold text-[#6B647F] px-6 py-3 rounded-xl hover:bg-[#F7F5FB] transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  <ArrowLeft size={16} /> Back
                </button>

                {currentStep < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-[#3F3A52] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2D293B] shadow-lg shadow-[#3F3A52]/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !formData.consentGiven}
                    className="flex items-center gap-2 bg-[#5E5574] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#4F4865] shadow-lg shadow-[#5E5574]/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                  >
                    {loading ? 'Submitting...' : 'Complete Enrollment'} <Check size={16} />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFCFE] flex items-center justify-center"><div className="text-[#5E5574]">Loading...</div></div>}>
      <EnrollmentContent />
    </Suspense>
  )
}

// --- SUB-COMPONENTS ---

function WelcomeOverlay({ studentName, onComplete }: { studentName: string, onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="text-center px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-[#3F3A52] mb-6">
            {studentName ? `Welcome back, ${studentName.split(' ')[0]}.` : 'Welcome to Kite & Key.'}
          </h1>
          <p className="text-xl text-[#6B647F] mb-12 font-light">
            Let's build your personalized learning plan.
          </p>
          <button
            onClick={onComplete}
            className="bg-[#3F3A52] text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:scale-105 transition-transform"
          >
            Start Profile
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StepStudent({ data, update }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Input label="Student Full Name" value={data.studentName} onChange={(e: any) => update('studentName', e.target.value)} placeholder="e.g. Alex Smith" />
      <Input label="Year Level" value={data.yearLevel} onChange={(e: any) => update('yearLevel', e.target.value)} placeholder="e.g. Year 5" />
      <Input label="Student Email (Optional)" value={data.studentEmail} onChange={(e: any) => update('studentEmail', e.target.value)} placeholder="For resources & updates" icon={Mail} />
      <Input label="School Name" value={data.school} onChange={(e: any) => update('school', e.target.value)} placeholder="Current school" icon={BookOpen} />
    </div>
  )
}

function StepParent({ data, update }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Input label="Parent / Guardian Name" value={data.parentName} onChange={(e: any) => update('parentName', e.target.value)} />
      <Input label="Email Address" type="email" value={data.email} onChange={(e: any) => update('email', e.target.value)} />
      <Input label="Phone Number" type="tel" value={data.phone} onChange={(e: any) => update('phone', e.target.value)} />
      <Input label="Home Address (Optional)" value={data.address} onChange={(e: any) => update('address', e.target.value)} />
    </div>
  )
}

function StepAcademic({ data, update, toggle }: any) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-[#3F3A52] mb-4">Focus Subjects</label>
        <div className="flex flex-wrap gap-3">
          {['English', 'Mathematics', 'Science'].map(subject => (
            <div
              key={subject}
              onClick={() => toggle('subjects', subject)}
              className={`px-6 py-3 rounded-xl border-2 cursor-pointer transition-all font-medium ${data.subjects.includes(subject)
                ? 'border-[#3F3A52] bg-[#3F3A52] text-white shadow-lg'
                : 'border-[#E6E0F2] text-[#6B647F] hover:border-[#D9CFF2]'
                }`}
            >
              {subject}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-[#3F3A52]">Learning Goals & Concerns</label>
        <textarea
          value={data.concerns}
          onChange={(e) => update('concerns', e.target.value)}
          rows={4}
          placeholder="Tell us about specific challenges, essay writing goals, or exam preparation needs..."
          className="w-full px-4 py-3 rounded-xl border-2 border-[#E6E0F2] focus:border-[#3F3A52] focus:outline-none resize-none"
        />
      </div>
    </div>
  )
}

function StepPackage({ data, update }: any) {
  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-[#F7F5FB] p-1 rounded-full inline-flex border border-[#E6E0F2]">
          <button
            type="button"
            onClick={() => update('paymentFrequency', 'Quarterly')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${data.paymentFrequency === 'Quarterly' ? 'bg-white text-[#3F3A52] shadow-sm' : 'text-[#6B647F] hover:text-[#3F3A52]'}`}
          >
            Quarterly (Save 5%)
          </button>
          <button
            type="button"
            onClick={() => update('paymentFrequency', 'Monthly')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${data.paymentFrequency === 'Monthly' ? 'bg-white text-[#3F3A52] shadow-sm' : 'text-[#6B647F] hover:text-[#3F3A52]'}`}
          >
            Monthly (3 Installments)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { name: 'Elevate', hours: 1, priceMonthly: 285, priceQuarterly: 850 },
          { name: 'Lift', hours: 2, priceMonthly: 540, priceQuarterly: 1600, popular: true },
          { name: 'Soar', hours: 3, priceMonthly: 750, priceQuarterly: 2250 }
        ].map((pkg) => (
          <div
            key={pkg.name}
            onClick={() => update('learningPackage', pkg.name)}
            className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all ${data.learningPackage === pkg.name
              ? 'border-[#3F3A52] bg-[#F7F5FB] ring-2 ring-[#3F3A52] ring-offset-2'
              : 'border-[#E6E0F2] hover:border-[#D9CFF2]'
              }`}
          >
            {pkg.popular && <div className="absolute top-0 right-0 bg-[#F4D03F] text-[10px] font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>}
            <h4 className="font-bold text-[#3F3A52]">{pkg.name}</h4>
            <div className="text-2xl font-bold text-[#3F3A52] my-2">
              ${data.paymentFrequency === 'Quarterly' ? pkg.priceQuarterly : pkg.priceMonthly}
            </div>
            <div className="text-xs text-[#6B647F] font-bold uppercase tracking-wider mb-4">
              {pkg.hours} Hours / Week
            </div>
            <div className="text-center text-xs text-[#8C84A8]">
              {data.paymentFrequency === 'Quarterly' ? 'Billed once per term' : 'Billed monthly'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepSchedule({ data, toggle, update }: any) {
  return (
    <div className="space-y-8">
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm">
        <strong className="block mb-1">Scheduling Note</strong>
        We will do our best to accommodate your preferences. A team member will confirm your final timetable after enrollment.
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-bold text-[#3F3A52] mb-3">Preferred Days</label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => toggle('preferredDays', day)}
                className={`px-4 py-2 rounded-lg text-sm border transition-all ${data.preferredDays.includes(day)
                  ? 'bg-[#5E5574] text-white border-[#5E5574]'
                  : 'bg-white border-[#E6E0F2] text-[#6B647F]'
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-[#3F3A52] mb-3">Preferred Times</label>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map(time => (
              <button
                key={time}
                type="button"
                onClick={() => toggle('preferredTimes', time)}
                className={`px-4 py-2 rounded-lg text-sm border transition-all ${data.preferredTimes.includes(time)
                  ? 'bg-[#5E5574] text-white border-[#5E5574]'
                  : 'bg-white border-[#E6E0F2] text-[#6B647F]'
                  }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E6E0F2] pt-6 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl hover:bg-[#F7F5FB] transition-colors">
          <input
            type="checkbox"
            checked={data.consentGiven}
            onChange={(e) => update('consentGiven', e.target.checked)}
            className="mt-1"
          />
          <div className="text-sm">
            <span className="font-bold text-[#3F3A52] block">I agree to the Terms & Conditions</span>
            <span className="text-[#6B647F]">I understand that enrollment confirms my spot for the term.</span>
          </div>
        </label>
      </div>
    </div>
  )
}

function Input({ label, icon: Icon, className, ...props }: any) {
  return (
    <label className={`block space-y-2 ${className}`}>
      <span className="text-sm font-bold text-[#3F3A52]">{label}</span>
      <div className="relative">
        <input
          {...props}
          className="w-full px-4 py-3 pl-4 rounded-xl border-2 border-[#E6E0F2] text-[#3F3A52] placeholder:text-[#D9CFF2] focus:border-[#5E5574] focus:outline-none transition-colors bg-[#FDFCFE]"
        />
        {Icon && <Icon size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D9CFF2]" />}
      </div>
    </label>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Plus, X, Edit2, Trash2 } from 'lucide-react'
import { submitEnrollment } from './actions'
import Image from 'next/image'
import Link from 'next/link'

// Types
interface Student {
  id: string
  firstName: string
  lastName: string
  yearLevel: string
  school: string
  subjects: string[]
  learningGoals: string
  learningChallenges: string
  previousTutoring: boolean
}

interface ParentInfo {
  fullName: string
  email: string
  mobile: string
  password: string
  confirmPassword: string
  billingAddress: string
  city: string
  state: string
  postcode: string
}

interface PlanSelection {
  tier: 'Glide' | 'Elevate' | 'Soar' | null
  weeklyHours: 1 | 2 | 3 | null
  subjectAllocation: {
    Mathematics: number
    English: number
    Science: number
  }
}

interface FormData {
  students: Student[]
  parent: ParentInfo
  plan: PlanSelection
  termsAccepted: boolean
}

const YEAR_LEVELS = ['Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10']
const SUBJECTS = ['Mathematics', 'English', 'Science']
const AUSTRALIAN_STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']

export default function EnrollmentFlow() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [editingStudentIndex, setEditingStudentIndex] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    students: [],
    parent: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      billingAddress: '',
      city: '',
      state: 'NSW',
      postcode: ''
    },
    plan: {
      tier: null,
      weeklyHours: null,
      subjectAllocation: {
        Mathematics: 0,
        English: 0,
        Science: 0
      }
    },
    termsAccepted: false
  })

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions')
      return
    }

    setIsSubmitting(true)

    // Prepare submission data
    const submissionData = {
      students: formData.students,
      parent: formData.parent,
      plan: formData.plan
    }

    // Here you would call your API
    console.log('Submitting:', submissionData)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Redirect to thank you page
    window.location.href = '/enrol/thank-you'
  }

  if (showWelcome) {
    return <WelcomeScreen onContinue={() => setShowWelcome(false)} />
  }

  return (
    <div className="min-h-screen bg-[#F7F5FB] text-[#3F3A52]">
      {/* Header with Logo and Progress Steps */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#E6E0F2]">
        <div className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between md:justify-start">
            {/* Logo and Business Name - Far Left */}
            <Link href="/" className="inline-flex items-center gap-2 md:gap-3 group md:mr-auto">
              <div className="relative h-8 w-8 md:h-10 md:w-10">
                <Image
                  src="/logo.jpg"
                  alt="Kite & Key Academy logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden md:block font-julius text-sm font-bold tracking-[0.14em] uppercase text-[#3F3A52] whitespace-nowrap">
                Kite & Key Academy
              </span>
            </Link>

            {/* Progress Steps - Center on desktop, right on mobile */}
            <div className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
              {[
                { num: 1, label: 'Student Info' },
                { num: 2, label: 'Parent Info' },
                { num: 3, label: 'Plan Selection' }
              ].map((step, index) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all ${index < currentStep
                        ? 'bg-[#5E5574] text-white'
                        : index === currentStep
                          ? 'bg-[#5E5574] text-white'
                          : 'bg-[#F7F5FB] text-[#8C84A8] border border-[#E6E0F2]'
                      }`}>
                      {index < currentStep ? <Check size={12} className="md:hidden" /> : null}
                      {index < currentStep ? <Check size={14} className="hidden md:block" /> : step.num}
                    </div>
                    <span className={`hidden md:block text-[10px] mt-1 whitespace-nowrap ${index <= currentStep ? 'text-[#5E5574]' : 'text-[#8C84A8]'
                      }`}>
                      {step.label}
                    </span>
                  </div>
                  {/* Connecting line */}
                  {index < 2 && (
                    <div className={`w-8 md:w-16 h-[2px] mx-1 md:mx-2 md:mt-[-12px] ${index < currentStep ? 'bg-[#5E5574]' : 'bg-[#E6E0F2]'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 0 && (
              <StudentInfoStep
                students={formData.students}
                setStudents={(students) => setFormData(prev => ({ ...prev, students }))}
                editingIndex={editingStudentIndex}
                setEditingIndex={setEditingStudentIndex}
              />
            )}

            {currentStep === 1 && (
              <ParentInfoStep
                parent={formData.parent}
                setParent={(parent) => setFormData(prev => ({ ...prev, parent }))}
                students={formData.students}
              />
            )}

            {currentStep === 2 && (
              <PlanSelectionStep
                plan={formData.plan}
                setPlan={(plan) => setFormData(prev => ({ ...prev, plan }))}
                students={formData.students}
                termsAccepted={formData.termsAccepted}
                setTermsAccepted={(accepted) => setFormData(prev => ({ ...prev, termsAccepted: accepted }))}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation - Bottom right */}
        <div className="flex justify-end items-center mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 mr-3 text-sm text-[#6B647F] hover:text-[#5E5574] transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {currentStep < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 0 && formData.students.length === 0}
              className="flex items-center gap-2 bg-[#5E5574] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#4F4865] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.termsAccepted || !formData.plan.tier}
              className="flex items-center gap-2 bg-[#5E5574] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#4F4865] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>Complete Enrollment <Check size={16} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Welcome Screen Component
function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white flex items-center justify-center"
    >
      {/* Animated background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F7F5FB] via-white to-[#FAFBFF]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E6E0F5]/50 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D9CFF2]/40 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Image
              src="/logo.jpg"
              alt="Kite & Key Academy logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-[#6B647F] text-lg mb-2 font-medium">Welcome to</p>
            <h1 className="font-julius text-5xl md:text-6xl text-[#3F3A52] font-light tracking-tight mb-6">
              Kite & Key Academy
            </h1>
            <p className="text-[#6B647F] text-lg mb-12 max-w-md mx-auto leading-relaxed">
              Begin your journey to academic excellence
            </p>
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onClick={onContinue}
            className="group relative px-12 py-4 bg-gradient-to-r from-[#5E5574] to-[#7C6B94] text-white rounded-full font-semibold text-lg shadow-2xl shadow-[#5E5574]/40 hover:shadow-[#5E5574]/60 transition-all hover:scale-105"
          >
            <span className="relative z-10">Enrol Now</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7C6B94] to-[#8B7FA8] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Student Info Step Component
function StudentInfoStep({
  students,
  setStudents,
  editingIndex,
  setEditingIndex
}: {
  students: Student[]
  setStudents: (students: Student[]) => void
  editingIndex: number | null
  setEditingIndex: (index: number | null) => void
}) {
  const [currentStudent, setCurrentStudent] = useState<Student>({
    id: '',
    firstName: '',
    lastName: '',
    yearLevel: '',
    school: '',
    subjects: [],
    learningGoals: '',
    learningChallenges: '',
    previousTutoring: false
  })

  const handleAddStudent = () => {
    if (!currentStudent.firstName || !currentStudent.lastName || !currentStudent.yearLevel || currentStudent.subjects.length === 0) {
      alert('Please fill in all required fields')
      return
    }

    const newStudent = { ...currentStudent, id: Date.now().toString() }

    if (editingIndex !== null) {
      const updated = [...students]
      updated[editingIndex] = newStudent
      setStudents(updated)
      setEditingIndex(null)
    } else {
      setStudents([...students, newStudent])
    }

    // Reset form
    setCurrentStudent({
      id: '',
      firstName: '',
      lastName: '',
      yearLevel: '',
      school: '',
      subjects: [],
      learningGoals: '',
      learningChallenges: '',
      previousTutoring: false
    })
  }

  const handleEditStudent = (index: number) => {
    setCurrentStudent(students[index])
    setEditingIndex(index)
  }

  const handleRemoveStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index))
  }

  const toggleSubject = (subject: string) => {
    setCurrentStudent(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  return (
    <div className="space-y-4">
      {/* Added Students List */}
      {students.length > 0 && (
        <div className="space-y-2 mb-4">
          {students.map((student, index) => (
            <div
              key={student.id}
              className="bg-white border border-[#E6E0F2] rounded-lg p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#F7F5FB] border border-[#E6E0F2] flex items-center justify-center text-[#5E5574] text-sm font-medium">
                  {student.firstName[0]}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#3F3A52]">{student.firstName} {student.lastName}</h4>
                  <p className="text-xs text-[#8C84A8]">{student.yearLevel} · {student.subjects.join(', ')}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditStudent(index)}
                  className="p-1.5 rounded text-[#8C84A8] hover:bg-[#F7F5FB] hover:text-[#5E5574] transition-colors"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleRemoveStudent(index)}
                  className="p-1.5 rounded text-[#8C84A8] hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Form Card */}
      <div className="bg-white border border-[#E6E0F2] rounded-xl p-6 space-y-5">
        <h3 className="text-base font-semibold text-[#3F3A52]">
          {editingIndex !== null ? 'Edit Student' : 'Add Student'}
        </h3>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#3F3A52] mb-1.5">
              First Name <span className="text-[#8C84A8]">*</span>
            </label>
            <input
              type="text"
              value={currentStudent.firstName}
              onChange={(e) => setCurrentStudent(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 bg-[#FAFBFF] border border-[#E6E0F2] rounded-lg text-sm text-[#3F3A52] placeholder-[#B8B3C6] focus:border-[#D9CFF2] focus:outline-none transition-colors"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3F3A52] mb-1.5">
              Last Name <span className="text-[#8C84A8]">*</span>
            </label>
            <input
              type="text"
              value={currentStudent.lastName}
              onChange={(e) => setCurrentStudent(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 bg-[#FAFBFF] border border-[#E6E0F2] rounded-lg text-sm text-[#3F3A52] placeholder-[#B8B3C6] focus:border-[#D9CFF2] focus:outline-none transition-colors"
              placeholder="Enter last name"
            />
          </div>
        </div>

        {/* Year Level and School */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#3F3A52] mb-1.5">
              Year Level <span className="text-[#8C84A8]">*</span>
            </label>
            <select
              value={currentStudent.yearLevel}
              onChange={(e) => setCurrentStudent(prev => ({ ...prev, yearLevel: e.target.value }))}
              className="w-full px-3 py-2 bg-[#FAFBFF] border border-[#E6E0F2] rounded-lg text-sm text-[#3F3A52] focus:border-[#D9CFF2] focus:outline-none transition-colors"
            >
              <option value="">Select year level</option>
              {YEAR_LEVELS.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3F3A52] mb-1.5">
              School (Optional)
            </label>
            <input
              type="text"
              value={currentStudent.school}
              onChange={(e) => setCurrentStudent(prev => ({ ...prev, school: e.target.value }))}
              className="w-full px-3 py-2 bg-[#FAFBFF] border border-[#E6E0F2] rounded-lg text-sm text-[#3F3A52] placeholder-[#B8B3C6] focus:border-[#D9CFF2] focus:outline-none transition-colors"
              placeholder="Enter school name"
            />
          </div>
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-sm font-medium text-[#3F3A52] mb-2">
            Subjects of Interest <span className="text-[#8C84A8]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(subject => (
              <button
                key={subject}
                type="button"
                onClick={() => toggleSubject(subject)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${currentStudent.subjects.includes(subject)
                  ? 'bg-[#5E5574] text-white'
                  : 'bg-white border border-[#E6E0F2] text-[#6B647F] hover:border-[#D9CFF2]'
                  }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div>
          <label className="block text-sm font-medium text-[#3F3A52] mb-1.5">
            Learning Goals
          </label>
          <textarea
            value={currentStudent.learningGoals}
            onChange={(e) => setCurrentStudent(prev => ({ ...prev, learningGoals: e.target.value }))}
            rows={2}
            className="w-full px-3 py-2 bg-[#FAFBFF] border border-[#E6E0F2] rounded-lg text-sm text-[#3F3A52] placeholder-[#B8B3C6] focus:border-[#D9CFF2] focus:outline-none transition-colors resize-none"
            placeholder="What would you like to achieve?"
          />
        </div>

        {/* Learning Challenges */}
        <div>
          <label className="block text-sm font-medium text-[#3F3A52] mb-1.5">
            Learning Challenges (Optional)
          </label>
          <textarea
            value={currentStudent.learningChallenges}
            onChange={(e) => setCurrentStudent(prev => ({ ...prev, learningChallenges: e.target.value }))}
            rows={2}
            className="w-full px-3 py-2 bg-[#FAFBFF] border border-[#E6E0F2] rounded-lg text-sm text-[#3F3A52] placeholder-[#B8B3C6] focus:border-[#D9CFF2] focus:outline-none transition-colors resize-none"
            placeholder="Any specific challenges we should know about?"
          />
        </div>

        {/* Previous Tutoring Checkbox */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentStudent.previousTutoring}
              onChange={(e) => setCurrentStudent(prev => ({ ...prev, previousTutoring: e.target.checked }))}
              className="w-4 h-4 rounded border-[#D9CFF2] text-[#5E5574] focus:ring-[#5E5574]/20"
            />
            <span className="text-sm text-[#6B647F]">Student has had previous tutoring experience</span>
          </label>
        </div>

        {/* Add Student Button */}
        <button
          type="button"
          onClick={handleAddStudent}
          className="w-full flex items-center justify-center gap-2 bg-[#5E5574] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4F4865] transition-colors"
        >
          <Plus size={16} />
          {editingIndex !== null ? 'Update Student Information' : 'Add Student to Enrollment'}
        </button>
      </div>

      {/* Add Another Student Button */}
      {students.length > 0 && editingIndex === null && (
        <button
          type="button"
          onClick={() => {
            setCurrentStudent({
              id: '', firstName: '', lastName: '', yearLevel: '', school: '', subjects: [],
              learningGoals: '', learningChallenges: '', previousTutoring: false
            })
            setEditingIndex(null)
          }}
          className="w-full flex items-center justify-center gap-2 bg-white border border-[#E6E0F2] text-[#6B647F] px-4 py-2.5 rounded-lg text-sm font-medium hover:border-[#D9CFF2] hover:text-[#5E5574] transition-colors"
        >
          <Plus size={16} />
          Add Another Student
        </button>
      )}
    </div>
  )
}

// Parent Info Step Component  
function ParentInfoStep({
  parent,
  setParent,
  students
}: {
  parent: ParentInfo
  setParent: (parent: ParentInfo) => void
  students: Student[]
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="font-julius text-2xl md:text-3xl font-light text-[#3F3A52] mb-2">Parent / Guardian Information</h2>
        <p className="text-[#6B647F]">Account owner and billing details</p>
      </div>

      {/* Students Summary */}
      {students.length > 0 && (
        <div className="bg-white border-2 border-[#E6E0F2] rounded-xl p-6 shadow-sm">
          <h3 className="text-xs font-bold text-[#8C84A8] uppercase tracking-wider mb-4 pl-1">
            Students on this account
          </h3>
          <div className="space-y-3">
            {students.map((student, index) => (
              <div key={student.id} className="flex items-center gap-4 text-sm p-2 rounded-lg hover:bg-[#FAFBFF] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#5E5574] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#5E5574]/20">
                  {index + 1}
                </div>
                <div>
                  <span className="text-[#3F3A52] font-bold text-base block">{student.firstName} {student.lastName}</span>
                  <span className="text-[#6B647F]">{student.yearLevel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parent Form */}
      <div className="bg-white border-2 border-[#E6E0F2] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl shadow-[#5E5574]/5">
        <div>
          <label className="block text-sm font-bold text-[#3F3A52] mb-2">
            Full Name <span className="text-[#5E5574]">*</span>
          </label>
          <input
            type="text"
            value={parent.fullName}
            onChange={(e) => setParent({ ...parent, fullName: e.target.value })}
            className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#3F3A52] mb-2">
              Email Address <span className="text-[#5E5574]">*</span>
            </label>
            <input
              type="email"
              value={parent.email}
              onChange={(e) => setParent({ ...parent, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#3F3A52] mb-2">
              Mobile Number <span className="text-[#5E5574]">*</span>
            </label>
            <input
              type="tel"
              value={parent.mobile}
              onChange={(e) => setParent({ ...parent, mobile: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
              placeholder="04XX XXX XXX"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#3F3A52] mb-2">
              Password <span className="text-[#5E5574]">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={parent.password}
              onChange={(e) => setParent({ ...parent, password: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
              placeholder="Create a secure password"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#3F3A52] mb-2">
              Confirm Password <span className="text-[#5E5574]">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={parent.confirmPassword}
              onChange={(e) => setParent({ ...parent, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-[#D9CFF2] text-[#5E5574] focus:ring-[#5E5574]/20"
          />
          <span className="text-sm font-medium text-[#6B647F] group-hover:text-[#5E5574] transition-colors">Show passwords</span>
        </label>

        <div className="pt-8 border-t-2 border-[#E6E0F2]">
          <h3 className="text-lg font-bold text-[#3F3A52] mb-6">Billing Address</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#3F3A52] mb-2">
                Street Address <span className="text-[#5E5574]">*</span>
              </label>
              <input
                type="text"
                value={parent.billingAddress}
                onChange={(e) => setParent({ ...parent, billingAddress: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#3F3A52] mb-2">
                  City <span className="text-[#5E5574]">*</span>
                </label>
                <input
                  type="text"
                  value={parent.city}
                  onChange={(e) => setParent({ ...parent, city: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
                  placeholder="Sydney"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3F3A52] mb-2">
                  State <span className="text-[#5E5574]">*</span>
                </label>
                <select
                  value={parent.state}
                  onChange={(e) => setParent({ ...parent, state: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
                >
                  {AUSTRALIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3F3A52] mb-2">
                  Postcode <span className="text-[#5E5574]">*</span>
                </label>
                <input
                  type="text"
                  value={parent.postcode}
                  onChange={(e) => setParent({ ...parent, postcode: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAFBFF] border-2 border-[#E6E0F2] rounded-xl text-[#3F3A52] placeholder-[#8C84A8] focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#5E5574]/5 focus:outline-none transition-all"
                  placeholder="2000"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Plan Selection Step Component
function PlanSelectionStep({
  plan,
  setPlan,
  students,
  termsAccepted,
  setTermsAccepted
}: {
  plan: PlanSelection
  setPlan: (plan: PlanSelection) => void
  students: Student[]
  termsAccepted: boolean
  setTermsAccepted: (accepted: boolean) => void
}) {
  const plans = [
    {
      tier: 'Elevate' as const,
      name: 'Elevate',
      tagline: 'Build foundations',
      pricePerHour: 75,
      hours: 1,
      weeklyTotal: 75,
      termTotal: 750,
      description: '1 hour per week'
    },
    {
      tier: 'Glide' as const,
      name: 'Glide',
      tagline: 'Accelerate progress',
      pricePerHour: 70,
      hours: 2,
      weeklyTotal: 140,
      termTotal: 1400,
      popular: true,
      description: '2 hours per week'
    },
    {
      tier: 'Soar' as const,
      name: 'Soar',
      tagline: 'Maximise potential',
      pricePerHour: 65,
      hours: 3,
      weeklyTotal: 195,
      termTotal: 1950,
      description: '3 hours per week'
    }
  ]

  const handleHourSelection = (hours: 1 | 2 | 3) => {
    setPlan({
      ...plan,
      weeklyHours: hours,
      subjectAllocation: {
        Mathematics: 0,
        English: 0,
        Science: 0
      }
    })
  }

  const handleSubjectAllocation = (subject: keyof typeof plan.subjectAllocation, value: number) => {
    const newAllocation = { ...plan.subjectAllocation, [subject]: value }
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0)

    if (total <= (plan.weeklyHours || 0)) {
      setPlan({ ...plan, subjectAllocation: newAllocation })
    }
  }

  const totalAllocated = Object.values(plan.subjectAllocation).reduce((sum, val) => sum + val, 0)
  const remainingHours = (plan.weeklyHours || 0) - totalAllocated

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="font-julius text-2xl md:text-3xl font-light text-[#3F3A52] mb-2">Plan Selection</h2>
        <p className="text-[#6B647F]">Choose your tutoring plan and allocate hours</p>
      </div>

      {/* Plan Tiers */}
      <div>
        <h3 className="text-lg font-bold text-[#3F3A52] mb-4">Select Your Plan</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((planOption) => (
            <button
              key={planOption.tier}
              type="button"
              onClick={() => {
                setPlan({
                  ...plan,
                  tier: planOption.tier,
                  weeklyHours: planOption.hours as 1 | 2 | 3,
                  // Reset allocation when switching plans to avoid overflow
                  subjectAllocation: { Mathematics: 0, English: 0, Science: 0 }
                })
              }}
              className={`relative p-6 rounded-2xl border-2 transition-all text-left group flex flex-col justify-between overflow-visible ${plan.tier === planOption.tier
                ? 'border-[#5E5574] bg-[#5E5574] text-white shadow-xl shadow-[#5E5574]/20 scale-105 z-10'
                : 'border-[#E6E0F2] bg-white text-[#3F3A52] hover:border-[#D9CFF2] hover:bg-[#FAFBFF]'
                }`}
            >
              {planOption.popular && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full shadow-lg ${plan.tier === planOption.tier
                  ? 'bg-white text-[#5E5574]'
                  : 'bg-[#5E5574] text-white'
                  }`}>
                  POPULAR
                </div>
              )}

              <div className="text-center w-full">
                <h4 className={`text-xl font-bold mb-1 ${plan.tier === planOption.tier ? 'text-white' : 'text-[#3F3A52]'}`}>
                  {planOption.name}
                </h4>
                <p className={`text-sm mb-4 ${plan.tier === planOption.tier ? 'text-white/80' : 'text-[#6B647F]'}`}>
                  {planOption.tagline}
                </p>

                <div className={`py-4 my-2 border-t border-b w-full ${plan.tier === planOption.tier ? 'border-white/20' : 'border-[#E6E0F2]'}`}>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-3xl font-bold ${plan.tier === planOption.tier ? 'text-white' : 'text-[#3F3A52]'}`}>
                      ${planOption.pricePerHour}
                    </span>
                    <span className={`text-sm ${plan.tier === planOption.tier ? 'text-white/80' : 'text-[#8C84A8]'}`}>/hr</span>
                  </div>
                  <div className={`text-xs mt-1 font-medium ${plan.tier === planOption.tier ? 'text-white/80' : 'text-[#6B647F]'}`}>
                    ${planOption.weeklyTotal} / week
                  </div>
                  <div className={`text-[10px] mt-0.5 opacity-80 ${plan.tier === planOption.tier ? 'text-white/70' : 'text-[#8C84A8]'}`}>
                    ${planOption.termTotal} / term
                  </div>
                </div>

                <div className={`text-sm font-medium mb-4 ${plan.tier === planOption.tier ? 'text-white/90' : 'text-[#5E5574]'}`}>
                  {planOption.description}
                </div>

                {plan.tier === planOption.tier ? (
                  <div className="flex items-center justify-center gap-2 text-white bg-white/20 py-1.5 px-4 rounded-full mx-auto w-fit mt-auto">
                    <Check size={14} strokeWidth={3} />
                    <span className="text-sm font-bold">Selected</span>
                  </div>
                ) : (
                  <div className="h-8 flex items-center justify-center text-sm font-bold text-[#8C84A8] group-hover:text-[#5E5574] transition-colors mt-auto border border-transparent group-hover:border-[#D9CFF2] group-hover:bg-white rounded-lg px-4">
                    Select Plan
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Allocation - Shows immediately after plan selection */}
      {plan.tier && plan.weeklyHours && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white border-2 border-[#E6E0F2] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl shadow-[#5E5574]/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#3F3A52]">Subject Allocation</h3>
                <p className="text-sm text-[#6B647F]">Distribute your {plan.weeklyHours} hours across subjects</p>
              </div>
              <div className="text-sm bg-[#FAFBFF] px-3 py-1.5 rounded-lg border border-[#E6E0F2]">
                <span className="text-[#6B647F]">Remaining: </span>
                <span className={`font-bold ${remainingHours === 0 ? 'text-[#4CAF50]' : 'text-[#5E5574]'}`}>
                  {remainingHours} {remainingHours === 1 ? 'hour' : 'hours'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {SUBJECTS.map((subject) => (
                <div key={subject}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-[#3F3A52]">{subject}</label>
                    {plan.subjectAllocation[subject as keyof typeof plan.subjectAllocation] > 0 && (
                      <span className="text-xs font-bold text-[#5E5574] bg-[#F7F5FB] px-2 py-1 rounded">
                        {plan.subjectAllocation[subject as keyof typeof plan.subjectAllocation]} {plan.subjectAllocation[subject as keyof typeof plan.subjectAllocation] === 1 ? 'hour' : 'hours'}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {[...Array(plan.weeklyHours)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSubjectAllocation(subject as keyof typeof plan.subjectAllocation, i + 1)}
                        className={`flex-1 h-12 rounded-xl border-2 transition-all font-medium ${i < plan.subjectAllocation[subject as keyof typeof plan.subjectAllocation]
                          ? 'border-[#5E5574] bg-[#5E5574] text-white shadow-md'
                          : 'border-[#E6E0F2] bg-[#FAFBFF] text-[#8C84A8] hover:border-[#D9CFF2]'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {remainingHours === 0 && (
              <div className="flex items-center gap-3 text-[#4CAF50] bg-[#4CAF50]/10 px-5 py-3 rounded-xl border border-[#4CAF50]/20">
                <Check size={20} />
                <span className="text-sm font-bold">All hours allocated</span>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          {remainingHours === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-[#E6E0F2] rounded-xl p-6 shadow-sm"
            >
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-2 border-[#D9CFF2] text-[#5E5574] focus:ring-[#5E5574]/20"
                />
                <div className="text-sm">
                  <span className="text-[#3F3A52] font-bold group-hover:text-[#5E5574] transition-colors">I accept the Terms and Conditions</span>
                  <p className="text-[#6B647F] mt-1 leading-relaxed">
                    I understand that I am creating an account for {students.length} {students.length === 1 ? 'student' : 'students'} and consent to manage their learning through the Kite & Key LMS.
                  </p>
                </div>
              </label>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

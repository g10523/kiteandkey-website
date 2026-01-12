"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, Clock } from "lucide-react";
import { submitConsultation } from "./actions";

/* =========================
   Types
========================= */

interface FormData {
    // Parent/Guardian Information
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
    parentPhone: string;
    relationshipToStudent: string;
    preferredContactMethod: string;
    bestTimeToContact: string;

    // Student Information
    studentFirstName: string;
    studentLastName: string;
    studentAge: string;
    yearLevel: string;
    schoolName: string;
    subjects: string[];

    // Learning Profile
    currentPerformance: string;
    learningChallenges: string[];
    otherChallenges: string;
    hasDiagnosis: string;
    diagnosisDetails: string;
    previousTutoring: string;
    previousTutoringDetails: string;

    // Goals & Concerns
    primaryConcerns: string;
    learningGoals: string;
    successLooksLike: string;

    // Scheduling
    selectedSlotId: string;


    // Additional
    howDidYouHear: string;
    additionalInfo: string;
    agreeToPrivacy: boolean;
}

const initialFormData: FormData = {
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    relationshipToStudent: "",
    preferredContactMethod: "",
    bestTimeToContact: "",
    studentFirstName: "",
    studentLastName: "",
    studentAge: "",
    yearLevel: "",
    schoolName: "",
    subjects: [],
    currentPerformance: "",
    learningChallenges: [],
    otherChallenges: "",
    hasDiagnosis: "",
    diagnosisDetails: "",
    previousTutoring: "",
    previousTutoringDetails: "",
    primaryConcerns: "",
    learningGoals: "",
    successLooksLike: "",
    selectedSlotId: "",

    howDidYouHear: "",
    additionalInfo: "",
    agreeToPrivacy: false,
};

/* =========================
   Data Options
========================= */

const YEAR_LEVELS = ["Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];
const SUBJECTS = ["Mathematics", "English", "Science"];
const RELATIONSHIPS = ["Mother", "Father", "Guardian", "Grandparent", "Other family member", "Other"];
const CONTACT_METHODS = ["Phone call", "SMS", "Email", "WhatsApp"];
const CONTACT_TIMES = ["Morning (9am - 12pm)", "Afternoon (12pm - 3pm)", "After school (3pm - 5pm)", "Evening (5pm - 7pm)"];
const PERFORMANCE_LEVELS = ["Excelling (A/A+)", "Doing well (B/B+)", "Average (C)", "Struggling (D or below)", "Unsure / Varies by subject"];
const LEARNING_CHALLENGES = ["ADHD / Attention difficulties", "Dyslexia / Reading difficulties", "Dyscalculia / Maths difficulties", "Dysgraphia / Writing difficulties", "Processing speed challenges", "Working memory difficulties", "Autism spectrum", "Anxiety affecting learning", "School refusal / avoidance", "Gifted / twice-exceptional", "English as additional language", "No specific challenges"];

const REFERRAL_SOURCES = ["Google search", "Social media (Facebook, Instagram)", "Friend or family recommendation", "School recommendation", "Another professional (psychologist, paediatrician)", "Local community group", "Other"];

/* =========================
   Component
========================= */

export default function ConsultationForm({ availableSlots }: { availableSlots: any[] }) {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const totalSteps = 5;

    // Form handlers
    const updateField = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const toggleArrayField = (field: keyof FormData, value: string) => {
        setFormData((prev) => {
            const currentArray = prev[field] as string[];
            const newArray = currentArray.includes(value)
                ? currentArray.filter((item) => item !== value)
                : [...currentArray, value];
            return { ...prev, [field]: newArray };
        });
    };

    // Validation
    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (step === 1) {
            if (!formData.parentFirstName.trim()) newErrors.parentFirstName = "First name is required";
            if (!formData.parentLastName.trim()) newErrors.parentLastName = "Last name is required";
            if (!formData.parentEmail.trim()) {
                newErrors.parentEmail = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
                newErrors.parentEmail = "Please enter a valid email";
            }
            if (!formData.parentPhone.trim()) newErrors.parentPhone = "Phone number is required";
            if (!formData.relationshipToStudent) newErrors.relationshipToStudent = "Please select your relationship";
        }

        if (step === 2) {
            if (!formData.studentFirstName.trim()) newErrors.studentFirstName = "Student's first name is required";
            if (!formData.studentLastName.trim()) newErrors.studentLastName = "Student's last name is required";
            if (!formData.yearLevel) newErrors.yearLevel = "Please select year level";
            if (formData.subjects.length === 0) newErrors.subjects = "Please select at least one subject";
        }

        if (step === 3) {
            if (!formData.currentPerformance) newErrors.currentPerformance = "Please select current performance level";
        }

        if (step === 4) {
            if (!formData.primaryConcerns.trim()) newErrors.primaryConcerns = "Please share your main concerns";
        }

        if (step === 5) {
            if (!formData.selectedSlotId) newErrors.selectedSlotId = "Please select a consultation time";
            if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "Please agree to the privacy policy";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);
        const result = await submitConsultation(formData);

        if (result.success) {
            setIsSubmitted(true);
        } else {
            alert("Something went wrong. Please try again.");
        }

        setIsSubmitting(false);
    };

    // Group slots by date
    const slotsByDate = availableSlots.reduce((acc, slot) => {
        const date = new Date(slot.startTime).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(slot);
        return acc;
    }, {} as Record<string, any[]>);

    // Success state
    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-white">
                <section className="relative overflow-hidden pt-32 pb-24">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB] via-white to-white" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E6E0F5]/30 rounded-full blur-3xl" />

                    <div className="relative mx-auto max-w-2xl px-6 text-center">
                        <div className="rounded-3xl border-2 border-[#D9CFF2] bg-white/80 backdrop-blur-sm p-12 shadow-xl">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#E6E0F5] to-[#F7F5FB] shadow-lg">
                                <CheckCircle2 className="h-10 w-10 text-[#5E5574]" />
                            </div>
                            <h1 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
                                Request Received!
                            </h1>
                            <p className="mt-4 text-lg text-[#6B647F] leading-relaxed">
                                Thanks {formData.parentFirstName}. We'll confirm your appointment shortly via email or phone.
                            </p>
                            <Link
                                href="/"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-12">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB] via-[#FAFBFF] to-white" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#E6E0F5]/40 rounded-full blur-3xl" />
                <div className="absolute top-20 right-1/4 w-64 h-64 bg-[#D9CFF2]/30 rounded-full blur-3xl" />

                <div className="relative mx-auto max-w-3xl px-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/80 px-4 py-1.5 text-xs font-medium text-[#5E5574] backdrop-blur-sm mb-6">
                        <Calendar size={14} />
                        Free 15-minute consultation
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl text-[#3F3A52] font-light tracking-tight">
                        Book Your Free Consultation
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-[#6B647F] max-w-2xl mx-auto leading-relaxed">
                        Share your child's learning journey with us. We'll listen, understand, and create a personalised path forward — no pressure, just clarity.
                    </p>
                </div>
            </section>

            {/* Progress Bar */}
            <section className="relative pb-8">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="flex items-center justify-between mb-4 relative">
                        {/* Background line */}
                        <div className="absolute top-5 left-5 right-5 h-0.5 bg-[#E6E1F2]" />
                        <div
                            className="absolute top-5 left-5 h-0.5 bg-[#5E5574] transition-all duration-500"
                            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                        />

                        {[
                            { step: 1, label: "Details" },
                            { step: 2, label: "Student" },
                            { step: 3, label: "Learning" },
                            { step: 4, label: "Goals" },
                            { step: 5, label: "Schedule" },
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center relative z-10">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${currentStep >= item.step
                                    ? "bg-[#5E5574] text-white shadow-lg scale-110"
                                    : "bg-white border-2 border-[#E6E1F2] text-[#8C84A8]"
                                    }`}>
                                    {currentStep > item.step ? <CheckCircle2 size={20} /> : item.step}
                                </div>
                                <span className={`mt-2 text-xs font-medium hidden sm:block ${currentStep >= item.step ? "text-[#5E5574]" : "text-[#8C84A8]"}`}>
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

                        {/* Step 1 */}
                        {currentStep === 1 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Your Details</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Let's start with your contact information</p>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InputField label="First Name" value={formData.parentFirstName} onChange={(v) => updateField("parentFirstName", v)} error={errors.parentFirstName} required />
                                    <InputField label="Last Name" value={formData.parentLastName} onChange={(v) => updateField("parentLastName", v)} error={errors.parentLastName} required />
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InputField label="Email" type="email" value={formData.parentEmail} onChange={(v) => updateField("parentEmail", v)} error={errors.parentEmail} required />
                                    <InputField label="Phone" type="tel" value={formData.parentPhone} onChange={(v) => updateField("parentPhone", v)} error={errors.parentPhone} required />
                                </div>
                                <SelectField label="Relationship" value={formData.relationshipToStudent} onChange={(v) => updateField("relationshipToStudent", v)} options={RELATIONSHIPS} error={errors.relationshipToStudent} required />
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <SelectField label="Preferred Contact" value={formData.preferredContactMethod} onChange={(v) => updateField("preferredContactMethod", v)} options={CONTACT_METHODS} />
                                    <SelectField label="Best Time" value={formData.bestTimeToContact} onChange={(v) => updateField("bestTimeToContact", v)} options={CONTACT_TIMES} />
                                </div>
                                <SelectField label="How did you hear about us?" value={formData.howDidYouHear} onChange={(v) => updateField("howDidYouHear", v)} options={REFERRAL_SOURCES} />
                            </div>
                        )}

                        {/* Step 2 */}
                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Student Information</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Tell us about your child</p>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InputField label="Student First Name" value={formData.studentFirstName} onChange={(v) => updateField("studentFirstName", v)} error={errors.studentFirstName} required />
                                    <InputField label="Student Last Name" value={formData.studentLastName} onChange={(v) => updateField("studentLastName", v)} error={errors.studentLastName} required />
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InputField label="Age" type="number" value={formData.studentAge} onChange={(v) => updateField("studentAge", v)} />
                                    <SelectField label="Year Level" value={formData.yearLevel} onChange={(v) => updateField("yearLevel", v)} options={YEAR_LEVELS} error={errors.yearLevel} required />
                                </div>
                                <InputField label="School Name" value={formData.schoolName} onChange={(v) => updateField("schoolName", v)} />
                                <CheckboxGroup label="Subjects" options={SUBJECTS} selected={formData.subjects} onChange={(v) => toggleArrayField("subjects", v)} error={errors.subjects} required />
                            </div>
                        )}

                        {/* Step 3 */}
                        {currentStep === 3 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Learning Profile</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Help us understand your child's current performance</p>
                                </div>
                                <SelectField label="Performance" value={formData.currentPerformance} onChange={(v) => updateField("currentPerformance", v)} options={PERFORMANCE_LEVELS} error={errors.currentPerformance} required />

                                <RadioGroup label="Previous Tutoring?" options={["Yes", "No"]} value={formData.previousTutoring} onChange={(v) => updateField("previousTutoring", v)} />
                                {formData.previousTutoring === "Yes" && <TextareaField label="Details" value={formData.previousTutoringDetails} onChange={(v) => updateField("previousTutoringDetails", v)} />}
                            </div>
                        )}

                        {/* Step 4 */}
                        {currentStep === 4 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Goals & Concerns</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Share what you're hoping to achieve</p>
                                </div>
                                <TextareaField label="Main Concerns" value={formData.primaryConcerns} onChange={(v) => updateField("primaryConcerns", v)} error={errors.primaryConcerns} required />
                                <TextareaField label="Learning Goals" value={formData.learningGoals} onChange={(v) => updateField("learningGoals", v)} />
                                <TextareaField label="Success Looks Like" value={formData.successLooksLike} onChange={(v) => updateField("successLooksLike", v)} />
                            </div>
                        )}

                        {/* Step 5: Schedule */}
                        {currentStep === 5 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52]">Select a Time</h2>
                                    <p className="mt-2 text-sm text-[#8C84A8]">Choose a time for your free 15-minute consultation</p>
                                </div>

                                {availableSlots.length === 0 ? (
                                    <div className="rounded-xl bg-amber-50 p-6 border-2 border-amber-200 text-amber-900 text-sm">
                                        <p className="font-semibold mb-2">No slots currently available online</p>
                                        <p>Please submit the form anyway and we'll contact you to find a suitable time.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {Object.entries(slotsByDate).map(([date, slots]: [string, any[]]) => (
                                            <div key={date} className="rounded-2xl border border-[#E6E0F2] bg-[#FAFBFF] p-6">
                                                <h3 className="font-semibold text-[#3F3A52] mb-4 flex items-center gap-2">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F1FB]">
                                                        <Calendar size={16} className="text-[#5E5574]" />
                                                    </div>
                                                    {date}
                                                </h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {slots.map(slot => {
                                                        const timeStr = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                        return (
                                                            <button
                                                                key={slot.id}
                                                                onClick={() => updateField('selectedSlotId', slot.id)}
                                                                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all hover:shadow-md hover:-translate-y-0.5 ${formData.selectedSlotId === slot.id
                                                                    ? "border-[#5E5574] bg-[#5E5574] text-white shadow-lg scale-105"
                                                                    : "border-[#E6E0F2] bg-white text-[#5E5574] hover:border-[#D9CFF2]"
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
                                {errors.selectedSlotId && <p className="text-red-500 text-sm">{errors.selectedSlotId}</p>}


                                <TextareaField label="Additional Information (Optional)" value={formData.additionalInfo} onChange={(v) => updateField("additionalInfo", v)} placeholder="Anything else we should know?" />

                                <label className="flex items-start gap-3 cursor-pointer p-5 rounded-xl bg-gradient-to-r from-[#F7F5FB] to-[#FAFBFF] border-2 border-[#E6E0F2] hover:border-[#D9CFF2] transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToPrivacy}
                                        onChange={(e) => updateField("agreeToPrivacy", e.target.checked)}
                                        className="mt-1 h-5 w-5 rounded border-2 border-[#D9CFF2] text-[#5E5574] focus:ring-2 focus:ring-[#5E5574]/20"
                                    />
                                    <span className="text-sm text-[#5E5574] leading-relaxed">
                                        I agree to the Privacy Policy and consent to Kite & Key storing my information for consultation purposes.
                                    </span>
                                </label>
                                {errors.agreeToPrivacy && <p className="text-red-500 text-sm font-medium">{errors.agreeToPrivacy}</p>}
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="mt-10 flex justify-between items-center pt-8 border-t-2 border-[#E6E0F2]">
                            {currentStep > 1 ? (
                                <button
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#E6E0F2] bg-white px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:border-[#D9CFF2] hover:bg-[#F7F5FB] hover:-translate-y-0.5"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                            ) : <div />}

                            {currentStep < totalSteps ? (
                                <button
                                    onClick={handleNext}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    Continue
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={16} />
                                            Book Consultation
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

// Re-use UI components
function InputField({ label, value, onChange, type = "text", error, required, placeholder }: any) {
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
                className={`w-full rounded-xl border-2 px-4 py-3 text-[#3F3A52] bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 focus:border-[#D9CFF2] ${error ? "border-red-300 bg-red-50/30" : "border-[#E6E1F2] hover:border-[#D9CFF2]"
                    }`}
            />
            {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
        </div>
    );
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
                className={`w-full rounded-xl border-2 px-4 py-3 bg-white text-[#3F3A52] transition-all focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 focus:border-[#D9CFF2] ${error ? "border-red-300 bg-red-50/30" : "border-[#E6E1F2] hover:border-[#D9CFF2]"
                    }`}
            >
                <option value="">Select...</option>
                {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
            </select>
            {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
        </div>
    );
}

function TextareaField({ label, value, onChange, rows = 4, error, required, placeholder }: any) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#3F3A52] mb-2">
                {label}{required && <span className="text-[#5E5574] ml-1">*</span>}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                placeholder={placeholder}
                className={`w-full rounded-xl border-2 px-4 py-3 text-[#3F3A52] bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 focus:border-[#D9CFF2] resize-none ${error ? "border-red-300 bg-red-50/30" : "border-[#E6E1F2] hover:border-[#D9CFF2]"
                    }`}
            />
            {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
        </div>
    );
}

function CheckboxGroup({ label, options, selected, onChange, columns = 1, error, required }: any) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#3F3A52] mb-3">
                {label}{required && <span className="text-[#5E5574] ml-1">*</span>}
            </label>
            <div className={`grid gap-3 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
                {options.map((o: string) => (
                    <label
                        key={o}
                        className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${selected.includes(o)
                            ? "border-[#5E5574] bg-gradient-to-br from-[#F7F5FB] to-[#FAFBFF] shadow-md"
                            : "border-[#E6E1F2] bg-white hover:border-[#D9CFF2] hover:bg-[#FAFBFF]"
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(o)}
                            onChange={() => onChange(o)}
                            className="h-4 w-4 rounded border-2 border-[#D9CFF2] text-[#5E5574] focus:ring-2 focus:ring-[#5E5574]/20"
                        />
                        <span className="text-sm font-medium text-[#3F3A52]">{o}</span>
                    </label>
                ))}
            </div>
            {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
        </div>
    );
}

function RadioGroup({ label, options, value, onChange }: any) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#3F3A52] mb-3">{label}</label>
            <div className="flex flex-wrap gap-3">
                {options.map((o: string) => (
                    <label
                        key={o}
                        className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 cursor-pointer transition-all ${value === o
                            ? "border-[#5E5574] bg-gradient-to-br from-[#F7F5FB] to-[#FAFBFF] shadow-md"
                            : "border-[#E6E1F2] bg-white hover:border-[#D9CFF2] hover:bg-[#FAFBFF]"
                            }`}
                    >
                        <input
                            type="radio"
                            checked={value === o}
                            onChange={() => onChange(o)}
                            className="h-4 w-4 border-2 border-[#D9CFF2] text-[#5E5574] focus:ring-2 focus:ring-[#5E5574]/20"
                        />
                        <span className="text-sm font-medium text-[#3F3A52]">{o}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

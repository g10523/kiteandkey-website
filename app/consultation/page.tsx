// app/consultation/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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
  
  // Scheduling Preferences
  preferredDays: string[];
  preferredTimes: string[];
  sessionFormat: string;
  
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
  preferredDays: [],
  preferredTimes: [],
  sessionFormat: "",
  howDidYouHear: "",
  additionalInfo: "",
  agreeToPrivacy: false,
};

/* =========================
   Data Options
========================= */

const YEAR_LEVELS = ["Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];

const SUBJECTS = ["Mathematics", "English", "Science"];

const RELATIONSHIPS = [
  "Mother",
  "Father", 
  "Guardian",
  "Grandparent",
  "Other family member",
  "Other",
];

const CONTACT_METHODS = ["Phone call", "SMS", "Email", "WhatsApp"];

const CONTACT_TIMES = [
  "Morning (9am - 12pm)",
  "Afternoon (12pm - 3pm)", 
  "After school (3pm - 5pm)",
  "Evening (5pm - 7pm)",
];

const PERFORMANCE_LEVELS = [
  "Excelling (A/A+)",
  "Doing well (B/B+)",
  "Average (C)",
  "Struggling (D or below)",
  "Unsure / Varies by subject",
];

const LEARNING_CHALLENGES = [
  "ADHD / Attention difficulties",
  "Dyslexia / Reading difficulties",
  "Dyscalculia / Maths difficulties",
  "Dysgraphia / Writing difficulties",
  "Processing speed challenges",
  "Working memory difficulties",
  "Autism spectrum",
  "Anxiety affecting learning",
  "School refusal / avoidance",
  "Gifted / twice-exceptional",
  "English as additional language",
  "No specific challenges",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TIME_SLOTS = [
  "Before school (7am - 9am)",
  "After school (3pm - 5pm)",
  "Early evening (5pm - 7pm)",
  "Evening (7pm - 9pm)",
  "Weekend morning",
  "Weekend afternoon",
];

const SESSION_FORMATS = [
  "Online (Zoom/Google Meet)",
  "In-person (if available)",
  "No preference",
];

const REFERRAL_SOURCES = [
  "Google search",
  "Social media (Facebook, Instagram)",
  "Friend or family recommendation",
  "School recommendation",
  "Another professional (psychologist, paediatrician)",
  "Local community group",
  "Other",
];

/* =========================
   Page Component
========================= */

export default function ConsultationPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const totalSteps = 5;

  // Form handlers
  const updateField = (field: keyof FormData, value: string | boolean) => {
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
      if (formData.preferredDays.length === 0) newErrors.preferredDays = "Please select at least one day";
      if (formData.preferredTimes.length === 0) newErrors.preferredTimes = "Please select at least one time";
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would send formData to your backend
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Success state
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3F9] via-[#FAFAFA] to-[#FAFAFA]" />
          <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-[#E6E1F2]/40 blur-3xl" />

          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <div className="rounded-3xl border border-[#E6E1F2] bg-white p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E6E0F5]">
                <CheckCircle2 className="h-10 w-10 text-[#5E5574]" />
              </div>

              <h1 className="text-3xl font-bold text-[#3F3A52]">
                Thank you, {formData.parentFirstName}
              </h1>

              <p className="mt-4 text-lg text-[#6B647F]">
                We've received your consultation request for {formData.studentFirstName}.
              </p>

              <div className="mt-8 rounded-2xl border border-[#E6E1F2] bg-[#F7F5FB] p-6 text-left">
                <h3 className="font-semibold text-[#3F3A52] mb-4">What happens next?</h3>
                <ul className="space-y-3">
                  {[
                    "We'll review your information within 24 hours",
                    "A team member will contact you to schedule your free consultation",
                    "During the call, we'll discuss your child's needs in detail",
                    "We'll recommend the best pathway forward — no pressure, no obligation",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#6B647F]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5E5574] text-xs text-white">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 text-sm text-[#8C84A8]">
                We'll be in touch via {formData.preferredContactMethod.toLowerCase() || "your preferred method"} 
                {formData.bestTimeToContact && ` during ${formData.bestTimeToContact.toLowerCase()}`}.
              </p>

              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#4F4865]"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3F9] via-[#FAFAFA] to-[#FAFAFA]" />
        <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-[#E6E1F2]/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#DDD4F2]/30 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
            Free 15-minute consultation
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3F3A52]">
            Book a Consultation
          </h1>

          <p className="mt-4 text-lg text-[#6B647F] max-w-xl mx-auto">
            Tell us about your child so we can prepare for a meaningful conversation 
            about how we can help.
          </p>
        </div>
      </section>

      {/* ================= PROGRESS ================= */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center justify-between mb-4">
            {[
              { step: 1, label: "Your Details" },
              { step: 2, label: "Student" },
              { step: 3, label: "Learning Profile" },
              { step: 4, label: "Goals" },
              { step: 5, label: "Schedule" },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      currentStep >= item.step
                        ? "bg-[#5E5574] text-white"
                        : "bg-[#E6E1F2] text-[#8C84A8]"
                    }`}
                  >
                    {currentStep > item.step ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      item.step
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium hidden sm:block ${
                      currentStep >= item.step ? "text-[#5E5574]" : "text-[#8C84A8]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 4 && (
                  <div
                    className={`mx-2 h-0.5 w-8 sm:w-16 transition-colors ${
                      currentStep > item.step ? "bg-[#5E5574]" : "bg-[#E6E1F2]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl border border-[#E6E1F2] bg-white p-8 md:p-12">
            
            {/* Step 1: Parent/Guardian Details */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#3F3A52]">Your Details</h2>
                  <p className="mt-2 text-[#6B647F]">
                    We'll use this information to contact you about the consultation.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <InputField
                    label="First Name"
                    value={formData.parentFirstName}
                    onChange={(v) => updateField("parentFirstName", v)}
                    error={errors.parentFirstName}
                    required
                  />
                  <InputField
                    label="Last Name"
                    value={formData.parentLastName}
                    onChange={(v) => updateField("parentLastName", v)}
                    error={errors.parentLastName}
                    required
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <InputField
                    label="Email Address"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(v) => updateField("parentEmail", v)}
                    error={errors.parentEmail}
                    required
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(v) => updateField("parentPhone", v)}
                    error={errors.parentPhone}
                    required
                  />
                </div>

                <SelectField
                  label="Relationship to Student"
                  value={formData.relationshipToStudent}
                  onChange={(v) => updateField("relationshipToStudent", v)}
                  options={RELATIONSHIPS}
                  error={errors.relationshipToStudent}
                  required
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <SelectField
                    label="Preferred Contact Method"
                    value={formData.preferredContactMethod}
                    onChange={(v) => updateField("preferredContactMethod", v)}
                    options={CONTACT_METHODS}
                  />
                  <SelectField
                    label="Best Time to Contact"
                    value={formData.bestTimeToContact}
                    onChange={(v) => updateField("bestTimeToContact", v)}
                    options={CONTACT_TIMES}
                  />
                </div>

                <SelectField
                  label="How did you hear about us?"
                  value={formData.howDidYouHear}
                  onChange={(v) => updateField("howDidYouHear", v)}
                  options={REFERRAL_SOURCES}
                />
              </div>
            )}

            {/* Step 2: Student Information */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#3F3A52]">Student Information</h2>
                  <p className="mt-2 text-[#6B647F]">
                    Tell us about the student who will be receiving tutoring.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <InputField
                    label="Student's First Name"
                    value={formData.studentFirstName}
                    onChange={(v) => updateField("studentFirstName", v)}
                    error={errors.studentFirstName}
                    required
                  />
                  <InputField
                    label="Student's Last Name"
                    value={formData.studentLastName}
                    onChange={(v) => updateField("studentLastName", v)}
                    error={errors.studentLastName}
                    required
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <InputField
                    label="Student's Age"
                    type="number"
                    value={formData.studentAge}
                    onChange={(v) => updateField("studentAge", v)}
                    placeholder="e.g. 14"
                  />
                  <SelectField
                    label="Current Year Level"
                    value={formData.yearLevel}
                    onChange={(v) => updateField("yearLevel", v)}
                    options={YEAR_LEVELS}
                    error={errors.yearLevel}
                    required
                  />
                </div>

                <InputField
                  label="School Name"
                  value={formData.schoolName}
                  onChange={(v) => updateField("schoolName", v)}
                  placeholder="e.g. Sydney Grammar School"
                />

                <CheckboxGroup
                  label="Subjects of Interest"
                  options={SUBJECTS}
                  selected={formData.subjects}
                  onChange={(v) => toggleArrayField("subjects", v)}
                  error={errors.subjects}
                  required
                />
              </div>
            )}

            {/* Step 3: Learning Profile */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#3F3A52]">Learning Profile</h2>
                  <p className="mt-2 text-[#6B647F]">
                    This helps us understand your child's unique learning needs. 
                    All information is kept strictly confidential.
                  </p>
                </div>

                <SelectField
                  label="Current Academic Performance"
                  value={formData.currentPerformance}
                  onChange={(v) => updateField("currentPerformance", v)}
                  options={PERFORMANCE_LEVELS}
                  error={errors.currentPerformance}
                  required
                />

                <CheckboxGroup
                  label="Learning Challenges (if any)"
                  description="Select any that apply — this helps us tailor our approach."
                  options={LEARNING_CHALLENGES}
                  selected={formData.learningChallenges}
                  onChange={(v) => toggleArrayField("learningChallenges", v)}
                  columns={2}
                />

                {formData.learningChallenges.length > 0 && 
                 !formData.learningChallenges.includes("No specific challenges") && (
                  <InputField
                    label="Any other details about learning challenges?"
                    value={formData.otherChallenges}
                    onChange={(v) => updateField("otherChallenges", v)}
                    placeholder="Optional — share anything that might help us understand"
                  />
                )}

                <div className="space-y-4">
                  <RadioGroup
                    label="Has your child received any formal assessments or diagnoses?"
                    options={["Yes", "No", "Assessment pending"]}
                    value={formData.hasDiagnosis}
                    onChange={(v) => updateField("hasDiagnosis", v)}
                  />

                  {formData.hasDiagnosis === "Yes" && (
                    <TextareaField
                      label="Please share relevant details"
                      value={formData.diagnosisDetails}
                      onChange={(v) => updateField("diagnosisDetails", v)}
                      placeholder="e.g. ADHD diagnosis (2023), educational psychologist assessment, MindPrint completed"
                      rows={3}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <RadioGroup
                    label="Has your child had tutoring before?"
                    options={["Yes", "No"]}
                    value={formData.previousTutoring}
                    onChange={(v) => updateField("previousTutoring", v)}
                  />

                  {formData.previousTutoring === "Yes" && (
                    <TextareaField
                      label="How did it go? What worked or didn't work?"
                      value={formData.previousTutoringDetails}
                      onChange={(v) => updateField("previousTutoringDetails", v)}
                      placeholder="This helps us avoid repeating approaches that haven't worked"
                      rows={3}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Goals & Concerns */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#3F3A52]">Goals & Concerns</h2>
                  <p className="mt-2 text-[#6B647F]">
                    Help us understand what you're hoping to achieve. There are no wrong answers.
                  </p>
                </div>

                <TextareaField
                  label="What are your main concerns?"
                  value={formData.primaryConcerns}
                  onChange={(v) => updateField("primaryConcerns", v)}
                  error={errors.primaryConcerns}
                  placeholder="e.g. Struggling with maths confidence, homework battles, falling behind in class..."
                  rows={4}
                  required
                />

                <TextareaField
                  label="What are your learning goals?"
                  value={formData.learningGoals}
                  onChange={(v) => updateField("learningGoals", v)}
                  placeholder="e.g. Improve grades, build confidence, prepare for high school, catch up on missed content..."
                  rows={4}
                />

                <TextareaField
                  label="What would success look like for your child?"
                  value={formData.successLooksLike}
                  onChange={(v) => updateField("successLooksLike", v)}
                  placeholder="e.g. Feeling confident in class, completing homework independently, enjoying learning again..."
                  rows={4}
                />
              </div>
            )}

            {/* Step 5: Scheduling & Submit */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#3F3A52]">Scheduling Preferences</h2>
                  <p className="mt-2 text-[#6B647F]">
                    Let us know your availability so we can find a time that works.
                  </p>
                </div>

                <CheckboxGroup
                  label="Preferred Days"
                  options={DAYS}
                  selected={formData.preferredDays}
                  onChange={(v) => toggleArrayField("preferredDays", v)}
                  error={errors.preferredDays}
                  columns={4}
                  required
                />

                <CheckboxGroup
                  label="Preferred Times"
                  options={TIME_SLOTS}
                  selected={formData.preferredTimes}
                  onChange={(v) => toggleArrayField("preferredTimes", v)}
                  error={errors.preferredTimes}
                  columns={2}
                  required
                />

                <RadioGroup
                  label="Session Format Preference"
                  options={SESSION_FORMATS}
                  value={formData.sessionFormat}
                  onChange={(v) => updateField("sessionFormat", v)}
                />

                <TextareaField
                  label="Anything else we should know?"
                  value={formData.additionalInfo}
                  onChange={(v) => updateField("additionalInfo", v)}
                  placeholder="Any other information that might help us prepare for our conversation..."
                  rows={4}
                />

                {/* Privacy agreement */}
                <div className="rounded-2xl border border-[#E6E1F2] bg-[#F7F5FB] p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToPrivacy}
                      onChange={(e) => updateField("agreeToPrivacy", e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-[#D9CFF2] text-[#5E5574] focus:ring-[#5E5574] focus:ring-offset-0"
                    />
                    <div>
                      <span className="text-sm text-[#3F3A52]">
                        I agree to the{" "}
                        <Link href="/privacy" className="text-[#5E5574] underline hover:no-underline">
                          Privacy Policy
                        </Link>{" "}
                        and consent to Kite & Key Academy collecting and storing this information 
                        to facilitate the consultation process.
                      </span>
                      {errors.agreeToPrivacy && (
                        <p className="mt-1 text-sm text-red-500">{errors.agreeToPrivacy}</p>
                      )}
                    </div>
                  </label>
                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-[#E6E1F2] bg-white p-6">
                  <h3 className="font-semibold text-[#3F3A52] mb-4">Consultation Summary</h3>
                  <div className="grid gap-4 sm:grid-cols-2 text-sm">
                    <div>
                      <span className="text-[#8C84A8]">Parent/Guardian:</span>
                      <p className="text-[#3F3A52] font-medium">
                        {formData.parentFirstName} {formData.parentLastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#8C84A8]">Student:</span>
                      <p className="text-[#3F3A52] font-medium">
                        {formData.studentFirstName} {formData.studentLastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#8C84A8]">Year Level:</span>
                      <p className="text-[#3F3A52] font-medium">{formData.yearLevel}</p>
                    </div>
                    <div>
                      <span className="text-[#8C84A8]">Subjects:</span>
                      <p className="text-[#3F3A52] font-medium">{formData.subjects.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-[#E6E1F2]">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="rounded-xl border border-[#D9CFF2] bg-white px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:bg-[#F7F5FB]"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="rounded-xl bg-[#5E5574] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#5E5574] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
            {[
              { icon: "🔒", text: "Secure & confidential" },
              { icon: "⏱️", text: "Takes 5 minutes" },
              { icon: "💬", text: "No obligation" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-[#8C84A8]">
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================
   Form Components
========================= */

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#3F3A52] mb-2">
        {label}
        {required && <span className="text-[#5E5574] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-[#3F3A52] placeholder-[#B8B3C7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-[#E6E1F2] focus:border-[#5E5574]"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#3F3A52] mb-2">
        {label}
        {required && <span className="text-[#5E5574] ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border px-4 py-3 text-[#3F3A52] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 appearance-none bg-white ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-[#E6E1F2] focus:border-[#5E5574]"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B647F' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.75rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#3F3A52] mb-2">
        {label}
        {required && <span className="text-[#5E5574] ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-xl border px-4 py-3 text-[#3F3A52] placeholder-[#B8B3C7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 resize-none ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-[#E6E1F2] focus:border-[#5E5574]"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function CheckboxGroup({
  label,
  description,
  options,
  selected,
  onChange,
  columns = 1,
  error,
  required,
}: {
  label: string;
  description?: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  columns?: number;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#3F3A52] mb-1">
        {label}
        {required && <span className="text-[#5E5574] ml-1">*</span>}
      </label>
      {description && (
        <p className="text-sm text-[#8C84A8] mb-3">{description}</p>
      )}
      <div
        className={`grid gap-3 ${
          columns === 4
            ? "grid-cols-2 sm:grid-cols-4"
            : columns === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
              selected.includes(option)
                ? "border-[#5E5574] bg-[#F7F5FB]"
                : "border-[#E6E1F2] hover:border-[#D9CFF2] hover:bg-[#FAFAFA]"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
              className="h-4 w-4 rounded border-[#D9CFF2] text-[#5E5574] focus:ring-[#5E5574] focus:ring-offset-0"
            />
            <span className="text-sm text-[#3F3A52]">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#3F3A52] mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 cursor-pointer transition-all ${
              value === option
                ? "border-[#5E5574] bg-[#F7F5FB]"
                : "border-[#E6E1F2] hover:border-[#D9CFF2]"
            }`}
          >
            <input
              type="radio"
              checked={value === option}
              onChange={() => onChange(option)}
              className="h-4 w-4 border-[#D9CFF2] text-[#5E5574] focus:ring-[#5E5574] focus:ring-offset-0"
            />
            <span className="text-sm text-[#3F3A52]">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
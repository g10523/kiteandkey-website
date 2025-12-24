"use client";

import { useState } from "react";
import Container from "../../components/Container";
import ButtonLink from "../../components/ButtonLink";
import EnrolmentCapacity from "../..//components/EnrolmentCapacity";


export default function EnrolPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="pt-32">
      {/* ================= HERO ================= */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-[#3F3A52] md:text-5xl">
              Enrol with clarity — not pressure.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[#6B647F]">
              This enrolment helps us understand your child and recommend the
              right structure. You’re not committing to anything yet.
            </p>

            {/* Trust cue */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/70 px-5 py-2 text-sm text-[#5E5574] backdrop-blur">
              Takes ~3 minutes · No payment required
            </div>
            
            <EnrolmentCapacity />
          </div>
        </Container>
      </section>

      {/* ================= FORM ================= */}
      <section className="pb-32">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#D9CFF2] bg-white/80 p-10 backdrop-blur-xl shadow-[0_30px_80px_rgba(94,85,116,0.12)]">
            {/* Progress */}
            <Progress step={step} />

            {/* Step content */}
            {step === 1 && <StepOne onNext={() => setStep(2)} />}
            {step === 2 && <StepTwo onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <StepThree onBack={() => setStep(2)} />}
          </div>
        </Container>
      </section>
    </main>
  );
}

/* ================= PROGRESS ================= */

function Progress({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex justify-between text-xs text-[#8C84A8]">
        <span>Student</span>
        <span>Support</span>
        <span>Next steps</span>
      </div>

      <div className="mt-3 h-1.5 w-full rounded-full bg-[#E6E1F2]">
        <div
          className="h-full rounded-full bg-[#5E5574] transition-all"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ================= STEP 1 ================= */

function StepOne({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <SectionTitle
        title="Tell us about your child"
        subtitle="This helps us match teaching pace and structure."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Input label="Parent / Guardian name" placeholder="Jane Smith" />
        <Input label="Email address" type="email" placeholder="jane@email.com" />
        <Input label="Child’s name" placeholder="Alex Smith" />
        <Input label="Year level" placeholder="Year 7" />
      </div>

      <div className="flex justify-end pt-6">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </div>
  );
}

/* ================= STEP 2 ================= */

function StepTwo({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8">
      <SectionTitle
        title="Learning needs & goals"
        subtitle="There are no right answers — just context."
      />

      <div className="space-y-6">
        <CheckboxGroup
          label="Subjects"
          options={["Maths", "English", "Science"]}
        />

        <Textarea
          label="What are you hoping tutoring will help with?"
          placeholder="Confidence, exam preparation, keeping up in class…"
        />

        <Textarea
          label="Anything we should be aware of?"
          placeholder="Learning difficulties, school context, past tutoring…"
        />
      </div>

      <div className="flex justify-between pt-6">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </div>
  );
}

/* ================= STEP 3 ================= */

function StepThree({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-8 text-center">
      <SectionTitle
        title="What happens next"
        subtitle="We’ll guide you from here."
        center
      />

      <div className="mx-auto max-w-xl space-y-4 text-[#6B647F]">
        <p>
          Once submitted, we’ll review your enrolment and recommend a suitable
          structure.
        </p>
        <p>
          You’ll then be invited to book a calm, no-pressure consultation.
        </p>
      </div>

      <div className="flex justify-between pt-8">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <ButtonLink href="/consultation">Submit & book consultation</ButtonLink>
      </div>

      {/* Reassurance */}
      <div className="pt-6 text-xs text-[#8C84A8]">
        No payment · No obligation · You remain in control
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function SectionTitle({
  title,
  subtitle,
  center,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-2xl font-semibold text-[#3F3A52]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[#6B647F]">{subtitle}</p>
      )}
    </div>
  );
}

function Input({
  label,
  ...props
}: {
  label: string;
  [key: string]: any;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#5E5574]">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-[#D9CFF2] bg-white px-4 py-3 text-sm text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#D9CFF2]"
      />
    </label>
  );
}

function Textarea({
  label,
  ...props
}: {
  label: string;
  [key: string]: any;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#5E5574]">
        {label}
      </span>
      <textarea
        {...props}
        rows={4}
        className="w-full rounded-xl border border-[#D9CFF2] bg-white px-4 py-3 text-sm text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#D9CFF2]"
      />
    </label>
  );
}

function CheckboxGroup({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <div className="mb-3 text-sm text-[#5E5574]">{label}</div>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => (
          <label
            key={o}
            className="flex items-center gap-2 rounded-full border border-[#D9CFF2] px-4 py-2 text-sm text-[#5E5574]"
          >
            <input type="checkbox" />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <button
      {...props}
      className="rounded-xl bg-[#5E5574] px-6 py-3 text-sm font-medium text-white hover:bg-[#4F4865] transition"
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <button
      {...props}
      className="rounded-xl border border-[#D9CFF2] bg-white px-6 py-3 text-sm text-[#5E5574] hover:bg-[#F4F1FB] transition"
    >
      {children}
    </button>
  );
}

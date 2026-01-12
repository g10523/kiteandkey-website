# Progressive Enrolment System - Implementation Progress

## ✅ **Phase 1: COMPLETED** - Database & Validation Foundation

### What We Built:

#### 1. **New Database Schema** (`prisma/schema.prisma`)
- ✅ Added `Enrolment` model with progressive status flow
- ✅ Added `EnrolmentStudent` model for multi-student support
- ✅ Created enums: `EnrolmentStatus`, `EnrolmentStage`, `LearningPackage`
- ✅ Maintained backward compatibility with existing `Lead`/`Consultation`/`Signup` tables
- ✅ Deployed to Supabase successfully

**Key Features:**
- Unified record per family (not per student)
- Structured goal arrays (3 groups, max 3 each)
- Continuation token system for post-consultation sign-up
- Package configuration with hour allocation tracking
- Pricing snapshots

#### 2. **Shared Validation Schemas** (`lib/enrolment-schemas.ts`)
- ✅ Defined 30 goal options across 3 categories (10 each)
- ✅ Created `TierASchema` (consultation fields)
- ✅ Created `TierBSchema` (sign-up only fields)
- ✅ Built package validation logic with allocation rules
- ✅ Helper functions for valid allocation options

**Goal Categories:**
1. **Academic Performance Goals** (10 options)
2. **Learning & Study Skills** (10 options)
3. **Personal & Social Development** (10 options)

**Package Rules Enforced:**
- ELEVATE: 1 subject, 1 hour
- GLIDE: 1-2 subjects, 2 hours, allocations: [2] or [1,1]
- SOAR: 1-3 subjects, 3 hours, allocations: [3], [1.5,1.5], [2,1], [1,1,1]

---

## 🚧 **Next Steps: Phase 2-5**

### Phase 2: Refactor Consultation Form
**Files to modify:**
- `app/consultation/ConsultationForm.tsx`
- `app/consultation/actions.ts`

**Changes:**
- Replace current form with new Tier A fields
- Add 3 goal checkbox groups (max 3 each)
- Support multiple students (1-4)
- Save to new `Enrolment` table
- Update status to `CONSULTATION_SCHEDULED`

### Phase 3: Refactor Sign-Up Form
**Files to modify:**
- `app/enrol/page.tsx`
- `app/enrol/actions.ts`

**Changes:**
- Add token detection (`?token=xyz`)
- Pre-fill Tier A fields (read-only with edit option)
- Build package configurator component
- Add student email requirement
- Add password/terms fields
- Update to use `Enrolment` table

### Phase 4: Build Package Configurator Component
**New file:**
- `components/PackageConfigurator.tsx`

**Features:**
- Visual package selection (Elevate/Glide/Soar)
- Subject checkboxes (enforces package limits)
- Hour allocation radio cards (shows only valid options)
- Live pricing display
- Per-student configuration

### Phase 5: Admin CRM Enhancements
**Files to modify:**
- `app/admin/(dashboard)/leads/page.tsx`
- `app/admin/(dashboard)/leads/actions.ts`

**New features:**
- View unified enrolment records
- Generate continuation token/link
- Status pipeline visualization
- Filters (package, subject, grade, status)
- Export to CSV

---

## 📊 **Current System State**

### Database:
- ✅ New tables created and deployed
- ✅ Old tables preserved (backward compatible)
- ✅ Prisma Client regenerated

### Code:
- ✅ Validation schemas ready
- ⏳ Forms still using old system
- ⏳ Admin still showing old Lead table

### Next Action:
**Refactor Consultation Form** to use new `Enrolment` model

---

## 🎯 **Success Criteria**

When complete, the system will:
1. ✅ Capture identical fields in both forms (no duplication)
2. ✅ Support 1-4 students per enrolment
3. ✅ Enforce goal limits (max 3 per group)
4. ✅ Enforce package rules strictly
5. ✅ Enable seamless consultation → sign-up flow
6. ✅ Provide admin visibility into full pipeline
7. ✅ Allow direct sign-up (skip consultation)

---

**Estimated Remaining Time:** 2-3 hours
**Current Progress:** ~25% complete

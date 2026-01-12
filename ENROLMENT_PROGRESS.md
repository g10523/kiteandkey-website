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

## ✅ **Phase 2: COMPLETED** - Consultation Form Refactor

### What We Built:

#### 1. **New Consultation Form** (`ConsultationFormV2.tsx`)
- ✅ Multi-student support (1-4 students)
- ✅ Three goal checkbox groups (max 3 each)
- ✅ Parent/guardian details (Tier A)
- ✅ Student information per child
- ✅ Time slot selection
- ✅ Privacy consent
- ✅ 4-step wizard with progress indicator

#### 2. **Server Actions** (`actions-v2.ts`)
- ✅ `submitConsultationV2()` - Creates Enrolment record
- ✅ `getAvailableSlotsV2()` - Fetches available slots
- ✅ Email notifications with all 3 goal categories
- ✅ Zod validation integration

#### 3. **Reusable Components**
- ✅ `GoalCheckboxGroup` - Visual goal selector with limits
- ✅ Input/Select field helpers

**Key Features:**
- Saves to new `Enrolment` table (not old `Lead`)
- Status set to `CONSULTATION_SCHEDULED` when slot selected
- Creates multiple `EnrolmentStudent` records
- Structured goal arrays (no free-form text)

---

## 🚧 **Next Steps: Phase 3-5**

### Phase 3: Refactor Sign-Up Form
**Status:** Not Started
**Estimated Time:** 1.5 hours

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
**Status:** Not Started
**Estimated Time:** 45 minutes

**New file:**
- `components/PackageConfigurator.tsx`

**Features:**
- Visual package selection (Elevate/Glide/Soar)
- Subject checkboxes (enforces package limits)
- Hour allocation radio cards (shows only valid options)
- Live pricing display
- Per-student configuration

### Phase 5: Admin CRM Enhancements
**Status:** Not Started
**Estimated Time:** 1 hour

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
- ✅ Consultation form using new system
- ⏳ Sign-up form still using old system
- ⏳ Admin still showing old Lead table

### Next Action:
**Refactor Sign-Up Form** to use new `Enrolment` model with token pre-fill

---

## 🎯 **Success Criteria**

When complete, the system will:
1. ✅ Capture identical fields in both forms (no duplication)
2. ✅ Support 1-4 students per enrolment
3. ✅ Enforce goal limits (max 3 per group)
4. ⏳ Enforce package rules strictly
5. ⏳ Enable seamless consultation → sign-up flow
6. ⏳ Provide admin visibility into full pipeline
7. ⏳ Allow direct sign-up (skip consultation)

---

**Estimated Remaining Time:** 3-4 hours
**Current Progress:** ~50% complete

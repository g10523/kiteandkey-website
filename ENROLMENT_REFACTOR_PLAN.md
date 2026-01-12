# Kite & Key - Progressive Enrolment System Refactor

## Executive Summary
Refactoring consultation and sign-up forms into a unified progressive enrolment pipeline with shared data model, preventing duplication and ensuring seamless continuation flow.

---

## 1. GOAL GROUPS (Tier A - Both Forms)

### Academic Performance Goals (Max 3)
- [ ] Improve overall grades
- [ ] Build confidence in specific subjects
- [ ] Prepare for upcoming exams
- [ ] Catch up on missed content
- [ ] Get ahead of the curriculum
- [ ] Develop critical thinking skills
- [ ] Master essay writing
- [ ] Improve problem-solving abilities
- [ ] Strengthen foundational knowledge
- [ ] Achieve specific grade targets

### Learning & Study Skills (Max 3)
- [ ] Develop effective study habits
- [ ] Improve time management
- [ ] Build organizational skills
- [ ] Enhance focus and concentration
- [ ] Learn note-taking strategies
- [ ] Master exam techniques
- [ ] Reduce procrastination
- [ ] Build independent learning skills
- [ ] Improve homework completion
- [ ] Create sustainable routines

### Personal & Social Development (Max 3)
- [ ] Reduce academic anxiety
- [ ] Build self-confidence
- [ ] Increase motivation
- [ ] Improve resilience
- [ ] Develop growth mindset
- [ ] Enhance communication skills
- [ ] Build peer relationships
- [ ] Manage school-related stress
- [ ] Foster love of learning
- [ ] Prepare for high school transition

---

## 2. DATA MODEL ARCHITECTURE

### Core Principle
**One Enrolment Record** with progressive completion stages.

### Database Schema Changes

#### New `Enrolment` Table (replaces fragmented Lead/Consultation/Signup)
```prisma
model Enrolment {
  id                String   @id @default(cuid())
  
  // Status Flow
  status            EnrolmentStatus @default(CONSULTATION_REQUESTED)
  stage             EnrolmentStage  @default(CONSULTATION)
  
  // Parent/Guardian (Tier A - captured in both)
  parentFirstName   String
  parentLastName    String
  parentEmail       String   @unique
  parentPhone       String
  
  // Discovery (Tier A)
  howDidYouHear     String?
  
  // Goals (Tier A - structured JSON)
  academicGoals     String[] // Max 3
  learningGoals     String[] // Max 3
  personalGoals     String[] // Max 3
  
  // Students (Tier A for consultation, expanded in sign-up)
  students          EnrolmentStudent[]
  
  // Consultation Details
  consultationId    String?  @unique
  consultation      Consultation?
  
  // Sign-Up Details (Tier B)
  password          String?  // Hashed, only for sign-up
  termsAccepted     Boolean  @default(false)
  
  // Continuation Token
  continuationToken String?  @unique
  tokenUsed         Boolean  @default(false)
  tokenExpiresAt    DateTime?
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

enum EnrolmentStatus {
  CONSULTATION_REQUESTED
  CONSULTATION_SCHEDULED
  CONSULTATION_COMPLETED
  PENDING_SIGNUP
  SIGNUP_STARTED
  SIGNUP_COMPLETED
  ENROLLED
  CANCELLED
}

enum EnrolmentStage {
  CONSULTATION
  SIGNUP
  ACTIVE
}

model EnrolmentStudent {
  id              String   @id @default(cuid())
  enrolmentId     String
  enrolment       Enrolment @relation(fields: [enrolmentId], references: [id], onDelete: Cascade)
  
  // Tier A (Both forms)
  firstName       String
  lastName        String
  gradeIn2026     String   // "Year 5", "Year 6", etc.
  school          String?
  
  // Tier B (Sign-up only)
  email           String?  // Required for sign-up
  
  // Package Configuration (Sign-up only)
  package         LearningPackage?
  subjects        String[] // ["Maths", "English"]
  weeklyHours     Float?   // Total hours
  hourAllocation  Json?    // {Maths: 1, English: 1}
  
  // Pricing Snapshot
  hourlyRate      Float?
  weeklyTotal     Float?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum LearningPackage {
  ELEVATE
  GLIDE
  SOAR
}
```

---

## 3. FORM SPECIFICATIONS

### Consultation Form (Tier A Only)

**Steps:**
1. **Parent Details**
   - First Name, Last Name
   - Email, Phone
   - How did you hear about us?

2. **Student Information**
   - Number of students (1-4)
   - For each: First Name, Last Name, Grade in 2026, School

3. **Goals** (3 groups, max 3 each)
   - Academic Performance Goals
   - Learning & Study Skills
   - Personal & Social Development

4. **Schedule Consultation**
   - Select available time slot
   - Privacy consent

**Outcome:** Creates `Enrolment` with status `CONSULTATION_SCHEDULED`

---

### Sign-Up Form (Tier A + Tier B)

**Pre-fill Logic:**
- If `?token=xyz` exists → fetch Enrolment → pre-fill Tier A fields (read-only with "Edit" button)
- If no token → blank form

**Steps:**
1. **Parent Details** (Tier A - prefilled if token)
   - Same as consultation

2. **Student Information** (Tier A - prefilled if token)
   - Same as consultation
   - PLUS: Student Email (required)

3. **Goals** (Tier A - prefilled if token)
   - Same 3 groups

4. **Package Configuration** (Tier B - NEW)
   - For each student:
     - Select Package (Elevate/Glide/Soar)
     - Select Subjects (based on package limits)
     - Choose Hour Allocation (radio cards with valid options only)
     - Live pricing display

5. **Account Setup** (Tier B - NEW)
   - Password, Confirm Password
   - Terms & Privacy acceptance

**Outcome:** Updates `Enrolment` with status `SIGNUP_COMPLETED`, creates User accounts

---

## 4. PACKAGE ALLOCATION CONFIGURATOR

### Visual Design (Per Student Card)

```
┌─────────────────────────────────────┐
│ Student: Alex Smith (Year 7)        │
├─────────────────────────────────────┤
│ SELECT PACKAGE:                     │
│ ○ Elevate  ● Glide  ○ Soar         │
├─────────────────────────────────────┤
│ SELECT SUBJECTS (Max 2):            │
│ ☑ Maths  ☑ English  ☐ Science      │
├─────────────────────────────────────┤
│ HOUR ALLOCATION (2 hrs/week):       │
│ ○ 1 hr Maths + 1 hr English         │
│ ○ 2 hrs Maths only                  │
│ ○ 2 hrs English only                │
├─────────────────────────────────────┤
│ PRICING:                            │
│ $70/hr × 2 hrs = $140/week          │
└─────────────────────────────────────┘
```

### Validation Rules (Enforced client + server)
- **Elevate:** 1 subject, 1 hour total, allocation: [1]
- **Glide:** 1-2 subjects, 2 hours total, allocations: [2] or [1,1]
- **Soar:** 1-3 subjects, 3 hours total, allocations: [3], [1.5,1.5], [2,1], [1,1,1]

---

## 5. CONTINUATION TOKEN SYSTEM

### Admin Action: "Generate Enrolment Link"
```typescript
// In Admin CRM
async function generateContinuationLink(enrolmentId: string) {
  const token = generateSecureToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  
  await prisma.enrolment.update({
    where: { id: enrolmentId },
    data: {
      continuationToken: token,
      tokenExpiresAt: expiresAt,
      status: 'PENDING_SIGNUP'
    }
  })
  
  return `https://kiteandkey.com.au/sign-up?token=${token}`
}
```

### Sign-Up Page Token Handler
```typescript
// On page load
if (token) {
  const enrolment = await prisma.enrolment.findUnique({
    where: { continuationToken: token },
    include: { students: true }
  })
  
  if (enrolment && !enrolment.tokenUsed && enrolment.tokenExpiresAt > new Date()) {
    // Pre-fill form with read-only Tier A fields
    // Show "Edit" button to unlock if needed
    setFormData(enrolment)
    setIsTokenFlow(true)
  }
}
```

---

## 6. ADMIN CRM ENHANCEMENTS

### Unified Enrolment View

**Status Pipeline:**
```
CONSULTATION_REQUESTED → CONSULTATION_SCHEDULED → CONSULTATION_COMPLETED
  ↓
PENDING_SIGNUP → SIGNUP_STARTED → SIGNUP_COMPLETED → ENROLLED
```

**Admin Actions:**
- View full enrolment details
- Generate continuation link (if status = CONSULTATION_COMPLETED)
- Manually mark as enrolled
- Export to CSV

**Filters:**
- Status
- Package (Elevate/Glide/Soar)
- Subject (Maths/English/Science)
- Grade
- School
- Date range

---

## 7. IMPLEMENTATION PHASES

### Phase 1: Database Migration
- Create new `Enrolment` and `EnrolmentStudent` tables
- Migrate existing `Lead` data to new structure
- Keep old tables for backward compatibility (deprecated)

### Phase 2: Shared Schema (Zod)
- Create `TierASchema` (consultation fields)
- Create `TierBSchema` (sign-up only fields)
- Create `SignUpSchema = TierASchema.merge(TierBSchema)`

### Phase 3: Refactor Consultation Form
- Update to use new goal checkboxes
- Support multiple students
- Save to `Enrolment` table

### Phase 4: Refactor Sign-Up Form
- Add token detection
- Build package configurator
- Implement pre-fill logic

### Phase 5: Admin CRM Updates
- Add continuation link generator
- Update enrolment list view
- Add filters and export

---

## 8. VALIDATION MATRIX

| Field | Consultation | Sign-Up | Validation |
|-------|-------------|---------|------------|
| Parent First/Last Name | Required | Required | Min 2 chars |
| Parent Email | Required | Required | Valid email |
| Parent Phone | Required | Required | Valid format |
| Student First/Last Name | Required | Required | Min 2 chars |
| Student Grade | Required | Required | Year 5-10 |
| Student School | Optional | Optional | - |
| Student Email | - | Required | Valid email |
| Goals (each group) | Max 3 | Max 3 | Array length ≤ 3 |
| Package | - | Required | Enum |
| Subjects | - | Required | Based on package |
| Hour Allocation | - | Required | Valid for package |
| Password | - | Required | Min 8 chars |
| Terms Accepted | - | Required | Must be true |

---

## NEXT STEPS

1. Review and approve this plan
2. Begin Phase 1: Database migration
3. Build shared validation schemas
4. Refactor forms incrementally
5. Test continuation flow
6. Deploy to production

**Estimated Timeline:** 3-4 hours of focused development

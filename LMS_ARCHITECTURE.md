# Kite & Key Academy – MindPrint LMS Architecture

## 1. System Overview
**Objective:** A proprietary, multi-role Learning Management System (LMS) powered by the **MindPrint™ Cognitive Framework**.
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma (PostgreSQL), NextAuth.js.

---

## 2. User Roles & Permissions
We utilize a **Role-Based Access Control (RBAC)** model.

| Role | Dashboard Route | Key Permissions |
| :--- | :--- | :--- |
| **STUDENT** | `/dashboard/student` | View lessons, View MindPrint (Read-only), Assignments, Study Plan. |
| **PARENT** | `/dashboard/parent` | View Child Progress, Billing, Messages, MindPrint Summaries. |
| **TUTOR** | `/dashboard/tutor` | Manage Schedule, Lesson Notes, Full MindPrint Access, Student Progress. |
| **ADMIN** | `/admin` | User Management, System Config, Financials, Global Analytics. |

---

## 3. Database Schema (Prisma)

### Core Users
```prisma
enum UserRole {
  STUDENT
  PARENT
  TUTOR
  ADMIN
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // Hashed
  name          String?
  role          UserRole  @default(STUDENT)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Profile Relations (One-to-One)
  studentProfile StudentProfile?
  parentProfile  ParentProfile?
  tutorProfile   TutorProfile?
}
```

### Profiles
```prisma
model StudentProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  
  parentId        String?
  parent          ParentProfile? @relation(fields: [parentId], references: [id])
  
  gradeLevel      String
  school          String?
  
  // Relations
  mindPrint       MindPrintProfile?
  enrollments     Enrollment[]
  assignments     Assignment[]
  attendance      Attendance[]
}

model ParentProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  phone           String?
  stripeCustomerId String?
  
  students        StudentProfile[]
}

model TutorProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  
  bio             String?
  subjects        String[] // ["Maths", "English"]
  availability    AvailabilitySlot[]
  
  classes         ClassSession[]
}
```

### MindPrint™ Engine
```prisma
model MindPrintProfile {
  id              String   @id @default(cuid())
  studentId       String   @unique
  student         StudentProfile @relation(fields: [studentId], references: [id])
  
  // Cognitive Scores (0-100)
  workingMemory   Int
  processingSpeed Int
  verbalReasoning Int
  abstractReasoning Int
  attention       Int
  
  // Analysis (JSON for flexibility)
  learningStyle   Json     // e.g. { primary: "Visual", secondary: "Kinesthetic" }
  strengths       String[]
  weaknesses      String[]
  strategies      String[] // Specific teaching strategies derived from scores

  lastAssessedAt  DateTime @default(now())
  version         Int      @default(1)
}
```

### Learning & Scheduling
```prisma
model ClassSession {
  id              String   @id @default(cuid())
  tutorId         String
  tutor           TutorProfile @relation(fields: [tutorId], references: [id])
  
  startTime       DateTime
  endTime         DateTime
  subject         String
  status          String   @default("SCHEDULED") // SCHEDULED, COMPLETED, CANCELLED
  
  attendances     Attendance[]
  notes           String?  // Tutor session notes
}

model Attendance {
  id              String   @id @default(cuid())
  sessionId       String
  session         ClassSession @relation(fields: [sessionId], references: [id])
  
  studentId       String
  student         StudentProfile @relation(fields: [studentId], references: [id])
  
  status          String   @default("PRESENT") // PRESENT, ABSENT, LATE
  feedback        String?  // Feedback for parent/student
}
```

---

## 4. API & Route Structure

```
/app
  /(auth)
    /login
    /register
  /(dashboard)
    layout.tsx (Auth Guard)
    /student
      /page.tsx (Overview)
      /mindprint/page.tsx
      /schedule/page.tsx
    /parent
      /page.tsx
      /billing/page.tsx
    /tutor
      /page.tsx
      /students/[id]/page.tsx (View MindPrint)
  /api
    /mindprint (Calculation Engine)
    /schedule (Google Calendar Sync)
    /webhooks/stripe
```

---

## 5. MindPrint™ Data Model (JSON Structure)

The `learningStyle` JSON field in `MindPrintProfile` will follow this schema:

```json
{
  "archetype": "Visual Synthesizer",
  "modalities": {
    "visual": 85,
    "auditory": 40,
    "kinesthetic": 60
  },
  "frictionPoints": [
    "Long verbal instructions",
    "Timed pressure tasks"
  ],
  "recommendedInterventions": [
    "Use diagrammatic breakdowns",
    "Allow 10% extra time for processing"
  ]
}
```

---

## 6. Implementation Stages

1.  **Foundation**: Update Prisma Schema & Run Migrations.
2.  **Auth**: Configure NextAuth for Role handling.
3.  **Layouts**: Create role-specific dashboard shells.
4.  **MindPrint**: Build the core calculation service.
5.  **Scheduling**: Integrate Booking system with Tutors/Students.

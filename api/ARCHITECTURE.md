# Kite & Key Academy - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│  │  AuthContext │  │ DataContext  │  │  Components/Pages   │  │
│  │   (JWT Auth) │  │ (API Calls)  │  │  (Student/Tutor/    │  │
│  │              │  │              │  │   Admin Dashboards) │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬──────────┘  │
│         │                  │                     │              │
│         └──────────────────┼─────────────────────┘              │
│                            │                                    │
│                   Axios HTTP Client                             │
└────────────────────────────┼────────────────────────────────────┘
                             │
                    HTTPS (localhost:3000/api)
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                       BACKEND (Express)                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Middleware Stack                       │  │
│  │  • Helmet (Security Headers)                            │  │
│  │  • CORS (Origin Validation)                             │  │
│  │  • Rate Limiting (100 req/15min, 5 for auth)           │  │
│  │  • JWT Validation (authenticate middleware)             │  │
│  │  • Role Authorization (authorize middleware)            │  │
│  │  • Input Validation (Joi schemas)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                    │
│  ┌────────────┬─────────────┴──────────────┬────────────────┐  │
│  │   /auth    │      /admin                 │   /api/*       │  │
│  │  Routes    │      Routes                 │   (Future)     │  │
│  └─────┬──────┴──────┬──────────────────────┴──────┬─────────┘  │
│        │             │                              │            │
│  ┌─────▼──────┐┌────▼─────────┐           ┌────────▼────────┐  │
│  │   Auth     ││    Admin      │           │  Assessment/    │  │
│  │ Controller ││  Controller   │           │  Intervention   │  │
│  │            ││               │           │  (TBD)          │  │
│  │ • register ││ • getUsers    │           └─────────────────┘  │
│  │ • login    ││ • createUser  │                                │
│  │ • refresh  ││ • createToken │                                │
│  │ • logout   ││ • getAnalytics│                                │
│  └─────┬──────┘└────┬──────────┘                                │
│        │             │                                           │
│        └─────────────┼───────────────────────────────────────┐  │
│                      │                                       │  │
│             ┌────────▼────────┐                             │  │
│             │  Database (Knex)│                             │  │
│             │   Connection     │                             │  │
│             └────────┬─────────┘                             │  │
└──────────────────────┼───────────────────────────────────────┘
                       │
              PostgreSQL Connection
                       │
┌──────────────────────┼─────────────────────────────────────────┐
│                 DATABASE (PostgreSQL)                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     Core Tables                          │  │
│  │  • users (id, email, role, password_hash, ...)         │  │
│  │  • admin_profiles                                       │  │
│  │  • student_profiles (enrolled_subjects, parent_id, ...) │  │
│  │  • tutor_profiles (subjects_teaching, ...)             │  │
│  │  • parent_profiles (child_ids, ...)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Token Management                        │  │
│  │  • registration_tokens (token_code, role, expires_at)   │  │
│  │  • token_usage_logs (token_id, used_by, ip_address)   │  │
│  │  • token_blacklist (token, expires_at)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Assessment & MindPrint                      │  │
│  │  • assessments (student_id, dimension, raw_scores, ...) │  │
│  │  • mindprint_profiles (archetype, dimension_scores, ...)│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Intervention & Fidelity Tracking              │  │
│  │  • intervention_protocols (title, implementation, ...)  │  │
│  │  • assigned_interventions (student_id, status, ...)     │  │
│  │  • session_logs (fidelity tracking, student response)   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Audit & Security                      │  │
│  │  • audit_logs (user_id, action, entity_type, ...)      │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## 🔄 Authentication Flow

```
┌─────────┐                                    ┌─────────┐
│ Client  │                                    │  Server │
└────┬────┘                                    └────┬────┘
     │                                              │
     │ 1. POST /auth/login                         │
     │    { email, password }                      │
     │─────────────────────────────────────────────>│
     │                                              │
     │                          2. Verify password  │
     │                             (bcrypt.compare) │
     │                                              │
     │             3. Generate JWT tokens           │
     │                (access + refresh)            │
     │                                              │
     │<─────────────────────────────────────────────│
     │    { accessToken, refreshToken (cookie), user }
     │                                              │
     │ 4. Store accessToken in localStorage        │
     │                                              │
     │ 5. Subsequent requests with JWT             │
     │    Authorization: Bearer <accessToken>       │
     │─────────────────────────────────────────────>│
     │                                              │
     │                     6. Verify JWT signature  │
     │                        Check blacklist       │
     │                        Fetch user info       │
     │                                              │
     │<─────────────────────────────────────────────│
     │    { data }                                  │
     │                                              │
     │ 7. Token expired (401)                       │
     │<─────────────────────────────────────────────│
     │                                              │
     │ 8. POST /auth/refresh                        │
     │    (refreshToken from cookie)                │
     │─────────────────────────────────────────────>│
     │                                              │
     │<─────────────────────────────────────────────│
     │    { accessToken }                           │
     │                                              │
     │ 9. Retry original request                    │
     │─────────────────────────────────────────────>│
     │                                              │
     │<─────────────────────────────────────────────│
     │    { data }                                  │
     │                                              │
```

## 📝 Registration Token Flow

```
┌────────┐              ┌────────┐              ┌─────────┐
│ Admin  │              │  API   │              │ Student │
└───┬────┘              └───┬────┘              └────┬────┘
    │                       │                        │
    │ 1. Create Token       │                        │
    │   POST /admin/tokens  │                        │
    │──────────────────────>│                        │
    │                       │                        │
    │<──────────────────────│                        │
    │   K&K-STU-A7B2C3      │                        │
    │                       │                        │
    │ 2. Share token with student (email/in-person) │
    │──────────────────────────────────────────────> │
    │                       │                        │
    │                       │  3. Register           │
    │                       │     POST /auth/register│
    │                       │     { token, email,... }│
    │                       │<───────────────────────│
    │                       │                        │
    │                       │ 4. Validate token:     │
    │                       │    - Not expired       │
    │                       │    - Not exhausted     │
    │                       │    - Is active         │
    │                       │                        │
    │                       │ 5. Create user account │
    │                       │    Create profile      │
    │                       │    Log token usage     │
    │                       │                        │
    │                       │  6. Return JWT tokens  │
    │                       │───────────────────────>│
    │                       │                        │
```

## 💾 Data Flow: Assessment → Intervention

```
┌────────────────────────────────────────────────────────────┐
│                    ASSESSMENT FLOW                         │
└────────────────────────────────────────────────────────────┘
                         │
              1. Tutor administers test
                    POST /assessments
                 {studentId, dimension,
                  rawScores, observations}
                         │
                         ▼
            ┌─────────────────────────┐
            │  Save to assessments    │
            │      table              │
            └────────┬────────────────┘
                     │
          2. Trigger MindPrint calculation
                     │
                     ▼
      ┌──────────────────────────────────┐
      │  Get all assessments for student │
      │  Group by dimension              │
      │  Take most recent per dimension  │
      └────────┬─────────────────────────┘
               │
               ▼
      ┌──────────────────────────────┐
      │ Calculate percentiles         │
      │ Determine archetype          │
      │ Identify development edges   │
      │ (<25th percentile)           │
      └────────┬──────────────────────┘
               │
               ▼
      ┌──────────────────────────────┐
      │ Upsert mindprint_profiles    │
      └────────┬──────────────────────┘
               │
    3. Trigger intervention assignment
               │
               ▼
   ┌─────────────────────────────────────┐
   │  For each development edge:         │
   │    Query intervention_protocols     │
   │    WHERE target_dimension = edge    │
   │    AND percentile IN target_range   │
   │    ORDER BY priority                │
   │    LIMIT 2                          │
   └────────┬───────────────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │ Insert assigned_interventions│
   │   {protocol_id, student_id,  │
   │    status:'active', ...}     │
   └────────┬──────────────────────┘
            │
            ▼
┌────────────────────────────────────┐
│   Student sees interventions in    │
│   Cognitive Gym dashboard          │
└────────────────────────────────────┘
```

## 🔐 Role-Based Access Control (RBAC)

```
┌─────────────────────────────────────────────────────────┐
│                      PERMISSIONS                        │
├─────────┬──────────┬──────────┬──────────┬─────────────┤
│ Resource│ Student  │  Tutor   │  Parent  │   Admin     │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│ Own     │   R      │   R      │    -     │    CRUD     │
│ Profile │          │          │          │             │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│ Other   │   -      │  R (assigned│  R (children)│ CRUD│
│ Profiles│          │   students)│          │             │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│Assessmts│   R      │   CRU    │    R     │    CRUD     │
│ (own/   │  (own)   │ (assigned)│(children)│    (all)    │
│assigned)│          │          │          │             │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│Intervtn │   R,     │  CRUD    │    R     │    CRUD     │
│ (assign)│  Update  │(assigned)│(children)│    (all)    │
│         │(self-    │          │          │             │
│         │reflect)  │          │          │             │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│ Session │   C      │   CRUD   │    R     │    CRUD     │
│  Logs   │(reflect) │(assigned)│(children)│    (all)    │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│  Users  │   -      │    -     │    -     │    CRUD     │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│ Tokens  │   -      │    -     │    -     │     CR      │
├─────────┼──────────┼──────────┼──────────┼─────────────┤
│Analytics│   -      │   R      │    R     │     R       │
│         │          │(assigned)│(children)│    (all)    │
└─────────┴──────────┴──────────┴──────────┴─────────────┘

Legend: C=Create, R=Read, U=Update, D=Delete, -=No Access
```

## 🗂️ File Structure

```
lms/
├── api/                              # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # Knex connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Auth logic
│   │   │   └── adminController.js    # Admin CRUD
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT validation & RBAC
│   │   │   └── validation.js         # Joi schemas
│   │   ├── routes/
│   │   │   ├── auth.js               # /api/auth/*
│   │   │   └── admin.js              # /api/admin/*
│   │   ├── utils/
│   │   │   └── auth.js               # JWT & bcrypt helpers
│   │   ├── migrations/
│   │   │   ├── 20240217000001_create_users.js
│   │   │   ├── 20240217000002_create_tokens.js
│   │   │   ├── 20240217000003_create_assessments.js
│   │   │   ├── 20240217000004_create_interventions.js
│   │   │   └── 20240217000005_create_audit.js
│   │   ├── seeds/
│   │   │   ├── 01_users.js        # Admin, tutor, students
│   │   │   └── 02_interventions.js   # WM protocols
│   │   └── server.js                 # Express app
│   ├── .env                          # Environment config
│   ├── knexfile.js                   # Migration config
│   ├── package.json
│   ├── Dockerfile
│   ├── setup.sh                      # DB init script
│   ├── README.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   └── postman_collection.json
│
├── src/                              # React frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   │   ├── AuthContext.tsx           # → Update to use API
│   │   └── DataContext.tsx           # → Update to use API
│   └── services/
│       └── api.ts                    # → Replace with apiClient
│
├── docker-compose.yml
└── README.md
```

This architecture provides a secure, scalable foundation for the Kite & Key Academy LMS with clear separation of concerns and role-based data access.

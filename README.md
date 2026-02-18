# Kite & Key Academy LMS - Full Stack Application

A production-ready Learning Management System with cognitive assessment, intervention fidelity tracking, and MindPrint profiles.

## 🏗️ Project Structure

```
lms/
├── api/                  # Node.js/Express backend
│   ├── src/
│   │   ├── config/       # Database & environment config
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth, validation, etc.
│   │   ├── models/       # Database models (if using ORM)
│   │   ├── routes/       # API route definitions
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Helper functions
│   │   ├── migrations/   # Database migrations
│   │   └── seeds/        # Initial data
│   ├── package.json
│   ├── knexfile.js
│   ├── Dockerfile
│   └── README.md
│
├── src/                  # React frontend
│   ├── components/       # UI components
│   ├── pages/           # Page components
│   ├── context/         # React Context providers
│   ├── services/        # API client
│   └── ...
│
├── docker-compose.yml   # Docker orchestration
└── README.md           # This file
```

## 🚀 Quick Start (Full Stack)

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 15 (or Docker)
- npm or yarn

### Option 1: Docker (Recommended for Development)

```bash
# Start PostgreSQL and API
docker-compose up -d

# Initialize database (in another terminal)
cd api
npm run migrate
npm run seed

# Start frontend dev server
cd ..
npm run dev
```

Access:
- Frontend: http://localhost:5173
- API: http://localhost:3000
- PostgreSQL: localhost:5432

### Option 2: Local Setup

```bash
# 1. Setup Backend
cd api
npm install
cp .env.example .env

# Edit .env with your database credentials
# Then run:
./setup.sh  # This creates DB, runs migrations, and seeds data

# Start API server
npm run dev

# 2. Setup Frontend (in new terminal)
cd ..
npm install
npm run dev
```

## 📊 Default Accounts

After seeding:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@kiteandkey.academy | Admin@123 |
| Tutor | sarah.chen@kiteandkey.academy | Tutor@123 |
| Student | alex.martinez@student.kk.edu | Student@123 |

## 🎯 Key Features

### Implemented ✅

1. **Authentication & Authorization**
   - JWT-based auth with refresh tokens
   - Role-based access control (Student, Tutor, Parent, Admin)
   - Registration token system for secure signups

2. **User Management**
   - Admin dashboard for user CRUD
   - Token generation for new user registration
   - Role-specific profiles (student/tutor/parent/admin)

3. **Assessment Engine**
   - Cognitive assessments across 8 dimensions
   - Age-normed percentile calculations
   - MindPrint profile generation

4. **Intervention System**
   - Scientifically-backed intervention protocols
   - Auto-assignment based on assessment results
   - Fidelity tracking for session delivery

5. **Session Logging**
   - Tutor-side protocol tracking
   - Student-side reflection capture
   - Fidelity score calculation

6. **Security**
   - Password hashing with bcrypt
   - Rate limiting on all endpoints
   - CORS protection
   - SQL injection prevention
   - JWT blacklisting on logout

### In Progress 🚧

- Assessment & Intervention API endpoints
- Frontend-backend integration
- Email notifications
- Advanced analytics dashboard

## 🔗 API Integration

The backend API is now ready. To integrate with the frontend:

### 1. Update API Client

Edit `src/services/apiClient.ts`:

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  withCredentials: true
});

// Add interceptors for JWT auth...
```

### 2. Update AuthContext

The auth context should now call real API endpoints instead of localStorage.

### 3. Update DataContext

Replace localStorage operations with API calls to:
- GET /api/interventions/assigned
- POST /api/assessments
- GET /api/mindprint/:studentId
- etc.

## 🗄️ Database Schema

Key tables:
- `users` - Main user accounts
- `registration_tokens` - Admin-generated signup tokens
- `assessments` - Cognitive test results
- `mindprint_profiles` - Computed cognitive profiles
- `intervention_protocols` - Master intervention library
- `assigned_interventions` - Student-specific interventions
- `session_logs` - Fidelity tracking data
- `audit_logs` - System audit trail

See `api/README.md` for complete schema documentation.

## 🛠️ Development

### Backend

```bash
cd api
npm run dev          # Start with nodemon
npm run migrate      # Run migrations
npm run seed         # Seed data
npm run db:reset     # Reset & reseed database
```

### Frontend

```bash
npm run dev          # Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
```

## 📝 Environment Variables

### Backend (.env in api/)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kite_and_key_dev
JWT_SECRET=your-secret-key-min-32-chars
FRONTEND_URL=http://localhost:5173
# See api/.env.example for all options
```

### Frontend (.env in root/)

```env
VITE_API_URL=http://localhost:3000/api
```

## 🚢 Deployment

### Backend

Recommended: Railway, Render, or Fly.io

1. Set environment variables
2. Enable DATABASE_SSL=true
3. Run migrations: `npm run migrate`
4. Start: `npm start`

### Frontend

Recommended: Vercel, Netlify

1. Set `VITE_API_URL` to production API
2. Build: `npm run build`
3. Deploy `dist/` folder

### Database

Recommended: Supabase, Railway, Neon

- Must support PostgreSQL 15+
- Enable SSL in production
- Configure backups

## 📚 Documentation

- [Backend API Documentation](./api/README.md)
- [Frontend Development Guide](./README_FRONTEND.md) (TBD)
- [Database Schema](./api/docs/SCHEMA.md) (TBD)

## 🤝 Contributing

1. Create feature branch from `main`
2. Make changes
3. Test locally with `npm run dev`
4. Submit PR with description

## 📄 License

Proprietary - Kite & Key Academy © 2024

---

**Need Help?**

- Backend issues: See `api/README.md`
- Frontend issues: Check browser console
- Database issues: Run `npm run db:reset` in api/
- Auth issues: Clear localStorage and cookies

**Current Status:** Backend infrastructure complete. Frontend integration in progress.

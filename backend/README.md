# Kite & Key Academy API

Production-ready backend infrastructure for the Kite & Key Academy Learning Management System.

## 🏗️ Architecture

- **Framework**: Node.js + Express
- **Database**: PostgreSQL 15
- **Authentication**: JWT with refresh tokens
- **Validation**: Joi schemas
- **Migrations**: Knex.js

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 15 (or use Docker)
- npm or yarn

### Option 1: Docker (Recommended)

```bash
# From project root
docker-compose up -d

# Run migrations and seeds
cd api
npm run migrate
npm run seed
```

### Option 2: Local Setup

```bash
# 1. Install PostgreSQL and create database
createdb kite_and_key_dev

# 2. Install dependencies
cd api
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Run migrations
npm run migrate

# 5. Seed initial data
npm run seed

# 6. Start development server
npm run dev
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "token": "K&K-STU-A7B2C3",
  "email": "student@example.com",
  "password": "SecurePass@123",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2014-03-15",
  "gradeLevel": 10
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@kiteandkey.academy",
  "password": "Admin@123"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUz...",
  "user": {
    "id": "uuid",
    "email": "admin@kiteandkey.academy",
    "role": "admin",
    "firstName": "System",
    "lastName": "Administrator",
    "mindPrintComplete": false
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
Cookie: refreshToken=...

Response:
{
  "accessToken": "eyJhbGciOiJIUz..."
}
```

### Admin Endpoints

All admin endpoints require `Authorization: Bearer <token>` header and admin role.

#### Create Registration Token
```http
POST /admin/tokens
Authorization: Bearer <token>

{
  "role": "student",
  "maxUses": 5,
  "expiresInDays": 30,
  "metadata": {
    "enrolledSubjects": ["Mathematics", "English"]
  }
}

Response:
{
  "tokenCode": "K&K-STU-X9Y2Z1",
  "role": "student",
  "maxUses": 5,
  "expiresAt": "2024-03-17T00:00:00.000Z"
}
```

#### Get All Users
```http
GET /admin/users?role=student&isActive=true&page=1&limit=50
Authorization: Bearer <token>

Response:
{
  "users": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 120
  }
}
```

#### Create User
```http
POST /admin/users
Authorization: Bearer <token>

{
  "email": "newstudent@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "student",
  "gradeLevel": 9,
  "enrolledSubjects": ["Mathematics"]
}
```

## 🗄️ Database Schema

### Core Tables

- **users**: Main user table with role-based inheritance
- **admin_profiles, student_profiles, tutor_profiles, parent_profiles**: Role-specific data
- **registration_tokens**: Admin-generated signup tokens
- **assessments**: Cognitive assessment results
- **mindprint_profiles**: Computed cognitive profiles
- **intervention_protocols**: Master intervention library
- **assigned_interventions**: Student-specific intervention instances
- **session_logs**: Fidelity tracking data
- **audit_logs**: System audit trail

### Indexes

All foreign keys are indexed. Additional composite indexes on frequently queried columns:
- `(student_id, dimension, created_at)` on assessments
- `(student_id, status)` on assigned_interventions
- `(user_id, created_at)` on audit_logs

## 🔐 Security

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 5 attempts per 15 minutes

### Token Management
- Access tokens: 15-minute expiry
- Refresh tokens: 7-day expiry (httpOnly cookies)
- Blacklist on logout

## 📊 Seeded Data

After running `npm run seed`, you'll have:

**Admin Account:**
- Email: `admin@kiteandkey.academy`
- Password: `Admin@123`

**Tutor Account:**
- Email: `sarah.chen@kiteandkey.academy`
- Password: `Tutor@123`

**Student Account:**
- Email: `alex.martinez@student.kk.edu`
- Password: `Student@123`

**Intervention Protocols:**
- 4 Working Memory interventions (Critical & Enhancement levels)

## 🛠️ Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Run seeds
npm run seed

# Reset database (rollback + migrate + seed)
npm run db:reset
```

## 🧪 Testing

```bash
# Test database connection
node -e "require('./src/config/database')('users').first().then(u => console.log('✅ DB Connected'))"

# Test health endpoint
curl http://localhost:3000/api/health
```

## 🌐 Environment Variables

See `.env.example` for all required and optional environment variables.

Critical variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: **MUST** be changed in production (min 32 chars)
- `FRONTEND_URL`: For CORS configuration
- `BCRYPT_ROUNDS`: Password hashing difficulty (default: 12)

## 📦 Deployment

### Production Checklist

1. ✅ Change `JWT_SECRET` to secure random string
2. ✅ Set `NODE_ENV=production`
3. ✅ Enable `DATABASE_SSL=true`
4. ✅ Configure email service (SMTP)
5. ✅ Set secure `FRONTEND_URL`
6. ✅ Review rate limits for production traffic
7. ✅ Enable database backups
8. ✅ Set up monitoring (Sentry, LogRocket)

### Recommended Platforms

- **API**: Railway, Render, Fly.io
- **Database**: Supabase, Railway, Neon
- **Monitoring**: Sentry for errors, LogRocket for session replay

## 🤝 Contributing

This API follows RESTful conventions. When adding new endpoints:

1. Create controller in `src/controllers/`
2. Add routes in `src/routes/`
3. Implement validation schemas in `src/middleware/validation.js`
4. Update this README with endpoint documentation

## 📝 License

Proprietary - Kite & Key Academy © 2024

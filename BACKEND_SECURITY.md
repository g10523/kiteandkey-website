# 🔐 Kite & Key Academy — Backend Security Documentation

## Overview

The LMS backend has been secured with a multi-layered security architecture. This document covers every layer, the 7 pre-seeded accounts, and the security key system for account creation.

---

## 🏗️ Security Architecture

### Layer 1: HTTP Security (Helmet + Headers)
- **Content Security Policy (CSP)** — restricts which resources can load
- **HSTS** — forces HTTPS with 1-year preloading
- **X-Frame-Options: DENY** — prevents clickjacking
- **X-Content-Type-Options: nosniff** — prevents MIME sniffing
- **Referrer-Policy** — `strict-origin-when-cross-origin`
- **Permissions-Policy** — disables camera, microphone, geolocation
- **Cache-Control: no-store** — prevents sensitive data caching

### Layer 2: Rate Limiting
| Scope | Window | Max Requests |
|-------|--------|-------------|
| Global (all routes) | 15 min | 100 |
| Auth routes (`/api/auth/*`) | 15 min | 10 |

### Layer 3: Brute-Force Protection
- **Lockout threshold**: 5 failed login attempts
- **Lockout window**: 15 minutes
- Applied per **email** AND per **IP address**
- Returns `429 Too Many Requests` with time remaining

### Layer 4: Request Processing
- **Content-Type validation** — rejects non-JSON payloads on POST/PUT/PATCH
- **Request body sanitisation** — strips null bytes and control characters
- **JSON size limit** — 10MB max body

### Layer 5: Authentication (JWT)
- **Access tokens** — 15-minute expiry
- **Refresh tokens** — 7-day expiry, httpOnly secure cookie
- **Token blacklisting** — on logout, access tokens are blacklisted
- **bcrypt password hashing** — 12 rounds

### Layer 6: Security Keys (Account Creation)
- Every new account requires a **one-time-use security key**
- Keys are **bcrypt-hashed** — plaintext is never stored
- Keys are **role-locked** — a student key can only create a student account
- Keys have **expiry dates** — cannot be used after expiration
- Keys can be **revoked** by an admin

### Layer 7: Audit Trail
- `security_events` table logs every auth action
- Events: `LOGIN_SUCCESS`, `LOGIN_FAILED`, `LOGIN_LOCKED_OUT`, `SECURITY_KEY_VALIDATED`, `SECURITY_KEY_CONSUMED`, `REGISTRATION_SUCCESS`, `REGISTRATION_FAILED`, `LOGOUT`, `ADMIN_CREATE_USER`, `ADMIN_DEACTIVATE_USER`, `SECURITY_KEY_CREATED`, `SECURITY_KEY_REVOKED`
- Each event records: user ID, email, IP address, user agent, timestamp, severity

### Layer 8: Sensitive Data Handling
- **Dev logging** redacts passwords, security keys, and tokens
- **Production errors** never expose stack traces
- **CORS** locked to configured frontend URL only

---

## 👤 Pre-Seeded Accounts (7 Total)

### Admin (1)
| Field | Value |
|-------|-------|
| Email | `admin@kiteandkey.academy` |
| Password | `Admin@123!` |
| Role | `admin` |
| Permissions | Create tokens, manage users, view analytics |

### Parents (2)
| # | Email | Password | Name |
|---|-------|----------|------|
| 1 | `parent.smith@kiteandkey.academy` | `Parent@123!` | David Smith |
| 2 | `parent.chen@kiteandkey.academy` | `Parent@123!` | Wei Chen |

### Students (2)
| # | Email | Password | Name | Grade | Parent |
|---|-------|----------|------|-------|--------|
| 1 | `alex.smith@student.kk.edu` | `Student@123!` | Alex Smith | 5 | David Smith |
| 2 | `lily.chen@student.kk.edu` | `Student@123!` | Lily Chen | 6 | Wei Chen |

### Tutors (2)
| # | Email | Password | Name | Subjects |
|---|-------|----------|------|----------|
| 1 | `sarah.jones@kiteandkey.academy` | `Tutor@123!` | Sarah Jones | Maths, Science |
| 2 | `michael.nguyen@kiteandkey.academy` | `Tutor@123!` | Michael Nguyen | English, History |

---

## 🔑 Security Keys (7 Total)

Security keys are generated at seed time and printed to the console. **They cannot be recovered after seeding** because only the bcrypt hash is stored.

| # | Role | Label |
|---|------|-------|
| 1 | Admin | Admin Key #1 |
| 2 | Parent | Parent Key #1 |
| 3 | Parent | Parent Key #2 |
| 4 | Student | Student Key #1 |
| 5 | Student | Student Key #2 |
| 6 | Tutor | Tutor Key #1 |
| 7 | Tutor | Tutor Key #2 |

### Key Format
```
KK-{ROLE}-{RANDOM_HEX}
```
Examples: `KK-STU-A3F9C1D2E4`, `KK-ADM-B7E2F1A3C5`

### Usage Flow
1. Admin creates a security key via `POST /api/admin/security-keys`
2. Admin securely shares the plaintext key with the intended user
3. User provides the key during registration (`securityKey` field)
4. Backend validates the key (bcrypt compare), assigns the role, marks it as consumed
5. Key can never be used again

---

## 📡 API Endpoints

### Authentication
| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/auth/register` | Register with security key | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/refresh` | Refresh access token | Cookie |
| POST | `/api/auth/logout` | Logout & blacklist token | Bearer |

### Admin — Security Keys
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/admin/security-keys` | Create a new key |
| GET | `/api/admin/security-keys` | List all keys |
| DELETE | `/api/admin/security-keys/:id` | Revoke a key |

### Admin — Security Events
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/security-events` | View audit log |

### Admin — User Management
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/users` | List users |
| POST | `/api/admin/users` | Create user (admin bypass) |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Deactivate user |

---

## 🗄️ Database Tables (New)

### `security_keys`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| key_hash | VARCHAR(255) | bcrypt hash of the key |
| key_label | VARCHAR(100) | Human-readable label |
| role | ENUM | student, tutor, parent, admin |
| is_used | BOOLEAN | Whether the key has been consumed |
| used_by | UUID → users | Who consumed the key |
| used_at | TIMESTAMP | When consumed |
| is_active | BOOLEAN | Can be revoked by admin |
| expires_at | TIMESTAMP | Key expiry |
| created_by | UUID → users | Admin who created the key |
| ip_used_from | VARCHAR(45) | IP that consumed the key |

### `security_events`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| event_type | VARCHAR(100) | Event type code |
| user_id | UUID → users | Associated user |
| email | VARCHAR(255) | Email (for failed logins) |
| ip_address | VARCHAR(45) | Client IP |
| user_agent | TEXT | Browser/client string |
| metadata | JSONB | Extra context |
| severity | VARCHAR(20) | info, warning, critical |

### `login_attempts`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | Attempted email |
| ip_address | VARCHAR(45) | Client IP |
| success | BOOLEAN | Whether login succeeded |
| attempted_at | TIMESTAMP | When attempted |

---

## 🚀 Setup Commands

```bash
# Run migrations (creates all tables including security_keys)
cd api && npx knex migrate:latest

# Seed the database (creates 7 accounts + 7 security keys)
npx knex seed:run

# ⚠️ COPY THE SECURITY KEYS FROM THE CONSOLE OUTPUT!
```

---

## 📁 Files Modified/Created

### New Files
- `api/src/migrations/20260224000008_create_security_keys.js` — Migration
- `api/src/middleware/security.js` — Security middleware (lockout, audit, sanitise)
- `api/src/utils/securityKeys.js` — Key CRUD utilities

### Modified Files
- `api/src/server.js` — Integrated security layers
- `api/src/controllers/authController.js` — Security key registration + lockout
- `api/src/controllers/adminController.js` — Key management endpoints + audit logging
- `api/src/routes/auth.js` — Cleaned up routing
- `api/src/routes/admin.js` — Added key management & events routes
- `api/src/middleware/validation.js` — Added `securityKey` field + `createSecurityKey` schema
- `api/src/seeds/01_users.js` — 7 accounts + 7 keys
- `api/.env` — Updated security config

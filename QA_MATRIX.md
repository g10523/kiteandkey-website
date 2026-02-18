# QA & Testing Matrix: Backend Integration

Use this matrix to validate the transition from mock data to the production backend.

## 1. Authentication & Session Management
| Feature | Test Case | Success Criteria | Status |
|---------|-----------|------------------|--------|
| **Sign Up** | Register a new student via `/register` | User created in DB; Auto-login; Redirect to dashboard | ⬜ |
| **Login** | Login with valid credentials | Receive JWT; `lms_access_token` stored in localStorage | ⬜ |
| **Persistence** | Reload page after login | Session remains active without re-login | ⬜ |
| **Token Refresh** | Wait 15 mins (or force expiry) | Token refreshes automatically in background | ⬜ |
| **Logout** | Click Logout | Token cleared; Redirect to login; Server blacklist updated | ⬜ |

## 2. Dashboard & Data Sync
| Feature | Test Case | Success Criteria | Status |
|---------|-----------|------------------|--------|
| **Initial Load** | Load Dashboard (Student) | Loading skeleton -> Data appears; `ConnectionStatus` = 'online' | ⬜ |
| **Offline Mode** | Disconnect Network -> Refresh | App loads from `localStorage` cache; Indicator shows "Offline" | ⬜ |
| **Reconnection** | Reconnect Network | Indicator shows "Online"; Background sync occurs | ⬜ |
| **Data Integrity** | Compare DB vs UI | Enrolled subjects and assignments match backend data | ⬜ |

## 3. Assessments & Quizzes
| Feature | Test Case | Success Criteria | Status |
|---------|-----------|------------------|--------|
| **Quiz Submission** | Submit a quiz | Optimistic update (UI checked); Background POST to `/api/quizzes/:id/attempts` | ⬜ |
| **Grading** | Check quiz result | Score returned from server matches expected key | ⬜ |
| **Attempt Limit** | Retake quiz > max attempts | Error message displayed; "Retake" button disabled | ⬜ |
| **MindPrint** | View Dimensional Deep Dive | Sparkline charts render; Historical trends visible | ⬜ |

## 4. Admin & Content Management
| Feature | Test Case | Success Criteria | Status |
|---------|-----------|------------------|--------|
| **Access Control** | Admin Panel -> "Content Visibility" | Only Admin/Tutor can see/edit settings | ⬜ |
| **Visibility Toggle** | Hide a Lesson for Student X | Assessment disappears from Student X's dashboard; Persists reload | ⬜ |
| **Migration** | Run `window.migrateLegacyData()` | "Migration successful" log; Mock data appears in DB tables | ⬜ |

## 5. Analytics
| Feature | Test Case | Success Criteria | Status |
|---------|-----------|------------------|--------|
| **Trend Lines** | Navigate to MindPrint Profile | Sparklines show progression of percentile scores | ⬜ |
| **Data Fetching** | Inspect Network Tab | `GET /trends` called; Response shape matches UI expectation | ⬜ |

## 6. Deployment Readiness
| File Checking | Requirement | Status |
|---------------|-------------|--------|
| `.env` | `VITE_USE_BACKEND_AUTH=true` | ⬜ |
| `package.json` | `migrate:localstorage-to-db` script exists | ⬜ |
| `featureFlags.ts` | `analytics` is 'ready'; `content-management` is 'ready' | ⬜ |

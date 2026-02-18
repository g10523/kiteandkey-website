# Frontend-Backend Integration Guide

## 🎯 Integration Status

### ✅ Completed (Backend)
- [x] API client with JWT interceptors (`src/services/apiClient.ts`)
- [x] Assessment API service (`src/services/assessmentApiService.ts`)
- [x] MindPrint API service (`src/services/mindprintApiService.ts`) 
- [x] Intervention API service (`src/services/interventionApiService.ts`)
- [x] Assessment backend controller + routes
- [x] MindPrint backend controller + routes
- [x] Environment configuration (`.env.local`)

### ⏳ Next Steps (Frontend Integration)

## I. Update AuthContext (High Priority)

**File:** `src/context/AuthContext.tsx`

**Changes Needed:**
```typescript
import apiClient from '../services/apiClient';

// Replace localStorage auth with API calls
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (token: string, userData: any) => {
    try {
      const { data } = await apiClient.post('/auth/register', {
        token,
        ...userData
      });
      
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## II. Update DataContext (High Priority)

**File:** `src/context/DataContext.tsx`

**Changes Needed:**

```typescript
import { assessmentApiService } from '../services/assessmentApiService';
import { mindprintApiService } from '../services/mindprintApiService';
import { interventionApiService } from '../services/interventionApiService';

// Replace localStorage operations with API calls

const refreshData = async () => {
  if (!user) return;

  setLoading(true);
  try {
    if (user.role === 'student') {
      // Load student data from API
      const [profile, interventions, assessments] = await Promise.all([
        mindprintApiService.getProfile(user.id).catch(() => null),
        interventionApiService.getStudentInterventions(user.id),
        assessmentApiService.getStudentAssessments(user.id)
      ]);

      setStudentProfile(profile);
      setInterventions(interventions);
      setAssessments(assessments);
    } else if (user.role === 'tutor') {
      // Load tutor data
      const interventions = await interventionApiService.getStudentInterventions(user.id);
      const assessments = await assessmentApiService.getRecentAssessments();
      
      setInterventions(interventions);
      setAssessments(assessments);
    } else if (user.role === 'admin') {
      // Load admin data (all users, analytics, etc.)
      const assessments = await assessmentApiService.getRecentAssessments();
      setAssessments(assessments);
    }
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    setLoading(false);
  }
};
```

## III. Update Assessment Component

**File:** `src/pages/Assessments.tsx`

**Changes:**

```typescript
import { assessmentApiService } from '../services/assessmentApiService';
import { useState } from 'react';

const handleSaveAssessment = async () => {
  if (!formData.dimension || !rawScoreInput) return;

  setSaving(true);
  try {
    const { assessment, profile } = await assessmentApiService.createAssessment({
      studentId: selectedStudent?.id || user!.id,
      dimension: formData.dimension,
      testType: 'standard',
      rawScores: {
        total: parseInt(rawScoreInput)
      },
      behavioralObservations: formData.observations,
      environmentalFactors: {
        timeOfDay: new Date().getHours() < 12 ? 'morning' : 'afternoon'
      }
    });

    // Show success message
    alert(`Assessment saved! Percentile: ${assessment.calculatedResults.percentile}`);
    
    // Refresh data
    await refreshData();
    
    // Reset form
    setFormData({ dimension: '' as any, observations: '' });
    setRawScoreInput('');
  } catch (error) {
    console.error('Failed to save assessment:', error);
    alert('Failed to save assessment. Please try again.');
  } finally {
    setSaving(false);
  }
};
```

## IV. Update MindPrint Components

**File:** `src/components/MindPrintSnapshot.tsx`

**Changes:**

```typescript
import { mindprintApiService } from '../services/mindprintApiService';
import { useEffect, useState } from 'react';

const MindPrintSnapshot: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [profile, setProfile] = useState<MindPrintProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await mindprintApiService.getProfile(studentId);
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [studentId]);

  if (loading) return <LoadingSkeleton />;
  if (!profile) return <NoProfileMessage />;

  return (
    <div className="mindprint-snapshot">
      {/* Render profile with real data */}
      <RadarChart data={profile.dimensions} />
      {/* ... */}
    </div>
  );
};
```

## V. Update Cognitive Gym

**File:** `src/components/growth/CognitiveGym.tsx`

**Changes:**

```typescript
import { interventionApiService } from '../services/interventionApiService';

const CognitiveGym: React.FC = () => {
  const { user } = useAuth();
  const [interventions, setInterventions] = useState<AssignedIntervention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInterventions = async () => {
      if (!user) return;
      
      try {
        const data = await interventionApiService.getStudentInterventions(user.id);
        setInterventions(data);
      } catch (error) {
        console.error('Failed to load interventions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInterventions();
  }, [user]);

  const handleLogSession = async (interventionId: string, reflection: StudentReflection) => {
    try {
      await interventionApiService.submitReflection(interventionId, reflection);
      alert('Reflection submitted!');
      
      // Refresh interventions to show updated progress
      const updated = await interventionApiService.getStudentInterventions(user!.id);
      setInterventions(updated);
    } catch (error) {
      console.error('Failed to save reflection:', error);
      alert ('Failed to save reflection. Please try again.');
    }
  };

  // ... rest of component
};
```

## VI. Update Session Logger (Tutor)

**File:** `src/components/interventions/SessionLogger.tsx`

**Changes:**

```typescript
import { interventionApiService } from '../services/interventionApiService';

const handleSubmitLog = async () => {
  if (!intervention) return;

  setSubmitting(true);
  try {
    await interventionApiService.logSession({
      interventionId: intervention.id,
      studentId: intervention.targetStudentId,
      scheduledDate: new Date(),
      durationMinutes: sessionDuration,
      protocolStepsCompleted: completedSteps,
      stepsSkipped: skippedSteps,
      materialsUsed, 
      scriptAdherence,
      adaptationsMade: adaptations,
      engagementLevel,
      cognitiveLoad,
      objectiveMet,
      evidence: outcomeEvidence,
      nextSessionAdjustment: nextAdjustment,
      requiresSupervision: flags.supervision,
      reassessmentRecommended: flags.reassessment
    });

    alert('Session logged successfully!');
    onClose();
  } catch (error) {
    console.error('Failed to log session:', error);
    alert('Failed to log session. Please try again.');
  } finally {
    setSubmitting(false);
  }
};
```

## VII. Error Handling & Loading States

**Create:** `src/components/common/LoadingSkeleton.tsx`

```typescript
export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-4 bg-purple-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-purple-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-purple-200 rounded w-5/6"></div>
    </div>
  );
};
```

**Create:** `src/components/common/ErrorBoundary.tsx`

```typescript
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
          <div className="glass-card p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## VIII. Testing Checklist

### Backend API Tests

Test these endpoints with Postman:

**Assessments:**
```bash
# Login first to get token
POST /api/auth/login
{
  "email": "sarah.chen@kiteandkey.academy",
  "password": "Tutor@123"
}

# Create assessment
POST /api/assessments
Authorization: Bearer <token>
{
  "studentId": "<student-uuid>",
  "dimension": "working_memory",
  "testType": "standard",
  "rawScores": {
    "total": 7
  },
  "behavioralObservations": "Student showed good focus"
}

# Get assessments
GET /api/assessments?studentId=<student-uuid>
Authorization: Bearer <token>
```

**MindPrint:**
```bash
# Get profile
GET /api/mindprint/<student-uuid>
Authorization: Bearer <token>

# Get trends
GET /api/mindprint/<student-uuid>/trends
Authorization: Bearer <token>
```

### Frontend Integration Tests

- [ ] Login with real credentials
- [ ] Create assessment → Profile updates
- [ ] View MindPrint radar with real data
- [ ] See interventions in Cognitive Gym
- [ ] Submit student reflection
- [ ] Tutor logs session
- [ ] Token refresh after 15 minutes
- [ ] Logout clears tokens

## IX. Migration Script (Optional)

If you have existing localStorage data to migrate:

**Create:** `src/utils/migrateLocalStorage.ts`

```typescript
import { assessmentApiService } from '../services/assessmentApiService';

export async function migrateLocalStorageData() {
  const confirm = window.confirm(
    'This will migrate your local data to the backend. Continue?'
  );
  
  if (!confirm) return;

  try {
    // Get old localStorage data
    const oldAssessments = JSON.parse(localStorage.getItem('lms_assessments') || '[]');
    
    // Migrate each assessment
    for (const assessment of oldAssessments) {
      await assessmentApiService.createAssessment({
        studentId: assessment.studentId,
        dimension: assessment.dimension,
        testType: 'standard',
        rawScores: {
          total: assessment.rawScore
        }
      });
    }

    // Clear old localStorage
    localStorage.removeItem('lms_assessments');
    localStorage.removeItem('lms_profiles');
    localStorage.removeItem('lms_interventions');

    alert('Migration complete! Refreshing page...');
    window.location.reload();
  } catch (error) {
    console.error('Migration failed:', error);
    alert('Migration failed. Please contact support.');
  }
}
```

## X. Deployment Preparation

**Update `.env.local` for production:**
```bash
VITE_API_URL=https://your-backend.railway.app/api
VITE_ENV=production
```

**Build commands:**
```bash
# Backend
cd api
npm run db:reset  # Fresh database
npm run build

# Frontend
cd ..
npm run build
```

---

## 🚀 Implementation Timeline

**Week 1:**
- Day 1-2: Update AuthContext, test login/logout
- Day 3-4: Update DataContext, integrate assessment flow
- Day 5: Update MindPrint components

**Week 2:**
- Day 1-2: Update Cognitive Gym and intervention components
- Day 3-4: Add error handling and loading states
- Day 5: End-to-end testing

**Week 3:**
- Day 1-2: Bug fixes and polish
- Day 3-4: Deploy backend to Railway/Render
- Day 5: Deploy frontend to Vercel/Netlify

---

## ✅ Success Criteria

Your integration is complete when:

1. ✅ Login uses real API and stores JWT
2. ✅ Assessment creation saves to PostgreSQL
3. ✅ MindPrint profile calculates from real assessments
4. ✅ Interventions auto-assign based on percentiles
5. ✅ Session logs persist with fidelity tracking
6. ✅ Token refresh happens automatically
7. ✅ All localStorage operations removed
8. ✅ Error states handled gracefully

---

**Next Action:** Update `AuthContext.tsx` to use the API client, then test login flow!

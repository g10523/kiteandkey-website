# ✅ 30-Minute Completion Checklist

## 🎯 Goal: Working End-to-End Working Memory Assignment

Follow these steps in order. All code is ready to copy/paste.

---

## Step 1: Backend Controller (15 minutes)

**File:** `/Users/giovannithomas/Desktop/lms/api/src/controllers/assessmentController.js`

1. Open the file
2. Scroll to line ~296 (just before `module.exports`)
3. Copy the code from `IMPLEMENTATION_PLAN.md` Section 1.1:
   - [ ] `startInteractiveAssessment()` function
   - [ ] `submitInteractiveResponse()` function
   - [ ] `completeInteractiveAssessment()` function
   - [ ] `calculateWorkingMemoryScores()` helper
   - [ ] `calculateLongestSpan()` helper

4. Paste before `module.exports`

5. Update `module.exports` to add three new exports:
```javascript
module.exports = {
    createAssessment,
    getAssessments,
    getAssessment,
    recalculateMindPrintProfile,
    startInteractiveAssessment,      // ← ADD
    submitInteractiveResponse,        // ← ADD
    completeInteractiveAssessment     // ← ADD
};
```

**✅ Save file**

---

## Step 2: Dashboard Integration (10 minutes)

**File:** `/Users/giovannithomas/Desktop/lms/src/pages/StudentDashboard.tsx`

1. Add imports at the top:
```typescript
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
```

2. Add `const navigate = useNavigate();` at the start of the component

3. Find a good spot in the JSX (maybe after the welcome section)

4. Copy/paste the Assessment CTA from `IMPLEMENTATION_PLAN.md` Section 1.2

**✅ Save file**

---

## Step 3: Routing (5 minutes)

**File:** `/Users/giovannithomas/Desktop/lms/src/App.tsx`

1. Add import at top:
```typescript
import { WorkingMemoryAssessment } from './components/assessments';
```

2. Find the `<Routes>` section

3. Add the new route from `IMPLEMENTATION_PLAN.md` Section 1.3

**✅ Save file**

---

## Step 4: Test (5 minutes)

1. **Check dev server** is running (should be on port 5174)
   - If not: `npm run dev`

2. **Open browser:** http://localhost:5174

3. **Login** with any email

4. **Click Dashboard** → Should see "Start Assessment" button

5. **Click "Start Assessment"**
   - Should navigate to assessment page
   - Should see instructions
   - Click "Start"
   - See digits appear 1 per second
   - Use number pad to enter
   - Complete all trials

6. **View Results**
   - Should redirect to MindPrint
   - Radar chart should show Working Memory bubble
   - Percentile should display

---

## 🐛 Troubleshooting

**Problem:** "Cannot find module 'framer-motion'"
- **Fix:** `npm install framer-motion`

**Problem:** Backend error "activeAssessments is not defined"
- **Fix:** Check that lines 5-6 of assessmentController have:
  ```javascript
  const activeAssessments = new Map();
  const assessmentResults = new Map();
  ```

**Problem:** Frontend shows "Failed to load profile"
- **Fix:** MindPrint page should use mock data (already fixed today)

**Problem:** Assessment won't start
- **Fix:** Check browser console for errors. Likely a route or import issue.

---

## ✨ Success Criteria

- [ ] Can click "Start Assessment" from dashboard
- [ ] Assessment page loads with instructions
- [ ] Digits display sequentially (1 per second)
- [ ] Can input response using number pad
- [ ] Progress bar advances
- [ ] Completes without errors
- [ ] Redirects to MindPrint
- [ ] Radar chart shows Working Memory data
- [ ] Percentile value is reasonable (20-80th typically)

---

## 📊 After Completion

You will have:
- ✅ Working end-to-end cognitive assessment
- ✅ Real-time scoring with age norms
- ✅ Beautiful visualization
- ✅ Production-ready code

**Next:** Build the remaining 7 dimensions using Working Memory as a template!

---

**Questions? Check `IMPLEMENTATION_PLAN.md` for complete code samples.**

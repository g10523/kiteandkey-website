# MindPrint: Real Assessments Implementation Plan

## Overview
Remove all hardcoded dummy data from the MindPrint page. Replace with a real assessment-driven flow:
- If no assessments completed → show "Take Your First Assessment" onboarding
- If some completed → show real results + prompt for remaining dimensions
- If all 8 completed → show full profile with real data

## Architecture (What Already Exists)

### Backend (api/src/)
- **8 battery modules** in `assessments/` — generate test items, check responses, score
- **batteryRegistry.js** — central lookup for all batteries
- **assessmentController.js** — start, submit, complete flows (in-memory storage)
- **routes/assessments.js** — API routes

### Frontend (src/)
- **AdaptiveAssessment.tsx** — generic test runner, renders stimuli per type
- **5 stimulus components** — DigitSpan, SymbolSearch, MatrixReasoning, NBack, Stroop
- **mindprintApiService.ts** — API client with mock fallbacks
- **MindPrint.tsx** — main page (currently full of hardcoded mock data)

## Changes Required

### Phase 1: Rename + Remove Dummy Data
1. `MindPrint.tsx` — rename "The Cockpit" → "MindPrint", remove all mock profile data
2. `MindPrint.css` — update any cockpit references

### Phase 2: Assessment-Driven Profile State
1. New state machine in MindPrint.tsx:
   - `'onboarding'` → no assessments done, show welcome + start CTA
   - `'assessing'` → currently taking an assessment
   - `'partial'` → some dimensions assessed, show results + take more
   - `'complete'` → all 8 dimensions assessed, full profile view

### Phase 3: Assessment Hub UI
1. New `AssessmentHub.tsx` component — shows which dimensions are assessed vs pending
2. Clicking a pending dimension launches AdaptiveAssessment
3. Results feed back into the MindPrint profile state

### Phase 4: Client-Side Scoring (No Backend Required)
Since the backend uses in-memory storage and may not be running:
- Move scoring logic client-side for offline capability
- Store completed assessment results in localStorage
- Build profile from stored results

## File Changes

| File | Action |
|------|--------|
| `src/pages/MindPrint.tsx` | Rewrite: state machine, no mock data |
| `src/pages/MindPrint.css` | Rename cockpit refs |
| `src/components/mindprint/AssessmentHub.tsx` | NEW: dimension grid with status |
| `src/components/mindprint/OnboardingWelcome.tsx` | NEW: first-time experience |
| `src/components/mindprint/AssessmentRunner.tsx` | NEW: wrapper for AdaptiveAssessment |
| `src/services/mindprintStore.ts` | NEW: localStorage persistence |
| `src/services/clientScoring.ts` | NEW: client-side scoring engine |

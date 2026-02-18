# Weekly Quizzes & Content Management System

## Overview

This update adds a comprehensive quiz system with tutor/admin content visibility controls to the Kite & Key Academy LMS.

## Features Implemented

### 1. Weekly Quizzes for Each Lesson

#### Quiz Structure
- **Multiple Question Types**: Multiple choice, true/false, and short answer
- **Timed Quizzes**: Optional time limits with countdown timer
- **Passing Scores**: Configurable passing percentage (default 70%)
- **Attempt Tracking**: Records all attempts with scores and timestamps
- **Max Attempts**: Optional limit on retakes

#### Quiz Features
- Real-time timer with visual countdown
- Question navigator showing answered/unanswered status
- Progress bar tracking completion
- Immediate feedback with detailed explanations
- Score calculation with pass/fail determination
- Comprehensive results view with question-by-question breakdown
- Retry functionality with attempt limits

#### Example Quiz Data
Two complete quizzes have been added to the English Year 8 curriculum:
1. **Character Development Quiz** (5 questions, 15 min, 70% passing)
2. **Plot Structure Quiz** (4 questions, 20 min, 70% passing)

### 2. Content Visibility Management (Tutor/Admin)

#### Content Management Dashboard
Tutors and admins can control what students see through an intuitive interface:

**Features:**
- **Subject Selection**: Filter content by subject
- **Search Functionality**: Find lessons by title or unit
- **Status Filtering**: View all, visible only, or hidden only content
- **Visibility Toggle**: Show/hide lessons and quizzes individually
- **Release Date Scheduling**: Set future dates when content becomes visible
- **Bulk Management**: Manage multiple lessons efficiently

**Controls Per Lesson:**
- Lesson visibility toggle (visible/hidden)
- Quiz visibility toggle (if quiz exists)
- Release date picker for scheduled content
- Visual indicators for current status

### 3. Student Quiz Experience

#### In-Lesson Integration
- Quizzes appear at the end of lesson content
- Visual quiz card showing:
  - Number of questions
  - Time limit
  - Passing score
  - Best score (if attempted)
  - Required/optional status
- Prominent "Start Quiz" or "Retake Quiz" button

#### Quiz Taking Interface
- Clean, distraction-free design
- Question navigation grid
- Difficulty indicators (easy/medium/hard)
- Answer type-specific interfaces:
  - Radio buttons for multiple choice
  - Large buttons for true/false
  - Text area for short answer
- Warning for unanswered questions
- Submit confirmation

#### Results & Feedback
- Immediate scoring
- Pass/fail indication with visual feedback
- Question-by-question review
- Correct/incorrect indicators
- Detailed explanations for each question
- Retry option (if attempts remaining)

## File Structure

### New Files Created

```
src/
├── components/
│   ├── QuizView.tsx           # Student quiz taking interface
│   └── ContentManagement.tsx  # Tutor/admin content control panel
└── types/
    └── index.ts               # Updated with Quiz, QuizAttempt, ContentVisibility types
```

### Modified Files

```
src/
├── App.tsx                    # Added quiz and content-management routes
├── pages/
│   └── LessonView.tsx        # Integrated quiz display in lessons
├── data/
│   └── mockData.ts           # Added quiz data to lessons
└── types/
    └── index.ts              # Extended Lesson interface with quiz property
```

## Type Definitions

### Quiz Interface
```typescript
interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;           // minutes
  passingScore: number;         // percentage
  attempts: QuizAttempt[];
  maxAttempts?: number;
  isRequired: boolean;
  isVisibleToStudent?: boolean;
}
```

### QuizAttempt Interface
```typescript
interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: Date;
  completedAt?: Date;
  score: number;
  answers: Record<string, string | number>;
  timeSpent: number;            // seconds
  isPassed: boolean;
}
```

### ContentVisibility Interface
```typescript
interface ContentVisibility {
  id: string;
  contentType: 'lesson' | 'quiz' | 'unit' | 'assignment';
  contentId: string;
  studentId?: string;           // null = applies to all students
  isVisible: boolean;
  releaseDate?: Date;
  hideDate?: Date;
  setBy: string;                // tutor/admin user ID
  setAt: Date;
  notes?: string;
}
```

## Usage Examples

### Adding a Quiz to a Lesson

```typescript
{
  id: 'eng-lesson-1-1',
  title: 'Character Development',
  // ... other lesson properties
  quiz: {
    id: 'quiz-eng-1-1',
    lessonId: 'eng-lesson-1-1',
    title: 'Character Development Quiz',
    description: 'Test your understanding of characterization techniques',
    timeLimit: 15,
    passingScore: 70,
    isRequired: true,
    isVisibleToStudent: true,
    maxAttempts: 3,
    attempts: [],
    questions: [
      {
        id: 'q1',
        question: 'Which is an example of DIRECT characterization?',
        type: 'multiple-choice',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 1,
        explanation: 'Explanation here...',
        difficulty: 'easy'
      }
      // ... more questions
    ]
  }
}
```

### Accessing Content Management

**For Tutors/Admins:**
1. Navigate to the Content Management page
2. Select a subject from the dropdown
3. Use search/filter to find specific lessons
4. Toggle visibility for lessons and quizzes
5. Set release dates for scheduled content
6. Click "Save Changes" to apply

## Navigation Routes

- `/quiz` - Quiz taking interface (requires lessonId parameter)
- `/content-management` - Content visibility control panel (tutor/admin only)

## Styling

The quiz system uses the existing LMS design system:
- Glassmorphism effects for cards
- Purple/lavender accent colors
- Smooth animations and transitions
- Responsive grid layouts
- Accessible color contrasts

## Future Enhancements

Potential improvements for future iterations:

1. **Analytics Dashboard**
   - Quiz performance tracking
   - Student progress metrics
   - Question difficulty analysis

2. **Advanced Question Types**
   - Drag-and-drop ordering
   - Fill-in-the-blank
   - Matching pairs
   - Image-based questions

3. **Adaptive Quizzing**
   - Difficulty adjustment based on performance
   - Personalized question selection
   - MindPrint-adapted question presentation

4. **Batch Operations**
   - Bulk visibility changes
   - Template quizzes
   - Question banks

5. **Enhanced Scheduling**
   - Recurring release patterns
   - Student-specific schedules
   - Automatic hiding after deadlines

## Testing

To test the quiz system:

1. **As a Student:**
   - Navigate to any lesson with a quiz
   - Click "Start Quiz"
   - Answer questions and submit
   - Review results and explanations

2. **As a Tutor/Admin:**
   - Access Content Management
   - Toggle lesson/quiz visibility
   - Set release dates
   - Save changes

## Notes

- Quiz attempts are currently stored in memory (mock data)
- In production, integrate with backend API for persistence
- Content visibility changes require page refresh to take effect
- Timer continues even if user navigates away (consider adding pause functionality)

## Support

For questions or issues, contact the development team or refer to the main LMS documentation.

// Kite & Key Academy - Sign-Up Flow Types

export type YearLevel = 'Year 5' | 'Year 6' | 'Year 7' | 'Year 8' | 'Year 9' | 'Year 10'

export type Subject = 'Mathematics' | 'English' | 'Science'

export type PlanTier = 'Glide' | 'Elevate' | 'Soar'

export interface StudentProfile {
  id: string
  firstName: string
  lastName: string
  yearLevel: YearLevel | ''
  school: string
  subjects: Subject[]
  learningGoals: string
  learningChallenges: string
  previousTutoring: boolean | null
  consentGiven: boolean
}

export interface ParentAccount {
  fullName: string
  email: string
  mobile: string
  password: string
  confirmPassword: string
  billingAddress: {
    street: string
    suburb: string
    state: string
    postcode: string
  }
}

export interface SubjectAllocation {
  Mathematics: number
  English: number
  Science: number
}

export interface PlanSelection {
  tier: PlanTier | null
  weeklyHours: 1 | 2 | 3
  subjectAllocation: SubjectAllocation
}

export interface SignUpFormData {
  students: StudentProfile[]
  parent: ParentAccount
  plan: PlanSelection
  termsAccepted: boolean
  marketingOptIn: boolean
}

export const YEAR_LEVELS: YearLevel[] = [
  'Year 5',
  'Year 6',
  'Year 7',
  'Year 8',
  'Year 9',
  'Year 10'
]

export const SUBJECTS: Subject[] = ['Mathematics', 'English', 'Science']

export const PLAN_DETAILS: Record<PlanTier, {
  name: string
  description: string
  minHours: number
  maxHours: number
  pricePerHour: number
}> = {
  Glide: {
    name: 'Glide',
    description: 'Entry-level support with flexible tutoring',
    minHours: 1,
    maxHours: 1,
    pricePerHour: 75
  },
  Elevate: {
    name: 'Elevate',
    description: 'Balanced academic support',
    minHours: 2,
    maxHours: 2,
    pricePerHour: 70
  },
  Soar: {
    name: 'Soar',
    description: 'Maximum support & flexibility',
    minHours: 3,
    maxHours: 3,
    pricePerHour: 65
  }
}

export function createEmptyStudent(): StudentProfile {
  return {
    id: crypto.randomUUID(),
    firstName: '',
    lastName: '',
    yearLevel: '',
    school: '',
    subjects: [],
    learningGoals: '',
    learningChallenges: '',
    previousTutoring: null,
    consentGiven: false
  }
}

export function createEmptyParent(): ParentAccount {
  return {
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    billingAddress: {
      street: '',
      suburb: '',
      state: 'NSW',
      postcode: ''
    }
  }
}

export function createEmptyPlan(): PlanSelection {
  return {
    tier: null,
    weeklyHours: 1,
    subjectAllocation: {
      Mathematics: 0,
      English: 0,
      Science: 0
    }
  }
}

export function createInitialFormData(): SignUpFormData {
  return {
    students: [createEmptyStudent()],
    parent: createEmptyParent(),
    plan: createEmptyPlan(),
    termsAccepted: false,
    marketingOptIn: false
  }
}

export function getTotalAllocatedHours(allocation: SubjectAllocation): number {
  return allocation.Mathematics + allocation.English + allocation.Science
}

export function isAllocationValid(weeklyHours: number, allocation: SubjectAllocation): boolean {
  return getTotalAllocatedHours(allocation) === weeklyHours
}

export function calculateTermPrice(plan: PlanSelection): number {
  if (!plan.tier) return 0
  const pricePerHour = PLAN_DETAILS[plan.tier].pricePerHour
  const weeksPerTerm = 10
  return pricePerHour * plan.weeklyHours * weeksPerTerm
}

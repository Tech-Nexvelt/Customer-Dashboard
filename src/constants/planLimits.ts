export type PlanType = 'basic' | 'pro' | 'premium';

export interface PlanLimit {
  maxApplications: number;
  maxResumes: number;
  maxMockInterviews: number;
  hasCoverLetters: boolean;
  hasOASupport: boolean;
  hasMentorship: boolean;
  hasInternships: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimit> = {
  basic: {
    maxApplications: 20,
    maxResumes: 12,
    maxMockInterviews: 0,
    hasCoverLetters: false,
    hasOASupport: false,
    hasMentorship: false,
    hasInternships: false,
  },
  pro: {
    maxApplications: 100,
    maxResumes: 30,
    maxMockInterviews: 10,
    hasCoverLetters: true,
    hasOASupport: false,
    hasMentorship: false,
    hasInternships: false,
  },
  premium: {
    maxApplications: 9999, // Represents Unlimited
    maxResumes: 9999,
    maxMockInterviews: 9999,
    hasCoverLetters: true,
    hasOASupport: true,
    hasMentorship: true,
    hasInternships: true,
  },
};

export const PLAN_PRICES = {
  basic: 0,
  pro: 149,
  premium: 249,
};

// src/types/database.ts

export interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  location: string | null
  bio: string | null
  profilePicture: string | null
  targetRole: string | null
  preferredStack: string | null
  expectedSalary: number | null
  workType: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface JobApplication {
  id: string
  userId: string
  companyName: string
  role: string
  applicationDate: string
  status: 'applied' | 'viewed' | 'interview' | 'rejected' | 'offer' | 'accepted'
  source: string | null
  jobUrl: string | null
  notes: string | null
  appliedVia: string | null
  salary: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface Interview {
  id: string
  applicationId: string
  userId: string
  interviewType: string | null
  scheduledDate: string | null
  completedDate: string | null
  score: number | null
  feedback: string | null
  round: number
  duration: number | null
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  userId: string
  senderRole: 'user' | 'advisor' | 'system'
  text: string
  messageType: string
  readAt: string | null
  createdAt: string
}

export interface Subscription {
  id: string
  userId: string
  planType: 'STARTER' | 'PRO' | 'PREMIUM'
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  startDate: string
  renewalDate: string
  price: number
}

export interface Notification {
  id: string
  userId: string
  type: 'application' | 'interview' | 'offer' | 'resume' | 'message' | 'system' | 'payment'
  title: string | null
  message: string
  read: boolean
  createdAt: string
}

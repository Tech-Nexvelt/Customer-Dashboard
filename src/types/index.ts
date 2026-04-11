// src/types/index.ts
// Mapped types (previously from @prisma/client)
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface Subscription {
  id: string;
  userId: string;
  status: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  title: string;
  status: string;
}

export interface Interview { id: string; }
export interface Offer { id: string; }
export interface Resume { id: string; }
export interface Portfolio { id: string; }
export interface MockInterview { id: string; }
export interface Message { id: string; }
export interface Notification { id: string; }
export interface ActivityLog { id: string; }

// Extended types with relations
export interface UserWithSubscription extends User {
  subscription?: Subscription;
}

export interface ApplicationWithRelations extends JobApplication {
  interviews?: Interview[];
  offer?: Offer;
}

export interface DashboardStats {
  jobsApplied: number;
  interviews: number;
  offers: number;
  profileStrength: number;
}

export interface ApplicationFunnel {
  applied: number;
  viewed: number;
  interview: number;
  offer: number;
  accepted: number;
  rejected: number;
}

// API Request/Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  skip: number;
}

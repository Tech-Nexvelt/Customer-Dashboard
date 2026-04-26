# Nexvelt Backend API Implementation Guide

This guide outlines the necessary API endpoints and data structures required to replace the static mock data in the Nexvelt Customer Dashboard with a real backend.

---

## 1. Authentication & User Profile

### `GET /api/user/profile`
**Description:** Retrieves the currently authenticated user's profile and subscription info.
**Response Body:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "country": "India",
  "role": "Frontend Developer",
  "accessLevel": "user", 
  "currentPlan": "basic",
  "onboardingCompleted": true,
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### `POST /api/user/profile`
**Description:** Updates user profile during onboarding or from settings.
**Request Body:**
```json
{
  "name": "string",
  "phone": "string",
  "country": "string",
  "dialCode": "string",
  "role": "string"
}
```

---

## 2. Dashboard Overview & Usage

### `GET /api/dashboard/summary`
**Description:** Aggregated stats for the dashboard home.
**Response Body:**
```json
{
  "usage": {
    "resumesUsed": 2,
    "resumesLimit": 12,
    "appsUsed": 5,
    "appsLimit": 20
  },
  "stats": {
    "totalJobCount": 150,
    "unreadJobCount": 12,
    "discoveryActivity": [
      { "week": "Mon", "found": 12, "applied": 2 },
      { "week": "Tue", "found": 18, "applied": 5 }
      // ... 7 days
    ]
  },
  "recentAssignments": [
    { "id": "1", "title": "Portfolio Review", "status": "pending" }
  ]
}
```

---

## 3. Job Tracker

### `GET /api/jobs`
**Description:** List of discovered job leads with filtering.
**Query Parameters:** `search`, `domain`, `source`, `dateFilter`, `page`, `limit`
**Response Body:**
```json
{
  "jobs": [
    {
      "id": "1",
      "company": "Google",
      "job_title": "Frontend Engineer",
      "location": "Mountain View, CA",
      "status": "discover",
      "domain": "Software",
      "source": "linkedin",
      "apply_link": "https://...",
      "createdAt": "2026-04-25T..."
    }
  ],
  "total": 150,
  "pages": 15
}
```

### `PATCH /api/jobs/:id/status`
**Description:** Updates the status of a specific job lead.
**Request Body:**
```json
{
  "status": "started" | "completed" | "discover"
}
```

---

## 4. Resume Builder & ATS Analysis

### `GET /api/resumes`
**Description:** Fetches all resume versions for the user.
**Response Body:**
```json
[
  { "id": "v1", "name": "Frontend_v1.pdf", "updatedAt": "...", "isMain": true, "type": "Main" }
]
```

### `POST /api/resumes/generate`
**Description:** Triggers AI resume generation.
**Request Body (Multipart/Form-Data):**
- `file`: (Binary) The base resume PDF/DOCX
- `targetRole`: "string"
- `templateId`: "modern" | "executive" | "minimal"
**Response Body:**
```json
{
  "resumeId": "uuid",
  "previewUrl": "string",
  "atsMatchScore": 94
}
```

### `GET /api/resumes/:id/ats-report`
**Description:** Detailed ATS analysis report data.
**Response Body:**
```json
{
  "score": 94,
  "breakdown": {
    "impact": 92,
    "brevity": 90,
    "appearance": 93
  },
  "detections": {
    "contact": true, "linkedin": true, "portfolio": true
  },
  "checks": [
    { "title": "Measuring Effect", "desc": "...", "passed": true }
  ],
  "improvementsMade": [
    "Summary section crafted based on experience",
    "Technical keywords added for parsing"
  ]
}
```

---

## 5. Plans & Billing

### `GET /api/plans`
**Description:** Returns available subscription tiers.
**Response Body:**
```json
[
  { "id": "pro", "name": "PRO", "price": 49, "features": ["..."] }
]
```

### `POST /api/subscriptions/checkout`
**Description:** Initiates a payment session (e.g., Stripe) for upgrading.
**Request Body:** `{ "planId": "pro", "interval": "monthly" | "3months" }`

---

## Implementation Tips
1. **File Storage:** Use AWS S3 or Cloudinary for storing uploaded and generated resumes.
2. **AI Integration:** Use OpenAI or Anthropic for resume tailoring and ATS analysis.
3. **Real-time:** Use WebSockets or Server-Sent Events (SSE) for the "Generating AI Resume" progress.
4. **Scraper:** The `Job Tracker` needs a background worker that scrapes LinkedIn/Dice and populates the database.

# 🎓 IntelliCourse - AI-Powered Voice Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.7-000000.svg?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.0-3ECF8E.svg?logo=supabase)](https://supabase.com/)
[![VAPI](https://img.shields.io/badge/VAPI-2.3.0-FF6B6B.svg)](https://vapi.ai/)
[![Clerk](https://img.shields.io/badge/Clerk-6.31.4-6C47FF.svg?logo=clerk)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Revolutionize your learning with AI voice companions.** Real-time voice conversations, personalized tutors, and gamified learning—all powered by cutting-edge AI. 🚀 **Voice AI** • 📊 **Analytics** •
> 🎨 **Glassmorphism UI** • 🔥 **Streak Tracking**

<div align="center">

<img src="https://raw.githubusercontent.com/chayan-1906/IntelliCourse-Next.js/master/public/images/logo.svg" alt="logo" width="150"/>
<br/>
<h3>Interactive voice learning session with AI companion</h3>

### 🌐 [Live Demo](https://intelli-course.vercel.app) • 📖 [Documentation](#-getting-started) • 🐛 [Report Bug](https://github.com/chayan-1906/IntelliCourse-Next.js/issues) • ✨ [Request Feature](https://github.com/chayan-1906/IntelliCourse-Next.js/issues)

</div>

---

## ✨ Key Features

### 🎙️ **Voice-First Learning Experience**

- 🗣️ **Real-Time Voice Conversations** - Natural, AI-powered tutoring sessions via VAPI SDK
- 🎯 **Subject-Specific Companions** - Create custom AI tutors for Math, Science, Coding, Languages, History, Economics
- 🎭 **Personality Customization** - Choose voice gender (Male/Female) and teaching style (Formal/Casual)
- 📝 **Live Transcription** - Real-time conversation capture with full session transcripts

### 📊 **Advanced Progress Analytics**

- 📅 **Activity Heatmap** - GitHub-style learning visualization with weekly, monthly, and yearly views
- 🔥 **Streak Counter** - Track daily learning consistency and longest streaks
- 📉 **Bar Charts & Calendars** - Multi-view data visualization for insights
- 🏆 **Gamification** - Achievement badges and progress milestones

### 🤖 **AI Companion Management**

- ➕ **Create Custom Companions** - Multi-step form with topic, subject, voice, and duration selection
- 📚 **Companion Library** - Browse popular companions and recently completed sessions
- 💾 **Bookmarking System** - Save favorite companions for quick access
- 🔄 **Reusable Templates** - Share companion configurations via shareable links
- 🎨 **Subject-Themed UI** - Color-coded companions by subject (Math: Yellow, Science: Purple, etc.)

### 💻 **Modern Tech Stack**

- ⚡ **Next.js 15** - React 19, Server Components, Turbopack for blazing-fast performance
- 🎨 **Glassmorphism UI** - Frosted glass effects with Tailwind CSS 4.0
- 🌊 **Framer Motion** - Smooth animations and micro-interactions
- 🎞️ **Lottie Animations** - Loading states, success animations, and empty states

### 🔐 **Secure & Scalable**

- 🔒 **Clerk Authentication** - Google OAuth, social login, and session management
- 🗄️ **Supabase Backend** - PostgreSQL database with real-time subscriptions
- 🚀 **Edge-Optimized** - Sentry error tracking and performance monitoring
- 🔄 **Server-Side Caching** - React Cache API for optimized data fetching
- 🛡️ **Type-Safe** - Full TypeScript coverage with Zod validation

---

## 📱 Screenshots & Demo

<div align="center">

### 🎓 Dashboard Overview

<img src="https://github.com/user-attachments/assets/2e3982d8-9ec5-459a-9dfb-db4691fab799" alt="IntelliCourse Dashboard showing popular companions and recent sessions" width="800"/>

*Dashboard showcasing popular companions across subjects and recent learning sessions*

</div>

---

### 📸 Feature Highlights

<table>
  <tr>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/987b6da1-952a-42ef-b7b1-aa0eab929bdd" alt="Companion Creation Form" width="100%"/>
      <br/>
      <strong>🎨 Companion Creation</strong>
      <br/>
      <em>Multi-step form for creating AI tutors with custom voice and style</em>
    </td>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/93abea27-436d-4fde-bf95-31d918e4bbe9" alt="Voice Session with Soundwave" width="100%"/>
      <br/>
      <strong>🎙️ Live Voice Session</strong>
      <br/>
      <em>Real-time conversation with soundwave visualization and transcription</em>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/bbb0d678-abd4-419e-bd05-cacff92475c0" alt="Pre-Session Loading Animation" width="100%"/>
      <br/>
      <strong>⏳ Connecting Animation</strong>
      <br/>
      <em>Smooth loading state while establishing voice connection</em>
    </td>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/5bb5bb69-222d-44b2-ab32-83f1bd101e86" alt="Session Completion Success Animation" width="100%"/>
      <br/>
      <strong>✅ Completion Animation</strong>
      <br/>
      <em>Success feedback with lesson saved confirmation</em>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/ea0c83be-6aa4-43ec-8f44-eaae68011562" alt="Activity Heatmap Visualization - Yearly" width="100%"/>
      <br/>
      <img src="https://github.com/user-attachments/assets/e8ba4817-53de-4ab0-94d2-1978d77d06e4" alt="Activity Heatmap Visualization - Monthly" width="100%"/>
      <br/>
      <img src="https://github.com/user-attachments/assets/d689e7df-8b0e-48d2-b4c6-46b9a35f1ede" alt="Activity Heatmap Visualization - Weekly" width="100%"/>
      <br/>
      <strong>📊 Activity Heatmap</strong>
      <br/>
      <em>GitHub-style learning tracker with yearly/monthly/weekly views</em>
    </td>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/723d382e-bd90-4ff1-b449-279eb1936dee" alt="My Journey Dashboard" width="100%"/>
      <br/>
      <strong>🔥 My Journey Dashboard</strong>
      <br/>
      <em>Progress analytics, streak counter, and session history</em>
    </td>
  </tr>
</table>

---

## 🏗️ Tech Stack & Architecture

### 🖥️ **Frontend**

| Technology        | Version    | Purpose                                                           |
|-------------------|------------|-------------------------------------------------------------------|
| **Next.js**       | `15.4.7`   | React framework with App Router, Server Components, and Turbopack |
| **React**         | `19.1.0`   | UI library with latest concurrent features                        |
| **TypeScript**    | `5.x`      | Type-safe development with strict mode                            |
| **Tailwind CSS**  | `4.0`      | Utility-first CSS with custom glassmorphism design system         |
| **Framer Motion** | `12.23.12` | Animation library for smooth transitions and micro-interactions   |
| **Lottie React**  | `2.4.1`    | JSON-based animations for loading and success states              |

### 🔊 **Voice AI & Integration**

| Technology          | Version   | Purpose                                     |
|---------------------|-----------|---------------------------------------------|
| **VAPI SDK**        | `2.3.0`   | Real-time voice conversation AI with WebRTC |
| **React Hook Form** | `7.62.0`  | Form state management with Zod validation   |
| **Zod**             | `3.25.76` | Runtime type validation and schema parsing  |

### 🗄️ **Backend & Database**

| Technology             | Version  | Purpose                                                  |
|------------------------|----------|----------------------------------------------------------|
| **Supabase**           | `2.56.0` | PostgreSQL database with real-time subscriptions and RLS |
| **Clerk**              | `6.31.4` | Authentication and user management with OAuth providers  |
| **Prisma** *(implied)* | Latest   | Type-safe database ORM (if used)                         |

### 🎨 **UI Components & Libraries**

| Technology                 | Purpose                                                    |
|----------------------------|------------------------------------------------------------|
| **Radix UI**               | Accessible component primitives (Accordion, Select, Label) |
| **Lucide React**           | Modern icon library with 1000+ icons                       |
| **React Calendar Heatmap** | GitHub-style activity visualization                        |
| **React Tooltip**          | Interactive tooltips for data points                       |
| **Shadcn UI**              | Customizable component system                              |

### 🛠️ **Developer Tools**

| Technology                   | Purpose                                   |
|------------------------------|-------------------------------------------|
| **Sentry**                   | Error tracking and performance monitoring |
| **ESLint**                   | Code linting with Next.js config          |
| **class-variance-authority** | Type-safe variant styling                 |
| **clsx + tailwind-merge**    | Conditional className utilities           |

### 🏛️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Next.js 15  │  │  React 19    │  │ Tailwind CSS │  │
│  │  App Router  │  │  Components  │  │  Styling     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Authentication Layer                    │
│                  ┌──────────────┐                        │
│                  │  Clerk Auth  │                        │
│                  │  OAuth 2.0   │                        │
│                  └──────────────┘                        │
└─────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│    Voice AI Layer        │  │    Database Layer        │
│  ┌────────────────────┐  │  │  ┌────────────────────┐  │
│  │  VAPI SDK          │  │  │  │  Supabase          │  │
│  │  - Voice Recognition│  │  │  │  - PostgreSQL DB   │  │
│  │  - Text-to-Speech  │  │  │  │  - Real-time APIs  │  │
│  │  - Conversation AI │  │  │  │  - Storage Buckets │  │
│  └────────────────────┘  │  │  └────────────────────┘  │
└──────────────────────────┘  └──────────────────────────┘
              │                           │
              └─────────────┬─────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Monitoring Layer                        │
│                  ┌──────────────┐                        │
│                  │    Sentry    │                        │
│                  │  Error/Perf  │                        │
│                  └──────────────┘                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** `18.0+` ([Download](https://nodejs.org/)) 🟢
- **npm** package manager 📦
- **Git** for version control 🔧
- **Supabase** account ([Sign up](https://supabase.com/)) 🗄️
- **Clerk** account ([Sign up](https://clerk.com/)) 🔐
- **VAPI** account ([Sign up](https://vapi.ai/)) 🎙️

### 📥 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/chayan-1906/IntelliCourse-Next.js.git
   cd IntelliCourse-Next.js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Add the following variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx

   # Clerk - Custom Auth
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # VAPI Configuration
   NEXT_PUBLIC_VAPI_WEB_TOKEN=xxxxx-xxxxx-xxxxx-xxxxx
   
   # Sentry (Optional - for production monitoring)
   SENTRY_AUTH_TOKEN=xxxxx
   ```

4. **Set up Supabase database**

   Run the following SQL in your Supabase SQL Editor:
   ```sql
   -- Create companions table
   CREATE TABLE companions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     subject TEXT NOT NULL,
     topic TEXT NOT NULL,
     voice TEXT NOT NULL,
     style TEXT NOT NULL,
     duration INTEGER NOT NULL,
     author TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   -- Create session_history table
   CREATE TABLE session_history (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
     user_id TEXT NOT NULL,
     duration_minutes INTEGER DEFAULT 0,
     transcript TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     completed_at TIMESTAMPTZ
   );
   
   -- Create bookmarks table
   CREATE TABLE bookmarks (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
     user_id TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     UNIQUE(companion_id, user_id)
   );
   
   -- Enable Row Level Security
   ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE session_history ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
   
   -- Create policies (adjust based on your auth setup)
   CREATE POLICY "Enable read for all users" ON companions FOR SELECT USING (true);
   CREATE POLICY "Enable insert for authenticated users" ON companions FOR INSERT WITH CHECK (true);
   CREATE POLICY "Enable update for owner" ON companions FOR UPDATE USING (auth.uid() = author);
   CREATE POLICY "Enable delete for owner" ON companions FOR DELETE USING (auth.uid() = author);
   ```

5. **Configure VAPI Assistant**

   In your VAPI dashboard:
    - Create a new assistant
    - Configure voice settings (male/female options)
    - Set up system prompts for educational tutoring
    - Enable conversation transcription
    - Copy the Assistant ID to your `.env`

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open browser**

   Navigate to [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
IntelliCourse-Next.js/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API routes
│   │   │   └── sentry-example-api/ # Sentry integration
│   │   ├── companions/             # Companion pages
│   │   │   ├── [id]/              # Dynamic companion detail
│   │   │   │   ├── page.tsx       # Session page
│   │   │   │   └── loading.tsx    # Loading skeleton
│   │   │   ├── new/               # Create companion
│   │   │   └── page.tsx           # Companions list
│   │   ├── my-journey/            # User analytics dashboard
│   │   ├── subscription/          # Subscription management
│   │   ├── sign-in/               # Authentication pages
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   │
│   ├── components/                 # Reusable components
│   │   ├── ui/                    # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ...
│   │   ├── skeletons/             # Loading skeletons
│   │   │   ├── ActivityHeatmapSkeleton.tsx
│   │   │   ├── CompanionCardSkeleton.tsx
│   │   │   ├── SessionHistorySkeleton.tsx
│   │   │   └── ...
│   │   ├── ActivityHeatmap.tsx    # Heatmap visualization
│   │   ├── AnimatedMyJourney.tsx  # Animated dashboard
│   │   ├── AnimationModal.tsx     # Loading/success modals
│   │   ├── CompanionCard.tsx      # Companion display card
│   │   ├── CompanionComponent.tsx # Voice session handler
│   │   ├── CompanionForm.tsx      # Multi-step creation form
│   │   ├── CompanionList.tsx      # List with filtering
│   │   ├── MonthlyCalendarGrid.tsx # Calendar view
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── SessionHistory.tsx     # Session log with export
│   │   ├── StreakCounter.tsx      # Gamification component
│   │   ├── TranscriptViewer.tsx   # Session transcript display
│   │   ├── WeeklyBarChart.tsx     # Bar chart visualization
│   │   └── ...
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── actions/               # Server actions
│   │   │   └── companion.actions.ts # CRUD operations
│   │   ├── routes.ts              # Route constants
│   │   ├── share.ts               # Share functionality
│   │   ├── supabase.ts            # Supabase client
│   │   ├── utils.ts               # Utility functions
│   │   └── vapi.sdk.ts            # VAPI SDK wrapper
│   │
│   ├── types/                     # TypeScript definitions
│   │   ├── companion.ts           # Companion types
│   │   ├── index.d.ts             # Global types
│   │   ├── navigation.ts          # Navigation types
│   │   └── vapi.d.ts              # VAPI types
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAnimationModal.ts   # Modal state management
│   │   └── useBreadcrumbs.ts      # Navigation breadcrumbs
│   │
│   ├── config/                    # Configuration files
│   │   ├── config.ts              # App configuration
│   │   └── navigation.ts          # Navigation config
│   │
│   ├── constants/                 # App constants
│   │   ├── animations.ts          # Lottie animation paths
│   │   ├── icons.ts               # Icon mappings
│   │   ├── index.ts               # General constants
│   │   └── soundwaves.json        # Soundwave animation
│   │
│   ├── middleware.ts              # Auth & route middleware
│   └── instrumentation.ts         # Sentry instrumentation
│
├── public/                        # Static assets
│   ├── animations/                # Lottie JSON files
│   │   ├── neural-network.json
│   │   └── no-data.json
│   ├── icons/                     # SVG icons
│   │   ├── bookmark.svg
│   │   ├── mic-on.svg
│   │   ├── mic-off.svg
│   │   └── ...
│   └── images/                    # Static images
│       ├── logo.svg
│       ├── cta.svg
│       └── limit.svg
│
├── .env                           # Environment variables (gitignored)
├── components.json                # Shadcn UI config
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies
├── postcss.config.mjs             # PostCSS config
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
├── sentry.server.config.ts        # Sentry server config
├── sentry.edge.config.ts          # Sentry edge config
└── README.md                      # The repository README
```

---

## 🎯 Core Features Deep Dive

### 🎙️ Voice Session Management

**How it Works:**

1. User creates a companion with subject, topic, voice, and style
2. Session starts via `CompanionComponent.tsx` using VAPI SDK
3. Real-time transcription captures conversation
4. Timer tracks session duration (auto-saved)
5. Transcript saved to Supabase on session end
6. Activity data updates the heatmap and streak counter

**Key Components:**

- `CompanionComponent.tsx` - Handles VAPI lifecycle, mic control, and state
- `vapi.sdk.ts` - VAPI client initialization and event handlers
- `companion.actions.ts` - Server actions for session CRUD operations

**Voice Features:**

- Microphone mute/unmute toggle
- Live speech-to-text transcription
- Soundwave visualization during speech
- Session duration tracking with live timer
- Automatic session history saving

### 📊 Analytics & Gamification

**Activity Heatmap:**

- **Weekly View** - Bar chart with session counts
- **Monthly View** - Calendar grid with daily minutes
- **Yearly View** - GitHub-style contribution graph
- **Export Functionality** - Download as PNG/SVG

**Streak Counter:**

- Current streak tracking (consecutive days)
- Longest streak record
- "Active Today" indicator with fire emoji
- Last activity date display
- Real-time updates on session completion

**Session History:**

- Tabular view with companion name, subject, date, duration
- Export to CSV functionality
- Transcript viewer modal
- Sorting and filtering options

### 🤖 Companion Creation Flow

**Multi-Step Form (`CompanionForm.tsx`):**

1. **Name** - Companion display name
2. **Subject** - Select from 6 categories (Math, Science, Coding, etc.)
3. **Topic** - What should the companion teach? (Textarea)
4. **Voice** - Male or Female voice selection
5. **Style** - Formal or Casual teaching approach
6. **Duration** - Estimated session length (minutes)

**Validation:**

- Zod schema validation
- Real-time error messages
- Form state management via React Hook Form
- Loading animations during creation
- Success modal with auto-redirect

### 🗄️ Database Schema

#### **Companions Table**

```typescript
{
	id: UUID                // Primary key
	name: string            // Companion name
	subject: string         // Subject category (maths, science, etc.)
	topic: string           // Learning topic description
	voice: string           // Voice preference (male/female)
	style: string           // Teaching style (formal/casual)
	duration: number        // Estimated session duration (minutes)
	author: string          // User ID (Clerk)
	created_at: timestamp   // Creation date
	updated_at: timestamp   // Last update date
}
```

#### **Session History Table**

```typescript
{
	id: UUID                // Primary key
	companion_id: UUID      // Foreign key → companions.id
	user_id: string         // User ID (Clerk)
	duration_minutes: number // Actual session duration
	transcript: text        // Full conversation transcript
	created_at: timestamp   // Session start time
	completed_at: timestamp // Session end time
}
```

#### **Bookmarks Table**

```typescript
{
	id: UUID                // Primary key
	companion_id: UUID      // Foreign key → companions.id
	user_id: string         // User ID (Clerk)
	created_at: timestamp   // Bookmark date
	UNIQUE(companion_id, user_id) // One bookmark per user/companion
}
```

---

## 🎨 Design System

### Color Palette (Subject-Based)

```css
Science: #E5D0FF

(
Purple

)
Maths: #FFDA6E

(
Yellow

)
Language: #BDE7FF

(
Blue

)
Coding: #FFC8E4

(
Pink

)
History: #FFECC8

(
Beige

)
Economics: #C8FFDF

(
Green

)
```

### Glassmorphism Theme

- **Backdrop Blur:** `backdrop-blur-lg`
- **Border:** `border border-white/20`
- **Background:** `bg-white/10`
- **Shadow:** `shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]`

### Typography

- **Font Family:** Geist
- **Headings:** Bold, 2xl-4xl sizes
- **Body Text:** Regular, sm-lg sizes
- **Code:** Monospace for session timers

### Animations

- **Framer Motion:** Page transitions, accordions, hover effects
- **Lottie:** Loading spinners, success checkmarks, empty states
- **Custom Soundwaves:** Real-time visualization during voice sessions

---

## 🚀 Performance Optimizations

### 🏎️ Speed & Efficiency

- **Server-Side Caching** - React Cache API for database queries
- **Dynamic Imports** - Code splitting for Lottie and heavy components
- **Skeleton Loading** - Perceived performance with loading states
- **Image Optimization** - Next.js Image component with lazy loading
- **Turbopack** - 700x faster than Webpack for local development

### 🔄 Revalidation Strategy

```typescript
// Page revalidation times
export const revalidate = 180;  // 3 minutes (companion detail pages)
export const revalidate = 300;  // 5 minutes (my-journey page)
```

---

## 🔒 Security & Authentication

### 🛡️ Security Measures

- **Clerk Authentication** - OAuth 2.0 with Google, GitHub, email
- **Row-Level Security (RLS)** - Supabase policies for data access
- **Input Validation** - Zod schemas for all form inputs
- **CSRF Protection** - Next.js built-in protection
- **Environment Variables** - Secrets stored in `.env` (gitignored)
- **Sentry Monitoring** - Real-time error tracking and alerting

### 🔐 Authentication Flow

```
User Login → Clerk OAuth → JWT Token → Supabase Client → RLS Policies → Data Access
```

### 👥 User Roles & Permissions

- **Free Users:** 3 companions limit, 10 sessions/month
- **Pro Users:** Unlimited companions, unlimited sessions
- **Admin:** (Future) Companion moderation and analytics

---

## 📊 API Routes

| Method | Endpoint                  | Description          | Auth Required |
|--------|---------------------------|----------------------|---------------|
| `GET`  | `/api/sentry-example-api` | Sentry test endpoint | ❌             |

**Note:** Most data operations use Server Actions (`.actions.ts`) instead of API routes for type safety and better performance.

### Server Actions (`companion.actions.ts`)

```typescript
// Companion CRUD
createCompanion(formData
:
CreateCompanion
):
Promise<Companion>
getAllCompanions(options
:
GetAllCompanions
):
Promise<Companion[]>
getCompanion(id
:
string
):
Promise<Companion>

// Session Management
addToSessionHistory(companionId
:
string
):
Promise<string>
updateSessionDuration(companionId
:
string, duration
:
number
):
Promise<void>
saveSessionTranscript(sessionId
:
string, transcript
:
string
):
Promise<void>
getRecentSessions(limit
:
number
):
Promise<Companion[]>
getUserSessions(userId
:
string, limit
:
number
):
Promise<Companion[]>

// Analytics
getHeatmapData(userId
:
string
):
Promise<HeatmapValue[]>
getWeeklyData(userId
:
string
):
Promise<WeeklyData[]>
getMonthlyData(userId
:
string
):
Promise<MonthlyData[]>
getUserStreakData(userId
:
string
):
Promise<StreakData>

// Bookmarks
toggleBookmark(companionId
:
string, isBookmarked
:
boolean, path
:
string
)
getBookmarkedCompanions(userId
:
string
):
Promise<Companion[]>
```

---

## 🌐 Deployment

### 🚀 Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **Connect to Vercel**
    - Go to [Vercel Dashboard](https://vercel.com/new)
    - Import `IntelliCourse-Next.js` repository
    - Configure environment variables (copy from `.env`)
    - Deploy! 🎉

3. **Post-Deployment**
    - Update Clerk redirect URLs with production domain
    - Update VAPI webhook URLs (if applicable)
    - Configure Sentry DSN for production monitoring

---

## 🧪 Development Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository 🍴
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`) 🌟
3. **Commit** changes (`git commit -m 'feat: Add amazing feature'`) 💾
4. **Push** to branch (`git push origin feature/amazing-feature`) 🚀
5. **Open** a Pull Request 📝

### 📝 Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `style:` Code style change (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 🐛 Known Issues & Limitations

- **Voice Session Stability:** VAPI connection may drop on slow networks (~<1 Mbps)
- **Safari Audio Issues:** Microphone permissions require HTTPS in production
- **Mobile Transcript View:** Long transcripts may cause scroll performance issues

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author & Contact

<div align="center">

### **Padmanabha Das**

[![GitHub](https://img.shields.io/badge/GitHub-@chayan--1906-181717?logo=github)](https://github.com/chayan-1906)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Padmanabha%20Das-0A66C2?logo=linkedin)](https://www.linkedin.com/in/padmanabha-das-59bb2019b/)
[![Email](https://img.shields.io/badge/Email-padmanabhadas9647@gmail.com-EA4335?logo=gmail)](mailto:padmanabhadas9647@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-padmanabha.dev-4285F4?logo=google-chrome)](https://padmanabha-portfolio.vercel.app)

**Full-Stack Developer** | **AI Integration Specialist**

</div>

---

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible React framework 🚀
- **Vercel** - For seamless hosting and deployment ☁️
- **VAPI** - For cutting-edge voice AI technology 🎙️
- **Supabase** - For the powerful open-source Firebase alternative 🗄️
- **Clerk** - For hassle-free authentication 🔐
- **Tailwind Labs** - For utility-first CSS framework 🎨
- **Framer** - For smooth animation library 🌊
- **Sentry** - For production monitoring and debugging 🐛
- **Open Source Community** - For endless inspiration and support 💙

---

## ⭐ Show Your Support

If you found this project helpful or learned something new, please consider:

- ⭐ **Starring** this repository
- 🐛 **Reporting bugs** via [Issues](https://github.com/chayan-1906/IntelliCourse-Next.js/issues)
- 💬 **Sharing feedback** and suggestions
- 🤝 **Contributing** to the codebase

---

<div align="center">

### 🎓 **Made with ❤️ and Next.js by Padmanabha Das**

**Revolutionizing education through AI-powered voice learning**

[![Visitors](https://api.visitorbadge.io/api/visitors?path=chayan-1906%2FIntelliCourse-Next.js&label=Visitors&labelColor=%23697689&countColor=%232ccce4)](https://visitorbadge.io/status?path=chayan-1906%2FIntelliCourse-Next.js)
[![Stars](https://img.shields.io/github/stars/chayan-1906/IntelliCourse-Next.js?style=social)](https://github.com/chayan-1906/IntelliCourse-Next.js/stargazers)
[![Forks](https://img.shields.io/github/forks/chayan-1906/IntelliCourse-Next.js?style=social)](https://github.com/chayan-1906/IntelliCourse-Next.js/network/members)

</div>
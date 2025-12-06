# 🎓 IntelliCourse - Voice AI Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.7-000000.svg?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.0-3ECF8E.svg?logo=supabase)](https://supabase.com/)
[![VAPI](https://img.shields.io/badge/VAPI-2.3.0-FF6B6B.svg)](https://vapi.ai/)
[![Clerk](https://img.shields.io/badge/Clerk-6.31.4-6C47FF.svg?logo=clerk)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Real-time voice AI conversations for education** 🎙️ Built with VAPI SDK, Next.js 15, and WebRTC. Learn through natural speech with AI tutors, track progress via GitHub-style heatmaps, and maintain learning streaks.

<div align="center">

### 🌐 [**Live Demo**](https://intelli-course.vercel.app) • 📖 [**VAPI Integration Guide**](./TECHNICAL.md) • 🐛 [Report Bug](https://github.com/chayan-1906/IntelliCourse-Next.js/issues)

<img src="https://raw.githubusercontent.com/chayan-1906/IntelliCourse-Next.js/master/public/images/logo.svg" alt="IntelliCourse Logo" width="120"/>

</div>

---

## 🎯 Why IntelliCourse?

Traditional learning platforms rely on text and video. **IntelliCourse** enables **conversational learning** through real-time voice AI—just like talking to a tutor. Built for developers interested in **voice AI integration**, **real-time audio streaming**, and **educational technology**.

### Technical Highlights

- 🎙️ **VAPI SDK Integration** - Real-time voice streaming with WebRTC, sub-200ms latency
- 🔄 **Live Transcription** - Speech-to-text conversion with conversation persistence
- 📊 **Analytics Engine** - GitHub-style activity heatmaps with streak gamification
- ⚡ **Next.js 15 + React 19** - Server Components, Turbopack, concurrent rendering
- 🎨 **Glassmorphism UI** - Modern design system with Tailwind CSS 4.0 + Framer Motion

**Best for:** Developers learning voice AI implementation, building EdTech products, or exploring conversational interfaces.

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/chayan-1906/IntelliCourse-Next.js.git
cd IntelliCourse-Next.js
npm install

# Configure environment (see .env.example)
cp .env.example .env

# Run development server
npm run dev
```

**Prerequisites:** Node.js 18+, accounts for [Supabase](https://supabase.com/), [Clerk](https://clerk.com/), and [VAPI](https://vapi.ai/)

📖 **[Complete Setup Guide](#-getting-started)** | 🔧 **[VAPI Integration Docs](./TECHNICAL.md)**

---

## ✨ Core Features

<table>
  <tr>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/93abea27-436d-4fde-bf95-31d918e4bbe9" alt="Voice Session" width="100%"/>
      <br/>
      <strong>🎙️ Real-Time Voice Sessions</strong>
      <br/>
      <em>Natural AI conversations with live transcription</em>
    </td>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/ea0c83be-6aa4-43ec-8f44-eaae68011562" alt="Heatmap" width="100%"/>
      <br/>
      <strong>📊 Activity Analytics</strong>
      <br/>
      <em>GitHub-style heatmaps & streak tracking</em>
    </td>
  </tr>
</table>

### 🎤 Voice AI Integration

- **VAPI SDK** - Real-time audio streaming via WebRTC with automatic reconnection
- **Custom AI Tutors** - Subject-specific companions (Math, Science, Coding, Languages, etc.)
- **Voice Customization** - Male/Female voices with Formal/Casual teaching styles
- **Live Transcription** - Full conversation capture with searchable history
- **Session Management** - Auto-save with duration tracking and analytics

📖 **[Read the VAPI Integration Guide](./TECHNICAL.md)** - Learn how voice streaming, state management, and WebRTC connections work under the hood.

### 📈 Learning Analytics & Gamification

- **Activity Heatmap** - GitHub-style visualization (daily/weekly/monthly/yearly views)
- **Streak Counter** - Track learning consistency and longest streaks
- **Progress Dashboard** - Session history with export to CSV
- **Data Visualization** - Bar charts, calendar grids, and interactive tooltips

### 🎨 Modern UI/UX

- **Glassmorphism Design** - Frosted glass effects with backdrop blur
- **Subject Color Coding** - Visual distinction (Math: Yellow, Science: Purple, etc.)
- **Smooth Animations** - Framer Motion transitions + Lottie animations
- **Responsive Layout** - Mobile-first design with adaptive breakpoints

---

## 🏗️ Tech Stack

### Frontend

| Technology        | Version    | Purpose                                     |
|-------------------|------------|---------------------------------------------|
| **Next.js**       | `15.4.7`   | React framework with App Router, Turbopack  |
| **React**         | `19.1.0`   | UI with concurrent rendering                |
| **TypeScript**    | `5.x`      | Type-safe development                       |
| **Tailwind CSS**  | `4.0`      | Utility-first styling with custom system    |
| **Framer Motion** | `12.23.12` | Animation library for micro-interactions    |

### Voice AI & Backend

| Technology     | Version  | Purpose                                      |
|----------------|----------|----------------------------------------------|
| **VAPI SDK**   | `2.3.0`  | Real-time voice conversations via WebRTC     |
| **Supabase**   | `2.56.0` | PostgreSQL + real-time APIs + authentication |
| **Clerk**      | `6.31.4` | OAuth authentication & user management       |
| **Zod**        | `3.25.x` | Runtime validation for forms and APIs        |

### Developer Tools

- **Sentry** - Error tracking and performance monitoring
- **ESLint** - Code quality with Next.js config
- **Shadcn UI** - Accessible component system with Radix UI

---

## 📸 Screenshots

<div align="center">

### Dashboard Overview
<img src="https://github.com/user-attachments/assets/2e3982d8-9ec5-459a-9dfb-db4691fab799" alt="Dashboard" width="800"/>

<details>
<summary>📷 View More Screenshots</summary>

<table>
  <tr>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/987b6da1-952a-42ef-b7b1-aa0eab929bdd" alt="Companion Creation"/>
      <br/><strong>Companion Creation Form</strong>
    </td>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/bbb0d678-abd4-419e-bd05-cacff92475c0" alt="Loading"/>
      <br/><strong>Connecting Animation</strong>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/5bb5bb69-222d-44b2-ab32-83f1bd101e86" alt="Success"/>
      <br/><strong>Session Complete</strong>
    </td>
    <td width="50%" align="center">
      <img src="https://github.com/user-attachments/assets/723d382e-bd90-4ff1-b449-279eb1936dee" alt="Journey"/>
      <br/><strong>My Journey Dashboard</strong>
    </td>
  </tr>
</table>

</details>

</div>

---

## 🎓 Getting Started

### Prerequisites

- **Node.js** 18.0+ ([Download](https://nodejs.org/))
- **npm** package manager
- **Accounts:** [Supabase](https://supabase.com/), [Clerk](https://clerk.com/), [VAPI](https://vapi.ai/)

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/chayan-1906/IntelliCourse-Next.js.git
   cd IntelliCourse-Next.js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env` file:
   ```bash
   cp .env.example .env
   ```

   Add your credentials:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # VAPI
   NEXT_PUBLIC_VAPI_WEB_TOKEN=xxxxx-xxxxx-xxxxx-xxxxx
   
   # Sentry (Optional)
   SENTRY_AUTH_TOKEN=xxxxx
   ```

4. **Set up Supabase database**

   Run in Supabase SQL Editor:
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
   
   -- Create policies
   CREATE POLICY "Enable read for all users" ON companions FOR SELECT USING (true);
   CREATE POLICY "Enable insert for authenticated users" ON companions FOR INSERT WITH CHECK (true);
   ```

5. **Configure VAPI**

   In your VAPI dashboard:
   - Create a new assistant
   - Set voice preferences (male/female)
   - Configure system prompts for tutoring
   - Enable transcription
   - Copy Web Token to `.env`

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open browser** → [http://localhost:3000](http://localhost:3000)

---

## 🔧 How It Works - Voice Session Flow

```
User Creates Companion
        ↓
Session Starts → VAPI SDK Initializes → WebRTC Connection
        ↓
Real-Time Audio Streaming ↔ Speech-to-Text Transcription
        ↓
Live Conversation State → Transcript Updates
        ↓
Session Ends → Save to Supabase → Update Analytics
        ↓
Heatmap + Streak Counter + History Updated
```

**Want to learn more?** Read the **[VAPI Integration Guide](./TECHNICAL.md)** for implementation details, code examples, and architecture diagrams.

---

## 🏛️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Next.js 15  │  │  React 19    │  │ Tailwind CSS │   │
│  │  App Router  │  │  Components  │  │  Styling     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Authentication Layer                   │
│                  ┌──────────────┐                       │
│                  │  Clerk Auth  │                       │
│                  │  OAuth 2.0   │                       │
│                  └──────────────┘                       │
└─────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│    Voice AI Layer        │  │    Database Layer        │
│  ┌────────────────────┐  │  │  ┌────────────────────┐  │
│  │  VAPI SDK          │  │  │  │  Supabase          │  │
│  │  - Voice Recognition│  │  │  │  - PostgreSQL DB  │  │
│  │  - Text-to-Speech  │  │  │  │  - Real-time APIs  │  │
│  │  - Conversation AI │  │  │  │  - Storage Buckets │  │
│  └────────────────────┘  │  │  └────────────────────┘  │
└──────────────────────────┘  └──────────────────────────┘
              │                           │
              └─────────────┬─────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Monitoring Layer                       │
│                  ┌──────────────┐                       │
│                  │    Sentry    │                       │
│                  │  Error/Perf  │                       │
│                  └──────────────┘                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
IntelliCourse-Next.js/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── companions/         # Companion CRUD pages
│   │   ├── my-journey/         # Analytics dashboard
│   │   └── api/                # API routes
│   ├── components/             # React components
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── CompanionComponent.tsx  # Voice session handler
│   │   ├── ActivityHeatmap.tsx     # Analytics visualization
│   │   └── ...
│   ├── lib/
│   │   ├── actions/            # Server actions
│   │   ├── supabase.ts         # Database client
│   │   └── vapi.sdk.ts         # VAPI integration
│   └── types/                  # TypeScript definitions
├── public/
│   ├── animations/             # Lottie JSON files
│   └── icons/                  # SVG assets
└── README.md
```

---

## 🎨 Design System

### Subject Color Palette

```css
Science:   #E5D0FF (Purple)
Maths:     #FFDA6E (Yellow)
Language:  #BDE7FF (Blue)
Coding:    #FFC8E4 (Pink)
History:   #FFECC8 (Beige)
Economics: #C8FFDF (Green)
```

### Glassmorphism Theme

- **Backdrop Blur:** `backdrop-blur-lg`
- **Border:** `border border-white/20`
- **Background:** `bg-white/10`
- **Shadow:** Layered shadows for depth

---

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy!

**Post-deployment:**
- Update Clerk redirect URLs with production domain
- Configure Sentry DSN for monitoring

---

## 🤝 Contributing

Contributions welcome! Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git checkout -b feature/amazing-feature
git commit -m 'feat: Add voice pause/resume'
git push origin feature/amazing-feature
```

Open a Pull Request with:
- Clear description of changes
- Screenshots (if UI changes)
- Test results

---

## 📊 Server Actions API

Key server actions in `companion.actions.ts`:

```typescript
// Companion Management
createCompanion(formData: CreateCompanion): Promise<Companion>
getAllCompanions(options: GetAllCompanions): Promise<Companion[]>
getCompanion(id: string): Promise<Companion>

// Session Management
addToSessionHistory(companionId: string): Promise<string>
updateSessionDuration(companionId: string, duration: number): Promise<void>
saveSessionTranscript(sessionId: string, transcript: string): Promise<void>

// Analytics
getHeatmapData(userId: string): Promise<HeatmapValue[]>
getUserStreakData(userId: string): Promise<StreakData>
```

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Summary**: Free to use, modify, and distribute with attribution.

---

## 👨‍💻 Author

<div align="center">

**Padmanabha Das** - Full-Stack Developer & AI Integration Specialist

[![GitHub](https://img.shields.io/badge/GitHub-@chayan--1906-181717?logo=github)](https://github.com/chayan-1906)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Padmanabha%20Das-0A66C2?logo=linkedin)](https://www.linkedin.com/in/padmanabha-das-59bb2019b/)
[![Email](https://img.shields.io/badge/Email-padmanabhadas9647@gmail.com-EA4335?logo=gmail)](mailto:padmanabhadas9647@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-padmanabha.dev-4285F4?logo=google-chrome)](https://padmanabha-portfolio.vercel.app)

</div>

---

## 🙏 Acknowledgments

Built with cutting-edge technologies:

- [Next.js](https://nextjs.org/) - React framework
- [VAPI](https://vapi.ai/) - Voice AI SDK
- [Supabase](https://supabase.com/) - Backend platform
- [Clerk](https://clerk.com/) - Authentication
- [Vercel](https://vercel.com/) - Hosting
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## ⭐ Support This Project

If you found this helpful:

- ⭐ **Star** this repository
- 🐛 **Report bugs** via [Issues](https://github.com/chayan-1906/IntelliCourse-Next.js/issues)
- 🤝 **Contribute** improvements
- 💬 **Share** with developers interested in voice AI

---

<div align="center">

### 🎓 **Built with ❤️ by Padmanabha Das**

**Exploring the future of voice-based education**

[![Visitors](https://api.visitorbadge.io/api/visitors?path=chayan-1906%2FIntelliCourse-Next.js&label=Visitors&labelColor=%23697689&countColor=%232ccce4)](https://visitorbadge.io/status?path=chayan-1906%2FIntelliCourse-Next.js)
[![Stars](https://img.shields.io/github/stars/chayan-1906/IntelliCourse-Next.js?style=social)](https://github.com/chayan-1906/IntelliCourse-Next.js/stargazers)
[![Forks](https://img.shields.io/github/forks/chayan-1906/IntelliCourse-Next.js?style=social)](https://github.com/chayan-1906/IntelliCourse-Next.js/network/members)

</div>

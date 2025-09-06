# 🎓 IntelliCourse - AI-Powered Learning Companion Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-000000.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Clerk-6.31.4-6C47FF.svg)](https://clerk.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.0-3ECF8E.svg)](https://supabase.com/)
[![VAPI](https://img.shields.io/badge/VAPI-2.3.0-FF6B6B.svg)](https://vapi.ai/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4.svg)](https://tailwindcss.com/)

> Personalized AI learning companions for interactive voice-based education. Build custom tutors, engage in natural conversations, and learn through personalized voice interactions across multiple subjects.

<img src="https://raw.githubusercontent.com/chayan-1906/IntelliCourse-Next.js/v1-basic-platform/public/images/logo.svg" alt="logo" width="150"/>

## ✨ Features

- 🤖 **AI Learning Companions** - Create personalized tutors for different subjects 🎯
- 🗣️ **Voice Interactions** - Natural voice conversations with VAPI integration 🎤
- 🎨 **Subject Variety** - Math, Science, Language, History, Coding, Economics 📚
- 🔐 **Secure Authentication** - Clerk-powered user management 🛡️
- 📊 **Progress Tracking** - Session history and learning analytics 📈
- 🎭 **Personality Customization** - Choose companion style and voice 🎪
- 📱 **Responsive Design** - Seamless experience across all devices 📺
- 🔖 **Bookmarking System** - Save favorite learning companions ❤️
- 🌈 **Subject-Based Theming** - Color-coded learning experience 🎨
- ⚡ **Real-time Transcription** - Live conversation tracking 📝

## 📱 Screenshots

<table>
    <tr>
        <td align="center">
            <strong>Home Screen</strong><br/>
            <img src="https://github.com/user-attachments/assets/6f7e3763-4c4c-490a-b736-ab17efd41182" alt="Home Screen" width="480px"/>
        </td>
        <td align="center">
            <strong>Companions Library</strong><br/>
            <img src="https://github.com/user-attachments/assets/a34c7898-d392-4707-a757-632ac6777edb" alt="Companions Library" width="480px"/>
        </td>
    </tr>
    <tr>
        <td align="center">
            <strong>Search Companion</strong><br/>
            <img src="https://github.com/user-attachments/assets/6953a654-e144-4ec2-b43b-3efeaeec67ee" alt="Search Companion" width="480px"/>
        </td>
        <td align="center">
            <strong>Create Companion</strong><br/>
            <img src="https://github.com/user-attachments/assets/6a7dc561-003f-4cfb-ba30-61be8f28c391" alt="Create Companion" width="480px"/>
        </td>
    </tr>
    <tr>
        <td align="center">
            <strong>Learning Session</strong><br/>
            <img src="https://github.com/user-attachments/assets/e1324717-77cc-4e10-b950-9cafafe1204a" alt="Learning Session" width="480px"/>
        </td>
        <td align="center">
            <strong>Subscription Plans</strong><br/>
            <img src="https://github.com/user-attachments/assets/d76d2d1b-5fa1-44db-9db9-f718885a395b" alt="Subscription Plans" width="480px"/>
        </td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <strong>Learning Journey</strong><br/>
            <img src="https://github.com/user-attachments/assets/271deea3-ea32-4bbd-953c-6dcf1e33cc84" alt="Learning Journey" width="960px"/>
        </td>
    </tr>
</table>

## 🏗️ Tech Stack

### 🖥️ Frontend
- ⚛️ **Next.js** 15.4.6 - React framework with App Router 🚀
- 📘 **TypeScript** 5.x - Full type safety and enhanced DX 🛡️
- 🎨 **Tailwind CSS** 4.x - Modern utility-first CSS framework 💅
- 🎭 **Lottie React** 2.4.1 - Smooth animations and micro-interactions ✨

### 🔐 Authentication & Backend
- 🔒 **Clerk** 6.31.4 - Complete authentication solution 👤
- 🗄️ **Supabase** 2.56.0 - Backend-as-a-Service with real-time database 📊
- 🗣️ **VAPI** 2.3.0 - Voice AI platform for natural conversations 🎤

### 🎨 UI Components
- 🧩 **Shadcn UI** - Headless, accessible component primitives 🎯
- 📋 **React Hook Form** 7.62.0 - Performant form management 📝
- 🔍 **Lucide React** 0.539.0 - Beautiful icon library 🌟
- 🎨 **Class Variance Authority** 0.7.1 - Component styling variants 🎭

### 🛠️ Development Tools
- 📊 **Sentry** 10.7.0 - Error tracking and performance monitoring 🔍
- 🔧 **Zod** 3.25.76 - TypeScript-first schema validation 🛡️
- 🎨 **TW Animate CSS** 1.3.6 - Extended Tailwind animations ✨

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 🟢
- npm or yarn 📦
- Clerk account for authentication 🔐
- Supabase project for database 🗄️
- VAPI account for voice AI 🗣️

### Installation

1. **Clone repository** 📥
   ```bash
   git clone https://github.com/chayan-1906/IntelliCourse-Next.js.git
   cd IntelliCourse-Next.js
   git switch v1-basic-platform
   ```

2. **Install dependencies** 📦
   ```bash
   npm install
   ```

3. **Environment setup** ⚙️
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** 🔧
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # VAPI Voice AI
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id

   # Sentry (Optional)
   SENTRY_ORG=your_sentry_org
   SENTRY_PROJECT=your_sentry_project
   SENTRY_AUTH_TOKEN=your_sentry_auth_token
   ```

5. **Start development server** 🚀
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── app/                    	   # Next.js App Router
│   ├── api/                	   # API routes
│   ├── companions/         	   # Companion management pages
│   │   ├── [id]/         	       # Individual companion sessions
│   │   ├── new/          	       # Create new companion
│   │   └── page.tsx      	       # Companions library
│   ├── my-journey/        	       # User progress tracking
│   ├── sign-in/          	       # Authentication pages
│   ├── subscription/      	       # Subscription management
│   ├── layout.tsx        	       # Root layout
│   └── page.tsx          	       # Home page
├── components/            	       # Reusable UI components
│   ├── ui/               	       # Shadcn/UI components
│   ├── CompanionCard.tsx  	       # Companion display card
│   ├── CompanionComponent.tsx     # Voice interaction interface
│   ├── CompanionForm.tsx  	       # Companion creation form
│   ├── CompanionList.tsx  	       # Companions grid layout
│   ├── CTA.tsx           	       # Call-to-action component
│   ├── Navbar.tsx        	       # Navigation component
│   ├── NavItems.tsx      	       # Navigation items
│   ├── SearchInput.tsx   	       # Search functionality
│   └── SubjectFilter.tsx 	       # Subject filtering
├── config/                	       # Configuration files
│   ├── config.ts         	       # App configuration
│   └── navigation.ts     	       # Navigation constants
├── constants/             	       # Static data and constants
│   ├── icons.ts          	       # Icon mappings
│   ├── index.ts          	       # Subject definitions
│   └── soundwaves.json   	       # Lottie animation data
├── lib/                  	       # Utility libraries
│   ├── actions/          	       # Server actions
│   │   └── companion.actions.ts   # Companion CRUD operations
│   ├── routes.ts         	       # Route definitions
│   ├── supabase.ts       	       # Supabase client
│   ├── utils.ts          	       # Utility functions
│   └── vapi.sdk.ts       	       # VAPI integration
├── types/                	       # TypeScript type definitions
│   ├── companion.ts      	       # Companion-related types
│   ├── index.d.ts        	       # Global type declarations
│   ├── navigation.ts     	       # Navigation types
│   └── vapi.d.ts         	       # VAPI type definitions
└── middleware.ts         	       # Next.js middleware
```

## 🎯 Core Features

### 🤖 AI Learning Companions
- **Personalized Tutors** - Create companions with custom names, subjects, and personalities 🎭
- **Subject Expertise** - Math, Science, Language Arts, History, Coding, Economics 📚
- **Voice Personalities** - Choose between casual/formal and male/female voices 🗣️
- **Interactive Learning** - Natural conversation-based education 💬

### 🗣️ Voice Interaction System
- **VAPI Integration** - Advanced voice AI for natural conversations 🎤
- **Real-time Transcription** - Live conversation tracking and history 📝
- **Voice Controls** - Microphone muting and session management 🎛️
- **Audio Feedback** - Visual sound waves and speaking indicators 🌊

### 📊 Learning Management
- **Session Tracking** - Monitor learning progress and session history 📈
- **Bookmarking** - Save favorite companions and topics ❤️
- **Duration Management** - Flexible session lengths (10-45 minutes) ⏱️
- **Subject Organization** - Color-coded learning categories 🌈

### 🎨 User Experience
- **Responsive Design** - Optimized for desktop and mobile devices 📱
- **Smooth Animations** - Lottie-powered micro-interactions ✨
- **Intuitive Navigation** - Easy-to-use interface design 🧭
- **Accessibility** - Screen reader compatible and keyboard navigation ♿

## 🗄️ Database Schema

### Companions Table
```typescript
{
  id: string              // Unique companion identifier
  name: string            // Companion display name
  topic: string           // Specific learning topic
  subject: string         // Subject category
  duration: number        // Session length in minutes
  style: string           // Personality style (casual/formal)
  voice: string           // Voice type (male/female)
  creator_id: string      // User who created the companion
  bookmarked: boolean     // User bookmark status
  created_at: timestamp   // Creation date
  updated_at: timestamp   // Last modification date
}
```

### Session History Table
```typescript
{
  id: string              // Unique session identifier
  companion_id: string    // Referenced companion
  user_id: string         // Session participant
  duration: number        // Actual session length
  transcript: text[]      // Conversation transcript
  session_date: timestamp // Session date and time
  completed: boolean      // Session completion status
}
```

## 🔧 API Routes

| Method   | Endpoint                | Description               | Auth  |
| -------- | ----------------------- | ------------------------- | ----- |
| `GET`    | `/api/companions`       | Get user companions       | ✅    |
| `POST`   | `/api/companions`       | Create new companion      | ✅    |
| `GET`    | `/api/companions/[id]`  | Get companion details     | ✅    |
| `PUT`    | `/api/companions/[id]`  | Update companion          | ✅    |
| `DELETE` | `/api/companions/[id]`  | Delete companion          | ✅    |
| `POST`   | `/api/sessions`         | Create learning session   | ✅    |
| `GET`    | `/api/sessions/history` | Get session history       | ✅    |
| `POST`   | `/api/bookmarks/toggle` | Toggle companion bookmark | ✅    |


## 🎨 Subject Categories

### 📚 Available Subjects
- 🧮 **Mathematics** - Algebra, Calculus, Geometry, Statistics
- 🔬 **Science** - Physics, Chemistry, Biology, Astronomy
- 📝 **Language Arts** - Literature, Grammar, Writing, Vocabulary
- 🏛️ **History** - World History, Ancient Civilizations, Modern Events
- 💻 **Coding** - Programming Concepts, Languages, Algorithms
- 💰 **Economics** - Microeconomics, Macroeconomics, Finance

### 🎭 Companion Personalities
- **Casual Style** - Friendly, relaxed, conversational approach
- **Formal Style** - Professional, structured, academic tone
- **Male Voices** - Deep, authoritative voice options
- **Female Voices** - Clear, engaging voice alternatives

## 🌟 Key Highlights

- **Production Ready** - Built with Next.js 15 and modern React patterns 🚀
- **Voice-First Learning** - Revolutionary approach to education through conversation 🗣️
- **Scalable Architecture** - Clean code structure with TypeScript 🏗️
- **Real-time Features** - Live transcription and voice feedback ⚡
- **Secure & Private** - Clerk authentication with session management 🔒
- **Mobile Optimized** - Responsive design for all screen sizes 📱

## 🔒 Security Features

- **Authentication** via Clerk with social login options 🔐
- **User Session Management** with secure token handling 🛡️
- **Data Privacy** with encrypted voice data transmission 🔒
- **Input Validation** using Zod schemas ✅
- **Error Monitoring** with Sentry integration 📊

## 📈 Performance Optimizations

- **Next.js App Router** for optimal page loading 🚀
- **Server Components** for reduced client-side JavaScript 🖥️
- **Image Optimization** with Next.js Image component 🖼️

## 🔧 Development Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Connect** GitHub repository 🔗
2. **Configure** environment variables ⚙️
3. **Deploy** automatically on push 🚀

### Environment Variables for Production
```env
# Required for all deployments
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_ASSISTANT_ID=

# Optional for monitoring
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

## 📋 Requirements

### System Requirements
- **Node.js:** ≥18.0.0 🟢
- **npm:** ≥8.0.0 📦
- **Memory:** 2GB RAM minimum 💾
- **Storage:** 1GB disk space 💿

### External Services
- **Clerk** account for authentication 🔐
- **Supabase** project for database 🗄️
- **VAPI** subscription for voice AI 🗣️
- **Sentry** account for monitoring (optional) 📊

## 🤝 Contributing

1. Fork the repository 🍴
2. Create feature branch (`git switch -c feature/amazing-feature`) 🌟
3. Commit changes (`git commit -m 'Add amazing feature'`) 💾
4. Push to branch (`git push origin feature/amazing-feature`) 🚀
5. Open Pull Request 📝

## 🐛 Known Issues

- VAPI connection may be slower on mobile networks 📱
- Microphone permissions required for voice features 🎤

## 📚 Learning Resources

- [VAPI Documentation](https://docs.vapi.ai/) - Voice AI integration guide 🗣️
- [Clerk Authentication](https://clerk.com/docs) - User management setup 🔐
- [Supabase Docs](https://supabase.com/docs) - Database and API reference 🗄️
- [Next.js Guide](https://nextjs.org/docs) - Framework documentation 📖

## 👨‍💻 Author

**Padmanabha Das**

<div align="center">

[![Email](https://img.shields.io/badge/Email-padmanabhadas9647@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:padmanabhadas9647@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-chayan--1906-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chayan-1906)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Padmanabha%20Das-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/padmanabha-das-59bb2019b/)

</div>

## 🌟 Show Your Support

Give a ⭐️ if this project helped you learn something new! 🙏

---

<div align="center">
  <p>Made with ❤️ by Padmanabha Das</p>
  <p>🎓 Revolutionizing education through AI-powered voice interactions</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>

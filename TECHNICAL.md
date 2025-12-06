# 🔧 VAPI Integration Technical Guide

> **Complete implementation guide for real-time voice AI in IntelliCourse**
> 
> This document explains the VAPI SDK integration architecture, WebRTC connection management, conversation state handling, and key implementation patterns for building voice-based learning applications.

---

## 📚 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [VAPI SDK Setup](#-vapi-sdk-setup)
- [Voice Session Lifecycle](#-voice-session-lifecycle)
- [State Management](#-state-management)
- [Real-Time Transcription](#-real-time-transcription)
- [Error Handling & Reconnection](#-error-handling--reconnection)
- [Performance Optimization](#-performance-optimization)
- [Challenges & Solutions](#-challenges--solutions)

---

## 🏗️ Architecture Overview

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              CompanionComponent.tsx                     │    │
│  │                                                         │    │
│  │  ┌──────────────┐      ┌──────────────┐                 │    │
│  │  │ User Audio   │ ───▶ │  VAPI SDK    │                 │    │
│  │  │ (Microphone) │      │  WebRTC      │                 │    │
│  │  └──────────────┘      └──────────────┘                 │    │
│  │                              │                          │    │
│  │                              ▼                          │    │
│  │                    ┌──────────────────┐                 │    │
│  │                    │ Conversation     │                 │    │
│  │                    │ State Manager    │                 │    │
│  │                    └──────────────────┘                 │    │
│  │                              │                          │    │
│  │          ┌───────────────────┼───────────────────┐      │    │
│  │          ▼                   ▼                   ▼      │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │    │
│  │  │Transcription│    │   Timer     │    │  UI State   │  │    │
│  │  │   Display   │    │   Tracker   │    │   Updates   │  │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VAPI Cloud Service                         │
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │   Speech     │ ───▶ │   AI Model   │ ───▶ │     TTS      │   │
│  │  Recognition │      │  Processing  │      │   Synthesis  │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Server Actions                            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           companion.actions.ts                           │   │
│  │                                                          │   │
│  │  • addToSessionHistory(companionId) → sessionId          │   │
│  │  • updateSessionDuration(sessionId, duration)            │   │
│  │  • saveSessionTranscript(sessionId, transcript)          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Supabase Database                           │
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │  companions  │      │session_history│     │  Real-Time   │   │
│  │    Table     │ ◀──▶ │    Table      │ ──▶ │Subscriptions │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Interaction Map

```typescript
// Component hierarchy and data flow
App Router (Next.js 15)
  └─ companions/[id]/page.tsx
      └─ CompanionComponent.tsx (Main Voice Handler)
          ├─ VAPI SDK (vapi.sdk.ts)
          │   ├─ start() → Establishes WebRTC connection
          │   ├─ stop() → Cleanly terminates session
          │   ├─ setMuted() → Controls microphone
          │   └─ Event Listeners:
          │       ├─ message → Handles transcription updates
          │       ├─ call-start → Session initialization
          │       ├─ call-end → Session cleanup
          │       └─ error → Error handling
          │
          ├─ State Management (useState/useEffect)
          │   ├─ isSessionActive (boolean)
          │   ├─ transcript (string)
          │   ├─ isMuted (boolean)
          │   ├─ sessionDuration (number)
          │   └─ sessionId (string | null)
          │
          └─ Server Actions Integration
              ├─ addToSessionHistory()
              ├─ updateSessionDuration()
              └─ saveSessionTranscript()
```

---

## ⚙️ VAPI SDK Setup

### 1. SDK Initialization (`lib/vapi.sdk.ts`)

```typescript
import Vapi from '@vapi-ai/web';

let vapiInstance: Vapi | null = null;

export const getVapiInstance = (): Vapi => {
  if (!vapiInstance) {
    const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
    
    if (!token) {
      throw new Error('VAPI Web Token not configured');
    }
    
    vapiInstance = new Vapi(token);
  }
  
  return vapiInstance;
};

export const destroyVapiInstance = () => {
  if (vapiInstance) {
    vapiInstance.stop();
    vapiInstance = null;
  }
};
```

**Key Design Decisions:**

- **Singleton Pattern:** Ensures only one VAPI instance exists (prevents duplicate WebRTC connections)
- **Lazy Initialization:** Instance created only when needed (reduces initial bundle size)
- **Cleanup Function:** `destroyVapiInstance()` for proper resource cleanup on unmount

### 2. Assistant Configuration

```typescript
// VAPI Assistant Configuration (vapi.ai dashboard)
{
  "model": {
    "provider": "openai",
    "model": "gpt-4",
    "temperature": 0.7,
    "systemPrompt": `You are an AI tutor specializing in {{subject}}.
    
    Teaching style: {{style}} (formal/casual)
    Topic focus: {{topic}}
    Session duration: {{duration}} minutes
    
    Guidelines:
    - Ask clarifying questions to gauge understanding
    - Provide examples when explaining concepts
    - Adapt complexity based on student responses
    - Encourage critical thinking
    - Summarize key points at the end`
  },
  "voice": {
    "provider": "elevenlabs",
    "voiceId": "{{voiceId}}", // Dynamically set based on user preference
    "stability": 0.5,
    "similarityBoost": 0.75
  },
  "transcriber": {
    "provider": "deepgram",
    "model": "nova-2",
    "language": "en"
  }
}
```

**Dynamic Prompt Injection:**

```typescript
// In CompanionComponent.tsx
const startVoiceSession = async (companion: Companion) => {
  const vapi = getVapiInstance();
  
  const assistantConfig = {
    ...baseConfig,
    model: {
      ...baseConfig.model,
      systemPrompt: baseConfig.model.systemPrompt
        .replace('{{subject}}', companion.subject)
        .replace('{{style}}', companion.style)
        .replace('{{topic}}', companion.topic)
        .replace('{{duration}}', companion.duration.toString())
    },
    voice: {
      ...baseConfig.voice,
      voiceId: companion.voice === 'male' ? MALE_VOICE_ID : FEMALE_VOICE_ID
    }
  };
  
  await vapi.start(assistantConfig);
};
```

---

## 🔄 Voice Session Lifecycle

### Complete Session Flow

```typescript
// CompanionComponent.tsx - Simplified lifecycle implementation

const CompanionComponent = ({ companion }: Props) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 1. SESSION START
  const handleStartSession = async () => {
    try {
      // Create session record in database
      const newSessionId = await addToSessionHistory(companion.id);
      setSessionId(newSessionId);
      
      // Initialize VAPI
      const vapi = getVapiInstance();
      
      // Attach event listeners
      vapi.on('message', handleTranscriptionUpdate);
      vapi.on('call-start', handleCallStart);
      vapi.on('call-end', handleCallEnd);
      vapi.on('error', handleError);
      
      // Start voice session
      await vapi.start(assistantConfig);
      
      // Start duration timer
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      
      setIsSessionActive(true);
    } catch (error) {
      console.error('Failed to start session:', error);
      // Cleanup partial state
      if (sessionId) {
        await cleanupFailedSession(sessionId);
      }
    }
  };
  
  // 2. TRANSCRIPTION UPDATES
  const handleTranscriptionUpdate = (message: any) => {
    if (message.type === 'transcript' && message.transcriptType === 'final') {
      const newText = message.transcript;
      const speaker = message.role; // 'user' or 'assistant'
      
      setTranscript(prev => 
        `${prev}\n[${speaker}]: ${newText}`
      );
    }
  };
  
  // 3. SESSION END
  const handleEndSession = async () => {
    try {
      // Stop VAPI
      const vapi = getVapiInstance();
      await vapi.stop();
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Save to database
      if (sessionId) {
        await updateSessionDuration(sessionId, duration);
        await saveSessionTranscript(sessionId, transcript);
      }
      
      // Cleanup state
      setIsSessionActive(false);
      setTranscript('');
      setSessionId(null);
      setDuration(0);
      
      // Remove event listeners
      vapi.off('message', handleTranscriptionUpdate);
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('error', handleError);
      
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSessionActive) {
        handleEndSession();
      }
      destroyVapiInstance();
    };
  }, [isSessionActive]);
  
  return (
    // UI components
  );
};
```

### Event Handling Deep Dive

```typescript
// Event Types and Handlers

interface VapiMessage {
  type: 'transcript' | 'function-call' | 'hang' | 'metadata';
  transcript?: string;
  transcriptType?: 'partial' | 'final';
  role?: 'user' | 'assistant';
  timestamp?: number;
}

// 1. Transcript Events
vapi.on('message', (message: VapiMessage) => {
  switch (message.type) {
    case 'transcript':
      if (message.transcriptType === 'final') {
        // Only store final (confirmed) transcriptions
        updateTranscript(message.transcript, message.role);
      } else if (message.transcriptType === 'partial') {
        // Show live partial transcripts (optional - for real-time feedback)
        showLiveTranscript(message.transcript);
      }
      break;
    
    case 'hang':
      // Handle when user stops speaking (silence detection)
      showThinkingIndicator();
      break;
      
    case 'metadata':
      // Session metadata (duration, token usage, etc.)
      logMetadata(message);
      break;
  }
});

// 2. Call State Events
vapi.on('call-start', () => {
  console.log('✅ Voice connection established');
  hideLoadingAnimation();
  showActiveIndicator();
});

vapi.on('call-end', () => {
  console.log('🛑 Voice connection ended');
  showCompletionAnimation();
});

// 3. Error Events
vapi.on('error', (error: Error) => {
  console.error('VAPI Error:', error);
  
  // Categorize errors for user-friendly messages
  if (error.message.includes('microphone')) {
    showError('Microphone access denied. Please enable permissions.');
  } else if (error.message.includes('network')) {
    showError('Network connection lost. Attempting to reconnect...');
    attemptReconnection();
  } else {
    showError('An unexpected error occurred. Please try again.');
  }
});
```

---

## 📊 State Management

### Conversation State Architecture

```typescript
// types/vapi.d.ts
export interface SessionState {
  id: string | null;
  isActive: boolean;
  isPaused: boolean;
  isMuted: boolean;
  startTime: Date | null;
  endTime: Date | null;
  duration: number; // seconds
  transcript: TranscriptEntry[];
  metadata: SessionMetadata;
}

export interface TranscriptEntry {
  id: string;
  speaker: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isFinal: boolean;
}

export interface SessionMetadata {
  companionId: string;
  userId: string;
  subject: string;
  topic: string;
  voiceType: 'male' | 'female';
  style: 'formal' | 'casual';
}

// components/CompanionComponent.tsx
const useSessionState = () => {
  const [state, setState] = useState<SessionState>({
    id: null,
    isActive: false,
    isPaused: false,
    isMuted: false,
    startTime: null,
    endTime: null,
    duration: 0,
    transcript: [],
    metadata: null
  });
  
  const actions = {
    startSession: (metadata: SessionMetadata) => {
      setState(prev => ({
        ...prev,
        isActive: true,
        startTime: new Date(),
        metadata
      }));
    },
    
    endSession: () => {
      setState(prev => ({
        ...prev,
        isActive: false,
        endTime: new Date()
      }));
    },
    
    addTranscript: (entry: Omit<TranscriptEntry, 'id'>) => {
      setState(prev => ({
        ...prev,
        transcript: [
          ...prev.transcript,
          { ...entry, id: crypto.randomUUID() }
        ]
      }));
    },
    
    toggleMute: () => {
      setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
      const vapi = getVapiInstance();
      vapi.setMuted(!state.isMuted);
    },
    
    updateDuration: (duration: number) => {
      setState(prev => ({ ...prev, duration }));
    }
  };
  
  return [state, actions] as const;
};
```

---

## 📝 Real-Time Transcription

### Handling Partial vs Final Transcripts

```typescript
const TranscriptDisplay = ({ transcript }: { transcript: TranscriptEntry[] }) => {
  const [liveTranscript, setLiveTranscript] = useState('');
  
  useEffect(() => {
    const vapi = getVapiInstance();
    
    const handleMessage = (message: VapiMessage) => {
      if (message.type === 'transcript') {
        if (message.transcriptType === 'partial') {
          // Show live typing effect
          setLiveTranscript(message.transcript);
        } else if (message.transcriptType === 'final') {
          // Clear live transcript (it's now in the permanent list)
          setLiveTranscript('');
        }
      }
    };
    
    vapi.on('message', handleMessage);
    return () => vapi.off('message', handleMessage);
  }, []);
  
  return (
    <div className="transcript-container">
      {/* Permanent transcript entries */}
      {transcript.map(entry => (
        <div key={entry.id} className={`message-${entry.speaker}`}>
          <span className="speaker">{entry.speaker}:</span>
          <span className="text">{entry.text}</span>
          <span className="time">
            {entry.timestamp.toLocaleTimeString()}
          </span>
        </div>
      ))}
      
      {/* Live partial transcript (typing indicator) */}
      {liveTranscript && (
        <div className="message-partial">
          <span className="speaker typing-indicator">typing...</span>
          <span className="text opacity-50">{liveTranscript}</span>
        </div>
      )}
    </div>
  );
};
```

### Transcript Persistence Strategy

```typescript
// Auto-save transcript every 30 seconds during active session
useEffect(() => {
  if (!isSessionActive || !sessionId) return;
  
  const autoSaveInterval = setInterval(async () => {
    const currentTranscript = transcript.map(t => 
      `[${t.speaker}]: ${t.text}`
    ).join('\n');
    
    try {
      await saveSessionTranscript(sessionId, currentTranscript);
      console.log('✅ Transcript auto-saved');
    } catch (error) {
      console.error('❌ Auto-save failed:', error);
    }
  }, 30000); // 30 seconds
  
  return () => clearInterval(autoSaveInterval);
}, [isSessionActive, sessionId, transcript]);
```

---

## 🛡️ Error Handling & Reconnection

### Robust Error Recovery

```typescript
const ERROR_TYPES = {
  MICROPHONE_DENIED: 'microphone_denied',
  NETWORK_FAILURE: 'network_failure',
  VAPI_ERROR: 'vapi_error',
  SESSION_TIMEOUT: 'session_timeout'
} as const;

const useErrorRecovery = () => {
  const [error, setError] = useState<string | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 3;
  
  const handleError = async (error: Error) => {
    // Categorize error
    const errorType = categorizeError(error);
    
    switch (errorType) {
      case ERROR_TYPES.MICROPHONE_DENIED:
        setError('Microphone access required. Please enable permissions.');
        // Don't retry - user action needed
        break;
        
      case ERROR_TYPES.NETWORK_FAILURE:
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          setError('Connection lost. Reconnecting...');
          await attemptReconnection();
        } else {
          setError('Unable to reconnect. Please check your internet connection.');
        }
        break;
        
      case ERROR_TYPES.VAPI_ERROR:
        setError('Voice service error. Please try again.');
        await cleanupSession();
        break;
        
      case ERROR_TYPES.SESSION_TIMEOUT:
        setError('Session timed out due to inactivity.');
        await saveAndCloseSession();
        break;
    }
  };
  
  const attemptReconnection = async () => {
    reconnectAttemptsRef.current++;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
      const vapi = getVapiInstance();
      await vapi.start(lastUsedConfig);
      
      reconnectAttemptsRef.current = 0; // Reset on success
      setError(null);
    } catch (error) {
      handleError(error as Error);
    }
  };
  
  return { error, handleError };
};

const categorizeError = (error: Error): string => {
  const message = error.message.toLowerCase();
  
  if (message.includes('microphone') || message.includes('permission')) {
    return ERROR_TYPES.MICROPHONE_DENIED;
  } else if (message.includes('network') || message.includes('connection')) {
    return ERROR_TYPES.NETWORK_FAILURE;
  } else if (message.includes('timeout') || message.includes('inactive')) {
    return ERROR_TYPES.SESSION_TIMEOUT;
  } else {
    return ERROR_TYPES.VAPI_ERROR;
  }
};
```

---

## ⚡ Performance Optimization

### 1. Lazy Loading VAPI SDK

```typescript
// Dynamic import to reduce initial bundle size
const loadVapiSDK = async () => {
  const { default: Vapi } = await import('@vapi-ai/web');
  return Vapi;
};

// Use in component
const handleStartSession = async () => {
  const Vapi = await loadVapiSDK();
  const vapi = new Vapi(token);
  // ... rest of logic
};
```

### 2. Debouncing Transcript Updates

```typescript
import { debounce } from 'lodash';

const debouncedTranscriptSave = debounce(async (sessionId, transcript) => {
  await saveSessionTranscript(sessionId, transcript);
}, 5000); // Save at most once per 5 seconds

// Use in component
useEffect(() => {
  if (transcript.length > 0 && sessionId) {
    debouncedTranscriptSave(sessionId, serializeTranscript(transcript));
  }
}, [transcript, sessionId]);
```

### 3. Optimized State Updates

```typescript
// Use functional updates to avoid stale closures
const addTranscriptEntry = useCallback((entry: TranscriptEntry) => {
  setTranscript(prev => {
    // Limit stored transcript to last 100 entries (prevent memory bloat)
    const updated = [...prev, entry];
    return updated.slice(-100);
  });
}, []);

// Memoize expensive computations
const transcriptWordCount = useMemo(() => {
  return transcript.reduce((count, entry) => 
    count + entry.text.split(' ').length, 0
  );
}, [transcript]);
```

---

## 🔧 Challenges & Solutions

### Challenge 1: WebRTC Connection Drops

**Problem:** Voice sessions occasionally drop on unstable networks.

**Solution:**
```typescript
// Implement connection quality monitoring
const useConnectionQuality = () => {
  const [quality, setQuality] = useState<'good' | 'poor' | 'disconnected'>('good');
  
  useEffect(() => {
    const vapi = getVapiInstance();
    let pingInterval: NodeJS.Timeout;
    
    const checkConnection = () => {
      const start = Date.now();
      
      // Send test message
      vapi.send({ type: 'ping' }).then(() => {
        const latency = Date.now() - start;
        
        if (latency < 200) {
          setQuality('good');
        } else if (latency < 500) {
          setQuality('poor');
          showLatencyWarning();
        } else {
          setQuality('disconnected');
          attemptReconnection();
        }
      }).catch(() => {
        setQuality('disconnected');
        handleConnectionLoss();
      });
    };
    
    pingInterval = setInterval(checkConnection, 10000); // Check every 10s
    
    return () => clearInterval(pingInterval);
  }, []);
  
  return quality;
};
```

### Challenge 2: Transcript Synchronization

**Problem:** Partial transcripts overlap with final transcripts, causing duplicates.

**Solution:**
```typescript
// Use a transcript buffer with deduplication
const TranscriptBuffer = () => {
  const [finalTranscripts, setFinalTranscripts] = useState<TranscriptEntry[]>([]);
  const [partialBuffer, setPartialBuffer] = useState<string>('');
  const lastFinalIdRef = useRef<string | null>(null);
  
  useEffect(() => {
    const vapi = getVapiInstance();
    
    const handleMessage = (message: VapiMessage) => {
      if (message.type !== 'transcript') return;
      
      if (message.transcriptType === 'final') {
        const entry: TranscriptEntry = {
          id: crypto.randomUUID(),
          speaker: message.role,
          text: message.transcript,
          timestamp: new Date(),
          isFinal: true
        };
        
        setFinalTranscripts(prev => [...prev, entry]);
        lastFinalIdRef.current = entry.id;
        setPartialBuffer(''); // Clear partial when final arrives
      } else if (message.transcriptType === 'partial') {
        // Only show partial if different from last final
        if (!finalTranscripts.some(t => t.text === message.transcript)) {
          setPartialBuffer(message.transcript);
        }
      }
    };
    
    vapi.on('message', handleMessage);
    return () => vapi.off('message', handleMessage);
  }, [finalTranscripts]);
  
  return { finalTranscripts, partialBuffer };
};
```

### Challenge 3: Session Recovery After Browser Refresh

**Problem:** Sessions lost if user accidentally refreshes the page.

**Solution:**
```typescript
// Store session state in sessionStorage for recovery
const persistSessionState = (state: SessionState) => {
  sessionStorage.setItem('vapi-session', JSON.stringify({
    sessionId: state.id,
    startTime: state.startTime?.toISOString(),
    companionId: state.metadata?.companionId,
    transcript: state.transcript
  }));
};

const recoverSessionState = (): Partial<SessionState> | null => {
  const stored = sessionStorage.getItem('vapi-session');
  if (!stored) return null;
  
  try {
    const parsed = JSON.parse(stored);
    return {
      id: parsed.sessionId,
      startTime: new Date(parsed.startTime),
      transcript: parsed.transcript
    };
  } catch {
    return null;
  }
};

// Use in component
useEffect(() => {
  const recovered = recoverSessionState();
  if (recovered) {
    const shouldResume = confirm(
      'Detected an interrupted session. Would you like to resume?'
    );
    
    if (shouldResume) {
      resumeSession(recovered);
    } else {
      sessionStorage.removeItem('vapi-session');
    }
  }
}, []);
```

---

## 🎯 Best Practices Summary

### Do's ✅

1. **Always cleanup on unmount** - Call `vapi.stop()` and remove event listeners
2. **Validate microphone permissions** before starting session
3. **Implement auto-save** for transcripts (prevent data loss)
4. **Use final transcripts only** for database storage
5. **Monitor connection quality** and provide user feedback
6. **Debounce frequent updates** to avoid excessive re-renders
7. **Implement error boundaries** around VAPI components
8. **Test on mobile devices** (Safari has stricter WebRTC policies)

### Don'ts ❌

1. **Don't create multiple VAPI instances** - Use singleton pattern
2. **Don't block UI during initialization** - Show loading states
3. **Don't store credentials client-side** - Use environment variables
4. **Don't ignore error events** - Always handle and log errors
5. **Don't assume session will complete** - Implement timeout handlers
6. **Don't skip cleanup logic** - Memory leaks are common
7. **Don't hardcode assistant configs** - Use dynamic prompt injection

---

## 📚 Additional Resources

- **VAPI Documentation:** [https://docs.vapi.ai](https://docs.vapi.ai)
- **WebRTC Fundamentals:** [MDN WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- **Next.js Server Actions:** [Next.js Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- **Supabase Real-time:** [Supabase Real-time Docs](https://supabase.com/docs/guides/realtime)

---

## 🤝 Contributing

Found issues or have improvements? Open a PR or issue on the main repository!

---

<div align="center">

**Built with ❤️ by [Padmanabha Das](https://github.com/chayan-1906)**

[⬅️ Back to Main README](./README.md)

</div>

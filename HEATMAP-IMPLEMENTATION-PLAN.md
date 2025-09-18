# Learning Activity Heatmap Implementation Plan

## Overview

Implement a GitHub-style activity heatmap that visualizes user learning sessions over the past year. This feature will show daily learning activity with color intensity representing session
duration/count.

## Current State Analysis

### Existing Session Tracking

- `session_history` table exists in Supabase
- `addToSessionHistory()` function adds sessions
- `getUserSessions()` fetches user sessions
- Missing: `duration_minutes` column for tracking session length
- Missing: `completed_at` timestamp for accurate session end time

### Database Schema Updates Required

```sql
-- Add duration tracking to existing session_history table
ALTER TABLE session_history
    ADD COLUMN duration_minutes INTEGER DEFAULT 0,
ADD COLUMN completed_at TIMESTAMP;
```

## Implementation Plan

### Phase 1: Database Schema Updates ✅

**Files to modify:** None (SQL migration needed)
**Actions:**

1. ✅ Add `duration_minutes` column to `session_history` table
2. ✅ Add `completed_at` column to `session_history` table
3. ✅ Update existing records with default values if needed

### Phase 2: Type Definitions ✅

**File:** `src/types/index.d.ts`
**Actions:**

1. ✅ Create `ActivityHeatmapData` interface
2. ✅ Create `HeatmapValue` interface
3. ✅ Update existing session-related types if needed

```typescript
interface HeatmapValue {
	date: string; // Format: 'YYYY-MM-DD'
	count: number; // Session duration in minutes or session count
}

interface ActivityHeatmapData {
	values: HeatmapValue[];
	startDate: Date;
	endDate: Date;
}

interface SessionHistoryWithDuration {
	id: string;
	companion_id: string;
	user_id: string;
	created_at: string;
	duration_minutes?: number;
	completed_at?: string;
}
```

### Phase 3: Package Installation ✅

**Command:** `npm install react-calendar-heatmap react-tooltip`
**Dependencies:**

- ✅ `react-calendar-heatmap`: Main heatmap component
- ✅ `react-tooltip`: Tooltip functionality (used instead of @types)

### Phase 4: Database Actions Enhancement ✅

**File:** `src/lib/actions/companion.actions.ts`
**Actions:**

1. ✅ Create `getHeatmapData()` function to fetch aggregated session data
2. ✅ Create `updateSessionDuration()` function for completing sessions
3. ✅ Create `HeatmapSessionData` interface for proper typing

```typescript
// New functions to add:
const getHeatmapData = async (userId: string): Promise<HeatmapValue[]> => {
	// Fetch session data for the past year
	// Group by date and sum duration_minutes
	// Return formatted data for heatmap
}

const updateSessionDuration = async (sessionId: string, durationMinutes: number): Promise<void> => {
	// Update session with duration and completed_at timestamp
}
```

### Phase 5: ActivityHeatmap Component ✅

**File:** `src/components/ActivityHeatmap.tsx`
**Dependencies:**

- ✅ `react-calendar-heatmap`
- ✅ `react-calendar-heatmap/dist/styles.css`
- ✅ `react-tooltip` for tooltip functionality
- ✅ Custom CSS for theming

**Features:**

- ✅ GitHub-style calendar visualization
- ✅ Hover tooltips showing date and activity details
- ✅ Color intensity based on session duration
- ✅ Responsive design
- ✅ Loading and error states

```typescript
interface ActivityHeatmapProps {
	userId: string;
	className?: string;
}

// Color scale levels:
// - Empty: #ebedf0 (no activity)
// - Level 1: #9be9a8 (< 30 minutes)
// - Level 2: #40c463 (30-60 minutes)
// - Level 3: #30a14e (60-120 minutes)  
// - Level 4: #216e39 (> 120 minutes)
```

### Phase 6: Custom Styling ✅

**File:** `src/app/globals.css` (or component-specific CSS)
**Actions:**

1. ✅ Add custom color scheme for heatmap
2. ✅ Ensure responsive design
3. ✅ Add hover effects and animations
4. ✅ Match project's design system colors

```css
/* Heatmap custom styles */
.react-calendar-heatmap {
	/* Base styles */
}

.react-calendar-heatmap .color-empty {
	fill: #ebedf0;
}

.react-calendar-heatmap .color-scale-1 {
	fill: #9be9a8;
}

.react-calendar-heatmap .color-scale-2 {
	fill: #40c463;
}

.react-calendar-heatmap .color-scale-3 {
	fill: #30a14e;
}

.react-calendar-heatmap .color-scale-4 {
	fill: #216e39;
}

/* Tooltip styles */
.react-calendar-heatmap-tooltip {
	/* Custom tooltip styling */
}
```

### Phase 7: Integration Points ✅

**Files to modify:**

1. ✅ `src/app/my-journey/page.tsx` - Add heatmap to user dashboard
2. ✅ `src/components/AnimatedMyJourneyPage.tsx` - Include heatmap in journey page
3. ✅ Positioned between profile section and accordion sections

**Integration approach:**

- ✅ Add heatmap as a prominent section in the "My Journey" page
- ✅ Position it between profile and accordion sections
- ✅ Include section title: "Learning Activity"
- ✅ Add explanatory text about the visualization
- ✅ Added proper Framer Motion animations

### Phase 8: Session Duration Tracking Enhancement ✅

**Files to modify:**

1. ✅ `src/components/CompanionComponent.tsx` - Add session timer
2. ✅ VAPI integration points - Track when sessions start/end
3. ✅ Any existing session management logic

**Features to add:**

- ✅ Session timer display during learning sessions
- ✅ Automatic duration calculation
- ✅ Manual session completion
- ❌ Pause/resume functionality

## Technical Implementation Details

### Data Flow

1. ✅ User starts a learning session `addToSessionHistory()` creates entry
2. ✅ User completes session `updateSessionDuration()` adds duration
3. ✅ Dashboard loads `getHeatmapData()` aggregates data by date
4. ✅ ActivityHeatmap component renders visualization
5. ✅ User hovers Tooltip shows date and activity details

### Responsive Design

- Mobile: Smaller squares, scrollable horizontally
- Tablet: Medium squares, full width
- Desktop: Full GitHub-style layout

## Future Enhancements (Phase 2) 🔄

### Advanced Features 🔄

- Streak counter with visual indicators ✅
    - What it is: Display consecutive days of learning activity
    - Visual: Badge or counter showing "7-day streak" with flame/fire icons
    - Logic: Calculate longest current streak and display prominently
    - Motivation: Gamification to encourage daily learning habits
- Monthly/weekly view toggles 🔄
    - Views:
        - Weekly: Show last 12 weeks as bars
        - Monthly: Show last 12 months as calendar grid
        - Yearly: Current GitHub-style view
        - UI: Toggle buttons above heatmap
- Export heatmap as image ✅
    - What it is: Download heatmap as PNG/SVG for sharing
    - Use cases: Social media sharing, portfolio inclusion, progress reports
    - Implementation: Canvas rendering or SVG export
    - Button: "Export" or "Share" button near heatmap
- Subject-specific heatmaps
    - What it is: Filter heatmap by learning subject (Math, Science, etc.)
    - UI: Dropdown or tabs to select subject
    - Colors: Different color schemes per subject
    - Insights: See which subjects you study most consistently
- ❌ Goal setting and progress tracking
    - What it is: Set daily/weekly learning goals and track progress
    - Goals: "Study 30 minutes daily" or "Complete 5 sessions this week"
    - Visual: Progress bars, goal completion indicators
    - Notifications: Celebrate when goals are achieved

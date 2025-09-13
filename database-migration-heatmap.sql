-- Database Migration for Learning Activity Heatmap Feature
-- Execute this SQL in your Supabase SQL Editor

-- =====================================================
-- PHASE 1: Add duration tracking to session_history table
-- =====================================================

-- Add duration_minutes column to track session length
ALTER TABLE session_history
    ADD COLUMN IF NOT EXISTS duration_minutes INTEGER DEFAULT 0;

-- Add completed_at column to track when session ended
ALTER TABLE session_history
    ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;

-- Add comment to document the purpose of new columns
COMMENT
ON COLUMN session_history.duration_minutes IS 'Duration of the learning session in minutes';
COMMENT
ON COLUMN session_history.completed_at IS 'Timestamp when the session was completed';

-- =====================================================
-- OPTIONAL: Update existing records with default values
-- =====================================================

-- Set completed_at to created_at + 30 minutes for existing records (estimated session length)
-- This gives existing data some reasonable defaults for the heatmap
UPDATE session_history
SET completed_at = created_at + INTERVAL '30 minutes', duration_minutes = 30
WHERE completed_at IS NULL;

-- =====================================================
-- INDEXES for performance optimization
-- =====================================================

-- Create index on user_id and created_at for efficient heatmap queries
CREATE INDEX IF NOT EXISTS idx_session_history_user_date
    ON session_history (user_id, created_at);

-- Create index on user_id and duration for analytics
CREATE INDEX IF NOT EXISTS idx_session_history_user_duration
    ON session_history (user_id, duration_minutes)
    WHERE duration_minutes > 0;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if columns were added successfully
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'session_history'
  AND column_name IN ('duration_minutes', 'completed_at');

-- Check sample data after migration
SELECT id, user_id, created_at, completed_at, duration_minutes, companion_id
FROM session_history
ORDER BY created_at DESC LIMIT 5;

-- Count sessions with duration data
SELECT COUNT(*)                as total_sessions,
       COUNT(duration_minutes) as sessions_with_duration,
       AVG(duration_minutes)   as avg_duration_minutes
FROM session_history
WHERE duration_minutes > 0;
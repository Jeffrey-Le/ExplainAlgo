-- ExplainAlgo initial schema
-- Runs once on first postgres container start (dev only).
-- Production migrations are handled by Alembic.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       TEXT UNIQUE NOT NULL,
    hashed_pw   TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Algorithm progress per user
CREATE TABLE IF NOT EXISTS progress (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    algo_slug   TEXT NOT NULL,            -- e.g. "binary-search", "merge-sort"
    hints_used  INT NOT NULL DEFAULT 0,
    solved      BOOLEAN NOT NULL DEFAULT FALSE,
    last_seen   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, algo_slug)
);

-- Hint sessions (LangGraph turn history)
CREATE TABLE IF NOT EXISTS hint_sessions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    algo_slug   TEXT NOT NULL,
    turns       JSONB NOT NULL DEFAULT '[]',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_hint_sessions_user ON hint_sessions(user_id, algo_slug);

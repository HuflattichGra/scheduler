# Project Task Book (iOS MVP): Quadrant Anti-Procrastination App
## Codename: FocusQuadrant

## 0) Project Summary
Build a lightweight iOS-first app that helps users turn long, messy to-do lists into executable plans using:
1) Eisenhower Quadrants (Urgent/Important matrix),
2) Daily Top 3 limit,
3) 5-minute start timer,
4) 20-second evening review.

Primary goal: increase task start rate and completion rate for procrastination-prone users.

---

## 1) Tech Stack and Constraints

### Frontend (Mobile)
- React Native + Expo + TypeScript
- React Navigation (native-stack)
- Zustand (state)
- React Hook Form + Zod (forms/validation)
- Minimal UI components (no heavy design system for MVP)

### Backend (MVP Cloud API)
- Node.js + TypeScript + Express
- PostgreSQL + Prisma ORM
- Redis (optional for rate limiting/session/cache)
- JWT auth (email magic link can be added later; start with email+password)
- OpenAPI spec generated from routes (optional but preferred)

### Infra
- Dev: local Docker compose (postgres + redis + api)
- Deploy: Railway / Render / Fly.io (pick one)
- Mobile build: EAS (Expo Application Services)

### Non-Goals (MVP)
- Social features
- Calendar integrations
- AI decomposition in v1
- Complex analytics dashboards

---

## 2) Product Requirements (MVP Scope)

### Core Features
1. Import tasks from pasted text (multi-line parsing)
2. Assign tasks to 4 quadrants
3. Daily Top 3 selection (hard cap = 3)
4. 5-minute focus session
5. Evening review (done/blocker/tomorrow-first-step)
6. Auto-archive suggestion for stale tasks (inactive for 7 days)

### Quadrant Definitions
- UI: Urgent + Important
- UN: Urgent + Not Important
- NI: Not Urgent + Important
- NN: Not Urgent + Not Important

---

## 3) Data Model

### Shared Types
```ts
type Quadrant = 'UI' | 'UN' | 'NI' | 'NN';
type TaskStatus = 'todo' | 'doing' | 'done' | 'archived';
type Friction = 'unclear' | 'too_big' | 'perfectionism' | 'waiting';
Entities
Task {
  id: string (uuid)
  userId: string
  title: string
  note?: string
  quadrant: Quadrant
  status: TaskStatus
  nextAction?: string
  friction?: Friction
  dueAt?: Date
  lastActiveAt?: Date
  createdAt: Date
  updatedAt: Date
}

DailyPlan {
  id: string (uuid)
  userId: string
  date: string (YYYY-MM-DD, unique per user)
  top3TaskIds: string[] (length <= 3)
  createdAt: Date
  updatedAt: Date
}

ReviewLog {
  id: string (uuid)
  userId: string
  date: string (YYYY-MM-DD, unique per user)
  doneTaskIds: string[]
  blocker?: string
  tomorrowFirstStep?: string
  createdAt: Date
  updatedAt: Date
}

FocusSession {
  id: string (uuid)
  userId: string
  taskId?: string
  durationSec: number (default 300)
  startedAt: Date
  endedAt?: Date
  completed: boolean
}

4) API Contract (Backend)
Auth

POST /auth/register

POST /auth/login

GET /auth/me

Tasks

GET /tasks?status=&quadrant=&q=&page=&limit=

POST /tasks

POST /tasks/import (input: raw text)

PATCH /tasks/:id

PATCH /tasks/:id/move (quadrant change)

PATCH /tasks/:id/status

DELETE /tasks/:id

Daily Top 3

GET /daily-plan/:date

PUT /daily-plan/:date (top3TaskIds, enforce <= 3)

Review

GET /review/:date

PUT /review/:date

Focus

POST /focus/start

POST /focus/:id/finish

System

POST /maintenance/archive-suggestions (find tasks inactive >= 7d)

Validation Rules

title trimmed, non-empty, max 140 chars

nextAction max 200 chars

top3TaskIds unique and size <= 3

only owner can access/modify own data

5) Frontend Module Breakdown (Executable TODO)
FE-01 Project Bootstrap

 Create Expo TS app

 Configure absolute imports

 Add ESLint + Prettier + Husky + lint-staged

 Add env config for API base URL

 Setup React Navigation root stack + tab structure

FE-02 App Architecture

 Create folders: src/screens, src/components, src/store, src/services, src/domain, src/types

 Setup API client (axios/fetch wrapper with JWT interceptors)

 Setup Zustand stores:

authStore

taskStore

dailyPlanStore

reviewStore

focusStore

FE-03 Auth Screens

 Register screen

 Login screen

 Persist token securely (expo-secure-store)

 Guarded routes for authenticated users

FE-04 Inbox Import Screen

 Text area for pasted tasks

 Parse by newline/semicolon/bullets

 Preview parsed tasks count

 Submit to /tasks/import

 Error and empty-state handling

FE-05 Quadrant Board (Home)

 4 quadrant cards with counts

 Expand each card to list tasks

 Quick actions per task: move, mark done, edit

 “Add Task” modal

 “Set as Top3” action (disabled when cap reached)

FE-06 Today Top 3 Screen

 Render selected 3 tasks

 Drag reorder (optional)

 Remove/replace task

 Show completion progress (0/3, 1/3...)

 CTA button: Start 5-minute focus

FE-07 Focus Timer Screen

 Start 5-minute countdown (default 300s)

 Pause/resume/cancel

 On finish: mark session completed

 Prompt: “Continue 5 min” or “Mark task done”

FE-08 Evening Review Screen

 Date-based review form

 Select completed tasks

 Input blocker + tomorrow first step

 Save via /review/:date

 Confirmation toast

FE-09 Task Detail/Edit

 Edit title/note/quadrant/dueDate

 Set nextAction (required before Focus if task selected)

 Set friction tag

 Archive/unarchive

FE-10 UX Rules & Edge Cases

 Enforce Top3 cap in UI and service layer

 Prevent starting focus with invalid task selection

 Empty states for first-time users

 Offline fallback: queue writes and retry (basic)

FE-11 Telemetry (MVP)

 Emit events:

task_created

task_moved_quadrant

top3_set

focus_started

focus_completed

task_done

review_submitted

 Log provider abstraction (console first, replace later)

FE-12 Testing

 Unit tests for parser + validation

 Screen tests for Top3 cap and focus flow

 Basic e2e smoke (optional with Detox)

6) Backend Module Breakdown (Executable TODO)
BE-01 Bootstrap

 Init Node TS Express project

 Add Prisma + PostgreSQL

 Add Zod validation middleware

 Add centralized error handler

 Add request logger + CORS + helmet + rate limiting

BE-02 Auth

 User model + password hashing (bcrypt)

 JWT issue/verify middleware

 Register/login/me routes

 Auth integration tests

BE-03 Task APIs

 CRUD routes for tasks

 Import route: parse raw text server-side safely

 Query filters: status/quadrant/search/pagination

 Owner checks on all task operations

BE-04 Daily Plan APIs

 Upsert daily plan by date

 Enforce max Top3 at service layer

 Validate all task IDs belong to user

BE-05 Review APIs

 Upsert review by date

 Validate doneTaskIds ownership

 Return previous review if exists

BE-06 Focus APIs

 Start session endpoint

 Finish session endpoint

 Session duration + completed flag

BE-07 Maintenance Job

 Service to find tasks inactive >= 7 days

 Mark “archive suggestion” or soft archive (configurable)

 Expose admin-protected endpoint for MVP trigger

BE-08 Observability

 Health endpoint /healthz

 Structured logs

 Minimal metrics counters (requests/errors)

BE-09 Security Baseline

 Input sanitization + length checks

 JWT expiry + refresh strategy (simple v1: re-login)

 SQL injection protection via Prisma parameterization

 Basic abuse throttling on auth endpoints

BE-10 Tests

 Unit tests: parser/service rules

 Integration tests: auth, tasks, daily plan, review

 Contract tests for key endpoints

7) Definition of Done (Per Module)

A module is done only when:

Feature works in simulator on iOS

API route has validation + auth + tests

Error states and empty states are handled

Telemetry event is emitted for core actions

No TypeScript errors, lint passes, tests pass
8) Milestone Plan (14 Days)
Milestone 1 (Days 1-3)

FE bootstrap + BE bootstrap + auth + DB schema

Milestone 2 (Days 4-7)

Task import + quadrant board + task CRUD + APIs

Milestone 3 (Days 8-10)

Daily Top3 + focus timer + focus APIs

Milestone 4 (Days 11-12)

Evening review + review APIs + archive logic

Milestone 5 (Days 13-14)

QA, bugfix, telemetry check, TestFlight build

9) Acceptance Criteria (MVP)

User can paste 20+ tasks and import successfully

User can classify tasks into 4 quadrants

User cannot select more than 3 daily tasks

User can complete at least one 5-min focus session

User can submit evening review for a date

Basic analytics events are recorded

App works smoothly on iPhone 13+ simulator/device

10) Nice-to-Have (Post-MVP)

iCloud sync or Supabase sync

AI-assisted nextAction generation

Home screen widget: “Start 5 min”

Weekly reflection auto-summary
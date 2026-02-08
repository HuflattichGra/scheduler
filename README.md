# FocusQuadrant Monorepo (Module 01)

Project skeleton for the FocusQuadrant MVP.

## Packages
- `apps/mobile` (Expo React Native)
- `apps/api` (Express API)
- `packages/shared` (shared types/constants)

## CI-Ready Commands
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Local Setup
1) Install dependencies at repo root.
2) Copy env examples for mobile and api.

## How to run (Module 01)
- API dev server: `npm run dev -w apps/api`
- Mobile dev server: `npm run dev -w apps/mobile`

## How to test (Module 01)
- All tests: `npm run test`
- API tests: `npm run test -w apps/api`
- Mobile tests: `npm run test -w apps/mobile`
- Shared tests: `npm run test -w packages/shared`

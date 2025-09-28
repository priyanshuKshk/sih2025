# sih2025
# Farm Biosecurity Portal — Frontend and backend


This repo is a Vite + React + Tailwind starter for the Farm Biosecurity Portal.


## Setup
1. Install dependencies: `npm install` or `pnpm install`
2. Create `.env` from `.env.example` and set `VITE_API_URL` to your backend.
3. Start dev server: `npm run dev` (default port 5173)
4. Build: `npm run build`


## Notes
- The frontend expects a backend API matching `/api/auth/login`, `/api/auth/register`, `/api/farms` etc.
- Replace the minimal mock endpoints with your FastAPI backend when ready.
```
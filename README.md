Uber MVP - Full (Backend + Frontend)
This project contains:
- backend/ : Node.js Express API (simple file JSON storage)
- frontend/: React + Vite + Tailwind frontend

Quick start:
1. Backend:
   cd backend
   npm install
   npm start
   (Runs on http://localhost:3000)

2. Frontend:
   cd frontend
   npm install
   npm run dev
   (Vite will start, open the URL shown, typically http://localhost:5173)

Notes:
- The frontend expects the backend API on the same origin (/api/*). If running frontend on different port, configure proxy in vite.config or use full URLs.
- This is a prototype. For production: secure passwords, use JWT, real DB, HTTPS, CORS restrictions.

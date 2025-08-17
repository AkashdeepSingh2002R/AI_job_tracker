# Job Tracker (Rebuilt)

Fresh React + Vite + Tailwind app with localStorage auth, protected routes, job CRUD, and Netlify-ready config.

## Scripts
```bash
npm i
npm run dev
npm run build
npm run preview
```

## Features
- Register/Login (localStorage; non-throwing reducer; error toasts)
- Protected routes: /dashboard, /add, /profile, /edit/:id
- Jobs: add, edit, delete; search & status filter; counts; export JSON
- Responsive UI; fixed navbar with content offset
- Error-safe storage (no JSON.parse crashes)

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirects included in `netlify.toml`

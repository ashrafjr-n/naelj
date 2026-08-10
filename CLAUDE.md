# CLAUDE.md

## Project

Personal portfolio site. Frontend only, no backend/API.

## Stack

- React 19 + TypeScript
- Vite (dev server / bundler)
- Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — v4 is CSS-first)
- oxlint for linting

## Structure

```
index.html          entry HTML, mounts #root
src/main.tsx         React entry point
src/App.tsx           root component
src/index.css         Tailwind entry (`@import "tailwindcss";`)
src/assets/           static assets imported by components (empty for now)
public/               static files served as-is (favicon.svg)
vite.config.ts         Vite config (react + tailwindcss plugins)
```

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check (`tsc -b`) then build
- `npm run preview` — preview a production build
- `npm run lint` — run oxlint

## Notes

- No extra libraries beyond the base React/TypeScript/Tailwind setup are installed yet (no router, no state library, no UI kit).
- Styling is Tailwind utility classes directly in JSX; no CSS modules or separate per-component stylesheets.
- Git history/commits are managed manually by the user, not by tooling in this project.

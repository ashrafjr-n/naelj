# CLAUDE.md

## Project

Personal portfolio site. Frontend only, no backend/API.

## Stack

- React 19 + TypeScript
- Vite (dev server / bundler)
- Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — v4 is CSS-first)
- GSAP + ScrollTrigger for scroll-driven animation
- Icons: `lucide-react` (UI) and `@icons-pack/react-simple-icons` (brand marks — lucide 1.x has no brand icons)
- oxlint for linting

## Structure

```
index.html          entry HTML, mounts #root, loads Google Fonts
src/main.tsx         React entry point
src/App.tsx           root component, renders the Home page
src/index.css         Tailwind entry: theme tokens (`@theme`) + mask/grain utilities
src/pages/            page components (Home)
src/components/       section + presentational components
src/lib/              non-component helpers (gsap setup, N geometry)
src/assets/images/    portraits imported by components
public/               static files served as-is
vite.config.ts         Vite config (react + tailwindcss plugins)
```

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check (`tsc -b`) then build
- `npm run preview` — preview a production build
- `npm run lint` — run oxlint

## Notes
 
- No router, state library or UI kit is installed — the site is a single page.
- Styling is Tailwind utility classes directly in JSX; no CSS modules or separate per-component stylesheets. The only shared CSS lives in `src/index.css` (theme tokens plus a few gradient-mask utilities that are too long to inline).
- Desktop-only so far: no mobile/tablet breakpoints have been designed.
- GSAP work goes through `src/lib/gsap.ts` (registers ScrollTrigger once) and runs inside `gsap.context(..., rootRef)` with `ctx.revert()` on unmount.
- Git history/commits are managed manually by the user, not by tooling in this project.

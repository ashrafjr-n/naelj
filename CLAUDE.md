# CLAUDE.md

## Project

Personal portfolio site. Frontend only, no backend/API.

## Stack

- React 19 + TypeScript
- Vite (dev server / bundler)
- Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — v4 is CSS-first)
- GSAP + ScrollTrigger for scroll-driven animation
- React Router (`react-router-dom`) for multi-page routing
- Icons: `lucide-react` (UI) and `@icons-pack/react-simple-icons` (brand marks — lucide 1.x has no brand icons)
- oxlint for linting

## Structure

```
index.html          entry HTML, mounts #root, loads Google Fonts
src/main.tsx         React entry point
src/App.tsx           BrowserRouter + route table
src/index.css         Tailwind entry: theme tokens (`@theme`) + mask/grain utilities
src/pages/            page components (Home, AboutMe)
src/components/       section + presentational components, incl. Layout (shared chrome: Ambience + Header, wraps routed pages via <Outlet />)
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
 
- No state library or UI kit is installed. Routing is React Router (`BrowserRouter`, set up in `App.tsx`); every route renders inside `Layout` (`src/components/Layout.tsx`), which owns the shared `Ambience` background + fixed `Header` so page chrome isn't re-declared per page.
- The background (`bg-void` flat black + `Ambience`'s grain overlay) is the site-wide standard, established via `Layout` — don't re-add per-section background treatments.
- Header nav items must each resolve to something real: an actual route (`<Link to>`) once its page exists, or an explicit placeholder anchor (`href="#..."`) until it does. Never leave one wired to neither.
- Styling is Tailwind utility classes directly in JSX; no CSS modules or separate per-component stylesheets. The only shared CSS lives in `src/index.css` (theme tokens plus a few gradient-mask utilities that are too long to inline).
- Desktop-only so far: no mobile/tablet breakpoints have been designed.
- GSAP work goes through `src/lib/gsap.ts` (registers ScrollTrigger once) and runs inside `gsap.context(..., rootRef)` with `ctx.revert()` on unmount. Components with a *pinned* ScrollTrigger (`pin: true`) must set this up in `useLayoutEffect`, not `useEffect` — with routing now unmounting sections on navigation, `useEffect`'s deferred cleanup timing lets React try to remove a DOM node GSAP has already reparented into a pin-spacer, crashing the whole app (`removeChild` on a detached node). `useLayoutEffect` cleanup runs in time to revert the pin first. See `PortalScene.tsx`.
- Git history/commits are managed manually by the user, not by tooling in this project.

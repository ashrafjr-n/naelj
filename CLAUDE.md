read vibe.md now.
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
index.html          entry HTML, mounts #root, loads Google Fonts; SEO + link-preview (Open Graph/Twitter) tags, JSON-LD, favicons
src/main.tsx         React entry point
src/App.tsx           BrowserRouter + route table + first-visit Loader
src/index.css         Tailwind entry: theme tokens (`@theme`) + mask/grain utilities
src/pages/            page components (Home, AboutMe, Contact)
src/components/       section + presentational components, incl. Layout (shared chrome: Ambience + Header, wraps routed pages via <Outlet />)
src/lib/              non-component helpers (gsap setup, 99 geometry, useMediaQuery, contact email)
src/assets/images/    portraits imported by components
src/assets/nael-work-with/  company/channel logos, imported by PortalScene's works rail
public/               static files served as-is: favicon.svg (the 99 mark), PNG icons, og-image.png (1200×630 share card), site.webmanifest, robots.txt
.env                  VITE_SITE_URL — absolute site URL substituted into index.html's og:url/og:image (placeholder until the real domain is set)
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
- `Loader` (0→99 counter) renders once per site entry, above the router so route changes never re-show it; on screen 1.5–2.5s regardless of load speed.
- Header "Home" on Home smooth-scrolls to the top (a same-route `<Link>` alone does nothing).
- Per-page titles use React 19's hoisted `<title>` inside the page component (Home falls back to index.html's).
- Every `ContactButton` routes to `/contact`. The Contact page's form has no backend: submit opens the visitor's mail app via `mailto:` to `CONTACT_EMAIL` (`src/lib/contact.ts`).
- Home, AboutMe and Contact are responsive (tablet/mobile breakpoints designed, mostly at `lg`/`md`); other pages as they're built are still desktop-only until done. `useMediaQuery` (`src/lib/useMediaQuery.ts`) is for breakpoint logic that needs JS, not just Tailwind classes (e.g. Hero's portrait-centering effect, PortalScene's touch-vs-hover gallery trigger).
- GSAP work goes through `src/lib/gsap.ts` (registers ScrollTrigger once) and runs inside `gsap.context(..., rootRef)` with `ctx.revert()` on unmount. Components with a *pinned* ScrollTrigger (`pin: true`) must set this up in `useLayoutEffect`, not `useEffect` — with routing now unmounting sections on navigation, `useEffect`'s deferred cleanup timing lets React try to remove a DOM node GSAP has already reparented into a pin-spacer, crashing the whole app (`removeChild` on a detached node). `useLayoutEffect` cleanup runs in time to revert the pin first. See `PortalScene.tsx`. On touch devices PortalScene turns on `ScrollTrigger.normalizeScroll` (off again on unmount) and drops `anticipatePin` — without that the pin jumps on phones; its section is `h-svh` so nothing sits under the mobile browser toolbar.
- Claude handles git commits directly: commit as you go, in small increments (roughly 2-3 commits per task), only when there's an actual code change. Short commit messages (two to three words or a short phrase) with incremental versioning per task, e.g. "Since label — v1.0", "Since label — v1.1". Never push, and never switch away from `master`.

import { useEffect, useState } from "react"

// Tracks a CSS media query's match state, updating live on resize/rotation —
// used for breakpoint-driven behavior (not just styling) that Tailwind's
// responsive classes can't express, e.g. toggling a nav's open state.
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)

    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}

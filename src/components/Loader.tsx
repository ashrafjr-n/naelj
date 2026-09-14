import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/gsap"

// Timings (seconds). Total on screen is kept within [MIN_TOTAL, MAX_TOTAL]:
// the count runs to COUNT_TO fast, creeps while the page is still loading,
// then finishes to 99, holds, and fades out as one fixed-length tail.
const MIN_TOTAL = 1.5
const MAX_TOTAL = 2.5
const COUNT_FAST = 0.6
const COUNT_TO = 72
const FINISH = 0.35
const HOLD = 0.25
const EXIT = 0.35
const TAIL = FINISH + HOLD + EXIT

// Shown once per site entry (mounted above the router, so route changes
// never re-trigger it). Same flat void + grain as the site, with a 0→99
// counter in the 99 mark's teal gradient.
export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const number = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    const out = number.current
    if (!el || !out) return

    const html = document.documentElement
    html.style.overflow = "hidden"

    const count = { v: 0 }
    const render = () => {
      out.textContent = String(Math.round(count.v))
    }
    const started = performance.now()
    const elapsed = () => (performance.now() - started) / 1000

    const ctx = gsap.context(() => {
      const fast = prefersReducedMotion() ? 0 : COUNT_FAST
      gsap.to(count, { v: COUNT_TO, duration: fast, ease: "power2.out", onUpdate: render })
      // While waiting on the page, keep creeping so it never looks stalled.
      gsap.to(count, { v: 92, duration: MAX_TOTAL - TAIL - fast, delay: fast, ease: "sine.out", onUpdate: render })
    }, el)

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      ctx.add(() => {
        gsap.killTweensOf(count)
        gsap
          .timeline({ onComplete: onDone })
          .to(count, { v: 99, duration: FINISH, ease: "power2.out", onUpdate: render })
          .to(out, { scale: 1.06, opacity: 0, filter: "blur(6px)", duration: EXIT, ease: "power2.in" }, `+=${HOLD}`)
          .to(el, { opacity: 0, duration: EXIT, ease: "power2.in" }, "<")
      })
    }

    // Finish once the page has loaded, but never before MIN_TOTAL allows and
    // never later than MAX_TOTAL.
    // (+0.05: GSAP starts a timeline on its last tick, so it can end ~1 frame early.)
    const earliest = MIN_TOTAL - TAIL + 0.05
    const latest = MAX_TOTAL - TAIL
    const whenLoaded = () => {
      const wait = Math.max(0, earliest - elapsed())
      timers.push(window.setTimeout(finish, wait * 1000))
    }
    const timers = [window.setTimeout(finish, latest * 1000)]
    if (document.readyState === "complete") whenLoaded()
    else window.addEventListener("load", whenLoaded, { once: true })

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("load", whenLoaded)
      ctx.revert()
      html.style.overflow = ""
      // Unlocking can bring back a classic scrollbar and change layout width.
      ScrollTrigger.refresh()
    }
  }, [onDone])

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
    >
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      <span
        ref={number}
        aria-hidden="true"
        className="relative bg-[linear-gradient(135deg,#9fe8ee_0%,#4fbac5_32%,#0f7e89_66%,#063339_100%)] bg-clip-text font-semibold text-[clamp(6rem,28vw,13rem)] leading-none tracking-[-0.04em] text-transparent tabular-nums will-change-transform"
      >
        0
      </span>
    </div>
  )
}

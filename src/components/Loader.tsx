import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "../lib/gsap"

// Seconds. One steady count that eases into 99, a beat on 99, then out:
// 2.4s on paper, ~2.3s measured (first-load main-thread work advances GSAP's
// clock a little) — inside the required 1.5–2.5s whether the page loads fast
// or slow. (An earlier load-adaptive version front-loaded the count, so even
// at its 1.5s minimum the number itself was over in about a second.)
const COUNT = 1.6
const HOLD = 0.35
const EXIT = 0.45

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
    const ctx = gsap.context(() => {
      gsap
        .timeline({ onComplete: onDone })
        .to(count, {
          v: 99,
          duration: COUNT,
          ease: "sine.inOut",
          onUpdate: () => {
            out.textContent = String(Math.round(count.v))
          },
        })
        .to(out, { scale: 1.06, opacity: 0, filter: "blur(6px)", duration: EXIT, ease: "power2.in" }, `+=${HOLD}`)
        .to(el, { opacity: 0, duration: EXIT, ease: "power2.in" }, "<")
    }, el)

    return () => {
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

import { useEffect, useRef } from "react"
import type { MouseEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { gsap, prefersReducedMotion } from "../lib/gsap"

const EXPAND = 0.42

export default function ContactButton({
  label = "Contact",
  className = "",
}: {
  label?: string
  className?: string
}) {
  const root = useRef<HTMLAnchorElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const navigate = useNavigate()

  useEffect(() => () => void tl.current?.kill(), [])

  // Click: the teal dot floods the pill (covering the label) while the arrow
  // swings to point straight left, then navigates. The header copy of this
  // button outlives the route change, so it rewinds once the page has swapped.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    const el = root.current
    if (!el || tl.current?.isActive()) return
    if (prefersReducedMotion()) return navigate("/contact")

    const q = gsap.utils.selector(el)
    const [text] = q("[data-label]")
    const [fill] = q("[data-fill]")
    const [arrow] = q("[data-arrow]")
    const pill = el.getBoundingClientRect()
    const dot = fill.getBoundingClientRect()
    const dotX = dot.left + dot.width / 2
    const reach = Math.hypot(Math.max(dotX - pill.left, pill.right - dotX), pill.height / 2)

    tl.current?.kill()
    tl.current = gsap
      .timeline({ defaults: { duration: EXPAND, ease: "power3.inOut" } })
      .to(text, { opacity: 0, x: -10, duration: EXPAND * 0.5, ease: "power2.in" }, 0)
      .to(fill, { scale: (reach * 2) / dot.width + 0.1 }, 0)
      .to(arrow, { x: pill.left + pill.width / 2 - dotX, rotate: -135 }, 0)
      .call(() => navigate("/contact"), undefined, EXPAND + 0.05)
      .call(() => void tl.current?.timeScale(1.8).reverse(), undefined, EXPAND + 0.45)
  }

  return (
    <Link
      ref={root}
      to="/contact"
      onClick={onClick}
      className={`relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 py-1.5 pr-1.5 pl-5 text-[0.7rem] tracking-[0.28em] text-silver-100 uppercase ${className}`}
    >
      <span data-label>{label}</span>
      <span className="relative flex size-8 items-center justify-center text-ink">
        <span data-fill className="absolute inset-0 rounded-full bg-teal" />
        <span data-arrow className="relative flex">
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </span>
      </span>
    </Link>
  )
}

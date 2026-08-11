import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/gsap"
import { MARK_FOCUS } from "../lib/mark-76"
import Mark76 from "./Mark76"
import still from "../assets/images/nael-2.png"

const RAIL_BLOCKS = [132, 104, 156, 116, 140, 108, 128]

export default function PortalScene() {
  const root = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const mark = useRef<SVGSVGElement>(null)
  const plate = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const inside = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!

      /**
       * Every layer has to zoom about the same point in the scene — the gap
       * between the 7 and the 6 — otherwise the move reads as a scale-up
       * instead of a camera pushing forward. Origins are measured off
       * layout, so they survive a resize.
       */
      const alignOrigins = () => {
        const box = stage.current
        if (!box) return
        const fx = box.offsetLeft + box.offsetWidth * MARK_FOCUS.x
        const fy = box.offsetTop + box.offsetHeight * MARK_FOCUS.y

        gsap.set(mark.current, {
          transformOrigin: `${MARK_FOCUS.x * 100}% ${MARK_FOCUS.y * 100}%`,
        })
        for (const el of [scene.current, plate.current]) {
          if (!el) continue
          gsap.set(el, {
            transformOrigin: `${fx - el.offsetLeft}px ${fy - el.offsetTop}px`,
          })
        }
      }

      alignOrigins()
      ScrollTrigger.addEventListener("refresh", alignOrigins)
      const cleanup = () => ScrollTrigger.removeEventListener("refresh", alignOrigins)

      if (prefersReducedMotion()) return cleanup

      // Approach: the scene settles into place as the section arrives.
      gsap.from(q("[data-approach]"), {
        yPercent: 9,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      })

      // Push through: scrubbed to scroll, pinned so the camera keeps moving.
      gsap
        .timeline({
          defaults: { ease: "power4.in" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
          },
        })
        .to(scene.current, { scale: 1.5, opacity: 0, ease: "power2.in", duration: 0.62 }, 0)
        .to(plate.current, { scale: 22, duration: 1 }, 0)
        .to(mark.current, { scale: 30, duration: 1, force3D: false }, 0)
        // The teal surface slides out of the light as the camera passes it.
        .to(mark.current, { opacity: 0, ease: "power1.in", duration: 0.36 }, 0.48)
        .to(backdrop.current, { opacity: 1, ease: "none", duration: 0.3 }, 0.5)
        .fromTo(
          inside.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 0.18 },
          0.82,
        )

      return cleanup
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-void pt-[var(--header-h)]"
    >
      <div ref={scene} className="absolute inset-0 z-10 will-change-transform">
        {/* Second portrait — desaturated down into the same darkness. */}
        <div
          data-approach
          className="mask-still absolute bottom-0 -left-[5vw] w-[32vw] opacity-[0.72]"
        >
          <img
            src={still}
            alt="Nael Ahmad Al-Jarabah on set"
            className="size-full object-cover brightness-[0.52] grayscale-[0.92] contrast-[1.12]"
          />
        </div>

        {/* Works rail — placeholder blocks, fading out toward the top. */}
        <div
          data-approach
          className="mask-rail absolute -top-[18vh] right-[7vw] flex h-[118vh] w-[19vw] flex-col justify-center gap-4"
        >
          {RAIL_BLOCKS.map((height, i) => (
            <div
              key={i}
              style={{ height }}
              className="w-full shrink-0 border border-white/[0.06] bg-gradient-to-br from-white/[0.028] via-white/[0.008] to-transparent"
            />
          ))}
        </div>
      </div>

      {/* The dark layer the letterform opens into. */}
      <div
        ref={plate}
        className="portal-plate pointer-events-none absolute top-1/2 left-1/2 z-20 size-[124vh] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      <div ref={backdrop} className="pointer-events-none absolute inset-0 z-20 bg-void opacity-0" />

      {/* Teal 76, masked out of a teal plate. */}
      <div
        ref={stage}
        className="pointer-events-none absolute top-1/2 left-1/2 z-30 aspect-[182/100] h-[46vh] -translate-x-1/2 -translate-y-1/2"
      >
        <Mark76 svgRef={mark} />
      </div>

      {/* Behind the 76 — content to be decided. */}
      <div
        ref={inside}
        className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-7 opacity-0"
      >
        <span className="h-px w-14 bg-white/15" />
        <p className="text-[0.62rem] tracking-[0.52em] text-silver-400 uppercase">
          Something new is being written
        </p>
      </div>
    </section>
  )
}

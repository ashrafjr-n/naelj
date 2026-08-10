import { useEffect, useLayoutEffect, useRef } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { gsap, prefersReducedMotion } from "../lib/gsap"
import SocialLinks from "./SocialLinks"
import portrait from "../assets/images/nael.png"

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const portraitBox = useRef<HTMLDivElement>(null)

  // Center the portrait on the text column's actual measured height, not the
  // raw viewport — recomputed on resize and once webfonts land, since the
  // clamp()'d headline changes the column's height.
  useLayoutEffect(() => {
    const alignPortrait = () => {
      const section = root.current
      const copyEl = copy.current
      const portraitEl = portraitBox.current
      if (!section || !copyEl || !portraitEl) return

      const sectionRect = section.getBoundingClientRect()
      const copyRect = copyEl.getBoundingClientRect()
      const centerY = copyRect.top - sectionRect.top + copyRect.height / 2
      portraitEl.style.top = `${centerY - portraitEl.getBoundingClientRect().height / 2}px`
    }

    alignPortrait()
    window.addEventListener("resize", alignPortrait)
    document.fonts?.ready.then(alignPortrait).catch(() => {})
    return () => window.removeEventListener("resize", alignPortrait)
  }, [])

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!

      if (!prefersReducedMotion()) {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q("[data-line] > span"), { yPercent: 118, duration: 1.6, stagger: 0.11 })
          .from(q("[data-fade]"), { opacity: 0, y: 16, duration: 1.4, stagger: 0.14 }, 0.55)
          .from(q("[data-portrait]"), { opacity: 0, scale: 1.02, duration: 2.2 }, 0.15)
      }

      // Scroll-linked drift: the hero recedes rather than ending, so the scene
      // reads as continuous into the section below.
      const scrub = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
      gsap.to(q("[data-copy]"), { y: -84, opacity: 0.18, ease: "none", scrollTrigger: scrub })
      gsap.to(q("[data-cue]"), {
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scrub, end: "18% top" },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative h-screen w-full">
      {/* Portrait — perfectly square, vertically centered on the copy block, static once its intro settles. */}
      <div
        ref={portraitBox}
        data-portrait
        className="absolute top-0 right-0 aspect-square w-[min(46vw,81vh)] will-change-transform"
      >
        <img
          src={portrait}
          alt="Nael Ahmad Al-Jarabah"
          className="size-full object-cover object-[54%_center] contrast-[1.04] saturate-[0.82]"
        />
        {/* Soft seam separating the portrait from the text column — depth, not a hard edge. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-black/25 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div ref={copy} data-copy className="pl-[8vw] will-change-transform">
          <h1 className="font-sans text-[clamp(3.6rem,6.4vw,7rem)] tracking-[-0.022em]">
            {["Nael Ahmad", "Al-Jarabah"].map((line, i) => (
              <span
                key={line}
                data-line
                className={`block overflow-hidden leading-[1.06] ${i > 0 ? "-mt-[0.16em]" : ""}`}
              >
                <span className="block bg-gradient-to-b from-silver-200 via-silver-300 to-silver-500 bg-clip-text text-transparent">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div data-fade className="mt-9 flex items-center gap-5">
            <span className="h-px w-12 bg-white/20" />
            <p className="text-[0.68rem] font-normal tracking-[0.42em] text-teal uppercase">
              Screenwriter · Director
            </p>
          </div>

          <div data-fade className="mt-14">
            <a
              href="mailto:hello@example.com"
              className="group inline-flex items-center gap-4 rounded-full border border-white/15 py-4 pr-5 pl-8 text-[0.66rem] tracking-[0.3em] text-silver-200 uppercase transition-colors duration-500 ease-out hover:border-white/70 hover:bg-silver-100 hover:text-ink"
            >
              Contact Now
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          <div data-fade className="mt-12">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div
        data-cue
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 text-silver-500"
      >
        <ArrowDown size={13} strokeWidth={1.25} />
        <span className="text-[0.6rem] tracking-[0.4em] uppercase">Scroll</span>
      </div>
    </section>
  )
}

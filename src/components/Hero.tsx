import { useEffect, useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "../lib/gsap"
import { useMediaQuery } from "../lib/useMediaQuery"
import ContactButton from "./ContactButton"
import SocialLinks from "./SocialLinks"
import portrait from "../assets/images/nael.png"

// Short factual details shown under the contact row — append more here later.
const EXPERIENCE_DETAILS = ["Experience since 1999."]

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const portraitBox = useRef<HTMLDivElement>(null)
  // Below lg the portrait and copy stack in normal flow instead of the
  // portrait being absolutely centered beside the copy column.
  const isDesktopLayout = useMediaQuery("(min-width: 1024px)")

  // Center the portrait on the text column's actual measured height, not the
  // raw viewport — recomputed on resize and once webfonts land, since the
  // clamp()'d headline changes the column's height. Only meaningful once the
  // portrait is absolutely positioned (desktop layout).
  useLayoutEffect(() => {
    const portraitEl = portraitBox.current
    if (!portraitEl) return

    if (!isDesktopLayout) {
      portraitEl.style.top = ""
      return
    }

    const alignPortrait = () => {
      const section = root.current
      const copyEl = copy.current
      if (!section || !copyEl) return

      const sectionRect = section.getBoundingClientRect()
      const copyRect = copyEl.getBoundingClientRect()
      const centerY = copyRect.top - sectionRect.top + copyRect.height / 2
      portraitEl.style.top = `${centerY - portraitEl.getBoundingClientRect().height / 2}px`
    }

    alignPortrait()
    window.addEventListener("resize", alignPortrait)
    document.fonts?.ready.then(alignPortrait).catch(() => {})
    return () => window.removeEventListener("resize", alignPortrait)
  }, [isDesktopLayout])

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
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative w-full bg-void pt-[calc(var(--header-h)+3rem)] pb-6 lg:h-screen lg:pt-[var(--header-h)] lg:pb-0"
    >
      {/* Portrait — perfectly square, vertically centered on the copy block on desktop; a static block above the copy when stacked. */}
      <div
        ref={portraitBox}
        data-portrait
        className="relative mx-auto aspect-square w-[70vw] max-w-sm overflow-hidden rounded-2xl will-change-transform lg:absolute lg:top-0 lg:right-[3vw] lg:mx-0 lg:w-[min(42vw,75vh)] lg:max-w-none"
      >
        <img
          src={portrait}
          alt="Nael Ahmad Al-Jarabah"
          className="size-full object-cover object-[54%_center] contrast-[1.04] saturate-[0.82]"
        />
        {/* Soft seam separating the portrait from the text column — depth, not a hard edge. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[6%] bg-gradient-to-r from-black/25 to-transparent lg:block" />
      </div>

      <div className="relative z-10 lg:flex lg:h-full lg:items-center">
        <div
          ref={copy}
          data-copy
          className="mt-10 px-[8vw] text-center will-change-transform lg:mt-0 lg:pl-[8vw] lg:pr-0 lg:text-left"
        >
          <h1 className="font-sans text-[clamp(2.4rem,11vw,3.6rem)] tracking-[-0.022em] lg:text-[clamp(3.6rem,6.4vw,7rem)]">
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

          <div data-fade className="mt-9 flex items-center justify-center gap-5 lg:justify-start">
            <span className="h-px w-12 bg-white/20" />
            <p className="text-[0.68rem] font-normal tracking-[0.42em] text-teal uppercase">
              Screenwriter · Director
            </p>
          </div>

          <div data-fade className="mt-14 flex items-center justify-center gap-6 lg:justify-start">
            <ContactButton href="mailto:hello@example.com" />
            <SocialLinks />
          </div>

          <p data-fade className="mt-6 text-[0.6rem] tracking-[0.1em] text-silver-500">
            {EXPERIENCE_DETAILS.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  )
}

import { useLayoutEffect, useRef, useState } from "react"
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/gsap"
import { useMediaQuery } from "../lib/useMediaQuery"
import { MARK_FOCUS } from "../lib/mark-99"
import Mark99 from "./Mark99"
import AccordionGallery, { type AccordionGalleryItem } from "./AccordionGallery"
import still from "../assets/images/nael-2.png"
import aboutMeImage from "../assets/images/pages-images/aboutme.jpeg"
import writerImage from "../assets/images/pages-images/writer.jpeg"
import animationImage from "../assets/images/pages-images/animation.png"
import campaignsImage from "../assets/images/pages-images/campaigns.jpg"
import aiArtistImage from "../assets/images/pages-images/ai.png"
import workshopsImage from "../assets/images/pages-images/workshops.jpeg"
import agbLogo from "../assets/nael-work-with/agb-logo.png"
import aljazeeraLogo from "../assets/nael-work-with/aljazeera.png"
import bara3emLogo from "../assets/nael-work-with/bara3em.png"
import belestankLogo from "../assets/nael-work-with/belestank.png"
import edenicLogo from "../assets/nael-work-with/edenic.png"
import jordantvLogo from "../assets/nael-work-with/jordantv.png"
import karameeshLogo from "../assets/nael-work-with/karameesh.png"
import omanLogo from "../assets/nael-work-with/oman.png"
import omantvLogo from "../assets/nael-work-with/omantv.png"
import waarLogo from "../assets/nael-work-with/waar.png"

const RAIL_COLUMN_A = [
  { src: agbLogo, alt: "AGB" },
  { src: aljazeeraLogo, alt: "Al Jazeera" },
  { src: bara3emLogo, alt: "Bara3em" },
  { src: belestankLogo, alt: "Belestank" },
  { src: edenicLogo, alt: "Edenic" },
]
const RAIL_COLUMN_B = [
  { src: jordantvLogo, alt: "Jordan TV" },
  { src: karameeshLogo, alt: "Karameesh" },
  { src: omanLogo, alt: "Oman" },
  { src: omantvLogo, alt: "Oman TV" },
  { src: waarLogo, alt: "Waar TV" },
]

// A rail strip loops via translate(-50%), so it renders two equal halves back
// to back. Each half repeats the logo list enough to outrun the longest rail.
// The strip must size to its content (h-max / w-max): if flex stretches it to
// the rail's box instead, -50% no longer equals one half and the loop jumps.
const railLoop = (logos: typeof RAIL_COLUMN_A) => {
  const half = Array.from({ length: 5 }, () => logos).flat()
  return [...half, ...half]
}

const RailStrip = ({ logos, className }: { logos: typeof RAIL_COLUMN_A; className: string }) => (
  <div className={`flex shrink-0 ${className}`}>
    {railLoop(logos).map((logo, i) => (
      <div key={i} className="flex h-20 w-28 shrink-0 items-center justify-center lg:h-24 lg:w-full">
        <img src={logo.src} alt={logo.alt} className="logo-silver h-14 w-full object-contain" />
      </div>
    ))}
  </div>
)

// Mirrors Header.tsx's NAV_LINKS, minus "Home" — same labels, same targets.
const GALLERY_ITEMS: AccordionGalleryItem[] = [
  { image: aboutMeImage, label: "About Me", link: "/about" },
  { image: writerImage, label: "Writer", link: "/#writer" },
  { image: animationImage, label: "Animation", link: "/#animation" },
  { image: campaignsImage, label: "Campaigns", link: "/#campaigns" },
  { image: aiArtistImage, label: "AI Artist", link: "/#ai-artist" },
  { image: workshopsImage, label: "Workshops", link: "/#workshops" },
]

export default function PortalScene() {
  const root = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const mark = useRef<SVGSVGElement>(null)
  const sinceLabel = useRef<HTMLParagraphElement>(null)
  const plate = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const inside = useRef<HTMLDivElement>(null)

  // Gallery height tracks the section's own rendered height (h-svh) minus
  // the fixed header and breathing room, so it fills the section the same
  // way every other Home section fills its viewport.
  const [galleryHeight, setGalleryHeight] = useState(560)
  // Hover-to-expand doesn't translate to touch — devices with no real hover
  // get a static stack of equal cards instead.
  const isTouchDevice = useMediaQuery("(hover: none)")

  useLayoutEffect(() => {
    const section = root.current
    if (!section) return

    const measure = () => {
      const headerH =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0
      setGalleryHeight(Math.max(320, section.clientHeight - headerH - 120))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(section)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    // Phones scroll on a separate thread from the pinned timeline, so the pin
    // jitters/jumps and the address bar resizes the viewport mid-pin. Taking
    // touch scroll onto the main thread keeps both in lockstep.
    const isTouch = ScrollTrigger.isTouch === 1
    if (isTouch) ScrollTrigger.normalizeScroll(true)

    const ctx = gsap.context((self) => {
      const q = self.selector!

      // Every layer has to zoom about the same point in the scene — the gap
      // between the two 9s — otherwise the move reads as a scale-up instead
      // of a camera pushing forward. Origins are measured off layout, so
      // they survive a resize.
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

      const approach = {
        trigger: root.current,
        start: "top bottom",
        end: "top top",
      }

      // Approach: the desktop side pieces settle into place as the section arrives.
      gsap.from(q("[data-approach]"), {
        yPercent: 9,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { ...approach, scrub: true },
      })

      // Entrance: the 99 rises out of a hairline, then "Since", then (mobile)
      // the Work With label draws open and the two logo rows glide in from
      // opposite sides. Only child wrappers are animated, never the elements
      // the pinned push-through below also tweens, so the two never fight.
      // The reveal is a feathered mask (a hard clip edge reads as the digits
      // being cut), driven through a proxy so it's fully removed once
      // revealed — any mask left on it would crop the mark's 30× zoom later.
      // It's an inner wrapper, not the stage: GSAP folds the stage's
      // -translate-1/2 centering into its own yPercent, which a y tween
      // would overwrite.
      const reveal = { p: 0 }
      const stageEl = q("[data-stage-reveal]")[0] as HTMLElement
      gsap
        .timeline({ scrollTrigger: { ...approach, scrub: 1 } })
        .fromTo(
          stageEl,
          { yPercent: 22, scale: 0.9, opacity: 0 },
          { yPercent: 0, scale: 1, opacity: 1, ease: "power3.out", duration: 0.7 },
          0,
        )
        .to(
          reveal,
          {
            p: 1,
            ease: "power2.out",
            duration: 0.6,
            onUpdate: () => {
              const edge = -45 + reveal.p * 145
              const mask = reveal.p < 1 ? `linear-gradient(to top, #000 ${edge}%, transparent ${edge + 45}%)` : ""
              stageEl.style.maskImage = mask
              stageEl.style.webkitMaskImage = mask
            },
          },
          0,
        )
        .from(q("[data-since]"), { yPercent: 110, opacity: 0, ease: "power3.out", duration: 0.4 }, 0.35)
        .from(q("[data-work-rule]"), { scaleX: 0, ease: "power2.out", duration: 0.4 }, 0.5)
        .from(
          q("[data-work-label]"),
          { opacity: 0, letterSpacing: "0.9em", ease: "power2.out", duration: 0.45 },
          0.5,
        )
        .from(q("[data-rail-row='a']"), { xPercent: 35, opacity: 0, ease: "power3.out", duration: 0.5 }, 0.58)
        .from(q("[data-rail-row='b']"), { xPercent: -35, opacity: 0, ease: "power3.out", duration: 0.5 }, 0.64)

      // Push through: scrubbed to scroll, pinned so the camera keeps moving.
      gsap
        .timeline({
          defaults: { ease: "power4.in" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            // Touch scroll is main-thread (normalizeScroll below), so there's
            // nothing to anticipate — pinning early there reads as a jump.
            anticipatePin: ScrollTrigger.isTouch === 1 ? 0 : 1,
            scrub: 0.6,
          },
        })
        .to(scene.current, { scale: 1.5, opacity: 0, ease: "power2.in", duration: 0.62 }, 0)
        .to(sinceLabel.current, { scale: 1.08, opacity: 0, ease: "power2.in", duration: 0.45 }, 0)
        .to(plate.current, { scale: 22, duration: 1 }, 0)
        .to(mark.current, { scale: 30, duration: 1, force3D: false }, 0)
        // The teal surface slides out of the light as the camera passes it.
        .to(mark.current, { opacity: 0, ease: "power1.in", duration: 0.36 }, 0.48)
        .to(backdrop.current, { opacity: 1, ease: "none", duration: 0.3 }, 0.5)
        .fromTo(
          inside.current,
          { opacity: 0, scale: 0.94, pointerEvents: "none" },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 0.18, pointerEvents: "auto" },
          0.82,
        )

      return cleanup
    }, root)

    return () => {
      ctx.revert()
      if (isTouch) ScrollTrigger.normalizeScroll(false)
    }
  }, [])

  return (
    <section
      ref={root}
      className="relative h-svh w-full overflow-hidden bg-void pt-[var(--header-h)]"
    >
      <div ref={scene} className="absolute inset-0 z-10 will-change-transform">
        {/* Second portrait — desaturated down into the same darkness. */}
        <div
          data-approach
          className="mask-still absolute bottom-0 -left-[5vw] hidden w-[32vw] opacity-[0.72] lg:block"
        >
          <img
            src={still}
            alt="Nael Ahmad Al-Jarabah on set"
            className="size-full object-cover brightness-[0.52] grayscale-[0.92] contrast-[1.12]"
          />
        </div>

        {/* Works rail (desktop) — two vertical logo strips scrolling opposite
            directions, fading out toward the top. */}
        <div
          data-approach
          className="mask-rail absolute -top-[18vh] right-[7vw] hidden h-[118vh] w-[19vw] gap-4 overflow-hidden lg:flex"
        >
          <RailStrip logos={RAIL_COLUMN_A} className="rail-scroll-down h-max w-1/2 flex-col" />
          <RailStrip logos={RAIL_COLUMN_B} className="rail-scroll-up h-max w-1/2 flex-col" />
        </div>

        {/* Mobile: spans from the 99's bottom edge (the stage's top-[32%]
            anchor plus half its height) to the section bottom — the Work
            With label centers in the gap, the two horizontal logo strips
            sit along the bottom, feathered at both sides. */}
        <div className="absolute inset-x-0 top-[calc(32%_+_min(23vh,22vw))] bottom-0 flex flex-col pb-[7vh] lg:hidden">
          <div className="flex flex-1 items-center justify-center gap-4 pt-[8vh]">
            <span data-work-rule className="h-px w-10 origin-right bg-white/20" />
            <p
              data-work-label
              className="text-[0.66rem] tracking-[0.42em] whitespace-nowrap text-silver-400 uppercase"
            >
              Work With
            </p>
            <span data-work-rule className="h-px w-10 origin-left bg-white/20" />
          </div>
          <div className="mask-rail-x flex flex-col gap-2 overflow-hidden">
            <div data-rail-row="a">
              <RailStrip logos={RAIL_COLUMN_A} className="rail-scroll-left w-max" />
            </div>
            <div data-rail-row="b">
              <RailStrip logos={RAIL_COLUMN_B} className="rail-scroll-right w-max" />
            </div>
          </div>
        </div>
      </div>

      {/* The dark layer the letterform opens into. Section stays a full
          viewport tall at every breakpoint — shrinking a *pinned*
          ScrollTrigger's own height (tried once, reverted) leaves the
          unpinned remainder showing blank void below it during the pin. It
          uses svh, not vh: a phone's 100vh runs under the browser toolbar. Compactness
          on mobile comes from sitting higher than dead center instead. */}
      <div
        ref={plate}
        className="portal-plate pointer-events-none absolute top-[32%] left-1/2 z-20 size-[min(124vh,120vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform lg:top-1/2"
      />
      <div ref={backdrop} className="pointer-events-none absolute inset-0 z-20 bg-void opacity-0" />

      {/* "Since", left-aligned above the mark to match the left 9's leading edge.
          Offsets are proportional to the mark's own h-[min(46vh,44vw)] sizing
          below (half-height, and half-width minus a small margin) so the two
          stay aligned instead of the label overflowing narrow viewports. The
          bottom anchor (68%/50%) mirrors the plate/stage's top anchor
          (32%/50%) so the label keeps sitting the same distance above the
          mark at both. */}
      <p
        ref={sinceLabel}
        className="pointer-events-none absolute overflow-hidden bottom-[calc(68%_+_min(23vh,22vw)_+_1.25rem)] left-1/2 z-30 -translate-x-[min(38vh,36vw)] text-[clamp(1.3rem,4.5vw,2.15rem)] font-medium tracking-[0.04em] whitespace-nowrap text-silver-500 lg:bottom-[calc(50%_+_min(23vh,22vw)_+_1.25rem)]"
      >
        <span data-since className="inline-block">
          Since
        </span>
      </p>

      {/* Teal 99, masked out of a teal plate. Height is bounded by both vh and
          vw so the mark (and its aspect-locked width) never overflows a
          narrow/portrait viewport the way a pure vh size would. */}
      <div
        ref={stage}
        className="pointer-events-none absolute top-[32%] left-1/2 z-30 aspect-[182/100] h-[min(46vh,44vw)] -translate-x-1/2 -translate-y-1/2 lg:top-1/2"
      >
        <div data-stage-reveal className="absolute inset-0">
          <Mark99 svgRef={mark} />
        </div>
      </div>

      {/* Behind the 99 — what the camera arrives at. */}
      <div
        ref={inside}
        className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center opacity-0"
      >
        <div className="w-[86vw]">
          <AccordionGallery
            items={GALLERY_ITEMS}
            defaultIndex={2}
            expandRatio={0.52}
            trigger={isTouchDevice ? "none" : "hover"}
            accentColor="#006570"
            overlayColor="#000000"
            textColor="#ffffff"
            grayscale
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={galleryHeight}
            gap={10}
            radius={16}
            orientation="horizontal"
          />
        </div>
      </div>
    </section>
  )
}

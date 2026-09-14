import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import heroWebm from "../assets/videos/hero.webm"
import heroMp4 from "../assets/videos/hero.mp4"
import heroPoster from "../assets/videos/hero-poster.webp"

export default function VideoHero() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [muted, setMuted] = useState(true)

  // Two signals decide playback together: the section is in/near the viewport,
  // and the section after it (the portrait) is under ~70% visible. Each
  // observer only fires on its own threshold crossing, so both must re-sync
  // from shared state — otherwise a pause from one is never undone when
  // scrolling back up.
  const nearViewport = useRef(false)
  const nextCovers = useRef(false)

  useEffect(() => {
    const el = root.current
    const nextSection = el?.nextElementSibling
    if (!el || !nextSection) return

    const sync = () => {
      const v = video.current
      if (!v) return
      if (nearViewport.current && !nextCovers.current) {
        if (v.paused) v.play().catch(() => {})
      } else {
        v.pause()
      }
    }

    // Lazy-load once the section is in or nearing the viewport.
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        nearViewport.current = entry.isIntersecting
        if (entry.isIntersecting) setInView(true)
        sync()
      },
      { rootMargin: "200px 0px" },
    )
    const nextObserver = new IntersectionObserver(
      ([entry]) => {
        nextCovers.current = entry.intersectionRatio >= 0.7
        sync()
      },
      { threshold: 0.7 },
    )
    sectionObserver.observe(el)
    nextObserver.observe(nextSection)
    return () => {
      sectionObserver.disconnect()
      nextObserver.disconnect()
    }
  }, [])

  // Browsers block autoplay-with-sound, so try unmuted first and fall back
  // to a muted autoplay the user can turn on via the sound control.
  useEffect(() => {
    if (!inView) return
    const v = video.current
    if (!v || nextCovers.current) return

    v.muted = false
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true
        setMuted(true)
        v.play().catch(() => {})
      })
  }, [inView])

  const toggleSound = () => {
    const v = video.current
    if (!v) return

    if (v.paused) {
      v.muted = false
      v.play()
        .then(() => setMuted(false))
        .catch(() => {
          v.muted = true
          setMuted(true)
          v.play().catch(() => {})
        })
      return
    }

    const next = !v.muted
    v.muted = next
    setMuted(next)
  }

  return (
    <section
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-void pt-[var(--header-h)]"
    >
      {inView && (
        <video
          ref={video}
          className="absolute inset-0 size-full object-cover"
          poster={heroPoster}
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          {/* WebM (VP9) is the lighter file; MP4 (H.264) covers browsers without VP9, e.g. older iOS Safari. */}
          <source src={heroWebm} type="video/webm" />
          <source src={heroMp4} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-[6vw] bottom-10 z-20 flex size-11 items-center justify-center rounded-full border border-white/15 text-silver-200 transition-colors duration-300 ease-out hover:border-teal/70 hover:text-teal"
      >
        {muted ? (
          <VolumeX size={16} strokeWidth={1.5} />
        ) : (
          <Volume2 size={16} strokeWidth={1.5} />
        )}
      </button>
    </section>
  )
}

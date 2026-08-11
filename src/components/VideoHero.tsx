import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { ScrollTrigger } from "../lib/gsap"
import heroVideo from "../assets/videos/hero.webm"

export default function VideoHero() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [muted, setMuted] = useState(true)

  // Lazy-load once the section is in or nearing the viewport. Scroll-driven
  // playback is owned entirely by the effect below; this only re-triggers
  // play() if the reader scrolls back up to the top after leaving.
  useEffect(() => {
    const el = root.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          video.current?.play().catch(() => {})
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Sole authority over scroll-driven playback: paused once the reader is
  // 70% through the section right after this one, resumed above that point.
  // Bidirectional so it stays the only thing deciding play state past
  // mount — a second independent pause call (previously in the observer
  // above) was firing far earlier than 70% with nothing to resume it.
  useEffect(() => {
    const nextSection = root.current?.nextElementSibling as HTMLElement | null
    if (!nextSection) return

    const trigger = ScrollTrigger.create({
      trigger: nextSection,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const v = video.current
        if (!v) return
        if (self.progress >= 0.7) {
          if (!v.paused) v.pause()
        } else if (v.paused) {
          v.play().catch(() => {})
        }
      },
    })

    return () => trigger.kill()
  }, [])

  // Browsers block autoplay-with-sound, so try unmuted first and fall back
  // to a muted autoplay the user can turn on via the sound control.
  useEffect(() => {
    if (!inView) return
    const v = video.current
    if (!v) return

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
          src={heroVideo}
          loop
          playsInline
          aria-hidden="true"
        />
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

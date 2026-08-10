import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import Header from "./Header"
import heroVideo from "../assets/videos/hero.webm"

export default function VideoHero() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [muted, setMuted] = useState(true)

  // Lazy-load once the section is in or nearing the viewport, then keep the
  // video (and its sound) paused while scrolled away and resumed on return.
  useEffect(() => {
    const el = root.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          video.current?.play().catch(() => {})
        } else {
          video.current?.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
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
    <section ref={root} className="relative h-screen w-full overflow-hidden bg-ink">
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
      <Header />

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

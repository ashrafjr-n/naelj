import Header from "./Header"
import heroVideo from "../assets/videos/hero.webm"

export default function VideoHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      <video
        className="absolute inset-0 size-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <Header />
    </section>
  )
}

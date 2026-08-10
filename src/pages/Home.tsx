import Ambience from "../components/Ambience"
import VideoHero from "../components/VideoHero"
import Hero from "../components/Hero"
import PortalScene from "../components/PortalScene"

export default function Home() {
  return (
    <main className="relative bg-ink">
      <Ambience />
      <div className="relative z-10">
        <VideoHero />
        <Hero />
        <PortalScene />
      </div>
    </main>
  )
}

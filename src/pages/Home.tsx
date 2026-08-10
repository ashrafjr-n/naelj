import Ambience from "../components/Ambience"
import Header from "../components/Header"
import VideoHero from "../components/VideoHero"
import Hero from "../components/Hero"
import PortalScene from "../components/PortalScene"

export default function Home() {
  return (
    <main className="relative bg-void">
      <Ambience />
      <div className="relative z-10">
        <Header />
        <VideoHero />
        <Hero />
        <PortalScene />
      </div>
    </main>
  )
}

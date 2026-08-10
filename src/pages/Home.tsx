import Ambience from "../components/Ambience"
import Hero from "../components/Hero"
import PortalScene from "../components/PortalScene"

export default function Home() {
  return (
    <main className="relative bg-ink">
      <Ambience />
      <div className="relative z-10">
        <Hero />
        <PortalScene />
      </div>
    </main>
  )
}

import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Ambience from "./Ambience"
import Header from "./Header"

// Shared page shell: the flat void background + grain (Ambience) and the
// fixed header are the site's standard chrome, so every route mounts inside
// this instead of re-declaring them per page.
export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <main className="relative bg-void">
      <Ambience />
      <div className="relative z-10">
        <Header />
        <Outlet />
      </div>
    </main>
  )
}

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import ContactButton from "./ContactButton"

// "/about" is a real route. The "/#section" items are placeholder anchors
// on sections that don't exist on Home yet — they resolve to Home without
// erroring, and become real in-page anchors once those sections are built.
// Every nav item must resolve to a real `to` — never leave one dangling.
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Writer", to: "/#writer" },
  { label: "Animation", to: "/#animation" },
  { label: "Campaigns", to: "/#campaigns" },
  { label: "AI Artist", to: "/#ai-artist" },
  { label: "Workshops", to: "/#workshops" },
]

const LINK_CLASS =
  "text-[0.7rem] tracking-[0.3em] text-silver-300 uppercase transition-colors duration-300 ease-out hover:text-silver-100"

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Navigating to "/" from another page already lands at the top (Layout),
  // but a same-route Link does nothing — so on Home, "Home" scrolls up itself.
  const onNavClick = (to: string) => {
    setOpen(false)
    if (to === "/" && pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/35 px-[6vw] py-4 backdrop-blur-md">
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-11 xl:gap-14">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <Link to={to} onClick={() => onNavClick(to)} className={LINK_CLASS}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="text-silver-200 transition-colors duration-300 ease-out hover:text-teal lg:hidden"
      >
        {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
      </button>

      <ContactButton className="lg:hidden" />

      {open && (
        <>
          {/* Transparent tap-out target — closes the panel without a full-screen scrim. */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default lg:hidden"
          />

          <nav className="absolute top-[calc(100%_+_0.5rem)] left-[6vw] z-50 w-48 rounded-2xl border border-white/10 bg-ink/35 py-3 shadow-2xl shadow-black/40 backdrop-blur-md lg:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => onNavClick(to)}
                    className="block px-5 py-2.5 text-[0.7rem] tracking-[0.28em] text-silver-200 uppercase transition-colors duration-300 ease-out hover:text-teal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}

      <div className="hidden lg:block">
        <ContactButton />
      </div>
    </header>
  )
}

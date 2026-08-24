import { useState } from "react"
import { Link } from "react-router-dom"
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/35 px-[6vw] py-4 backdrop-blur-md">
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-11">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <Link to={to} className={LINK_CLASS}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="text-silver-200 transition-colors duration-300 ease-out hover:text-teal lg:hidden"
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      <div className="hidden lg:block">
        <ContactButton />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink/97 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-end px-[6vw] py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-silver-200 transition-colors duration-300 ease-out hover:text-teal"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className="text-[1rem] tracking-[0.3em] text-silver-200 uppercase transition-colors duration-300 ease-out hover:text-teal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <ContactButton className="mt-4" />
          </nav>
        </div>
      )}
    </header>
  )
}

import { Link } from "react-router-dom"
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/35 px-[6vw] py-4 backdrop-blur-md">
      <nav>
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

      <ContactButton />
    </header>
  )
}

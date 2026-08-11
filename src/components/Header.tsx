import { Link } from "react-router-dom"
import ContactButton from "./ContactButton"

// Items with `to` are real routes; items with `href` are placeholder
// anchors until their section/page exists. Every nav item must resolve to
// one or the other — never leave one dangling with neither.
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Writer", href: "#writer" },
  { label: "Animation", href: "#animation" },
  { label: "Campaigns", href: "#campaigns" },
  { label: "AI Artist", href: "#ai-artist" },
  { label: "Workshops", href: "#workshops" },
]

const LINK_CLASS =
  "text-[0.7rem] tracking-[0.3em] text-silver-300 uppercase transition-colors duration-300 ease-out hover:text-silver-100"

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-end gap-16 bg-ink/35 px-[6vw] py-4 backdrop-blur-md">
      <nav>
        <ul className="flex items-center gap-11">
          {NAV_LINKS.map(({ label, to, href }) => (
            <li key={label}>
              {to ? (
                <Link to={to} className={LINK_CLASS}>
                  {label}
                </Link>
              ) : (
                <a href={href} className={LINK_CLASS}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <ContactButton />
    </header>
  )
}

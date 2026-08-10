import { ArrowUpRight } from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
]

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[6vw] py-9">
      <a href="#home" className="text-[0.78rem] tracking-[0.32em] text-silver-100 uppercase">
        Nael Ahmad
      </a>

      <nav>
        <ul className="flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-[0.7rem] tracking-[0.3em] text-silver-300 uppercase transition-colors duration-300 ease-out hover:text-silver-100"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href="#contact"
        className="group flex items-center gap-3 rounded-full border border-white/15 py-1.5 pr-1.5 pl-5 text-[0.7rem] tracking-[0.28em] text-silver-100 uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-teal/70 hover:bg-white/[0.04]"
      >
        Contact
        <span className="flex size-8 items-center justify-center rounded-full bg-teal text-ink transition-transform duration-300 ease-out group-hover:rotate-45">
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </span>
      </a>
    </header>
  )
}

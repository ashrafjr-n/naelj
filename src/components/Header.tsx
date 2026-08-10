import ContactButton from "./ContactButton"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
]

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/35 px-[6vw] py-6 backdrop-blur-md">
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

      <ContactButton />
    </header>
  )
}

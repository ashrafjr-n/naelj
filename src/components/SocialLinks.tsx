import { Mail } from "lucide-react"
import { SiFacebook, SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons"

// Placeholder destinations — swap for the real profiles later.
const LINKS = [
  { label: "WhatsApp", href: "https://wa.me/00000000000", Icon: SiWhatsapp },
  { label: "Facebook", href: "https://facebook.com/", Icon: SiFacebook },
  { label: "Instagram", href: "https://instagram.com/", Icon: SiInstagram },
  { label: "Email", href: "mailto:hello@example.com", Icon: Mail },
]

export default function SocialLinks() {
  return (
    <ul className="flex items-center gap-2.5">
      {LINKS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="group/social flex size-11 items-center justify-center rounded-full border border-white/10 text-silver-400 transition-[color,border-color,background-color,transform] duration-500 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.04] hover:text-silver-100"
          >
            <Icon size={15} strokeWidth={1.25} />
          </a>
        </li>
      ))}
    </ul>
  )
}

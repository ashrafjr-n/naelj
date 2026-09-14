import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

export default function ContactButton({
  label = "Contact",
  className = "",
}: {
  label?: string
  className?: string
}) {
  return (
    <Link
      to="/contact"
      className={`group inline-flex items-center gap-3 rounded-full border border-white/15 py-1.5 pr-1.5 pl-5 text-[0.7rem] tracking-[0.28em] text-silver-100 uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-teal/70 hover:bg-white/[0.04] ${className}`}
    >
      {label}
      <span className="flex size-8 items-center justify-center rounded-full bg-teal text-ink transition-transform duration-300 ease-out group-hover:rotate-45">
        <ArrowUpRight size={14} strokeWidth={1.75} />
      </span>
    </Link>
  )
}

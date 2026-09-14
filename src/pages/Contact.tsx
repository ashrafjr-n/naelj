import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { Send } from "lucide-react"
import { gsap, prefersReducedMotion } from "../lib/gsap"
import { CONTACT_EMAIL } from "../lib/contact"
import SocialLinks from "../components/SocialLinks"

const LABEL_CLASS = "text-[0.62rem] tracking-[0.32em] text-silver-500 uppercase"
const FIELD_CLASS =
  "mt-2.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-[0.92rem] font-light text-silver-100 outline-none transition-colors duration-300 ease-out placeholder:text-silver-500/70 focus:border-teal/70"

export default function Contact() {
  const root = useRef<HTMLDivElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const ctx = gsap.context((self) => {
      if (prefersReducedMotion()) return
      gsap.from(self.selector!("[data-fade]"), {
        opacity: 0,
        y: 18,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // No backend: hand the composed message to the visitor's own mail app.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  return (
    <div
      ref={root}
      className="flex min-h-svh flex-col items-center px-[6vw] pt-[calc(var(--header-h)+3rem)] pb-16 md:pt-[calc(var(--header-h)+5rem)]"
    >
      <title>Contact — Nael Ahmad Al-Jarabah</title>
      <div data-fade className="flex items-center gap-4">
        <span className="h-px w-10 bg-white/20" />
        <h1 className="text-[0.68rem] font-normal tracking-[0.42em] text-teal uppercase">Contact</h1>
        <span className="h-px w-10 bg-white/20" />
      </div>

      <div data-fade className="mt-9">
        <SocialLinks />
      </div>

      <form
        data-fade
        onSubmit={handleSubmit}
        className="mt-10 flex w-full max-w-lg flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-9"
      >
        <label className="block">
          <span className={LABEL_CLASS}>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={FIELD_CLASS}
          />
        </label>

        <label className="block">
          <span className={LABEL_CLASS}>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={FIELD_CLASS}
          />
        </label>

        <label className="block">
          <span className={LABEL_CLASS}>Message</span>
          <textarea
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${FIELD_CLASS} resize-y`}
          />
        </label>

        <button
          type="submit"
          className="group mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-teal py-3.5 text-[0.7rem] tracking-[0.28em] text-silver-100 uppercase transition-colors duration-300 ease-out hover:bg-teal/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          Send
          <Send
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          />
        </button>

        {opened && (
          <p role="status" className="-mt-2 text-center text-[0.72rem] tracking-[0.04em] text-silver-400">
            Your email app should open with the message ready to send.
          </p>
        )}
      </form>
    </div>
  )
}

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/gsap"

type Section = {
  index: string
  kicker: string
  title: string
  body: string
  items?: string[]
}

const SECTIONS: Section[] = [
  {
    index: "01",
    kicker: "Publications & Festivals",
    title: "Words & Recognition",
    body: "Author of What If the Orange Were Deleted?, a work of theatrical and cinematic criticism published by Awarq, and of three poetry collections — Buddhist Inscriptions on the Stele of the Last Nabataean, The Body and the Other, and Shawakhthrim — translated into English, Romanian, and French.",
    items: [
      "Jerash Festival for Culture and Arts",
      "Shabib Festival",
      "Al-Mirbad Festival",
      "Odessa International Festival",
      "Poems selected for “100 Arabic Poems” — translated into five languages",
    ],
  },
  {
    index: "02",
    kicker: "Channel Founding",
    title: "Broadcast",
    body: "Co-founder of PlayStation (Bilistank) Satellite Channel in Iraqi Kurdistan, and co-founder of Waar Satellite Channel, where he served as Artistic Director, Head of the Children’s Department, and a member of the Programming Committee.",
  },
  {
    index: "03",
    kicker: "Theatre",
    title: "On Stage",
    body: "Award-winning and widely staged across Arab festivals — Jury Chairman, Arab Open University Theatre Festival 2025 (Oman); Evaluation Committee member, Duhok Cultural Festival.",
    items: [
      "Land of Drought — Sharjah Theatre Days 2026, produced by Fujairah Theatre, dir. Fares Al-Balushi",
      "The Poisons — opening production, Dhofar Theatre Festival 2024, dir. Omar Naji",
      "The Surprise Maker — Kuwait & Zarqa Monodrama Festivals, Omani Actor Festival, multiple awards",
      "Ball of Yarn · Ghayoub Al-Ahaimer · Desire · A Drop of Wheat · Rayinka · Stillness",
    ],
  },
  {
    index: "04",
    kicker: "Cinema, Drama & Channel Management",
    title: "On Screen",
    body: "Feature screenplays Salma, Resonance, and Dialogue of the Wall.",
    items: [
      "Scattered Barriers (Netflix) — dramatic treatment",
      "When the Wind Plays — dramatic treatment",
      "Madq Al-Henna — theatrical adaptation, dir. Yousef Al-Balushi",
      "Sidra — dramatic treatment",
    ],
  },
  {
    index: "05",
    kicker: "Workshops",
    title: "Mentorship",
    body: "Leads playwriting and dramatic text development workshops in Salalah (2023, 2025) and Duhok (2010–2014).",
  },
]

export default function AboutMe() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!

      if (prefersReducedMotion()) return

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q("[data-line] > span"), { yPercent: 118, duration: 1.4, stagger: 0.1 })
        .from(q("[data-intro-fade]"), { opacity: 0, y: 16, duration: 1.2, stagger: 0.12 }, 0.45)

      for (const section of q("[data-section]")) {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%" },
        })
      }

      ScrollTrigger.refresh()
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="pt-[var(--header-h)]">
      {/* Intro */}
      <section className="px-[8vw] pt-24 pb-20">
        <p data-intro-fade className="text-[0.62rem] tracking-[0.5em] text-teal uppercase">
          Since 1999
        </p>

        <h1 className="mt-7 font-sans text-[clamp(3rem,6vw,6rem)] tracking-[-0.022em] leading-[1.05]">
          <span data-line className="block overflow-hidden">
            <span className="block bg-gradient-to-b from-silver-200 via-silver-300 to-silver-500 bg-clip-text text-transparent">
              Nael Al-Jarabah
            </span>
          </span>
        </h1>

        <div data-intro-fade className="mt-8 flex items-center gap-5">
          <span className="h-px w-12 bg-white/20" />
          <p className="text-[0.68rem] tracking-[0.42em] text-teal uppercase">
            Writer &middot; Director &middot; Executive Producer
          </p>
        </div>

        <p data-intro-fade className="mt-12 max-w-2xl text-[0.98rem] leading-[1.95] text-silver-300">
          His work in artistic production spans more than two decades, uniting dramatic and
          theatrical writing, television directing, and channel management — a single vision
          carried from first draft to final delivery. That work has taken him across Jordan,
          Iraq, Ukraine, Romania, Oman, Qatar, and the UAE.
        </p>
      </section>

      {/* Sections */}
      {SECTIONS.map((section, i) => {
        const reversed = i % 2 === 1
        return (
          <section
            key={section.title}
            data-section
            className="border-t border-white/10 px-[8vw] py-16"
          >
            <div className={`flex gap-16 ${reversed ? "flex-row-reverse text-right" : ""}`}>
              <div className="w-[30%] shrink-0">
                <span className="text-[0.62rem] tracking-[0.4em] text-silver-500">
                  {section.index}
                </span>
                <h2 className="mt-4 text-[1.9rem] tracking-[-0.01em] text-silver-100">
                  {section.title}
                </h2>
                <p className="mt-3 text-[0.66rem] tracking-[0.32em] text-teal uppercase">
                  {section.kicker}
                </p>
              </div>

              <div className="max-w-2xl">
                <p className="text-[0.92rem] leading-[1.9] text-silver-300">{section.body}</p>

                {section.items && (
                  <ul className={`mt-7 flex flex-col gap-3 ${reversed ? "items-end" : ""}`}>
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-baseline gap-3 text-[0.84rem] leading-[1.7] text-silver-400 ${reversed ? "flex-row-reverse" : ""}`}
                      >
                        <span className="size-1 shrink-0 rounded-full bg-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )
      })}

      <div className="h-32" />
    </div>
  )
}

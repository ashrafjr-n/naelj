/**
 * Fixed atmosphere shared by the whole scroll: one soft light source, a cool
 * counter-light, grain and a vignette. Fixed on purpose — it spans every
 * section so no seam can appear between them.
 */
export default function Ambience() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1100px 780px at 72% 6%, rgba(196,204,216,0.10), transparent 62%)," +
            "radial-gradient(900px 720px at 6% 88%, rgba(150,162,178,0.055), transparent 66%)",
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(122% 96% at 50% 46%, transparent 52%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  )
}

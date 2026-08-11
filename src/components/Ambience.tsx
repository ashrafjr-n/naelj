// Fixed atmosphere shared by the whole scroll: grain only, over the flat
// unified background. Fixed on purpose — it spans every section so no seam
// can appear between them. No light sources or vignette here — the page
// background stays a single flat dark colour with no gradients.
export default function Ambience() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}

/**
 * Geometry of the bold geometric "76" used as the portal.
 *
 * Two digits in a 182×100 box, each built from straight H/V/L segments only
 * (no curves), matching the blocky style of the original mark. The 6 carries
 * an enclosed counter (cut with the evenodd fill rule) — that hole is the
 * opening the camera flies through.
 */
export const MARK_PATH =
  "M0 0H84V20L34 100H14L64 20H0Z M142 0H162L118 40H182V100H98V40Z M118 60H162V80H118Z"

export const MARK_VIEWBOX = { width: 182, height: 100 }

/**
 * Centroid of the 6's counter — (20,60)-(64,60)-(64,80)-(20,80) in the 6's
 * local box, offset +98 into the combined box — as a fraction of the box.
 * Every zooming layer shares it as its transform origin.
 */
export const MARK_FOCUS = { x: 140 / MARK_VIEWBOX.width, y: 70 / MARK_VIEWBOX.height }

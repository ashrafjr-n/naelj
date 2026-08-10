/**
 * Geometry of the bold geometric "76" used as the portal.
 *
 * Two digits, each 84×100, separated by a 14-wide gap, built from straight
 * H/V/L segments only (no curves) — matching the blocky style of the
 * original mark. The 6's ascender is a diagonal band inset from both walls
 * of its loop (not flush with either), so it reads as a digit's stroke
 * rather than a letter's stem.
 */
const DIGIT_WIDTH = 84
const GAP_WIDTH = 14

export const MARK_VIEWBOX = { width: DIGIT_WIDTH * 2 + GAP_WIDTH, height: 100 }

// 7: a top bar and a diagonal leg, open on the lower-left.
const SEVEN_PATH = "M0 0H84V20L34 100H14L64 20H0Z"

// 6: a loop (outer 0,40 → 84,100; wall 20 thick, counter 20,60 → 64,80) with
// a diagonal ascender leaning from its top (50,0 → 70,0) down to where it
// meets the loop's top edge (30,40 → 50,40) — offset +98 into the combined box.
const SIX_PATH = "M148 0H168L148 40H182V100H98V40H128L148 0Z"
const SIX_HOLE = "M118 60H162V80H118Z"

export const MARK_PATH = `${SEVEN_PATH} ${SIX_PATH} ${SIX_HOLE}`

/**
 * The gap between the two digit boxes, horizontally and vertically centered
 * — the negative space the camera flies through. Every zooming layer shares
 * it as its transform origin.
 */
export const MARK_FOCUS = {
  x: (DIGIT_WIDTH + GAP_WIDTH / 2) / MARK_VIEWBOX.width,
  y: 0.5,
}

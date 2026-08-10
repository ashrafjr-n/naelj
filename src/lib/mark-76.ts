/**
 * Geometry of the bold geometric "76" used as the portal.
 *
 * Two digits, each 84×100, separated by a 14-wide gap. The 7 is built from
 * straight H/V/L segments; the 6 is the real "6" glyph outline from Futura
 * Bold (a bold geometric sans), extracted with fontTools and rescaled to
 * fit its 84×100 box, offset +98 into the combined box — so it reads as an
 * actual digit rather than a hand-built approximation.
 */
const DIGIT_WIDTH = 84
const GAP_WIDTH = 14

export const MARK_VIEWBOX = { width: DIGIT_WIDTH * 2 + GAP_WIDTH, height: 100 }

// 7: a top bar and a diagonal leg, open on the lower-left.
const SEVEN_PATH = "M0 0H84V20L34 100H14L64 20H0Z"

// 6: Futura Bold's "6" glyph outline (outer bowl + counter), rescaled to
// height 100 and offset +98 horizontally.
const SIX_PATH =
  "M165.61 0 138 31.74H138.52Q142.13 29.55 144.45 29.1Q146.77 28.65 148.58 28.65Q155.68 28.65 161.61 31.35Q167.55 34.06 171.94 38.77Q176.32 43.48 178.77 49.81Q181.23 56.13 181.23 63.35Q181.23 71.1 178.39 77.74Q175.55 84.39 170.19 89.35Q164.84 94.32 157.23 97.16Q149.61 100 140.06 100Q130.39 100 122.77 97.16Q115.16 94.32 109.81 89.42Q104.45 84.52 101.61 78Q98.77 71.48 98.77 64.13Q98.77 55.87 102.45 46.26Q106.13 36.65 113.74 27.35L136.32 0Z"
const SIX_HOLE =
  "M123.81 63.87Q123.81 67.23 125.1 70.13Q126.39 73.03 128.58 75.23Q130.77 77.42 133.68 78.71Q136.58 80 139.94 80Q143.29 80 146.19 78.71Q149.1 77.42 151.29 75.23Q153.48 73.03 154.77 70.13Q156.06 67.23 156.06 63.87Q156.06 60.52 154.77 57.61Q153.48 54.71 151.29 52.52Q149.1 50.32 146.19 49.03Q143.29 47.74 139.94 47.74Q136.58 47.74 133.68 49.03Q130.77 50.32 128.58 52.52Q126.39 54.71 125.1 57.61Q123.81 60.52 123.81 63.87Z"

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

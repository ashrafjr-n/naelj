// Geometry of the bold geometric "99" used as the portal — 1999, not a
// birth year.
//
// Two digits, each 84×100, separated by a 14-wide gap. Both 9s are the real
// "9" glyph outline from Futura Bold (a bold geometric sans), extracted with
// fontTools and rescaled to fit their 84×100 box — the same approach used
// for the earlier "76" mark's 6 — so they read as actual digits rather than
// a hand-built approximation. Each 9 is one outer contour (bowl + tail) plus
// one hole contour (the counter).
const DIGIT_WIDTH = 84
const GAP_WIDTH = 14

export const MARK_VIEWBOX = { width: DIGIT_WIDTH * 2 + GAP_WIDTH, height: 100 }

// First 9: Futura Bold's "9" glyph outline, rescaled to height 100.
const NINE_A_PATH =
  "M16.39 100.0 L44.0 68.26 L43.48 68.26 Q39.87 70.45 37.55 70.9 Q35.23 71.35 33.42 71.35 Q26.32 71.35 20.32 68.65 Q14.32 65.94 10.0 61.23 Q5.68 56.52 3.23 50.19 Q0.77 43.87 0.77 36.65 Q0.77 28.9 3.61 22.26 Q6.45 15.61 11.81 10.65 Q17.16 5.68 24.77 2.84 Q32.39 0.0 41.94 0.0 Q51.61 0.0 59.23 2.84 Q66.84 5.68 72.19 10.58 Q77.55 15.48 80.39 22.0 Q83.23 28.52 83.23 35.87 Q83.23 44.13 79.55 53.74 Q75.87 63.35 68.26 72.65 L45.68 100.0 Z"
const NINE_A_HOLE =
  "M58.19 36.13 Q58.19 32.77 56.9 29.87 Q55.61 26.97 53.42 24.77 Q51.23 22.58 48.32 21.29 Q45.42 20.0 42.06 20.0 Q38.71 20.0 35.81 21.29 Q32.9 22.58 30.71 24.77 Q28.52 26.97 27.23 29.87 Q25.94 32.77 25.94 36.13 Q25.94 39.48 27.23 42.39 Q28.52 45.29 30.71 47.48 Q32.9 49.68 35.81 50.97 Q38.71 52.26 42.06 52.26 Q45.42 52.26 48.32 50.97 Q51.23 49.68 53.42 47.48 Q55.61 45.29 56.9 42.39 Q58.19 39.48 58.19 36.13 Z"

// Second 9: the same glyph outline, offset +98 into the combined box.
const NINE_B_PATH =
  "M114.39 100.0 L142.0 68.26 L141.48 68.26 Q137.87 70.45 135.55 70.9 Q133.23 71.35 131.42 71.35 Q124.32 71.35 118.32 68.65 Q112.32 65.94 108.0 61.23 Q103.68 56.52 101.23 50.19 Q98.77 43.87 98.77 36.65 Q98.77 28.9 101.61 22.26 Q104.45 15.61 109.81 10.65 Q115.16 5.68 122.77 2.84 Q130.39 0.0 139.94 0.0 Q149.61 0.0 157.23 2.84 Q164.84 5.68 170.19 10.58 Q175.55 15.48 178.39 22.0 Q181.23 28.52 181.23 35.87 Q181.23 44.13 177.55 53.74 Q173.87 63.35 166.26 72.65 L143.68 100.0 Z"
const NINE_B_HOLE =
  "M156.19 36.13 Q156.19 32.77 154.9 29.87 Q153.61 26.97 151.42 24.77 Q149.23 22.58 146.32 21.29 Q143.42 20.0 140.06 20.0 Q136.71 20.0 133.81 21.29 Q130.9 22.58 128.71 24.77 Q126.52 26.97 125.23 29.87 Q123.94 32.77 123.94 36.13 Q123.94 39.48 125.23 42.39 Q126.52 45.29 128.71 47.48 Q130.9 49.68 133.81 50.97 Q136.71 52.26 140.06 52.26 Q143.42 52.26 146.32 50.97 Q149.23 49.68 151.42 47.48 Q153.61 45.29 154.9 42.39 Q156.19 39.48 156.19 36.13 Z"

export const MARK_PATH = `${NINE_A_PATH} ${NINE_A_HOLE} ${NINE_B_PATH} ${NINE_B_HOLE}`

// The gap between the two digit boxes, horizontally and vertically centered
// — the negative space the camera flies through. Every zooming layer shares
// it as its transform origin. Both 9s share the same 84-wide box, so the gap
// sits exactly on the combined viewBox's midline regardless of glyph shape.
export const MARK_FOCUS = {
  x: (DIGIT_WIDTH + GAP_WIDTH / 2) / MARK_VIEWBOX.width,
  y: 0.5,
}

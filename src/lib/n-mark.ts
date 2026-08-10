/**
 * Geometry of the bold geometric N used as the portal.
 *
 * A single contour in an 84×100 box: two 20-wide stems joined by a diagonal
 * band, leaving two open notches. Used as an SVG mask, so silver is painted
 * only where the letterform is.
 */
export const N_PATH = "M0 0H20L64 62V0H84V100H64L20 38V100H0Z"

export const N_VIEWBOX = { width: 84, height: 100 }

/**
 * Centroid of the upper-right notch — (20,0), (64,0), (64,62) — as a fraction
 * of the box. This is the opening the camera flies through, so every zooming
 * layer shares it as its transform origin.
 */
export const N_FOCUS = { x: 49.33 / N_VIEWBOX.width, y: 20.67 / N_VIEWBOX.height }

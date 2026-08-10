import type { Ref } from "react"
import { N_PATH, N_VIEWBOX } from "../lib/n-mark"

/**
 * The N is never HTML text: a silver plate is painted through a mask cut to the
 * letterform, so the notches stay transparent and reveal the dark layer behind.
 */
export default function NMark({ svgRef }: { svgRef: Ref<SVGSVGElement> }) {
  const { width, height } = N_VIEWBOX

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="n-silver" x1="0.05" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f4f6f8" />
          <stop offset="34%" stopColor="#cdd2d9" />
          <stop offset="68%" stopColor="#8d939b" />
          <stop offset="100%" stopColor="#63696f" />
        </linearGradient>
        <mask id="n-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
          <rect width={width} height={height} fill="#000" />
          <path d={N_PATH} fill="#fff" />
        </mask>
      </defs>
      <rect width={width} height={height} fill="url(#n-silver)" mask="url(#n-cutout)" />
    </svg>
  )
}

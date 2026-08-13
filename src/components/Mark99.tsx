import type { Ref } from "react"
import { MARK_PATH, MARK_VIEWBOX } from "../lib/mark-99"

// The 99 is never HTML text: a teal plate is painted through a mask cut to
// the digit shapes, so the counter stays transparent and reveals the dark
// layer behind.
export default function Mark99({ svgRef }: { svgRef: Ref<SVGSVGElement> }) {
  const { width, height } = MARK_VIEWBOX

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mark-teal" x1="0.05" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#9fe8ee" />
          <stop offset="32%" stopColor="#4fbac5" />
          <stop offset="66%" stopColor="#0f7e89" />
          <stop offset="100%" stopColor="#063339" />
        </linearGradient>
        <mask id="mark-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
          <rect width={width} height={height} fill="#000" />
          <path d={MARK_PATH} fill="#fff" fillRule="evenodd" />
        </mask>
      </defs>
      <rect width={width} height={height} fill="url(#mark-teal)" mask="url(#mark-cutout)" />
    </svg>
  )
}

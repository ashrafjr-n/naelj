import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export { gsap, ScrollTrigger }

if (import.meta.env.DEV) Object.assign(window, { __gsap: { gsap, ScrollTrigger } })

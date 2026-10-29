import confetti from 'canvas-confetti'

const PALETTE = ['#B51632', '#F4B8CC', '#BDA36A', '#FCE3E8', '#751B30', '#FFFDF8']

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const heart =
  typeof window !== 'undefined' && confetti.shapeFromPath
    ? confetti.shapeFromPath({
        path: 'M12 21s-7.5-4.6-10-9.3C.3 8.5 2.1 4.5 6 4.5c2.3 0 3.7 1.3 6 3.6 2.3-2.3 3.7-3.6 6-3.6 3.9 0 5.7 4 4 7.2C19.5 16.4 12 21 12 21z',
      })
    : null

/** Paper-confetti burst from a point (0–1 viewport coords). */
export function burstConfetti({ x = 0.5, y = 0.6, count = 90, spread = 80, hearts = false } = {}) {
  if (prefersReducedMotion()) return
  const shapes = hearts && heart ? [heart, 'square', heart] : ['square', 'circle']
  confetti({
    particleCount: count,
    spread,
    startVelocity: 38,
    gravity: 0.9,
    ticks: 220,
    scalar: hearts ? 1.25 : 1,
    origin: { x, y },
    colors: PALETTE,
    shapes,
    disableForReducedMotion: true,
    zIndex: 80,
  })
}

/** Burst from the centre of a DOM element (e.g. the button that was clicked). */
export function burstFromElement(el, opts = {}) {
  if (!el) return burstConfetti(opts)
  const r = el.getBoundingClientRect()
  burstConfetti({
    x: (r.left + r.width / 2) / window.innerWidth,
    y: (r.top + r.height / 2) / window.innerHeight,
    ...opts,
  })
}

/** Big celebratory finale: two side cannons plus a heart shower. */
export function grandFinaleConfetti() {
  if (prefersReducedMotion()) return
  const end = Date.now() + 1400
  const frame = () => {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, colors: PALETTE, zIndex: 80 })
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, colors: PALETTE, zIndex: 80 })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
  setTimeout(() => burstConfetti({ x: 0.5, y: 0.4, count: 140, spread: 140, hearts: true }), 350)
}

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Heart, Kiss } from './Doodles'

export { burstConfetti, burstFromElement, grandFinaleConfetti } from '../lib/effects'

const COLORS = ['#B51632', '#F4B8CC', '#751B30', '#e2546f', '#BDA36A']

/**
 * Hearts (and the odd lipstick kiss) that float up the screen.
 * Every time `burst` changes to a new truthy value, a new wave is released.
 * `mode="fill"` sends a dense, slower wave for the finale.
 */
export default function FloatingHearts({ burst, count = 14, mode = 'float', kisses = false }) {
  const reduce = useReducedMotion()
  const [items, setItems] = useState([])
  const seq = useRef(0)

  useEffect(() => {
    if (!burst || reduce) return
    const vw = typeof window !== 'undefined' ? window.innerWidth : 400
    const batch = Array.from({ length: count }, (_, i) => {
      seq.current += 1
      const size = mode === 'fill' ? 22 + Math.random() * 46 : 16 + Math.random() * 26
      return {
        id: `${burst}-${seq.current}`,
        x: Math.random() * vw,
        size,
        drift: (Math.random() - 0.5) * 140,
        rot: (Math.random() - 0.5) * 60,
        duration: (mode === 'fill' ? 3.6 : 2.6) + Math.random() * 1.8,
        delay: (mode === 'fill' ? 1.2 : 0.5) * Math.random() + (i % 3) * 0.05,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        kiss: kisses && Math.random() < 0.3,
      }
    })
    setItems((prev) => [...prev.slice(-60), ...batch])
  }, [burst, count, mode, kisses, reduce])

  if (typeof document === 'undefined') return null
  // Portalled to <body> so `position: fixed` isn't trapped by transformed chapter wrappers.
  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {items.map((h) => (
          <motion.div
            key={h.id}
            className="absolute bottom-[-80px]"
            style={{ left: h.x, width: h.kiss ? h.size * 1.5 : h.size }}
            initial={{ y: 0, x: 0, opacity: 0, rotate: 0, scale: 0.6 }}
            animate={{
              y: -(typeof window !== 'undefined' ? window.innerHeight : 800) - 140,
              x: h.drift,
              opacity: [0, 1, 1, 0],
              rotate: h.rot,
              scale: 1,
            }}
            transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
            onAnimationComplete={() => setItems((prev) => prev.filter((p) => p.id !== h.id))}
          >
            {h.kiss ? <Kiss className="w-full" color={h.color} /> : <Heart className="w-full" color={h.color} />}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}

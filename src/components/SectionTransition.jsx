import { motion } from 'motion/react'

/**
 * Page-turn between chapters. The default feels like a magazine clipping
 * being unfolded and laid on the table; the old one is lifted away.
 */
const variants = {
  initial: (dir) => ({
    opacity: 0,
    rotateX: dir >= 0 ? -38 : 20,
    rotate: dir >= 0 ? -2.5 : 2,
    scale: 0.94,
    y: dir >= 0 ? 60 : -40,
    transformOrigin: '50% 0%',
  }),
  enter: {
    opacity: 1,
    rotateX: 0,
    rotate: 0,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 140, damping: 22, mass: 0.9 },
  },
  exit: (dir) => ({
    opacity: 0,
    rotateX: dir >= 0 ? 28 : -20,
    rotate: dir >= 0 ? 3 : -2,
    scale: 0.92,
    y: dir >= 0 ? -50 : 50,
    transformOrigin: '50% 100%',
    transition: { duration: 0.38, ease: [0.55, 0, 0.8, 0.4] },
  }),
}

export default function SectionTransition({ children, direction = 1, className = '', label }) {
  return (
    <div style={{ perspective: 1600 }}>
      <motion.section
        aria-label={label}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={`relative min-h-[100svh] overflow-hidden ${className}`}
      >
        {children}
      </motion.section>
    </div>
  )
}

import { motion } from 'motion/react'
import { Tape } from './Doodles'

/**
 * A scrap of paper pinned to the collage.
 * variant: 'torn' | 'notebook' | 'clipping' | 'sticky'
 */
export default function PaperNote({
  children,
  variant = 'torn',
  rotate = -2,
  tape = true,
  tapeColor,
  className = '',
  delay = 0,
  inView = false,
}) {
  const surface = {
    torn: 'torn bg-warm px-5 py-6',
    notebook: 'notebook px-5 py-5 pl-14',
    clipping: 'newsprint px-4 py-3 border border-ink/10',
    sticky: 'bg-[#fff3a8] px-4 py-4 [clip-path:polygon(0_0,100%_0,100%_88%,90%_100%,0_100%)]',
  }[variant]

  const reveal = inView
    ? {
        initial: { opacity: 0, y: 30, rotate: rotate - 6 },
        whileInView: { opacity: 1, y: 0, rotate },
        viewport: { once: true, amount: 0.08 },
      }
    : {
        initial: { opacity: 0, y: -30, rotate: rotate - 6 },
        animate: { opacity: 1, y: 0, rotate },
      }

  return (
    <motion.div
      className={`relative ${className}`}
      {...reveal}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
    >
      {tape && (
        <Tape
          className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rotate-[-3deg]"
          color={tapeColor}
        />
      )}
      <div className={`${surface} paper-shadow-sm`}>{children}</div>
    </motion.div>
  )
}

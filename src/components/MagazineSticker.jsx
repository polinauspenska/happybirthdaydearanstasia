import { motion } from 'motion/react'

const burstPolygon = (() => {
  const pts = []
  const n = 22
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? 50 : 41
    const a = (Math.PI * i) / n - Math.PI / 2
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`)
  }
  return `polygon(${pts.join(',')})`
})()

const tones = {
  red: 'bg-cherry text-warm',
  pink: 'bg-pink text-ink',
  blush: 'bg-blush text-cherry',
  ink: 'bg-ink text-warm',
  cream: 'bg-warm text-ink',
  gold: 'bg-gold text-ink',
  burgundy: 'bg-burgundy text-blush',
}

/**
 * Retro magazine sticker.
 * shape: 'pill' | 'burst' | 'tag' | 'label' | 'circle' | 'hand'
 * Drops in with a little peel-and-press bounce.
 */
export default function MagazineSticker({
  children,
  shape = 'pill',
  tone = 'red',
  rotate = -4,
  delay = 0,
  className = '',
  float = false,
  as = 'div',
}) {
  const Comp = motion[as] ?? motion.div
  const base = 'pointer-events-none select-none inline-flex items-center justify-center text-center leading-none'

  const shapeClass = {
    pill: 'rounded-full px-4 py-2 font-anton uppercase tracking-wide text-[13px] sm:text-sm border-2 border-ink paper-shadow-sm',
    burst: 'aspect-square font-anton uppercase text-[13px] sm:text-[15px] leading-[1.02] p-5',
    tag: 'px-3 py-1.5 font-anton uppercase tracking-[0.12em] text-[12px] sm:text-[13px] paper-shadow-sm',
    label:
      'px-3 py-2 font-hand text-xl sm:text-2xl leading-[1] border border-ink/15 paper-shadow-sm [clip-path:polygon(0_6%,100%_0,98%_94%,2%_100%)]',
    circle: 'aspect-square rounded-full p-3 font-anton uppercase text-[12px] leading-[1.05] border-2 border-dashed border-current',
    hand: 'font-hand text-2xl sm:text-3xl leading-[0.95]',
  }[shape]

  const toneClass = shape === 'hand' ? 'text-cherry' : tones[tone]

  return (
    <Comp
      aria-hidden="true"
      className={`${base} ${shapeClass} ${toneClass} ${className}`}
      style={shape === 'burst' ? { clipPath: burstPolygon } : undefined}
      initial={{ opacity: 0, scale: 0.3, rotate: rotate - 25, y: -10 }}
      animate={
        float
          ? { opacity: 1, scale: 1, rotate, y: [0, -5, 0], transition: { y: { repeat: Infinity, duration: 4 + (delay % 2), ease: 'easeInOut', delay: delay + 0.6 }, default: { type: 'spring', stiffness: 420, damping: 15, delay } } }
          : { opacity: 1, scale: 1, rotate, y: 0 }
      }
      transition={{ type: 'spring', stiffness: 420, damping: 15, delay }}
    >
      {children}
    </Comp>
  )
}

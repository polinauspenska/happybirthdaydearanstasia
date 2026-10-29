import { motion } from 'motion/react'

/**
 * Speech bubble in two flavours:
 *  - 'comic': white bubble, ink outline, pointed tail
 *  - 'torn':  a torn scrap of paper with a typed line on it
 * tail: 'left' | 'right' | 'down-left' | 'down-right' | 'none'
 */
export default function SpeechBubble({
  children,
  variant = 'comic',
  tail = 'down-left',
  rotate = -2,
  className = '',
  tone = 'white',
  animateIn = true,
  delay = 0,
}) {
  const bg = tone === 'pink' ? '#F4B8CC' : tone === 'blush' ? '#FCE3E8' : tone === 'cream' ? '#F8F1E7' : '#FFFDF8'
  const motionProps = animateIn
    ? {
        initial: { opacity: 0, y: -24, scale: 0.85, rotate: rotate + 8 },
        animate: { opacity: 1, y: 0, scale: 1, rotate },
        transition: { type: 'spring', stiffness: 380, damping: 18, delay },
      }
    : { style: { rotate } }

  if (variant === 'torn') {
    return (
      <motion.div className={`relative ${className}`} {...motionProps}>
        <div className="torn paper-shadow-sm px-5 py-6 sm:px-7" style={{ background: bg }}>
          {children}
        </div>
      </motion.div>
    )
  }

  const tailPath = {
    left: { cls: 'left-[-17px] top-1/2 -translate-y-1/2', d: 'M18 4 L 0 14 L 18 24', vb: '0 0 20 28', w: 'w-5 h-7' },
    right: { cls: 'right-[-17px] top-1/2 -translate-y-1/2', d: 'M2 4 L 20 14 L 2 24', vb: '0 0 20 28', w: 'w-5 h-7' },
    'down-left': { cls: 'bottom-[-21px] left-10', d: 'M4 0 L 2 22 L 26 0', vb: '0 0 28 24', w: 'w-7 h-6' },
    'down-right': { cls: 'bottom-[-21px] right-10', d: 'M24 0 L 26 22 L 2 0', vb: '0 0 28 24', w: 'w-7 h-6' },
  }[tail]

  return (
    <motion.div className={`relative ${className}`} {...motionProps}>
      <div
        className="relative rounded-[1.6rem] border-[2.5px] border-ink px-5 py-4 sm:px-6"
        style={{ background: bg, boxShadow: '5px 6px 0 rgba(37,32,32,.9)' }}
      >
        {children}
      </div>
      {tailPath && (
        <svg viewBox={tailPath.vb} className={`absolute ${tailPath.cls} ${tailPath.w}`} aria-hidden="true">
          <path d={tailPath.d} fill={bg} stroke="#252020" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      )}
    </motion.div>
  )
}

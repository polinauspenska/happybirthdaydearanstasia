import { useId } from 'react'
import { motion } from 'motion/react'

/**
 * Rubber stamp that slams onto the page (scale-down + shake + ink texture).
 * Renders nothing until `show` is true.
 */
export default function ApprovalStamp({
  children,
  show = true,
  rotate = -12,
  color = '#B51632',
  delay = 0,
  className = '',
  size = 'md',
  onLanded,
}) {
  const id = useId().replace(/:/g, '')
  if (!show) return null
  const sizes = {
    sm: 'text-lg px-3 py-1.5 border-[3px]',
    md: 'text-3xl sm:text-4xl px-5 py-2.5 border-[5px]',
    lg: 'text-4xl sm:text-6xl px-6 py-3 border-[6px]',
  }
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, scale: 2.8, rotate: rotate + 18 }}
      animate={{ opacity: [0, 1, 1], scale: [2.8, 0.92, 1], rotate: [rotate + 18, rotate - 3, rotate] }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.9, 0.3, 1.2], times: [0, 0.7, 1] }}
      onAnimationComplete={onLanded}
    >
      <svg width="0" height="0" className="absolute">
        <filter id={`stamp-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="11" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.35" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </svg>
      <div
        className={`rounded-lg font-anton uppercase leading-none tracking-wider ${sizes[size]}`}
        style={{
          color,
          borderColor: color,
          outline: `2px solid ${color}`,
          outlineOffset: '3px',
          filter: `url(#stamp-${id})`,
          mixBlendMode: 'multiply',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

import { useId } from 'react'
import { motion } from 'motion/react'

/* Hand-drawn decorative pieces shared by every chapter. All are pure SVG,
   inherit `className` for sizing/positioning and are aria-hidden. */

export function Heart({ className = '', color = '#B51632', outline = false, style }) {
  return (
    <svg viewBox="0 0 24 22" className={className} style={style} aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-10-9.3C.3 8.5 2.1 4.5 6 4.5c2.3 0 3.7 1.3 6 3.6 2.3-2.3 3.7-3.6 6-3.6 3.9 0 5.7 4 4 7.2C19.5 16.4 12 21 12 21z"
        fill={outline ? 'none' : color}
        stroke={outline ? color : 'none'}
        strokeWidth={outline ? 1.6 : 0}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Lipstick kiss mark with a slightly smudged, printed texture. */
export function Kiss({ className = '', color = '#B51632', style }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 120 80" className={className} style={style} aria-hidden="true">
      <defs>
        <filter id={`smudge-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" />
        </filter>
        <mask id={`grain-${id}`}>
          <rect width="120" height="80" fill="#fff" />
          <filter id={`gf-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.4" />
          </filter>
          <rect width="120" height="80" filter={`url(#gf-${id})`} />
        </mask>
      </defs>
      <g filter={`url(#smudge-${id})`} mask={`url(#grain-${id})`} fill={color}>
        <path d="M8 40 C 22 20, 40 12, 52 21 C 56 24, 58 25.5, 60 25.5 C 62 25.5, 64 24, 68 21 C 80 12, 98 20, 112 40 C 92 37, 76 39.5, 60 41.5 C 44 39.5, 28 37, 8 40 Z" />
        <path d="M9 43 C 30 45, 45 47, 60 47 C 75 47, 90 45, 111 43 C 101 62, 83 73, 60 73 C 37 73, 19 62, 9 43 Z" />
      </g>
      <g stroke="#fff" strokeOpacity="0.35" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M40 54 Q 42 62 44 66" />
        <path d="M54 52 Q 55 62 55 69" />
        <path d="M68 52 Q 67 61 66 68" />
        <path d="M81 53 Q 79 60 76 65" />
        <path d="M44 30 Q 46 34 46 37" />
        <path d="M76 30 Q 74 34 74 37" />
      </g>
    </svg>
  )
}

export function Star({ className = '', color = '#BDA36A', style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 1.5l2.8 7 7.4.6-5.7 4.8 1.8 7.3L12 17.3l-6.3 3.9 1.8-7.3L1.8 9.1l7.4-.6z" fill={color} />
    </svg>
  )
}

export function Sparkle({ className = '', color = '#252020', style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" fill={color} />
    </svg>
  )
}

const draw = (delay = 0, duration = 0.9) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { pathLength: { delay, duration, ease: 'easeInOut' }, opacity: { delay, duration: 0.01 } },
})

/** Wobbly marker underline that draws itself when scrolled into view. */
export function ScribbleUnderline({ className = '', color = '#B51632', delay = 0.2, strokeWidth = 5 }) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.path
        d="M4 15 C 60 6, 120 18, 180 10 S 270 8, 296 12 M 30 20 C 90 14, 170 22, 260 16"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...draw(delay)}
      />
    </svg>
  )
}

/** Red-marker loop drawn around something important. */
export function ScribbleCircle({ className = '', color = '#B51632', delay = 0.2, animate = true }) {
  const props = animate ? draw(delay, 1.1) : {}
  return (
    <svg viewBox="0 0 220 110" preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.path
        d="M40 22 C 90 2, 190 6, 210 46 C 226 82, 150 104, 96 102 C 38 100, 4 80, 10 52 C 15 30, 60 14, 120 12 C 150 11, 175 16, 186 22"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        {...props}
      />
    </svg>
  )
}

/** Hand-drawn curly arrow. `flip` mirrors it horizontally. */
export function ScribbleArrow({ className = '', color = '#B51632', flip = false, delay = 0.3, style }) {
  return (
    <svg
      viewBox="0 0 120 90"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, ...style }}
      aria-hidden="true"
    >
      <motion.path
        d="M8 10 C 40 4, 70 18, 62 40 C 56 56, 30 50, 40 36 C 50 22, 84 34, 104 72"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        {...draw(delay, 0.8)}
      />
      <motion.path
        d="M88 66 L 105 76 L 108 56"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(delay + 0.75, 0.25)}
      />
    </svg>
  )
}

export function PaperClip({ className = '', style }) {
  return (
    <svg viewBox="0 0 30 80" className={className} style={style} aria-hidden="true">
      <path
        d="M20 22 V 62 a 7 7 0 0 1 -14 0 V 14 a 10 10 0 0 1 20 0 V 60"
        fill="none"
        stroke="#8f8a86"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M20 22 V 62 a 7 7 0 0 1 -14 0 V 14 a 10 10 0 0 1 20 0 V 60"
        fill="none"
        stroke="#e9e5e0"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform="translate(-0.8 -0.8)"
      />
    </svg>
  )
}

/** Semi-transparent washi tape strip. */
export function Tape({ className = '', color = 'rgba(244,184,204,0.78)', pattern = 'stripes', style }) {
  const bg =
    pattern === 'stripes'
      ? `repeating-linear-gradient(45deg, ${color} 0 7px, rgba(255,253,248,0.55) 7px 12px)`
      : pattern === 'dots'
        ? `radial-gradient(rgba(181,22,50,.45) 1.5px, transparent 1.7px) 0 0/8px 8px, ${color}`
        : color
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none h-6 w-24 ${className}`}
      style={{
        background: bg,
        clipPath: 'polygon(2% 0, 98% 4%, 100% 50%, 97% 100%, 3% 96%, 0 50%)',
        boxShadow: '0 1px 2px rgba(0,0,0,.08)',
        ...style,
      }}
    />
  )
}

/** A faux handwritten signature drawn as a single stroke. */
export function Signature({ className = '', color = '#252020' }) {
  return (
    <svg viewBox="0 0 220 60" className={className} aria-hidden="true">
      <motion.path
        d="M6 40 C 20 10, 34 8, 30 30 C 27 48, 18 50, 26 36 C 36 20, 46 44, 54 34 C 60 26, 64 30, 66 38 C 70 26, 80 24, 82 36 C 86 28, 92 28, 96 36 C 104 20, 110 20, 112 34 C 118 26, 126 30, 128 38 C 140 30, 160 26, 214 30"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        {...draw(0.3, 1.6)}
      />
    </svg>
  )
}

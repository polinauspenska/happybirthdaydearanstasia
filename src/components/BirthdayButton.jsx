import { forwardRef } from 'react'
import { motion } from 'motion/react'

/**
 * The one big CTA each chapter has. Chunky, tactile, offset ink shadow
 * that "presses in" when tapped.
 * tone: 'red' | 'ink' | 'pink' | 'cream'
 */
const BirthdayButton = forwardRef(function BirthdayButton(
  { children, onClick, tone = 'red', className = '', size = 'lg', disabled = false, ...rest },
  ref,
) {
  const tones = {
    red: 'bg-cherry text-warm border-ink',
    ink: 'bg-ink text-warm border-ink',
    pink: 'bg-pink text-ink border-ink',
    cream: 'bg-warm text-cherry border-ink',
  }
  const sizes = {
    lg: 'px-7 py-4 text-xl sm:text-2xl min-h-[60px]',
    md: 'px-5 py-3 text-lg sm:text-xl min-h-[52px]',
  }
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-[3px] font-anton uppercase leading-none tracking-wide disabled:cursor-default disabled:opacity-60 ${tones[tone]} ${sizes[size]} ${className}`}
      style={{ boxShadow: '5px 6px 0 #252020' }}
      whileHover={disabled ? undefined : { rotate: [-1, 1.5, -1, 0], scale: 1.03, transition: { duration: 0.45 } }}
      whileTap={disabled ? undefined : { scale: 0.97, x: 3, y: 4, boxShadow: '1px 2px 0 #252020' }}
      {...rest}
    >
      {children}
    </motion.button>
  )
})

export default BirthdayButton

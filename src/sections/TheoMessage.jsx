import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import MagazineSticker from '../components/MagazineSticker'
import TheoCutout from '../components/TheoCutout'
import SpeechBubble from '../components/SpeechBubble'
import BirthdayButton from '../components/BirthdayButton'
import FloatingHearts, { burstConfetti } from '../components/ConfettiEffect'
import { Heart, Kiss, Sparkle, Tape } from '../components/Doodles'

// Fake romantic-magazine clippings used as the collage backdrop
const CLIPPINGS = [
  { t: 'Love is in the air', cls: 'top-[14%] left-[-6%] rotate-[-8deg]', size: 'text-3xl' },
  { t: 'Heartthrob speaks out', cls: 'top-[30%] right-[-8%] rotate-[6deg]', size: 'text-2xl' },
  { t: 'Office girls make history', cls: 'bottom-[20%] left-[-4%] rotate-[4deg]', size: 'text-2xl' },
  { t: 'She said: "Stop it."', cls: 'bottom-[6%] right-[-2%] rotate-[-5deg]', size: 'text-xl' },
]

// Subtle "pose changes" applied to Theo's cut-out on every line
const POSES = [
  { rotate: -2, scale: 1, x: 0 },
  { rotate: 3, scale: 1.03, x: 6 },
  { rotate: -4, scale: 1.01, x: -6 },
  { rotate: 1.5, scale: 1.05, x: 4 },
  { rotate: -1, scale: 1.02, x: -2 },
]

export default function TheoMessage({ config, onNext }) {
  const c = config.theoMessage
  const lines = c.lines
  const [step, setStep] = useState(0) // number of lines revealed
  const [hearts, setHearts] = useState(0)
  const done = step >= lines.length
  const reduce = useReducedMotion()
  const finaleRef = useRef(null)

  const poses = config.images.messagePoses?.length ? config.images.messagePoses : null
  // Spread the poses evenly across the message so none repeats (with ≥ as many photos as lines, one per line)
  const imgSrc = poses
    ? poses[Math.min(poses.length - 1, Math.floor((Math.max(1, step) - 1) * poses.length / lines.length))]
    : config.images.message
  const pose = POSES[step % POSES.length]

  const advance = () => {
    if (done) return
    const next = step + 1
    setStep(next)
    if (next % 3 === 0) setHearts((h) => h + 1)
    if (next === lines.length) {
      setHearts((h) => h + 1)
      setTimeout(() => burstConfetti({ x: 0.5, y: 0.55, count: 80, hearts: true }), 250)
    }
  }

  useEffect(() => {
    if (done && finaleRef.current) {
      finaleRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }
  }, [done, reduce])

  // Keyboard: space / arrow-right advance the message (buttons handle their own keys)
  const stageBtn = useRef(null)
  useEffect(() => {
    const onKey = (e) => {
      if (done) return
      if (e.target.closest?.('button, a, input')) return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const current = step > 0 ? lines[step - 1] : null
  const previous = step > 1 ? lines[step - 2] : null
  const visibleStickers = c.stickers.filter((_, i) => step >= [2, 4, 6, 8, 10][i])

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-cherry pt-14 pb-16 text-warm">
      {/* Backdrop: newspaper clippings */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="halftone absolute inset-0 text-burgundy/50" />
        {CLIPPINGS.map((k, i) => (
          <div
            key={i}
            className={`absolute w-[60%] max-w-[360px] px-4 py-3 text-ink/80 opacity-[0.2] newsprint sm:opacity-40 ${k.cls}`}
          >
            <p className={`font-serif font-black italic leading-none ${k.size}`}>{k.t}</p>
            <div className="mt-2 space-y-1.5">
              <div className="h-1.5 w-full bg-ink/30" />
              <div className="h-1.5 w-5/6 bg-ink/30" />
              <div className="h-1.5 w-2/3 bg-ink/30" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        {/* Heading */}
        <div className="relative text-center lg:text-left">
          <MagazineSticker shape="tag" tone="cream" rotate={-2} delay={0.1} className="text-cherry">
            {c.label}
          </MagazineSticker>
          <motion.h1
            className="mt-4 font-serif text-[13.5vw] leading-[0.88] font-black tracking-tight italic sm:text-8xl lg:text-[7.5rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 160, damping: 18 }}
          >
            {c.headline}
          </motion.h1>
          <p className="mt-3 font-anton text-lg tracking-[0.14em] text-pink uppercase sm:text-2xl">{c.subheadline}</p>
        </div>

        {/* Stage */}
        <div className="relative mt-6 grid items-end gap-6 lg:mt-2 lg:grid-cols-12">
          {/* Theo */}
          <div className="relative order-2 lg:order-1 lg:col-span-5">
            <motion.div
              className="relative mx-auto w-[78%] max-w-[380px] sm:w-[52%] lg:w-[92%]"
              animate={reduce ? undefined : pose}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            >
              <div aria-hidden="true" className="absolute inset-x-[6%] top-[8%] bottom-0 -rotate-3 bg-pink paper-shadow" />
              <Tape className="absolute -top-2 left-[8%] z-10 rotate-[-18deg]" />
              <Tape className="absolute -top-2 right-[8%] z-10 rotate-[14deg]" color="rgba(252,227,232,.8)" pattern="dots" />
              <div className="relative">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={poses ? imgSrc : 'single'}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TheoCutout src={imgSrc} pose="portrait" eager />
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {done && (
                  <motion.div
                    className="absolute -right-[12%] bottom-[6%] z-20 w-[52%]"
                    initial={{ opacity: 0, scale: 3, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.3 }}
                  >
                    <Kiss className="w-full drop-shadow-[3px_4px_0_rgba(37,32,32,.35)]" color="#F4B8CC" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* stickers earned as the message goes on */}
            <div className="pointer-events-none absolute inset-0">
              <AnimatePresence>
                {visibleStickers.map((s, i) => {
                  const spots = [
                    'top-[4%] left-[0%]',
                    'top-[30%] right-[-1%]',
                    'bottom-[28%] left-[-1%]',
                    'top-[2%] right-[4%]',
                    'bottom-[6%] left-[4%]',
                  ]
                  const tones = ['ink', 'pink', 'cream', 'gold', 'blush']
                  return (
                    <motion.div key={s} className={`absolute z-30 ${spots[i]}`} exit={{ opacity: 0 }}>
                      <MagazineSticker shape={i === 3 ? 'tag' : 'pill'} tone={tones[i]} rotate={[-8, 6, -4, 5, -6][i]}>
                        {s}
                      </MagazineSticker>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Message area */}
          <div className="relative order-1 lg:order-2 lg:col-span-7 lg:pb-16">
            <button
              ref={stageBtn}
              type="button"
              onClick={advance}
              disabled={done}
              aria-label={done ? 'Message finished' : `Reveal line ${step + 1} of ${lines.length}`}
              className={`group relative block w-full cursor-pointer text-left disabled:cursor-default ${done ? '' : 'min-h-[190px] sm:min-h-[230px]'}`}
            >
              <div aria-live="polite" className="relative">
                {/* previous line, faded and tucked behind */}
                <AnimatePresence initial={false}>
                  {previous && !done && (
                    <motion.div
                      key={`prev-${step}`}
                      className="mb-3 max-w-[80%]"
                      initial={{ opacity: 0.9, y: 30 }}
                      animate={{ opacity: 0.55, y: 0, scale: 0.92 }}
                      exit={{ opacity: 0 }}
                      style={{ transformOrigin: 'left' }}
                    >
                      <SpeechBubble variant="torn" tone="pink" rotate={2} animateIn={false}>
                        <p className="font-serif text-base leading-snug text-ink italic sm:text-lg">“{previous}”</p>
                      </SpeechBubble>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {!current ? (
                    <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                      <SpeechBubble tail="down-left" rotate={-2} tone="cream" animateIn={false}>
                        <p className="font-anton text-3xl tracking-wide text-cherry uppercase sm:text-4xl">
                          <motion.span
                            className="inline-block"
                            animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                          >
                            ●
                          </motion.span>{' '}
                          Incoming call…
                        </p>
                        <p className="mt-1 font-sans text-sm text-ink/70">Caller ID: Theo James*. Tap to answer.</p>
                      </SpeechBubble>
                    </motion.div>
                  ) : !done ? (
                    <motion.div key={`line-${step}`} className="relative">
                      <SpeechBubble tail="down-left" rotate={step % 2 ? -2.5 : 1.5}>
                        <p className="font-serif text-[1.55rem] leading-[1.15] text-ink italic sm:text-4xl">“{current}”</p>
                      </SpeechBubble>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {!done && (
                <div className="mt-8 flex items-center justify-between gap-4">
                  <span className="font-hand text-2xl leading-none text-blush">
                    {step === 0 ? 'Tap to answer' : c.tapHint} →
                  </span>
                  <span className="flex items-center gap-1" aria-hidden="true">
                    {lines.map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i < step ? 'w-4 bg-warm' : 'w-2 bg-warm/30'}`}
                      />
                    ))}
                  </span>
                </div>
              )}
            </button>

            {/* final quote */}
            <AnimatePresence>
              {done && (
                <motion.div
                  ref={finaleRef}
                  className="relative scroll-mt-20"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                >
                  <p className="font-serif text-base leading-snug text-warm/80 italic sm:text-lg">“{lines[lines.length - 1]}”</p>
                  <Sparkle className="absolute -top-6 right-[6%] h-8 w-8" color="#F4B8CC" />
                  <h2 className="mt-5 font-serif text-[15vw] leading-[0.85] font-black text-warm uppercase italic sm:text-8xl lg:text-[6.6rem]">
                    “{c.finalQuote}”
                  </h2>
                  <p className="mt-3 text-right font-hand text-3xl text-pink">— {c.finalAttribution}</p>

                  <motion.p
                    className="mt-6 inline-block -rotate-3 bg-warm px-3 py-1.5 font-hand text-2xl leading-none text-cherry paper-shadow-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, rotate: [-3, -6, -3] }}
                    transition={{ delay: 1.1, rotate: { repeat: Infinity, duration: 2.4, delay: 1.6 } }}
                  >
                    {c.finalNote}
                  </motion.p>

                  <p className="mt-6 max-w-md font-sans text-sm text-warm/75 italic">{c.disclaimer}</p>

                  <div className="mt-8">
                    <BirthdayButton tone="cream" onClick={onNext}>
                      {c.cta}
                    </BirthdayButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Heart className="pointer-events-none absolute top-24 right-[6%] w-10 rotate-12 opacity-70" color="#F4B8CC" />
      <FloatingHearts burst={hearts} count={12} />
    </div>
  )
}

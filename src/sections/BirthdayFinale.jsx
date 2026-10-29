import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import MagazineSticker from '../components/MagazineSticker'
import TheoCutout, { Polaroid } from '../components/TheoCutout'
import SpeechBubble from '../components/SpeechBubble'
import PaperNote from '../components/PaperNote'
import BirthdayButton from '../components/BirthdayButton'
import FloatingHearts, { grandFinaleConfetti } from '../components/ConfettiEffect'
import { Heart, Kiss, ScribbleUnderline, Signature, Sparkle, Star, Tape } from '../components/Doodles'
import { X, RotateCcw } from 'lucide-react'

export default function BirthdayFinale({ config, onRestart }) {
  const c = config.finale
  const [kissOpen, setKissOpen] = useState(false)
  const [run, setRun] = useState(0)

  const claim = () => {
    setRun((r) => r + 1)
    setKissOpen(true)
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-paper pt-14 pb-12">
      {/* Static confetti dots + ribbons backdrop */}
      <BackdropConfetti />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        {/* ── Headline spread ─────────────────────── */}
        <header className="relative text-center">
          <MagazineSticker shape="tag" tone="ink" rotate={-2} delay={0.1}>
            The birthday edition · Final page
          </MagazineSticker>
          <motion.h1
            className="mt-5 leading-[0.82] uppercase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.15 }}
          >
            <span className="block font-anton text-[14vw] tracking-tight sm:text-8xl lg:text-9xl">Happy</span>
            <span className="relative inline-block font-anton text-[40vw] leading-[0.78] text-cherry sm:text-[15rem] lg:text-[17rem]" style={{ textShadow: '7px 7px 0 #252020' }}>
              {config.age}
              <span className="align-top text-[0.32em]">{config.ageOrdinalSuffix}</span>
              <Sparkle className="absolute top-[6%] -left-[8%] h-[16%] w-[16%]" color="#BDA36A" />
              <Sparkle className="absolute -right-[6%] bottom-[14%] h-[10%] w-[10%]" color="#252020" />
            </span>
            <span className="block font-serif text-[13vw] leading-[0.9] font-black tracking-tight normal-case italic sm:text-8xl lg:text-9xl">
              birthday,
            </span>
            <span className="relative mt-2 inline-block font-anton text-[15.5vw] tracking-tight sm:text-8xl lg:text-9xl">
              {config.recipient}!
              <ScribbleUnderline className="absolute -bottom-3 left-0 h-6 w-full" delay={0.9} strokeWidth={6} />
            </span>
          </motion.h1>
          <p className="mt-6 rotate-[-2deg] font-hand text-4xl text-cherry sm:text-5xl">{c.subheadline}</p>
        </header>

        {/* ── Collage + letter ────────────────────── */}
        <div className="relative mt-12 grid items-start gap-10 lg:grid-cols-12">
          {/* photos */}
          <div className="relative order-1 lg:col-span-5">
            <div className="relative mx-auto h-[440px] max-w-[420px] sm:h-[500px]">
              <div className="absolute top-0 left-0 w-[54%]">
                <Polaroid src={config.images.recipientFinale || config.images.recipient} alt={`${config.recipient}, the birthday girl`} caption="The birthday girl" rotate={-6} />
                <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
              </div>
              <div className="absolute right-0 bottom-0 z-10 w-[58%]">
                <TheoCutout src={config.images.finale} pose="portrait" rotate={4} />
                <MagazineSticker shape="pill" tone="cream" rotate={-6} delay={0.6} className="absolute -bottom-2 -left-10 z-20">
                  Strictly fictional
                </MagazineSticker>
              </div>
              <Cake age={config.age} className="absolute bottom-[4%] left-[2%] z-20 w-[34%]" />
              <Heart className="absolute top-[64%] left-[40%] w-10 rotate-[14deg]" color="#F4B8CC" />
              <Kiss className="absolute top-[4%] right-[4%] w-24 rotate-[18deg]" />
              <MagazineSticker shape="burst" tone="red" rotate={-8} delay={0.5} float className="absolute top-[21%] right-0 z-30 w-24 sm:w-28">
                {c.sticker}
              </MagazineSticker>
            </div>
          </div>

          {/* letter */}
          <div className="relative order-2 lg:col-span-7">
            <PaperNote variant="notebook" rotate={0.8} tapeColor="rgba(181,22,50,.5)" inView>
              <div className="text-[1.04rem] leading-[1.9rem] text-ink sm:text-[1.1rem]">
                <p className="font-hand text-[2rem] leading-[1.9rem] text-cherry">{c.letterGreeting}</p>
                {c.letter.map((para, i) => (
                  <p key={i} className={`mt-[1.9rem] ${i === 4 ? 'font-hand text-[1.6rem] text-burgundy' : i === 6 ? 'font-serif font-bold italic' : ''}`}>
                    {para}
                  </p>
                ))}
                <p className="mt-[1.9rem] font-serif text-2xl leading-[1.9rem] font-black italic">{c.letterClosing}</p>
                <div className="mt-[1.9rem]">
                  <p className="font-sans font-bold">{c.signOff}</p>
                  <p className="font-hand text-[2.2rem] leading-[1.9rem] text-cherry">{c.signature}</p>
                  <Signature className="mt-1 w-44 text-ink" />
                  <p className="mt-2 font-sans text-sm text-ink/60 italic">{c.signatureFootnote}</p>
                </div>
              </div>
            </PaperNote>
            <p className="mt-6 text-right font-hand text-xl text-burgundy rotate-[-1.5deg]">{c.committeeNote}</p>
          </div>
        </div>

        {/* ── Further evidence: polaroid strip ────── */}
        {config.images.recipientGallery?.length > 0 && (
          <section aria-label="More photos of the birthday girl" className="relative mt-16">
            <p className="text-center font-anton text-sm tracking-[0.3em] uppercase">Further evidence</p>
            <p className="mt-1 text-center font-hand text-2xl text-cherry">Submitted by the birthday committee</p>
            <div className="mt-8 flex flex-wrap items-start justify-center gap-x-4 gap-y-8 sm:gap-x-8">
              {config.images.recipientGallery.map(([src, caption], i) => (
                <motion.div
                  key={src}
                  className="relative w-[44%] max-w-[230px] sm:w-[28%]"
                  initial={{ opacity: 0, y: 40, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: [-5, 4, -3, 5][i % 4] }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 16, delay: i * 0.12 }}
                >
                  <Tape className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rotate-[-4deg]" color={i % 2 ? 'rgba(189,163,106,.7)' : undefined} />
                  <Polaroid src={src} alt={`${config.recipient}: ${caption}`} caption={caption} className="[&_figcaption]:px-2 [&_figcaption]:text-lg [&_figcaption]:leading-[0.9] sm:[&_figcaption]:text-xl" />
                  {i === 1 && <Heart className="absolute -top-4 -right-3 z-10 w-9 rotate-12" />}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── Kiss CTA ─────────────────────────────── */}
        <div className="relative mt-16 flex flex-col items-center text-center">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <BirthdayButton onClick={claim} aria-haspopup="dialog">
              {c.cta}
            </BirthdayButton>
          </motion.div>
          <p className="mt-4 font-hand text-xl text-ink/60">One per birthday girl. Non-transferable.</p>
        </div>

        {/* ── Footer ─────────────────────────────── */}
        <footer className="mt-20 border-t-[3px] border-double border-ink pt-6 text-center">
          <p className="mx-auto max-w-xl font-serif text-lg italic">{c.closing}</p>
          <p className="mx-auto mt-3 max-w-lg font-sans text-xs text-ink/60 italic">{c.legal}</p>
          <button
            type="button"
            onClick={onRestart}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 font-anton text-sm tracking-[0.2em] text-cherry uppercase underline decoration-2 underline-offset-4"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Read it all again
          </button>
        </footer>
      </div>

      {createPortal(
        <AnimatePresence>
          {kissOpen && <KissSequence key={run} config={config} onClose={() => setKissOpen(false)} onReplay={claim} />}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

function KissSequence({ config, onClose, onReplay }) {
  const c = config.finale
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState(0) // 0 hearts → 1 theo → 2 kisses → 3 line1 → 4 line2 → 5 punchline
  const closeBtn = useRef(null)

  useEffect(() => {
    const timings = reduce ? [0, 0, 0, 0, 0, 900] : [0, 350, 900, 1700, 2600, 4600]
    const timers = timings.map((t, i) => setTimeout(() => setPhase((p) => Math.max(p, i)), t))
    const confettiTimer = setTimeout(grandFinaleConfetti, reduce ? 0 : 1100)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(confettiTimer)
    }
  }, [reduce])

  useEffect(() => {
    closeBtn.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const flyingKisses = [
    { x: '-28vw', y: '-22vh', r: -24, s: 1.6, d: 0 },
    { x: '26vw', y: '-14vh', r: 18, s: 1.9, d: 0.18 },
    { x: '-18vw', y: '20vh', r: 12, s: 1.5, d: 0.32 },
    { x: '22vw', y: '24vh', r: -16, s: 1.7, d: 0.46 },
    { x: '0vw', y: '-30vh', r: 6, s: 1.3, d: 0.6 },
  ]

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Your birthday kiss"
      className="fixed inset-0 z-[65] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 45%, #FCE3E8 0%, #F4B8CC 55%, #e98aa8 100%)' }}
      />
      <div aria-hidden="true" className="halftone absolute inset-0 text-cherry/15" />
      <FloatingHearts burst={1} count={reduce ? 0 : 40} mode="fill" kisses />

      <button
        ref={closeBtn}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed top-[max(env(safe-area-inset-top),12px)] right-4 z-[90] grid h-11 w-11 cursor-pointer place-items-center rounded-full border-[2.5px] border-ink bg-warm text-ink"
        style={{ boxShadow: '3px 4px 0 #252020' }}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="relative flex min-h-full flex-col items-center justify-center px-4 py-16">
        <AnimatePresence mode="wait">
          {phase < 5 ? (
            <motion.div
              key="kiss"
              className="relative flex w-full max-w-md flex-col items-center"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35 } }}
            >
              {/* Theo zooms into focus */}
              <motion.div
                className="relative w-[64%] max-w-[300px]"
                initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
                animate={phase >= 1 ? { scale: 1, opacity: 1, rotate: 2 } : {}}
                transition={{ type: 'spring', stiffness: 160, damping: 13 }}
              >
                <TheoCutout src={config.images.kiss || config.images.finale} pose="portrait" eager />
              </motion.div>

              {/* lipstick kisses flying at the screen, then sticking */}
              {phase >= 2 &&
                flyingKisses.map((k, i) => (
                  <motion.div
                    key={i}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[38%] left-1/2 w-28 -translate-x-1/2"
                    initial={{ x: 0, y: 0, scale: 0.15, rotate: 0, opacity: 0 }}
                    animate={{ x: k.x, y: k.y, scale: [0.15, k.s * 1.6, k.s], rotate: k.r, opacity: [0, 1, 0.92] }}
                    transition={{ duration: 0.7, delay: k.d, ease: [0.2, 0.8, 0.3, 1] }}
                  >
                    <Kiss color={i % 2 ? '#751B30' : '#B51632'} />
                  </motion.div>
                ))}

              <div className="relative z-10 mt-5 min-h-[120px] w-full" aria-live="polite">
                {phase >= 3 && (
                  <SpeechBubble tail="none" rotate={-2}>
                    <p className="text-center font-serif text-[1.7rem] leading-tight text-ink italic sm:text-3xl">“{c.kissLines[0]}”</p>
                    {phase >= 4 && (
                      <motion.p
                        className="mt-1 text-center font-hand text-3xl leading-none text-cherry"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        “{c.kissLines[1]}” 🤫
                      </motion.p>
                    )}
                  </SpeechBubble>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="punchline"
              className="relative w-full max-w-xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="relative bg-warm px-5 py-8 paper-shadow sm:px-10"
                initial={{ rotate: -8, scale: 0.7 }}
                animate={{ rotate: -1.5, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 15 }}
              >
                <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" color="rgba(189,163,106,.75)" />
                <p className="font-sans text-[11px] font-bold tracking-[0.3em] text-cherry uppercase">Delivery notice</p>
                <p className="mt-3 font-anton text-[2rem] leading-[0.98] tracking-tight uppercase sm:text-5xl">{c.punchline}</p>
                <motion.p
                  className="mt-5 font-serif text-2xl italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 1.1 }}
                >
                  {c.punchlineMiddle}
                </motion.p>
                <motion.p
                  className="mt-4 font-anton text-3xl leading-none text-cherry uppercase sm:text-4xl"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reduce ? 0 : 2, type: 'spring', stiffness: 260, damping: 14 }}
                >
                  {c.punchlineReveal}
                </motion.p>
                <motion.p
                  className="mt-4 inline-block -rotate-2 bg-cherry px-4 py-2 font-anton text-3xl leading-none text-warm uppercase sm:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 2.8, type: 'spring', stiffness: 200, damping: 14 }}
                  onAnimationComplete={() => !reduce && grandFinaleConfetti()}
                >
                  {c.punchlineSender}
                </motion.p>
              </motion.div>

              <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 3.4 }}
              >
                <BirthdayButton size="md" tone="cream" onClick={onReplay}>
                  {c.replay} 💋
                </BirthdayButton>
                <BirthdayButton size="md" tone="ink" onClick={onClose}>
                  Back to the letter
                </BirthdayButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────── */

function Cake({ age, className = '' }) {
  return (
    <svg viewBox="0 0 140 150" className={className} aria-hidden="true">
      <g stroke="#252020" strokeWidth="3" strokeLinejoin="round">
        {/* candles */}
        <rect x="52" y="22" width="9" height="34" rx="2" fill="#F4B8CC" />
        <rect x="78" y="22" width="9" height="34" rx="2" fill="#F4B8CC" />
        <path d="M56.5 6 C 51 13, 52 20, 56.5 20 C 61 20, 62 13, 56.5 6 Z" fill="#BDA36A" />
        <path d="M82.5 6 C 77 13, 78 20, 82.5 20 C 87 20, 88 13, 82.5 6 Z" fill="#BDA36A" />
        {/* top tier */}
        <rect x="30" y="54" width="80" height="36" rx="6" fill="#FFFDF8" />
        <path d="M30 64 Q 40 74 50 64 Q 60 74 70 64 Q 80 74 90 64 Q 100 74 110 64" fill="none" stroke="#B51632" strokeWidth="5" />
        {/* bottom tier */}
        <rect x="12" y="88" width="116" height="48" rx="7" fill="#B51632" />
        <path d="M12 100 Q 26 112 40 100 Q 54 112 68 100 Q 82 112 96 100 Q 110 112 128 100" fill="none" stroke="#FCE3E8" strokeWidth="5" />
        <rect x="4" y="134" width="132" height="9" rx="4" fill="#BDA36A" />
      </g>
      <text x="70" y="128" textAnchor="middle" fontFamily="Anton, Impact" fontSize="20" fill="#FFFDF8">{age}</text>
    </svg>
  )
}

function BackdropConfetti() {
  const bits = [
    ['top-[8%] left-[6%]', '#B51632', 10, 20],
    ['top-[14%] right-[10%]', '#BDA36A', 14, -30],
    ['top-[30%] left-[3%]', '#F4B8CC', 18, 45],
    ['top-[46%] right-[4%]', '#751B30', 10, 10],
    ['top-[62%] left-[8%]', '#BDA36A', 12, -15],
    ['top-[74%] right-[12%]', '#B51632', 16, 60],
    ['top-[86%] left-[18%]', '#F4B8CC', 14, -40],
    ['top-[22%] left-[44%]', '#BDA36A', 8, 30],
  ]
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {bits.map(([pos, color, size, rot], i) => (
        <span
          key={i}
          className={`absolute ${pos}`}
          style={{ width: size, height: size * 0.45, background: color, transform: `rotate(${rot}deg)` }}
        />
      ))}
      {/* ribbon */}
      <svg className="absolute top-[3%] -left-10 w-[60%] opacity-80 sm:w-[40%]" viewBox="0 0 400 120">
        <path d="M0 60 C 60 0, 120 120, 180 60 S 300 0, 400 60" fill="none" stroke="#F4B8CC" strokeWidth="14" strokeLinecap="round" />
      </svg>
      <svg className="absolute -right-10 bottom-[30%] w-[50%] opacity-70 sm:w-[30%]" viewBox="0 0 400 120">
        <path d="M0 60 C 60 0, 120 120, 180 60 S 300 0, 400 60" fill="none" stroke="#B51632" strokeWidth="10" strokeLinecap="round" />
      </svg>
      <Star className="absolute top-[52%] left-[48%] h-6 w-6" />
    </div>
  )
}

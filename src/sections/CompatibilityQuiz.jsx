import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react'
import MagazineSticker from '../components/MagazineSticker'
import TheoCutout from '../components/TheoCutout'
import SpeechBubble from '../components/SpeechBubble'
import BirthdayButton from '../components/BirthdayButton'
import ApprovalStamp from '../components/ApprovalStamp'
import FloatingHearts, { burstConfetti, burstFromElement } from '../components/ConfettiEffect'
import { Heart, Kiss, ScribbleCircle, ScribbleUnderline, Sparkle, Star, Tape } from '../components/Doodles'

export default function CompatibilityQuiz({ config, onNext }) {
  const c = config.quiz
  const reduce = useReducedMotion()
  const [picked, setPicked] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [certified, setCertified] = useState(false)
  const [hearts, setHearts] = useState(0)
  const [compliment, setCompliment] = useState(-1)
  const resultRef = useRef(null)
  const complimentBtn = useRef(null)

  const choose = (letter) => {
    if (picked) return
    setPicked(letter)
    setTimeout(() => setRevealed(true), reduce ? 0 : 650)
  }

  // Once revealed: scroll to results, run the 0 → 100 meter, then certify.
  useEffect(() => {
    if (!revealed) return
    resultRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    if (reduce) {
      setScore(100)
      setCertified(true)
      return
    }
    const controls = animate(0, 100, {
      duration: 2.2,
      delay: 0.9,
      ease: [0.3, 0.1, 0.2, 1],
      onUpdate: (v) => setScore(Math.round(v)),
      onComplete: () => {
        setCertified(true)
        setHearts((h) => h + 1)
        burstConfetti({ x: 0.5, y: 0.6, count: 120, spread: 110, hearts: true })
      },
    })
    return () => controls.stop()
  }, [revealed, reduce])

  const sayNice = () => {
    const n = c.compliments.length
    let next = Math.floor(Math.random() * n)
    if (n > 1) while (next === compliment) next = Math.floor(Math.random() * n)
    setCompliment(next)
    burstFromElement(complimentBtn.current, { count: 24, spread: 50, hearts: true })
  }

  const complimentImages = config.images.compliments?.length ? config.images.compliments : null
  const complimentSrc = complimentImages ? complimentImages[Math.max(0, compliment) % complimentImages.length] : config.images.quiz

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-pink pt-14 pb-16">
      <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 text-cherry/15" />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 -right-24 h-[420px] w-[420px] rounded-full bg-blush/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        {/* ── Masthead ─────────────────────────────── */}
        <header className="relative">
          <div className="flex items-center gap-3">
            <MagazineSticker shape="burst" tone="red" rotate={-12} className="w-20 text-lg sm:w-24 sm:text-xl">
              Quiz!
            </MagazineSticker>
            <p className="font-sans text-[11px] font-bold tracking-[0.22em] text-burgundy uppercase sm:text-xs">
              Special birthday issue · Page 26
            </p>
          </div>
          <motion.h1
            className="mt-3 font-anton text-[17vw] leading-[0.9] tracking-tight text-ink uppercase sm:text-8xl lg:text-[8.5rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 16 }}
          >
            The ultimate
            <br />
            <span className="ink-outline">question.</span>
          </motion.h1>
          <p className="mt-4 max-w-2xl font-serif text-2xl leading-tight font-black italic sm:text-4xl">
            What does Theo James <span className="text-cherry">really</span> think of {config.recipient}?
          </p>
          <p className="mt-4 max-w-xl font-sans text-base text-ink/80">{c.intro}</p>
        </header>

        {/* ── Quiz card ────────────────────────────── */}
        <div className="relative mt-10 grid items-start gap-8 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <Tape className="absolute -top-3 left-8 z-10 rotate-[-6deg]" color="rgba(181,22,50,.55)" />
            <Tape className="absolute -top-3 right-8 z-10 rotate-[8deg]" color="rgba(189,163,106,.7)" />
            <div className="relative rotate-[-0.6deg] bg-warm p-5 paper-shadow sm:p-8">
              <p className="font-anton text-sm tracking-[0.25em] text-cherry uppercase">Question 1 of 1</p>
              <h2 className="mt-2 font-serif text-[1.7rem] leading-tight font-black sm:text-4xl">{c.question}</h2>
              <p className="mt-1 font-hand text-xl text-ink/60">Circle one. Choose wisely. (You can't lose.)</p>

              <ul className="mt-6 space-y-3" role="list">
                {c.options.map(([letter, text]) => {
                  const isPicked = picked === letter
                  const isAnswer = revealed && letter === 'D'
                  return (
                    <li key={letter}>
                      <motion.button
                        type="button"
                        onClick={() => choose(letter)}
                        disabled={!!picked}
                        aria-pressed={isPicked}
                        className={`group relative flex min-h-[60px] w-full cursor-pointer items-center gap-4 rounded-xl border-[2.5px] border-ink px-4 py-3 text-left transition-colors disabled:cursor-default ${
                          isPicked ? 'bg-blush' : 'bg-warm hover:bg-blush/60'
                        }`}
                        style={{ boxShadow: '4px 5px 0 #252020' }}
                        whileHover={picked ? undefined : { x: -2, y: -2 }}
                        whileTap={picked ? undefined : { x: 2, y: 3, boxShadow: '1px 1px 0 #252020' }}
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cherry font-anton text-xl text-warm">
                          {letter}
                        </span>
                        <span className="font-serif text-lg leading-snug italic sm:text-xl">“{text}”</span>
                        {(isPicked || isAnswer) && (
                          <ScribbleCircle className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]" delay={0} />
                        )}
                      </motion.button>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-6 text-right font-hand text-lg text-burgundy">{c.scienceNote}</p>
            </div>
          </div>

          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto w-[82%]">
              <Heart className="absolute -top-4 -left-6 z-20 w-16 -rotate-12" color="#B51632" />
              <TheoCutout src={config.images.quiz} pose="portrait" rotate={3} />
              <MagazineSticker shape="circle" tone="red" rotate={10} delay={0.4} className="absolute -right-4 bottom-[18%] z-20 w-28 border-warm text-warm">
                Hint: it's D
              </MagazineSticker>
            </div>
          </div>
        </div>

        {/* ── Results ─────────────────────────────── */}
        <AnimatePresence>
          {revealed && (
            <motion.section
              ref={resultRef}
              className="relative mt-14 scroll-mt-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              aria-live="polite"
            >
              <div className="relative flex flex-wrap items-end gap-x-6 gap-y-2">
                <ApprovalStamp size="lg" rotate={-6} className="relative">
                  {c.correctLabel}
                </ApprovalStamp>
                {picked !== 'D' && (
                  <span className="font-hand text-2xl text-burgundy">(you picked {picked}. Also correct. Somehow.)</span>
                )}
              </div>
              <p className="mt-6 font-sans text-lg">{c.answerIntro}</p>
              <p className="relative mt-1 inline-block font-anton text-5xl tracking-tight text-cherry uppercase sm:text-7xl">
                {c.answer}
                <ScribbleUnderline className="absolute -bottom-3 left-0 h-5 w-full" color="#252020" delay={0.5} />
              </p>
              <blockquote className="mt-8 max-w-xl">
                <p className="font-serif text-3xl leading-tight italic sm:text-4xl">“{c.answerQuote}”</p>
                <footer className="mt-1 font-hand text-2xl text-burgundy">— {c.answerAttribution}</footer>
              </blockquote>

              {/* meter */}
              <div className="mt-10 max-w-2xl">
                <div className="flex items-end justify-between font-anton uppercase">
                  <span className="text-sm tracking-[0.2em]">Fabulousness meter</span>
                  <span className="text-5xl leading-none text-cherry tabular-nums sm:text-6xl">{score}%</span>
                </div>
                <div
                  className="relative mt-2 h-9 overflow-hidden rounded-full border-[3px] border-ink bg-warm"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={score}
                  aria-label="Fabulousness meter"
                >
                  <div
                    className="h-full rounded-full bg-cherry"
                    style={{
                      width: `${score}%`,
                      backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0 10px, rgba(255,255,255,.18) 10px 20px)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3 font-anton text-[11px] tracking-widest text-ink/40 uppercase mix-blend-multiply">
                    <span>Fine</span>
                    <span>Fabulous</span>
                    <span>Iconic</span>
                  </div>
                </div>
              </div>

              {/* certificate */}
              <AnimatePresence>
                {certified && (
                  <motion.div
                    className="relative mx-auto mt-14 max-w-xl"
                    initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                  >
                    <div className="relative bg-warm p-3 paper-shadow">
                      <div className="border-[3px] border-double border-gold px-5 py-8 text-center outline outline-1 outline-offset-4 outline-gold/60 sm:px-10">
                        <div className="flex justify-center gap-2" aria-hidden="true">
                          <Star className="h-4 w-4" />
                          <Star className="h-5 w-5" />
                          <Star className="h-4 w-4" />
                        </div>
                        <p className="mt-3 font-anton text-lg tracking-[0.18em] uppercase sm:text-xl">{c.certificateTitle}</p>
                        <p className="mt-6 font-serif text-4xl font-black tracking-wide uppercase underline decoration-cherry decoration-[3px] underline-offset-8 sm:text-5xl">
                          {config.recipient}
                        </p>
                        <p className="mt-5 font-anton text-3xl text-cherry uppercase underline decoration-[3px] underline-offset-[6px] sm:text-4xl">
                          {c.certificateScore}
                        </p>
                        <p className="mt-6 font-sans text-xs font-bold tracking-[0.25em] uppercase">{c.certificateStatusLabel}</p>
                        <p className="mt-1 font-serif text-2xl font-black italic sm:text-3xl">{c.certificateStatus}</p>
                        <p className="mt-5 font-sans text-xs text-ink/60 italic">{c.certificateFootnote}</p>
                      </div>
                    </div>
                    <ApprovalStamp size="md" rotate={-16} delay={0.5} className="absolute -top-6 -right-2 sm:-right-10">
                      Approved
                    </ApprovalStamp>
                    <Kiss className="absolute -bottom-8 -left-6 w-24 -rotate-12 sm:-left-12 sm:w-28" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* compliments */}
              {certified && (
                <motion.div
                  className="relative mt-20 grid items-center gap-6 sm:grid-cols-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="relative mx-auto w-[66%] max-w-[300px] sm:col-span-5 sm:w-full">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={complimentImages ? complimentSrc : 'one'}
                        initial={{ opacity: 0, rotate: -6 }}
                        animate={{ opacity: 1, rotate: compliment % 2 ? 3 : -2 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                      >
                        <TheoCutout src={complimentSrc} pose="portrait" />
                      </motion.div>
                    </AnimatePresence>
                    <Sparkle className="absolute top-4 -left-4 h-8 w-8" color="#B51632" />
                  </div>

                  <div className="relative sm:col-span-7">
                    <div className="min-h-[150px]" aria-live="polite">
                      <AnimatePresence mode="wait">
                        <motion.div key={compliment}>
                          <SpeechBubble tail="left" rotate={compliment % 2 ? 2 : -2} className="[&>svg]:hidden sm:[&>svg]:block">
                            <p className="font-serif text-2xl leading-snug text-ink italic sm:text-3xl">
                              {compliment < 0 ? 'Go on. Ask me.' : `“${c.compliments[compliment]}”`}
                            </p>
                          </SpeechBubble>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="mt-6">
                      <BirthdayButton ref={complimentBtn} size="md" tone="red" onClick={sayNice}>
                        {c.complimentButton}
                      </BirthdayButton>
                    </div>
                    <p className="mt-4 max-w-md font-sans text-sm text-ink/70 italic">{c.complimentMicrocopy}</p>
                  </div>
                </motion.div>
              )}

              {certified && (
                <motion.div
                  className="mt-16 flex flex-col items-center text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <BirthdayButton tone="ink" onClick={onNext}>
                    {c.cta}
                  </BirthdayButton>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <FloatingHearts burst={hearts} count={16} />
    </div>
  )
}

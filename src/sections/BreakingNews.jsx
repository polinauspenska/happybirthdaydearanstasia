import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import MagazineSticker from '../components/MagazineSticker'
import TheoCutout from '../components/TheoCutout'
import SpeechBubble from '../components/SpeechBubble'
import PaperNote from '../components/PaperNote'
import BirthdayButton from '../components/BirthdayButton'
import ApprovalStamp from '../components/ApprovalStamp'
import FloatingHearts, { burstFromElement } from '../components/ConfettiEffect'
import { Heart, Kiss, ScribbleArrow, ScribbleUnderline, Sparkle, Star, Tape } from '../components/Doodles'

export default function BreakingNews({ config, onNext }) {
  const c = config.breakingNews
  const [opening, setOpening] = useState(false)
  const [hearts, setHearts] = useState(0)
  const btn = useRef(null)
  const reduce = useReducedMotion()

  const open = () => {
    if (opening) return
    setOpening(true)
    setHearts((h) => h + 1)
    burstFromElement(btn.current, { count: 110, spread: 100, hearts: true })
    setTimeout(onNext, reduce ? 350 : 1500)
  }

  return (
    <div className="relative bg-paper pb-14">
      {/* ── Ticker tape ─────────────────────────────── */}
      <div className="relative z-10 mt-11 overflow-hidden border-y-[3px] border-ink bg-cherry py-1.5 text-warm">
        <div
          className="marquee flex w-max gap-8 whitespace-nowrap font-anton text-sm uppercase tracking-[0.2em]"
          aria-hidden="true"
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              {[c.topLabel, `${config.recipient} turns ${config.age}`, 'Developing story', 'Theo James responds*', c.topLabel, 'Office in uproar'].map(
                (t, i) => (
                  <span key={i} className="flex items-center gap-8">
                    {t}
                    <Star className="h-3.5 w-3.5" color="#F4B8CC" />
                  </span>
                ),
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        {/* ── Masthead ───────────────────────────────── */}
        <header className="border-b-[3px] border-double border-ink pt-5 pb-2 text-center">
          <div className="flex items-center justify-between gap-2 font-sans text-[10px] uppercase tracking-[0.18em] text-ink/70 sm:text-xs">
            <span>Vol. {config.age}</span>
            <span className="hidden sm:inline">Late edition · Extremely exclusive</span>
            <span>Price: one slice of birthday cake</span>
          </div>
          <p className="mt-1 font-serif text-[2.1rem] leading-none font-black tracking-tight sm:text-6xl">{c.masthead}</p>
        </header>

        <div className="relative mt-6 grid grid-cols-1 gap-x-10 lg:grid-cols-12">
          {/* ── Headline block ───────────────────────── */}
          <div className="relative lg:col-span-7 lg:row-start-1">
            <MagazineSticker shape="tag" tone="ink" rotate={-2} delay={0.15} className="mb-3">
              {c.topLabel}
            </MagazineSticker>

            <motion.h1
              className="relative origin-left font-anton text-[23vw] leading-[0.82] tracking-tight text-cherry uppercase sm:text-[9.5rem] lg:text-[8.6rem] xl:text-[9.6rem]"
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={
                opening
                  ? { opacity: 1, y: 0, rotate: [-2, 2.5, -3, 1.5, -2], scale: [1, 1.05, 0.98, 1.02, 1] }
                  : { opacity: 1, y: 0, rotate: -2 }
              }
              transition={opening ? { duration: 0.6 } : { type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
              style={{ textShadow: '5px 5px 0 #252020' }}
            >
              {c.headline.replace('!', '')}
              <span className="text-ink [text-shadow:5px_5px_0_#B51632]">!</span>
            </motion.h1>

            <MagazineSticker
              shape="tag"
              tone="pink"
              rotate={7}
              delay={0.55}
              className="absolute top-12 right-0 z-10 border-2 border-ink sm:top-3"
            >
              {c.stickers[1]}
            </MagazineSticker>

            <ApprovalStamp
              show={opening}
              rotate={-14}
              size="lg"
              className="absolute top-[34%] left-[8%] z-20"
            >
              Confidential
            </ApprovalStamp>

            <motion.p
              className="relative z-10 mt-5 inline-block -rotate-1 bg-ink px-3 py-2 font-anton text-[7.4vw] leading-none text-warm uppercase sm:text-5xl"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 220, damping: 18 }}
            >
              {c.subheadline}
            </motion.p>

            <div className="mt-3">
              <MagazineSticker shape="pill" tone="cream" rotate={2} delay={0.7}>
                <Sparkle className="mr-1.5 h-3 w-3" color="#B51632" /> {c.stickers[6]}
              </MagazineSticker>
            </div>

            <motion.p
              className="mt-6 max-w-xl font-serif text-[1.45rem] leading-snug italic sm:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-sans text-xs not-italic font-bold tracking-[0.2em] text-cherry uppercase">Sources confirm — </span>
              {c.lede.replace('Sources confirm ', '')}
            </motion.p>
          </div>

          {/* ── Theo cut-out collage ─────────────────── */}
          <div className="relative mt-8 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <div className="relative">
              {/* pink halftone blob behind him */}
              <div
                aria-hidden="true"
                className="halftone absolute top-[10%] right-[2%] aspect-square w-[62%] rounded-full text-cherry/60 sm:w-[48%] lg:right-[6%] lg:w-[80%]"
              />
              <Heart className="absolute top-[3%] right-[46%] w-14 rotate-[-14deg] sm:w-20 lg:right-[70%]" color="#F4B8CC" />
              <Kiss className="absolute right-[1%] bottom-[30%] z-20 w-20 rotate-[16deg] sm:w-24" />

              <motion.div
                className="relative z-10 ml-auto w-[60%] sm:w-[44%] lg:w-[76%]"
                initial={{ opacity: 0, x: 60, rotate: 8 }}
                animate={{ opacity: 1, x: 0, rotate: 2.5 }}
                transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.25 }}
              >
                <TheoCutout src={config.images.hero} pose="full" eager />
                <MagazineSticker
                  shape="circle"
                  tone="gold"
                  rotate={-12}
                  delay={1}
                  className="absolute top-[18%] -right-2 z-20 w-[34%] border-ink text-ink sm:-right-4"
                >
                  {c.stickers[4]}
                </MagazineSticker>
                <PaperNote
                  variant="clipping"
                  rotate={-3}
                  tape={false}
                  delay={1.3}
                  className="absolute -bottom-3 left-[-6%] z-20 w-[108%]"
                >
                  <p className="text-center font-sans text-[10px] leading-tight font-bold tracking-wide text-ink uppercase sm:text-[11px]">
                    {config.easterEggs.boyfriend}
                  </p>
                </PaperNote>
              </motion.div>

              {/* speech bubble */}
              <div className="absolute top-[6%] left-0 z-20 w-[48%] sm:w-[40%] lg:top-[2%] lg:left-[-4%] lg:w-[50%]">
                <SpeechBubble tail="right" rotate={-3} delay={0.9}>
                  <p className="font-serif text-[1.05rem] leading-tight italic sm:text-xl">“{c.speechBubble}”</p>
                </SpeechBubble>
              </div>

              {/* stickers + annotation on the left of him */}
              <MagazineSticker
                shape="burst"
                tone="red"
                rotate={-10}
                delay={1.15}
                float
                className="absolute top-[33%] left-[2%] z-20 w-[34%] sm:w-[24%] lg:top-[40%] lg:left-[-2%] lg:w-[34%]"
              >
                {c.stickers[0]}
              </MagazineSticker>

              <div className="absolute bottom-[12%] left-0 z-20 w-[42%] sm:w-[36%] lg:bottom-[14%] lg:left-[-6%]">
                <p className="-rotate-6 font-hand text-[1.6rem] leading-[0.95] text-cherry sm:text-3xl">{c.annotation}</p>
                <ScribbleArrow className="mt-1 ml-[30%] w-16 rotate-[-10deg] sm:w-20" delay={1.4} />
              </div>
            </div>
          </div>

          {/* ── The story ─────────────────────────────── */}
          <div className="relative mt-12 lg:col-span-7 lg:mt-10">
            <div className="flex items-center gap-3">
              <span className="h-[3px] flex-1 bg-ink" />
              <span className="font-anton text-sm tracking-[0.3em] uppercase">The full story</span>
              <span className="h-[3px] flex-1 bg-ink" />
            </div>

            <div className="relative mt-5 grid gap-x-8 gap-y-3 font-sans text-[1.05rem] leading-relaxed sm:grid-cols-2">
              <p>
                {/* Drop cap as a real element: CSS ::first-letter breaks inside multi-column layouts */}
                <span aria-hidden="true" className="float-left mt-1 mr-2 font-anton text-7xl leading-[0.8] text-cherry">
                  {c.story[0].charAt(0)}
                </span>
                <span className="sr-only">{c.story[0].charAt(0)}</span>
                {c.story[0].slice(1)} {c.story[1]}
              </p>
              <p className="font-bold">{c.story[2]}</p>

            </div>

            <ul className="mt-6 space-y-2">
              {c.escalation.map(([q, a], i) => (
                <motion.li
                  key={q}
                  className="flex items-baseline gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ delay: 0.15 * i }}
                >
                  <span className="relative font-anton text-2xl uppercase">
                    {q}
                    {i < 2 && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute top-1/2 left-[-4%] h-[3px] w-[108%] origin-left -rotate-3 bg-cherry"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 + 0.15 * i, duration: 0.35 }}
                      />
                    )}
                  </span>
                  <span className="font-hand text-2xl leading-none text-cherry">{a}</span>
                </motion.li>
              ))}
            </ul>

            <div className="relative mt-6 inline-block">
              <MagazineSticker shape="label" tone="blush" rotate={-2} delay={0.2}>
                {c.stickers[5]}
              </MagazineSticker>
            </div>

            {/* Easter egg — sticky note */}
            <PaperNote
              variant="sticky"
              rotate={4}
              tape={false}
              inView
              className="float-right mt-4 ml-3 w-36 sm:w-40"
            >
              <p className="font-hand text-xl leading-[1] text-ink">{config.easterEggs.meeting}</p>
            </PaperNote>

            {/* The reveal */}
            <motion.h2
              className="clear-both mt-10 font-serif text-[2.4rem] leading-[1.02] font-black tracking-tight italic sm:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
            >
              So naturally, we contacted{' '}
              <span className="relative inline-block text-cherry">
                Theo James.
                <ScribbleUnderline className="absolute -bottom-2 left-0 h-4 w-full" delay={0.4} />
              </span>
            </motion.h2>

            <div className="mt-6 max-w-xl space-y-2 text-lg">
              <p>{c.revealFollowUp[0]}</p>
              <p className="font-serif text-xl italic">
                {c.revealFollowUp[1].replace('an extremely handsome British actor.', '')}
                <mark className="bg-pink px-1 font-bold text-ink not-italic">an extremely handsome British actor.</mark>
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────── */}
        <div className="relative mt-14 flex flex-col items-center text-center">
          <MagazineSticker shape="burst" tone="pink" rotate={12} delay={0.4} float className="absolute -top-12 right-[2%] w-24 text-ink sm:right-[18%] sm:w-28">
            {c.stickers[2]}
          </MagazineSticker>
          <MagazineSticker shape="pill" tone="red" rotate={-5} delay={0.6} className="absolute -top-8 left-[2%] sm:left-[18%]">
            {c.stickers[3]}
          </MagazineSticker>

          <div className="relative mt-6">
            <Tape className="absolute -top-4 -left-6 z-10 rotate-[-28deg]" color="rgba(189,163,106,.7)" />
            <BirthdayButton ref={btn} onClick={open} disabled={opening} aria-label="Open the urgent message">
              {c.cta}
            </BirthdayButton>
          </div>
          <p className="mt-5 max-w-sm font-sans text-sm text-ink/70 italic">{c.microcopy}</p>
          <p className="mt-2 rotate-[-2deg] font-hand text-lg text-burgundy/80">psst… {config.easterEggs.hr}</p>
        </div>
      </div>

      <FloatingHearts burst={hearts} count={18} />
    </div>
  )
}

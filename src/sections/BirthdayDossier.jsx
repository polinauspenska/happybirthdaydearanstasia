import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import MagazineSticker from '../components/MagazineSticker'
import TheoCutout, { Polaroid } from '../components/TheoCutout'
import SpeechBubble from '../components/SpeechBubble'
import BirthdayButton from '../components/BirthdayButton'
import ApprovalStamp from '../components/ApprovalStamp'
import { burstConfetti } from '../components/ConfettiEffect'
import { Heart, Kiss, PaperClip, ScribbleCircle, Tape } from '../components/Doodles'

export default function BirthdayDossier({ config, onNext }) {
  const c = config.dossier
  const reduce = useReducedMotion()
  const verdictRef = useRef(null)
  const verdictInView = useInView(verdictRef, { once: true, amount: 0.6 })
  const [stamped, setStamped] = useState(false)

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden pt-14 pb-16"
      style={{
        background:
          'radial-gradient(120% 80% at 50% 0%, #8a2a3e 0%, #751B30 45%, #4a1220 100%)',
      }}
    >
      {/* desk texture */}
      <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 text-black/20" />

      <div className="relative mx-auto max-w-6xl px-3 sm:px-8">
        <div className="relative grid gap-6 lg:grid-cols-12">
          {/* ── The folder ───────────────────────────── */}
          <div className="relative lg:col-span-8" style={{ perspective: 1800 }}>
            {/* folder tab */}
            <div className="relative ml-4 inline-block rounded-t-lg bg-manila px-5 pt-2 pb-1 font-anton text-xs tracking-[0.25em] text-burgundy uppercase">
              File · {c.meta[0][1]}
            </div>

            <div className="relative">
              {/* back of folder + paper sheet */}
              <div className="relative rounded-b-lg rounded-tr-lg bg-manila p-2.5 shadow-[0_30px_50px_-20px_rgba(0,0,0,.7)] sm:p-4">
                <div className="relative bg-warm px-4 pt-8 pb-24 sm:px-10 sm:pt-10 sm:pb-28">
                  {/* typed lines on paper */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 31px, rgba(96,132,178,.18) 31px 32px)',
                    }}
                  />

                  <PaperClip className="absolute -top-6 right-[22%] z-30 w-6 sm:right-[18%]" />
                  <div className="absolute -top-3 right-2 z-20 w-[34%] max-w-[170px] sm:right-6">
                    <Polaroid src={config.images.recipient} alt={`${config.recipient}, the subject of the file`} caption="Exhibit A" rotate={6} />
                  </div>

                  <div className="relative pr-[36%] sm:pr-[30%]">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-cherry uppercase">Birthday committee · Internal use only</p>
                    <h1 className="mt-2 font-anton text-[15vw] leading-[0.85] tracking-tight text-ink uppercase sm:text-8xl">
                      {c.headline}
                    </h1>
                    <h2 className="mt-2 font-serif text-xl leading-tight font-black italic sm:text-3xl">{c.subheadline}</h2>
                  </div>

                  {/* metadata */}
                  <dl className="relative mt-6 grid grid-cols-1 gap-x-6 gap-y-1 border-y-2 border-ink py-3 font-mono text-[12px] sm:grid-cols-2 sm:text-sm">
                    {c.meta.map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <dt className="shrink-0 font-bold uppercase">{k}:</dt>
                        <dd className="uppercase">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <MagazineSticker shape="tag" tone="red" rotate={-4} delay={0.9} className="mt-4">
                    {c.confidential}
                  </MagazineSticker>

                  {/* findings */}
                  <table className="relative mt-6 w-full border-collapse text-left">
                    <caption className="sr-only">Official findings</caption>
                    <thead>
                      <tr className="border-b-[3px] border-ink">
                        <th className="w-[42%] pb-2 font-anton text-xs tracking-[0.2em] uppercase sm:text-sm">Category</th>
                        <th className="pb-2 font-anton text-xs tracking-[0.2em] uppercase sm:text-sm">Official findings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.findings.map(([k, v], i) => {
                        const isTaste = /taste/i.test(k)
                        const isVerdict = i === c.findings.length - 1
                        return (
                          <motion.tr
                            key={k}
                            className="border-b border-dashed border-ink/25 align-top"
                            initial={{ opacity: 0, x: -14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.9 }}
                            transition={{ delay: reduce ? 0 : 0.05 * (i % 4), duration: 0.35 }}
                          >
                            <th scope="row" className="py-2.5 pr-3 font-sans text-[13px] font-bold tracking-wide text-ink/80 uppercase sm:text-sm">
                              {k}
                            </th>
                            <td className="relative py-2.5">
                              <span
                                className={`relative inline-block ${
                                  isVerdict
                                    ? 'font-anton text-xl tracking-wide text-cherry uppercase sm:text-2xl'
                                    : isTaste
                                      ? 'font-hand text-[1.7rem] leading-none text-cherry'
                                      : 'font-serif text-[1.05rem] italic sm:text-lg'
                                }`}
                              >
                                {v}
                                {isTaste && <ScribbleCircle className="absolute -inset-x-4 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+32px)]" delay={0.3} />}
                              </span>
                              {isTaste && <Heart className="ml-2 inline-block w-5 -rotate-12 align-middle" />}
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>

                  <p className="mt-8 -rotate-2 font-hand text-[1.7rem] leading-none text-cherry sm:text-3xl">
                    {c.note} <span className="text-ink">✍︎</span>
                  </p>

                  {/* stamp lands on the paper once the verdict is in */}
                  <ApprovalStamp
                    show={stamped}
                    size="md"
                    rotate={-14}
                    className="absolute right-[3%] bottom-[2%] z-20 sm:right-[8%] sm:bottom-[4%]"
                  >
                    {c.stamp}
                  </ApprovalStamp>
                </div>
              </div>

              {/* front cover swings open on arrival */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg bg-manila shadow-[inset_0_0_0_2px_rgba(117,27,48,.15)]"
                style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -172, opacity: [1, 1, 0] }}
                transition={{ delay: 0.35, duration: reduce ? 0 : 1.1, ease: [0.6, 0.05, 0.25, 1], opacity: { times: [0, 0.85, 1], duration: reduce ? 0 : 1.1, delay: 0.35 } }}
              >
                <div className="flex h-full flex-col items-center justify-start gap-4 pt-[18%]">
                  <span className="border-4 border-cherry px-4 py-2 font-anton text-4xl tracking-widest text-cherry uppercase sm:text-6xl">
                    Top secret
                  </span>
                  <span className="font-mono text-sm tracking-[0.3em] text-burgundy uppercase">{c.meta[0][1]}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Theo reviewing the evidence ──────────── */}
          <div ref={verdictRef} className="relative lg:col-span-4 lg:pt-24">
            <div className="relative mx-auto flex max-w-md items-end gap-2 lg:block">
              <div className="relative z-10 w-[48%] shrink-0 lg:mx-auto lg:w-[86%]">
                <Tape className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 rotate-[4deg]" color="rgba(232,207,152,.85)" pattern="plain" />
                <TheoCutout src={config.images.dossier} pose="portrait" rotate={-3} />
                <p className="mt-2 text-center font-hand text-xl text-blush">Lead investigator*</p>
              </div>

              <div className="relative min-w-0 flex-1 pb-6 lg:mt-4 lg:w-full">
                {verdictInView && (
                  <SpeechBubble tail="left" rotate={2} className="lg:[&>svg]:hidden">
                    <div className="space-y-1">
                      {c.verdict.map((v, i) => (
                        <motion.p
                          key={v}
                          className={`leading-tight ${i === 1 ? 'font-anton text-3xl tracking-wide text-cherry uppercase sm:text-4xl' : 'font-serif text-base text-ink italic sm:text-lg'}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reduce ? 0 : 0.35 + i * 0.6 }}
                          onAnimationComplete={() => {
                            if (i === c.verdict.length - 1 && !stamped) {
                              setStamped(true)
                              setTimeout(() => burstConfetti({ x: 0.5, y: 0.7, count: 50, spread: 60 }), 350)
                            }
                          }}
                        >
                          “{v}”
                        </motion.p>
                      ))}
                    </div>
                  </SpeechBubble>
                )}
                {stamped && (
                  <motion.div
                    className="absolute -right-3 -bottom-10 w-24 sm:w-28"
                    initial={{ opacity: 0, scale: 2.4, rotate: 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 14 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.5 }}
                  >
                    <Kiss />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center text-center">
          <BirthdayButton tone="pink" onClick={onNext}>
            {c.cta}
          </BirthdayButton>
          <p className="mt-4 font-sans text-sm text-blush/80 italic">Findings may be exaggerated. Then again, maybe not.</p>
        </div>
      </div>
    </div>
  )
}

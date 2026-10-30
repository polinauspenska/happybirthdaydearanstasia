import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import config from './config/birthdayConfig'
import SectionTransition from './components/SectionTransition'
import BreakingNews from './sections/BreakingNews'
import TheoMessage from './sections/TheoMessage'
import BirthdayDossier from './sections/BirthdayDossier'
import CompatibilityQuiz from './sections/CompatibilityQuiz'
import BirthdayFinale from './sections/BirthdayFinale'

const CHAPTERS = [BreakingNews, TheoMessage, BirthdayDossier, CompatibilityQuiz, BirthdayFinale]

export default function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [furthest, setFurthest] = useState(0)
  // Wait for the heart preloader (in index.html) to finish so Chapter 1's opening animations are seen
  const [ready, setReady] = useState(() => typeof window === 'undefined' || !!window.__preloaderDone || !document.getElementById('preloader'))
  useEffect(() => {
    if (ready) return
    const done = () => setReady(true)
    window.addEventListener('preloader-done', done)
    return () => window.removeEventListener('preloader-done', done)
  }, [ready])

  const goTo = useCallback(
    (next) => {
      if (next < 0 || next >= CHAPTERS.length || next === index) return
      setDirection(next > index ? 1 : -1)
      setIndex(next)
      setFurthest((f) => Math.max(f, next))
    },
    [index],
  )

  useEffect(() => {
    document.title = index === 0 ? `${config.recipient}, someone special has a message for you 💋` : `${config.chapterNames[index]} · ${config.siteTitle}`
  }, [index])

  const Chapter = CHAPTERS[index]

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-[100svh]">
        <ChapterNav index={index} furthest={furthest} onSelect={goTo} />
        <AnimatePresence
          mode="wait"
          custom={direction}
          onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}
        >
          {ready && (
          <SectionTransition key={index} direction={direction} label={`Chapter ${index + 1}: ${config.chapterNames[index]}`}>
            <Chapter config={config} onNext={() => goTo(index + 1)} onRestart={() => goTo(0)} />
          </SectionTransition>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

/** Small magazine-style progress indicator. Only already-visited chapters are clickable. */
function ChapterNav({ index, furthest, onSelect }) {
  const dark = index === 1 || index === 2
  return (
    <nav
      aria-label="Chapters"
      className={`pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),10px)] pb-2 sm:px-6 ${dark ? 'text-warm' : 'text-ink'}`}
    >
      <span className="font-anton text-[11px] uppercase tracking-[0.28em] opacity-80 sm:text-xs">
        Ch. {String(index + 1).padStart(2, '0')} <span className="opacity-50">/ 05</span>
      </span>
      <ol className="pointer-events-auto flex items-center gap-1.5">
        {CHAPTERS.map((_, i) => {
          const reachable = i <= furthest
          const active = i === index
          return (
            <li key={i}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onSelect(i)}
                aria-label={`Go to chapter ${i + 1}: ${config.chapterNames[i]}`}
                aria-current={active ? 'step' : undefined}
                className="grid h-7 w-7 cursor-pointer place-items-center disabled:cursor-default"
              >
                <motion.svg viewBox="0 0 24 22" className="h-3.5 w-3.5" animate={{ scale: active ? 1.35 : 1 }} aria-hidden="true">
                  <path
                    d="M12 21s-7.5-4.6-10-9.3C.3 8.5 2.1 4.5 6 4.5c2.3 0 3.7 1.3 6 3.6 2.3-2.3 3.7-3.6 6-3.6 3.9 0 5.7 4 4 7.2C19.5 16.4 12 21 12 21z"
                    fill={active ? (dark ? '#F4B8CC' : '#B51632') : reachable ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity={reachable || active ? 1 : 0.45}
                  />
                </motion.svg>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

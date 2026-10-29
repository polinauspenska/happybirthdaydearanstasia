import { useEffect, useId, useState } from 'react'
import { motion } from 'motion/react'

/**
 * Magazine-style cut-out photo.
 * Shows the image at `src` with a white sticker outline + offset paper shadow.
 * If the image is missing, it renders a designed "mystery silhouette"
 * placeholder that names the file to drop in — so swapping is trivial.
 *
 * pose: 'full' (full-body, tall) | 'portrait' (head & shoulders)
 */
export default function TheoCutout({
  src,
  alt = 'Cut-out photo of Theo James (fan-made, fictional birthday parody)',
  pose = 'portrait',
  rotate = 0,
  className = '',
  eager = false,
  flip = false,
  caption,
  children,
}) {
  const [failed, setFailed] = useState(!src)
  useEffect(() => setFailed(!src), [src])

  const aspect = pose === 'full' ? '200 / 420' : '200 / 250'

  return (
    <motion.figure
      className={`relative m-0 ${className}`}
      style={{ aspectRatio: aspect, rotate }}
      initial={false}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className="cutout-border h-full w-full object-contain object-bottom"
          style={{ transform: flip ? 'scaleX(-1)' : undefined }}
          draggable={false}
        />
      ) : (
        <Placeholder pose={pose} file={src} flip={flip} />
      )}
      {caption}
      {children}
    </motion.figure>
  )
}

function Placeholder({ pose, file, flip }) {
  const id = useId().replace(/:/g, '')
  const fileName = (file || '').split('/').pop() || 'theo.webp'
  return (
    <div className="relative h-full w-full" role="img" aria-label="Placeholder for a Theo James cut-out photo">
      <svg
        viewBox={pose === 'full' ? '0 0 200 420' : '0 0 200 250'}
        className="cutout-border h-full w-full"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`ht-${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <circle cx="3" cy="3" r="1.1" fill="#fff" fillOpacity="0.16" />
          </pattern>
          <linearGradient id={`sh-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a3131" />
            <stop offset="1" stopColor="#1c1717" />
          </linearGradient>
        </defs>
        {pose === 'full' ? (
          <g>
            <g fill={`url(#sh-${id})`}>
              <path d="M73 50 C 70 24, 90 12, 108 15 C 128 18, 136 34, 128 56 C 130 74, 120 90, 100 90 C 80 90, 70 72, 73 50 Z" />
              <rect x="90" y="84" width="20" height="20" rx="4" />
              <path d="M58 104 C 70 96, 86 96, 100 104 C 114 96, 130 96, 142 104 C 160 112, 166 130, 168 160 L 174 250 C 175 262, 162 264, 160 252 L 152 196 L 150 252 L 50 252 L 48 196 L 40 252 C 38 264, 25 262, 26 250 L 32 160 C 34 130, 40 112, 58 104 Z" />
              <path d="M54 248 L 146 248 L 141 404 L 109 404 L 102 292 L 98 292 L 91 404 L 59 404 Z" />
              <ellipse cx="74" cy="408" rx="20" ry="7" />
              <ellipse cx="126" cy="408" rx="20" ry="7" />
            </g>
            <path d="M100 104 L 88 150 L 100 196 L 112 150 Z" fill="#F8F1E7" opacity="0.9" />
            <path d="M100 104 L 92 128 L 100 124 L 108 128 Z" fill="#B51632" />
            <rect width="200" height="420" fill={`url(#ht-${id})`} />
          </g>
        ) : (
          <g>
            <g fill={`url(#sh-${id})`}>
              <path d="M56 86 C 50 40, 82 22, 106 26 C 136 30, 150 54, 144 90 C 146 124, 128 148, 100 148 C 72 148, 54 124, 56 86 Z" />
              <rect x="86" y="136" width="28" height="30" rx="6" />
              <path d="M8 250 C 10 196, 44 172, 84 162 L 100 176 L 116 162 C 156 172, 190 196, 192 250 Z" />
            </g>
            <path d="M84 162 L 100 214 L 116 162 L 100 176 Z" fill="#F8F1E7" opacity="0.9" />
            <rect width="200" height="250" fill={`url(#ht-${id})`} />
          </g>
        )}
        <text
          x="100"
          y={pose === 'full' ? 62 : 96}
          textAnchor="middle"
          fontFamily="Anton, Impact, sans-serif"
          fontSize={pose === 'full' ? 22 : 34}
          fill="#F4B8CC"
        >
          ?
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] flex flex-col items-center gap-1 px-2">
        <span className="rotate-[-3deg] bg-warm px-2 py-1 font-hand text-lg leading-none text-cherry shadow-sm sm:text-xl">
          Theo's photo goes here
        </span>
        <span className="rotate-[1deg] bg-ink/85 px-1.5 py-0.5 font-mono text-[9px] tracking-tight text-blush">
          public/images/{fileName}
        </span>
      </div>
    </div>
  )
}

/** Polaroid frame — used for photos of the birthday girl. */
export function Polaroid({ src, alt, caption, rotate = 0, className = '', children }) {
  const [failed, setFailed] = useState(!src)
  useEffect(() => setFailed(!src), [src])
  const fileName = (src || '').split('/').pop()
  return (
    <figure
      className={`relative m-0 bg-warm p-2.5 pb-11 paper-shadow ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-blush">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-pink via-blush to-warm p-3 text-center"
            role="img"
            aria-label="Placeholder for a photo of the birthday girl"
          >
            <svg viewBox="0 0 24 22" className="w-1/3" aria-hidden="true">
              <path
                d="M12 21s-7.5-4.6-10-9.3C.3 8.5 2.1 4.5 6 4.5c2.3 0 3.7 1.3 6 3.6 2.3-2.3 3.7-3.6 6-3.6 3.9 0 5.7 4 4 7.2C19.5 16.4 12 21 12 21z"
                fill="#B51632"
              />
            </svg>
            <span className="font-hand text-lg leading-none text-cherry">Her photo here</span>
            <span className="font-mono text-[9px] text-burgundy/80">public/images/{fileName}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-xl leading-none text-ink sm:text-2xl">
          {caption}
        </figcaption>
      )}
      {children}
    </figure>
  )
}

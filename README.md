# Theo James × Anastasia: The Birthday Edition 💋

A five-chapter, scrapbook-style birthday surprise for Anastasia's 26th, from her girls at work.

1. **Breaking News** — tabloid front page, confidential stamp, confetti
2. **A Very Important Message** — Theo's fictional greeting, revealed one tap at a time
3. **The Official Dossier** — a folder that swings open, findings, an APPROVED stamp
4. **The Compatibility Assessment** — a quiz you can't lose, a 0→100 meter, endless compliments
5. **The Grand Finale** — the girls' letter, the birthday kiss and the punchline

> This is a humorous, unofficial fan-made parody. Theo James was not involved, and every quote attributed to him is fictional. The site says so in several places; please keep those lines.

Built with React, Vite, Tailwind CSS v4 and Motion. No backend. Fonts are self-hosted.

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

Requires Node 18+.

---

## Customise everything from one file

All names, copy, quiz answers, compliments and image paths live in **`src/config/birthdayConfig.js`**. Change `recipient`, `age`, `sender` or any line of text there; you never need to touch the components.

A few handy fields:

| Field | What it controls |
|---|---|
| `recipient`, `age`, `sender` | Used everywhere (headlines, letter, dossier, certificate) |
| `theoMessage.lines` | The 11 lines revealed in Chapter 2 |
| `dossier.findings` | Rows of the dossier table |
| `quiz.options`, `quiz.compliments` | Quiz answers and the random compliments |
| `finale.letter` | The birthday letter, one paragraph per item |
| `easterEggs` | The little hidden jokes |

---

## Add the photos

Drop images into **`public/images/`** with these names (or change the paths in `birthdayConfig.js → images`):

| File | Where it appears | Suggested look |
|---|---|---|
| `theo-hero.webp` | Chapter 1 | Confident, **full-body** |
| `theo-message.webp` | Chapter 2 | Charming portrait, head & shoulders |
| `theo-dossier.webp` | Chapter 3 | Serious, "reviewing the file" |
| `theo-quiz.webp` | Chapter 4 | Flirty / smiling |
| `theo-finale.webp` | Chapter 5 + kiss scene | Warm smile, blowing a kiss |
| `anastasia.webp` | Chapters 3 and 5 (polaroids) | Any photo of the birthday girl |

Until a file exists, a styled placeholder shows the exact filename it is waiting for, so the site always looks finished.

**For the best cut-out effect**, use PNG or WebP with a **transparent background** (remove.bg, Canva's background remover, or Photoshop). The white sticker outline and paper shadow are added automatically around the person's shape. Keep each file under ~300 KB (about 900px tall is plenty). If you use a different format, just change the extension in the config.

Optional extras in the config:

- `images.messagePoses`: several photos for Chapter 2; the picture changes as the message unfolds.
- `images.compliments`: several photos for Chapter 4; one is shown per compliment.

Only use photos you have the right to use, and keep it a private gift.

---

## Deploy to Cloudflare Pages

1. Push this repository to GitHub (already done if you're reading this there).
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages → Connect to Git** and pick this repository.
3. Build settings:
   - **Framework preset:** Vite (or *None*)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable (optional):** `NODE_VERSION` = `20`
4. Click **Save and Deploy**. You'll get a URL like `https://happybirthdaydearanstasia.pages.dev`.

Every push to `main` redeploys automatically.

### Make the WhatsApp preview work

WhatsApp needs the **full** URL of the preview image. Open **`.env`** and set `VITE_SITE_URL` to your real Pages address (no trailing slash), e.g.

```
VITE_SITE_URL=https://happybirthdaydearanstasia.pages.dev
```

Commit, let it redeploy, then paste the link into WhatsApp. If an old preview is cached, add `?v=2` to the end of the link.

The preview image is `public/og-image.jpg` (1200×630) and the favicon is `public/favicon.svg`.

---

## Accessibility & performance

- Respects the system **reduced-motion** setting (no confetti, no floating hearts, instant reveals).
- Every interaction is a real `<button>`, works with keyboard (Space / → advance Chapter 2, Esc closes the kiss).
- Mobile-first layouts tested at 390px wide with no horizontal scrolling.
- No autoplaying audio.

## Project structure

```
public/
  images/            ← put the photos here
  favicon.svg  og-image.jpg  apple-touch-icon.png
src/
  config/birthdayConfig.js   ← all text + image paths
  components/                ← stickers, cut-outs, bubbles, stamps, confetti, doodles
  sections/                  ← the five chapters
  lib/effects.js             ← confetti helpers
  App.jsx  main.jsx  index.css
```

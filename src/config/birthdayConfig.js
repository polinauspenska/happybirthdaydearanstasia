/**
 * ─────────────────────────────────────────────────────────────
 *  BIRTHDAY CONFIG — edit everything about the site from here.
 * ─────────────────────────────────────────────────────────────
 *  Names, ages, copy, quiz answers, compliments and image paths
 *  all live in this one file. You never need to touch the
 *  components to personalise the site.
 *
 *  IMAGES: drop files into /public/images using the names below.
 *  If a file is missing, a styled placeholder is shown instead,
 *  so the site always looks finished.
 *  Tip: PNG or WebP with a TRANSPARENT background gives the best
 *  "magazine cut-out" look (the white sticker border is added
 *  automatically around the shape of the person).
 */

const recipient = 'Anastasia'
const age = 26
const sender = 'Your Girls From Work'
const celebrity = 'Theo James'
const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const birthdayConfig = {
  recipient,
  age,
  ageOrdinalSuffix: ordinal(age).replace(String(age), ''),
  sender,
  celebrity,
  siteTitle: `${celebrity} × ${recipient}: The Birthday Edition`,

  images: {
    // Chapter 1 — confident, full-body cut-out
    hero: 'images/theo-hero.webp',
    // Chapter 2 — romantic / charming portrait
    message: 'images/theo-message.webp',
    // Optional: extra poses for Chapter 2. The photo changes as the
    // message unfolds. Leave empty to reuse `message` with subtle motion.
    messagePoses: [
      'images/theo-message.webp',
      'images/theo-pose-09.webp',
      'images/theo-pose-04.webp',
      'images/theo-pose-10.webp',
      'images/theo-pose-01.webp',
      'images/theo-extra-09.webp',
      'images/theo-pose-07.webp',
      'images/theo-extra-04.webp',
      'images/theo-pose-11.webp',
    ],
    // Chapter 3 — serious "reviewing the file" look
    dossier: 'images/theo-dossier.webp',
    // Chapter 4 — flirty / smiling
    quiz: 'images/theo-quiz.webp',
    // Optional: one image per compliment, in the same order as quiz.compliments. Leave empty to reuse `quiz`.
    compliments: [
      'images/theo-extra-01.webp',
      'images/theo-extra-02.webp',
      'images/theo-extra-06.webp',
      'images/theo-extra-07.webp',
      'images/theo-extra-08.webp',
      'images/theo-extra-10.webp',
      'images/theo-extra-11.webp',
      'images/theo-extra-05.webp',
    ],
    // Chapter 5 — warm smile, blowing a kiss or holding a flower
    finale: 'images/theo-finale.webp',
    // The birthday-kiss scene (falls back to `finale` if removed)
    kiss: 'images/theo-kiss.webp',
    // The birthday girl herself (polaroids in Chapters 3 and 5)
    recipient: 'images/anastasia.webp',
    // Finale collage polaroid
    recipientFinale: 'images/anastasia-finale.webp',
    // "Further evidence" polaroid strip in the finale (caption + image)
    recipientGallery: [
      ['images/anastasia-2.webp', 'Exhibit B: iced coffee era'],
      ['images/anastasia-3.webp', 'Exhibit C: main character'],
      ['images/anastasia-4.webp', 'Exhibit D: pink is a personality'],
    ],
  },

  // ── CHAPTER 1 ──────────────────────────────────────────────
  breakingNews: {
    topLabel: 'Exclusive • The Birthday Edition • Top Secret',
    masthead: 'The Birthday Gazette',
    headline: 'Breaking News!',
    subheadline: `${recipient} is officially ${age}.`,
    lede: "Sources confirm she's still ridiculously gorgeous, mildly dramatic, and completely out of everyone's league.",
    story: [
      "But there's more.",
      'Her girls at work had a very important mission.',
      'Make this birthday absolutely unforgettable.',
    ],
    escalation: [
      ['Flowers?', 'Predictable.'],
      ['Cake?', 'Obviously.'],
      ['A birthday card?', 'Not nearly enough.'],
    ],
    reveal: `So naturally, we contacted ${celebrity}.`,
    revealFollowUp: [
      'Because some situations require professional assistance.',
      'And by professional assistance, we mean an extremely handsome British actor.',
    ],
    speechBubble: 'When the girls from work called, how could I say no?',
    stickers: [
      `${age} & dangerously iconic`,
      'Birthday emergency',
      'Urgent!',
      'Too hot to age',
      'Theo approved*',
      'A special request from the girls',
      'Main character alert',
    ],
    annotation: 'We called. He answered. Allegedly.',
    cta: 'Open the urgent message 💌',
    microcopy: 'This surprise is approximately 99% love and 1% questionable reality.',
  },

  // ── CHAPTER 2 ──────────────────────────────────────────────
  theoMessage: {
    headline: `${recipient}, darling...`,
    subheadline: 'Someone very special has a message for you.',
    label: `A personal birthday message from ${celebrity}*`,
    lines: [
      'Hello, gorgeous.',
      `So, I've been informed that you're turning ${age}.`,
      'Actually, several very persuasive women from your office informed me.',
      "They said you're beautiful, hilarious, and deserve something extraordinary.",
      "And apparently, a regular birthday card wasn't going to cut it.",
      'So naturally, I dropped everything.',
      'Because some birthdays are simply too important to ignore.',
      `${age}, huh? Mature? Perhaps. Gorgeous? Undeniably.`,
      'Some people get older. You just get more iconic.',
      'Your girls clearly know what they\'re doing.',
      `And frankly, ${recipient}, I think we can all agree that the world is a considerably better-looking place with you in it.`,
    ],
    finalQuote: 'Happy birthday, darling.',
    finalAttribution: `${celebrity}*`,
    disclaimer: `*Not actually ${celebrity}. But in our collective imagination? Absolutely.`,
    stickers: ['Stop blushing', 'He said what?!', 'Exclusive message', 'Very British. Very handsome.', "She's the moment"],
    finalNote: 'Okay, girls. This is getting serious.',
    tapHint: 'Tap to hear what he said next',
    cta: "Thanks, Theo. I'm blushing. →",
  },

  // ── CHAPTER 3 ──────────────────────────────────────────────
  dossier: {
    headline: 'Top secret.',
    subheadline: `The official ${recipient} dossier.`,
    meta: [
      ['Case number', `BDAY-0${age}`],
      ['Subject', recipient],
      ['Age', String(age)],
      ['Requested by', 'The girls from work'],
      ['Reviewed by', `${celebrity} (allegedly)`],
    ],
    findings: [
      ['Age', `${age}. Allegedly an adult.`],
      ['Beauty level', 'Suspiciously high'],
      ['Relationship with aging', "It's complicated"],
      ['Emotional stability', 'Depends on the day'],
      ['Main character energy', 'Extremely concerning levels'],
      ['Sense of humour', 'Premium subscription'],
      ['Taste in men', `${celebrity}. Obviously.`],
      ['Red flags', 'Rebranded as personality traits'],
      ['Ability to be iconic', 'Effortless'],
      ['Future prospects', 'Ridiculously promising'],
      ['Birthday status', 'International treasure'],
      ['Official verdict', 'Unreasonably fabulous'],
    ],
    verdict: ["I've reviewed the evidence.", "She's a 10.", 'No further questions.'],
    stamp: 'Officially approved ✓',
    note: 'The birthday committee accepts this verdict.',
    confidential: 'Confidential: too fabulous for public release.',
    cta: 'Find out what Theo really thinks →',
  },

  // ── CHAPTER 4 ──────────────────────────────────────────────
  quiz: {
    headline: 'The ultimate question.',
    subheadline: `What does ${celebrity} really think of ${recipient}?`,
    intro: 'Following an extensive investigation (approximately three seconds), our birthday committee has prepared the final assessment.',
    question: `How would Theo describe ${recipient}?`,
    options: [
      ['A', 'Absolutely breathtaking.'],
      ['B', 'Dangerously charming.'],
      ['C', 'The reason I keep losing focus.'],
      ['D', 'All of the above.'],
    ],
    correctLabel: 'Correct!',
    answerIntro: 'The answer was obviously:',
    answer: 'D. All of the above.',
    answerQuote: 'Was this even a question?',
    answerAttribution: 'Fictional Theo',
    certificateTitle: `${celebrity} compatibility report`,
    certificateScore: '100% Theo approved*',
    certificateStatusLabel: 'Final status:',
    certificateStatus: 'Dangerously compatible.',
    certificateFootnote: '*According to the highly unscientific birthday committee.',
    complimentButton: 'Make Theo say something nice 💋',
    compliments: [
      "You look incredible. It's honestly distracting.",
      `${age}? I would've guessed timeless.`,
      "I'm not saying you're my type. But I'm not denying it.",
      "If confidence were illegal, you'd be in serious trouble.",
      'The birthday girl gets whatever she wants. Within reason.',
      "I wasn't prepared for this level of gorgeous.",
      'Your smile should probably come with a warning.',
      "Even your girls from work know you're one of a kind.",
    ],
    complimentMicrocopy: "Unlimited compliments available. Theo's actual involvement remains unconfirmed.",
    scienceNote: 'Results scientifically verified by absolutely nobody.',
    cta: `One last thing, ${recipient}… 💌`,
  },

  // ── CHAPTER 5 ──────────────────────────────────────────────
  finale: {
    headline: `Happy ${ordinal(age)} birthday, ${recipient}!`,
    subheadline: 'You beautiful little menace.',
    letterGreeting: `Dear ${recipient},`,
    letter: [
      `${age} years of being unapologetically you. And somehow, you just keep getting better.`,
      "Here's to more unforgettable nights, spontaneous adventures, questionable decisions that become excellent stories, and moments that make life ridiculously beautiful.",
      "May this year bring you the kind of love that feels easy, the kind of happiness that sneaks up on you, and the kind of opportunities that make you say, 'Wait, is this actually my life?'",
      'We wish you more laughter than stress, more exciting surprises than Monday meetings, more champagne-worthy moments, and absolutely zero unnecessary drama.',
      "Unless it's entertaining drama. Then obviously, tell us everything.",
      'Never lose your sparkle, your sense of humour, or your ability to make ordinary days a little more interesting.',
      'And remember: getting older is mandatory. Being boring is entirely optional.',
      `We hope your ${ordinal(age)} year is filled with everything you dream of — and a few wonderful surprises you haven't even imagined yet.`,
      "We're so happy we get to know you, laugh with you, and share a little part of life with you.",
    ],
    letterClosing: 'Happy Birthday, gorgeous!',
    signOff: 'With lots of love,',
    signature: `${sender} ❤️`,
    signatureFootnote: `And ${celebrity}, in a strictly fictional capacity.`,
    sticker: `${age} never looked this good.`,
    committeeNote: 'Your birthday committee takes its responsibilities extremely seriously.',
    cta: 'Claim your birthday kiss 💋',
    kissLines: ['One for the birthday girl.', "Don't tell anyone."],
    punchline: 'Unfortunately, Theo is unavailable for physical delivery.',
    punchlineMiddle: "But don't worry.",
    punchlineReveal: "You've got the next best thing.",
    punchlineSender: `${sender}. ❤️`,
    replay: 'One more time',
    closing: `This website was created with love, friendship, and an entirely unreasonable amount of ${celebrity}.`,
    legal: 'Unofficial fan-made birthday parody. No celebrity was involved in the creation of this very important celebration.',
  },

  // Small decorative jokes sprinkled around the site
  easterEggs: {
    meeting: 'We had a very important meeting about this.',
    hr: 'HR was not consulted.',
    boyfriend: 'Official birthday boyfriend. Terms and conditions apply.',
  },

  chapterNames: ['Breaking news', 'The message', 'The dossier', 'The assessment', 'The finale'],
}

export default birthdayConfig

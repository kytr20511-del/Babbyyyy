import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, Flower2, Sparkles, Mail, Coffee, Moon, Gift, ArrowDown, Music2, Pause, Play, Star, Send, Smile, HeartHandshake } from 'lucide-react';
import './styles.css';

/* ─── Mood Booster Messages ─── */
const messages = [
  "You don't have to do anything today except take care of yourself. That's enough. 🌷",
  "Tiny reminder: you are someone's favourite notification. (Mine.) 💌",
  "If today feels heavy, let it be a slow day. You deserve softness, not pressure. ☁️",
  "Sending one forehead kiss, two warm hugs and approximately a million hearts. 💗",
  "Even on your grumpy days, you're still my favourite human. Don't argue. 🤭",
  "You are allowed to rest. The world can wait a little. 🧸",
  "I hope something makes you smile today. If not, please accept this extremely silly virtual hug. 🫂"
];

/* ─── Reasons Cards ─── */
const reasons = [
  ["Your smile", "It has a way of making an ordinary moment feel special."],
  ["Your little things", "The tiny habits and random things that make you unmistakably you."],
  ["Your laugh", "Especially when you laugh at something ridiculously silly."],
  ["Your heart", "The kindness and warmth you bring into the lives around you."],
  ["Just because", "I don't need a reason. Being you is already enough. ♡"],
  ["All of you", "The happy, sleepy, dramatic, quiet and goofy versions. Every one."]
];

/* ─── Hug Data ─── */
const hugMessages = [
  "A BIGGGGG SQUEEEEEZE FOR YOUUUU!! 🫂",
  "One more hug because I miss youuuu!",
  "Come hereeee, I'm not done hugging you!",
  "You deserve all the hugs in this universe!",
  "Another one because you're MY FAVOURITE HUMAN!",
  "I wish I could hug you for real right nowww!",
  "Sending you the warmest, tightest hug everrrrr!",
  "Consider yourself hugged a million times!"
];

const hugLabels = [
  "Give me a hugggg!",
  "One more!!!",
  "Once again!!!",
  "Again again again!!!",
  "I need another hug!!!",
  "More hugs for youuuu!"
];

/* ─── Kiss Data ─── */
const kissMessages = [
  "UMMMMMAAAAAAA!! 💋💋💋",
  "One on your foreheadttt!",
  "Another one because you're too cuteeee!",
  "MUAHHHHHHHHHH!! 😘",
  "A million kisses and still not enoughhhh!",
  "MWAHHH MY BABYYYYYY!! ❤️",
  "UMMMMMAAAAA, COME HEREEEE!! 💋",
  "One kiss for every little smile of yours!",
  "Forehead kiss, cheek kiss, and one moreeee!",
  "Sending you endless kisses until I can give you one for real!"
];

const kissLabels = [
  "SEND ME KISSESSSS 💋",
  "One moreeee!! 💋",
  "Again!! 😘",
  "MOREEE KISSES!! 💋",
  "Kiss me again!! 😘",
  "Don't stoppp!! 💋"
];

/* ─── Love Every Version Lines ─── */
const loveLines = [
  { text: "I like you when you're angry.", type: "line" },
  { text: "I like you when you're sad.", type: "line" },
  { text: "I like you when you're happy.", type: "line" },
  { text: "I like you when you're sleepy.", type: "line" },
  { text: "I like you when you're lazy.", type: "line" },
  { text: "I like you when you're being dramatic.", type: "line" },
  { text: "I like you when you're quiet.", type: "line" },
  { text: "I like you when you don't feel like talking.", type: "line" },
  { text: "I like you on your best days and your worst days.", type: "line" },
  { text: "", type: "spacer" },
  { text: "You don't have to be perfect.", type: "line" },
  { text: "You don't have to be happy all the time.", type: "line" },
  { text: "You don't have to pretend to be okay.", type: "line" },
  { text: "", type: "spacer" },
  { text: "I LOVE YOU AS YOU ARE, BABYYYYYYY. ❤️", type: "highlight" },
  { text: "", type: "spacer" },
  { text: "Whatever mood you're in, whatever kind of day you're having, my love for you isn't going anywhere.", type: "line" },
  { text: "", type: "spacer" },
  { text: "I'll keep choosing you.", type: "line" },
  { text: "I'll keep caring for you.", type: "line" },
  { text: "I'll keep loving you more and more and more.", type: "line" },
  { text: "", type: "spacer" },
  { text: "ALWAYSSSS AND FOREVERRRR!! ❤️", type: "highlight" }
];

/* ─── Random picker that avoids same-as-last ─── */
function pickRandom(arr, lastRef) {
  let next;
  do {
    next = arr[Math.floor(Math.random() * arr.length)];
  } while (arr.length > 1 && next === lastRef.current);
  lastRef.current = next;
  return next;
}

/* ─── Floating Animation Component (reusable for hugs & kisses) ─── */
function FloatingEmojis({ emojis, trigger }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (trigger === 0) return;
    const container = containerRef.current;
    if (!container) return;

    const count = 12 + Math.floor(Math.random() * 6);
    const elements = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'float-emoji';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDelay = `${Math.random() * 0.5}s`;
      el.style.animationDuration = `${1.2 + Math.random() * 1.2}s`;
      el.style.fontSize = `${18 + Math.random() * 20}px`;
      container.appendChild(el);
      elements.push(el);
    }

    const cleanup = setTimeout(() => {
      elements.forEach(el => {
        if (el.parentNode === container) container.removeChild(el);
      });
    }, 2800);

    return () => {
      clearTimeout(cleanup);
      elements.forEach(el => {
        if (el.parentNode === container) container.removeChild(el);
      });
    };
  }, [trigger, emojis]);

  return <div className="float-emoji-container" ref={containerRef} />;
}

/* ─── Scroll Reveal Line Component ─── */
function RevealLine({ children, type, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (type === 'spacer') return <div className="love-spacer" ref={ref} />;

  const delay = `${(index % 5) * 0.08}s`;

  return (
    <div
      ref={ref}
      className={`love-line ${type === 'highlight' ? 'love-highlight' : ''} ${visible ? 'love-visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}

/* ─── Floating Hearts Background ─── */
function FloatingHearts({ count = 8 }) {
  const hearts = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${5 + Math.random() * 5}s`,
      size: `${14 + Math.random() * 14}px`,
      opacity: 0.15 + Math.random() * 0.2
    }))
  ).current;

  return (
    <div className="floating-hearts-bg" aria-hidden="true">
      {hearts.map(h => (
        <span
          key={h.id}
          className="bg-heart"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
            opacity: h.opacity
          }}
        >♡</span>
      ))}
    </div>
  );
}

/* ─── Pulsing Heart Animation ─── */
function PulsingHeart() {
  return (
    <div className="pulsing-heart-wrap" aria-hidden="true">
      <div className="pulsing-heart">❤️</div>
    </div>
  );
}

/* ─── Main App ─── */
function App() {
  const [hugMsg, setHugMsg] = useState('');
  const [hugTrigger, setHugTrigger] = useState(0);
  const [hugClicks, setHugClicks] = useState(0);
  const lastHugMsg = useRef('');

  const [kissMsg, setKissMsg] = useState('');
  const [kissTrigger, setKissTrigger] = useState(0);
  const [kissClicks, setKissClicks] = useState(0);
  const lastKissMsg = useRef('');

  const [message, setMessage] = useState(messages[0]);
  const [letterOpen, setLetterOpen] = useState(false);
  const [flipped, setFlipped] = useState([]);
  const [secret, setSecret] = useState(false);

  const toggleReason = (i) => setFlipped(v => v.includes(i) ? v.filter(x => x !== i) : [...v, i]);

  const handleHug = useCallback(() => {
    setHugMsg(pickRandom(hugMessages, lastHugMsg));
    setHugTrigger(t => t + 1);
    setHugClicks(c => c + 1);
  }, []);

  const handleKiss = useCallback(() => {
    setKissMsg(pickRandom(kissMessages, lastKissMsg));
    setKissTrigger(t => t + 1);
    setKissClicks(c => c + 1);
  }, []);

  const hugLabel = hugClicks === 0 ? 'Send me a hug 🫂' : hugLabels[(hugClicks - 1) % hugLabels.length];
  const kissLabel = kissClicks === 0 ? kissLabels[0] : kissLabels[kissClicks % kissLabels.length];

  return (
    <main>
      {/* ─── Top Bar ─── */}
      <div className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">♡</span> a little love garden</a>
        <span className="top-note">made just for you</span>
      </div>

      {/* ─── Hero ─── */}
      <section className="hero" id="top">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="floating f1">✿</div><div className="floating f2">♡</div><div className="floating f3">✧</div>
        <div className="hero-inner">
          <div className="eyebrow"><span /> A LITTLE PLACE FULL OF LOVE <span /></div>
          <div className="hero-flower">🌷</div>
          <h1>Hey, <em>Babyyyyyyy</em><br /><span className="heart-line">this little world is yours.</span></h1>
          <p className="hero-copy">For the days that feel a little harder, and for every day in between. I made you a tiny corner of the internet filled with reminders of how loved you are.</p>
          <a href="#your-hug" className="primary-btn">Come on in <Heart size={16} fill="currentColor" /></a>
          <div className="scroll-hint"><ArrowDown size={14} /> a little love is waiting below</div>
        </div>
        <div className="hero-bottom-flower">✿　♡　✿</div>
      </section>

      {/* ─── Intro ─── */}
      <section className="intro section-wrap">
        <div className="section-kicker">FIRST THINGS FIRST</div>
        <h2>Take a deep breath, <em>pretty girl.</em></h2>
        <p className="section-lead">You don't need to be cheerful, productive or anything other than yourself today. Get comfy. Be gentle with yourself. Let this little page do the reminding.</p>
        <div className="three-notes">
          <div><span>☁️</span><b>Slow down</b><small>It's okay to take it easy.</small></div>
          <div><span>🫖</span><b>Get cozy</b><small>A warm drink, a blanket, a little rest.</small></div>
          <div><span>💗</span><b>Feel loved</b><small>Because you really, really are.</small></div>
        </div>
      </section>

      {/* ─── Virtual Hugs (UNLIMITED) ─── */}
      <section className="hug-section" id="your-hug">
        <div className="section-wrap hug-layout">
          <div className="hug-art">
            <div className="hug-orbit">♡</div>
            <div className="teddy">🧸</div>
            <span className="spark s-a">✧</span><span className="spark s-b">♡</span><span className="spark s-c">✿</span>
          </div>
          <div className="hug-content">
            <div className="section-kicker">A HUG, DELIVERED INSTANTLY</div>
            <h2>Need a hug?<br /><em>I've got you.</em></h2>
            <p>It may be a digital one for now, but imagine the biggest, warmest, squeeze-you-tight hug. No timer. No letting go early. Click as many times as you want!</p>
            <div className="interaction-zone">
              <button className="primary-btn hug-btn" onClick={handleHug}>
                {hugLabel} <HeartHandshake size={17} />
              </button>
              <FloatingEmojis emojis={['🫂', '💗', '♡', '💕', '🤗', '✨']} trigger={hugTrigger} />
              {hugMsg && (
                <div className="hug-response" role="status" key={hugTrigger}>
                  🫂 {hugMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Kiss Corner (NEW) ─── */}
      <section className="kiss-section" id="kiss-corner">
        <div className="section-wrap kiss-layout">
          <div className="kiss-content">
            <div className="section-kicker">YOUR KISS CORNER 💋</div>
            <h2>A kiss (or a hundred)<br /><em>coming your way!</em></h2>
            <p>Because you deserve all the kisses in this world. Go ahead, tap the button. I dare you to stop at just one! 😘</p>
            <div className="interaction-zone">
              <button className="primary-btn kiss-btn" onClick={handleKiss}>
                {kissLabel}
              </button>
              <FloatingEmojis emojis={['💋', '😘', '💕', '❤️', '✨', '💗']} trigger={kissTrigger} />
              {kissMsg && (
                <div className="kiss-response" role="status" key={kissTrigger}>
                  💋 {kissMsg}
                </div>
              )}
            </div>
          </div>
          <div className="kiss-art">
            <div className="kiss-emoji-big">💋</div>
            <span className="kiss-sparkle ks-1">✧</span>
            <span className="kiss-sparkle ks-2">💕</span>
            <span className="kiss-sparkle ks-3">😘</span>
          </div>
        </div>
      </section>

      {/* ─── Mood Booster ─── */}
      <section className="mood-section section-wrap">
        <div className="section-kicker">A TINY MOOD BOOST</div>
        <h2>A little note for <em>right now.</em></h2>
        <div className="message-card">
          <div className="message-flower">🌸</div>
          <p key={message}>{message}</p>
          <button className="soft-btn" onClick={() => { let next; do { next = messages[Math.floor(Math.random()*messages.length)]; } while (next === message); setMessage(next); }}>Another little reminder <Sparkles size={15} /></button>
        </div>
      </section>

      {/* ─── Love Letter ─── */}
      <section className="letter-section">
        <div className="section-wrap letter-layout">
          <div className="letter-copy">
            <div className="section-kicker">SOMETHING FROM MY HEART</div>
            <h2>A letter, <em>just for you.</em></h2>
            <p>Some things are easier to write down, especially when they matter a lot. There's a little letter waiting for you.</p>
            <button className="primary-btn" onClick={() => setLetterOpen(!letterOpen)}>{letterOpen ? 'Fold my letter' : 'Open your letter'} <Mail size={17} /></button>
          </div>
          <button className={`envelope ${letterOpen ? 'opened' : ''}`} onClick={() => setLetterOpen(!letterOpen)} aria-label="Open or close the love letter">
            <div className="envelope-paper"><span>To my favourite human,</span><Heart size={22} fill="#d9789c" color="#d9789c" /></div>
            <div className="envelope-back" /><div className="envelope-flap" /><div className="envelope-front" /><div className="seal">♡</div>
          </button>
        </div>
        {letterOpen && <div className="letter-reveal section-wrap">
          <div className="letter-paper">
            <div className="letter-top">A LITTLE LETTER FOR YOU <span>♡</span></div>
            <p>Hey Babyyyyyyy,</p>
            <p>I wish I could be right there beside you, making you comfortable, bringing you your favourite things and giving you all the hugs you want.</p>
            <p>I know some days can be uncomfortable and exhausting. You don't have to pretend to be okay with me. You can be quiet, sleepy, grumpy, emotional or anything in between. You never have to earn love by being cheerful.</p>
            <p>Please take care of yourself, get some rest and remember that you deserve all the softness in the world. If I could, I'd make today a little easier for you.</p>
            <p>Until I can give you a real hug, here's a whole page of them.</p>
            <p className="signoff">Sending you all my love, <span>♡</span></p>
          </div>
        </div>}
      </section>

      {/* ─── I Love Every Version of You (NEW) ─── */}
      <section className="love-version-section" id="love-version">
        <FloatingHearts count={10} />
        <div className="section-wrap love-version-inner">
          <div className="section-kicker">SOMETHING I NEED YOU TO KNOW</div>
          <h2>I love <em>every version</em> of you.</h2>
          <div className="love-lines-container">
            {loveLines.map((line, i) => (
              <RevealLine key={i} type={line.type} index={i}>
                {line.text}
              </RevealLine>
            ))}
          </div>
          <PulsingHeart />
        </div>
      </section>

      {/* ─── Forever Promise (NEW) ─── */}
      <section className="promise-section" id="forever-promise">
        <FloatingHearts count={6} />
        <div className="section-wrap promise-inner">
          <div className="promise-glow" aria-hidden="true" />
          <div className="section-kicker">A LITTLE PROMISE FROM ME TO YOU</div>
          <h2>Forever <em>and always.</em> 💗</h2>
          <div className="promise-card">
            <p className="promise-intro">Happy, sad, angry, sleepy, silly, lazy or grumpy...</p>
            <p className="promise-body">You never have to change yourself to be loved by me.</p>
            <p className="promise-bold">I want YOU.</p>
            <p className="promise-bold">Every version of you. Always. 💗</p>
          </div>
          <div className="promise-heart-anim" aria-hidden="true">
            <span className="glow-heart">♡</span>
          </div>
        </div>
      </section>

      {/* ─── Reasons You're Special ─── */}
      <section className="reasons-section section-wrap">
        <div className="section-kicker">JUST IN CASE YOU FORGOT</div>
        <h2>Reasons you're <em>so special.</em></h2>
        <p className="section-lead">Tap each little card. There's a reminder inside. ♡</p>
        <div className="reason-grid">
          {reasons.map(([title, body], i) => <button className={`reason-card ${flipped.includes(i) ? 'is-flipped' : ''}`} key={title} onClick={() => toggleReason(i)}>
            <span className="reason-front"><span className="reason-number">0{i+1}</span><span className="reason-heart">♡</span><b>{title}</b><small>tap to reveal</small></span>
            <span className="reason-back"><span>✿</span>{body}</span>
          </button>)}
        </div>
      </section>

      {/* ─── Comfort Corner ─── */}
      <section className="comfort-section">
        <div className="section-wrap comfort-inner">
          <div className="section-kicker">YOUR LITTLE COMFORT CORNER</div>
          <h2>Today, let's keep it <em>soft.</em></h2>
          <div className="comfort-grid">
            <div className="comfort-item"><span>🛌</span><b>Rest without guilt</b><p>You are allowed to slow down. Everything else can wait.</p></div>
            <div className="comfort-item"><span>🫖</span><b>Something warm</b><p>A warm drink or a heating pad if it feels soothing.</p></div>
            <div className="comfort-item"><span>💧</span><b>A little water</b><p>Keep some water nearby and sip whenever you feel like it.</p></div>
            <div className="comfort-item"><span>🍫</span><b>A tiny treat</b><p>If you want a snack, I vote you get yourself something yummy.</p></div>
          </div>
          <p className="comfort-footnote">These are just gentle comfort ideas, not rules. Listen to your body. If pain is severe or unusual, getting medical advice is a good idea.</p>
        </div>
      </section>

      {/* ─── Secret Surprise ─── */}
      <section className="secret-section section-wrap">
        <div className="gift-icon"><Gift size={30} /></div>
        <div className="section-kicker">P.S. THERE'S ONE MORE THING</div>
        <h2>A tiny <em>secret surprise.</em></h2>
        <p>There's something I want you to remember. Tap the heart when you're ready.</p>
        <button className={`big-heart ${secret ? 'revealed' : ''}`} onClick={() => setSecret(!secret)} aria-label="Reveal the secret message"><Heart size={38} fill="currentColor" /></button>
        {secret && <div className="secret-message">Out of all the people in this whole wide world, I'm really glad it's <strong>you</strong>. You're my favourite plot twist, my sweetest thought and a person I want to keep choosing. I love you, Babyyyyyyy. ♡</div>}
      </section>

      {/* ─── Footer ─── */}
      <footer>
        <div className="footer-flower">🌷</div>
        <h2>One last thing, <em>Babyyyyyyy...</em></h2>
        <p>You don't have to smile every second. You don't have to pretend you're okay. Just be you. On the good days, the messy days and every day in between, you deserve to feel loved.</p>
        <div className="footer-heart">♡</div>
        <div className="footer-note">A little world made with love, just for you.</div>
        <div className="footer-stars">✧　✿　♡　✿　✧</div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

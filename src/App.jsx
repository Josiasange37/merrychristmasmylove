import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Gift, Sparkles, Music, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import emiliaImg from './assets/emilia.png';
import bearLeft from './assets/bear_left.png';
import bearRight from './assets/bear_right.png';

const HeartParticle = ({ delay }) => (
  <motion.div
    initial={{ y: '100vh', opacity: 0, scale: 0 }}
    animate={{
      y: '-10vh',
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 0.8, 1],
      x: ['0vw', '10vw', '-10vw', '0vw']
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
    className="heart-bg"
    style={{ left: `${Math.random() * 100}vw` }}
  >
    <Heart fill="currentColor" size={20 + Math.random() * 30} />
  </motion.div>
);

const SakuraPetal = ({ delay }) => (
  <motion.div
    initial={{ y: -20, x: Math.random() * 100 + 'vw', rotate: 0 }}
    animate={{
      y: '110vh',
      x: [null, (Math.random() - 0.5) * 20 + 'vw'],
      rotate: [0, 360, 720]
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
    className="sakura"
    style={{
      width: 10 + Math.random() * 10 + 'px',
      height: 10 + Math.random() * 10 + 'px',
      opacity: 0.6 + Math.random() * 0.4
    }}
  />
);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [lang, setLang] = useState('fr'); // Default to French as requested
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isHugging, setIsHugging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const translations = {
    en: {
      title: "Merry Christmas",
      subtitle: "to my Princess Emilia",
      click: "Click to open your surprise!",
      name: "Emilia",
      message: "You are my absolute world, my beautiful princess. Every moment with you is like a magical anime adventure. Merry Christmas, I love you more than words can say!",
      music: "Silent Night (Lofi Remix)",
      reasonsTitle: "Reasons why I love you...",
      reasons: [
        "Your beautiful smile that lights up my day ✨",
        "The way you make every moment feel magical 🌸",
        "Your kind heart and amazing soul 💖",
        "Because you are my perfect princess 👑"
      ],
      hug: "Virtual Hug 🤗",
      hugging: "Sending Hugs! 💖"
    },
    fr: {
      title: "Joyeux Noël",
      subtitle: "à ma Princesse Emilia",
      click: "Clique pour ouvrir ta surprise !",
      name: "Emilia",
      message: "Tu es mon univers tout entier, ma magnifique princesse. Chaque instant avec toi est comme une aventure magique, un rêve éveillé. Tu es la plus belle chose qui me soit arrivée. Joyeux Noël, je t'aime de tout mon cœur !",
      music: "Douce Nuit (Lofi Remix)",
      reasonsTitle: "Pourquoi je t'aime...",
      reasons: [
        "Ton sourire magnifique qui illumine ma journée ✨",
        "Ta façon de rendre chaque moment magique 🌸",
        "Ton cœur pur et ton âme merveilleuse 💖",
        "Parce que tu es ma princesse parfaite 👑"
      ],
      hug: "Bouton de Câlin 🤗",
      hugging: "Gros câlins ! 💖"
    },
    jp: {
      title: "メリークリスマス",
      subtitle: "私のプリンセス エミリアへ",
      click: "タップして開けてね！ ✨",
      name: "エミリア",
      message: "君は僕のすべてだよ、僕の美しいお姫様。君との毎日は魔法のようなアニメのアドベンチャーみたい。メリークリスマス、言葉にできないほど愛してるよ。",
      music: "きよしこの夜 (Lofi Remix)",
      reasonsTitle: "君を愛している理由...",
      reasons: [
        "僕の毎日を明るくしてくれる君の美しい笑顔 ✨",
        "すべての瞬間を魔法のようにしてくれるところ 🌸",
        "君の優しい心と素晴らしい魂 💖",
        "君が僕の完璧なお姫様だから 👑"
      ],
      hug: "バーチャルハグ 🤗",
      hugging: "ハグを送信中... 💖"
    }
  };

  const t = translations[lang];

  useEffect(() => {
    if (showText) {
      setDisplayedMessage("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < t.message.length) {
          setDisplayedMessage(prev => prev + t.message.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [showText, t.message]);

  const handleOpenGift = () => {
    setIsOpen(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#ff4d6d', '#fff0f3', '#ffb3c1', '#ffd1dc']
    });
    setTimeout(() => setShowText(true), 800);
  };

  const handleHug = () => {
    setIsHugging(true);
    confetti({
      particleCount: 150,
      startVelocity: 30,
      spread: 360,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#ff4d6d', '#ff85a1', '#ffb3c1'],
      shapes: ['circle']
    });
    setTimeout(() => setIsHugging(false), 3000);
  };

  return (
    <div className="app-container" style={{ cursor: 'none' }}>
      {/* Sakura Petals Background */}
      {[...Array(20)].map((_, i) => (
        <SakuraPetal key={i} delay={i * 1.5} />
      ))}

      {/* Interactive Sparkle Trail */}
      <motion.div
        className="sparkle-trail"
        animate={{ x: mousePos.x - 5, y: mousePos.y - 5 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      />

      {/* Fullscreen Hug Overlay */}
      {isHugging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fullscreen-hug-overlay"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0],
                x: (Math.random() - 0.5) * 80 + 'vw',
                y: (Math.random() - 0.5) * 80 + 'vh'
              }}
              transition={{ duration: 2, delay: Math.random() * 0.5 }}
              style={{ position: 'absolute' }}
            >
              <Heart fill="#ff4d6d" style={{ color: '#ff4d6d' }} size={40 + Math.random() * 60} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Floating Hearts Background */}
      {[...Array(10)].map((_, i) => (
        <HeartParticle key={i} delay={i * 3} />
      ))}

      <div className="language-toggle">
        {['fr', 'en', 'jp'].map((l) => (
          <button
            key={l}
            className={`lang-btn ${lang === l ? 'active' : ''} glass-morphism`}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Snow Particles Placeholder (can be enhanced with a library later if needed) */}
      <div className="snow-overlay"></div>

      {/* Cute Bear Stickers */}
      <motion.img
        src={bearLeft}
        className="bear-sticker bear-left"
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.img
        src={bearRight}
        className="bear-sticker bear-right"
        animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
      />

      <div className="card-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`glass-morphism float ${isOpen ? 'love-letter-fold' : ''}`}
          style={{
            width: '100%',
            borderRadius: '30px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
            padding: !isOpen ? '1.5rem' : 'initial' // Let CSS handle padding for love letter
          }}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="gift-closed"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <Stars className="pink-gradient-text" style={{ width: '40px', height: '40px', marginBottom: '1rem' }} />
                  <h1 style={{ fontSize: '3rem', color: '#ff4d6d' }}>{t.title}</h1>
                  <h2 style={{ fontSize: '1.8rem', color: '#ff85a1' }}>{t.subtitle}</h2>
                </div>

                <div
                  onClick={handleOpenGift}
                  style={{
                    cursor: 'pointer',
                    padding: '1.8rem',
                    borderRadius: '50%',
                    background: 'rgba(255, 133, 161, 0.15)',
                    display: 'inline-block',
                  }}
                  className="pulse-soft"
                >
                  <motion.div
                    animate={{ rotate: [0, -8, 8, -8, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Gift style={{ width: '80px', height: '80px', color: '#ff4d6d' }} />
                  </motion.div>
                </div>
                <p style={{ marginTop: '1.2rem', color: '#ff85a1', fontSize: '1.2rem', fontWeight: 'bold' }}>{t.click}</p>
              </motion.div>
            ) : (
              <motion.div
                key="gift-open"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <div style={{ position: 'relative', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={emiliaImg}
                    alt="Emilia"
                    style={{
                      width: '160px',
                      height: '160px',
                      borderRadius: '50%',
                      border: '5px solid white',
                      boxShadow: '0 0 25px rgba(255, 77, 109, 0.5)',
                      objectFit: 'cover'
                    }}
                  />
                  <motion.div
                    style={{ position: 'absolute', top: -10, right: '25%' }}
                    animate={{ y: [0, -15, 0], scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    <Heart fill="#ff4d6d" style={{ color: '#ff4d6d', width: '35px', height: '35px' }} />
                  </motion.div>
                </div>

                {showText && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h1 style={{ fontSize: '3.2rem', color: '#ff4d6d', marginBottom: '0.2rem' }}>{t.name}</h1>
                    <p className="script-font" style={{
                      fontSize: lang === 'jp' ? '1.2rem' : '1.6rem',
                      color: '#ff4d6d',
                      lineHeight: 1.5,
                      marginBottom: '2rem',
                      minHeight: '4.2rem',
                      padding: '0 10px'
                    }}>
                      {lang === 'jp' ? '「' : '"'}{displayedMessage}{lang === 'jp' ? '」' : '"'}
                      <span className="typewriter-cursor"></span>
                    </p>

                    <div className="reasons-container">
                      <p style={{ color: '#ff4d6d', fontWeight: '800', marginBottom: '15px', fontSize: '1.1rem' }}>{t.reasonsTitle}</p>
                      {t.reasons.map((reason, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5 + idx * 0.3 }}
                          className="reason-card"
                        >
                          <Heart size={16} fill="#ff4d6d" style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} />
                          {reason}
                        </motion.div>
                      ))}
                    </div>

                    <button className="hug-btn" onClick={handleHug}>
                      <Heart fill="white" size={18} />
                      {isHugging ? t.hugging : t.hug}
                    </button>

                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
                        <Sparkles style={{ color: '#ff85a1' }} />
                      </motion.div>
                      <Stars style={{ color: '#ff85a1' }} />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                        <Heart style={{ color: '#ff4d6d' }} fill="#ff4d6d" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div style={{ position: 'fixed', bottom: '20px', zIndex: 5, color: 'white', display: 'flex', gap: '10px', opacity: 0.8 }}>
        <Music size={18} />
        <p style={{ fontSize: '0.9rem' }}>{t.music}</p>
      </div>
    </div>
  );
}

export default App;

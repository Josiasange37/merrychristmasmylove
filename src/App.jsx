import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Gift, Sparkles, Music, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import emiliaImg from './assets/emilia.png';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#ff4d6d', '#fff0f3', '#ffb3c1']
    });
    setTimeout(() => setShowText(true), 800);
  };

  return (
    <div className="app-container">
      {/* Snow Particles Placeholder (can be enhanced with a library later if needed) */}
      <div className="snow-overlay"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="glass-morphism float"
        style={{
          maxWidth: '500px',
          padding: '2.5rem',
          borderRadius: '30px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
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
                <h1 style={{ fontSize: '3rem', color: '#ff4d6d' }}>Merry Christmas</h1>
                <h2 style={{ fontSize: '2rem', color: '#ff85a1' }}>to my Princess Emilia</h2>
              </div>

              <div
                onClick={handleOpenGift}
                style={{
                  cursor: 'pointer',
                  padding: '2rem',
                  borderRadius: '50%',
                  background: 'rgba(255, 133, 161, 0.1)',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
                className="hover-scale"
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Gift style={{ width: '80px', height: '80px', color: '#ff4d6d' }} />
                </motion.div>
              </div>
              <p style={{ marginTop: '1rem', color: '#ff85a1', fontSize: '1.1rem' }}>Click to open your surprise!</p>
            </motion.div>
          ) : (
            <motion.div
              key="gift-open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <img
                  src={emiliaImg}
                  alt="Emilia"
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: '5px solid white',
                    boxShadow: '0 0 20px rgba(255, 77, 109, 0.4)',
                    objectFit: 'cover'
                  }}
                />
                <motion.div
                  style={{ position: 'absolute', top: -10, right: 30 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart fill="#ff4d6d" style={{ color: '#ff4d6d', width: '30px', height: '30px' }} />
                </motion.div>
              </div>

              {showText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 style={{ fontSize: '3.5rem', color: '#ff4d6d', marginBottom: '0.5rem' }}>Emilia</h1>
                  <p className="script-font" style={{ fontSize: '1.6rem', color: '#ff4d6d', lineHeight: 1.4 }}>
                    "You are my absolute world, my beautiful princess. Every moment with you is like a magical anime adventure. Merry Christmas, I love you more than words can say!"
                  </p>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <Sparkles style={{ color: '#ffb3c1' }} />
                    <Stars style={{ color: '#ffb3c1' }} />
                    <Heart style={{ color: '#ffb3c1' }} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div style={{ position: 'fixed', bottom: '20px', zIndex: 5, color: 'white', display: 'flex', gap: '10px', opacity: 0.8 }}>
        <Music size={18} />
        <p style={{ fontSize: '0.9rem' }}>Silent Night (Lofi Remix)</p>
      </div>
    </div>
  );
}

export default App;

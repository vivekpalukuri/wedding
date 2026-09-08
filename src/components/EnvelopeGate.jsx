import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Music } from 'lucide-react';
import gateBackdrop from '../images/decorations/royal_gate_backdrop.jpg';
import gatePortrait from '../images/decorations/royal_gate_portrait.jpg';
import { triggerHaptic } from '../utils/haptics';

export default function EnvelopeGate({ onOpen, isOpen = false }) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const isGateOpen = isOpen || internalOpen;

  const handleOpen = () => {
    triggerHaptic('heavy');
    setInternalOpen(true);
    onOpen();
  };

  // Allow mouse wheel scrolling down, touch swipe up/down, or arrow keys to open the invitation
  React.useEffect(() => {
    if (isGateOpen) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (e.deltaY > 15) {
        handleOpen();
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const deltaY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) > 35) {
          handleOpen();
        }
      }
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        handleOpen();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Generate 18 floating golden dust / diya firefly particles
  const floatingParticles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <AnimatePresence>
      {!isGateOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#180101] text-[#FFF8E7] overflow-hidden select-none h-[100dvh] w-full"
        >
          {/* 1. Responsive Palace Backdrop Image (Portrait for Mobile, Landscape for Desktop) */}
          <div className="absolute inset-0 pointer-events-none">
            <picture>
              <source media="(max-width: 768px)" srcSet={gatePortrait} />
              <img
                src={gateBackdrop}
                alt="Royal Wedding Backdrop"
                className="w-full h-full object-cover object-center"
              />
            </picture>
            {/* Rich Radial Dark Gradient Overlay for Maximum Text Contrast */}
            <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-[#2B0303]/70 via-[#160101]/85 to-[#080000]/95" />
          </div>

          {/* 2. Ambient Floating Golden Sparkle Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {floatingParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.9, 0.2, 0.9, 0],
                  y: [-10, -120],
                  x: [0, (p.id % 2 === 0 ? 15 : -15)],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
                className="absolute rounded-full bg-gradient-to-tr from-[#FFD700] to-[#FFF5C0] shadow-[0_0_8px_#FFD700]"
              />
            ))}
          </div>

          {/* 3. Four Ornate Golden Filigree Corner Accents (Top & Bottom) */}
          <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 w-14 h-14 sm:w-20 sm:h-20 pointer-events-none opacity-85 z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#D4AF37]">
              <path d="M5 5 H45 C25 5 5 25 5 45 Z" fill="currentColor" opacity="0.4" />
              <path d="M5 5 H70 M5 5 V70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 12 Q40 12 40 40 Q40 12 70 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 w-14 h-14 sm:w-20 sm:h-20 pointer-events-none opacity-85 scale-x-[-1] z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#D4AF37]">
              <path d="M5 5 H45 C25 5 5 25 5 45 Z" fill="currentColor" opacity="0.4" />
              <path d="M5 5 H70 M5 5 V70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 12 Q40 12 40 40 Q40 12 70 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-5 sm:left-5 w-14 h-14 sm:w-20 sm:h-20 pointer-events-none opacity-85 scale-y-[-1] z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#D4AF37]">
              <path d="M5 5 H45 C25 5 5 25 5 45 Z" fill="currentColor" opacity="0.4" />
              <path d="M5 5 H70 M5 5 V70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 12 Q40 12 40 40 Q40 12 70 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-5 sm:right-5 w-14 h-14 sm:w-20 sm:h-20 pointer-events-none opacity-85 scale-[-1] z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#D4AF37]">
              <path d="M5 5 H45 C25 5 5 25 5 45 Z" fill="currentColor" opacity="0.4" />
              <path d="M5 5 H70 M5 5 V70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 12 Q40 12 40 40 Q40 12 70 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* 4. Main Center Royal Invitation Card Container (Balanced fluid environment sizing) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 py-2 sm:py-4 text-center flex flex-col items-center justify-center max-h-[100dvh]"
          >
            {/* Sacred Telugu Wedding Blessing Mantrams */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-1 text-center"
            >
              <h2 className="font-serif text-[clamp(22px,4vw,36px)] text-[#FFD700] tracking-[0.14em] font-extrabold drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] my-0 leading-tight">
                ॥ శ్రీ గణేశాయ నమః ॥
              </h2>
              <p className="font-serif text-[clamp(12px,2vw,18px)] text-[#FFE58F] tracking-[0.12em] font-bold mt-1 mb-0 drop-shadow-sm">
                ॥ శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు ॥
              </p>
            </motion.div>

            {/* Blessing Sub-text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="font-sans-clean text-[clamp(9.5px,1.2vw,12px)] uppercase tracking-[0.24em] text-[#E5C158] font-bold mt-1 mb-1.5 max-w-md mx-auto"
            >
              With the Divine Blessings of Lord Ganesha &amp; Almighty
            </motion.p>

            {/* Cordially Invited Ribbon Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex items-center justify-center gap-2 max-w-xs sm:max-w-sm mx-auto my-1.5 opacity-95"
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
              <span className="font-sans-clean text-[clamp(9px,1.1vw,11.5px)] tracking-[0.2em] text-[#FFD700] uppercase font-extrabold whitespace-nowrap drop-shadow-xs">
                ◆ You Are Cordially Invited To ◆
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#FFD700] to-transparent" />
            </motion.div>

            {/* Sub-header */}
            <p className="font-sans-clean text-[clamp(10px,1.25vw,13px)] uppercase tracking-[0.3em] text-[#FFF8E7] font-bold mt-1 mb-0.5">
              The Royal Wedding Of
            </p>

            {/* Grand Couple Names with Fluid Environment Sizing */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="my-1.5 sm:my-2"
            >
              <h1 className="font-serif text-[clamp(30px,5.2vw,50px)] font-extrabold tracking-[0.06em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#FFD700] to-[#FFA000] drop-shadow-[0_4px_25px_rgba(255,215,0,0.55)] leading-tight">
                VIVEK <span className="font-script-calligraphy text-[clamp(36px,6.2vw,62px)] text-[#FFD700] font-normal mx-1 drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]">&amp;</span> VARSHINI
              </h1>
            </motion.div>

            {/* Decorative Lotus Divider Accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-2.5 my-1.5 opacity-95"
            >
              <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#FFD700]" />
              <span className="text-[#FFD700] text-lg sm:text-2xl drop-shadow-[0_0_10px_#FFD700]">🪷</span>
              <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#FFD700]" />
            </motion.div>

            {/* Family Invitation Text */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="space-y-0.5 my-1.5 max-w-md mx-auto"
            >
              <p className="font-sans-clean text-[clamp(10px,1.25vw,13px)] uppercase tracking-[0.22em] text-[#FFF8E7] font-bold drop-shadow-xs">
                Together with their families,
              </p>
              <p className="font-serif italic text-[clamp(11.5px,1.5vw,15.5px)] text-[#FFE58F] font-semibold leading-relaxed">
                We cordially invite you to celebrate the holy union of matrimony
              </p>
            </motion.div>

            {/* Grand Glowing Neon Royal Button */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-3 sm:mt-4 w-full max-w-md mx-auto"
            >
              <button
                onClick={handleOpen}
                type="button"
                className="group relative w-full inline-flex items-center justify-between px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#910C0C] via-[#C91E1E] to-[#910C0C] border-2 border-[#FFD700] text-[#FFF8E7] cursor-pointer shadow-[0_0_30px_rgba(255,215,0,0.65),inset_0_0_12px_rgba(255,215,0,0.45)] hover:shadow-[0_0_50px_rgba(255,215,0,0.9),inset_0_0_18px_rgba(255,215,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {/* Subtle Inner Sparkle Left */}
                <div className="flex items-center gap-1.5 text-[#FFD700] shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  <Music className="w-3.5 h-3.5 opacity-85 hidden sm:block" />
                </div>

                {/* Button Text */}
                <span className="font-serif text-[clamp(12px,1.5vw,16px)] tracking-[0.12em] uppercase font-extrabold text-[#FFF8E7] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mx-2 text-center flex-1">
                  Open Royal Wedding Invitation
                </span>

                {/* Circular Arrow Badge Right */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#5E0505] border border-[#FFD700] flex items-center justify-center shadow-inner group-hover:bg-[#FFD700] group-hover:text-[#5E0505] transition-colors duration-300 shrink-0">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] group-hover:text-[#5E0505] transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </button>
            </motion.div>

            {/* Footer Prompt */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="font-sans-clean text-[clamp(8.5px,1.05vw,11px)] uppercase tracking-[0.22em] text-[#E5C158] font-bold mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5 opacity-95"
            >
              <span>🪷</span>
              <span>Tap button or scroll down to begin our wedding journey</span>
              <span>🪷</span>
            </motion.p>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

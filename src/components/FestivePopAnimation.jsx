import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PartyPopper } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export default function FestivePopAnimation({ triggerOnOpen }) {
  // Fire a multi-cannon festive pop blast
  const fireFestiveBlast = (withHaptic = true) => {
    if (withHaptic) {
      triggerHaptic('pop');
    }

    // 1. Center burst
    confetti({
      particleCount: 70,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD700', '#D4AF37', '#8B0000', '#FFA500', '#FFF8E7', '#E11D48'],
      disableForReducedMotion: true,
    });

    // 2. Left side cannon
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#FFD700', '#D4AF37', '#FFA500', '#FF4500'],
      });
    }, 150);

    // 3. Right side cannon
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#FFD700', '#D4AF37', '#FFA500', '#FF4500'],
      });
    }, 300);
  };

  // Trigger visual confetti on mount (no vibration without user gesture)
  useEffect(() => {
    const timer = setTimeout(() => {
      fireFestiveBlast(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (triggerOnOpen) {
      fireFestiveBlast(true);
    }
  }, [triggerOnOpen]);

  // Periodic minimal pop every 15 seconds throughout the page
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 25,
        spread: 70,
        origin: { x: Math.random() * 0.8 + 0.1, y: 0.6 },
        colors: ['#FFD700', '#D4AF37', '#FFA500'],
        ticks: 150,
        gravity: 0.8,
        scalar: 0.9,
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Ambient Falling Golden Petals / Confetti (GPU-accelerated) */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden transform-gpu">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60 animate-float-particle transform-gpu will-change-transform"
            style={{
              left: `${(i * 6.5) % 100}%`,
              top: `-${(i * 10) % 20}%`,
              width: `${(i % 3) * 3 + 4}px`,
              height: `${(i % 3) * 4 + 5}px`,
              backgroundColor: i % 2 === 0 ? '#FFD700' : '#FFA500',
              boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)',
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Interactive Compact Celebrate Pill Button */}
      <div className="fixed bottom-[3.6rem] right-4 sm:bottom-[4.2rem] sm:right-6 z-40 transform-gpu">
        <button
          onClick={fireFestiveBlast}
          type="button"
          className="group flex items-center justify-start gap-2 bg-[#3A0303]/95 hover:bg-[#4E0404] backdrop-blur-md border-2 border-[#FFD700] text-[#FFF8E7] px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer select-none w-[96px] sm:w-[106px]"
          title="Tap to Celebrate & Pop Confetti!"
          aria-label="Celebrate and pop wedding confetti"
        >
          {/* Gold Round Icon Badge */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFD700] text-[#3A0303] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-12 transition-transform shrink-0">
            <PartyPopper className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#3A0303]" />
          </div>

          {/* Compact Text */}
          <span className="font-sans-clean text-[10px] sm:text-[11px] uppercase tracking-wider text-[#FFD700] font-bold leading-none truncate">
            Pop 🎉
          </span>
        </button>
      </div>
    </>
  );
}

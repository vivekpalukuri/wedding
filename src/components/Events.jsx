import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../utils/config';
import { createGoogleCalendarUrl } from '../utils/calendar';
import { triggerHaptic } from '../utils/haptics';
import groomHaldiImg from '../images/events/groom_haldi.webp';
import brideHaldiImg from '../images/events/bride_haldi.webp';
import haldiImg from '../images/events/haldi.webp';
import sangeetImg from '../images/events/sangeet.webp';
import weddingImg from '../images/events/wedding.webp';
import receptionImg from '../images/events/reception.webp';

export default function Events() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1); // 1: next, -1: prev

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const resumeTimerRef = useRef(null);

  const eventsList = [];

  if (weddingConfig.events.groomHaldi) {
    eventsList.push({
      title: weddingConfig.events.groomHaldi.title,
      date: weddingConfig.events.groomHaldi.date,
      time: weddingConfig.events.groomHaldi.time,
      venue: weddingConfig.events.groomHaldi.venue,
      mapUrl: weddingConfig.events.groomHaldi.mapUrl,
      description: weddingConfig.events.groomHaldi.description,
      image: groomHaldiImg,
    });
  }

  if (weddingConfig.events.brideHaldi) {
    eventsList.push({
      title: weddingConfig.events.brideHaldi.title,
      date: weddingConfig.events.brideHaldi.date,
      time: weddingConfig.events.brideHaldi.time,
      venue: weddingConfig.events.brideHaldi.venue,
      mapUrl: weddingConfig.events.brideHaldi.mapUrl,
      description: weddingConfig.events.brideHaldi.description,
      image: brideHaldiImg,
    });
  }

  if (!weddingConfig.events.groomHaldi && !weddingConfig.events.brideHaldi && weddingConfig.events.haldi) {
    eventsList.push({
      title: weddingConfig.events.haldi.title,
      date: weddingConfig.events.haldi.date,
      time: weddingConfig.events.haldi.time,
      venue: weddingConfig.events.haldi.venue,
      mapUrl: weddingConfig.events.haldi.mapUrl,
      description: weddingConfig.events.haldi.description,
      image: haldiImg,
    });
  }

  /* Sangeet ceremony commented out as requested
  if (weddingConfig.events.sangeet) {
    eventsList.push({
      title: weddingConfig.events.sangeet.title,
      date: weddingConfig.events.sangeet.date,
      time: weddingConfig.events.sangeet.time,
      venue: weddingConfig.events.sangeet.venue,
      mapUrl: weddingConfig.events.sangeet.mapUrl,
      description: weddingConfig.events.sangeet.description,
      image: sangeetImg,
    });
  }
  */

  if (weddingConfig.events.wedding) {
    eventsList.push({
      title: weddingConfig.events.wedding.title,
      date: weddingConfig.events.wedding.date,
      time: weddingConfig.events.wedding.time,
      venue: weddingConfig.events.wedding.venue,
      mapUrl: weddingConfig.events.wedding.mapUrl,
      description: weddingConfig.events.wedding.description,
      image: weddingImg,
    });
  }

  if (weddingConfig.events.reception) {
    eventsList.push({
      title: weddingConfig.events.reception.title,
      date: weddingConfig.events.reception.date,
      time: weddingConfig.events.reception.time,
      venue: weddingConfig.events.reception.venue,
      mapUrl: weddingConfig.events.reception.mapUrl,
      description: weddingConfig.events.reception.description,
      image: receptionImg,
    });
  }

  // Temporary pause on interaction with gentle resume after 12 seconds
  const pauseTemporarilyForReading = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 12000);
  };

  const nextSlide = () => {
    triggerHaptic(10);
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % eventsList.length);
    pauseTemporarilyForReading();
  };

  const prevSlide = () => {
    triggerHaptic(10);
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + eventsList.length) % eventsList.length);
    pauseTemporarilyForReading();
  };

  const goToSlide = (idx) => {
    triggerHaptic(10);
    setSlideDirection(idx >= currentSlide ? 1 : -1);
    setCurrentSlide(idx);
    pauseTemporarilyForReading();
  };

  const togglePause = () => {
    triggerHaptic(15);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused((prev) => !prev);
  };

  // Auto-advance with relaxed 10-second reading time (stops immediately when paused/touched)
  useEffect(() => {
    if (isPaused || eventsList.length <= 1) return;

    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % eventsList.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isPaused, eventsList.length, currentSlide]);

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e) => {
    pauseTemporarilyForReading();
    if (e.touches && e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartTimeRef.current = Date.now();
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartXRef.current;
    const deltaY = endY - touchStartYRef.current;
    const deltaTime = Date.now() - touchStartTimeRef.current;

    // Detect horizontal swipe (at least 35px horizontally and predominantly horizontal swipe)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1 && deltaTime < 800) {
      if (deltaX < 0) {
        // Swiped Left -> Next Event
        nextSlide();
      } else {
        // Swiped Right -> Previous Event
        prevSlide();
      }
    }
  };

  const activeEvent = eventsList[currentSlide];

  return (
    <section id="events" className="relative min-h-screen py-16 sm:py-24 px-4 flex items-center justify-center overflow-hidden">
      {/* Full-Bleed Background Image matching Framer PAGE 3 */}
      <img
        decoding="auto"
        loading="lazy"
        src="https://framerusercontent.com/images/D4pzTjtAOLwhyi0UPGweoWoztA.webp?width=3008&height=2080"
        srcSet="https://framerusercontent.com/images/D4pzTjtAOLwhyi0UPGweoWoztA.webp?scale-down-to=512&width=3008&height=2080 512w, https://framerusercontent.com/images/D4pzTjtAOLwhyi0UPGweoWoztA.webp?scale-down-to=1024&width=3008&height=2080 1024w, https://framerusercontent.com/images/D4pzTjtAOLwhyi0UPGweoWoztA.webp?scale-down-to=2048&width=3008&height=2080 2048w, https://framerusercontent.com/images/D4pzTjtAOLwhyi0UPGweoWoztA.webp?width=3008&height=2080 3008w"
        alt="Wedding Events Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable="false"
      />

      {/* Outer Royal Mandap Shell matching Framer PAGE 3 */}
      <div className="relative w-full max-w-[1100px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[36px] sm:rounded-[40px] p-3 sm:p-6 shadow-[0_12px_40px_rgba(45,28,10,0.2)] overflow-hidden bg-[rgb(82,72,48)]"
        >
          {/* Inner Texture Background */}
          <div
            className="absolute inset-0 bg-cover bg-top opacity-100 pointer-events-none"
            style={{ backgroundImage: 'url(https://framerusercontent.com/images/tCmbsmXAUth2weao58tGilF28.webp?width=941&height=1672)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-[#FFFDF7]/90 pointer-events-none" />

          {/* Inner Card with Double Gold/Blue Borders & 4 Corner Ornaments */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative z-10 grid grid-cols-1 gap-4 sm:gap-6 rounded-[28px] sm:rounded-[32px] p-4 sm:p-8 bg-gradient-to-b from-white/95 to-[#FFFAF2]/95 border-2 border-[rgb(7,95,203)] select-none"
            style={{
              boxShadow: 'inset 0 0 0 4px rgb(215, 162, 42), inset 0 0 0 6px rgb(10, 48, 127)',
            }}
          >
            {/* 4 Corner Ornaments from Framer reference */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute top-2 left-2 w-6 h-6 pointer-events-none">
              <path d="M3 12C8 12 12 8 12 3C12 8 16 12 21 12C16 12 12 16 12 21C12 16 8 12 3 12Z" fill="rgb(215, 162, 42)" />
              <circle cx="12" cy="12" r="2" fill="rgb(10, 48, 127)" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute top-2 right-2 w-6 h-6 pointer-events-none rotate-90">
              <path d="M3 12C8 12 12 8 12 3C12 8 16 12 21 12C16 12 12 16 12 21C12 16 8 12 3 12Z" fill="rgb(7, 95, 203)" />
              <circle cx="12" cy="12" r="2" fill="rgb(10, 48, 127)" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute bottom-2 left-2 w-6 h-6 pointer-events-none -rotate-90">
              <path d="M3 12C8 12 12 8 12 3C12 8 16 12 21 12C16 12 12 16 12 21C12 16 8 12 3 12Z" fill="rgb(7, 95, 203)" />
              <circle cx="12" cy="12" r="2" fill="rgb(10, 48, 127)" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute bottom-2 right-2 w-6 h-6 pointer-events-none rotate-180">
              <path d="M3 12C8 12 12 8 12 3C12 8 16 12 21 12C16 12 12 16 12 21C12 16 8 12 3 12Z" fill="rgb(215, 162, 42)" />
              <circle cx="12" cy="12" r="2" fill="rgb(10, 48, 127)" />
            </svg>

            {/* Subtitle */}
            <div className="text-left px-1">
              <span className="font-sans-clean text-sm font-semibold tracking-normal text-[rgb(7,95,203)] opacity-90">
                Vivek &amp; VARSHINI
              </span>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[minmax(260px,0.82fr)_minmax(0,1fr)] gap-6 sm:gap-8 items-start">
              
              {/* Photo Box with Controls */}
              <div className="relative w-full rounded-[20px] overflow-hidden bg-[#F5F5F5] p-3 border-2 border-[rgb(7,95,203)] shadow-[inset_0_0_0_2px_rgb(215,162,42),inset_0_0_0_4px_rgba(255,255,255,0.92),0_8px_18px_rgba(0,0,0,0.08)]">
                <div className="relative w-full aspect-[4/5] rounded-[14px] overflow-hidden bg-white/80">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeEvent.title}
                      src={activeEvent.image}
                      alt={activeEvent.title}
                      loading="lazy"
                      initial={{ opacity: 0.1, x: slideDirection * 20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0.1, x: -slideDirection * 20, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="w-full h-full object-contain block hover:scale-105 transition-transform duration-350"
                    />
                  </AnimatePresence>
                </div>

                {/* Arrow Buttons & Dot Indicators */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex gap-2 pointer-events-auto">
                    <button
                      onClick={prevSlide}
                      type="button"
                      aria-label="Previous slide"
                      className="w-10 h-10 rounded-full border-none cursor-pointer bg-white/95 text-[rgb(7,95,203)] inline-flex items-center justify-center shadow-[0_3px_12px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgb(82,72,48)] hover:scale-110 active:scale-95 transition-transform"
                      title="Previous Ceremony"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      type="button"
                      aria-label="Next slide"
                      className="w-10 h-10 rounded-full border-none cursor-pointer bg-white/95 text-[rgb(7,95,203)] inline-flex items-center justify-center shadow-[0_3px_12px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgb(82,72,48)] hover:scale-110 active:scale-95 transition-transform"
                      title="Next Ceremony"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Pause / Play Toggle & Dots */}
                  <div className="flex items-center gap-2 pointer-events-auto bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/20">
                    <button
                      onClick={togglePause}
                      type="button"
                      aria-label={isPaused ? 'Resume auto-play' : 'Pause timer'}
                      className="text-white hover:text-amber-300 p-0.5 cursor-pointer transition-colors"
                      title={isPaused ? 'Resume Auto-Play' : 'Pause for Reading'}
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                    </button>

                    <div className="h-3 w-[1px] bg-white/30" />

                    {eventsList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        type="button"
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          currentSlide === idx
                            ? 'w-4 bg-amber-400 shadow-sm'
                            : 'w-2 bg-white/60 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Text Details */}
              <div className="flex flex-col gap-3.5 text-left px-1 sm:px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEvent.title}
                    initial={{ opacity: 0.1, x: slideDirection * 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.1, x: -slideDirection * 15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="space-y-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="m-0 font-heading-devanagari text-3xl sm:text-5xl lg:text-6xl text-[rgb(47,36,23)] font-bold tracking-tight leading-none">
                        {activeEvent.title}
                      </h2>
                      <span className="font-sans-clean text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {currentSlide + 1} of {eventsList.length}
                      </span>
                    </div>

                    {/* Meta Chips */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-xs sm:text-sm font-sans-clean text-[rgb(47,36,23)] opacity-90">
                      {/* Date */}
                      <div className="inline-flex items-center gap-1.5">
                        <span className="inline-flex text-[rgb(7,95,203)]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M8 3V7M16 3V7M3 10H21" stroke="currentColor" strokeWidth="1.8" />
                          </svg>
                        </span>
                        <span className="font-medium text-[rgb(47,36,23)]">{activeEvent.date}</span>
                      </div>

                      {/* Time */}
                      <div className="inline-flex items-center gap-1.5">
                        <span className="inline-flex text-[rgb(7,95,203)]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </span>
                        <span className="font-medium text-[rgb(47,36,23)]">{activeEvent.time}</span>
                      </div>

                      {/* Venue */}
                      <div className="inline-flex items-center gap-1.5">
                        <span className="inline-flex text-[rgb(7,95,203)]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 21C12 21 19 14.5 19 9.8C19 6.1 15.9 3 12 3C8.1 3 5 6.1 5 9.8C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" />
                            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                          </svg>
                        </span>
                        <span className="font-medium text-[rgb(47,36,23)]">{activeEvent.venue}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="m-0 text-xs sm:text-sm leading-relaxed text-[rgb(47,36,23)] opacity-85 font-sans-clean">
                      {activeEvent.description}
                    </p>

                    {/* CTA Actions: View Location & Add to Calendar */}
                    <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <a
                        href={activeEvent.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerHaptic(15)}
                        className="inline-flex items-center gap-1.5 justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-full no-underline bg-[rgb(10,48,127)] text-white border border-[rgb(215,162,42)] text-xs font-semibold uppercase tracking-wider shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer transform-gpu"
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-300" />
                        <span>View Location</span>
                      </a>

                      <a
                        href={createGoogleCalendarUrl(activeEvent)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerHaptic(20)}
                        className="inline-flex items-center gap-1.5 justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-full no-underline bg-[#FFF8E7] text-[rgb(10,48,127)] border-2 border-[rgb(215,162,42)] text-xs font-bold uppercase tracking-wider shadow-md hover:-translate-y-0.5 hover:bg-white hover:shadow-lg transition-all cursor-pointer transform-gpu"
                        title="Add this wedding event to Google Calendar"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[rgb(10,48,127)]" />
                        <span>Add To Calendar</span>
                      </a>
                    </div>

                    {/* Mobile Gesture Hint */}
                    <div className="pt-2 flex items-center justify-start gap-1.5 text-[10px] sm:text-xs font-sans-clean text-[#6B3E11] font-semibold opacity-75 select-none">
                      <span>👈</span>
                      <span>Swipe left / right to browse all ceremonies • Touch to pause &amp; read</span>
                      <span>👉</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

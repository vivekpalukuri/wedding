import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Share2, Bookmark } from 'lucide-react';
import insta1 from '../images/instagram/insta_1.jpg';
import insta2 from '../images/instagram/insta_2.jpg';
import insta3 from '../images/instagram/insta_3.jpg';
import instagramBg from '../images/instagram/instagram_bg.webp';
import rsvpBg from '../images/rsvp/rsvp_bg.webp';

import { triggerHaptic } from '../utils/haptics';

export default function JoinUsInstagram() {
  const rsvpUrl = 'https://wa.me/?text=Hi%20Vivek%20%26%20Varshini,%20I%20would%20love%20to%20attend%20your%20wedding!';

  const shareMessage = encodeURIComponent(
    `🌸 *Wedding Invitation* 🌸\n\nWith the divine blessings of Lord Ganesha & Almighty, you are cordially invited to celebrate the holy union of *Vivek & Varshini* on *December 19, 2026* at *Kshatriya Kalyana Mandapam, Amalapuram*.\n\n✨ View Wedding Invitation & Events Schedule here:\n${typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://wedding.vivekvarshini.com'}`
  );
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareMessage}`;
  const instagramUrl = 'https://instagram.com';

  return (
    <div className="w-full flex flex-col select-none">
      {/* PAGE 6: RSVP - Will You Join Us? (Maintains original 3008:2080 aspect ratio, no vertical stretching) */}
      <section
        id="rsvp"
        className="relative w-full aspect-[3008/2080] min-h-[calc(100vw*2080/3008)] bg-[#210202] text-[#FFF8E7] overflow-hidden flex items-center justify-center text-center"
      >
        {/* Full Bleed Background Artwork maintaining natural aspect ratio */}
        <img
          src={rsvpBg}
          alt="RSVP Will You Join Us Artwork"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable="false"
        />

        {/* Content pinned proportionally inside the artwork panel */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center justify-center max-w-[85%] sm:max-w-xl text-center space-y-1 sm:space-y-3 md:space-y-4"
          >
            {/* Top RSVP Tag */}
            <span className="font-sans-clean text-[8px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-[#580B1A] uppercase">
              RSVP &amp; Share
            </span>

            {/* Calligraphic Title */}
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#580B1A] font-normal leading-none">
              <span className="font-script-calligraphy text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#580B1A]">W</span>
              ill You Join Us?
            </h2>

            {/* Note */}
            <p className="font-serif text-[7.5px] sm:text-[11px] md:text-xs lg:text-sm text-[#580B1A] leading-relaxed max-w-xs sm:max-w-md mx-auto italic font-medium">
              We would be truly honoured to celebrate this day with you. Please let us know if you'll be joining the festivities — your presence is the only gift we need.
            </p>

            {/* Action Buttons: RSVP & Share Invitation */}
            <div className="pt-0.5 sm:pt-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 pointer-events-auto">
              {/* 1. WhatsApp RSVP Button */}
              <a
                href={rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-6 py-1 sm:py-3 rounded-md sm:rounded-xl bg-[rgb(88,11,26)] text-white font-sans-clean text-[7.5px] sm:text-xs md:text-sm uppercase font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-300/40"
                title="Send your RSVP confirmation on WhatsApp"
              >
                <MessageCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-current text-white shrink-0" />
                <span>RSVP on WhatsApp</span>
              </a>

              {/* 2. Share Invitation with Family Button */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-6 py-1 sm:py-3 rounded-md sm:rounded-xl bg-[#075E54] hover:bg-[#128C7E] text-white font-sans-clean text-[7.5px] sm:text-xs md:text-sm uppercase font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#25D366]/40"
                title="Forward this wedding invitation on WhatsApp"
              >
                <Share2 className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#25D366] shrink-0" />
                <span>Share with Family</span>
              </a>
            </div>

            <span className="font-sans-clean text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-[#580B1A] font-bold opacity-85">
              TAP TO CONNECT &amp; SHARE
            </span>
          </motion.div>
        </div>
      </section>

      {/* PAGE 7 Top: Instagram Section (Maintains original 3008:2080 aspect ratio, no vertical stretching) */}
      <section
        id="instagram"
        className="relative w-full aspect-[3008/2080] min-h-[calc(100vw*2080/3008)] bg-[#210202] text-[#FFF8E7] overflow-hidden flex items-center justify-center text-center"
      >
        {/* Full Bleed Background Artwork */}
        <img
          src={instagramBg}
          alt="Instagram Artwork"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable="false"
        />

        {/* Content pinned proportionally inside the Instagram panel */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center justify-center max-w-[85%] sm:max-w-xl text-center space-y-1 sm:space-y-3 md:space-y-4"
          >
            {/* Instagram Heading */}
            <span className="font-script-calligraphy text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#580B1A] block font-normal leading-none">
              Instagram
            </span>

            {/* Hashtag */}
            <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-[#580B1A] font-bold tracking-tight">
              #VivekWedsVarshini
            </h3>

            {/* 3 Luxury Angled Instagram Cards */}
            <div className="relative w-48 sm:w-72 md:w-80 h-24 sm:h-36 md:h-40 my-1 flex items-center justify-center">
              {/* Left Card */}
              <div className="absolute left-2 sm:left-4 w-14 sm:w-20 md:w-24 aspect-[3/4] bg-white p-0.5 sm:p-1 rounded sm:rounded-lg shadow-xl -rotate-6 border border-slate-200">
                <img
                  src={insta1}
                  alt="Memory 1"
                  className="w-full h-[78%] object-cover rounded-sm sm:rounded-md"
                />
                <div className="flex items-center justify-between px-0.5 sm:px-1 pt-0.5 text-slate-700">
                  <Heart className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-rose-500 text-rose-500" />
                  <Share2 className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                  <Bookmark className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                </div>
              </div>

              {/* Middle Card */}
              <div className="relative z-10 w-16 sm:w-24 md:w-28 aspect-[3/4] bg-white p-0.5 sm:p-1 rounded sm:rounded-lg shadow-2xl border border-slate-200">
                <img
                  src={insta2}
                  alt="Memory 2"
                  className="w-full h-[78%] object-cover rounded-sm sm:rounded-md"
                />
                <div className="flex items-center justify-between px-0.5 sm:px-1 pt-0.5 text-slate-700">
                  <Heart className="w-2 sm:w-3 h-2 sm:h-3 fill-rose-500 text-rose-500" />
                  <Share2 className="w-2 sm:w-3 h-2 sm:h-3" />
                  <Bookmark className="w-2 sm:w-3 h-2 sm:h-3" />
                </div>
              </div>

              {/* Right Card */}
              <div className="absolute right-2 sm:right-4 w-14 sm:w-20 md:w-24 aspect-[3/4] bg-white p-0.5 sm:p-1 rounded sm:rounded-lg shadow-xl rotate-6 border border-slate-200">
                <img
                  src={insta3}
                  alt="Memory 3"
                  className="w-full h-[78%] object-cover rounded-sm sm:rounded-md"
                />
                <div className="flex items-center justify-between px-0.5 sm:px-1 pt-0.5 text-slate-700">
                  <Heart className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-rose-500 text-rose-500" />
                  <Share2 className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                  <Bookmark className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                </div>
              </div>
            </div>

            {/* Instagram Button */}
            <div className="pt-1 flex flex-col items-center gap-1 pointer-events-auto">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-1.5 sm:py-2.5 rounded-full bg-[rgb(88,11,26)] text-white font-sans-clean text-[9px] sm:text-xs uppercase font-bold tracking-wider shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 transition-all duration-300 cursor-pointer"
              >
                <span>instagram</span>
              </a>
              <span className="font-sans-clean text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-[#580B1A] font-bold">
                TAP HERE
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

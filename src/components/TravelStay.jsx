import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, PhoneCall, MessageCircle, MapPin } from 'lucide-react';

export default function TravelStay() {
  return (
    <section id="travel" className="py-24 px-6 bg-[#2B0404] text-[#FFF8E7] relative">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#FFD700] block mb-2 font-semibold">
              Guest Comfort & Accommodations
            </span>
            <h2 className="font-heading-devanagari text-4xl sm:text-6xl text-[#FFF8E7] font-bold">
              Travel & Stay Info
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-6" />
            <p className="font-serif italic text-lg text-[#FFD700]">
              Everything you need for a memorable & comfortable stay in Amalapuram, Andhra Pradesh.
            </p>
          </motion.div>
        </div>

        {/* Contact & Support Section (WhatsApp, Phone Call & Google Maps) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="royal-maroon-panel p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37] shadow-2xl text-center space-y-6 max-w-4xl mx-auto mandap-arch-border"
        >
          <span className="font-sans-clean text-xs uppercase tracking-widest text-[#FFD700] font-bold block">
            Guest Assistance & Accommodation Support
          </span>
          <h3 className="font-heading-devanagari text-3xl font-bold text-[#FFF8E7]">
            Contact For Travel & Stay Assistance
          </h3>
          <p className="font-sans-clean text-sm text-[#FFF8E7]/90 max-w-xl mx-auto">
            Need help with room bookings, directions, or transport in Amalapuram? Call us directly or message us on WhatsApp!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Redirect Call Number with Icon */}
            <a
              href="tel:8500294527"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-4 rounded-full bg-emerald-700 text-white hover:bg-emerald-600 font-sans-clean text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
              <span>Call: 8500294527</span>
            </a>

            {/* WhatsApp Direct Chat with Image/Icon */}
            <a
              href="https://wa.me/918500294527"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-4 rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] font-sans-clean text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white" />
              <span>Contact on WhatsApp: 8500294527</span>
            </a>

            {/* Accommodation & Mandapam Location in Google Maps */}
            <a
              href="https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full royal-gold-button text-xs font-sans-clean uppercase tracking-wider font-bold shadow-xl transition-transform hover:scale-105"
            >
              <MapPin className="w-5 h-5 text-[#210202]" />
              <span>Kshatriya Kalyana Mandapam on Google Maps</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>
          </div>
        </motion.div>

        {/* Embedded Interactive Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="royal-maroon-panel rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-sans-clean text-xs uppercase tracking-widest text-[#FFD700] font-bold block">
                Venue & Function Hall Map
              </span>
              <h4 className="font-heading-devanagari text-2xl text-[#FFF8E7] font-bold">
                Kshatriya Kalyana Mandapam, Amalapuram
              </h4>
            </div>
            <a
              href="https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFD700] hover:bg-[#D4AF37] hover:text-[#210202] text-xs font-sans-clean font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-inner">
            <iframe
              src="https://maps.google.com/maps?q=Kshatriya+Kalyana+Mandapam+Amalapuram&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kshatriya Kalyana Mandapam Google Maps Location"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

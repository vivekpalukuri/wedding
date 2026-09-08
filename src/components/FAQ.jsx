import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Flame } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const traditionalFaqs = [
    {
      q: 'What is the auspicious Muhurtham time and venue?',
      a: 'The holy Sumuhurtham for Jeelakarra Bellam & Mangalsutra binding is at 03:35 AM IST (Early Morning) on Saturday, December 19, 2026 at Kshatriya Kalyana Mandapam, Amalapuram.',
    },
    {
      q: 'What attire is recommended for different ceremonies?',
      a: 'For Haldi: Yellow/Gold ethnic attire; For Vivah (Main Wedding): Traditional Silk Sarees, Kanjivaram, Pattu Veshti / Dhoti Kurta.',
    },
    {
      q: 'What type of food will be served at the wedding?',
      a: 'A lavish 21-item traditional South Indian Kalyana Bhojanam (Satvik Pure Vegetarian) will be served on banana leaves after the ceremony, as well as a Royal Feast during the Evening Reception.',
    },
    {
      q: 'Is transport assistance available for outstation guests?',
      a: 'Yes, complimentary private AC cars and shuttles will run between Tirupati International Airport (TIR), Tirupati Railway Junction (TPTY), and all partner hotels.',
    },
    {
      q: 'How do I arrange VIP Temple Darshan at Lord Venkateswara Swamy Temple?',
      a: 'Our dedicated guest concierge will organize special VIP Darshan passes for outstation family relatives. Please indicate your travel dates in the RSVP note.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-[#2B0404] text-[#FFF8E7] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#FFD700] block mb-2 font-semibold">
              Guest Guidelines
            </span>
            <h2 className="font-heading-devanagari text-4xl sm:text-6xl text-[#FFF8E7] font-bold">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-6" />
            <p className="font-serif italic text-lg text-[#FFD700]">
              Important information for our family members and honored guests.
            </p>
          </motion.div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {traditionalFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="royal-maroon-panel rounded-2xl border border-[#D4AF37]/40 shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-heading-devanagari text-xl sm:text-2xl text-[#FFF8E7] hover:text-[#FFD700] transition-colors font-bold"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FFD700] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 font-sans-clean text-xs sm:text-sm text-[#FFF8E7]/90 leading-relaxed border-t border-[#D4AF37]/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

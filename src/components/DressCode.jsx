import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shirt, Flame } from 'lucide-react';

export default function DressCode() {
  const indianColorSwatches = [
    { name: 'Royal Crimson', hex: '#8B0000', desc: 'Auspicious wedding maroon' },
    { name: 'Temple Gold', hex: '#D4AF37', desc: 'Pure silk brocade gold' },
    { name: 'Saffron Yellow', hex: '#E59400', desc: 'Vibrant Haldi tone' },
    { name: 'Peacock Emerald', hex: '#0A5C36', desc: 'Rich royal green' },
    { name: 'Silk Sandalwood', hex: '#FFF8E7', desc: 'Traditional ivory cream' },
  ];

  return (
    <section id="dresscode" className="py-24 px-6 bg-[#3A0303] text-[#FFF8E7] relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#FFD700] block mb-2 font-semibold">
              Traditional Indian Attire
            </span>
            <h2 className="font-heading-devanagari text-4xl sm:text-6xl text-[#FFF8E7] font-bold">
              Dress Code & Color Palette
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-6" />
            <p className="font-serif italic text-lg text-[#FFD700]">
              Celebrate in rich traditional Indian ethnic wear and festive regal colors.
            </p>
          </motion.div>
        </div>

        {/* Main Card */}
        <div className="royal-maroon-panel rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl p-8 sm:p-14 mandap-arch-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Guidelines */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#FFD700]">
                <Shirt className="w-6 h-6" />
                <span className="font-sans-clean text-xs uppercase tracking-[0.2em] font-bold">
                  Attire Recommendations
                </span>
              </div>

              <h3 className="font-heading-devanagari text-3xl text-[#FFF8E7] font-bold">
                Royal Ethnic Elegance
              </h3>

              <p className="font-sans-clean text-sm leading-relaxed text-[#FFF8E7]/90">
                <strong className="text-[#FFD700]">Ladies:</strong> Kanjivaram or Banarasi Silk Sarees, Designer Lehenga Cholis, or Anarkali Suits with traditional temple gold jewelry and festive embellishments.
              </p>

              <p className="font-sans-clean text-sm leading-relaxed text-[#FFF8E7]/90">
                <strong className="text-[#FFD700]">Gentlemen:</strong> Traditional Silk Veshti / Dhoti Kurta, Jodhpuri Sherwanis, Kurta Pyjamas, or Nehru Jacket ensembles.
              </p>

              <div className="p-4 rounded-xl bg-[#2B0404] border border-[#D4AF37]/40 text-xs font-sans-clean text-[#FFF8E7]/85 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                <span>
                  Yellow & Gold attire is suggested for Haldi; Royal Festive Ethnic wear for Vivah & Reception.
                </span>
              </div>
            </div>

            {/* Right Column: Swatches */}
            <div>
              <h4 className="font-sans-clean text-xs uppercase tracking-[0.2em] text-[#FFD700] mb-6 text-center md:text-left font-semibold">
                Inspired Festival Color Palette
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {indianColorSwatches.map((swatch, idx) => (
                  <motion.div
                    key={swatch.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-4 rounded-2xl bg-[#2B0404] border border-[#D4AF37]/50 text-center group hover:border-[#FFD700] transition-colors"
                  >
                    <div
                      className="w-12 h-12 mx-auto rounded-full shadow-lg mb-3 border-2 border-[#D4AF37] group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="font-serif text-sm font-bold text-[#FFF8E7] block">
                      {swatch.name}
                    </span>
                    <span className="font-sans-clean text-[10px] text-[#FFD700] mt-1 block font-medium">
                      {swatch.hex}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Phone, Calendar, MessageCircle } from 'lucide-react';

export default function CTASection() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative py-32 overflow-hidden">

      {/* ⭐ Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140708] via-[#1a0a0c]/95 to-[#140708]" />
      </div>
      

      {/* ⭐ Light sources */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-0 w-[420px] h-[420px] bg-[#c42630]/30 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 w-[420px] h-[420px] bg-[#c42630]/25 blur-[140px]" />
      </div>


      <div className="relative container mx-auto px-4">
        {/* ⭐ Section Badge */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#c42630]/10 text-[#ff9aa0] rounded-full text-sm font-medium">
            Let's Connect
          </span>
        </div>
    
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#c42630]/20 text-[#ff9aa0] mb-6">
              Start Your Journey
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Your Dream Home
              <br />
              <span className="bg-gradient-to-r from-[#c42630] to-[#ff7a81] bg-clip-text text-transparent">
                Awaits You
              </span>
            </h2>

            <p className="text-white/70 max-w-lg text-lg mb-8">
              Discover thoughtfully crafted spaces designed for comfort,
              investment growth, and a lifestyle your family deserves.
            </p>

            {/* ⭐ trust */}
            <div className="flex gap-6 text-white/60 text-sm">
              <span>✔ 8+ Years Experience</span>
              <span>✔ 2500+ Families</span>
              <span>✔ Clear Titles</span>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* glow */}
            <div className="absolute inset-0 bg-[#c42630]/20 blur-[120px] rounded-3xl" />

            {/* card */}
            <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">

              <h3 className="text-2xl font-bold text-white mb-6">
                Speak With Our Experts
              </h3>

              {/* primary */}
              <button
                onClick={scrollToContact}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#c4263198] to-[#a61f28cf] text-white font-semibold flex items-center justify-center gap-2 mb-4 hover:scale-[1.02] transition"
              >
                Enquire Now <ArrowRight size={18} />
              </button>

              {/* secondary */}
              <div className="grid grid-cols-2 gap-4 mb-4">

                <a
                  href="tel:+919876543210"
                  className="py-3 rounded-xl bg-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/30 transition"
                >
                  <Phone size={18} /> Call
                </a>

                <a
                  href="https://wa.me/919876543210"
                  className="py-3 rounded-xl bg-[#25D366]/30 text-white flex items-center justify-center gap-2 hover:bg-[#25D366]/40 transition"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>

              <button className="w-full py-3 rounded-xl border border-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/10 transition">
                <Calendar size={18} /> Book Site Visit
              </button>

              {/* micro copy */}
              <p className="text-white/50 text-xs mt-4 text-center">
                Our team typically responds within 10 minutes
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
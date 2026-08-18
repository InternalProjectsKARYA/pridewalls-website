'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Phone, Calendar, MessageCircle } from 'lucide-react';
import SiteVisitDrawer from '@/components/landingpage/SiteVisitDrawer';
import { companyInfo } from '@/lib/project-data';

export default function CTASection() {
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const primaryPhone = companyInfo.contact.phone[0];
  const phoneHref = `tel:${primaryPhone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${(
    companyInfo.contact.whatsapp || primaryPhone
  ).replace(/\D/g, '')}`;

  return (
    <section className="relative py-32 overflow-hidden">

      {/* ⭐ Background */}
      <div className="absolute inset-0">
        <Image
          src="/pride-walls-hero.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80" />
      </div>
      

      {/* ⭐ Light sources */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-0 w-[420px] h-[420px] bg-brand-gold/30 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 w-[420px] h-[420px] bg-brand-gold/25 blur-[140px]" />
      </div> */}


      <div className="section-shell relative">
        {/* ⭐ Section Badge */}
        <div className="text-center mb-16">
          <span className="eyebrow border-white/20 bg-white/10 text-white">
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
            <span className="mb-6 inline-block rounded-full bg-brand-gold/20 px-4 py-1 text-brand-gold">
              Start Your Journey
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Your Dream Home
              <br />
              <span className="text-brand-gold">
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
            {/* <div className="absolute inset-0 bg-brand-gold/20 blur-[120px] rounded-3xl" /> */}

            {/* card */}
            <div className="relative rounded-xl border border-white/20 bg-white/10 p-8 shadow-card backdrop-blur-xl">

              <h3 className="text-2xl font-bold text-white mb-6">
                Speak With Our Experts
              </h3>

              {/* WhatsApp - First-class CTA */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-success py-4 font-semibold text-white transition hover:bg-success/90"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>

              <p className="mb-4 text-center text-xs text-white/60">
                Have questions? Chat with a property expert on WhatsApp.
                Usually responds within 10 minutes.
              </p>

              {/* primary */}
              <button
                onClick={scrollToContact}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold py-4 font-semibold text-white transition hover:bg-brand-gold-hover"
              >
                Talk to a Property Advisor <ArrowRight size={18} />
              </button>

              {/* secondary */}
              <div className="grid grid-cols-2 gap-4 mb-4">

                <a
                  href={phoneHref}
                  className="py-3 rounded-xl bg-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/30 transition"
                >
                  <Phone size={18} /> Call
                </a>

                <button
                  type="button"
                  onClick={() => setIsSiteVisitOpen(true)}
                  className="py-3 rounded-xl bg-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/30 transition"
                >
                  <Calendar size={18} /> Schedule a Visit
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <SiteVisitDrawer
        open={isSiteVisitOpen}
        onOpenChange={setIsSiteVisitOpen}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Calendar, MessageCircle, Phone } from 'lucide-react';
import SiteVisitDialog from '@/components/landingpage/SiteVisitDialog';
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
    <section className="relative overflow-hidden py-[5.5rem]">
      <div className="absolute inset-0">
        <Image
          src="/hero-section.jpg"
          alt="Premium Pridewalls real estate"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,13,12,0.94)_0%,rgba(20,13,12,0.82)_44%,rgba(20,13,12,0.72)_100%)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
              Start The Conversation
            </span>
            <h2 className="mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
              Ready to shortlist the right property with more confidence?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
              Let’s talk through your preferred location, budget range, and
              property type so we can guide you toward the Pridewalls
              opportunity that fits best.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/76">
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                Sales assistance
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                Site visit support
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                Project comparison help
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="estate-dark-panel rounded-[2rem] p-6 sm:p-7"
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
                Connect with the team
              </p>
              <h3 className="mt-3 text-3xl text-white">Choose the next step that feels right</h3>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Call, WhatsApp, or request a guided site visit. The layout is
                intentionally simple so serious buyers can act quickly.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <button
                onClick={scrollToContact}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#7a2430] px-5 text-sm font-semibold text-white transition hover:bg-[#69202a]"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#3fd07d]/25 bg-[#2ca65f]/16 px-5 text-sm font-semibold text-white transition hover:bg-[#2ca65f]/24"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>

              <button
                type="button"
                onClick={() => setIsSiteVisitOpen(true)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d8b37a]/24 bg-[#d8b37a]/10 px-5 text-sm font-semibold text-[#f6ebdb] transition hover:bg-[#d8b37a]/16"
              >
                <Calendar className="h-4 w-4" />
                Schedule Site Visit
              </button>
            </div>

            <p className="mt-5 text-center text-xs uppercase tracking-[0.16em] text-white/42">
              Monday to Saturday • 9 AM to 7 PM
            </p>
          </motion.div>
        </div>
      </div>

      <SiteVisitDialog
        open={isSiteVisitOpen}
        onOpenChange={setIsSiteVisitOpen}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />
    </section>
  );
}

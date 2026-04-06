'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Landmark,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SiteVisitDialog from '@/components/landingpage/SiteVisitDialog';
import { companyInfo } from '@/lib/project-data';

const focusPoints = [
  'Premium plotted layouts in growth corridors',
  'Family-first apartment living with amenities',
  'Private villa communities with stronger space planning',
];

const trustNotes = [
  { label: 'Focused Market', value: 'Hyderabad real estate' },
  { label: 'Approvals-Led', value: 'RERA and HMDA aware planning' },
  { label: 'Guided Journey', value: 'From first enquiry to site visit' },
];

export default function HeroSection() {
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const primaryPhone = companyInfo.contact.phone[0];
  const phoneHref = `tel:${primaryPhone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${(
    companyInfo.contact.whatsapp || primaryPhone
  ).replace(/\D/g, '')}`;

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#130d0d]">
      <div className="absolute inset-0">
        <Image
          src="/pride-walls-hero.png"
          alt="Pridewalls premium residential development"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(14,9,9,0.96)_18%,rgba(14,9,9,0.82)_46%,rgba(14,9,9,0.42)_72%,rgba(14,9,9,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,152,90,0.18),transparent_24rem)]" />
      </div>

      <div className="relative container mx-auto px-4 py-[4.5rem] sm:px-6 sm:py-24 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#eadac4] backdrop-blur">
              <Landmark className="h-3.5 w-3.5" />
              Hyderabad Real Estate
            </span>

            <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Communities planned for
              <span className="font-script ml-3 text-[#d8b37a]">lasting value</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Discover plotted communities, apartment living, and premium villa
              addresses shaped around stronger locations, elegant planning, and
              a buying experience that feels clear from the start.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                Open plots
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                Apartments
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                Villas
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                type="button"
                size="lg"
                onClick={scrollToProjects}
                className="h-12 rounded-full bg-[#7a2430] px-7 text-base text-white shadow-[0_18px_40px_rgba(122,36,48,0.34)] hover:bg-[#69202a]"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => setIsSiteVisitOpen(true)}
                className="h-12 rounded-full border-white/22 bg-white/10 px-7 text-base text-white hover:bg-white/16"
              >
                <Calendar className="h-4 w-4" />
                Book Site Visit
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {trustNotes.map((note) => (
                <div
                  key={note.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8b37a]">
                    {note.label}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/82">
                    {note.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="estate-dark-panel rounded-[2rem] p-6 text-white sm:p-7"
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d8b37a]">
                Why Pridewalls
              </p>
              <h2 className="mt-3 text-3xl text-white">
                Premium opportunities with a calmer buying journey
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/70">
                We focus on practical planning, growth-oriented locations, and a
                presentation style that helps families compare choices with
                confidence.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {focusPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b37a]" />
                  <span className="text-sm leading-6 text-white/82">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[#d8b37a]/25 bg-[#d8b37a]/8 p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#d8b37a]" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Visit our Madhapur office
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    Speak with the team, shortlist projects faster, and plan
                    your next site visit without guesswork.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-full bg-white text-[#261614] hover:bg-[#f4e9db]"
                >
                  <Link href="/#contact">Talk to an Advisor</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  <a href={phoneHref}>Call {primaryPhone}</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={scrollToProjects}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/72 backdrop-blur transition hover:bg-black/35 lg:block"
        aria-label="Scroll to projects"
      >
        View curated projects
      </button>

      <SiteVisitDialog
        open={isSiteVisitOpen}
        onOpenChange={setIsSiteVisitOpen}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />
    </section>
  );
}

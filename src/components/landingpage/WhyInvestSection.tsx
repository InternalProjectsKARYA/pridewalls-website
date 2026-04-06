'use client';

import { motion } from 'framer-motion';
import { Building2, FileCheck, MapPin, TrendingUp } from 'lucide-react';

const highlights = [
  {
    icon: MapPin,
    title: 'Location-led selection',
    description:
      'Projects are presented around the corridors buyers actually track for access, growth, and future livability.',
  },
  {
    icon: TrendingUp,
    title: 'Long-term value thinking',
    description:
      'The portfolio is positioned for both immediate lifestyle decisions and measured investment potential over time.',
  },
  {
    icon: Building2,
    title: 'Refined development vision',
    description:
      'From amenities to arrival experience, the focus is on communities that feel complete rather than simply available.',
  },
  {
    icon: FileCheck,
    title: 'Clarity through the process',
    description:
      'We simplify comparisons, approvals conversations, and on-ground visits so buyers can move with more confidence.',
  },
];

export default function WhyInvestSection() {
  return (
    <section className="py-[4.5rem] lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div>
            <span className="section-kicker">Why Buyers Choose Us</span>
            <h2 className="mt-5 text-4xl text-foreground sm:text-5xl">
              Built for people comparing lifestyle, location, and value together
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              Pridewalls is positioned as more than a listings site. The
              experience is shaped to help buyers understand why each project
              matters, where it fits, and how it supports their next move.
            </p>

            <div className="estate-panel mt-8 rounded-[2rem] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                Real-estate mindset
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground">
                Better visual hierarchy, better copy, and better on-page context
                create a calmer buying journey for serious property decisions.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="estate-panel rounded-[2rem] p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7a2430]/10 text-[#7a2430]">
                  <highlight.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-3xl text-foreground">{highlight.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

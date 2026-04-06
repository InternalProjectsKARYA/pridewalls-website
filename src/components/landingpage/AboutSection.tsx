'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Heart, Lightbulb, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { companyInfo } from '@/lib/project-data';

const valueIcons: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  lightbulb: <Lightbulb className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
};

const brandNarrative = [
  {
    title: 'Local market understanding',
    text: 'We focus on Hyderabad growth corridors, buyer behaviour, and planning choices that support both lifestyle and long-term value.',
  },
  {
    title: 'Spaces that feel considered',
    text: 'From plotted layouts to family apartments and villa communities, every development starts with comfort, circulation, and clarity.',
  },
  {
    title: 'Trust built in the process',
    text: 'We believe presentation, approvals guidance, and customer communication matter as much as the product itself.',
  },
];

const brandIntro =
  'Pridewalls is positioned as a Hyderabad-focused real-estate brand that presents plotted communities, apartment living, and villa opportunities with more clarity, stronger visual hierarchy, and a premium tone that serious buyers expect.';

export default function AboutSection() {
  return (
    <section id="about" className="py-[4.5rem] lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-[1fr_0.82fr] gap-4">
              <div className="space-y-4">
                <div className="relative h-72 overflow-hidden rounded-[2rem]">
                  <Image
                    src="/pride-walls-appartments.jpg"
                    alt="Pridewalls apartment community"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 overflow-hidden rounded-[2rem]">
                  <Image
                    src="/plots.jpg"
                    alt="Pridewalls plotted development"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="relative h-48 overflow-hidden rounded-[2rem]">
                  <Image
                    src="/villas.jpg"
                    alt="Pridewalls villa living"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="estate-panel rounded-[2rem] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                    Pridewalls Promise
                  </p>
                  <h3 className="mt-3 text-2xl text-foreground">
                    Real estate that feels premium before you even move in
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Better planning, stronger presentation, and buyer-first
                    guidance across plots, apartments, and villa living.
                  </p>
                </div>
              </div>
            </div>

            <div className="estate-panel absolute -bottom-6 left-6 rounded-[1.5rem] px-5 py-4 sm:left-10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                Brand Focus
              </div>
              <div className="mt-2 text-3xl text-foreground">Hyderabad</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Lifestyle-led residential opportunities
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-kicker">About Pridewalls</span>
            <h2 className="mt-5 text-4xl text-foreground sm:text-5xl">
              A brand built around refined communities and clearer decisions
            </h2>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {brandIntro}
            </p>

            <div className="mt-8 space-y-4">
              {brandNarrative.map((item) => (
                <div
                  key={item.title}
                  className="estate-panel rounded-[1.5rem] px-5 py-5"
                >
                  <h3 className="text-xl text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {companyInfo.values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/70 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7a2430]/10 text-[#7a2430]">
                    {valueIcons[value.icon] ?? <Award className="h-5 w-5" />}
                  </div>
                  <h4 className="mt-4 text-xl text-foreground">{value.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-full bg-[#7a2430] px-7 text-white hover:bg-[#69202a]"
            >
              <Link href="/#contact">
                Speak With Our Team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

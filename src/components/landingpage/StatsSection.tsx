'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Calendar, MoveRight, Ruler, Sparkles, Users } from 'lucide-react';

const stats = [
  {
    icon: Calendar,
    value: '8',
    suffix: '+',
    label: 'Years of Excellence',
    description: 'A legacy shaped by consistency, trust, and a steady commitment to quality-led development.',
    kicker: 'Established Journey',
  },
  {
    icon: Users,
    value: '1000',
    suffix: '+',
    label: 'Happy Customers',
    description: 'Families and investors who chose PRIDEWALLS for dependable guidance and thoughtfully planned communities.',
    kicker: 'Customer Confidence',
  },
  {
    icon: Ruler,
    value: '1',
    suffix: 'M+',
    label: 'Sq.ft Developed',
    description: 'Premium living environments created with modern layouts, practical planning, and long-term livability.',
    kicker: 'Built Footprint',
  },
];

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const [count, setCount] = useState(numericValue);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 1800;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          setDone(true);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div
      ref={ref}
      className={`text-5xl font-semibold leading-none tracking-tight text-white transition-transform duration-300 md:text-6xl ${
        done ? 'scale-[1.03]' : ''
      }`}
    >
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#07152f] py-20 text-white lg:py-24">
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.28 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/master-plan.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(7,21,47,0.98),rgba(13,38,89,0.9)_42%,rgba(7,21,47,0.96))]" />
        <div className="absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="absolute right-[-7rem] top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_82%_78%,rgba(201,162,39,0.16),transparent_18%)]" />
      </div>

      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Our Achievements
          </span>

          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            Our Legacy of Excellence
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-200 md:text-lg">
            Reimagined as a premium showcase section with a stronger sense of theatre, layered motion, and a more
            intentional luxury real-estate presentation.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.article
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-8 backdrop-blur-md lg:col-span-5 lg:min-h-[31rem]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(201,162,39,0.12),transparent_34%,rgba(255,255,255,0.08))]" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">Signature Milestone</p>
                <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight md:text-4xl">
                  Excellence measured in trust, scale, and lived experience
                </h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-slate-300 md:text-base">
                  Instead of simple stat boxes, this version gives the section a more curated rhythm with a dominant
                  highlight panel and layered milestone cards.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 rounded-[1.8rem] border border-white/10 bg-[#c9a227] p-6 text-primary shadow-2xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Brand Promise</p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-5xl font-semibold leading-none md:text-6xl">8+</p>
                    <p className="mt-2 text-sm font-medium text-primary/80">Years of vision-driven development</p>
                  </div>
                  <MoveRight className="h-8 w-8 shrink-0 text-primary/75" />
                </div>
              </motion.div>
            </div>
          </motion.article>

          <div className="grid gap-5 lg:col-span-7">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, x: 26, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.12 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6 backdrop-blur-md md:p-7"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,162,39,0.12),transparent_40%,rgba(255,255,255,0.08))]" />
                </div>

                <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-gold/35 bg-brand-gold/10 text-brand-gold shadow-lg">
                    <stat.icon className="h-7 w-7" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">{stat.kicker}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{stat.label}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{stat.description}</p>
                  </div>

                  <div className="md:text-right">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
    </section>
  );
}

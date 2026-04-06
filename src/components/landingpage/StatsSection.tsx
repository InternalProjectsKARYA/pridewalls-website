'use client';

import { motion } from 'framer-motion';
import { Award, Building2, Landmark, Users } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: '8+',
    label: 'Years of excellence',
    description: 'A growing real-estate journey shaped around trust and refinement.',
  },
  {
    icon: Building2,
    value: '3',
    label: 'Active categories',
    description: 'Plots, apartments, and villas presented with clearer context.',
  },
  {
    icon: Users,
    value: '1000+',
    label: 'Families served',
    description: 'A stronger buyer experience built around guidance and responsiveness.',
  },
  {
    icon: Landmark,
    value: '1M+',
    label: 'Sq.ft visioned',
    description: 'Communities planned for daily comfort and long-term value.',
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-[4.5rem] lg:py-[5.5rem]">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[linear-gradient(180deg,#201613_0%,#17100f_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,152,90,0.14),transparent_22rem)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
            Brand Snapshot
          </span>
          <h2 className="mt-5 text-4xl text-white sm:text-5xl">
            Numbers that support the story, without overpowering it
          </h2>
          <p className="mt-5 text-base leading-8 text-white/68">
            The brand now reads as a real-estate company first: premium,
            location-aware, and better structured for buyers who need trust as
            much as inspiration.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="estate-dark-panel rounded-[2rem] p-6 text-white"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7a2430] text-white">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="mt-8 text-5xl text-white">{stat.value}</div>
              <div className="mt-3 text-lg text-white">{stat.label}</div>
              <p className="mt-3 text-sm leading-7 text-white/62">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

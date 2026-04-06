'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Home, LandPlot } from 'lucide-react';
import { projects } from '@/lib/project-data';

const propertyTypes = [
  {
    id: 'plots',
    icon: LandPlot,
    title: 'Open Plots',
    description:
      'Land opportunities in emerging corridors for buyers who want flexibility, timing control, and long-term appreciation.',
    accent: 'from-[#7a2430] to-[#9d3c47]',
    tint: 'from-[#f8ece7] to-[#f4dfd8]',
  },
  {
    id: 'apartments',
    icon: Building,
    title: 'Apartments',
    description:
      'Family-focused apartment living with stronger planning, practical amenities, and better everyday convenience.',
    accent: 'from-[#8b6c45] to-[#b9985a]',
    tint: 'from-[#f5efe3] to-[#efe3cf]',
  },
  {
    id: 'villas',
    icon: Home,
    title: 'Villas',
    description:
      'Gated villa addresses crafted for privacy, larger built spaces, and a calmer community atmosphere.',
    accent: 'from-[#31424f] to-[#506372]',
    tint: 'from-[#ebeff2] to-[#dce4ea]',
  },
] as const;

export default function PropertyTypesSection() {
  return (
    <section className="py-[4.5rem] sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <span className="section-kicker">Property Categories</span>
            <h2 className="mt-5 text-4xl text-foreground sm:text-5xl">
              A portfolio shaped around the way buyers actually compare property
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              Whether you are investing in land, upgrading to an apartment, or
              planning for villa living, each category is presented to help you
              move from curiosity to confident shortlist faster.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {propertyTypes.map((type, index) => {
              const count = projects.filter((project) => project.type === type.id).length;
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link
                    href={`/?type=${type.id}#projects`}
                    className={`group block h-full rounded-[2rem] border border-[#ddcfbf] bg-gradient-to-br ${type.tint} p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_40px_rgba(59,37,28,0.08)]`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${type.accent} text-white shadow-lg`}
                      >
                        <type.icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f4f44]">
                        {count} live
                      </span>
                    </div>

                    <h3 className="mt-10 text-3xl text-foreground">{type.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#685950]">
                      {type.description}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#7a2430]">
                      View matching projects
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

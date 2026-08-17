'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  TrendingUp,
  Building2,
  FileCheck,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { investmentHighlights } from '@/lib/project-data';

const iconMap = {
  'map-pin': MapPin,
  'trending-up': TrendingUp,
  'building-2': Building2,
  'file-check': FileCheck,
};

const trustItems = [
  { icon: ShieldCheck, title: 'RERA Approved', sub: 'All Projects' },
  { icon: FileCheck, title: 'Clear Titles', sub: '100% Documentation' },
  { icon: Award, title: 'Quality Assured', sub: 'Premium Materials' },
  { icon: Building2, title: 'Bank Approved', sub: 'All Major Banks' },
];

export default function WhyInvestSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#FBFAF7] py-10 md:py-18"
      aria-label="Why invest with us"
    >
      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#C89D1C]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#0D2558]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C89D1C]" />

            <span className="rounded-full bg-[#C89D1C]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89D1C]">
              Why Choose Us
            </span>

            <span className="h-px w-8 bg-[#C89D1C]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0D2558] sm:text-4xl md:text-5xl">
            Why Invest With Us?
          </h2>

          <div className="mx-auto mt-4 h-0.75 w-14 bg-[#C89D1C]" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
            We combine strategic locations, quality construction, transparent
            processes, and long-term value to make every investment count.
          </p>
        </motion.div>

        {/* ================= HIGHLIGHTS ================= */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {investmentHighlights.map((highlight, index) => {
            const Icon =
              iconMap[highlight.icon as keyof typeof iconMap] || Building2;

            return (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-[#0D2558]/10 bg-white p-6 shadow-[0_8px_30px_rgba(13,37,88,0.04)] transition-all duration-300 group-hover:border-[#C89D1C]/40 group-hover:shadow-[0_16px_40px_rgba(13,37,88,0.09)] sm:p-7">

                  {/* Number */}
                  <span className="absolute right-5 top-4 text-5xl font-extralight leading-none text-[#0D2558]/5">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="relative mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-[#C89D1C]/10 text-[#C89D1C] transition-all duration-300 group-hover:bg-[#0D2558] group-hover:text-[#C89D1C]">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Gold line */}
                  <div className="mb-4 h-0.5 w-8 bg-[#C89D1C] transition-all duration-300 group-hover:w-12" />

                  <h3 className="mb-3 text-lg font-bold tracking-tight text-[#0D2558]">
                    {highlight.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#667085]">
                    {highlight.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-0.75 w-0 bg-[#C89D1C] transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= TRUST BAR ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-10 overflow-hidden rounded-2xl bg-[#0D2558] shadow-[0_15px_40px_rgba(13,37,88,0.12)] md:mt-14"
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative flex items-center gap-4 px-6 py-5 sm:px-7"
                >
                  {/* Divider */}
                  {index > 0 && (
                    <span className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/10 xl:block" />
                  )}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C89D1C]/15 text-[#C89D1C]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>

                    <p className="mt-0.5 text-xs text-white/50">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

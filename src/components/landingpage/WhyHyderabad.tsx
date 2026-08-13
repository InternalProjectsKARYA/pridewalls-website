'use client';

import { ArrowRight, TrendingUp, Users, Globe, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';


const growthAreas = [
  'ORR & Financial District',
  'IT Corridor — Gachibowli to Adibatla',
  'Shamshabad & Airport Zone',
  'Patancheru & Sangareddy Belt',
  'Shankarpally & Western Corridor',
];

const stats = [
  { icon: TrendingUp, value: '14%+', label: 'Annual Property Appreciation' },
  { icon: Users, value: '1.2 Cr', label: 'Metro Population' },
  { icon: Globe, value: 'Top 5', label: 'Indian City for Real Estate' },
  { icon: Zap, value: '₹80K+', label: 'Avg. IT Salary (Monthly)' },
];

export default function WhyHyderabad() {
  return (
    <section
      className="bg-[#0D2558] py-10 md:py-24"
      aria-label="Why Hyderabad"
    >
      {/* Decorative top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C89D1C]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ================= LEFT ================= */}
          <ScrollReveal direction="left">
            <div>
              {/* Section Label */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C89D1C]" />

                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C89D1C]">
                  Location Advantage
                </p>
              </div>

              {/* Heading */}
              <h2 className="relative mb-6 inline-block text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Why Hyderabad?

                {/* Gold underline */}
                <span className="absolute -bottom-3 left-0 h-[3px] w-14 bg-[#C89D1C]" />
              </h2>

              {/* Description */}
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/60">
                Hyderabad is one of India&apos;s fastest-growing metropolitan
                cities, driven by a thriving IT industry, world-class
                infrastructure, and a business-friendly environment. The
                city&apos;s real estate market consistently delivers strong
                appreciation, making it a top choice for property investors.
              </p>

              {/* Growth Areas */}
              <div className="space-y-3">
                {growthAreas.map((area) => (
                  <div
                    key={area}
                    className="group flex cursor-default items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[#C89D1C]/15">
                      <ArrowRight className="h-3.5 w-3.5 text-[#C89D1C]" />
                    </div>

                    <span className="text-sm text-white/70 transition-colors group-hover:text-white">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ================= RIGHT ================= */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl border border-white/10 bg-[#193061] p-8 shadow-sm backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">

                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="text-center"
                    >
                      {/* Icon */}
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-[#C89D1C]" />
                      </div>

                      {/* Value */}
                      <p className="text-3xl font-bold text-[#C89D1C] sm:text-4xl">
                        {stat.value}
                      </p>

                      {/* Label */}
                      <p className="mt-1.5 text-xs text-white/50 sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}

              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

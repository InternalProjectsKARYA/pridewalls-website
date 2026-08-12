'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const categories = [
  {
    title: 'Premium Apartments',
    description:
      'Thoughtfully designed 2 & 3 BHK apartments with panoramic views, smart layouts, and resort-style amenities that redefine urban living.',
    count: '1+ Projects',
    features: ['Swimming Pool', 'Gymnasium', "Children's Play Area", 'Jogging Track', 'Power Backup'],
    image: '/pride-walls-appartments.jpg',
    cta: 'View Apartments',
    filterType: 'apartments',
  },
  {
    title: 'Luxury Villas',
    description:
      'Premium independent villas with modern architecture, private gardens, and world-class amenities. Experience the grandeur of a home designed exclusively for you.',
    count: '1+ Projects',
    features: ['Private Garden', 'Modular Kitchen', 'Premium Fittings', 'Vastu Compliant', 'Clubhouse'],
    image: '/premium-villas.jpg',
    cta: 'Explore Villas',
    filterType: 'villas',
  },
  {
    title: 'Open Plots',
    description:
      'HMDA-approved plots in emerging corridors with clear titles, gated layouts, and excellent infrastructure. Invest in land that appreciates year after year.',
    count: '1+ Projects',
    features: ['HMDA Approved', 'Clear Titles', 'Gated Community', 'Black-Top Roads', 'Underground Drainage'],
    image: '/open-plots.png',
    cta: 'View Plots',
    filterType: 'plots',
  },
];

export default function PropertyCategories() {
  return (
    <section className="bg-white py-20 md:py-28" aria-label="Property categories">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 text-center md:mb-20">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C89D1C]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C89D1C]">
                What We Build
              </p>
              <span className="h-px w-8 bg-[#C89D1C]" />
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#0D2558] sm:text-4xl md:text-5xl">
              Property Categories
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#667085]">
              Discover thoughtfully designed properties that combine
              lifestyle, location, quality, and long-term value.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories */}
        <div className="space-y-10 md:space-y-16">
          {categories.map((cat, idx) => {
            const imageLeft = idx % 2 === 0;

            return (
              <ScrollReveal key={cat.title} delay={0.1}>
                <div
                  className={`flex flex-col items-center gap-8 lg:gap-12 ${
                    imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image */}
                  <div className="relative w-full lg:w-[54%]">
                    <div className="group relative h-95 overflow-hidden rounded-2xl sm:h-110 lg:h-127.5">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, 54vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#0D2558]/60 via-transparent to-transparent" />

                      {/* Project count */}
                      <div className="absolute left-5 top-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                          <span className="h-2 w-2 rounded-full bg-[#C89D1C]" />
                          <span className="text-xs font-bold text-[#0D2558]">
                            {cat.count}
                          </span>
                        </span>
                      </div>

                      {/* Image title */}
                      <div className="absolute bottom-6 left-6">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C89D1C]">
                          Property Collection
                        </p>
                        <h3 className="text-2xl font-bold text-white sm:text-3xl">
                          {cat.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full lg:w-[46%] ${
                      imageLeft ? 'lg:pl-3' : 'lg:pr-3 lg:text-right'
                    }`}
                  >
                    {/* Number */}
                    <div
                      className={`mb-4 flex items-center gap-3 ${
                        !imageLeft ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-5xl font-extralight leading-none text-[#0D2558]/10">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <span className="h-px flex-1 bg-[#0D2558]/10" />
                    </div>

                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#0D2558] sm:text-3xl">
                      {cat.title}
                    </h3>

                    <div
                      className={`mb-5 h-0.75 w-14 bg-[#C89D1C] ${
                        !imageLeft ? 'lg:ml-auto' : ''
                      }`}
                    />

                    <p
                      className={`mb-6 max-w-md text-base leading-relaxed text-[#667085] ${
                        !imageLeft ? 'lg:ml-auto' : ''
                      }`}
                    >
                      {cat.description}
                    </p>

                    {/* Features */}
                    <div
                      className={`mb-8 flex flex-wrap gap-2 ${
                        !imageLeft ? 'lg:justify-end' : ''
                      }`}
                    >
                      {cat.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#0D2558]/10 bg-[#F8F9FB] px-3 py-1.5 text-xs font-medium text-[#344054]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C89D1C]" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link href={`/projects?type=${cat.filterType}`}>
                      <Button
                        className={`h-11 rounded-lg bg-[#0D2558] px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#193B78] hover:shadow-lg ${
                          !imageLeft ? 'lg:ml-auto' : ''
                        }`}
                      >
                        {cat.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Divider */}
                {idx < categories.length - 1 && (
                  <div className="mt-10 flex items-center gap-4 md:mt-14">
                    <span className="h-px flex-1 bg-linear-to-r from-transparent to-[#0D2558]/10" />
                    <span className="h-2 w-2 rotate-45 border border-[#C89D1C]/50" />
                    <span className="h-px flex-1 bg-linear-to-l from-transparent to-[#0D2558]/10" />
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

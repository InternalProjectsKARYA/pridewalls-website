'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/project-data';
import ScrollReveal from './ScrollReveal';
import { AnimatePresence } from 'framer-motion';
import ProjectCard, { type ProjectCardData } from '@/components/common/ProjectCard';

/* ------------------------------------------------------------------ */
/* Property types                                                     */
/* ------------------------------------------------------------------ */

const propertyTypes = [
  'Apartments',
  'Villas',
  'Open Plots',
  'Commercial',
] as const;

type PropertyType = (typeof propertyTypes)[number];

/* ------------------------------------------------------------------ */
/* Transform project data                                             */
/* ------------------------------------------------------------------ */

const statusMap: Record<string, 'Upcoming' | 'Ongoing' | 'Completed'> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
};

const typeMap: Record<
  string,
  'Apartments' | 'Open Plots' | 'Villas' | 'Commercial'
> = {
  apartments: 'Apartments',
  plots: 'Open Plots',
  villas: 'Villas',
  commercial: 'Commercial',
};

function toCardData(p: (typeof projects)[number]): ProjectCardData {
  const priceMin = p.priceRange.min;
  const priceMax = p.priceRange.max;
  const currency = p.priceRange.currency;

  const priceLabel =
    priceMin === priceMax
      ? `${priceMin} ${currency}`
      : `${priceMin} – ${priceMax} ${currency}`;

  return {
    name: p.name,
    slug: p.slug,
    location: p.location,
    image: p.coverImage,
    status: statusMap[p.status] ?? 'Upcoming',
    type: typeMap[p.type] ?? 'Apartments',
    units: `${p.totalUnits}+ Units`,
    area: p.projectSize,
    sizes: `${p.area.min} – ${p.area.max} ${p.area.unit}`,
    approvals: p.approvals.filter(Boolean),
    price: priceLabel,
    configurations:
      p.type === 'apartments'
        ? '2 & 3 BHK'
        : p.type === 'villas'
          ? '3 & 4 BHK'
          : undefined,
    reraNumber: p.reraNumber,
    possession:
      p.status === 'completed'
        ? 'Ready to Move'
        : p.status === 'ongoing'
          ? 'Under Construction'
          : 'Upcoming Launch',
  };
}

const allCards = projects.map(toCardData);

/* ------------------------------------------------------------------ */
/* Filters                                                            */
/* ------------------------------------------------------------------ */

type FilterOption = 'All Projects' | PropertyType;

const filterOptions: FilterOption[] = [
  'All Projects',
  ...propertyTypes,
];

const statusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'ongoing', label: 'New Launch' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Ready to Move' },
] as const;

type StatusFilter = (typeof statusFilters)[number]['value'];

/* ================================================================== */
/* Featured Projects                                                  */
/* ================================================================== */

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] =
    useState<FilterOption>('All Projects');

  const [activeStatus, setActiveStatus] =
    useState<StatusFilter>('all');

  const filteredProjects = allCards.filter(
    (project) =>
      (activeFilter === 'All Projects' ||
        project.type === activeFilter) &&
      (activeStatus === 'all' ||
        project.status.toLowerCase() === activeStatus)
  );

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-muted/30 py-10 md:py-15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <ScrollReveal>
          <div className="mb-10 text-center md:mb-14">

            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand-gold" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
                Our Portfolio
              </p>

              <span className="h-px w-10 bg-gradient-to-l from-transparent to-brand-gold" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-primary sm:text-4xl md:text-[2.75rem]">
              Featured{' '}
              <span className="text-brand-gold">
                Projects
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Explore our handpicked selection of premium residential
              communities across Hyderabad
            </p>
          </div>
        </ScrollReveal>

        {/* ── Filters ── */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">

            {/* Property Type Filters - Left */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              {filterOptions.map((option) => {
                const isActive = activeFilter === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setActiveFilter(option)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                        : 'border border-gray-300 bg-white text-gray-600 hover:border-brand-primary/40 hover:bg-brand-primary/5 hover:text-brand-primary'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Status Dropdown - Right */}
            <div className="relative shrink-0">
              <select
                value={activeStatus}
                onChange={(e) =>
                  setActiveStatus(e.target.value as StatusFilter)
                }
                aria-label="Filter by status"
                className="
                  h-[42px]
                  appearance-none
                  rounded-full
                  border border-gray-300
                  bg-white
                  pl-5 pr-10
                  text-sm
                  font-medium
                  text-gray-600
                  outline-none
                  transition-all duration-300
                  hover:border-brand-primary/40
                  hover:bg-brand-primary/5
                  focus:border-brand-primary
                  focus:ring-2
                  focus:ring-brand-primary/10
                  cursor-pointer
                "
              >
                {statusFilters.map((filter) => (
                  <option
                    key={filter.value}
                    value={filter.value}
                  >
                    {filter.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-gray-500
                "
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Project Cards Grid ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ── View All CTA ── */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center md:mt-14">
            <Link href="/projects">
              <Button
                size="lg"
                className="
                  h-12
                  rounded-lg
                  bg-brand-primary
                  px-8
                  text-sm
                  font-semibold
                  tracking-wide
                  text-white
                  shadow-lg
                  shadow-brand-primary/20
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-brand-primary-dark
                  hover:shadow-xl
                  hover:shadow-brand-primary/30
                "
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
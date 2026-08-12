'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/project-data';
import ScrollReveal from './ScrollReveal';
import { AnimatePresence } from 'framer-motion';
import ProjectCard, { type ProjectCardData } from '@/components/common/ProjectCard';

/* ------------------------------------------------------------------ */
/*  Property types derived from project data                          */
/* ------------------------------------------------------------------ */
const propertyTypes = ['Apartments', 'Villas', 'Open Plots', 'Commercial'] as const;
type PropertyType = (typeof propertyTypes)[number];

/* ------------------------------------------------------------------ */
/*  Transform project data to match new design format                 */
/* ------------------------------------------------------------------ */
const statusMap: Record<string, 'Upcoming' | 'Ongoing' | 'Completed'> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
};

const typeMap: Record<string, 'Apartments' | 'Open Plots' | 'Villas' | 'Commercial'> = {
  apartments: 'Apartments',
  plots: 'Open Plots',
  villas: 'Villas',
  commercial: 'Commercial',
};

function toCardData(p: (typeof projects)[number]): ProjectCardData {
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
  };
}

const allCards = projects.map(toCardData);

/* ------------------------------------------------------------------ */
/*  Filter labels — includes the "All" option                         */
/* ------------------------------------------------------------------ */
type FilterOption = 'All Projects' | PropertyType;
const filterOptions: FilterOption[] = ['All Projects', ...propertyTypes];

const statusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'ongoing', label: 'New Launch' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Ready to Move' },
] as const;

type StatusFilter = (typeof statusFilters)[number]['value'];

/* ================================================================== */
/*  FEATURED PROJECTS SECTION                                          */
/* ================================================================== */
export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All Projects');
  const [activeStatus, setActiveStatus] = useState<StatusFilter>('all');

  const filteredProjects = allCards.filter(
    (project) =>
      (activeFilter === 'All Projects' || project.type === activeFilter) &&
      (activeStatus === 'all' || project.status.toLowerCase() === activeStatus)
  );

  return (
    <section id="projects" className="relative bg-muted/30 py-16 md:py-24 overflow-hidden">
      {/* ── Section Header ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-14">
            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand-gold" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
                Our Portfolio
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-brand-gold" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-primary sm:text-4xl md:text-[2.75rem] leading-tight">
              Featured{' '}
              <span className="text-brand-gold">Projects</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-muted-foreground leading-relaxed">
              Explore our handpicked selection of premium residential communities across Hyderabad
            </p>
          </div>
        </ScrollReveal>

        {/* ── Filter Pills ── */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center gap-2 mb-8 md:mb-10 flex-wrap">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option;
              return (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
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
        </ScrollReveal>

        {/* ── Project Cards Grid ── */}
        <ScrollReveal delay={0.15}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 md:mb-10">
            {statusFilters.map((filter) => {
              const isActive = activeStatus === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveStatus(filter.value)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                      : 'border border-gray-300 bg-white text-gray-600 hover:border-brand-primary/40 hover:bg-brand-primary/5 hover:text-brand-primary'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── View All CTA ── */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 md:mt-14 text-center">
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-brand-primary text-white hover:bg-brand-primary-dark rounded-lg h-12 px-8 text-sm font-semibold tracking-wide transition-all shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5"
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

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { projects } from '@/lib/project-data';
import ProjectCard, { type ProjectCardData } from '@/components/common/ProjectCard';

/* ================= FILTER CONFIG ================= */

const propertyTypes = ['Apartments', 'Villas', 'Open Plots', 'Commercial'] as const;
type PropertyType = (typeof propertyTypes)[number];

const statusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'ongoing', label: 'New Launch' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Ready to Move' },
];

/* ================= TRANSFORM ================= */

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

/* ================= MAIN ================= */

export default function ProjectsBrowser() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [activeType, setActiveType] = useState<PropertyType | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState('all');

  // Keep filters in sync with the URL (supports /projects?type=villas&status=ongoing)
  useEffect(() => {
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const isValidType = type && propertyTypes.includes(type as PropertyType);
    const isValidStatus = statusFilters.some((filter) => filter.value === status);

    setActiveType(isValidType ? (type as PropertyType) : 'all');
    setActiveStatus(isValidStatus && status ? status : 'all');
  }, [searchParams]);

  const updateFilters = (type: PropertyType | 'all', status: string) => {
    const params = new URLSearchParams();
    if (type !== 'all') params.set('type', type);
    if (status !== 'all') params.set('status', status);
    const qs = params.toString();
    // On the homepage keep the #projects anchor so links remain shareable;
    // on /projects use the clean list URL.
    const hash = pathname === '/' ? '#projects' : '';
    router.replace(`${pathname}${qs ? `?${qs}` : ''}${hash}`, { scroll: false });
  };

  const filteredProjects = allCards.filter(
    (p) =>
      (activeType === 'all' || p.type === activeType) &&
      (activeStatus === 'all' || p.status.toLowerCase() === activeStatus)
  );

  // Filter options for pills (matching homepage style)
  const typeFilterOptions = [
    { value: 'all', label: 'All Projects' },
    ...propertyTypes.map((type) => ({ value: type, label: type })),
  ] as const;
  const hasActiveFilters = activeType !== 'all' || activeStatus !== 'all';

  return (
    <div>
      {/* ⭐ Type Filter Pills (matching homepage style) */}
      <div className="mb-8 flex items-center justify-center gap-2 flex-wrap">
        {typeFilterOptions.map((option) => {
          const isActive = activeType === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => updateFilters(option.value, activeStatus)}
              aria-pressed={isActive}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                  : 'border border-gray-300 bg-white text-gray-600 hover:border-brand-primary/40 hover:bg-brand-primary/5 hover:text-brand-primary'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Status Filter Pills */}
      <div className="mb-10 flex items-center justify-center gap-2 flex-wrap">
        {statusFilters.map((filter) => {
          const isActive = activeStatus === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => updateFilters(activeType, filter.value)}
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

      <div className="mb-8 flex flex-col gap-3 border-y border-border/70 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-muted-foreground" aria-live="polite">
          Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> of{' '}
          <span className="font-semibold text-foreground">{allCards.length}</span>{' '}
          {allCards.length === 1 ? 'project' : 'projects'}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => updateFilters('all', 'all')}
            className="w-fit font-semibold text-brand-primary transition-colors hover:text-brand-gold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center">
          <h3 className="text-xl font-semibold text-foreground">No projects currently in this category</h3>
          <p className="mt-2 text-muted-foreground">
            Check back soon or browse other project types and statuses to see more properties.
          </p>
          <button
            type="button"
            onClick={() => updateFilters('all', 'all')}
            className="mt-6 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

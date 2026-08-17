'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Minus, ArrowRight, Scale } from 'lucide-react';
import { projects } from '@/lib/project-data';

const MAX_COMPARE = 3;

const typeLabels: Record<string, string> = {
  apartments: 'Apartment',
  plots: 'Plot',
  villas: 'Villa',
  commercial: 'Commercial',
};

const statusLabels: Record<string, string> = {
  completed: 'Ready to Move',
  ongoing: 'New Launch',
  upcoming: 'Upcoming',
};

export default function CompareProjects() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleProject = (id: string) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= MAX_COMPARE) {
        return current;
      }
      return [...current, id];
    });
  };

  const selectedProjects = projects.filter((p) =>
    selectedIds.includes(p.id)
  );

  const availableProjects = projects.filter(
    (p) => !selectedIds.includes(p.id)
  );

  const formatPrice = (min: number, max: number, currency: string) =>
    min === max ? `${min} ${currency}` : `${min} – ${max} ${currency}`;

  const formatArea = (min: number, max: number, unit: string) =>
    min === max ? `${min} ${unit}` : `${min} – ${max} ${unit}`;

  const rows = [
    { label: 'Type', getValue: (p: (typeof projects)[number]) => typeLabels[p.type] ?? p.type },
    { label: 'Location', getValue: (p: (typeof projects)[number]) => p.location },
    { label: 'Status', getValue: (p: (typeof projects)[number]) => statusLabels[p.status] ?? p.status },
    { label: 'Project Size', getValue: (p: (typeof projects)[number]) => p.projectSize },
    { label: 'Total Units', getValue: (p: (typeof projects)[number]) => `${p.totalUnits}+` },
    { label: 'Area', getValue: (p: (typeof projects)[number]) => formatArea(p.area.min, p.area.max, p.area.unit) },
    { label: 'Price', getValue: (p: (typeof projects)[number]) => formatPrice(p.priceRange.min, p.priceRange.max, p.priceRange.currency) },
    { label: 'RERA', getValue: (p: (typeof projects)[number]) => p.reraNumber || '—' },
    { label: 'HMDA', getValue: (p: (typeof projects)[number]) => p.hmdaApproved ? '✓' : '—' },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="section-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-14"
        >
          <span className="eyebrow mb-4">Decision Made Easy</span>
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
            Compare Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Select up to 3 projects to compare side by side and make an
            informed decision.
          </p>
        </motion.div>

        {/* Project Selector */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {availableProjects.map((project) => {
            const isSelected = selectedIds.includes(project.id);
            const isDisabled = !isSelected && selectedIds.length >= MAX_COMPARE;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => toggleProject(project.id)}
                disabled={isDisabled}
                className={`
                  inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200
                  ${
                    isSelected
                      ? 'border-brand-gold bg-brand-gold/10 text-primary'
                      : isDisabled
                        ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-brand-primary/40 hover:bg-brand-primary/5 hover:text-brand-primary'
                  }
                `}
              >
                {isSelected ? (
                  <Check className="h-3.5 w-3.5 text-brand-gold" />
                ) : (
                  <Minus className="h-3.5 w-3.5" />
                )}
                {project.name}
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        <AnimatePresence>
          {selectedProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="overflow-x-auto rounded-2xl border border-border bg-white shadow-card"
            >
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="w-32 px-4 py-4 text-sm font-semibold text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4 text-brand-gold" />
                        Compare
                      </div>
                    </th>
                    {selectedProjects.map((project) => (
                      <th key={project.id} className="px-4 py-4">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => toggleProject(project.id)}
                            className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-destructive hover:text-white"
                            aria-label={`Remove ${project.name} from comparison`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="relative mb-2 h-24 w-full overflow-hidden rounded-lg">
                            <Image
                              src={project.coverImage}
                              alt={project.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="text-sm font-bold text-foreground">
                            {project.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.location}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={row.label}
                      className={`border-b border-border/50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                      }`}
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-muted-foreground">
                        {row.label}
                      </td>
                      {selectedProjects.map((project) => (
                        <td key={project.id} className="px-4 py-3 text-sm font-medium text-foreground">
                          {row.getValue(project)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* CTA Row */}
              <div className="grid grid-cols-1 gap-3 border-t border-border bg-muted/20 p-4 sm:grid-cols-3">
                {selectedProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}?siteVisit=true`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 text-sm font-semibold text-white transition hover:bg-brand-gold-hover"
                  >
                    Book Site Visit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-14 text-center"
            >
              <Scale className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold text-foreground">
                Select projects to compare
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose 2–3 projects above to see them side by side.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
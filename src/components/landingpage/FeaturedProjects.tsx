'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building,
  Home,
  LandPlot,
  MapPin,
  ShieldCheck,
  Award,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { projects } from '@/lib/project-data';
import { Project } from '@/lib/project-interface';

type FilterValue = 'all' | Project['type'];
type StatusValue = 'all' | Project['status'];

const typeFilters: Array<{
  value: FilterValue;
  label: string;
  icon: typeof Building;
}> = [
  { value: 'all', label: 'All Projects', icon: Building },
  { value: 'plots', label: 'Plots', icon: LandPlot },
  { value: 'apartments', label: 'Apartments', icon: Building },
  { value: 'villas', label: 'Villas', icon: Home },
];

const statusFilters: Array<{ value: StatusValue; label: string }> = [
  { value: 'all', label: 'All Status' },
  { value: 'ongoing', label: 'Ready Focus' },
  { value: 'upcoming', label: 'Upcoming' },
];

const statusColors: Record<Project['status'], string> = {
  ongoing: 'bg-[#7a2430] text-white',
  upcoming: 'bg-[#d8b37a] text-[#302015]',
  completed: 'bg-[#31424f] text-white',
};

const typeIcons: Record<Project['type'], React.ReactNode> = {
  plots: <LandPlot className="h-4 w-4" />,
  villas: <Home className="h-4 w-4" />,
  apartments: <Building className="h-4 w-4" />,
  commercial: <Building className="h-4 w-4" />,
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="estate-panel group overflow-hidden rounded-[2rem]"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,11,0.06)_0%,rgba(17,12,11,0.18)_42%,rgba(17,12,11,0.84)_100%)]" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <Badge className={`${statusColors[project.status]} border-0 px-3 py-1`}>
            {project.status === 'ongoing' ? 'Now Selling' : 'Upcoming'}
          </Badge>
          {project.reraApproved && (
            <Badge className="border border-white/20 bg-white/12 px-3 py-1 text-white backdrop-blur">
              RERA Focused
            </Badge>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            {typeIcons[project.type]}
            <span>{project.type}</span>
          </div>
          <h3 className="mt-2 text-3xl text-white">{project.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/74">
            <MapPin className="h-4 w-4" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <p className="text-sm leading-7 text-muted-foreground">
          {project.tagline}
        </p>

        <div className="grid grid-cols-3 gap-3 text-center">
          <InfoStat label="Project Size" value={project.projectSize} />
          <InfoStat label="Units" value={String(project.totalUnits)} />
          <InfoStat
            label="Configuration"
            value={`${project.area.min}+ ${project.area.unit}`}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {project.hmdaApproved && (
            <InfoChip icon={<ShieldCheck className="h-3.5 w-3.5" />} label="HMDA aware planning" />
          )}
          {project.reraApproved && (
            <InfoChip icon={<Award className="h-3.5 w-3.5" />} label="RERA aligned" />
          )}
        </div>

        <Button
          asChild
          size="lg"
          className="h-12 w-full rounded-full bg-[#7a2430] text-white hover:bg-[#69202a]"
        >
          <Link href={`/projects/${project.slug}`}>
            View Project Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dacdbf] bg-white/70 px-3 py-4">
      <div className="text-lg font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function InfoChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d9cdc0] bg-[#f4ece2] px-3 py-1.5 text-xs font-medium text-[#6a4a32]">
      {icon}
      {label}
    </span>
  );
}

export default function FeaturedProjects() {
  const searchParams = useSearchParams();
  const [activeType, setActiveType] = useState<FilterValue>('all');
  const [activeStatus, setActiveStatus] = useState<StatusValue>('all');

  useEffect(() => {
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const validType = typeFilters.some((filter) => filter.value === type);
    const validStatus = statusFilters.some((filter) => filter.value === status);

    setActiveType(validType && type ? (type as FilterValue) : 'all');
    setActiveStatus(validStatus && status ? (status as StatusValue) : 'all');
  }, [searchParams]);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          (activeType === 'all' || project.type === activeType) &&
          (activeStatus === 'all' || project.status === activeStatus)
      ),
    [activeStatus, activeType]
  );

  return (
    <section
      id="projects"
      className="bg-[linear-gradient(180deg,rgba(244,238,229,0.9),rgba(246,241,234,0.45)_40%,rgba(246,241,234,0.9))] py-[4.5rem] lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Curated Portfolio</span>
          <h2 className="mt-5 text-4xl text-foreground sm:text-5xl">
            Explore homes and land opportunities with clarity
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            Browse the current Pridewalls portfolio across plotted communities,
            apartments, and premium villas, each presented with the key details
            buyers care about first.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {typeFilters.map((filter) => {
              const active = activeType === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveType(filter.value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    active
                      ? 'border-[#7a2430] bg-[#7a2430] text-white shadow-[0_14px_28px_rgba(122,36,48,0.18)]'
                      : 'border-[#d9cdc0] bg-white/80 text-[#4e4037] hover:border-[#b9985a] hover:text-[#7a2430]'
                  }`}
                >
                  <filter.icon className="h-4 w-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>

          <Select
            value={activeStatus}
            onValueChange={(value) => setActiveStatus(value as StatusValue)}
          >
            <SelectTrigger className="h-12 w-full rounded-full border-[#d9cdc0] bg-white/85 px-5 text-sm font-medium sm:w-[240px]">
              <SlidersHorizontal className="h-4 w-4 text-[#7a2430]" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="estate-panel mt-10 rounded-[2rem] px-6 py-14 text-center">
            <h3 className="text-2xl text-foreground">No projects match this view</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Try another property type or switch the availability filter to see
              more Pridewalls opportunities.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

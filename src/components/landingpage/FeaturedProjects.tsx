'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  SlidersHorizontal,
  MapPin,
  Building,
  Home,
  LandPlot,
  Store,
  Award,
  ShieldCheck,
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

/* ================= FILTER CONFIG ================= */

const typeFilters = [
  { value: 'all', label: 'All', icon: Building },
  { value: 'plots', label: 'Plots', icon: LandPlot },
  { value: 'villas', label: 'Villas', icon: Home },
  { value: 'apartments', label: 'Apartments', icon: Building },
];

const statusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
];

const statusColors: Record<string, string> = {
  ongoing: 'bg-gray-900 text-white',
  upcoming: 'bg-gray-900 text-white',
  completed: 'bg-gray-900 text-white',
};

const typeIcons: Record<string, React.ReactNode> = {
  plots: <LandPlot className="h-4 w-4" />,
  villas: <Home className="h-4 w-4" />,
  apartments: <Building className="h-4 w-4" />,
  commercial: <Store className="h-4 w-4" />,
};

/* ================= PROJECT CARD ================= */

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Status */}
        <div className="absolute top-4 left-4">
          <Badge className={`${statusColors[project.status]} border font-semibold`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>

        {/* Featured */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-yellow-500 text-white font-semibold">Featured</Badge>
          </div>
        )}

        {/* Price */}
        {/* <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          <div className="text-sm font-bold text-[#c42630]">
            ₹ {project.priceRange.min} {project.priceRange.currency} - {project.priceRange.max}{' '}
            {project.priceRange.currency}
          </div>
        </div> */}

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
            {typeIcons[project.type]}
            <span className="capitalize">{project.type}</span>
          </div>

          <h3 className="text-xl font-bold mb-1">{project.name}</h3>

          <div className="flex items-center gap-1 text-white/70 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.tagline}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Stat value={project.totalUnits} label="Units" />
          <Stat value={project.projectSize} label="Area" />
          <Stat value={`${project.area.min}+`} label="Sq.ft" />
        </div>

        {/* Approvals */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.reraApproved && <Chip icon={<Award size={12} />} label="RERA Approved" />}
          {project.hmdaApproved && <Chip icon={<ShieldCheck size={12} />} label="HMDA Approved" />}
        </div>

        {/* CTA */}
        <Button asChild className="w-full bg-[#c42630] hover:bg-[#a61f28] text-white">
          <Link href={`/projects/${project.slug}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

/* helpers */

const Stat = ({ value, label }: any) => (
  <div className="text-center p-3 bg-muted/50 rounded-lg">
    <div className="text-lg font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const Chip = ({ icon, label }: any) => (
  <span className="flex items-center gap-1 text-xs px-2 py-1 bg-[#c42630]/10 text-[#c42630] rounded-full">
    {icon}
    {label}
  </span>
);

/* ================= MAIN ================= */

export default function FeaturedProjects() {
  const searchParams = useSearchParams();
  const [activeType, setActiveType] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');

  useEffect(() => {
    const status = searchParams.get('status');
    const isValidStatus = statusFilters.some((filter) => filter.value === status);

    setActiveStatus(isValidStatus && status ? status : 'all');
  }, [searchParams]);

  const filteredProjects = projects.filter(
    (p) => (activeType === 'all' || p.type === activeType) && (activeStatus === 'all' || p.status === activeStatus)
  );

  return (
    <section id="projects" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#c42630]/10 text-[#c42630] rounded-full text-sm font-medium mb-4">
            Our Projects
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Discover Your Dream Property
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our portfolio of premium residential and commercial properties across prime locations.
          </p>
        </div>

        {/* ⭐ Type Tabs */}
        <div className="mb-8 flex justify-start">
          <div className="w-full rounded-xl bg-muted p-2 shadow-sm sm:w-auto">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {typeFilters.map((filter) => {
                const active = activeType === filter.value;

                return (
                  <button
                    key={filter.value}
                    onClick={() => setActiveType(filter.value)}
                    className={`flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200 sm:justify-start sm:px-4 sm:py-2 sm:text-sm
            ${active
                        ? 'bg-[#c42630] text-white shadow'
                        : 'text-muted-foreground hover:bg-[#c42630]/10 hover:text-[#c42630]'
                      }
          `}
                  >
                    <filter.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-10 flex justify-end">
          <Select value={activeStatus} onValueChange={setActiveStatus}>
            <SelectTrigger className="h-11 w-full gap-2 rounded-xl border-border bg-background px-4 text-sm font-medium sm:w-[220px]">
              <SlidersHorizontal className="h-4 w-4 text-[#c42630]" />
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

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-foreground">No projects found</h3>
            <p className="mt-2 text-muted-foreground">
              Try changing the project type or status filter to see more properties.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

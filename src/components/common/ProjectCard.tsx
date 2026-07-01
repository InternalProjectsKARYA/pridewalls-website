'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building, Home, LandPlot, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/project-interface';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const typeIcons: Record<string, React.ReactNode> = {
  plots: <LandPlot className="h-4 w-4" />,
  villas: <Home className="h-4 w-4" />,
  apartments: <Building className="h-4 w-4" />,
  commercial: <Store className="h-4 w-4" />,
};

const statusColors: Record<string, string> = {
  ongoing: 'bg-info/10 text-info border-info/20',
  upcoming: 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-success/10 text-success border-success/20',
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        featured ? 'lg:flex' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : ''}`}>
        <div className={`relative ${featured ? 'h-64 lg:h-full' : 'h-56'}`}>
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${statusColors[project.status]} border font-medium`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground font-medium">
                Featured
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'lg:w-1/2 lg:p-8' : ''}`}>
        {/* Type & Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            {typeIcons[project.type]}
            <span className="text-sm font-medium capitalize">{project.type}</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">
              ₹{project.priceRange.min}
            </span>
            <span className="text-muted-foreground"> - ₹{project.priceRange.max} {project.priceRange.currency}</span>
          </div>
        </div>

        {/* Title & Location */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{project.location}</span>
        </div>

        {/* Description */}
        <p className={`text-muted-foreground text-sm mb-4 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {project.tagline}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight.id}
              className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {highlight.title}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span>{project.totalUnits} Units</span>
          <span>•</span>
          <span>{project.area.min} - {project.area.max} {project.area.unit}</span>
          {project.reraApproved && (
            <>
              <span>•</span>
              <span className="text-success font-medium">RERA Approved</span>
            </>
          )}
        </div>

        {/* CTA */}
        <Button asChild className="w-full group/btn">
          <Link href={`/#project/${project.slug}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

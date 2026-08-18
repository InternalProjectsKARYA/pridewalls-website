'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IndianRupee, CalendarClock, BadgeCheck } from 'lucide-react';
import {
  ArrowRight,
  MapPin,
  Maximize2,
  Building,
  Layers,
  Grid3X3,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Status config — colour coding for badges                            */
/* ------------------------------------------------------------------ */

const statusConfig: Record<
  string,
  {
    bg: string;
    text: string;
    label: string;
  }
> = {
  Completed: {
    bg: 'bg-emerald-600',
    text: 'text-white',
    label: 'READY TO MOVE',
  },
  Ongoing: {
    bg: 'bg-brand-gold',
    text: 'text-white',
    label: 'NEW LAUNCH',
  },
  Upcoming: {
    bg: 'bg-brand-primary',
    text: 'text-white',
    label: 'UPCOMING',
  },
};

/* ------------------------------------------------------------------ */
/* Project Card Types                                                  */
/* ------------------------------------------------------------------ */

export interface ProjectCardData {
  name: string;
  slug: string;
  location: string;
  image: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  type: 'Apartments' | 'Open Plots' | 'Villas' | 'Commercial';
  units: string;
  area: string;
  sizes: string;
  approvals: string[];
  price?: string;
  configurations?: string;
  reraNumber?: string;
  possession?: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

/* ================================================================== */
/* Project Card                                                        */
/* ================================================================== */

export default function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const status =
    statusConfig[project.status] ??
    statusConfig.Upcoming;

  const isPlot = project.type === 'Open Plots';
  const isVilla = project.type === 'Villas';

  /* ---------------------------------------------------------------- */
  /* Features                                                          */
  /* ---------------------------------------------------------------- */

  const features = [
    {
      icon: <Layers className="h-4 w-4" />,
      label: 'Project Type',
      value: project.type,
    },

    ...(!isPlot
      ? [
          {
            icon: <Grid3X3 className="h-4 w-4" />,
            label: isVilla
              ? 'Villa Sizes'
              : 'Configurations',
            value: project.configurations || project.sizes,
          },
        ]
      : []),

    {
      icon: <Maximize2 className="h-4 w-4" />,
      label: 'Development Size',
      value: project.area,
    },

    {
      icon: <Building className="h-4 w-4" />,
      label: isPlot
        ? 'Total Plots'
        : isVilla
          ? 'Total Villas'
          : 'Total Units',
      value: project.units,
    },
  ];

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
      }}
    >
      <article
        className="
          group
          relative
          flex
          h-full
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-gray-200/80
          bg-white
          transition-all
          duration-300
          ease-out
          group-hover:-translate-y-1
          group-hover:shadow-xl
          group-hover:shadow-brand-primary/8
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          router.push(`/projects/${project.slug}`)
        }
      >
        {/* ======================================================== */}
        {/* Image Section                                             */}
        {/* ======================================================== */}

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />

          {/* Bottom gradient */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-1/4
              bg-gradient-to-t
              from-black/20
              to-transparent
            "
          />

          {/* Status Badge */}

          <span
            className={`
              absolute
              left-4
              top-4
              z-10
              inline-flex
              items-center
              rounded-md
              px-4
              py-1.5
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              shadow-sm
              ${status.bg}
              ${status.text}
            `}
          >
            {status.label}
          </span>

          {/* Price Badge - Top Right */}
          {project.status === 'Completed' && (
            <span
              className="
                absolute
                right-4
                top-4
                z-10
                inline-flex
                items-center
                gap-1
                rounded-md
                bg-black/70
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-white
                shadow-sm
                backdrop-blur-sm
              "
            >
              <IndianRupee className="h-3 w-3" />
              75 Lakhs Onwards
            </span>
          )}
          {project.status === 'Ongoing' && project.price && (
            <span
              className="
                absolute
                right-4
                top-4
                z-10
                inline-flex
                items-center
                gap-1
                rounded-md
                bg-black/70
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-white
                shadow-sm
                backdrop-blur-sm
              "
            >
              <IndianRupee className="h-3 w-3" />
              {project.price}
            </span>
          )}

          {/* Hover Image Tint */}

          <div
            className={`
              absolute
              inset-0
              bg-brand-primary/10
              transition-opacity
              duration-300
              ${
                isHovered
                  ? 'opacity-100'
                  : 'opacity-0'
              }
            `}
          />
        </div>

        {/* ======================================================== */}
        {/* Content Section                                           */}
        {/* ======================================================== */}

        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col p-5 sm:p-6">

            {/* Location */}

            <div
              className="
                mb-1.5
                flex
                items-center
                gap-1.5
                text-sm
                text-muted-foreground
              "
            >
              <MapPin
                className="
                  size-3.5
                  shrink-0
                  text-brand-gold
                "
              />

              <span className="truncate">
                {project.location}
              </span>
            </div>

            {/* Project Name */}

            <h3
              className="
                text-xl
                font-bold
                leading-tight
                text-foreground
                transition-colors
                duration-300
                group-hover:text-brand-primary
              "
            >
              {project.name}
            </h3>

            {/* Divider */}

            <div className="my-4 h-px bg-gray-100" />

            {/* Features Grid */}

            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {features.map((feat) => (
                <div
                  key={feat.label}
                  className="
                    flex
                    items-start
                    gap-2.5
                  "
                >
                  <div
                    className="
                      mt-0.5
                      flex
                      size-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-brand-primary/5
                      text-brand-primary/70
                    "
                  >
                    {feat.icon}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-muted-foreground
                      "
                    >
                      {feat.label}
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-xs
                        font-semibold
                        leading-tight
                        text-foreground
                      "
                    >
                      {feat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RERA + Possession Row */}
            {(project.reraNumber || project.possession) && (
              <div className="mt-4 space-y-1.5">
                {project.reraNumber && (
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span className="truncate">
                      RERA: {project.reraNumber}
                    </span>
                  </div>
                )}

                {project.possession && (
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <CalendarClock className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                    <span className="truncate">
                      {project.possession}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ==================================================== */}
            {/* Approvals                                              */}
            {/* ==================================================== */}

            {project.approvals.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.approvals.slice(0, 3).map((approval) => (
                  <span
                    key={approval}
                    className="
                      inline-flex
                      items-center
                      rounded-md
                      border
                      border-brand-gold/20
                      bg-brand-gold/5
                      px-2
                      py-0.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-brand-gold
                    "
                  >
                    {approval}
                  </span>
                ))}
              </div>
            )}

            {/* ==================================================== */}
            {/* Hover Action Bar                                      */}
            {/* ==================================================== */}

            <div
              className={`
                absolute
                inset-x-0
                bottom-0
                z-20
                grid
                grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]
                items-center
                gap-2
                border-t
                border-gray-200
                bg-white/95
                p-4
                shadow-[0_-8px_20px_rgba(15,23,42,0.08)]
                backdrop-blur-sm
                transition-all
                duration-300
                sm:p-5
                ${
                  isHovered
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-full opacity-0'
                }
              `}
            >
              {/* ================================================= */}
              {/* Enquire Now                               */}
              {/* ================================================= */}

              <Link
                href="/#contact"
                className="
                  relative
                  z-10
                  flex
                  min-w-0
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  bg-brand-gold
                  px-3
                  py-2
                  text-[11px]
                  font-bold
                  text-white
                  shadow-sm
                  shadow-brand-gold/20
                  transition-all
                  duration-200
                  hover:bg-brand-gold-hover
                  hover:text-white
                  hover:shadow-md
                  sm:text-xs
                "
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <MessageSquare
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-white
                  "
                />

                <span className="truncate text-white">
                  Enquire Now
                </span>
              </Link>

              {/* ================================================= */}
              {/* Schedule a Visit                                   */}
              {/* ================================================= */}

              <Link
                href={`/projects/${project.slug}?siteVisit=true`}
                className="
                  group/sitevisit
                  relative
                  z-10
                  flex
                  min-w-0
                  items-center
                  justify-center
                  gap-1.5
                  overflow-hidden
                  rounded-lg
                  bg-brand-primary
                  px-3
                  py-2
                  text-[11px]
                  font-bold
                  !text-white
                  shadow-sm
                  shadow-brand-primary/20
                  transition-all
                  duration-200
                  hover:bg-brand-primary-dark
                  hover:!text-white
                  hover:shadow-md
                  sm:text-xs
                "
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <Eye
                  className="
                    relative
                    z-20
                    h-3.5
                    w-3.5
                    shrink-0
                    !text-white
                    transition-transform
                    duration-200
                    group-hover/sitevisit:scale-110
                  "
                />

                <span
                  className="
                    relative
                    z-20
                    truncate
                    !text-white
                  "
                >
                  Schedule a Visit
                </span>
              </Link>

              {/* ================================================= */}
              {/* View Property                                     */}
              {/* ================================================= */}

              <Link
                href={`/projects/${project.slug}`}
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-brand-primary/5
                  p-2
                  text-brand-primary
                  transition-all
                  duration-200
                  hover:bg-brand-primary/10
                  hover:text-brand-primary
                "
                onClick={(e) =>
                  e.stopPropagation()
                }
                aria-label="View property details"
              >
                <ArrowRight
                  className="
                    h-3.5
                    w-3.5
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
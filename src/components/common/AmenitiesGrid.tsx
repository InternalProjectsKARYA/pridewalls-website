'use client';

import { motion } from 'framer-motion';
import {
  Waves,
  Home,
  Dumbbell,
  Shield,
  Flower2,
  Baby,
  Trophy,
  Footprints,
  Droplets,
  Lightbulb,
  Zap,
  CloudRain,
  Car,
  Utensils,
  Briefcase,
  Users,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { Amenity } from '@/lib/project-interface';

interface AmenitiesGridProps {
  amenities: Amenity[];
  columns?: 2 | 3 | 4;
}

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  home: Home,
  dumbbell: Dumbbell,
  shield: Shield,
  flower2: Flower2,
  baby: Baby,
  trophy: Trophy,
  footprints: Footprints,
  droplets: Droplets,
  lightbulb: Lightbulb,
  zap: Zap,
  'cloud-rain': CloudRain,
  car: Car,
  utensils: Utensils,
  briefcase: Briefcase,
  users: Users,
  smartphone: Smartphone,
};

export default function AmenitiesGrid({ amenities, columns = 3 }: AmenitiesGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[columns]} gap-4 lg:gap-6`}
    >
      {amenities.map((amenity) => {
        const IconComponent = iconMap[amenity.icon] || Home;
        
        return (
          <motion.div
            key={amenity.id}
            variants={itemVariants}
            className="group relative p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {amenity.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {amenity.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

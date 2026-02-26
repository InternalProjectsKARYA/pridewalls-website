'use client';

import { motion } from 'framer-motion';
import {
  Shield, DoorOpen, Fence, Droplets, Video, ArrowDown,
  Droplet, Database, CloudRain, Route, Lightbulb, Zap,
  Flame, Phone, Car, Snowflake, ArrowUpDown
} from 'lucide-react';
import { Facility } from '@/lib/project-interface';

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-6 w-6" />,
  'door-open': <DoorOpen className="h-6 w-6" />,
  wall: <Fence className="h-6 w-6" />,
  droplets: <Droplets className="h-6 w-6" />,
  video: <Video className="h-6 w-6" />,
  'arrow-down': <ArrowDown className="h-6 w-6" />,
  droplet: <Droplet className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  'cloud-rain': <CloudRain className="h-6 w-6" />,
  road: <Route className="h-6 w-6" />,
  lightbulb: <Lightbulb className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  flame: <Flame className="h-6 w-6" />,
  phone: <Phone className="h-6 w-6" />,
  car: <Car className="h-6 w-6" />,
  snowflake: <Snowflake className="h-6 w-6" />,
  'arrow-up-down': <ArrowUpDown className="h-6 w-6" />,
};

interface FacilitiesGridProps {
  facilities: Facility[];
}

export default function FacilitiesGrid({ facilities }: FacilitiesGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {facilities.map((facility, index) => (
        <motion.div
          key={facility.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="group relative bg-card rounded-xl p-4 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 text-center"
        >
          <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {iconMap[facility.icon] || <Shield className="h-6 w-6" />}
          </div>
          <h4 className="font-medium text-foreground text-sm leading-tight">
            {facility.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-tight">
            {facility.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

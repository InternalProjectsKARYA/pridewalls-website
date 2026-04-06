'use client';

import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpDown,
  Car,
  CloudRain,
  Database,
  DoorOpen,
  Droplet,
  Droplets,
  Fence,
  Flame,
  Landmark,
  Lightbulb,
  Phone,
  Route,
  Shield,
  Snowflake,
  TreePine,
  Video,
  Zap,
} from 'lucide-react';
import { Facility } from '@/lib/project-interface';

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-5 w-5" />,
  'door-open': <DoorOpen className="h-5 w-5" />,
  fence: <Fence className="h-5 w-5" />,
  droplets: <Droplets className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  'arrow-down': <ArrowDown className="h-5 w-5" />,
  droplet: <Droplet className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  'cloud-rain': <CloudRain className="h-5 w-5" />,
  route: <Route className="h-5 w-5" />,
  lightbulb: <Lightbulb className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  flame: <Flame className="h-5 w-5" />,
  phone: <Phone className="h-5 w-5" />,
  car: <Car className="h-5 w-5" />,
  snowflake: <Snowflake className="h-5 w-5" />,
  'arrow-up-down': <ArrowUpDown className="h-5 w-5" />,
  'tree-pine': <TreePine className="h-5 w-5" />,
  landmark: <Landmark className="h-5 w-5" />,
};

interface FacilitiesGridProps {
  facilities: Facility[];
}

export default function FacilitiesGrid({ facilities }: FacilitiesGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {facilities.map((facility, index) => (
        <motion.div
          key={facility.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/78 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(59,37,28,0.06)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7a2430]/10 text-[#7a2430]">
            {iconMap[facility.icon] || <Shield className="h-5 w-5" />}
          </div>

          <h4 className="mt-5 text-2xl text-foreground">{facility.name}</h4>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {facility.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import {
  Building,
  CheckCircle2,
  Coffee,
  GraduationCap,
  HeartPulse,
  Landmark,
  Navigation,
  Plane,
  ShoppingBag,
  Train,
} from 'lucide-react';
import { LocationHighlight } from '@/lib/project-interface';

const iconMap: Record<string, React.ReactNode> = {
  navigation: <Navigation className="h-5 w-5" />,
  train: <Train className="h-5 w-5" />,
  building: <Building className="h-5 w-5" />,
  'graduation-cap': <GraduationCap className="h-5 w-5" />,
  'heart-pulse': <HeartPulse className="h-5 w-5" />,
  'shopping-bag': <ShoppingBag className="h-5 w-5" />,
  plane: <Plane className="h-5 w-5" />,
  coffee: <Coffee className="h-5 w-5" />,
  landmark: <Landmark className="h-5 w-5" />,
};

interface LocationHighlightsProps {
  highlights: LocationHighlight[];
}

export default function LocationHighlights({
  highlights,
}: LocationHighlightsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {highlights.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/78 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7a2430]/10 text-[#7a2430]">
              {group.icon ? iconMap[group.icon] ?? <Navigation className="h-5 w-5" /> : <Navigation className="h-5 w-5" />}
            </div>
            <div>
              {group.time ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c45]">
                  {group.time}
                </p>
              ) : null}
              <h4 className="text-xl text-foreground">
                {group.category || 'Nearby Highlights'}
              </h4>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {group.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7a2430]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

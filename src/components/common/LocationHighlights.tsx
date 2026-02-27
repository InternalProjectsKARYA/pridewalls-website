'use client';

import { motion } from 'framer-motion';
import { 
  Navigation, Train, Building, GraduationCap, HeartPulse, 
  ShoppingBag, Plane, Car, Bus, Coffee, Utensils, Landmark,
  CheckCircle2
} from 'lucide-react';
import { LocationHighlight } from '@/lib/project-interface';

const iconMap: Record<string, React.ReactNode> = {
  navigation: <Navigation className="h-6 w-6" />,
  train: <Train className="h-6 w-6" />,
  building: <Building className="h-6 w-6" />,
  'graduation-cap': <GraduationCap className="h-6 w-6" />,
  'heart-pulse': <HeartPulse className="h-6 w-6" />,
  'shopping-bag': <ShoppingBag className="h-6 w-6" />,
  plane: <Plane className="h-6 w-6" />,
  car: <Car className="h-6 w-6" />,
  bus: <Bus className="h-6 w-6" />,
  coffee: <Coffee className="h-6 w-6" />,
  utensils: <Utensils className="h-6 w-6" />,
  landmark: <Landmark className="h-6 w-6" />,
};

interface LocationHighlightsProps {
  highlights: LocationHighlight[];
}

export default function LocationHighlights({ highlights }: LocationHighlightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {highlights.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          
          {/* Header */}
          <h4 className="text-lg font-semibold text-[#c42630] mb-4">
            {group.time}
          </h4>

          <h4 className="text-lg font-semibold text-[#c42630] mb-4">
            {group.category}
          </h4>

          {/* Items */}
          <ul className="space-y-3">
            {group.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <CheckCircle2 className="h-4 w-4 text-[#c42630] mt-0.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

        </motion.div>
      ))}

    </div>
  );
}
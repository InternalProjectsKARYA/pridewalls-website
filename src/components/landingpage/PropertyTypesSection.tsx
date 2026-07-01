'use client';

import { motion } from 'framer-motion';
import { MapPin, Home, Building, Store, ArrowRight } from 'lucide-react';

const propertyTypes = [
  {
    id: 'plots',
    icon: MapPin,
    title: 'Open Plots',
    description: 'High-growth residential & commercial plots in rapidly developing prime locations',
    count: 1,
    cardClass: 'bg-emerald-50 text-emerald-700',
    iconClass: 'bg-teal-600 text-white shadow-teal-600/25',
    bubbleClass: 'bg-teal-200/45',
    linkClass: 'text-teal-700',
  },
  {
    id: 'villas',
    icon: Home,
    title: 'Luxury Villas',
    description: 'Ready-to-move villas with premium amenities, privacy, and elegant architecture',
    count: 1,
    cardClass: 'bg-orange-50 text-orange-600',
    iconClass: 'bg-orange-500 text-white shadow-orange-500/25',
    bubbleClass: 'bg-orange-200/55',
    linkClass: 'text-orange-600',
  },
  {
    id: 'apartments',
    icon: Building,
    title: 'Modern Apartments',
    description: 'Well-designed apartments with top-class facilities in prime urban locations',
    count: 1,
    cardClass: 'bg-blue-50 text-blue-600',
    iconClass: 'bg-blue-600 text-white shadow-blue-600/25',
    bubbleClass: 'bg-blue-200/55',
    linkClass: 'text-blue-600',
  },
  {
    id: 'commercial',
    icon: Store,
    title: 'Commercial Spaces',
    description: 'High-visibility commercial properties ideal for business growth and steady returns',
    count: 1,
    cardClass: 'bg-rose-50 text-rose-600',
    iconClass: 'bg-pink-600 text-white shadow-pink-600/25',
    bubbleClass: 'bg-pink-200/55',
    linkClass: 'text-pink-600',
  },
];

export default function PropertyTypesSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-muted/30 py-20">
      <div className="section-shell">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
           <span className="eyebrow mb-4">
            Our Portfolio
          </span>
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
            Property Types
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore our diverse range of properties designed to meet every lifestyle and investment need
          </p>
        </motion.div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={scrollToProjects}
              className="group cursor-pointer"
            >
              <div className={`relative min-h-[300px] overflow-hidden rounded-xl border border-border p-7 shadow-card transition-all duration-300 hover:shadow-card-hover ${type.cardClass}`}>
                <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${type.bubbleClass}`} />
                {/* Icon */}
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 ${type.iconClass}`}>
                  <type.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {type.title}
                </h3>
                <p className="mb-7 text-sm leading-7 text-foreground/75">
                  {type.description}
                </p>

                {/* Count Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/60">
                    {type.count}+ Properties
                  </span>
                  <div className={`flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2 ${type.linkClass}`}>
                    Explore
                    <ArrowRight className="h-4 w-4 text-foreground group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

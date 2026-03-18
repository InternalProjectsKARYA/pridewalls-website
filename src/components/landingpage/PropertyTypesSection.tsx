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
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
  },
  {
    id: 'villas',
    icon: Home,
    title: 'Luxury Villas',
    description: 'Ready-to-move villas with premium amenities, privacy, and elegant architecture',
    count: 1,
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50',
  },
  {
    id: 'apartments',
    icon: Building,
    title: 'Modern Apartments',
    description: 'Well-designed apartments with top-class facilities in prime urban locations',
    count: 1,
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
  },
  {
    id: 'commercial',
    icon: Store,
    title: 'Commercial Spaces',
    description: 'High-visibility commercial properties ideal for business growth and steady returns',
    count: 1,
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-50 to-pink-50',
  },
];

export default function PropertyTypesSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
           <span className="inline-block px-5 py-1.5 bg-[#c42630]/10 text-[#c42630] rounded-full text-sm font-semibold mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Property Types
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${type.bgGradient} p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300`}>
                {/* Background Decoration */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${type.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${type.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800">
                  {type.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {type.description}
                </p>

                {/* Count Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    {type.count}+ Properties
                  </span>
                  <div className={`flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all duration-300`}>
                    Explore
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
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

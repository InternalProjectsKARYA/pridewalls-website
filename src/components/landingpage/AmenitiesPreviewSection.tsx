'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Building2,
  Car,
  Dumbbell,
  Flower2,
  Footprints,
  Gamepad2,
  Mic2,
  Shield,
  TreePine,
  Users,
  Waves,
} from 'lucide-react';

const amenities = [
  {
    icon: Dumbbell,
    title: 'Modern Gym',
    description: 'State-of-the-art fitness center',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
  },
  {
    icon: Waves,
    title: 'Swimming Pool',
    description: 'Olympic-sized pool with deck',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop',
  },
  {
    icon: TreePine,
    title: 'Landscaped Gardens',
    description: 'Lush green spaces throughout',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
  },
  {
    icon: Car,
    title: 'Covered Parking',
    description: 'Secure parking for residents',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=300&fit=crop',
  },
  {
    icon: Shield,
    title: '24/7 Security',
    description: 'Round-the-clock surveillance',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop',
  },
  {
    icon: Flower2,
    title: 'Parks & Play Areas',
    description: 'Dedicated spaces for children',
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300&fit=crop',
  },
];

const amenityFeatures = [
  { icon: Building2, title: 'Clubhouse' },
  { icon: Footprints, title: 'Jogging Track' },
  { icon: Gamepad2, title: 'Indoor Games' },
  { icon: Flower2, title: 'Yoga Deck' },
  { icon: Mic2, title: 'Amphitheater' },
  { icon: Users, title: 'Senior Citizen Area' },
];

export default function AmenitiesPreviewSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">

        {/* ⭐ Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#c42630]/10 text-[#c42630] rounded-full text-sm font-medium mb-4">
            Lifestyle
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            World-Class Amenities
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Every project comes with premium amenities designed for a modern, comfortable lifestyle
          </p>
        </motion.div>

        {/* ⭐ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* ⭐ Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* ⭐ Icon badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
                  <amenity.icon className="h-6 w-6 text-[#c42630]" />
                </div>
              </div>

              {/* ⭐ Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#c42630] transition-colors">
                  {amenity.title}
                </h3>

                <p className="text-slate-600 text-sm">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ⭐ Feature chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
              More Lifestyle Amenities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c42630]/10 text-[#c42630]">
                    <feature.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-[#c42630] transition-colors">
                      {feature.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      Included in select projects
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

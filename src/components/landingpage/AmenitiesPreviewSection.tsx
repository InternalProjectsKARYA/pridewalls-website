'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Activity,
  Baby,
  BookOpen,
  Building2,
  Flower2,
  Footprints,
  Gamepad2,
  Mic2,
  Users,
  UtensilsCrossed,
  Waves,
} from 'lucide-react';

const amenities = [
  {
    icon: Waves,
    title: 'Swimming Pool',
    description: 'Refreshing pool with a relaxing deck',
    image: '/Amenities/Swimming Pool.jpg',
  },
  {
    icon: Activity,
    title: 'Cricket Pitch',
    description: 'Dedicated pitch for sports enthusiasts',
    image: '/Amenities/Cricket Pitch.jpg',
  },
  {
    icon: Gamepad2,
    title: 'Indoor Sports',
    description: 'Table tennis, carrom and more',
    image: '/Amenities/Indoor Sports.jpg',
  },
  {
    icon: UtensilsCrossed,
    title: 'Food Court',
    description: 'Multi-cuisine dining options',
    image: '/Amenities/Food Court.jpg',
  },
  {
    icon: BookOpen,
    title: 'Library',
    description: 'Quiet reading and study space',
    image: '/Amenities/Library.jpg',
  },
  {
    icon: Baby,
    title: "Children's Play Area",
    description: 'Safe, vibrant space for kids',
    image: '/Amenities/Children Area.jpg',
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* ⭐ Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-medium mb-4">
            Lifestyle
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            World-Class Amenities
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              className="group relative overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-xl transition-all duration-300"
            >
              {/* ⭐ Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* ⭐ Icon badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
                  <amenity.icon className="h-6 w-6 text-brand-gold" />
                </div>
              </div>

              {/* ⭐ Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-brand-gold transition-colors">
                  {amenity.title}
                </h3>

                <p className="text-muted-foreground text-sm">
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
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-white/70 backdrop-blur p-6 shadow-card">
            <h3 className="text-lg font-bold text-primary mb-4 text-center">
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
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-card hover:shadow-card-hover transition"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                    <feature.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary group-hover:text-brand-gold transition-colors">
                      {feature.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
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

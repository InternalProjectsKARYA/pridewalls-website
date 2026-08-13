'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Baby,
  Building2,
  Flower2,
  Footprints,
  Gamepad2,
  Mic2,
  Sparkles,
  Trees,
  Waves,
} from 'lucide-react';

const amenities = [
  {
    icon: Building2,
    title: 'Clubhouse',
    description: 'A central lifestyle destination for social gatherings, leisure, and community experiences.',
    image: '/amenities-generated/clubhouse.png',
  },
  {
    icon: Waves,
    title: 'Swimming Pool',
    description: 'A signature pool amenity designed for relaxation, family time, and everyday refreshment.',
    image: '/amenities-generated/swimming-pool.png',
  },
  {
    icon: Flower2,
    title: 'Gymnasium',
    description: 'A modern fitness space planned for daily workouts, wellness routines, and active living.',
    image: '/amenities-generated/gymnasium.png',
  },
  {
    icon: Gamepad2,
    title: 'Indoor Games',
    description: 'Versatile recreation spaces that keep residents engaged across all seasons and age groups.',
    image: '/amenities-generated/indoor-games.png',
  },
  {
    icon: Footprints,
    title: 'Jogging Track',
    description: 'A dedicated outdoor circuit for walking, jogging, and maintaining an active everyday routine.',
    image: '/amenities-generated/jogging-track.png',
  },
  {
    icon: Baby,
    title: "Children's Play Area",
    description: 'Safe and cheerful play zones created for children to explore, play, and connect freely.',
    image: '/amenities-generated/childrens-play-area.png',
  },
  {
    icon: Trees,
    title: 'Landscaped Gardens',
    description: 'Open green spaces designed to bring calm, beauty, and a refreshing natural setting to daily life.',
    image: '/amenities-generated/landscaped-gardens.png',
  },
  {
    icon: Mic2,
    title: 'Amphitheater',
    description: 'A community venue for events, celebrations, performances, and memorable gatherings.',
    image: '/amenities-generated/amphitheater.png',
  },
];

export default function AmenitiesPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-white py-10 text-slate-900">
      <div className="absolute inset-0">
        <div className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),transparent_28%,transparent_72%,rgba(201,162,39,0.06))]" />
      </div>

      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Signature Lifestyle
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
            World-Class Amenities,
            <span className="block text-brand-gold">Presented With a Grander Sense of Arrival</span>
          </h2>

     
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="group overflow-hidden rounded-[1.35rem] border border-primary/80 bg-brand-primary-dark shadow-lg transition-[border-color,box-shadow] duration-500 hover:border-brand-gold/50 hover:shadow-[0_24px_60px_rgba(15,23,42,0.24)]"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.24),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-black/30 text-brand-gold backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-1 group-hover:scale-105">
                  <amenity.icon className="h-5 w-5" />
                </div>
              </div>

              <div className="p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                <div>
                  <p className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-brand-gold">
                    {amenity.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                    {amenity.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

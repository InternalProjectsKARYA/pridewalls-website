'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
const heroContent = {
  image: '/hero-home-premium.png',
  imageAlt: 'Premium residential boulevard with contemporary apartments, villas, and landscaped open space',
};

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-svh overflow-hidden bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={heroContent.image}
          alt={heroContent.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          loading="eager"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-[4%] z-10 flex justify-center px-6"
      >
        <div className="border border-white/15 bg-black/35 px-8 py-5 text-center shadow-2xl sm:px-12">
          <h1 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl md:text-[2.8rem]">
            Find Your Dream Home
          </h1>
          <p className="mt-2 text-base uppercase tracking-[0.28em] text-white/85 sm:text-lg md:text-xl">
            With PrideWalls
          </p>
        </div>
      </motion.div>
    </section>
  );
}

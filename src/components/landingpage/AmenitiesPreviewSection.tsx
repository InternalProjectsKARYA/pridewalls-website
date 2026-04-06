'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  Flower2,
  Gamepad2,
  Shield,
  Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const amenityPillars = [
  {
    icon: Waves,
    title: 'Wellness and leisure',
    text: 'Pool decks, open-air relaxation, and spaces that slow the day down.',
  },
  {
    icon: Gamepad2,
    title: 'Family recreation',
    text: 'Indoor games, activity zones, and shared spaces that keep all age groups engaged.',
  },
  {
    icon: Flower2,
    title: 'Open green character',
    text: 'Landscaped pockets and softer edges that make communities feel more breathable.',
  },
  {
    icon: Shield,
    title: 'Comfort with security',
    text: 'A safer community atmosphere that supports everyday confidence for families.',
  },
];

const amenityLabels = [
  'Swimming pool',
  'Clubhouse',
  'Indoor sports',
  'Children play areas',
  'Temple space',
  'Landscaped courts',
  'Community zones',
  'Lifestyle recreation',
];

export default function AmenitiesPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#191211_0%,#110d0c_100%)] py-[4.75rem] lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,152,90,0.12),transparent_24rem)]" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
              Lifestyle Amenities
            </span>

            <h2 className="mt-5 text-4xl text-white sm:text-5xl">
              Spaces that make the project feel lived in before possession
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
              For a real-estate brand, amenities should not read like a generic
              checklist. They should show the kind of daily life a family is
              stepping into, from recreation and wellness to community comfort.
            </p>

            <div className="estate-dark-panel mt-8 rounded-[2rem] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
                Signature experience
              </p>
              <p className="mt-4 text-lg leading-8 text-white">
                Pridewalls communities are presented around calm, premium, and
                family-oriented living, not just unit inventory.
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              {amenityPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7a2430] text-white shadow-[0_14px_24px_rgba(122,36,48,0.24)]">
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl text-white">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/62">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-full bg-[#d8b37a] px-7 text-[#231613] hover:bg-[#cda469]"
            >
              <Link href="/#projects">
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div>
            <div className="grid gap-4 md:grid-cols-[1.12fr_0.88fr]">
              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
              >
                <div className="relative h-[22rem] overflow-hidden md:h-full">
                  <Image
                    src="/Amenities/Swimming Pool.jpg"
                    alt="Swimming pool amenity"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,11,0.04)_0%,rgba(17,12,11,0.18)_32%,rgba(17,12,11,0.88)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
                      Featured Amenity
                    </p>
                    <h3 className="mt-3 text-4xl text-white">Poolside living</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-white/68">
                      A premium leisure touch that immediately improves the
                      perceived quality of the community.
                    </p>
                  </div>
                </div>
              </motion.article>

              <div className="grid gap-4">
                <AmenityTile
                  image="/clubhouse.png"
                  title="Clubhouse"
                  text="Gathering, fitness, and indoor lifestyle moments in one destination."
                />
                <AmenityTile
                  image="/Amenities/Indoor Sports.jpg"
                  title="Indoor Recreation"
                  text="Activity-led spaces that make the community useful beyond the apartment."
                />
                <AmenityTile
                  image="/Amenities/Temple.jpg"
                  title="Community Character"
                  text="Shared places that support belonging, rhythm, and a calmer atmosphere."
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
                    Amenity language
                  </p>
                  <h3 className="mt-3 text-3xl text-white">
                    Presented like a lifestyle story, not a brochure dump
                  </h3>
                </div>
                <div className="rounded-[1.5rem] border border-[#d8b37a]/16 bg-[#d8b37a]/8 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8b37a] text-[#20120e]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-6 text-white/76">
                      Designed to support premium residential positioning
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {amenityLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/74"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmenityTile({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
    >
      <div className="grid min-h-[10.5rem] grid-cols-[0.92fr_1.08fr]">
        <div className="relative">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="p-5">
          <h3 className="text-2xl text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-white/62">{text}</p>
        </div>
      </div>
    </motion.article>
  );
}

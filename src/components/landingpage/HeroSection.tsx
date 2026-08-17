// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ArrowRight, Calendar, Compass, PhoneCall } from 'lucide-react';
// import SiteVisitDialog from '@/components/landingpage/SiteVisitDialog';
// import { companyInfo } from '@/lib/project-data';

// const heroContent = {
//   image: '/hero-home-premium-v2.png',
//   imageAlt:
//     'Premium residential boulevard with contemporary apartments, villas, and landscaped open space',
// };

// export default function HeroSection() {
//   const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);

//   const primaryPhone = companyInfo.contact.phone[0];
//   const phoneHref = `tel:${primaryPhone.replace(/\s+/g, '')}`;
//   const whatsappHref = `https://wa.me/${(
//     companyInfo.contact.whatsapp || primaryPhone
//   ).replace(/\D/g, '')}`;

//   const scrollToContact = () =>
//     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

//   return (
//     <section className="relative h-screen min-h-svh overflow-hidden bg-primary">
//       {/* Background image */}
//       <motion.div
//         initial={{ opacity: 0, scale: 1.03 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute inset-0"
//       >
//         <Image
//           src={heroContent.image}
//           alt={heroContent.imageAlt}
//           fill
//           sizes="100vw"
//           className="object-cover"
//           loading="eager"
//           priority
//         />
//       </motion.div>

//       {/* Readability overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />

//       {/* Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute inset-x-0 bottom-[4%] z-10 flex justify-center px-6 pb-4"
//       >
//         <div className="w-full max-w-4xl text-center">
//           {/* Headline */}
//           <h1 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl md:text-[2.8rem]">
//             Premium Apartments, Villas & Plots
//             <span className="block text-brand-gold">in Hyderabad</span>
//           </h1>

//           {/* Value proposition */}
//           <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
//             RERA-approved homes and investment opportunities in Hyderabad's
//             fastest-growing corridors.
//           </p>

//           {/* Primary CTAs */}
//           <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
//             <Link
//               href="/projects"
//               className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-7 font-semibold text-white shadow-[0_10px_30px_rgba(13,38,89,0.25)] transition hover:bg-brand-gold-hover sm:w-auto"
//             >
//               <Compass className="h-4 w-4" />
//               Explore Projects
//             </Link>
//             <button
//               type="button"
//               onClick={() => setIsSiteVisitOpen(true)}
//               className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:w-auto"
//             >
//               <Calendar className="h-4 w-4" />
//               Book a Site Visit
//             </button>
//           </div>

//           {/* Secondary action */}
//           <button
//             type="button"
//             onClick={scrollToContact}
//             className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
//           >
//             <PhoneCall className="h-4 w-4" />
//             Talk to a Property Expert
//             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//           </button>
//         </div>
//       </motion.div>

//       <SiteVisitDialog
//         open={isSiteVisitOpen}
//         onOpenChange={setIsSiteVisitOpen}
//         phoneHref={phoneHref}
//         whatsappHref={whatsappHref}
//         sourceLabel="Hero section site visit request."
//       />
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
const heroContent = {
  image: '/hero-home-premium-v2.png',
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
          Premium Apartments, Villas & Plots 
          </h1>
          <p className="mt-2 text-base uppercase tracking-[0.28em] text-white/85 sm:text-lg md:text-xl">
           in Hyderabad
          </p>
        </div>
      </motion.div>
    </section>
  );
}

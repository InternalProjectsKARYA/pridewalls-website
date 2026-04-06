'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUp,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import { companyInfo } from '@/lib/project-data';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/#projects' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

const projectTypes = [
  { name: 'Plots', href: '/?type=plots#projects' },
  { name: 'Apartments', href: '/?type=apartments#projects' },
  { name: 'Villas', href: '/?type=villas#projects' },
];

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden bg-[#17100f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,152,90,0.12),transparent_22rem)]" />

      <div className="relative container mx-auto px-4 py-14 sm:px-6 lg:py-[4.5rem]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                <Image
                  src="/pridewalls-logo.png"
                  alt="Pridewalls"
                  width={44}
                  height={44}
                />
              </div>
              <div>
                <h3 className="font-display text-3xl text-white">Pridewalls</h3>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b37a]">
                  Premium Hyderabad Real Estate
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/62">
              Thoughtfully presented plots, apartments, and villa opportunities
              for buyers who care about clarity, location, and long-term value.
            </p>

            <div className="mt-6 flex gap-3">
              {companyInfo.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:border-[#d8b37a]/30 hover:bg-[#7a2430] hover:text-white"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>

          <FooterList title="Quick Links" items={quickLinks} />
          <FooterList title="Property Types" items={projectTypes} />

          <div>
            <h4 className="text-xl text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/62">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#d8b37a]" />
                <span>{companyInfo.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-[#d8b37a]" />
                <a href={`tel:${companyInfo.contact.phone[0]}`} className="hover:text-white">
                  {companyInfo.contact.phone[0]}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-[#d8b37a]" />
                <a href={`mailto:${companyInfo.contact.email[0]}`} className="hover:text-white">
                  {companyInfo.contact.email[0]}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-[#d8b37a]" />
                <span>{companyInfo.contact.officeHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/42 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pridewalls. All rights reserved.</p>
          <p>Premium real estate experiences for modern Hyderabad buyers.</p>
        </div>
      </div>

      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#7a2430] text-white shadow-[0_20px_30px_rgba(122,36,48,0.35)] hover:bg-[#69202a]"
      >
        <ArrowUp size={18} />
      </Button>
    </footer>
  );
}

function FooterList({
  title,
  items,
}: {
  title: string;
  items: Array<{ name: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="text-xl text-white">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-white/62">
        {items.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="transition hover:text-white">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

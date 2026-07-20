'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone, Mail, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { companyInfo } from '@/lib/project-data';
import Image from 'next/image';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Projects',
    href: '/#projects',
    children: [
      { name: 'Ongoing Projects', href: '/?status=ongoing#projects' },
      { name: 'Upcoming Projects', href: '/?status=upcoming#projects' },
      { name: 'Completed Projects', href: '/?status=completed#projects' },
    ],
  },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="hidden lg:block bg-primary text-white">
        <div className="container mx-auto px-4 flex justify-between py-2 text-sm">
          <div className="flex gap-6">
            <a href={`tel:${companyInfo.contact.phone[0]}`} className="flex gap-2 items-center">
              <Phone size={14} /> {companyInfo.contact.phone[0]}
            </a>
            <a href={`mailto:${companyInfo.contact.email[0]}`} className="flex gap-2 items-center">
              <Mail size={14} /> {companyInfo.contact.email[0]}
            </a>
          </div>
          <span>{companyInfo.contact.officeHours}</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-border/80 bg-white/92 shadow-[0_10px_30px_rgba(13,38,89,0.08)] backdrop-blur-xl'
            : 'border-b border-border/70 bg-white/95'
        }`}
      >
        <nav className="section-shell flex h-18 items-center justify-between lg:h-20">

          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3" aria-label="PRIDEWALLS home">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-white shadow-[0_8px_22px_rgba(13,38,89,0.10)] transition-transform duration-300 group-hover:-translate-y-0.5 lg:h-16 lg:w-16">
              <Image
                src="/pridewalls-logo-mark.png"
                alt="PRIDEWALLS logo"
                width={64}
                height={64}
                priority
                className="h-11 w-11 object-contain lg:h-12 lg:w-12"
              />
            </span>
            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-[0.18em] text-primary sm:text-xl">
                {companyInfo.name}
              </div>
              <div className="hidden text-[11px] font-semibold text-muted-foreground sm:block">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden items-center rounded-full border border-border/80 bg-muted/45 p-1 shadow-inner lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-white hover:text-primary hover:shadow-sm"
                  >
                    {item.name}
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                    <div className="min-w-[230px] overflow-hidden rounded-xl border border-border/80 bg-white p-1 shadow-[0_18px_45px_rgba(13,38,89,0.14)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-white hover:text-primary hover:shadow-sm"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Button asChild className="h-11 rounded-xl px-5 font-semibold shadow-[0_10px_24px_rgba(13,38,89,0.18)]">
              <Link href="/#contact">
                Get In Touch
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* MOBILE */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" aria-label="Open Menu" className="rounded-xl">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-6">
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <div className="space-y-3">
                      <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="font-medium">
                        {item.name}
                      </Link>

                      {item.children && (
                        <div className="space-y-2 border-l border-border pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>

        </nav>
      </header>
    </>
  );
}

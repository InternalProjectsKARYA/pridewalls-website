'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone, Mail, ChevronDown } from 'lucide-react';
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
        className={`sticky top-0 z-50 transition-all ${
          isScrolled ? 'border-b border-border bg-white/90 shadow-card backdrop-blur' : 'border-b border-border bg-white'
        }`}
      >
        <nav className="section-shell flex h-20 items-center justify-between lg:h-24">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3" aria-label="PRIDEWALLS home">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white shadow-card lg:h-[72px] lg:w-[72px]">
              <Image
                src="/pridewalls-logo-mark.png"
                alt="PRIDEWALLS logo"
                width={64}
                height={64}
                priority
                className="h-12 w-12 object-contain lg:h-14 lg:w-14"
              />
            </span>
            <div className="min-w-0">
              <div className="text-xl font-extrabold tracking-[0.14em] text-primary sm:text-2xl">
                {companyInfo.name}
              </div>
              <div className="hidden text-xs font-medium text-muted-foreground sm:block">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex gap-10">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <Link href={item.href} className="flex items-center gap-1 text-sm font-medium">
                    {item.name}
                    <ChevronDown size={14} />
                  </Link>

                  <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                    <div className="min-w-[220px] overflow-hidden rounded-xl border border-border bg-white shadow-card">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 text-sm transition-colors hover:bg-accent hover:text-primary"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.name} href={item.href} className="text-sm font-medium">
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Button asChild>
              <Link href="/#contact">Enquire Now</Link>
            </Button>
          </div>

          {/* MOBILE */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open Menu">
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

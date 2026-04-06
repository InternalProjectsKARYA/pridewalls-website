'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Mail, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { companyInfo } from '@/lib/project-data';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Projects',
    href: '/#projects',
    children: [
      { name: 'All Projects', href: '/#projects' },
      { name: 'Plots', href: '/?type=plots#projects' },
      { name: 'Apartments', href: '/?type=apartments#projects' },
      { name: 'Villas', href: '/?type=villas#projects' },
    ],
  },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="hidden border-b border-[#2a1c18] bg-[#17100f] text-white lg:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm text-white/70">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${companyInfo.contact.phone[0]}`}
              className="inline-flex items-center gap-2 transition hover:text-[#d8b37a]"
            >
              <Phone size={14} />
              {companyInfo.contact.phone[0]}
            </a>
            <a
              href={`mailto:${companyInfo.contact.email[0]}`}
              className="inline-flex items-center gap-2 transition hover:text-[#d8b37a]"
            >
              <Mail size={14} />
              {companyInfo.contact.email[0]}
            </a>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8b37a]">
            {companyInfo.contact.officeHours}
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[#dacdbf]/70 bg-[#fbf7f1]/88 backdrop-blur-xl shadow-[0_14px_40px_rgba(59,37,28,0.08)]'
            : 'bg-[#fbf7f1]/96'
        }`}
      >
        <nav className="container mx-auto flex h-[4.5rem] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dbcbb8] bg-white/80 shadow-sm">
              <Image
                src="/pridewalls-logo.png"
                alt="Pridewalls"
                width={42}
                height={42}
                priority
              />
            </div>
            <div>
              <div className="font-display text-2xl text-foreground">Pridewalls</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c45]">
                Hyderabad Real Estate
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#45362f] transition hover:text-[#7a2430]"
                  >
                    {item.name}
                    <ChevronDown size={14} />
                  </Link>

                  <div className="pointer-events-none absolute left-0 top-full pt-4 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="w-56 rounded-[1.5rem] border border-[#ddcfbf] bg-[#fffdf8] p-3 shadow-[0_24px_48px_rgba(59,37,28,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-[#5b4b42] transition hover:bg-[#f4ece2] hover:text-[#7a2430]"
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
                  className="text-sm font-semibold text-[#45362f] transition hover:text-[#7a2430]"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-[#7a2430] px-6 text-white hover:bg-[#69202a]"
            >
              <Link href="/#contact">Enquire Now</Link>
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="rounded-full"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[86vw] border-l border-[#ddcfbf] bg-[#fbf7f1] p-6"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/pridewalls-logo.png"
                  alt="Pridewalls"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-display text-2xl text-foreground">Pridewalls</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c45]">
                    Hyderabad Real Estate
                  </div>
                </div>
              </div>

              <ul className="mt-10 space-y-5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <div className="space-y-3">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-semibold text-[#45362f]"
                      >
                        {item.name}
                      </Link>

                      {item.children ? (
                        <div className="space-y-2 border-l border-[#d9cdc0] pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-sm text-muted-foreground transition hover:text-[#7a2430]"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-[1.5rem] border border-[#ddcfbf] bg-white/80 p-5">
                <a
                  href={`tel:${companyInfo.contact.phone[0]}`}
                  className="block text-sm font-semibold text-[#45362f]"
                >
                  {companyInfo.contact.phone[0]}
                </a>
                <a
                  href={`mailto:${companyInfo.contact.email[0]}`}
                  className="mt-2 block text-sm text-muted-foreground"
                >
                  {companyInfo.contact.email[0]}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}

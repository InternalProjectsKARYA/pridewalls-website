// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { Menu, Phone, Mail, ChevronDown, ArrowUpRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { companyInfo } from '@/lib/project-data';
// import Image from 'next/image';

// const navigation = [
//   { name: 'Home', href: '/' },
//   {
//     name: 'Projects',
//     href: '/projects',
//     children: [
//       { name: 'New Launch Projects', href: '/projects?status=ongoing' },
//       { name: 'Upcoming Projects', href: '/projects?status=upcoming' },
//       { name: 'Ready to Move Projects', href: '/projects?status=completed' },
//     ],
//   },
//   { name: 'About', href: '/#about' },
//   { name: 'Contact', href: '/#contact' },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
//   const desktopNavRef = useRef<HTMLDivElement>(null);

//   const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
//     if (pathname === '/') {
//       event.preventDefault();
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleDesktopSubmenuNavigation = (
//     event: React.MouseEvent<HTMLAnchorElement>,
//     href: string
//   ) => {
//     event.preventDefault();
//     setOpenDesktopDropdown(null);
//     router.push(href);
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     handleScroll();
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setOpenDesktopDropdown(null);
//   }, [pathname, searchParams]);

//   useEffect(() => {
//     const handlePointerDown = (event: MouseEvent) => {
//       if (!desktopNavRef.current?.contains(event.target as Node)) {
//         setOpenDesktopDropdown(null);
//       }
//     };

//     document.addEventListener('mousedown', handlePointerDown);
//     return () => document.removeEventListener('mousedown', handlePointerDown);
//   }, []);

//   const isTopImagePage = pathname === '/' || pathname.startsWith('/projects');
//   const showTopBar = !isScrolled;
//   const isOverlayHeader = isTopImagePage && !isScrolled;

//   const headerClassName = isScrolled
//     ? 'border-b border-border/80 bg-white/92 shadow-[0_10px_30px_rgba(13,38,89,0.08)] backdrop-blur-xl'
//     : 'border-b border-transparent bg-transparent shadow-none';

//   const topBarClassName = 'bg-primary text-white';

//   const linkTextClass = isScrolled
//     ? 'relative text-primary font-semibold hover:text-primary after:absolute after:left-4 after:right-4 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand-gold after:opacity-0 after:transition-all after:duration-300 after:content-[\'\'] hover:after:opacity-100 hover:after:left-3 hover:after:right-3'
//     : 'relative text-white font-semibold hover:text-white after:absolute after:left-4 after:right-4 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand-gold after:opacity-0 after:transition-all after:duration-300 after:content-[\'\'] hover:after:opacity-100 hover:after:left-3 hover:after:right-3';

//   const navContainerClass = isScrolled
//     ? 'hidden items-center rounded-full border border-border/80 bg-muted/45 p-1 shadow-inner lg:flex'
//     : 'hidden items-center gap-3 lg:flex';

//   const logoTextClass = isScrolled ? 'text-primary' : 'text-white';
//   const logoTaglineClass = isScrolled ? 'text-primary/70' : 'text-white/80';
//   const ctaButtonClass =
//     'h-11 rounded-xl bg-primary px-5 font-bold text-white shadow-[0_10px_24px_rgba(13,38,89,0.18)] transition-colors hover:bg-brand-primary-dark';

//   return (
//     <>
//       {/* TOP BAR */}
//       {showTopBar && (
//         <div className={`fixed inset-x-0 top-0 z-50 hidden lg:block ${topBarClassName}`}>
//           <div className="container mx-auto px-4 flex justify-between py-2 text-sm">
//             <div className="flex gap-6">
//               <a href={`tel:${companyInfo.contact.phone[0]}`} className="flex gap-2 items-center">
//                 <Phone size={14} /> {companyInfo.contact.phone[0]}
//               </a>
//               <a href={`mailto:${companyInfo.contact.email[0]}`} className="flex gap-2 items-center">
//                 <Mail size={14} /> {companyInfo.contact.email[0]}
//               </a>
//             </div>
//             <span>{companyInfo.contact.officeHours}</span>
//           </div>
//         </div>
//       )}

//       {/* MAIN NAV */}
//       <header
//         className={`z-50 transition-all duration-300 ${
//           isOverlayHeader ? 'fixed inset-x-0 top-0 lg:top-9' : 'fixed inset-x-0 top-0'
//         } ${headerClassName}`}
//       >
//         <nav className="section-shell flex h-18 items-center justify-between lg:h-20">

//           {/* LOGO */}
//           <Link href="/" onClick={handleLogoClick} className="group flex items-center gap-3" aria-label="PRIDEWALLS home">
//             <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-white shadow-[0_8px_22px_rgba(13,38,89,0.10)] transition-transform duration-300 group-hover:-translate-y-0.5 lg:h-16 lg:w-16">
//               <Image
//                 src="/pridewalls-logo-mark.png"
//                 alt="PRIDEWALLS logo"
//                 width={64}
//                 height={64}
//                 priority
//                 className="h-11 w-11 object-contain lg:h-12 lg:w-12"
//               />
//             </span>
//             <div className="min-w-0">
//               <div className={`text-lg font-extrabold tracking-[0.18em] ${logoTextClass} sm:text-xl`}>
//                 {companyInfo.name}
//               </div>
//               <div className={`hidden text-[11px] font-semibold ${logoTaglineClass} sm:block`}>{companyInfo.tagline}</div>
//             </div>
//           </Link>

//           {/* DESKTOP */}
//           <div ref={desktopNavRef} className={navContainerClass}>
//             {navigation.map((item) =>
//               item.children ? (
//                 <div key={item.name} className="relative">
//                   <button
//                     type="button"
//                     className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:shadow-sm ${linkTextClass}`}
//                     aria-haspopup="true"
//                     aria-expanded={openDesktopDropdown === item.name}
//                     onClick={() => {
//                       setOpenDesktopDropdown((current) => (current === item.name ? null : item.name));
//                     }}
//                   >
//                     {item.name}
//                     <ChevronDown
//                       size={14}
//                       className={`transition-transform duration-200 ${
//                         openDesktopDropdown === item.name ? 'rotate-180' : ''
//                       }`}
//                     />
//                   </button>

//                   {openDesktopDropdown === item.name && (
//                     <div className="absolute left-0 top-full pt-3">
//                       <div className="min-w-[230px] overflow-hidden rounded-xl border border-border/80 bg-white p-1 shadow-[0_18px_45px_rgba(13,38,89,0.14)]">
//                         {item.children.map((child) => (
//                           <Link
//                             key={child.name}
//                             href={child.href}
//                             onClick={(event) => handleDesktopSubmenuNavigation(event, child.href)}
//                             className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
//                           >
//                             {child.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:shadow-sm ${linkTextClass}`}
//                 >
//                   {item.name}
//                 </Link>
//               )
//             )}
//           </div>

//           {/* CTA */}
//           <div className="hidden lg:flex">
//             <Button asChild className={ctaButtonClass}>
//               <Link href="/#contact">
//                 Talk to a Property Advisor
//                 <ArrowUpRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           {/* MOBILE */}
//           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
//             <SheetTrigger asChild className="lg:hidden">
//               <Button variant="outline" size="icon" aria-label="Open Menu" className="rounded-xl">
//                 <Menu />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="right" className="p-6">
//               <ul className="space-y-4">
//                 {navigation.map((item) => (
//                   <li key={item.name}>
//                     <div className="space-y-3">
//                       <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="font-medium">
//                         {item.name}
//                       </Link>

//                       {item.children && (
//                         <div className="space-y-2 border-l border-border pl-4">
//                           {item.children.map((child) => (
//                             <Link
//                               key={child.name}
//                               href={child.href}
//                               onClick={() => setIsMobileMenuOpen(false)}
//                               className="block text-sm text-muted-foreground transition-colors hover:text-primary"
//                             >
//                               {child.name}
//                             </Link>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </SheetContent>
//           </Sheet>

//         </nav>
//       </header>
//     </>
//   );
// }


'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  Menu,
  Phone,
  Mail,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { companyInfo } from '@/lib/project-data';
import Image from 'next/image';
import { useNotFound } from '@/context/NotFoundContext';

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */

const navigation = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Projects',
    href: '/projects',
    children: [
      {
        name: 'All Projects',
        href: '/projects',
      },
      {
        name: 'Apartments',
        href: '/projects?type=Apartments',
      },
      {
        name: 'Villas',
        href: '/projects?type=Villas',
      },
      {
        name: 'Open Plots',
        href: '/projects?type=Open%20Plots',
      },
    
    ],
  },
  {
    name: 'About',
    href: '/#about',
  },

  {
    name: 'Contact',
    href: '/#contact',
  },
];

/* ================================================================== */
/* Navbar Content                                                     */
/* ================================================================== */

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isNotFound } = useNotFound();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [openDesktopDropdown, setOpenDesktopDropdown] =
    useState<string | null>(null);

  const desktopNavRef =
    useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------------- */
  /* Logo click                                                       */
  /* ---------------------------------------------------------------- */

  const handleLogoClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname === '/') {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  /* ---------------------------------------------------------------- */
  /* Desktop submenu navigation                                      */
  /* ---------------------------------------------------------------- */

  const handleDesktopSubmenuNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    setOpenDesktopDropdown(null);

    router.push(href);
  };

  /* ---------------------------------------------------------------- */
  /* Scroll listener                                                  */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Close dropdown when route/query changes                         */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    setOpenDesktopDropdown(null);
  }, [pathname, searchParams]);

  /* ---------------------------------------------------------------- */
  /* Close dropdown when clicking outside                             */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const handlePointerDown = (
      event: MouseEvent
    ) => {
      if (
        !desktopNavRef.current?.contains(
          event.target as Node
        )
      ) {
        setOpenDesktopDropdown(null);
      }
    };

    document.addEventListener(
      'mousedown',
      handlePointerDown
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handlePointerDown
      );
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Header state                                                     */
  /* ---------------------------------------------------------------- */

  const isTopImagePage =
    pathname === '/' ||
    pathname.startsWith('/projects') ||
    isNotFound;

  const showTopBar = isTopImagePage && !isScrolled;

  const isOverlayHeader =
    isTopImagePage && !isScrolled;

  /* ---------------------------------------------------------------- */
  /* Header classes                                                   */
  /* ---------------------------------------------------------------- */

  const headerClassName = isScrolled
    ? 'border-b border-border/80 bg-white/92 shadow-[0_10px_30px_rgba(13,38,89,0.08)] backdrop-blur-xl'
    : 'border-b border-transparent bg-transparent shadow-none';

  const topBarClassName =
    'bg-primary text-white';

  /* ---------------------------------------------------------------- */
  /* Navigation text classes                                         */
  /* ---------------------------------------------------------------- */

  const linkTextClass = isScrolled
    ? `
        relative
        text-primary
        font-semibold
        hover:text-primary
        after:absolute
        after:left-4
        after:right-4
        after:bottom-1
        after:h-0.5
        after:rounded-full
        after:bg-brand-gold
        after:opacity-0
        after:transition-all
        after:duration-300
        after:content-['']
        hover:after:opacity-100
        hover:after:left-3
        hover:after:right-3
      `
    : `
        relative
        text-white
        font-semibold
        hover:text-white
        after:absolute
        after:left-4
        after:right-4
        after:bottom-1
        after:h-0.5
        after:rounded-full
        after:bg-brand-gold
        after:opacity-0
        after:transition-all
        after:duration-300
        after:content-['']
        hover:after:opacity-100
        hover:after:left-3
        hover:after:right-3
      `;

  /* ---------------------------------------------------------------- */
  /* Navigation container                                            */
  /* ---------------------------------------------------------------- */

  const navContainerClass = isScrolled
    ? `
        hidden
        items-center
        rounded-full
        border
        border-border/80
        bg-muted/45
        p-1
        shadow-inner
        lg:flex
      `
    : `
        hidden
        items-center
        gap-3
        lg:flex
      `;

  /* ---------------------------------------------------------------- */
  /* Logo classes                                                     */
  /* ---------------------------------------------------------------- */

  const logoTextClass = isScrolled
    ? 'text-primary'
    : 'text-white';

  const logoTaglineClass = isScrolled
    ? 'text-primary/70'
    : 'text-white/80';

  /* ---------------------------------------------------------------- */
  /* CTA button                                                       */
  /* ---------------------------------------------------------------- */

  const ctaButtonClass = `
    h-11
    rounded-xl
    bg-primary
    px-5
    font-bold
    text-white
    shadow-[0_10px_24px_rgba(13,38,89,0.18)]
    transition-colors
    hover:bg-brand-primary-dark
    hover:text-white
  `;

  /* ================================================================= */
  /* Render                                                            */
  /* ================================================================= */

  return (
    <>
      {/* ============================================================ */}
      {/* TOP BAR                                                       */}
      {/* ============================================================ */}

      {showTopBar && (
        <div
          className={`
            fixed
            inset-x-0
            top-0
            z-50
            hidden
            lg:block
            ${topBarClassName}
          `}
        >
          <div
            className="
              container
              mx-auto
              flex
              justify-between
              px-4
              py-2
              text-sm
            "
          >
            {/* Contact Details */}

            <div className="flex gap-6">
              <a
                href={`tel:${companyInfo.contact.phone[0]}`}
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Phone size={14} />

                {companyInfo.contact.phone[0]}
              </a>

              <a
                href={`mailto:${companyInfo.contact.email[0]}`}
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Mail size={14} />

                {companyInfo.contact.email[0]}
              </a>
            </div>

            {/* Office Hours */}

            <span>
              {companyInfo.contact.officeHours}
            </span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MAIN NAVIGATION                                               */}
      {/* ============================================================ */}

      <header
        className={`
          z-50
          transition-all
          duration-300
          ${
            isOverlayHeader
              ? 'fixed inset-x-0 top-0 lg:top-9'
              : 'fixed inset-x-0 top-0'
          }
          ${headerClassName}
        `}
      >
        <nav
          className="
            section-shell
            flex
            h-18
            items-center
            justify-between
            lg:h-20
          "
        >
          {/* ====================================================== */}
          {/* LOGO                                                     */}
          {/* ====================================================== */}

          <Link
            href="/"
            onClick={handleLogoClick}
            className="
              group
              flex
              items-center
              gap-3
            "
            aria-label="PRIDEWALLS home"
          >
            <span
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-border/80
                bg-white
                shadow-[0_8px_22px_rgba(13,38,89,0.10)]
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                lg:h-16
                lg:w-16
              "
            >
              <Image
                src="/pridewalls-logo-mark.png"
                alt="PRIDEWALLS logo"
                width={64}
                height={64}
                priority
                className="
                  h-11
                  w-11
                  object-contain
                  lg:h-12
                  lg:w-12
                "
              />
            </span>

            <div className="min-w-0">
              <div
                className={`
                  text-lg
                  font-extrabold
                  tracking-[0.18em]
                  sm:text-xl
                  ${logoTextClass}
                `}
              >
                {companyInfo.name}
              </div>

              <div
                className={`
                  hidden
                  text-[11px]
                  font-semibold
                  sm:block
                  ${logoTaglineClass}
                `}
              >
                {companyInfo.tagline}
              </div>
            </div>
          </Link>

          {/* ====================================================== */}
          {/* DESKTOP NAVIGATION                                       */}
          {/* ====================================================== */}

          <div
            ref={desktopNavRef}
            className={navContainerClass}
          >
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                >
                  {/* Dropdown trigger */}

                  <button
                    type="button"
                    className={`
                      flex
                      items-center
                      gap-1
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      transition-colors
                      hover:shadow-sm
                      ${linkTextClass}
                    `}
                    aria-haspopup="true"
                    aria-expanded={
                      openDesktopDropdown ===
                      item.name
                    }
                    onClick={() => {
                      setOpenDesktopDropdown(
                        (current) =>
                          current === item.name
                            ? null
                            : item.name
                      );
                    }}
                  >
                    {item.name}

                    <ChevronDown
                      size={14}
                      className={`
                        transition-transform
                        duration-200
                        ${
                          openDesktopDropdown ===
                          item.name
                            ? 'rotate-180'
                            : ''
                        }
                      `}
                    />
                  </button>

                  {/* Dropdown */}

                  {openDesktopDropdown ===
                    item.name && (
                    <div
                      className="
                        absolute
                        left-0
                        top-full
                        pt-3
                      "
                    >
                      <div
                        className="
                          min-w-[230px]
                          overflow-hidden
                          rounded-xl
                          border
                          border-border/80
                          bg-white
                          p-1
                          shadow-[0_18px_45px_rgba(13,38,89,0.14)]
                        "
                      >
                        {item.children.map(
                          (child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={(event) =>
                                handleDesktopSubmenuNavigation(
                                  event,
                                  child.href
                                )
                              }
                              className="
                                block
                                rounded-lg
                                px-4
                                py-3
                                text-sm
                                font-medium
                                text-muted-foreground
                                transition-colors
                                hover:bg-accent
                                hover:text-primary
                              "
                            >
                              {child.name}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition-colors
                    hover:shadow-sm
                    ${linkTextClass}
                  `}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* ====================================================== */}
          {/* DESKTOP CTA                                              */}
          {/* ====================================================== */}

          <div className="hidden lg:flex">
            <Button
              asChild
              className={ctaButtonClass}
            >
              <Link href="/#contact">
                Talk to a Property Advisor

                <ArrowUpRight
                  className="
                    ml-2
                    h-4
                    w-4
                  "
                />
              </Link>
            </Button>
          </div>

          {/* ====================================================== */}
          {/* MOBILE MENU                                              */}
          {/* ====================================================== */}

          <Sheet
            open={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
          >
            <SheetTrigger
              asChild
              className="lg:hidden"
            >
              <Button
                variant="outline"
                size="icon"
                aria-label="Open Menu"
                className="rounded-xl"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="p-6"
            >
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <div className="space-y-3">
                      {/* Main mobile link */}

                      <Link
                        href={item.href}
                        onClick={() =>
                          setIsMobileMenuOpen(false)
                        }
                        className="font-medium"
                      >
                        {item.name}
                      </Link>

                      {/* Mobile submenu */}

                      {item.children && (
                        <div
                          className="
                            space-y-2
                            border-l
                            border-border
                            pl-4
                          "
                        >
                          {item.children.map(
                            (child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() =>
                                  setIsMobileMenuOpen(
                                    false
                                  )
                                }
                                className="
                                  block
                                  text-sm
                                  text-muted-foreground
                                  transition-colors
                                  hover:text-primary
                                "
                              >
                                {child.name}
                              </Link>
                            )
                          )}
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

/* ================================================================== */
/* Navbar Wrapper                                                     */
/* ================================================================== */

export default function Navbar() {
  return (
    <Suspense
      fallback={null}
    >
      <NavbarContent />
    </Suspense>
  );
}
"use client";

import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    const url = pathname + searchParams.toString();
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </>
  );
}


// "use client";

// import { GoogleTagManager } from "@next/third-parties/google";

// export default function Analytics() {
//   const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

//   // Don't render GTM if the environment variable is missing.
//   if (!gtmId) {
//     if (process.env.NODE_ENV === "development") {
//       console.warn("NEXT_PUBLIC_GTM_ID is not configured.");
//     }

//     return null;
//   }

//   return <GoogleTagManager gtmId={gtmId} />;
// }


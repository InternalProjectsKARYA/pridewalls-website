"use client";

import Link from "next/link";
import { useNotFound } from "@/context/NotFoundContext";
import { useEffect } from "react";

export default function NotFound() {
  const { setIsNotFound } = useNotFound();

  useEffect(() => {
    setIsNotFound(true);
    return () => setIsNotFound(false);
  }, [setIsNotFound]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-slate-50 to-slate-50 pt-28 sm:pt-32 lg:pt-36">
      <div className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-xl sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">404</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Page not found</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

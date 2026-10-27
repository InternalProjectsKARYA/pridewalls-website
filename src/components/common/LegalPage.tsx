import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Mail, ShieldCheck } from "lucide-react";
import { companyInfo } from "@/lib/project-data";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  summary: string[];
  sections: LegalSection[];
};

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function LegalPage({ eyebrow, title, updated, intro, summary, sections }: LegalPageProps) {
  const contactEmail = companyInfo.contact.email[0];

  return (
    <article>
      <header className="overflow-hidden rounded-xl bg-primary text-white shadow-[0_18px_45px_rgba(13,38,89,0.16)] sm:rounded-2xl">
        <div className="relative isolate px-5 py-7 sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 -z-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to PRIDEWALLS
          </Link>
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold sm:mt-8 sm:text-xs">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-[2rem] font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{intro}</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-brand-gold" aria-hidden="true" />Last updated {updated}</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-gold" aria-hidden="true" />Plain-language overview</span>
          </div>
        </div>
      </header>

      <div className="mt-5 grid gap-6 sm:mt-6 xl:grid-cols-[minmax(0,1fr)_230px] xl:items-start">
        <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-[0_12px_30px_rgba(13,38,89,0.05)] sm:rounded-2xl sm:p-8 lg:p-10">
          <section aria-labelledby="overview-heading" className="rounded-xl border border-brand-gold/25 bg-brand-gold/8 p-5 sm:p-6">
            <p id="overview-heading" className="text-xs font-bold uppercase tracking-[0.16em] text-primary">At a glance</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2" role="list">
              {summary.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-6 text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <details className="mt-5 rounded-xl border border-border bg-muted/40 px-4 py-3 xl:hidden">
            <summary className="cursor-pointer text-sm font-bold text-primary marker:text-brand-gold">Browse this policy</summary>
            <ol className="mt-3 grid gap-1 border-t border-border pt-3 sm:grid-cols-2">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#${sectionId(section.title)}`} className="flex gap-2 rounded-md px-2 py-2 text-sm leading-5 text-muted-foreground transition hover:bg-white hover:text-primary">
                    <span className="text-xs font-bold text-brand-gold">{String(index + 1).padStart(2, "0")}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <section className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
            {sections.map((section, index) => {
              const id = sectionId(section.title);
              return (
                <section key={section.title} id={id} className="scroll-mt-32" aria-labelledby={`${id}-heading`}>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary-light text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <div className="min-w-0 flex-1">
                      <h2 id={`${id}-heading`} className="text-lg font-bold tracking-tight text-primary sm:text-2xl">{section.title}</h2>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                      {section.bullets && (
                        <ul className="mt-4 space-y-2.5" role="list">
                          {section.bullets.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-foreground/80 sm:text-base">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.note && <p className="mt-5 rounded-lg border-l-4 border-brand-gold bg-muted/60 px-4 py-3 text-sm leading-6 text-foreground/75">{section.note}</p>}
                    </div>
                  </div>
                </section>
              );
            })}
          </section>

          <section className="mt-10 rounded-xl bg-primary p-5 text-white sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div>
              <h2 className="text-lg font-bold">Questions about this policy?</h2>
              <p className="mt-1 text-sm leading-6 text-white/70">Our team can help with a privacy request or direct you to the right person.</p>
            </div>
            <a href={`mailto:${contactEmail}`} className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-primary transition hover:bg-brand-primary-light sm:mt-0 sm:w-auto">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact us
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </section>
        </div>

        <aside className="hidden xl:sticky xl:top-28 xl:block" aria-label="On this page">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_rgba(13,38,89,0.05)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
            <ol className="mt-4 space-y-1">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#${sectionId(section.title)}`} className="group flex gap-2 rounded-lg px-2 py-2 text-sm leading-5 text-muted-foreground transition hover:bg-brand-primary-light/60 hover:text-primary">
                    <span className="text-xs font-bold text-brand-gold">{String(index + 1).padStart(2, "0")}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </article>
  );
}

import Link from 'next/link';

type LegalSection = {
  title: string;
  body: string;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="bg-muted/30 py-12 sm:py-16">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm font-semibold text-primary hover:text-brand-primary-dark"
          >
            Back to home
          </Link>

          <section className="premium-card overflow-hidden">
            <div className="border-b border-border bg-white p-6 sm:p-8">
              <span className="eyebrow mb-4">{eyebrow}</span>
              <h1 className="text-3xl font-bold text-primary sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Last updated: {updated}
              </p>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                {intro}
              </p>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-bold text-foreground">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

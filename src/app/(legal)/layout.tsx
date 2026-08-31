import LegalNavigation from "@/components/common/LegalNavigation";

export default function LegalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f9fd_0%,#ffffff_38rem)] py-6 sm:py-10 lg:py-16">
      <div className="section-shell">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
            <LegalNavigation />
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

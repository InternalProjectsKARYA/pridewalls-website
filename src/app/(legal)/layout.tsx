import LegalNavigation from "@/components/common/LegalNavigation";

export default function LegalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f9fd_0%,#ffffff_38rem)] pb-6 pt-28 sm:pb-10 sm:pt-32 lg:pb-16 lg:pt-36">
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

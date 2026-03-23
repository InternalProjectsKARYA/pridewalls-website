"use client";

import { useState } from "react";
import Footer from "@/components/landingpage/Footer";
import { Eye, EyeOff, Download, RefreshCw, Lock } from "lucide-react";

type LeadRecord = {
  id: number | string | null;
  name: string;
  email: string;
  mobile: string;
  interestedIn: string;
  message: string;
  preferredContact?: string;
  consent: boolean;
  submittedAt: string;
};

type ViewLeadsResponse = {
  message?: string;
  leads?: LeadRecord[];
  totalCount?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
};

const PAGE_SIZE = 15;

function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

function escapeCsvCell(value: string | boolean | null | undefined) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCsv(leads: LeadRecord[]) {
  const headers = [
    "ID", "Name", "Email", "Mobile", "Interested In",
    "Preferred Contact", "Message", "Consent", "Submitted At",
  ];
  const rows = leads.map((l) =>
    [
      l.id ?? "",
      l.name,
      l.email,
      l.mobile,
      l.interestedIn,
      l.preferredContact ?? "",
      l.message,
      l.consent ? "Yes" : "No",
      l.submittedAt,
    ].map(escapeCsvCell).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsPage() {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadLeads = async (pwd: string, page = 1) => {
    const response = await fetch("/api/leads/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, page, pageSize: PAGE_SIZE }),
    });
    const result = (await response.json()) as ViewLeadsResponse;
    if (!response.ok) throw new Error(result.message || "Unable to load leads.");
    return {
      leads: result.leads ?? [],
      totalCount: result.totalCount ?? 0,
      totalPages: result.totalPages ?? 1,
      currentPage: result.currentPage ?? 1,
    };
  };

  const handleUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!password.trim()) { setErrorMessage("Please enter the password."); return; }
    setIsLoading(true);
    try {
      const result = await loadLeads(password.trim(), 1);
      setVerifiedPassword(password.trim());
      setLeads(result.leads);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setPassword("");
      setSuccessMessage("Access granted. Leads loaded.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load leads.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!verifiedPassword) return;
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const result = await loadLeads(verifiedPassword, currentPage);
      setLeads(result.leads);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setSuccessMessage("Leads refreshed.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLock = () => {
    setVerifiedPassword(null);
    setLeads([]);
    setCurrentPage(1);
    setTotalCount(0);
    setTotalPages(1);
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
  };

  const handlePageChange = async (page: number) => {
    if (!verifiedPassword || page === currentPage || page < 1 || page > totalPages) return;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = await loadLeads(verifiedPassword, page);
      setLeads(result.leads);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to change page.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="border-b border-white/10 bg-[#05070d] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/80">Protected Page</p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Leads</h1>
          </div>
          {verifiedPassword && (
            <a href="/site-visits" className="text-sm text-blue-300 hover:underline">
              → View Site Visits
            </a>
          )}
        </div>
      </header>

      <main className="min-h-screen bg-[#05070d] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {!verifiedPassword ? (
            /* ── Login form ── */
            <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,30,0.96),rgba(5,8,18,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
              <div className="mb-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/80">Protected Page</p>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">View Leads</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65">Enter the password to access the submitted lead data.</p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-6">
                <label className="space-y-2 block">
                  <span className="text-sm font-medium text-white/85">Password</span>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => { setErrorMessage(""); setPassword(e.target.value); }}
                        autoComplete="current-password"
                        className="w-full rounded-2xl border border-white/12 bg-black/20 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/40"
                        placeholder="Enter access password"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                      >
                        {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-1 relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10">{isLoading ? "Loading..." : "Unlock"}</span>
                    </button>
                  </div>
                </label>

                {errorMessage && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{successMessage}</p>
                )}
              </form>
            </section>
          ) : (
            /* ── Data table ── */
            <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,30,0.96),rgba(5,8,18,0.98))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-7">
              {/* Header row */}
              <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/80">Protected Data</p>
                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Leads</h2>
                  <p className="mt-2 text-sm text-white/60">
                    {totalCount} lead{totalCount === 1 ? "" : "s"} total
                    {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => downloadCsv(leads)}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" /> Download CSV
                  </button>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500/20 disabled:opacity-70"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    {isLoading ? "Refreshing..." : "Refresh"}
                  </button>
                  <button
                    type="button"
                    onClick={handleLock}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Lock className="h-4 w-4" /> Lock
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{successMessage}</p>
              )}

              {totalCount === 0 ? (
                <div className="mt-8 rounded-3xl border border-dashed border-white/12 px-6 py-14 text-center text-white/50">
                  No leads found yet.
                </div>
              ) : (
                <>
                  <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
                    <table className="min-w-full border-collapse text-left text-sm text-white">
                      <thead className="bg-white/5 text-[11px] uppercase tracking-[0.2em] text-white/50">
                        <tr>
                          <th className="px-4 py-3 font-semibold">#</th>
                          <th className="px-4 py-3 font-semibold">Name</th>
                          <th className="px-4 py-3 font-semibold">Email</th>
                          <th className="px-4 py-3 font-semibold">Mobile</th>
                          <th className="px-4 py-3 font-semibold">Interested In</th>
                          <th className="px-4 py-3 font-semibold">Pref. Contact</th>
                          <th className="px-4 py-3 font-semibold">Message</th>
                          <th className="px-4 py-3 font-semibold">Consent</th>
                          <th className="px-4 py-3 font-semibold">Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead, i) => (
                          <tr
                            key={`${lead.id ?? lead.email}-${lead.submittedAt}`}
                            className="border-t border-white/8 align-top text-white/85 hover:bg-white/[0.03] transition"
                          >
                            <td className="px-4 py-3 text-white/40 tabular-nums">
                              {(currentPage - 1) * PAGE_SIZE + i + 1}
                            </td>
                            <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{lead.name}</td>
                            <td className="px-4 py-3 break-all">{lead.email}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{lead.mobile}</td>
                            <td className="px-4 py-3 min-w-36">{lead.interestedIn || "—"}</td>
                            <td className="px-4 py-3 capitalize whitespace-nowrap">
                              {lead.preferredContact || "—"}
                            </td>
                            <td className="px-4 py-3 min-w-[16rem] max-w-sm whitespace-pre-wrap break-words text-white/70">
                              {lead.message || "—"}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                                lead.consent
                                  ? "border border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
                                  : "border border-red-300/20 bg-red-400/10 text-red-200"
                              }`}>
                                {lead.consent ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-white/60">{formatDate(lead.submittedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-white/50">
                      Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, totalCount)}–{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                        className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ← Prev
                      </button>
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        const p = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage + i - 3;
                        if (p < 1 || p > totalPages) return null;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => handlePageChange(p)}
                            disabled={isLoading}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                              p === currentPage
                                ? "bg-blue-500 text-white"
                                : "border border-white/12 bg-white/5 text-white hover:bg-white/10"
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                        className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

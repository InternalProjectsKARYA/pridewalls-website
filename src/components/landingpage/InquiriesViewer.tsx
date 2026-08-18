"use client";

import { useState, useEffect } from "react";
import { 
  Eye, EyeOff, Download, RefreshCw, Lock, Search, X, MessageSquare, 
  Mail, Phone, Grid3x3, List, ChevronRight, TrendingUp, Users, Clock, CheckCircle,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";

type InquiryRecord = {
  id: number | string | null;
  name: string;
  email: string;
  mobile: string;
  inquiryType: string;
  interestedIn: string;
  message: string;
  preferredContact?: string;
  consent: boolean;
  submittedAt: string;
};

type ViewInquiriesResponse = {
  message?: string;
  inquiries?: InquiryRecord[];
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

function formatDateShort(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "short",
  }).format(d);
}

function escapeCsvCell(value: string | boolean | null | undefined) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCsv(inquiries: InquiryRecord[]) {
  const headers = [
    "ID", "Name", "Email", "Mobile", "Type", "Interested In",
    "Preferred Contact", "Message", "Consent", "Submitted At",
  ];
  const rows = inquiries.map((l) =>
    [
      String(l.id ?? ""),
      l.name,
      l.email,
      l.mobile,
      l.inquiryType,
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
  a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function calculateStats(inquiries: InquiryRecord[]) {
  const categories = new Map<string, number>();
  const contactMethods = new Map<string, number>();
  
  inquiries.forEach((inquiry) => {
    categories.set(inquiry.interestedIn, (categories.get(inquiry.interestedIn) || 0) + 1);
    const method = inquiry.preferredContact || "Not specified";
    contactMethods.set(method, (contactMethods.get(method) || 0) + 1);
  });

  return {
    total: inquiries.length,
    withConsent: inquiries.filter((l) => l.consent).length,
    byCategory: Array.from(categories.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    byContactMethod: Array.from(contactMethods.entries())
      .map(([method, count]) => ({ method, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export default function InquiriesViewer() {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [filterBy, setFilterBy] = useState<"all" | "email" | "phone" | "message">("all");
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<"ALL" | "LEAD" | "SITE_VISIT">("ALL");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadInquiries = async (pwd: string, page = 1, type = "ALL") => {
    const response = await fetch("/api/inquiries/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, page, pageSize: PAGE_SIZE, type }),
    });
    const result = (await response.json()) as ViewInquiriesResponse;
    if (!response.ok) throw new Error(result.message || "Unable to load inquiries.");
    return {
      inquiries: result.inquiries ?? [],
      totalCount: result.totalCount ?? 0,
      totalPages: result.totalPages ?? 1,
      currentPage: result.currentPage ?? 1,
    };
  };

  const handleUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!password.trim()) {
      setErrorMessage("Please enter the password.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await loadInquiries(password.trim(), 1, inquiryTypeFilter);
      setVerifiedPassword(password.trim());
      setInquiries(result.inquiries);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setPassword("");
      setSuccessMessage("Access granted. Enquiries loaded.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load enquiries.");
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
      const result = await loadInquiries(verifiedPassword, currentPage, inquiryTypeFilter);
      setInquiries(result.inquiries);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setSuccessMessage("Enquiries refreshed.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLock = () => {
    setVerifiedPassword(null);
    setInquiries([]);
    setCurrentPage(1);
    setTotalCount(0);
    setTotalPages(1);

    setInquiryTypeFilter("ALL");
    setFilterBy("all");
    setViewMode("table");

    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
    setSearchTerm("");
    setSelectedInquiry(null);
  };

  const handlePageChange = async (page: number) => {
    if (!verifiedPassword || page === currentPage || page < 1 || page > totalPages) return;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = await loadInquiries(verifiedPassword, page, inquiryTypeFilter);
      setInquiries(result.inquiries);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to change page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInquiryTypeFilterChange = async (
    type: "ALL" | "LEAD" | "SITE_VISIT"
  ) => {
    if (type === inquiryTypeFilter && inquiries.length > 0) {
      return;
    }

    setInquiryTypeFilter(type);
    setSearchTerm("");
    setSelectedInquiry(null);

    // If not unlocked, only change the selected tab.
    // Data will be loaded when the user unlocks.
    if (!verifiedPassword) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await loadInquiries(
        verifiedPassword,
        1,
        type
      );

      setInquiries(result.inquiries);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);

      if (type === "ALL") {
        setSuccessMessage("All enquiries loaded.");
      } else if (type === "LEAD") {
        setSuccessMessage("Enquiries loaded.");
      } else {
        setSuccessMessage("Site visits loaded.");
      }
    } catch (error) {
      setInquiries([]);
      setCurrentPage(1);
      setTotalCount(0);
      setTotalPages(1);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to filter inquiries."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 7;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      let startPage = Math.max(1, currentPage - 3);
      let endPage = Math.min(totalPages, currentPage + 3);

      if (currentPage - 3 < 1) endPage = maxButtons;
      if (currentPage + 3 > totalPages) startPage = totalPages - maxButtons + 1;

      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const query = searchTerm.toLowerCase();
    if (filterBy === "all") {
      return (
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.email.toLowerCase().includes(query) ||
        inquiry.mobile.includes(query) ||
        inquiry.interestedIn.toLowerCase().includes(query)
      );
    } else if (filterBy === "email") {
      return inquiry.email.toLowerCase().includes(query);
    } else if (filterBy === "phone") {
      return inquiry.mobile.includes(query);
    } else if (filterBy === "message") {
      return inquiry.message.toLowerCase().includes(query);
    }
    return true;
  });

  const stats = calculateStats(inquiries);

  if (!verifiedPassword) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/10 via-white to-brand-gold/5 pt-28 sm:pt-32 lg:pt-36 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-brand-gold mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">View Enquiries</h2>
              <p className="mt-3 text-sm text-slate-500">
                Enter password to access your enquiry data securely
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setErrorMessage("");
                      setPassword(e.target.value);
                    }}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30"
                    placeholder="Enter access password"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                  >
                    {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-linear-to-r from-primary to-primary/90 text-white font-semibold rounded-xl transition hover:shadow-lg hover:shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? "Unlocking..." : "Unlock"}
                {!isLoading && <ChevronRight className="h-4 w-4" />}
              </button>

              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                    <X className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}
              {successMessage && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>{successMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Enquiries</h1>
              <p className="mt-2 text-slate-600">
                Manage and view all submitted Enquiries and site visit requests
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => downloadCsv(filteredInquiries.length > 0 ? filteredInquiries : inquiries)}
                disabled={inquiries.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Download CSV
              </button>
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-gold/90 disabled:opacity-70"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLock}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Lock className="h-4 w-4" />
                Lock
              </button>
            </div>
          </div>

          {/* Type Filter Tabs */}
          <div className="mb-8 flex gap-2">
            <button
              type="button"
              onClick={() => handleInquiryTypeFilterChange("ALL")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                inquiryTypeFilter === "ALL"
                  ? "bg-primary text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleInquiryTypeFilterChange("LEAD")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                inquiryTypeFilter === "LEAD"
                  ? "bg-primary text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Enquiries
            </button>
            <button
              type="button"
              onClick={() => handleInquiryTypeFilterChange("SITE_VISIT")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                inquiryTypeFilter === "SITE_VISIT"
                  ? "bg-primary text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Site Visits
            </button>
          </div>


          {/* Stats Cards */}
          {verifiedPassword && (
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Enquiries</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">With Consent</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{stats.withConsent}</p>
                  </div>
                  <div className="rounded-lg bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Top Interest</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {stats.byCategory[0]?.name || "—"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {stats.byCategory[0]?.count} enquiries
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-100 p-3">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Preferred Contact</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {stats.byContactMethod[0]?.method || "—"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {stats.byContactMethod[0]?.count} enquiries
                    </p>
                  </div>
                  <div className="rounded-lg bg-orange-100 p-3">
                    <MessageSquare className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and View Toggle */}
          {inquiries.length > 0 && (
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white border border-slate-200 p-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Fields</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="message">Message</option>
                </select>

                <div className="flex gap-1 rounded-lg border border-slate-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("table")}
                    className={`rounded p-2 transition ${
                      viewMode === "table"
                        ? "bg-primary text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="Table view"
                  >
                    <List className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("card")}
                    className={`rounded p-2 transition ${
                      viewMode === "card"
                        ? "bg-primary text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="Card view"
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
              <X className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-start gap-2">
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{successMessage}</p>
            </div>
          )}

          {/* Empty State */}
          {totalCount === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />

              <p className="text-slate-500 font-medium">
                {inquiryTypeFilter === "SITE_VISIT"
                  ? "No site visits found yet."
                  : inquiryTypeFilter === "LEAD"
                  ? "No enquiries found yet."
                  : "No records found yet."}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                {inquiryTypeFilter === "SITE_VISIT"
                  ? "Site visit requests will appear here when submitted."
                  : inquiryTypeFilter === "LEAD"
                  ? "Enquiries will appear here when submitted."
                  : "Enquiries and site visits will appear here when submitted."}
              </p>
            </div>
          ) : filteredInquiries.length === 0 && searchTerm ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No enquiries match your search.</p>
              <p className="text-sm text-slate-400 mt-1">Try adjusting your search terms.</p>
            </div>
          ) : viewMode === "table" ? (
            <>
              {/* Table View */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Phone</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Interested In</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Contact Method</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Consent</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Submitted</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredInquiries.map((inquiry) => (
                        <tr
                          key={`${inquiry.id ?? inquiry.email}-${inquiry.submittedAt}`}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-6 py-4">
                            <span className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                              inquiry.inquiryType === 'LEAD'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {inquiry.inquiryType === 'LEAD' ? 'Enquiry' : 'Site Visit'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{inquiry.name}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{inquiry.email}</td>
                          <td className="px-6 py-4 text-slate-600">{inquiry.mobile}</td>
                          <td className="px-6 py-4">
                            <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              {inquiry.interestedIn || "—"}
                            </span>
                          </td>
                          <td className="px-6 py-4 capitalize text-slate-600">
                            {inquiry.preferredContact || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                                inquiry.consent
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {inquiry.consent ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-xs">
                            {formatDateShort(inquiry.submittedAt)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              onClick={() => setSelectedInquiry(inquiry)}
                              className="text-primary hover:text-primary/80 font-semibold text-xs transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Card View */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInquiries.map((inquiry) => (
                  <div
                    key={`${inquiry.id ?? inquiry.email}-${inquiry.submittedAt}`}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-primary/30 cursor-pointer"
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{inquiry.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {formatDateShort(inquiry.submittedAt)}
                        </p>
                      </div>
                      <span
                        className={`ml-2 shrink-0 rounded-lg px-2 py-1 text-xs font-semibold ${
                          inquiry.inquiryType === 'LEAD'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {inquiry.inquiryType === 'LEAD' ? 'Enquiry' : 'Site Visit'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-slate-600 truncate">{inquiry.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-slate-600">{inquiry.mobile}</span>
                      </div>

                      {inquiry.interestedIn && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-xs text-slate-500 mb-2">Interested In</p>
                          <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {inquiry.interestedIn}
                          </span>
                        </div>
                      )}

                      {inquiry.preferredContact && (
                        <div className="text-xs text-slate-500">
                          Prefers: <span className="font-medium capitalize text-slate-700">{inquiry.preferredContact}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInquiry(inquiry);
                      }}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20"
                    >
                      View Property
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {inquiries.length > 0 && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, totalCount)}–
                {Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                {getPageNumbers().map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePageChange(p)}
                    disabled={isLoading}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      p === currentPage
                        ? "bg-primary text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="max-h-screen max-w-2xl w-full overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 border-b border-slate-200 bg-white px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Inquiry Details</h2>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Type */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Type</p>
                  <div className="mt-2">
                    <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                      selectedInquiry.inquiryType === 'LEAD'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedInquiry.inquiryType === 'LEAD' ? 'Enquiry' : 'Site Visit'}
                    </span>
                  </div>
                </div>

                {/* Basic Info */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Name</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{selectedInquiry.name}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
                  <p className="mt-2 text-base text-slate-600 break-all">{selectedInquiry.email}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile</p>
                  <p className="mt-2 text-base text-slate-600">{selectedInquiry.mobile}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Interested In
                  </p>
                  <div className="mt-2">
                    <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {selectedInquiry.interestedIn || "—"}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Preferred Contact
                  </p>
                  <p className="mt-2 text-base capitalize text-slate-600">
                    {selectedInquiry.preferredContact || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Consent</p>
                  <div className="mt-2">
                    <span
                      className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                        selectedInquiry.consent
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedInquiry.consent ? "Given" : "Not Given"}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Submitted</p>
                  <p className="mt-2 text-base text-slate-600">{formatDate(selectedInquiry.submittedAt)}</p>
                </div>
              </div>

              {/* Message */}
              {selectedInquiry.message && (
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Message
                  </p>
                  <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 whitespace-pre-wrap wrap-break-word">                    {selectedInquiry.message}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 border-t border-slate-200 pt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Quick Actions
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700 transition hover:bg-blue-200"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                  <a
                    href={`tel:${selectedInquiry.mobile}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-100 px-4 py-2 font-semibold text-green-700 transition hover:bg-green-200"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${selectedInquiry.mobile.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-200"
                  >
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import {
  Eye, EyeOff, Download, RefreshCw, Lock, Search, X, MessageSquare,
  Mail, Phone, Grid3x3, List, ChevronRight, TrendingUp, Users, Clock, CheckCircle,
  ChevronLeft, ChevronRight as ChevronRightIcon, Calendar, Building2, User, Tag, FileText, Info
} from "lucide-react";

type EnquiryRecord = {
  id: number | string | null;
  name: string;
  email: string | null;
  mobile: string;
  enquiryType: string;
  status: string;
  interestedIn: string;
  message: string;
  preferredContact?: string;
  projectName?: string;
  preferredDate?: string;
  preferredSlot?: string;
  notes?: string;
  source?: string;
  consent: boolean;
  submittedAt: string;
};

type ViewEnquiriesResponse = {
  message?: string;
  enquiries?: EnquiryRecord[];
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

function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStatusColor(status: string): string {
  switch (status) {
    case "new":
      return "bg-blue-50 text-blue-700 ring-blue-600/20";
    case "contacted":
      return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
    case "follow_up":
      return "bg-orange-50 text-orange-700 ring-orange-600/20";
    case "site_visit_scheduled":
      return "bg-purple-50 text-purple-700 ring-purple-600/20";
    case "site_visit_completed":
      return "bg-indigo-50 text-indigo-700 ring-indigo-600/20";
    case "converted":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "lost":
      return "bg-red-50 text-red-700 ring-red-600/20";
    case "cancelled":
      return "bg-gray-50 text-gray-700 ring-gray-600/20";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-600/20";
  }
}

function escapeCsvCell(value: string | boolean | null | undefined) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCsv(enquiries: EnquiryRecord[]) {
  const headers = [
    "ID", "Name", "Email", "Mobile", "Type", "Status", "Interested In",
    "Preferred Contact", "Project Name", "Preferred Date", "Preferred Slot",
    "Notes", "Source", "Message", "Consent", "Submitted At",
  ];
  const rows = enquiries.map((l) =>
    [
      String(l.id ?? ""),
      l.name,
      l.email ?? "",
      l.mobile,
      l.enquiryType,
      l.status,
      l.interestedIn,
      l.preferredContact ?? "",
      l.projectName ?? "",
      l.preferredDate ?? "",
      l.preferredSlot ?? "",
      l.notes ?? "",
      l.source ?? "",
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
  a.download = `pridewalls-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function calculateStats(enquiries: EnquiryRecord[]) {
  const categories = new Map<string, number>();
  const contactMethods = new Map<string, number>();

  enquiries.forEach((enquiry) => {
    categories.set(enquiry.interestedIn, (categories.get(enquiry.interestedIn) || 0) + 1);
    const method = enquiry.preferredContact || "Not specified";
    contactMethods.set(method, (contactMethods.get(method) || 0) + 1);
  });

  return {
    total: enquiries.length,
    withConsent: enquiries.filter((l) => l.consent).length,
    byCategory: Array.from(categories.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    byContactMethod: Array.from(contactMethods.entries())
      .map(([method, count]) => ({ method, count }))
      .sort((a, b) => b.count - a.count),
  };
}

// Helper for Avatar colors matching Blue & Gold theme
const avatarColors = [
  "bg-blue-100 text-blue-800",
  "bg-amber-100 text-amber-800",
  "bg-slate-100 text-slate-800",
  "bg-indigo-100 text-indigo-800",
];

function getAvatarColor(name: string) {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function EnquiriesViewer() {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState<string | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [filterBy, setFilterBy] = useState<"all" | "email" | "phone" | "message">("all");
  const [enquiryTypeFilter, setEnquiryTypeFilter] = useState<"ALL" | "property_enquiry" | "site_visit_request">("ALL");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadEnquiries = async (pwd: string, page = 1, type = "ALL") => {
    const response = await fetch("/api/enquiries/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, page, pageSize: PAGE_SIZE, type }),
    });
    const result = (await response.json()) as ViewEnquiriesResponse;
    if (!response.ok) throw new Error(result.message || "Unable to load enquiries.");
    return {
      enquiries: result.enquiries ?? [],
      totalCount: result.totalCount ?? 0,
      totalPages: result.totalPages ?? 1,
      currentPage: result.currentPage ?? 1,
    };
  };

  const loadAllEnquiries = async (pwd: string, type = "ALL") => {
    const response = await fetch("/api/enquiries/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, page: 1, pageSize: 10000, type }),
    });
    const result = (await response.json()) as ViewEnquiriesResponse;
    if (!response.ok) throw new Error(result.message || "Unable to load enquiries.");
    return result.enquiries ?? [];
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
      const result = await loadEnquiries(password.trim(), 1, enquiryTypeFilter);
      setVerifiedPassword(password.trim());
      setEnquiries(result.enquiries);
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
      const result = await loadEnquiries(verifiedPassword, currentPage, enquiryTypeFilter);
      setEnquiries(result.enquiries);
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
    setEnquiries([]);
    setCurrentPage(1);
    setTotalCount(0);
    setTotalPages(1);
    setEnquiryTypeFilter("ALL");
    setFilterBy("all");
    setViewMode("table");
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
    setSearchTerm("");
    setSelectedEnquiry(null);
  };

  const handlePageChange = async (page: number) => {
    if (!verifiedPassword || page === currentPage || page < 1 || page > totalPages) return;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = await loadEnquiries(verifiedPassword, page, enquiryTypeFilter);
      setEnquiries(result.enquiries);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to change page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnquiryTypeFilterChange = async (
    type: "ALL" | "property_enquiry" | "site_visit_request"
  ) => {
    if (type === enquiryTypeFilter && enquiries.length > 0) return;
    setEnquiryTypeFilter(type);
    setSearchTerm("");
    setSelectedEnquiry(null);

    if (!verifiedPassword) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await loadEnquiries(verifiedPassword, 1, type);
      setEnquiries(result.enquiries);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setSuccessMessage("Data loaded successfully.");
    } catch (error) {
      setEnquiries([]);
      setCurrentPage(1);
      setTotalCount(0);
      setTotalPages(1);
      setErrorMessage(error instanceof Error ? error.message : "Unable to filter enquiries.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 5; 
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage - 2 < 1) endPage = maxButtons;
      if (currentPage + 2 > totalPages) startPage = totalPages - maxButtons + 1;

      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const query = searchTerm.toLowerCase();
    if (filterBy === "all") {
      return (
        enquiry.name.toLowerCase().includes(query) ||
        (enquiry.email?.toLowerCase().includes(query) ?? false) ||
        enquiry.mobile.includes(query) ||
        enquiry.interestedIn.toLowerCase().includes(query)
      );
    } else if (filterBy === "email") {
      return enquiry.email?.toLowerCase().includes(query) ?? false;
    } else if (filterBy === "phone") {
      return enquiry.mobile.includes(query);
    } else if (filterBy === "message") {
      return enquiry.message.toLowerCase().includes(query);
    }
    return true;
  });

  const stats = calculateStats(enquiries);

  if (!verifiedPassword) {
    return (
      <div className="min-h-screen bg-white pt-28 sm:pt-32 lg:pt-36 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Geometric Accent Line */}
          <div className="mx-auto mb-6 h-1 w-24 bg-amber-400 rounded-full"></div>
          
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 mb-4 shadow-lg shadow-amber-400/20">
                <Lock className="h-8 w-8 text-blue-950" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-blue-950">Secure Access</h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter your password to manage Pridewalls enquiries securely
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setErrorMessage("");
                      setPassword(e.target.value);
                    }}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-amber-400"
                  >
                    {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-amber-400 text-blue-950 font-bold rounded-xl transition hover:bg-amber-300 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                {isLoading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <>Unlock Access <ChevronRight className="h-4 w-4" /></>
                )}
              </button>

              {errorMessage && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                  <X className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-blue-950">Enquiries Dashboard</h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage and track all submitted property enquiries and site visits
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={async () => {
                  if (!verifiedPassword) return;
                  setIsLoading(true);
                  try {
                    const allEnquiries = await loadAllEnquiries(verifiedPassword, enquiryTypeFilter);
                    downloadCsv(allEnquiries);
                    setSuccessMessage(`Downloaded ${allEnquiries.length} records.`);
                  } catch (error) {
                    setErrorMessage(error instanceof Error ? error.message : "Unable to download CSV.");
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={enquiries.length === 0 || isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400 px-4 py-2 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-amber-300 disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 disabled:opacity-70"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLock}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-400"
              >
                <Lock className="h-4 w-4 text-slate-500" />
                Lock
              </button>
            </div>
          </div>

          {/* Type Filter Tabs */}
          <div className="mb-6 border-b border-slate-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {[
                { key: "ALL", label: "All Records" },
                { key: "property_enquiry", label: "Property Enquiries" },
                { key: "site_visit_request", label: "Site Visits" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleEnquiryTypeFilterChange(tab.key as any)}
                  className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-semibold transition ${
                    enquiryTypeFilter === tab.key
                      ? "border-amber-500 text-blue-950"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Records</p>
                  <p className="mt-2 text-2xl font-bold text-blue-950">{stats.total}</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 ring-1 ring-inset ring-blue-100">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">With Consent</p>
                  <p className="mt-2 text-2xl font-bold text-blue-950">{stats.withConsent}</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 ring-1 ring-inset ring-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">Top Interest</p>
                  <p className="mt-2 truncate text-lg font-bold text-blue-950">
                    {stats.byCategory[0]?.name || "—"}
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 ring-1 ring-inset ring-amber-100">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">Preferred Contact</p>
                  <p className="mt-2 truncate text-lg font-bold capitalize text-blue-950">
                    {stats.byContactMethod[0]?.method || "—"}
                  </p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3 ring-1 ring-inset ring-indigo-100">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and View Toggle */}
          {enquiries.length > 0 && (
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">All Fields</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="message">Message</option>
                </select>

                <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("table")}
                    className={`rounded-md p-1.5 transition ${viewMode === "table" ? "bg-white shadow-sm text-blue-800" : "text-slate-500 hover:text-slate-900"}`}
                    title="Table view"
                  >
                    <List className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("card")}
                    className={`rounded-md p-1.5 transition ${viewMode === "card" ? "bg-white shadow-sm text-blue-800" : "text-slate-500 hover:text-slate-900"}`}
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
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
              <X className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex items-start gap-2">
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{successMessage}</p>
            </div>
          )}

          {/* Empty State */}
          {totalCount === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Users className="h-6 w-6 text-slate-400" />
              </div>
              <p className="mt-4 text-slate-600 font-medium">No records found yet.</p>
              <p className="text-sm text-slate-400 mt-1">Submitted enquiries and site visits will appear here.</p>
            </div>
          ) : filteredEnquiries.length === 0 && searchTerm ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <p className="mt-4 text-slate-600 font-medium">No enquiries match your search.</p>
              <p className="text-sm text-slate-400 mt-1">Try adjusting your search terms.</p>
            </div>
          ) : viewMode === "table" ? (
            <>
              {/* Modern Table View */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-4 font-medium">Customer</th>
                        <th className="px-6 py-4 font-medium">Type</th>
                        <th className="px-6 py-4 font-medium">Project & Interest</th>
                        <th className="px-6 py-4 font-medium">Schedule</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Submitted</th>
                        <th className="px-6 py-4 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredEnquiries.map((enquiry) => (
                        <tr
                          key={`${enquiry.id ?? enquiry.email}-${enquiry.submittedAt}`}
                          className="transition hover:bg-blue-50/30"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${getAvatarColor(enquiry.name)}`}>
                                {getInitials(enquiry.name)}
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-blue-950 truncate">{enquiry.name}</div>
                                <div className="text-xs text-slate-500 truncate">{enquiry.mobile}</div>
                                {enquiry.email && (
                                  <div className="text-xs text-slate-400 truncate flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {enquiry.email}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${enquiry.enquiryType === 'property_enquiry' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'}`}>
                              {enquiry.enquiryType === 'property_enquiry' ? 'Enquiry' : 'Site Visit'}
                            </span>
                          </td>
                          <td className="px-6 py-4 max-w-[220px]">
                            <div className="flex items-center gap-2 text-slate-900 font-medium truncate">
                              <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                              {enquiry.interestedIn || "—"}
                            </div>
                            {enquiry.projectName && (
                              <div className="text-xs text-slate-500 truncate mt-1">
                                {enquiry.projectName}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {enquiry.preferredDate ? (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <span>{formatDateShort(enquiry.preferredDate)}</span>
                                {enquiry.preferredSlot && <span className="text-xs text-slate-400">({enquiry.preferredSlot})</span>}
                              </div>
                            ) : "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset capitalize ${getStatusColor(enquiry.status)}`}>
                              {formatStatus(enquiry.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                            {formatDateShort(enquiry.submittedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="inline-flex items-center gap-1 rounded-md bg-blue-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-800"
                            >
                              Details
                              <ChevronRight className="h-3 w-3" />
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
              {/* Modern Card View */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEnquiries.map((enquiry) => (
                  <div
                    key={`${enquiry.id ?? enquiry.email}-${enquiry.submittedAt}`}
                    className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:border-amber-400 hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedEnquiry(enquiry)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${getAvatarColor(enquiry.name)}`}>
                          {getInitials(enquiry.name)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-blue-950 truncate">{enquiry.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {formatDateShort(enquiry.submittedAt)}
                          </p>
                        </div>
                      </div>
                      <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${enquiry.enquiryType === 'property_enquiry' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'}`}>
                        {enquiry.enquiryType === 'property_enquiry' ? 'Enquiry' : 'Visit'}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm border-t border-slate-100 pt-4 flex-1">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{enquiry.mobile}</span>
                      </div>
                      {enquiry.email && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="truncate text-xs">{enquiry.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-600 mt-3">
                        <Building2 className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-blue-950 truncate text-xs">{enquiry.interestedIn}</span>
                      </div>
                      {enquiry.preferredDate && (
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span>{formatDateShort(enquiry.preferredDate)} {enquiry.preferredSlot ? `· ${enquiry.preferredSlot}` : ""}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                       <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset capitalize ${getStatusColor(enquiry.status)}`}>
                        {formatStatus(enquiry.status)}
                      </span>
                      <span className="text-xs font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition flex items-center">
                        View <ChevronRightIcon className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {enquiries.length > 0 && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-blue-950">{Math.min((currentPage - 1) * PAGE_SIZE + 1, totalCount)}</span> 
                – 
                <span className="font-semibold text-blue-950">{Math.min(currentPage * PAGE_SIZE, totalCount)}</span> 
                of <span className="font-semibold text-blue-950">{totalCount}</span> results
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
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
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${p === currentPage
                        ? "bg-blue-950 text-white shadow-sm"
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
                  className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Detail Modal - Fully Detailed */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/60 backdrop-blur-sm p-4">
          <div className="max-h-[90vh] max-w-4xl w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-blue-950/5">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur px-6 py-4 sm:px-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${getAvatarColor(selectedEnquiry.name)}`}>
                  {getInitials(selectedEnquiry.name)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-950">{selectedEnquiry.name}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Submitted on {formatDate(selectedEnquiry.submittedAt)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              
              {/* Pills Row */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${selectedEnquiry.enquiryType === 'property_enquiry' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'}`}>
                  {selectedEnquiry.enquiryType === 'property_enquiry' ? 'Property Enquiry' : 'Site Visit Request'}
                </span>
                <span className={`inline-flex items-center capitalize rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(selectedEnquiry.status)}`}>
                  {formatStatus(selectedEnquiry.status)}
                </span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${selectedEnquiry.consent ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`}>
                  {selectedEnquiry.consent ? "Consent Given" : "No Consent"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
                
                {/* Column 1: Customer Info */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 border-b border-slate-100 pb-2">
                    <User className="h-4 w-4 text-amber-500" /> Customer Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Mobile Number</p>
                      <a href={`tel:${selectedEnquiry.mobile}`} className="text-sm font-semibold text-blue-800 hover:text-amber-600 hover:underline">{selectedEnquiry.mobile}</a>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium">Email Address</p>
                      {selectedEnquiry.email ? (
                        <a href={`mailto:${selectedEnquiry.email}`} className="text-sm font-semibold text-blue-800 hover:text-amber-600 hover:underline break-all">{selectedEnquiry.email}</a>
                      ) : (
                        <p className="text-sm text-slate-400 italic">Not provided</p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium">Preferred Contact Method</p>
                      <p className="text-sm font-medium text-slate-700 capitalize">{selectedEnquiry.preferredContact || "Not specified"}</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium">Source</p>
                      <p className="text-sm font-medium text-slate-700">{selectedEnquiry.source || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                {/* Column 2: Enquiry & Project Details */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 border-b border-slate-100 pb-2">
                    <Building2 className="h-4 w-4 text-amber-500" /> Project & Enquiry
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Interested In</p>
                      <p className="text-sm font-medium text-slate-700">{selectedEnquiry.interestedIn || "Not specified"}</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium">Project Name</p>
                      <p className="text-sm font-medium text-slate-700">{selectedEnquiry.projectName || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Schedule (Full Width if available) */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 border-b border-slate-100 pb-2">
                    <Calendar className="h-4 w-4 text-amber-500" /> Schedule Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Preferred Date</p>
                      {selectedEnquiry.preferredDate ? (
                        <p className="text-sm font-medium text-slate-700">{formatDateShort(selectedEnquiry.preferredDate)}</p>
                      ) : (
                        <p className="text-sm text-slate-400 italic">Not specified</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Preferred Time Slot</p>
                      {selectedEnquiry.preferredSlot ? (
                        <p className="text-sm font-medium text-slate-700">{selectedEnquiry.preferredSlot}</p>
                      ) : (
                        <p className="text-sm text-slate-400 italic">Not specified</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 4: Message & Notes (Full Width) */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 border-b border-slate-100 pb-2">
                    <FileText className="h-4 w-4 text-amber-500" /> Messages & Notes
                  </h3>
                  
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">Customer Message</p>
                    {selectedEnquiry.message ? (
                      <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-inset ring-slate-100">
                        <p className="whitespace-pre-wrap break-words">{selectedEnquiry.message}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic">Not provided</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">Internal Notes</p>
                    {selectedEnquiry.notes ? (
                      <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-inset ring-amber-100">
                        <p className="whitespace-pre-wrap break-words">{selectedEnquiry.notes}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic">Not provided</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Quick Actions */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {selectedEnquiry.email && (
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
                    >
                      <Mail className="h-4 w-4 text-blue-600" />
                      Send Email
                    </a>
                  )}
                  <a
                    href={`tel:${selectedEnquiry.mobile}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${selectedEnquiry.mobile.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-amber-300"
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
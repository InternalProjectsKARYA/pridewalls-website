import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export type SiteVisitPayload = {
  name?: string;
  email?: string;
  mobile?: string;
  interestedIn?: string;
  projectName?: string;
  preferredDate?: string;
  preferredSlot?: string;
  notes?: string;
  sourceLabel?: string;
  consent?: boolean;
};

export type StoredSiteVisit = {
  name: string;
  email: string;
  mobile: string;
  interested_in: string;
  project_name?: string;
  preferred_date: string;
  preferred_slot: string;
  notes?: string;
  source_label?: string;
  consent: boolean;
  submitted_at: string;
};

export type DecryptedSiteVisit = {
  id: number | string | null;
  name: string;
  email: string;
  mobile: string;
  interestedIn: string;
  projectName: string;
  preferredDate: string;
  preferredSlot: string;
  notes: string;
  sourceLabel: string;
  consent: boolean;
  submittedAt: string;
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteVisitsTable = process.env.SUPABASE_SITE_VISITS_TABLE ?? "site_visits";
const encryptionKey = process.env.PLOTS_AES_KEY;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidMobileNumber(mobile: string) {
  const normalized = mobile.replace(/[\s()-]/g, "");
  return /^(?:\+?91|91|0)?[6-9]\d{9}$/.test(normalized);
}

function getEncryptionKey() {
  if (!encryptionKey) {
    throw new Error("AES encryption is not configured. Add PLOTS_AES_KEY to .env.local.");
  }
  const normalized = encryptionKey.trim();
  const isHex = /^[0-9a-fA-F]{64}$/.test(normalized);
  const buf = isHex
    ? Buffer.from(normalized, "hex")
    : Buffer.from(normalized, "base64");
  if (buf.length !== 32) {
    throw new Error("PLOTS_AES_KEY must be a 32-byte key in hex or base64 format.");
  }
  return buf;
}

export function encryptValue(value: string) {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decryptValue(value: string) {
  const key = getEncryptionKey();
  const payload = Buffer.from(value, "base64");
  const iv = payload.subarray(0, 12);
  const authTag = payload.subarray(12, 28);
  const encrypted = payload.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

function assertConfig() {
  if (!supabaseUrl) throw new Error("Add SUPABASE_URL to .env.local.");
  if (!supabaseServiceRoleKey) throw new Error("Add SUPABASE_SERVICE_ROLE_KEY to .env.local.");
}

async function fetchSupabase<T>(path: string, init?: RequestInit): Promise<T> {
  assertConfig();
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceRoleKey as string,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    let message = text || "Supabase request failed.";
    let code: string | undefined;
    try {
      const parsed = JSON.parse(text) as { code?: string; message?: string };
      code = parsed?.code;
      if (parsed?.message) message = parsed.message;
    } catch { /* ignore */ }
    const err = new Error(message) as Error & { code?: string };
    err.code = code;
    throw err;
  }

  const text = await response.text();
  if (!text.trim()) return null as T;
  return JSON.parse(text) as T;
}

export async function saveSiteVisit(visit: StoredSiteVisit) {
  const payload: Record<string, unknown> = {
    name: encryptValue(visit.name),
    email: encryptValue(visit.email),
    mobile: encryptValue(visit.mobile),
    interested_in: visit.interested_in,
    preferred_date: visit.preferred_date,
    preferred_slot: visit.preferred_slot,
    consent: visit.consent,
    submitted_at: visit.submitted_at,
  };
  if (visit.project_name) payload.project_name = visit.project_name;
  if (visit.notes?.trim()) payload.notes = visit.notes.trim();
  if (visit.source_label) payload.source_label = visit.source_label;

  await fetchSupabase<null>(siteVisitsTable, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(payload),
  });
  return true;
}

type RawSiteVisitRow = {
  id?: number | string | null;
  name?: string | null;
  email?: string | null;
  mobile?: string | null;
  interested_in?: string | null;
  project_name?: string | null;
  preferred_date?: string | null;
  preferred_slot?: string | null;
  notes?: string | null;
  source_label?: string | null;
  consent?: boolean | null;
  submitted_at?: string | null;
};

export async function fetchSiteVisits({
  page = 1,
  pageSize = 50,
}: { page?: number; pageSize?: number } = {}): Promise<{
  visits: DecryptedSiteVisit[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  assertConfig();
  const safePage = Math.max(1, Math.floor(page));
  const safeSize = Math.min(100, Math.max(1, Math.floor(pageSize)));
  const rangeStart = (safePage - 1) * safeSize;
  const rangeEnd = rangeStart + safeSize - 1;

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${siteVisitsTable}?select=*&order=submitted_at.desc`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceRoleKey as string,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        Prefer: "count=exact",
        Range: `${rangeStart}-${rangeEnd}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch site visits.");
  }

  const contentRange = response.headers.get("content-range");
  const totalCount = contentRange ? Number(contentRange.split("/")[1] ?? 0) || 0 : 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / safeSize));
  const rows = (await response.json()) as RawSiteVisitRow[];

  const visits: DecryptedSiteVisit[] = rows.flatMap((row) => {
    try {
      return [{
        id: row.id ?? null,
        name: row.name ? decryptValue(row.name) : "",
        email: row.email ? decryptValue(row.email) : "",
        mobile: row.mobile ? decryptValue(row.mobile) : "",
        interestedIn: row.interested_in ?? "",
        projectName: row.project_name ?? "",
        preferredDate: row.preferred_date ?? "",
        preferredSlot: row.preferred_slot ?? "",
        notes: row.notes ?? "",
        sourceLabel: row.source_label ?? "",
        consent: row.consent === true,
        submittedAt: row.submitted_at ?? "",
      } satisfies DecryptedSiteVisit];
    } catch {
      return [];
    }
  });

  return { visits, totalCount, totalPages, currentPage: safePage };
}

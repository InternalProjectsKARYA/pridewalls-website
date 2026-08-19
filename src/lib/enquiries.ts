import {
    createCipheriv,
    createDecipheriv,
    randomBytes,
} from "node:crypto";

// ============================================================================
// Types
// ============================================================================

export type EnquiryType = "property_enquiry" | "site_visit_request";

export type EnquiryStatus =
    | "new"
    | "contacted"
    | "follow_up"
    | "site_visit_scheduled"
    | "site_visit_completed"
    | "converted"
    | "lost"
    | "cancelled";

// Base payload for both enquiry types
export type BaseEnquiryPayload = {
    name?: string;
    email?: string; // Optional - many customers only have mobile/WhatsApp
    mobile?: string;
    propertyInterest?: string;
    interestedIn?: string; // Frontend field name for property interest
    consent?: boolean;
};

// Property enquiry-specific payload
export type PropertyEnquiryPayload = BaseEnquiryPayload & {
    type: "property_enquiry";
    message?: string;
    preferredContact?: string;
    projectName?: string;
    source?: string;
};

// Site visit-specific payload
export type SiteVisitRequestPayload = BaseEnquiryPayload & {
    type: "site_visit_request";
    projectName?: string;
    preferredDate?: string;
    preferredSlot?: string;
    notes?: string;
    source?: string;
};

// Discriminated union for all enquiry payloads
export type EnquiryPayload =
    | PropertyEnquiryPayload
    | SiteVisitRequestPayload;

// Stored enquiry (after validation and normalization)
export type StoredEnquiry = {
    name: string;
    email: string | null; // Optional - many customers only have mobile/WhatsApp
    mobile: string;
    enquiry_type: EnquiryType;
    status: EnquiryStatus;
    property_interest: string;
    consent: boolean;
    submitted_at: string;
    // Property enquiry fields
    message?: string;
    preferred_contact?: string;
    // Site visit fields
    project_name?: string;
    preferred_date?: string;
    preferred_slot?: string;
    notes?: string;
    source?: string;
};

// Decrypted enquiry record (for admin view)
export type DecryptedEnquiry = {
    id: number | string | null;
    name: string;
    email: string | null; // Optional - many customers only have mobile/WhatsApp
    mobile: string;
    enquiryType: EnquiryType;
    status: EnquiryStatus;
    propertyInterest: string;
    message: string;
    preferredContact: string;
    projectName: string;
    preferredDate: string;
    preferredSlot: string;
    notes: string;
    source: string;
    consent: boolean;
    submittedAt: string;
};

// Paginated result
export type PaginatedEnquiriesResult = {
    enquiries: DecryptedEnquiry[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
};

// ============================================================================
// Configuration
// ============================================================================

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const enquiriesTable = process.env.SUPABASE_ENQUIRIES_TABLE ?? "enquiries";
const encryptionKey = process.env.PLOTS_AES_KEY;
const viewPassword = process.env.PLOTS_VIEW_PASSWORD;

// ============================================================================
// Validation Utilities
// ============================================================================

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeMobile(mobile: string): string {
    return mobile.replace(/[\s()-]/g, "");
}

export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

export function isValidMobileNumber(mobile: string): boolean {
    const normalizedMobile = normalizeMobile(mobile);
    return /^(?:\+?91|91|0)?[6-9]\d{9}$/.test(normalizedMobile);
}

export function toTitleCase(value: string): string {
    return value
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .replace(/(^|[\s-/])([a-z])/g, (_, prefix: string, char: string) => {
            return `${prefix}${char.toUpperCase()}`;
        });
}

// ============================================================================
// Encryption/Decryption
// ============================================================================

function getEncryptionKey(): Buffer {
    if (!encryptionKey) {
        throw new Error(
            "AES encryption is not configured. Add PLOTS_AES_KEY to .env.local."
        );
    }

    const normalizedKey = encryptionKey.trim();
    const isHexKey = /^[0-9a-fA-F]{64}$/.test(normalizedKey);
    const keyBuffer = isHexKey
        ? Buffer.from(normalizedKey, "hex")
        : Buffer.from(normalizedKey, "base64");

    if (keyBuffer.length !== 32) {
        throw new Error(
            "PLOTS_AES_KEY must be a 32-byte key in hex or base64 format."
        );
    }

    return keyBuffer;
}

export function encryptValue(value: string): string {
    const key = getEncryptionKey();
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([
        cipher.update(value, "utf8"),
        cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decryptValue(value: string): string {
    const key = getEncryptionKey();
    const payload = Buffer.from(value, "base64");
    const iv = payload.subarray(0, 12);
    const authTag = payload.subarray(12, 28);
    const encrypted = payload.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", key, iv);

    decipher.setAuthTag(authTag);

    return Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
    ]).toString("utf8");
}

// ============================================================================
// Supabase Helpers
// ============================================================================

function assertSupabaseConfig(): void {
    if (!supabaseUrl) {
        throw new Error(
            "Supabase is not configured. Add SUPABASE_URL to .env.local."
        );
    }

    if (!supabaseServiceRoleKey) {
        throw new Error(
            "Supabase is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local."
        );
    }

    if (
        supabaseServiceRoleKey.startsWith("sb_publishable_") ||
        supabaseServiceRoleKey.startsWith("sb_anon_")
    ) {
        throw new Error(
            "SUPABASE_SERVICE_ROLE_KEY is using a public key. Use the Supabase service_role key instead."
        );
    }
}

async function fetchFromSupabase<T>(
    path: string,
    init?: RequestInit
): Promise<T> {
    assertSupabaseConfig();

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
        const errorText = await response.text();

        let message = errorText || "Supabase request failed.";
        let errorCode: string | undefined;

        try {
            const parsed = JSON.parse(errorText) as {
                code?: string;
                message?: string;
            };

            errorCode = parsed?.code;
            const target = path.split("?")[0] ?? path;

            if (parsed?.code === "PGRST205") {
                message =
                    `Supabase table "${target}" was not found. ` +
                    `Create it in Supabase (public schema) or set SUPABASE_ENQUIRIES_TABLE to your table name, then restart the dev server.`;
            } else if (parsed?.message) {
                message = parsed.message;
            }
        } catch {
            // ignore JSON parse errors
        }

        const error = new Error(message) as Error & {
            code?: string;
            raw?: string;
        };

        error.code = errorCode;
        error.raw = errorText;
        throw error;
    }

    const responseText = await response.text();

    if (!responseText.trim()) {
        return null as T;
    }

    return JSON.parse(responseText) as T;
}

// ============================================================================
// Core Functions
// ============================================================================

export async function saveEnquiry(
    enquiry: StoredEnquiry
): Promise<boolean> {
    const payload: Record<string, unknown> = {
        name: encryptValue(enquiry.name),
        email: enquiry.email ? encryptValue(enquiry.email) : null,
        mobile: encryptValue(enquiry.mobile),
        enquiry_type: enquiry.enquiry_type,
        status: enquiry.status,
        property_interest: encryptValue(enquiry.property_interest),
        consent: enquiry.consent,
        submitted_at: enquiry.submitted_at,
    };

    // Property enquiry fields
    if (enquiry.message?.trim()) {
        payload.message = encryptValue(enquiry.message.trim());
    }

    if (enquiry.preferred_contact) {
        payload.preferred_contact = encryptValue(enquiry.preferred_contact);
    }

    // Site visit fields
    if (enquiry.project_name) {
        payload.project_name = encryptValue(enquiry.project_name);
    }

    if (enquiry.preferred_date) {
        payload.preferred_date = enquiry.preferred_date; // date stored as-is
    }

    if (enquiry.preferred_slot) {
        payload.preferred_slot = encryptValue(enquiry.preferred_slot);
    }

    if (enquiry.notes?.trim()) {
        payload.notes = encryptValue(enquiry.notes.trim());
    }

    if (enquiry.source) {
        payload.source = encryptValue(enquiry.source);
    }

    await fetchFromSupabase<null>(enquiriesTable, {
        method: "POST",
        headers: {
            Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
    });

    return true;
}

export async function fetchEnquiries({
    page = 1,
    pageSize = 50,
    type,
    status,
}: {
    page?: number;
    pageSize?: number;
    type?: EnquiryType;
    status?: EnquiryStatus;
} = {}): Promise<{
    enquiries: DecryptedEnquiry[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}> {
    assertSupabaseConfig();

    const safePage = Math.max(1, Math.floor(page));
    const safeSize = Math.min(100, Math.max(1, Math.floor(pageSize)));
    const rangeStart = (safePage - 1) * safeSize;
    const rangeEnd = rangeStart + safeSize - 1;

    // Build query
    let query = `${enquiriesTable}?select=*&order=submitted_at.desc`;

    const filters: string[] = [];

    if (type) filters.push(`enquiry_type=eq.${type}`);
    if (status) filters.push(`status=eq.${status}`);

    if (filters.length > 0) {
        query += `&${filters.join("&")}`;
    }

    const response = await fetch(
        `${supabaseUrl}/rest/v1/${query}`,
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
        throw new Error(text || "Failed to fetch enquiries.");
    }

    const contentRange = response.headers.get("content-range");
    const totalCount = contentRange
        ? Number(contentRange.split("/")[1] ?? 0) || 0
        : 0;

    const totalPages = Math.max(
        1,
        Math.ceil(totalCount / safeSize)
    );

    const rows = (await response.json()) as RawEnquiryRow[];

    const enquiries: DecryptedEnquiry[] = rows.flatMap((row) => {
        try {
            return [{
                id: row.id ?? null,
                name: row.name ? decryptValue(row.name) : "",
                email: row.email ? decryptValue(row.email) : null,
                mobile: row.mobile ? decryptValue(row.mobile) : "",
                enquiryType: row.enquiry_type as EnquiryType,
                status: row.status as EnquiryStatus,
                propertyInterest: row.property_interest
                    ? decryptValue(row.property_interest)
                    : "",
                message: row.message ? decryptValue(row.message) : "",
                preferredContact: row.preferred_contact
                    ? decryptValue(row.preferred_contact)
                    : "",
                projectName: row.project_name
                    ? decryptValue(row.project_name)
                    : "",
                preferredDate: row.preferred_date ?? "",
                preferredSlot: row.preferred_slot
                    ? decryptValue(row.preferred_slot)
                    : "",
                notes: row.notes ? decryptValue(row.notes) : "",
                source: row.source ? decryptValue(row.source) : "",
                consent: row.consent === true,
                submittedAt: row.submitted_at ?? "",
            } satisfies DecryptedEnquiry];
        } catch {
            return [];
        }
    });

    return {
        enquiries,
        totalCount,
        totalPages,
        currentPage: safePage,
    };
}

type RawEnquiryRow = {
    id?: number | string | null;
    name?: string | null;
    email?: string | null;
    mobile?: string | null;
    enquiry_type?: string | null;
    status?: string | null;
    property_interest?: string | null;
    message?: string | null;
    preferred_contact?: string | null;
    project_name?: string | null;
    preferred_date?: string | null;
    preferred_slot?: string | null;
    notes?: string | null;
    source?: string | null;
    consent?: boolean | null;
    submitted_at?: string | null;
};

export async function fetchEnquiriesPage({
    page,
    pageSize,
    type,
    status,
}: {
    page: number;
    pageSize: number;
    type?: EnquiryType;
    status?: EnquiryStatus;
}): Promise<PaginatedEnquiriesResult> {
    const result = await fetchEnquiries({
        page,
        pageSize,
        type,
        status,
    });

    return {
        enquiries: result.enquiries,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pageSize,
    };
}

export function validateViewerPassword(password: string): boolean {
    if (!viewPassword) {
        throw new Error(
            "Viewer password is not configured. Add PLOTS_VIEW_PASSWORD to .env.local."
        );
    }

    return password === viewPassword;
}

// ============================================================================
// Validation for API
// ============================================================================

export function validateEnquiryPayload(
    payload: EnquiryPayload
): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    // Common required fields
    if (!payload.name?.trim()) {
        errors.push("Name is required.");
    }

    // Email is optional - many customers only have mobile/WhatsApp
    if (payload.email?.trim() && !isValidEmail(payload.email.trim())) {
        errors.push("Please enter a valid email address.");
    }

    if (!payload.mobile?.trim()) {
        errors.push("Mobile number is required.");
    } else if (!isValidMobileNumber(payload.mobile.trim())) {
        errors.push("Please enter a valid mobile number.");
    }

    if (!payload.consent) {
        errors.push("Consent is required before submission.");
    }

    // Type-specific validation
    if (payload.type === "property_enquiry") {
        if (payload.message && payload.message.length > 2000) {
            errors.push("Message is too long (max 2000 characters).");
        }
    } else if (payload.type === "site_visit_request") {
        // Support both propertyInterest (backend) and interestedIn (frontend) field names
        if (!payload.propertyInterest?.trim() && !payload.interestedIn?.trim()) {
            errors.push("Please select a property type you are interested in.");
        }

        if (!payload.preferredDate?.trim()) {
            errors.push("Please select a preferred visit date.");
        }

        if (!payload.preferredSlot?.trim()) {
            errors.push("Please select a preferred time slot.");
        }

        if (payload.notes && payload.notes.length > 2000) {
            errors.push("Notes are too long (max 2000 characters).");
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
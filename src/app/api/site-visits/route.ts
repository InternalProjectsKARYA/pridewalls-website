import { NextResponse } from "next/server";
import {
  type SiteVisitPayload,
  type StoredSiteVisit,
  isValidEmail,
  isValidMobileNumber,
  saveSiteVisit,
  fetchSiteVisits,
} from "@/lib/site-visits";

function toTitleCase(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/(^|[\s-/])([a-z])/g, (_, p: string, c: string) => `${p}${c.toUpperCase()}`);
}

// ─── POST /api/site-visits ────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SiteVisitPayload;

    const name = payload.name ? toTitleCase(payload.name) : "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const mobile = payload.mobile?.trim() ?? "";
    const interestedIn = payload.interestedIn?.trim() ?? "";
    const projectName = payload.projectName?.trim() ?? "";
    const preferredDate = payload.preferredDate?.trim() ?? "";
    const preferredSlot = payload.preferredSlot?.trim() ?? "";
    const notes = payload.notes?.trim() ?? "";
    const sourceLabel = payload.sourceLabel?.trim() ?? "";
    const consent = payload.consent === true;

    // Required field checks
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { message: "Name, email, and mobile number are required." },
        { status: 400 }
      );
    }

    if (!interestedIn) {
      return NextResponse.json(
        { message: "Please select a property type you are interested in." },
        { status: 400 }
      );
    }

    if (!preferredDate) {
      return NextResponse.json(
        { message: "Please select a preferred visit date." },
        { status: 400 }
      );
    }

    if (!preferredSlot) {
      return NextResponse.json(
        { message: "Please select a preferred time slot." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidMobileNumber(mobile)) {
      return NextResponse.json(
        { message: "Please enter a valid mobile number." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { message: "Consent is required before submitting." },
        { status: 400 }
      );
    }

    if (notes && notes.length > 2000) {
      return NextResponse.json(
        { message: "Notes are too long (max 2000 characters)." },
        { status: 400 }
      );
    }

    const visit: StoredSiteVisit = {
      name,
      email,
      mobile,
      interested_in: interestedIn,
      preferred_date: preferredDate,
      preferred_slot: preferredSlot,
      consent,
      submitted_at: new Date().toISOString(),
      ...(projectName ? { project_name: projectName } : {}),
      ...(notes ? { notes } : {}),
      ...(sourceLabel ? { source_label: sourceLabel } : {}),
    };

    await saveSiteVisit(visit);

    return NextResponse.json(
      { message: "Your site visit request has been received. Our team will confirm shortly." },
      { status: 201 }
    );
  } catch (error) {
    const code =
      typeof (error as { code?: unknown })?.code === "string"
        ? ((error as { code?: string }).code ?? "")
        : "";

    if (code === "23505") {
      return NextResponse.json(
        { message: "A site visit request already exists with these details." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your site visit request.",
      },
      { status: 500 }
    );
  }
}

// ─── GET /api/site-visits?page=1&pageSize=50 ─────────────────────────────────
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? 50)));

    const result = await fetchSiteVisits({ page, pageSize });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch site visits.",
      },
      { status: 500 }
    );
  }
}

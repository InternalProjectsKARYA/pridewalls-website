import { NextResponse } from "next/server";
import {
  type LeadPayload,
  type StoredLead,
  isValidEmail,
  isValidMobileNumber,
  saveLeadToSupabase,
} from "@/lib/plot-leads";

// Extend LeadPayload to accept optional preferredContact and projectInterest fields
type LeadsAPIPayload = LeadPayload & {
  preferredContact?: string;
  projectInterest?: string;
};

function toTitleCase(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/(^|[\s-/])([a-z])/g, (_, prefix: string, char: string) => {
      return `${prefix}${char.toUpperCase()}`;
    });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadsAPIPayload;

    const name = payload.name ? toTitleCase(payload.name) : "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const mobile = payload.mobile?.trim() ?? "";
    const message = payload.message?.trim() ?? "";
    const consent = payload.consent === true;
    const preferredContact = payload.preferredContact?.trim() ?? "";

    // interestedIn is optional — fall back to projectInterest, then a generic label
    const rawInterest =
      payload.interestedIn?.trim() || payload.projectInterest?.trim() || "";
    const interestedIn = rawInterest ? toTitleCase(rawInterest) : "General Enquiry";

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { message: "Name, email, and mobile number are required." },
        { status: 400 }
      );
    }

    if (message && message.length > 2000) {
      return NextResponse.json(
        { message: "Message is too long (max 2000 characters)." },
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
        { message: "Consent is required before submission." },
        { status: 400 }
      );
    }

    const nextLead: StoredLead = {
      name,
      email,
      mobile,
      interestedIn,
      message,
      consent,
      ...(preferredContact ? { preferredContact } : {}),
      submittedAt: new Date().toISOString(),
    };

    await saveLeadToSupabase(nextLead);

    return NextResponse.json(
      { message: "Lead captured successfully." },
      { status: 201 }
    );
  } catch (error) {
    const errorCode =
      typeof (error as { code?: unknown } | null)?.code === "string"
        ? ((error as { code?: string }).code ?? "")
        : "";

    if (errorCode === "23505") {
      return NextResponse.json(
        {
          message:
            "A lead already exists with this email or mobile number. Please use different details.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to capture the lead at the moment.",
      },
      { status: 500 }
    );
  }
}

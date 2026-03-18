import { NextResponse } from "next/server";
import {
  type LeadPayload,
  type StoredLead,
  findDuplicateLead,
  isValidEmail,
  isValidMobileNumber,
  saveLeadToSupabase,
} from "@/lib/plot-leads";

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
    const payload = (await request.json()) as LeadPayload;

    const name = payload.name ? toTitleCase(payload.name) : "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const mobile = payload.mobile?.trim() ?? "";
    const interestedIn = payload.interestedIn ? toTitleCase(payload.interestedIn) : "";
    const message = payload.message?.trim() ?? "";
    const consent = payload.consent === true;

    if (!name || !email || !mobile || !interestedIn) {
      return NextResponse.json(
        {
          message:
            "Name, email, mobile number, and property interest are required.",
        },
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
        {
          message: "Please enter a valid mobile number.",
        },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { message: "Consent is required before submission." },
        { status: 400 }
      );
    }

    const duplicateLeadField = await findDuplicateLead(email, mobile);

    if (duplicateLeadField === "email") {
      return NextResponse.json(
        {
          message:
            "A user already exists with this email. Please sign up with another email.",
        },
        { status: 409 }
      );
    }

    if (duplicateLeadField === "mobile") {
      return NextResponse.json(
        {
          message:
            "A user already exists with this mobile number. Please sign up with another mobile number.",
        },
        { status: 409 }
      );
    }

    const nextLead: StoredLead = {
      name,
      email,
      mobile,
      interestedIn,
      message,
      consent,
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

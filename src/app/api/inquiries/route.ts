import { NextResponse } from "next/server";
import {
  type InquiryPayload,
  type StoredInquiry,
  type InquiryType,
  type InquiryStatus,
  isValidEmail,
  isValidMobileNumber,
  saveInquiry,
  validateInquiryPayload,
  toTitleCase,
  fetchInquiries,
} from "@/lib/inquiries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? 50)));
    const type = searchParams.get("type") as InquiryType | null;
    const status = searchParams.get("status") as InquiryStatus | null;

    // Validate type if provided
    if (type && !["LEAD", "SITE_VISIT"].includes(type)) {
      return NextResponse.json(
        { message: "Invalid inquiry type. Must be LEAD or SITE_VISIT." },
        { status: 400 }
      );
    }

    // Validate status if provided
    const validStatuses: InquiryStatus[] = [
      "NEW",
      "CONTACTED",
      "FOLLOW_UP",
      "SITE_VISIT_SCHEDULED",
      "SITE_VISIT_COMPLETED",
      "CONVERTED",
      "LOST",
      "CANCELLED",
    ];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status." },
        { status: 400 }
      );
    }

    const result = await fetchInquiries({ page, pageSize, type: type ?? undefined, status: status ?? undefined });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch inquiries.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;

    // Validate the payload
    const validation = validateInquiryPayload(payload);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.errors.join(" ") },
        { status: 400 }
      );
    }

    const name = payload.name ? toTitleCase(payload.name) : "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const mobile = payload.mobile?.trim() ?? "";
    const consent = payload.consent === true;

    // Common fields
    const interestedIn = payload.interestedIn?.trim() ?? "";
    const submittedAt = new Date().toISOString();

    // Type-specific fields
    let message = "";
    let preferredContact = "";
    let projectName = "";
    let preferredDate = "";
    let preferredSlot = "";
    let notes = "";
    let source = "";

    if (payload.type === "LEAD") {
      message = payload.message?.trim() ?? "";
      preferredContact = payload.preferredContact?.trim() ?? "";
    } else if (payload.type === "SITE_VISIT") {
      projectName = payload.projectName?.trim() ?? "";
      preferredDate = payload.preferredDate?.trim() ?? "";
      preferredSlot = payload.preferredSlot?.trim() ?? "";
      notes = payload.notes?.trim() ?? "";
      source = payload.source?.trim() ?? "";
    }

    const inquiry: StoredInquiry = {
      name,
      email,
      mobile,
      inquiry_type: payload.type,
      status: "NEW",
      interested_in: interestedIn || "General Enquiry",
      consent,
      submitted_at: submittedAt,
      ...(message ? { message } : {}),
      ...(preferredContact ? { preferred_contact: preferredContact } : {}),
      ...(projectName ? { project_name: projectName } : {}),
      ...(preferredDate ? { preferred_date: preferredDate } : {}),
      ...(preferredSlot ? { preferred_slot: preferredSlot } : {}),
      ...(notes ? { notes } : {}),
      ...(source ? { source } : {}),
    };

    await saveInquiry(inquiry);

    const successMessage =
      payload.type === "LEAD"
        ? "Enquiry captured successfully."
        : "Your visit request has been received. Our team will confirm shortly.";

    return NextResponse.json(
      { message: successMessage },
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
            "An inquiry already exists with this email or mobile number. Please use different details.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit the inquiry at the moment.",
      },
      { status: 500 }
    );
  }
}
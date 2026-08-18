import { NextResponse } from "next/server";
import {
  type EnquiryPayload,
  type StoredEnquiry,
  type EnquiryType,
  type EnquiryStatus,
  saveEnquiry,
  validateEnquiryPayload,
  toTitleCase,
  fetchEnquiries,
} from "@/lib/enquiries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(
      100,
      Math.max(1, Number(searchParams.get("pageSize") ?? 50))
    );

    const type = searchParams.get("type") as EnquiryType | null;
    const status = searchParams.get("status") as EnquiryStatus | null;

    // =========================================================================
    // Validate enquiry type if provided
    // =========================================================================

    const validEnquiryTypes: EnquiryType[] = [
      "property_enquiry",
      "site_visit_request",
    ];

    if (type && !validEnquiryTypes.includes(type)) {
      return NextResponse.json(
        {
          message:
            "Invalid enquiry type. Must be property_enquiry or site_visit_request.",
        },
        { status: 400 }
      );
    }

    // =========================================================================
    // Validate enquiry status if provided
    // =========================================================================

    const validStatuses: EnquiryStatus[] = [
      "new",
      "contacted",
      "follow_up",
      "site_visit_scheduled",
      "site_visit_completed",
      "converted",
      "lost",
      "cancelled",
    ];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid enquiry status." },
        { status: 400 }
      );
    }

    // =========================================================================
    // Fetch enquiries
    // =========================================================================

    const result = await fetchEnquiries({
      page,
      pageSize,
      type: type ?? undefined,
      status: status ?? undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch enquiries.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // =========================================================================
    // Parse request payload
    // =========================================================================

    const payload = (await request.json()) as EnquiryPayload;

    // =========================================================================
    // Validate payload
    // =========================================================================

    const validation = validateEnquiryPayload(payload);

    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.errors.join(" ") },
        { status: 400 }
      );
    }

    // =========================================================================
    // Normalize common customer fields
    // =========================================================================

    const name = payload.name ? toTitleCase(payload.name) : "";

    const email = payload.email?.trim().toLowerCase() ?? "";

    const mobile = payload.mobile?.trim() ?? "";

    const consent = payload.consent === true;

    // =========================================================================
    // Common enquiry fields
    // =========================================================================

    const propertyInterest =
      payload.propertyInterest?.trim() ?? "";

    const submittedAt = new Date().toISOString();

    // =========================================================================
    // Type-specific fields
    // =========================================================================

    let message = "";
    let preferredContact = "";

    let projectName = "";
    let preferredDate = "";
    let preferredSlot = "";
    let notes = "";
    let source = "";

    // =========================================================================
    // Property Enquiry
    // =========================================================================

    if (payload.type === "property_enquiry") {
      message = payload.message?.trim() ?? "";

      preferredContact =
        payload.preferredContact?.trim() ?? "";
    }

    // =========================================================================
    // Site Visit Request
    // =========================================================================

    else if (payload.type === "site_visit_request") {
      projectName = payload.projectName?.trim() ?? "";

      preferredDate =
        payload.preferredDate?.trim() ?? "";

      preferredSlot =
        payload.preferredSlot?.trim() ?? "";

      notes = payload.notes?.trim() ?? "";

      source = payload.source?.trim() ?? "";
    }

    // =========================================================================
    // Build stored enquiry
    // =========================================================================

    const enquiry: StoredEnquiry = {
      name,
      email: email || null,
      mobile,

      enquiry_type: payload.type,

      status: "new",

      property_interest:
        propertyInterest || "General Enquiry",

      consent,

      submitted_at: submittedAt,

      ...(message
        ? {
          message,
        }
        : {}),

      ...(preferredContact
        ? {
          preferred_contact: preferredContact,
        }
        : {}),

      ...(projectName
        ? {
          project_name: projectName,
        }
        : {}),

      ...(preferredDate
        ? {
          preferred_date: preferredDate,
        }
        : {}),

      ...(preferredSlot
        ? {
          preferred_slot: preferredSlot,
        }
        : {}),

      ...(notes
        ? {
          notes,
        }
        : {}),

      ...(source
        ? {
          source,
        }
        : {}),
    };

    // =========================================================================
    // Save enquiry
    // =========================================================================

    await saveEnquiry(enquiry);

    // =========================================================================
    // Success response
    // =========================================================================

    const successMessage =
      payload.type === "property_enquiry"
        ? "Enquiry captured successfully."
        : "Your site visit request has been received. Our team will confirm shortly.";

    return NextResponse.json(
      {
        message: successMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    // =========================================================================
    // Handle duplicate record
    // =========================================================================

    const errorCode =
      typeof (error as { code?: unknown } | null)?.code === "string"
        ? ((error as { code?: string }).code ?? "")
        : "";

    if (errorCode === "23505") {
      return NextResponse.json(
        {
          message:
            "An enquiry already exists with this email or mobile number. Please use different details.",
        },
        { status: 409 }
      );
    }

    // =========================================================================
    // Handle unexpected errors
    // =========================================================================

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit the enquiry at the moment.",
      },
      { status: 500 }
    );
  }
}
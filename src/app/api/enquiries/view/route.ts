import { NextResponse } from "next/server";
import {
  fetchEnquiriesPage,
  validateViewerPassword,
  type EnquiryType,
} from "@/lib/enquiries";

type ViewEnquiriesPayload = {
  password?: string;
  type?: "ALL" | EnquiryType;
  page?: number;
  pageSize?: number;
};

export async function POST(request: Request) {
  try {
    // =========================================================================
    // Parse request payload
    // =========================================================================

    const payload =
      (await request.json()) as ViewEnquiriesPayload;

    const password =
      payload.password?.trim() ?? "";

    const type =
      payload.type ?? "ALL";

    const page =
      typeof payload.page === "number"
        ? payload.page
        : 1;

    const pageSize =
      typeof payload.pageSize === "number"
        ? payload.pageSize
        : 20;

    // =========================================================================
    // Validate password
    // =========================================================================

    if (!password) {
      return NextResponse.json(
        {
          message:
            "Password is required to view enquiries.",
        },
        { status: 400 }
      );
    }

    // =========================================================================
    // Validate viewer password
    // =========================================================================

    if (!validateViewerPassword(password)) {
      return NextResponse.json(
        {
          message:
            "Incorrect password. Please try again.",
        },
        { status: 401 }
      );
    }

    // =========================================================================
    // Validate enquiry type
    // =========================================================================

    const validEnquiryTypes: EnquiryType[] = [
      "property_enquiry",
      "site_visit_request",
    ];

    if (
      type !== "ALL" &&
      !validEnquiryTypes.includes(type)
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid enquiry type. Must be ALL, property_enquiry, or site_visit_request.",
        },
        { status: 400 }
      );
    }

    // =========================================================================
    // Convert ALL to undefined
    // =========================================================================

    const enquiryType =
      type === "ALL"
        ? undefined
        : type;

    // =========================================================================
    // Fetch enquiries
    // =========================================================================

    const result =
      await fetchEnquiriesPage({
        page,
        pageSize,
        type: enquiryType,
      });

    // =========================================================================
    // Return response
    // =========================================================================

    return NextResponse.json(
      result,
      { status: 200 }
    );
  } catch (error) {
    // =========================================================================
    // Handle unexpected errors
    // =========================================================================

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch enquiries right now.",
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import {
  fetchInquiriesPage,
  validateViewerPassword,
  type InquiryType,
} from "@/lib/inquiries";

type ViewInquiriesPayload = {
  password?: string;
  type?: "ALL" | InquiryType;
  page?: number;
  pageSize?: number;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ViewInquiriesPayload;
    const password = payload.password?.trim() ?? "";
    const type = payload.type ?? "ALL";
    const page = typeof payload.page === "number" ? payload.page : 1;
    const pageSize = typeof payload.pageSize === "number" ? payload.pageSize : 20;

    if (!password) {
      return NextResponse.json(
        { message: "Password is required to view inquiries." },
        { status: 400 }
      );
    }

    if (!validateViewerPassword(password)) {
      return NextResponse.json(
        { message: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Validate type
    if (type !== "ALL" && !["LEAD", "SITE_VISIT"].includes(type)) {
      return NextResponse.json(
        { message: "Invalid inquiry type. Must be ALL, LEAD, or SITE_VISIT." },
        { status: 400 }
      );
    }

    const inquiryType = type === "ALL" ? undefined : type;
    const result = await fetchInquiriesPage({ page, pageSize, type: inquiryType });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch inquiries right now.",
      },
      { status: 500 }
    );
  }
}
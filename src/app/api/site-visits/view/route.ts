import { NextResponse } from "next/server";
import { fetchSiteVisits } from "@/lib/site-visits";

type ViewSiteVisitsPayload = {
  password?: string;
  page?: number;
  pageSize?: number;
};

const viewPassword = process.env.PLOTS_VIEW_PASSWORD;

function validatePassword(password: string) {
  if (!viewPassword) {
    throw new Error("View password is not configured. Add PLOTS_VIEW_PASSWORD to .env.local.");
  }
  return password === viewPassword;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ViewSiteVisitsPayload;
    const password = payload.password?.trim() ?? "";
    const page = typeof payload.page === "number" ? payload.page : 1;
    const pageSize = typeof payload.pageSize === "number" ? payload.pageSize : 10;

    if (!password) {
      return NextResponse.json(
        { message: "Password is required to view site visits." },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { message: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const result = await fetchSiteVisits({ page, pageSize });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch site visits right now.",
      },
      { status: 500 }
    );
  }
}

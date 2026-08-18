import type { Metadata } from "next";
import InquiriesViewer from "@/components/landingpage/InquiriesViewer";

export const metadata: Metadata = {
  title: "Enquiries · Admin",
  description: "Protected enquiries dashboard for reviewing contact submissions and site visit requests.",
  robots: { index: false, follow: false },
};

export default function InquiriesPage() {
  return <InquiriesViewer />;
}

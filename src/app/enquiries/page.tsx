import type { Metadata } from "next";
import EnquiriesViewer from "@/components/landingpage/EnquiriesViewer";

export const metadata: Metadata = {
  title: "Enquiries · Admin",
  description: "Protected enquiries dashboard for reviewing contact submissions and site visit requests.",
  robots: { index: false, follow: false },
};

export default function InquiriesPage() {
  return <EnquiriesViewer />;
}

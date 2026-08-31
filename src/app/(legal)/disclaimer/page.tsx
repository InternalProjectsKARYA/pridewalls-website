import type { Metadata } from "next";
import LegalPage from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important information about PRIDEWALLS website content, project visuals, availability and property decisions.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal centre"
      title="Disclaimer"
      updated="29 June 2026"
      intro="This website is designed to help you explore PRIDEWALLS projects and services. Please use it as a starting point, and verify all decision-critical information directly with an authorised representative."
      summary={[
        "Website content is for general information and is not legal, financial, investment, or technical advice.",
        "Renderings, layouts, maps, and amenity visuals may be indicative and can differ from the finished development.",
        "Pricing, availability, approvals, and timelines must be confirmed for the specific project and unit.",
        "Independent due diligence is essential before making a property decision.",
      ]}
      sections={[
        {
          title: "General information only",
          paragraphs: [
            "The content on this website is provided for general informational purposes. It is not legal, financial, tax, investment, architectural, engineering, or other professional advice.",
            "Property decisions are significant and personal. You should obtain advice from qualified professionals and carry out independent due diligence appropriate to your circumstances before making any decision.",
          ],
        },
        {
          title: "Project details and availability",
          paragraphs: [
            "Project names, descriptions, plans, sizes, amenities, specifications, pricing, payment terms, offers, availability, possession estimates, and other details may be changed, withdrawn, or updated without prior notice.",
            "Availability and commercial terms are not confirmed until communicated by an authorised PRIDEWALLS representative and, where applicable, recorded in the relevant transaction documents.",
          ],
          note: "Please ask for the latest project-specific information, approvals, and documents before relying on any website content.",
        },
        {
          title: "Images, plans, and visual material",
          paragraphs: [
            "Photographs, renderings, illustrations, maps, sample interiors, floor plans, master plans, and amenity images are intended to convey a general impression. They may be artistic impressions, stock imagery, or representative depictions.",
            "Actual views, finishes, dimensions, landscaping, common areas, fixtures, materials, and development features may vary based on design refinement, availability, approvals, site conditions, and other factors.",
          ],
        },
        {
          title: "Approvals and regulatory information",
          paragraphs: [
            "References to approvals, registrations, or compliance are subject to the particulars of each project. Visitors should verify current approvals, statutory disclosures, registration details, and any project-specific conditions through official documentation and authorised channels.",
            "Nothing on this website should be understood as a substitute for reviewing the documents applicable to the property you are considering.",
          ],
        },
        {
          title: "No offer or representation",
          paragraphs: [
            "This website does not constitute an offer, invitation to offer, promise, warranty, guarantee, or representation that a particular property, price, feature, or timeline will be available.",
            "A request for information, callback, brochure, or site visit does not create a booking, allotment, sale, agency relationship, or contractual obligation.",
          ],
        },
        {
          title: "External links and third-party content",
          paragraphs: [
            "For convenience, the website may link to third-party websites, mapping tools, social platforms, or other services. PRIDEWALLS does not control and is not responsible for their content, accuracy, availability, security, or privacy practices.",
            "Any dealings with third parties are between you and the relevant provider.",
          ],
        },
        {
          title: "Limitation and updates",
          paragraphs: [
            "While we aim to keep website information useful and current, we do not guarantee that it is complete, accurate, or suitable for every purpose. To the extent permitted by law, PRIDEWALLS is not liable for losses arising from reliance on this website alone.",
            "We may revise this disclaimer at any time. Please review this page periodically; the last-updated date shows when it was most recently revised.",
          ],
        },
      ]}
    />
  );
}

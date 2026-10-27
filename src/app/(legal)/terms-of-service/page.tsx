import type { Metadata } from "next";
import LegalPage from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the PRIDEWALLS website, project information, enquiry forms and site-visit requests.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal centre"
      title="Terms of Service"
      updated="29 June 2026"
      intro="These terms set out the ground rules for using the PRIDEWALLS website. They are intended to keep information, enquiries, and site-visit requests clear and reliable for everyone."
      summary={[
        "Website information is illustrative and may change; confirm important details with an authorised representative.",
        "An enquiry or site-visit request is not a booking, allotment, or purchase agreement.",
        "Use the website lawfully and do not interfere with its security or operation.",
        "Final property terms are governed by the relevant official documents and agreements.",
      ]}
      sections={[
        {
          title: "Acceptance and scope",
          paragraphs: [
            "By accessing or using this website, you agree to these Terms of Service and to our Privacy Policy. If you do not agree, please do not use the website or submit information through it.",
            "These terms apply to website content, project listings, enquiry forms, site-visit requests, and other digital interactions provided by PRIDEWALLS through this website.",
          ],
        },
        {
          title: "Permitted use",
          paragraphs: ["You may use the website to learn about PRIDEWALLS projects and services, request information, and contact us for legitimate personal or business purposes."],
          bullets: [
            "Do not use the website in a way that is unlawful, misleading, fraudulent, or harmful to another person.",
            "Do not attempt to disrupt, probe, bypass, or compromise the website, its forms, systems, or security controls.",
            "Do not submit false, incomplete, or misleading contact details, or use automated means to submit forms without our written permission.",
            "Do not copy, scrape, republish, or commercially exploit content except as allowed by applicable law or with our written permission.",
          ],
        },
        {
          title: "Project information",
          paragraphs: [
            "Project descriptions, plans, floor layouts, renderings, amenities, location references, pricing, offers, availability, approvals, specifications, and timelines are provided for general information and may change without notice.",
            "Images and illustrations may be artistic impressions or representative examples. They should not be treated as a representation, warranty, or contractual commitment. Please obtain current, project-specific information from an authorised PRIDEWALLS representative before making a decision.",
          ],
          note: "Nothing on this website creates an offer capable of acceptance, a promise of allotment, or an obligation to sell or purchase a property.",
        },
        {
          title: "Enquiries and site visits",
          paragraphs: [
            "Submitting an enquiry or site-visit request lets us contact you about your stated interest. It does not reserve a unit, secure a price, create a brokerage relationship, or constitute an application, booking, or purchase agreement.",
            "Site visits are subject to availability and confirmation by our team. Please verify the project, date, time, and any access requirements before travelling.",
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "The PRIDEWALLS name, logos, website design, text, images, plans, videos, graphics, and other content are owned by or licensed to PRIDEWALLS and are protected by applicable intellectual-property laws.",
            "You may view and download content for your personal, non-commercial reference. Any other reproduction, modification, distribution, display, or use requires our prior written permission.",
          ],
        },
        {
          title: "Third-party links",
          paragraphs: [
            "The website may contain links to third-party sites, maps, communication platforms, or social channels for convenience. We do not control those services and are not responsible for their content, availability, security, or privacy practices.",
            "Your use of a third-party service is governed by that service's own terms and policies.",
          ],
        },
        {
          title: "Disclaimers and liability",
          paragraphs: [
            "The website is provided on an 'as is' and 'as available' basis. To the extent permitted by law, PRIDEWALLS does not guarantee that the website will always be uninterrupted, error-free, secure, or free from harmful components.",
            "To the extent permitted by law, PRIDEWALLS will not be liable for losses arising from use of, inability to use, or reliance on this website or its content. This does not limit liability that cannot lawfully be excluded.",
          ],
        },
        {
          title: "Changes and governing terms",
          paragraphs: [
            "We may update these terms from time to time. Continued use of the website after an update means you accept the revised terms. The last-updated date above indicates the latest version.",
            "Any property transaction is subject to the specific documents, approvals, disclosures, and agreements issued for that transaction. If there is a conflict between these website terms and those documents, the transaction documents will govern.",
          ],
        },
      ]}
    />
  );
}

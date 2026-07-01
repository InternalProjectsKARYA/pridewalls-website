import LegalPage from '@/components/common/LegalPage';

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="29 June 2026"
      intro="These terms govern your use of the PRIDEWALLS website, project information, enquiry forms, and site visit request features."
      sections={[
        {
          title: 'Website Use',
          body: 'You agree to use this website only for lawful purposes and not to interfere with its operation, security, forms, APIs, or content delivery.',
        },
        {
          title: 'Project Information',
          body: 'Project details, amenities, images, plans, prices, availability, approvals, and timelines are provided for general information and may change without prior notice. Final details are subject to official documents and agreements.',
        },
        {
          title: 'Enquiries and Site Visits',
          body: 'Submitting an enquiry or site visit request does not create a booking, allotment, reservation, or purchase obligation. Our team will contact you to verify details and confirm next steps.',
        },
        {
          title: 'Intellectual Property',
          body: 'The PRIDEWALLS name, logo, website design, content, and media are owned by or licensed to PRIDEWALLS. You may not copy, reproduce, or reuse them without written permission.',
        },
        {
          title: 'Limitation of Liability',
          body: 'PRIDEWALLS is not responsible for losses arising from reliance on website content alone. Please verify all project, legal, financial, and regulatory information before making purchase decisions.',
        },
      ]}
    />
  );
}

import LegalPage from '@/components/common/LegalPage';

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclaimer"
      updated="29 June 2026"
      intro="This website is intended to provide general information about PRIDEWALLS projects and services."
      sections={[
        {
          title: 'General Information Only',
          body: 'Content on this website is not legal, financial, investment, or technical advice. Buyers should conduct independent due diligence before making decisions.',
        },
        {
          title: 'Images and Visuals',
          body: 'Images, renderings, layouts, amenities, and maps may be indicative or representational. Actual development, specifications, views, and finishes may vary.',
        },
        {
          title: 'Approvals and Availability',
          body: 'Approvals, pricing, unit availability, specifications, and possession timelines are subject to change and should be confirmed with authorized PRIDEWALLS representatives.',
        },
        {
          title: 'External Links',
          body: 'This website may link to third-party websites or services. PRIDEWALLS is not responsible for their content, accuracy, security, or privacy practices.',
        },
      ]}
    />
  );
}

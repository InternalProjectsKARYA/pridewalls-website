import LegalPage from '@/components/common/LegalPage';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="29 June 2026"
      intro="PRIDEWALLS respects your privacy. This policy explains how we collect, use, and protect enquiry, site visit, and communication details shared through this website."
      sections={[
        {
          title: 'Information We Collect',
          body: 'We may collect your name, phone number, email address, property interest, preferred contact method, message, site visit preference, and basic technical information needed to operate and secure the website.',
        },
        {
          title: 'How We Use Information',
          body: 'We use submitted information to respond to enquiries, schedule site visits, share project updates, provide customer support, improve our services, and maintain records required for legitimate business operations.',
        },
        {
          title: 'Sharing and Disclosure',
          body: 'We do not sell personal information. We may share relevant details with authorized PRIDEWALLS team members, service providers, or advisors only when needed to fulfil your request, operate the website, or comply with applicable law.',
        },
        {
          title: 'Data Security',
          body: 'We use reasonable administrative and technical safeguards to protect submitted information. No online system can be guaranteed fully secure, so please avoid submitting sensitive financial or identity documents through general enquiry forms.',
        },
        {
          title: 'Your Choices',
          body: 'You may request correction, deletion, or withdrawal from promotional communication by contacting us at info@pridewalls.com. Transactional or service-related communication may continue where required.',
        },
      ]}
    />
  );
}

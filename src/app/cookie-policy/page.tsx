import LegalPage from '@/components/common/LegalPage';

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="29 June 2026"
      intro="This cookie policy explains how PRIDEWALLS may use cookies and similar technologies to keep the website functional, secure, and useful."
      sections={[
        {
          title: 'What Cookies Are',
          body: 'Cookies are small files stored by your browser. They can help remember preferences, support forms, understand site usage, and improve performance.',
        },
        {
          title: 'Types We May Use',
          body: 'We may use essential cookies for website operation, analytics cookies to understand page performance, and preference cookies to improve your browsing experience.',
        },
        {
          title: 'Third-Party Services',
          body: 'Embedded maps, analytics, media, or communication tools may set their own cookies according to their privacy and cookie policies.',
        },
        {
          title: 'Managing Cookies',
          body: 'You can control or delete cookies in your browser settings. Blocking some cookies may affect forms, embedded maps, or other website features.',
        },
      ]}
    />
  );
}

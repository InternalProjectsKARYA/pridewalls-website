import type { Metadata } from "next";
import LegalPage from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PRIDEWALLS collects, uses, stores and protects personal information shared through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal centre"
      title="Privacy Policy"
      updated="29 June 2026"
      intro="We respect the trust you place in PRIDEWALLS when you contact us. This policy explains what information we collect through this website, why we use it, and the choices available to you."
      summary={[
        "We use enquiry details to respond to your request and arrange property conversations or site visits.",
        "We do not sell your personal information.",
        "You can ask us to update, delete, or stop promotional use of your information.",
        "Please do not send financial, identity, or other sensitive documents through website forms.",
      ]}
      sections={[
        {
          title: "Scope of this policy",
          paragraphs: [
            "This policy applies to information collected through the PRIDEWALLS website, including project enquiries, callback requests, site-visit requests, and communications you initiate using contact details published on the website.",
            "It does not govern third-party websites, platforms, or services that may be linked from our website. Those services operate under their own policies.",
          ],
        },
        {
          title: "Information we collect",
          paragraphs: ["The information we collect depends on the way you interact with us. We ask only for details that are relevant to responding to your request or operating the website."],
          bullets: [
            "Contact and enquiry details, such as your name, mobile number, email address, preferred contact method, property interest, project selection, and message.",
            "Site-visit details, such as your preferred date, time slot, and any notes you choose to share.",
            "Technical information that browsers commonly send, such as device, browser, approximate usage, and log information used to secure and improve the site.",
          ],
          note: "Our forms do not require you to submit payment-card details, government identity documents, or financial records. Please do not include them in free-text fields.",
        },
        {
          title: "How we use your information",
          paragraphs: ["We use personal information only for legitimate business purposes connected with your interaction with PRIDEWALLS."],
          bullets: [
            "To respond to enquiries, provide requested project information, and schedule or confirm site visits.",
            "To follow up on an enquiry, offer customer support, and maintain an accurate record of communications.",
            "To improve website performance, protect against misuse, and understand which content is useful to visitors.",
            "To send project updates or promotional communications where you have consented or where permitted by applicable law. You may opt out of promotional messages at any time.",
          ],
        },
        {
          title: "When we share information",
          paragraphs: [
            "We do not sell, rent, or trade personal information. Access is limited to authorised PRIDEWALLS personnel and service providers who need it to perform work on our behalf, such as hosting, customer relationship management, communications, or professional support.",
            "We may also use or disclose information where necessary to comply with law, respond to a valid legal process, protect our rights and property, or address fraud or security concerns.",
          ],
        },
        {
          title: "Security and retention",
          paragraphs: [
            "We use reasonable technical and organisational safeguards designed to protect information from unauthorised access, alteration, disclosure, or loss. Where applicable, enquiry data is stored using protective controls.",
            "No internet transmission or storage system can be guaranteed completely secure. We retain information only for as long as reasonably necessary for the purpose described in this policy, to manage our relationship with you, or to meet legal and record-keeping obligations.",
          ],
        },
        {
          title: "Your choices and requests",
          paragraphs: [
            "You may ask us to correct inaccurate information, withdraw consent for promotional communications, or request deletion of information that we no longer need to retain.",
            "To help protect your information, we may need to verify your identity before completing a request. Some information may need to be retained where required by law or for legitimate record-keeping purposes.",
          ],
        },
        {
          title: "Changes and contact",
          paragraphs: [
            "We may update this policy as our website, services, or legal obligations change. The date at the top of this page shows when it was last revised.",
            "For a privacy question or request, email sales@pridewalls.com with a clear description of your request and the contact details you used with us.",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import LegalPage from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How PRIDEWALLS uses cookies and similar technologies on its website.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal centre"
      title="Cookie Policy"
      updated="29 June 2026"
      intro="This policy explains how cookies and similar technologies may be used on the PRIDEWALLS website, and how you can control them through your browser."
      summary={[
        "Cookies help websites remember settings, protect forms, and understand site performance.",
        "You can control or delete cookies through your browser settings.",
        "Blocking certain cookies can affect features such as forms, maps, or embedded content.",
        "Third-party services may use their own cookies under their own policies.",
      ]}
      sections={[
        {
          title: "What cookies are",
          paragraphs: [
            "Cookies are small text files placed on your device when you visit a website. Similar technologies, such as local storage, pixels, and tags, may also be used to remember information or understand how a website is used.",
            "Cookies do not normally give us direct access to your device or to information you have not chosen to share.",
          ],
        },
        {
          title: "Why we may use them",
          paragraphs: ["We may use cookies and similar technologies to make the website functional, reliable, secure, and easier to use."],
          bullets: [
            "Essential functions, such as maintaining site security and supporting form interactions.",
            "Preferences, such as remembering settings that improve your browsing experience.",
            "Performance and analytics, such as understanding pages that are visited, technical errors, and how we can improve the website.",
            "Embedded services, such as maps, videos, social media, or communication tools, where these are enabled on the website.",
          ],
        },
        {
          title: "Types of cookies",
          paragraphs: ["Cookies may be session cookies, which expire when you close your browser, or persistent cookies, which remain for a defined period or until you delete them."],
          bullets: [
            "Strictly necessary cookies are used to provide core functions and protect the website.",
            "Preference cookies remember choices that make future visits more convenient.",
            "Analytics cookies help us understand aggregate website use and performance.",
            "Third-party cookies may be set by services you choose to interact with, such as embedded content providers.",
          ],
        },
        {
          title: "Third-party services",
          paragraphs: [
            "Some pages may include content or features from third parties. If you interact with an embedded map, video, social widget, or external link, that provider may collect information or set cookies in accordance with its own policies.",
            "We encourage you to review the privacy and cookie information of any third-party service you use.",
          ],
        },
        {
          title: "Your cookie controls",
          paragraphs: [
            "Most browsers allow you to view, block, delete, or limit cookies through their settings. The method varies by browser and device, so please refer to your browser's help section for current instructions.",
            "If you disable or block all cookies, some parts of the website may not work as intended. For example, forms, preference settings, embedded maps, or other interactive features may be affected.",
          ],
        },
        {
          title: "Updates and contact",
          paragraphs: [
            "We may revise this Cookie Policy as the website or the technologies we use change. We will post the updated version here and revise the date at the top of this page.",
            "If you have a question about cookies or similar technologies on this website, contact us at sales@pridewalls.com.",
          ],
        },
      ]}
    />
  );
}

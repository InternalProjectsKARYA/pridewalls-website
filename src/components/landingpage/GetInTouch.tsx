"use client";

import { Send, Phone, Mail, MessageSquare, MapPin, Clock } from "lucide-react";
import { useMemo, useState, type ComponentPropsWithoutRef, type FormEvent } from "react";
import { companyInfo } from "@/lib/project-data";

type InterestType =
  | ""
  | "Villas"
  | "Open Plots"
  | "Apartments"
  | "Other";

type PreferredContact = "phone" | "email" | "whatsapp";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [interestType, setInterestType] = useState<InterestType>("");
  const [otherInterest, setOtherInterest] = useState("");
  const [preferredContact, setPreferredContact] = useState<PreferredContact>("phone");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const interestedIn = (() => {
    if (!interestType) return "";
    if (interestType !== "Other") return interestType;
    return otherInterest.trim();
  })();

  const mapEmbedUrl = useMemo(() => {
    const encoded = encodeURIComponent(companyInfo.contact.address.trim());
    return `https://www.google.com/maps?q=${encoded}&output=embed`;
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMobile = mobile.trim();
    const safeMessage = message.trim();

    if (!safeName || !safeEmail || !safeMobile || !interestedIn) {
      setErrorMessage(
        "Please enter your name, email, mobile number, and what you're interested in."
      );
      return;
    }

    if (!consent) {
      setErrorMessage("Please provide consent before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: safeName,
          email: safeEmail,
          mobile: safeMobile,
          interestedIn,
          preferredContact,
          message: safeMessage,
          consent: true,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your details.");
      }

      setSuccessMessage(result.message || "Thanks! We will contact you soon.");
      setName("");
      setEmail("");
      setMobile("");
      setInterestType("");
      setOtherInterest("");
      setPreferredContact("phone");
      setMessage("");
      setConsent(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[linear-gradient(180deg,rgba(244,238,229,0.88),rgba(246,241,234,0.4)_48%,rgba(246,241,234,0.92))] py-[4.5rem] lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Get In Touch</span>
          <h2 className="mt-5 text-4xl text-foreground sm:text-5xl">
            Let’s talk about the property journey you are planning next
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Reach out for project comparisons, site-visit coordination, pricing
            guidance, or a conversation about which Pridewalls property type
            fits your goals best.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-5">
            <div className="estate-panel rounded-[2rem] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7a2430]/10 text-[#7a2430]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                    Office Address
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {companyInfo.contact.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard
                icon={<Phone className="h-5 w-5" />}
                label="Call us"
                value={companyInfo.contact.phone[0]}
                href={`tel:${companyInfo.contact.phone[0]}`}
              />
              <InfoCard
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={companyInfo.contact.email[0]}
                href={`mailto:${companyInfo.contact.email[0]}`}
              />
            </div>

            <div className="estate-panel rounded-[2rem] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d8b37a]/18 text-[#8b6c45]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c45]">
                    Office Hours
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {companyInfo.contact.officeHours}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#d9cdc0] bg-white shadow-[0_26px_50px_rgba(59,37,28,0.08)]">
              <iframe
                src={mapEmbedUrl}
                title="Pridewalls office location"
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="estate-panel rounded-[2rem] p-6 shadow-[0_32px_60px_rgba(59,37,28,0.08)] sm:p-8"
          >
            <div className="rounded-[1.5rem] border border-[#dfd1c3] bg-white/70 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                Buyer Enquiry
              </p>
              <h3 className="mt-3 text-3xl text-foreground">
                Share a few details and we will guide you from there
              </h3>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <FieldLabel>Name *</FieldLabel>
                <Input
                  id="lead-name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  disabled={isSubmitting}
                />
              </label>

              <label className="space-y-2">
                <FieldLabel>Email *</FieldLabel>
                <Input
                  id="lead-email"
                  placeholder="Enter email address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <FieldLabel>Mobile Number *</FieldLabel>
                <Input
                  id="lead-mobile"
                  placeholder="Enter mobile number"
                  type="tel"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  autoComplete="tel"
                  disabled={isSubmitting}
                />
              </label>

              <label className="space-y-2">
                <FieldLabel>Interested In *</FieldLabel>
                <select
                  id="lead-interest"
                  value={interestType}
                  onChange={(event) => {
                    setInterestType(event.target.value as InterestType);
                    setOtherInterest("");
                  }}
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-2xl border border-[#d9cdc0] bg-white px-4 text-sm text-foreground outline-none transition focus:border-[#b9985a] focus:ring-2 focus:ring-[#b9985a]/20"
                >
                  <option value="">Select</option>
                  <option value="Villas">Villas</option>
                  <option value="Open Plots">Open Plots</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            {interestType === "Other" ? (
              <label className="mt-4 block space-y-2">
                <FieldLabel>Other Interest *</FieldLabel>
                <Input
                  id="lead-other-interest"
                  placeholder="Tell us what you're interested in"
                  value={otherInterest}
                  onChange={(event) => setOtherInterest(event.target.value)}
                  disabled={isSubmitting}
                />
              </label>
            ) : null}

            <div className="mt-4">
              <FieldLabel>Preferred Contact Method</FieldLabel>
              <div className="mt-3 flex flex-wrap gap-3">
                {([
                  { value: "phone" as const, icon: Phone, label: "Phone" },
                  { value: "email" as const, icon: Mail, label: "Email" },
                  { value: "whatsapp" as const, icon: MessageSquare, label: "WhatsApp" },
                ] as const).map((method) => (
                  <label
                    key={method.value}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition ${
                      preferredContact === method.value
                        ? "border-[#7a2430] bg-[#7a2430] text-white"
                        : "border-[#d9cdc0] bg-white text-[#4e4037] hover:border-[#b9985a] hover:text-[#7a2430]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method.value}
                      checked={preferredContact === method.value}
                      onChange={() => setPreferredContact(method.value)}
                      disabled={isSubmitting}
                      className="sr-only"
                    />
                    <method.icon className="h-4 w-4" />
                    {method.label}
                  </label>
                ))}
              </div>
            </div>

            <label className="mt-4 block space-y-2">
              <FieldLabel>Message</FieldLabel>
              <Textarea
                id="lead-message"
                placeholder="Tell us about your location preference, budget, or preferred property type..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={isSubmitting}
              />
            </label>

            <label className="mt-5 flex items-start gap-3 rounded-[1.5rem] border border-[#d9cdc0] bg-white/70 px-4 py-4 text-sm leading-7 text-[#5b4b42]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                disabled={isSubmitting}
                className="mt-1 h-4 w-4 accent-[#7a2430]"
              />
              <span>
                I agree to be contacted by Pridewalls regarding this enquiry and
                understand that the team may suggest suitable projects based on
                the information shared.
              </span>
            </label>

            {errorMessage ? (
              <p className="mt-4 rounded-[1.5rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="mt-4 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#7a2430] px-5 text-sm font-semibold text-white transition hover:bg-[#69202a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send size={18} />
              {isSubmitting ? "Submitting..." : "Send Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
      {children}
    </span>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="estate-panel flex items-start gap-4 rounded-[2rem] p-5 transition hover:-translate-y-0.5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7a2430]/10 text-[#7a2430]">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
          {label}
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{value}</p>
      </div>
    </a>
  );
}

function Input({
  placeholder,
  type = "text",
  ...props
}: {
  placeholder: string;
  type?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "placeholder">) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-12 w-full rounded-2xl border border-[#d9cdc0] bg-white px-4 text-sm text-foreground outline-none transition focus:border-[#b9985a] focus:ring-2 focus:ring-[#b9985a]/20"
      {...props}
    />
  );
}

function Textarea({
  placeholder,
  ...props
}: {
  placeholder: string;
} & Omit<ComponentPropsWithoutRef<"textarea">, "placeholder">) {
  return (
    <textarea
      rows={5}
      placeholder={placeholder}
      className="w-full rounded-[1.5rem] border border-[#d9cdc0] bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#b9985a] focus:ring-2 focus:ring-[#b9985a]/20"
      {...props}
    />
  );
}

"use client";

import { Send, Phone, Mail, MessageSquare } from "lucide-react";
import { useState, type ComponentPropsWithoutRef, type FormEvent } from "react";

type InterestType =
  | ""
  | "Villas"
  | "Open Plots"
  | "Apartments"
  | "Commercial"
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMobile = mobile.trim();
    const safeMessage = message.trim();

    if (!safeName || !safeEmail || !safeMobile || !interestedIn ) {
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
      className="w-full py-20 bg-gradient-to-b from-muted/40 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">
            Get In Touch With <span className="text-brand-gold">Us</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-brand-gold to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur border shadow-card">
              <h3 className="font-semibold text-lg mb-3 text-brand-gold">
                HYDERABAD OFFICE
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Plot No: 19/B, 4th Floor, Progressive Towers,
                <br />
                Jaihind Enclave, 100 Feet Road, Ayyappa Society,
                <br />
                Madhapur, Hyderabad - 500081.
              </p>

              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <p>Phone: +91 70364 45500</p>
                <p className="pt-1">info@pridewalls.com</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-2xl bg-white border shadow-lg space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-1">
                  <span className="text-sm font-medium text-foreground">
                    Name <span className="text-destructive">*</span>
                  </span>
                  <Input
                    id="lead-name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </span>
                  <Input
                    id="lead-email"
                    placeholder="Enter email address"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              <label className="space-y-1">
                <span className="text-sm font-medium text-foreground">
                  Mobile Number <span className="text-destructive">*</span>
                </span>
                <Input
                  id="lead-mobile"
                  placeholder="Enter mobile number"
                  type="tel"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  autoComplete="tel"
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-foreground">
                  Interested In <span className="text-destructive">*</span>
                </span>
                <select
                  id="lead-interest"
                  value={interestType}
                  onChange={(event) => {
                    setInterestType(event.target.value as InterestType);
                    setOtherInterest("");
                  }}
                  aria-required="true"
                  disabled={isSubmitting}
                  className="h-12 w-full px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                >
                  <option value="">Select</option>
                  <option value="Villas">Villas</option>
                  <option value="Open Plots">Open Plots</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              {interestType === "Other" ? (
                <label className="space-y-1">
                  <span className="text-sm font-medium text-foreground">
                    Other Interest <span className="text-destructive">*</span>
                  </span>
                  <Input
                    id="lead-other-interest"
                    placeholder="Tell us what you're interested in"
                    value={otherInterest}
                    onChange={(event) => setOtherInterest(event.target.value)}
                    disabled={isSubmitting}
                  />
                </label>
              ) : null}

              <div className="space-y-1">
                <span className="text-sm font-medium text-foreground">
                  Preferred Contact Method
                </span>
                <div className="flex flex-wrap gap-3 pt-1">
                  {([
                    { value: "phone" as const, icon: Phone, label: "Phone Call" },
                    { value: "email" as const, icon: Mail, label: "Email" },
                    { value: "whatsapp" as const, icon: MessageSquare, label: "WhatsApp" },
                  ] as const).map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                        preferredContact === method.value
                          ? "border-brand-gold bg-brand-gold/5"
                          : "border-border hover:border-brand-gold/50"
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
                      <span className="text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="space-y-1">
                <span className="text-sm font-medium text-foreground">
                  Message
                </span>
                <Textarea
                  id="lead-message"
                  placeholder="Tell us about your requirements..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={isSubmitting}
                />
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  disabled={isSubmitting}
                  className="mt-1 h-4 w-4 accent-brand-gold"
                />
                <span>I agree to be contacted by PRIDEWALLS about this enquiry.</span>
              </label>

              {errorMessage ? (
                <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorMessage}
                </p>
              ) : null}

              {successMessage ? (
                <p className="rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
                  {successMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-hover text-white font-semibold hover:scale-[1.02] transition shadow-[0_10px_25px_rgba(13,38,89,0.12)] disabled:opacity-70 disabled:hover:scale-100"
              >
                <Send size={18} />
                {isSubmitting ? "Submitting..." : "Get In Touch"}
              </button>
            </form>
          </div>

          <div className="relative h-200 rounded-2xl overflow-hidden shadow-xl border">
            <iframe
              src="https://www.google.com/maps?q=Progressive+Towers,+100+Feet+Road,+Ayyappa+Society,+Madhapur,+Hyderabad+500081&z=16&output=embed&hl=en"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing PRIDEWALLS office location in Madhapur, Hyderabad"
            />
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Progressive+Towers%2C+100+Feet+Road%2C+Ayyappa+Society%2C+Madhapur%2C+Hyderabad+500081"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-primary-dark"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
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
      className="h-12 w-full px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
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
      rows={4}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
      {...props}
    />
  );
}

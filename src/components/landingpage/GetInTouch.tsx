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
      className="w-full py-20 bg-gradient-to-b from-[#fff5f6] to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">
            Get In Touch With <span className="text-[#c42630]">Us</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#c42630] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur border shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-[#c42630]">
                HYDERABAD OFFICE
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Plot No: 19/B, 4th Floor, Progressive Towers,
                <br />
                Jaihind Enclave, 100 Feet Road, Ayyappa Society, ,
                <br />
                Madhapur, Hyderabad- 500081.
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-600">
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
                  <span className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-600">*</span>
                  </span>
                  <Input
                    id="lead-name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-600">*</span>
                  </span>
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

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">
                  Mobile Number <span className="text-red-600">*</span>
                </span>
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

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">
                  Interested In <span className="text-red-600">*</span>
                </span>
                <select
                  id="lead-interest"
                  value={interestType}
                  onChange={(event) => {
                    setInterestType(event.target.value as InterestType);
                    setOtherInterest("");
                  }}
                  disabled={isSubmitting}
                  className="h-12 w-full px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#c42630]/40"
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
                  <span className="text-sm font-medium text-gray-700">
                    Other Interest <span className="text-red-600">*</span>
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
                <span className="text-sm font-medium text-gray-700">
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
                          ? "border-[#c42630] bg-[#c42630]/5"
                          : "border-gray-200 hover:border-[#c42630]/50"
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
                <span className="text-sm font-medium text-gray-700">
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

              <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  disabled={isSubmitting}
                  className="mt-1 h-4 w-4 accent-[#c42630]"
                />
                <span>I agree to be contacted by Pridewalls about this enquiry.</span>
              </label>

              {errorMessage ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </p>
              ) : null}

              {successMessage ? (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white font-semibold hover:scale-[1.02] transition shadow-[0_10px_25px_rgba(196,38,48,0.35)] disabled:opacity-70 disabled:hover:scale-100"
              >
                <Send size={18} />
                {isSubmitting ? "SUBMITTING..." : "GET IN TOUCH"}
              </button>
            </form>
          </div>

          <div className="relative h-200 rounded-2xl overflow-hidden shadow-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2193.1565800134977!2d78.38806349526911!3d17.45274661195516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91005f5ce709%3A0xc1f2e0646b78f7ed!2sKaryahub%20Solutions!5e1!3m2!1sen!2sin!4v1772012440540!5m2!1sen!2sin%22"
              className="w-full h-full border-0"
              loading="lazy"
            />
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
      className="h-12 w-full px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#c42630]/40"
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
      className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#c42630]/40"
      {...props}
    />
  );
}

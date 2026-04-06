'use client';

import { useState, type FormEvent } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Loader2,
  PhoneCall,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const interestOptions = [
  'Open Plots',
  'Villas',
  'Apartments',
  'Commercial',
  'Other',
] as const;

const visitSlots = ['Morning', 'Afternoon', 'Evening', 'Weekend'] as const;

type VisitSlot = (typeof visitSlots)[number];

type SiteVisitForm = {
  name: string;
  email: string;
  mobile: string;
  interestType: (typeof interestOptions)[number] | '';
  otherInterest: string;
  preferredDate: string;
  preferredSlot: VisitSlot;
  notes: string;
  consent: boolean;
};

type SiteVisitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneHref: string;
  whatsappHref: string;
  sourceLabel?: string;
  projectName?: string;
};

const initialSiteVisitForm: SiteVisitForm = {
  name: '',
  email: '',
  mobile: '',
  interestType: '',
  otherInterest: '',
  preferredDate: '',
  preferredSlot: 'Weekend',
  notes: '',
  consent: false,
};

const fieldClassName =
  'h-12 rounded-xl border border-[#d9cdc0] bg-white text-[#2d1f1f] shadow-none placeholder:text-[#8d7b79] focus-visible:border-[#b9985a] focus-visible:ring-[#b9985a]/20';

const sectionClassName =
  'rounded-2xl border border-[#d9cdc0] bg-white p-4 shadow-[0_10px_30px_rgba(58,30,30,0.04)] sm:p-5';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidIndianMobileNumber(mobile: string) {
  const normalizedMobile = mobile.replace(/[\s()-]/g, '');
  return /^(?:\+?91|91|0)?[6-9]\d{9}$/.test(normalizedMobile);
}

function getLocalDateInputValue() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split('T')[0];
}

export default function SiteVisitDialog({
  open,
  onOpenChange,
  phoneHref,
  whatsappHref,
  sourceLabel = 'Landing page site visit request.',
  projectName,
}: SiteVisitDialogProps) {
  const [siteVisitForm, setSiteVisitForm] = useState<SiteVisitForm>(
    initialSiteVisitForm
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const today = getLocalDateInputValue();

  const updateField = <K extends keyof SiteVisitForm>(
    field: K,
    value: SiteVisitForm[K]
  ) => {
    setSiteVisitForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const resetState = () => {
    setSiteVisitForm(initialSiteVisitForm);
    setIsSubmitting(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleDialogChange = (nextOpen: boolean) => {
    if (!nextOpen && !isSubmitting) {
      resetState();
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    const name = siteVisitForm.name.trim();
    const email = siteVisitForm.email.trim();
    const mobile = siteVisitForm.mobile.trim();
    const otherInterest = siteVisitForm.otherInterest.trim();
    const notes = siteVisitForm.notes.trim();
    const selectedInterest =
      siteVisitForm.interestType === 'Other'
        ? otherInterest
        : siteVisitForm.interestType;

    if (!name || !email || !mobile || !selectedInterest) {
      setErrorMessage(
        'Please enter your name, email, mobile number, and property interest.'
      );
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!isValidIndianMobileNumber(mobile)) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }

    if (!siteVisitForm.preferredDate) {
      setErrorMessage('Please select your preferred visit date.');
      return;
    }

    if (!siteVisitForm.consent) {
      setErrorMessage('Please provide consent before requesting a site visit.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/site-visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          interestedIn: selectedInterest,
          projectName: projectName ?? '',
          preferredDate: siteVisitForm.preferredDate,
          preferredSlot: siteVisitForm.preferredSlot,
          notes,
          sourceLabel,
          consent: true,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || 'Unable to book the site visit.');
      }

      setSuccessMessage(
        result.message ||
        'Your site visit request has been received. Our team will confirm shortly.'
      );
      setSiteVisitForm(initialSiteVisitForm);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to book the site visit.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden rounded-3xl border border-[#d9cdc0] bg-[linear-gradient(180deg,#fffdfc_0%,#f6efe6_100%)] p-0 text-[#2d1f1f] shadow-[0_24px_80px_rgba(30,16,16,0.18)] sm:max-w-2xl [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:border [&>[data-slot=dialog-close]]:border-[#d9cdc0] [&>[data-slot=dialog-close]]:bg-white [&>[data-slot=dialog-close]]:p-2 [&>[data-slot=dialog-close]]:text-[#6c5756] [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]]:shadow-sm [&>[data-slot=dialog-close]]:hover:bg-[#f6efee] [&>[data-slot=dialog-close]]:hover:text-[#2d1f1f]">
        <div className="max-h-[92vh] overflow-y-auto">
          <div className="border-b border-[#d9cdc0] bg-[linear-gradient(180deg,#f6efe6_0%,#f3eadf_100%)] px-5 py-5 sm:px-6">
            <DialogHeader className="text-left">
              <div className="mb-2 inline-flex w-fit rounded-full bg-[#7a2430]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                Book a Visit
              </div>
              <DialogTitle className="text-2xl font-semibold text-[#2d1f1f] sm:text-[28px]">
                Schedule Your Site Visit
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-[#6c5756]">
                Fill in your details and preferred timing. Our team will contact
                you to confirm the visit.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            {successMessage ? (
              <div className="space-y-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-semibold text-[#2d1f1f]">
                    Visit Request Submitted
                  </h4>
                  <p className="text-sm leading-6 text-[#6c5756]">
                    {successMessage}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessMessage('');
                      setErrorMessage('');
                      setSiteVisitForm(initialSiteVisitForm);
                    }}
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-[#eadfdd] bg-white px-4 font-medium text-[#2d1f1f] transition hover:bg-[#f6efee]"
                  >
                    Book Another Visit
                  </button>

                  <a
                    href={phoneHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7a2430] px-4 font-semibold text-white transition hover:bg-[#69202a]"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call to Confirm
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-2xl border border-[#eadfdd] bg-white px-4 py-3 text-sm text-[#6c5756]">
                  Choose your preferred property type, date, and time slot. We
                  will contact you to confirm the visit and answer any immediate
                  questions.
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className={sectionClassName}>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#2d1f1f]">
                        Your Details
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-[#8d7b79]">
                        We use these details to confirm your visit.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="site-visit-name"
                          className="text-[13px] font-medium text-[#3f2d2d]"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="site-visit-name"
                          value={siteVisitForm.name}
                          onChange={(event) =>
                            updateField('name', event.target.value)
                          }
                          placeholder="Enter your full name"
                          disabled={isSubmitting}
                          className={fieldClassName}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="site-visit-mobile"
                          className="text-[13px] font-medium text-[#3f2d2d]"
                        >
                          Mobile Number *
                        </Label>
                        <Input
                          id="site-visit-mobile"
                          type="tel"
                          value={siteVisitForm.mobile}
                          onChange={(event) =>
                            updateField('mobile', event.target.value)
                          }
                          placeholder="Enter your mobile number"
                          disabled={isSubmitting}
                          className={fieldClassName}
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label
                        htmlFor="site-visit-email"
                        className="text-[13px] font-medium text-[#3f2d2d]"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="site-visit-email"
                        type="email"
                        value={siteVisitForm.email}
                        onChange={(event) =>
                          updateField('email', event.target.value)
                        }
                        placeholder="Enter your email address"
                        disabled={isSubmitting}
                        className={fieldClassName}
                      />
                    </div>
                  </div>

                  <div className={sectionClassName}>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#2d1f1f]">
                        Visit Preferences
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-[#8d7b79]">
                        Tell us what you want to see and when you are available.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="site-visit-interest"
                          className="text-[13px] font-medium text-[#3f2d2d]"
                        >
                          Interested In *
                        </Label>
                        <div className="relative">
                          <select
                            id="site-visit-interest"
                            value={siteVisitForm.interestType}
                            onChange={(event) => {
                              const nextValue = event.target.value as
                                SiteVisitForm['interestType'];

                              updateField('interestType', nextValue);

                              if (nextValue !== 'Other') {
                                updateField('otherInterest', '');
                              }
                            }}
                            disabled={isSubmitting}
                            className={`${fieldClassName} w-full appearance-none pr-11 text-sm pl-3`}
                          >
                            <option value="" className="text-black">
                              Select a property type
                            </option>
                            {interestOptions.map((option) => (
                              <option
                                key={option}
                                value={option}
                                className="text-black"
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d7b79]" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="site-visit-date"
                          className="text-[13px] font-medium text-[#3f2d2d]"
                        >
                          Preferred Date *
                        </Label>
                        <Input
                          id="site-visit-date"
                          type="date"
                          min={today}
                          value={siteVisitForm.preferredDate}
                          onChange={(event) =>
                            updateField('preferredDate', event.target.value)
                          }
                          disabled={isSubmitting}
                          className={`${fieldClassName} scheme-light`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={sectionClassName}>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#2d1f1f]">
                        Timing and Notes
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-[#8d7b79]">
                        Add any specific preferences before submitting.
                      </p>
                    </div>

                    {siteVisitForm.interestType === 'Other' ? (
                      <div className="space-y-2">
                        <Label
                          htmlFor="site-visit-other-interest"
                          className="text-[13px] font-medium text-[#3f2d2d]"
                        >
                          Tell Us What You Want To Visit *
                        </Label>
                        <Input
                          id="site-visit-other-interest"
                          value={siteVisitForm.otherInterest}
                          onChange={(event) =>
                            updateField('otherInterest', event.target.value)
                          }
                          placeholder="Example: premium villa plots near ORR"
                          disabled={isSubmitting}
                          className={fieldClassName}
                        />
                      </div>
                    ) : null}

                    <div className="mt-4 space-y-2">
                      <Label className="text-[13px] font-medium text-[#3f2d2d]">
                        Preferred Time Slot *
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {visitSlots.map((slot) => {
                          const isActive = siteVisitForm.preferredSlot === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => updateField('preferredSlot', slot)}
                              disabled={isSubmitting}
                              className={`inline-flex min-h-12 items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                isActive
                                  ? 'border-[#7a2430] bg-[#f3e5e7] text-[#7a2430]'
                                  : 'border-[#d9cdc0] bg-white text-[#6c5756] hover:bg-[#f6efee]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label
                        htmlFor="site-visit-notes"
                        className="text-[13px] font-medium text-[#3f2d2d]"
                      >
                        Additional Notes
                      </Label>
                      <Textarea
                        id="site-visit-notes"
                        value={siteVisitForm.notes}
                        onChange={(event) => updateField('notes', event.target.value)}
                        placeholder="Share pickup needs, project preference, or any questions for the sales team."
                        disabled={isSubmitting}
                        className="min-h-32 rounded-2xl border border-[#d9cdc0] bg-white text-[#2d1f1f] shadow-none placeholder:text-[#8d7b79] focus-visible:border-[#b9985a] focus-visible:ring-[#b9985a]/20"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 rounded-2xl border border-[#eadfdd] bg-[#fffafa] px-4 py-4 text-sm leading-6 text-[#6c5756]">
                    <input
                      type="checkbox"
                      checked={siteVisitForm.consent}
                      onChange={(event) =>
                        updateField('consent', event.target.checked)
                      }
                      disabled={isSubmitting}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#7a2430]"
                    />
                    <span>
                      I agree to be contacted by Pridewalls to confirm and
                      coordinate this site visit request.
                    </span>
                  </label>

                  {errorMessage ? (
                    <p
                      aria-live="polite"
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {errorMessage}
                    </p>
                  ) : null}

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7a2430] px-5 font-semibold text-white transition hover:bg-[#69202a] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4" />
                          Confirm Site Visit
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

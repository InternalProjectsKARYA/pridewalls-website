'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Loader2,
  PhoneCall,
  X,
  MapPin,
  Building,
  Home,
  LandPlot,
  Store,
  Clock,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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

type FieldErrors = {
  name?: string;
  mobile?: string;
  email?: string;
  interestType?: string;
  otherInterest?: string;
  preferredDate?: string;
  preferredSlot?: string;
  consent?: string;
};

type SiteVisitDrawerProps = {
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
  'h-12 rounded-xl border border-border bg-white text-foreground shadow-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20';

const sectionClassName =
  'rounded-2xl border border-border bg-white p-4 shadow-card sm:p-5';

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

const interestIcons: Record<string, React.ReactNode> = {
  'Open Plots': <LandPlot className="h-4 w-4" />,
  'Villas': <Home className="h-4 w-4" />,
  'Apartments': <Building className="h-4 w-4" />,
  'Commercial': <Store className="h-4 w-4" />,
  'Other': <MapPin className="h-4 w-4" />,
};

export default function SiteVisitDrawer({
  open,
  onOpenChange,
  phoneHref,
  whatsappHref,
  sourceLabel = 'Landing page schedule visit request.',
  projectName,
}: SiteVisitDrawerProps) {
  const [siteVisitForm, setSiteVisitForm] = useState<SiteVisitForm>(
    initialSiteVisitForm
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const today = getLocalDateInputValue();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

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
    setFieldErrors({});
  };

  const handleDrawerChange = (nextOpen: boolean) => {
    if (!nextOpen && !isSubmitting) {
      resetState();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    const name = siteVisitForm.name.trim();
    const email = siteVisitForm.email.trim();
    const mobile = siteVisitForm.mobile.trim();
    const otherInterest = siteVisitForm.otherInterest.trim();
    const notes = siteVisitForm.notes.trim();
    const selectedInterest =
      siteVisitForm.interestType === 'Other'
        ? otherInterest
        : siteVisitForm.interestType;

    // Client-side validation with clear error messages
    let hasErrors = false;
    const newFieldErrors: FieldErrors = {};

    if (!name) {
      newFieldErrors.name = 'Please enter your full name.';
      hasErrors = true;
    }

    if (!mobile) {
      newFieldErrors.mobile = 'Please enter your mobile number.';
      hasErrors = true;
    } else if (!isValidIndianMobileNumber(mobile)) {
      newFieldErrors.mobile = 'Please enter a valid 10-digit mobile number.';
      hasErrors = true;
    }

    if (!selectedInterest) {
      newFieldErrors.interestType = 'Please select the property type you are interested in.';
      hasErrors = true;
    }

    if (siteVisitForm.interestType === 'Other' && !otherInterest) {
      newFieldErrors.otherInterest = 'Please tell us what you want to visit.';
      hasErrors = true;
    }

    // Validate email if provided
    if (email && !isValidEmail(email)) {
      newFieldErrors.email = 'Please enter a valid email address.';
      hasErrors = true;
    }

    if (!siteVisitForm.preferredDate) {
      newFieldErrors.preferredDate = 'Please select your preferred visit date.';
      hasErrors = true;
    }

    if (!siteVisitForm.consent) {
      newFieldErrors.consent = 'Please provide your consent to be contacted for scheduling this visit.';
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(newFieldErrors);
      setErrorMessage('Please fix the errors above and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'site_visit_request',
          name,
          email,
          mobile,
          interestedIn: selectedInterest,
          projectName: projectName ?? '',
          preferredDate: siteVisitForm.preferredDate,
          preferredSlot: siteVisitForm.preferredSlot,
          notes,
          source: sourceLabel,
          consent: true,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || 'Unable to schedule the visit.');
      }

      setSuccessMessage(
        'Your site visit request has been received! Our team will contact you shortly to confirm the appointment.'
      );
      setSiteVisitForm(initialSiteVisitForm);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to schedule the visit.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        onClick={() => handleDrawerChange(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-visit-drawer-title"
      >
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 h-full w-full max-w-130 bg-white shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-white/95 backdrop-blur-sm px-5 py-4 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h2 id="site-visit-drawer-title" className="text-xl font-semibold text-foreground">
                  Schedule a Visit
                </h2>
                <p className="text-sm text-muted-foreground">
                  Explore the property in person
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDrawerChange(false)}
              disabled={isSubmitting}
              className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:opacity-50"
              aria-label="Close schedule visit drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            {successMessage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-semibold text-foreground">
                    Visit Request Submitted
                  </h4>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {successMessage}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSuccessMessage('');
                      setErrorMessage('');
                      setSiteVisitForm(initialSiteVisitForm);
                    }}
                    className="h-12"
                  >
                    Book Another Visit
                  </Button>

                  <a
                    href={phoneHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold-hover px-4 font-semibold text-white transition"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call to Confirm
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.form
                id="site-visit-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5 pb-4"
              >
                <div className="rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted-foreground">
                  Choose your preferred property type, date, and time slot. We
                  will contact you to confirm the visit and answer any immediate
                  questions.
                </div>

                {/* Your Details Section */}
                <div className={sectionClassName}>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-gold" />
                      Your Details
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      We use these details to confirm your visit.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="site-visit-name"
                        className="text-[13px] font-medium text-foreground"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="site-visit-name"
                        value={siteVisitForm.name}
                        onChange={(event) => {
                          updateField('name', event.target.value);
                          if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                        className={`${fieldClassName} ${fieldErrors.name ? 'border-destructive focus-visible:border-destructive' : ''}`}
                        aria-invalid={fieldErrors.name ? 'true' : 'false'}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      />
                      {fieldErrors.name && (
                        <p id="name-error" className="text-sm text-destructive">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="site-visit-mobile"
                        className="text-[13px] font-medium text-foreground"
                      >
                        Mobile Number *
                      </Label>
                      <Input
                        id="site-visit-mobile"
                        type="tel"
                        value={siteVisitForm.mobile}
                        onChange={(event) => {
                          updateField('mobile', event.target.value);
                          if (fieldErrors.mobile) setFieldErrors(prev => ({ ...prev, mobile: undefined }));
                        }}
                        placeholder="Enter your mobile number"
                        disabled={isSubmitting}
                        className={`${fieldClassName} ${fieldErrors.mobile ? 'border-destructive focus-visible:border-destructive' : ''}`}
                        aria-invalid={fieldErrors.mobile ? 'true' : 'false'}
                        aria-describedby={fieldErrors.mobile ? 'mobile-error' : undefined}
                      />
                      {fieldErrors.mobile && (
                        <p id="mobile-error" className="text-sm text-destructive">{fieldErrors.mobile}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label
                      htmlFor="site-visit-email"
                      className="text-[13px] font-medium text-foreground"
                    >
                      Email Address (Optional)
                    </Label>
                    <Input
                      id="site-visit-email"
                      type="email"
                      value={siteVisitForm.email}
                      onChange={(event) => {
                        updateField('email', event.target.value);
                        if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      placeholder="Enter your email address (optional)"
                      disabled={isSubmitting}
                      className={`${fieldClassName} ${fieldErrors.email ? 'border-destructive focus-visible:border-destructive' : ''}`}
                      aria-invalid={fieldErrors.email ? 'true' : 'false'}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="text-sm text-destructive">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Visit Preferences Section */}
                <div className={sectionClassName}>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-brand-gold" />
                      Visit Preferences
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Tell us what you want to see and when you are available.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="site-visit-interest"
                        className="text-[13px] font-medium text-foreground"
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
                            if (fieldErrors.interestType) setFieldErrors(prev => ({ ...prev, interestType: undefined }));

                            if (nextValue !== 'Other') {
                              updateField('otherInterest', '');
                            }
                          }}
                          disabled={isSubmitting}
                          className={`${fieldClassName} w-full appearance-none pr-11 text-sm pl-3 ${fieldErrors.interestType ? 'border-destructive focus-visible:border-destructive' : ''}`}
                          aria-invalid={fieldErrors.interestType ? 'true' : 'false'}
                          aria-describedby={fieldErrors.interestType ? 'interest-error' : undefined}
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
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      {fieldErrors.interestType && (
                        <p id="interest-error" className="text-sm text-destructive">{fieldErrors.interestType}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="site-visit-date"
                        className="text-[13px] font-medium text-foreground"
                      >
                        Preferred Date *
                      </Label>
                      <Input
                        id="site-visit-date"
                        type="date"
                        min={today}
                        value={siteVisitForm.preferredDate}
                        onChange={(event) => {
                          updateField('preferredDate', event.target.value);
                          if (fieldErrors.preferredDate) setFieldErrors(prev => ({ ...prev, preferredDate: undefined }));
                        }}
                        disabled={isSubmitting}
                        className={`${fieldClassName} scheme-light ${fieldErrors.preferredDate ? 'border-destructive focus-visible:border-destructive' : ''}`}
                        aria-invalid={fieldErrors.preferredDate ? 'true' : 'false'}
                        aria-describedby={fieldErrors.preferredDate ? 'date-error' : undefined}
                      />
                      {fieldErrors.preferredDate && (
                        <p id="date-error" className="text-sm text-destructive">{fieldErrors.preferredDate}</p>
                      )}
                    </div>
                  </div>

                  {siteVisitForm.interestType === 'Other' ? (
                    <div className="mt-4 space-y-2">
                      <Label
                        htmlFor="site-visit-other-interest"
                        className="text-[13px] font-medium text-foreground"
                      >
                        Tell Us What You Want To Visit *
                      </Label>
                      <Input
                        id="site-visit-other-interest"
                        value={siteVisitForm.otherInterest}
                        onChange={(event) => {
                          updateField('otherInterest', event.target.value);
                          if (fieldErrors.otherInterest) setFieldErrors(prev => ({ ...prev, otherInterest: undefined }));
                        }}
                        placeholder="Example: premium villa plots near ORR"
                        disabled={isSubmitting}
                        className={`${fieldClassName} ${fieldErrors.otherInterest ? 'border-destructive focus-visible:border-destructive' : ''}`}
                        aria-invalid={fieldErrors.otherInterest ? 'true' : 'false'}
                        aria-describedby={fieldErrors.otherInterest ? 'other-interest-error' : undefined}
                      />
                      {fieldErrors.otherInterest && (
                        <p id="other-interest-error" className="text-sm text-destructive">{fieldErrors.otherInterest}</p>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Timing and Notes Section */}
                <div className={sectionClassName}>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4 text-brand-gold" />
                      Timing and Notes
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Add any specific preferences before submitting.
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label className="text-[13px] font-medium text-foreground">
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
                                ? 'border-brand-gold bg-brand-gold/10 text-primary'
                                : 'border-border bg-white text-muted-foreground hover:bg-accent'
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
                      className="text-[13px] font-medium text-foreground"
                    >
                      Additional Notes
                    </Label>
                    <Textarea
                      id="site-visit-notes"
                      value={siteVisitForm.notes}
                      onChange={(event) => updateField('notes', event.target.value)}
                      placeholder="Share pickup needs, project preference, or any questions for the sales team."
                      disabled={isSubmitting}
                      className="min-h-32 rounded-2xl border border-border bg-white text-foreground shadow-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Consent */}
                <label className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm leading-6 text-muted-foreground ${fieldErrors.consent ? 'border-destructive bg-destructive/10' : 'border-border bg-muted/40'}`}>
                  <input
                    type="checkbox"
                    checked={siteVisitForm.consent}
                    onChange={(event) => {
                      updateField('consent', event.target.checked);
                      if (fieldErrors.consent) setFieldErrors(prev => ({ ...prev, consent: undefined }));
                    }}
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 shrink-0 accent-brand-gold"
                    aria-invalid={fieldErrors.consent ? 'true' : 'false'}
                    aria-describedby={fieldErrors.consent ? 'consent-error' : undefined}
                  />
                  <span>
                    I agree to be contacted by PRIDEWALLS to confirm and
                    coordinate this visit request.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p id="consent-error" className="text-sm text-destructive -mt-3">{fieldErrors.consent}</p>
                )}

                {errorMessage ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    aria-live="polite"
                    className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    {errorMessage}
                  </motion.p>
                ) : null}
              </motion.form>
            )}
          </div>

          {/* Sticky Footer with Submit Button */}
          {!successMessage && (
            <div className="sticky bottom-0 border-t border-border bg-white/95 backdrop-blur-sm px-5 py-4 sm:px-6">
              <Button
                type="submit"
                form="site-visit-form"
                disabled={isSubmitting}
                size="lg"
                className="w-full h-12 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Schedule a Visit
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
      </AnimatePresence>
  );
}
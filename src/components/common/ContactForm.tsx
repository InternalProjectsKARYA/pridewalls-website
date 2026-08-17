'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { EnquiryFormData } from '@/lib/project-interface';

interface ContactFormProps {
  projectName?: string;
  showProjectSelect?: boolean;
}

type QuickInterest = 'Apartment' | 'Villa' | 'Plot' | 'Commercial';

const quickInterests: QuickInterest[] = [
  'Apartment',
  'Villa',
  'Plot',
  'Commercial',
];

export default function ContactForm({ projectName, showProjectSelect = true }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<QuickInterest | ''>('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectInterest: projectName || '',
      interestedIn: '',
      message: '',
      preferredContact: 'phone',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          mobile: data.phone,
          interestedIn: selectedInterest || data.interestedIn,
          consent: true,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: 'Success!',
          description: 'Your enquiry has been submitted. We will contact you soon.',
        });
        setSelectedInterest('');
        reset();
      } else {
        throw new Error('Failed to submit enquiry');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit your enquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 "
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          Your enquiry has been submitted successfully. Our team will contact you shortly.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Submit Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Step 1: Name & Mobile - minimal friction */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name', { required: 'Name is required' })}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Mobile Number *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your mobile number"
          aria-required="true"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit phone number',
            },
          })}
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && (
          <p id="phone-error" className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Step 2: Quick interest selection */}
      <div className="space-y-2">
        <Label>What are you interested in?</Label>
        <div className="grid grid-cols-2 gap-2">
          {quickInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => setSelectedInterest(interest)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                selectedInterest === interest
                  ? 'border-brand-gold bg-brand-gold/10 text-primary'
                  : 'border-border bg-white text-muted-foreground hover:border-brand-primary/40 hover:bg-brand-primary/5'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Optional: Email (hidden behind a toggle for low friction) */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address (optional)</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email (optional)"
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-hover text-white font-semibold hover:scale-[1.02] transition shadow-[0_10px_25px_rgba(13,38,89,0.12)]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Get Project Details
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}
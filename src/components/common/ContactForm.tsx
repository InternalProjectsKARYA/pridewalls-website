'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { projects } from '@/lib/project-data';
import { EnquiryFormData } from '@/lib/project-interface';

interface ContactFormProps {
  projectName?: string;
  showProjectSelect?: boolean;
}

const inputClassName =
  'h-12 rounded-2xl border border-[#d9cdc0] bg-white text-sm text-foreground shadow-none placeholder:text-[#8b7a70] focus-visible:border-[#b9985a] focus-visible:ring-[#b9985a]/20';

export default function ContactForm({
  projectName,
  showProjectSelect = true,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
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
          consent: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setIsSuccess(true);
      toast({
        title: 'Success!',
        description: 'Your enquiry has been submitted. We will contact you soon.',
      });
      setSelectedInterest('');
      reset();
    } catch {
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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-10 text-center"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-3xl text-foreground">Thank you</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Your enquiry has been shared with the team. We will get in touch
          shortly with the next steps.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-6 rounded-full border-[#d9cdc0] bg-white hover:bg-[#f5eee5]"
        >
          Submit Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
          Full Name *
        </Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          {...register('name', { required: 'Name is required' })}
          className={`${inputClassName} ${errors.name ? 'border-destructive' : ''}`}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`${inputClassName} ${errors.email ? 'border-destructive' : ''}`}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit phone number',
              },
            })}
            className={`${inputClassName} ${errors.phone ? 'border-destructive' : ''}`}
          />
          {errors.phone ? (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          ) : null}
        </div>
      </div>

      {showProjectSelect ? (
        <div className="space-y-2">
          <Label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
            Project Interest
          </Label>
          <Select
            onValueChange={(value) => setValue('projectInterest', value)}
            defaultValue={projectName || ''}
          >
            <SelectTrigger className="h-12 rounded-2xl border-[#d9cdc0] bg-white text-sm">
              <SelectValue placeholder="Select a project (optional)" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.name}>
                  {project.name} - {project.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      <div className="space-y-2">
        <Label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
          Interested In
        </Label>
        <Select
          onValueChange={(value) => {
            setSelectedInterest(value);
            setValue('interestedIn', value === 'Other' ? '' : value);
          }}
          value={selectedInterest}
        >
          <SelectTrigger className="h-12 rounded-2xl border-[#d9cdc0] bg-white text-sm">
            <SelectValue placeholder="Select property type (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Villas">Villas</SelectItem>
            <SelectItem value="Open Plots">Open Plots</SelectItem>
            <SelectItem value="Apartments">Apartments</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        {selectedInterest === 'Other' ? (
          <Input
            type="text"
            placeholder="Tell us what you're interested in"
            onChange={(event) => setValue('interestedIn', event.target.value)}
            className={inputClassName}
          />
        ) : null}
      </div>

      <div className="space-y-2">
        <Label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
          Preferred Contact Method
        </Label>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'phone', icon: Phone, label: 'Phone Call' },
            { value: 'email', icon: Mail, label: 'Email' },
            { value: 'whatsapp', icon: MessageSquare, label: 'WhatsApp' },
          ].map((method) => (
            <label
              key={method.value}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-[#d9cdc0] bg-white px-4 py-3 text-sm font-medium text-[#4e4037] transition hover:border-[#b9985a] has-[:checked]:border-[#7a2430] has-[:checked]:bg-[#7a2430] has-[:checked]:text-white"
            >
              <input
                type="radio"
                value={method.value}
                {...register('preferredContact')}
                className="sr-only"
              />
              <method.icon className="h-4 w-4" />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
          Your Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your location preference, budget, or timeline..."
          rows={4}
          {...register('message')}
          className={`rounded-[1.5rem] border-[#d9cdc0] bg-white text-sm focus-visible:border-[#b9985a] focus-visible:ring-[#b9985a]/20 ${errors.message ? 'border-destructive' : ''}`}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-full bg-[#7a2430] text-white hover:bg-[#69202a]"
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
            Submit Enquiry
          </>
        )}
      </Button>

      <p className="text-center text-xs leading-6 text-muted-foreground">
        By submitting this form, you agree to be contacted by Pridewalls about
        your property enquiry.
      </p>
    </form>
  );
}

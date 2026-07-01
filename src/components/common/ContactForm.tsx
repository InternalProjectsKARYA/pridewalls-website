'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';
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

export default function ContactForm({ projectName, showProjectSelect = true }: ContactFormProps) {
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
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          {...register('name', { required: 'Name is required' })}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email & Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
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
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
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
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Project Interest */}
      {showProjectSelect && (
        <div className="space-y-2">
          <Label htmlFor="project">Project Interest</Label>
          <Select
            onValueChange={(value) => setValue('projectInterest', value)}
            defaultValue={projectName || ''}
          >
            <SelectTrigger>
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
      )}

      {/* Interested In */}
      <div className="space-y-2">
        <Label htmlFor="interestedIn">Interested In</Label>
        <Select
          onValueChange={(value) => {
            setSelectedInterest(value);
            if (value !== 'Other') {
              setValue('interestedIn', value);
            } else {
              setValue('interestedIn', '');
            }
          }}
          value={selectedInterest}
        >
          <SelectTrigger>
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
        {selectedInterest === 'Other' && (
          <input
            type="text"
            placeholder="Tell us what you're interested in"
            onChange={(e) => setValue('interestedIn', e.target.value)}
            className="mt-2 h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
          />
        )}
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2">
        <Label>Preferred Contact Method</Label>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'phone', icon: Phone, label: 'Phone Call' },
            { value: 'email', icon: Mail, label: 'Email' },
            { value: 'whatsapp', icon: MessageSquare, label: 'WhatsApp' },
          ].map((method) => (
            <label
              key={method.value}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                errors.preferredContact ? 'border-destructive' : 'border-border'
              } hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5`}
            >
              <input
                type="radio"
                value={method.value}
                {...register('preferredContact')}
                className="sr-only"
              />
              <method.icon className="h-4 w-4" />
              <span className="text-sm">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your requirements..."
          rows={4}
          {...register('message')}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
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
            Submit Enquiry
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}

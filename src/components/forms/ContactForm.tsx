"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations/contact";
import { submitInquiryAction } from "@/actions/inquiries";
import { SiteButton } from "@/components/ui/site-button";
import { MessageSquare, ArrowRight, User, Building, Mail, Phone, MapPin, Tag } from "lucide-react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company_name: "",
      email: "",
      phone: "",
      service: "Select Service",
      location: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormInput) => {
    setSubmitting(true);
    try {
      const serviceVal = values.service === "Select Service" ? "" : values.service;
      const payload = { ...values, service: serviceVal };

      const result = await submitInquiryAction(payload);
      if (!result.success) {
        toast.error(result.error || "Failed to submit inquiry.");
        return;
      }

      toast.success("Inquiry sent successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50 transition-all duration-300 w-full"
    >
      <div className="flex flex-col gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="form-name" className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Full Name *
          </label>
          <input
            id="form-name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
          {errors.name && (
            <p className="ml-1 text-[10px] font-medium text-destructive font-mono">{errors.name.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="form-company" className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Company Name
          </label>
          <input
            id="form-company"
            type="text"
            placeholder="Your Company"
            {...register("company_name")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="form-email" className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Email Address *
          </label>
          <input
            id="form-email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
          {errors.email && (
            <p className="ml-1 text-[10px] font-medium text-destructive font-mono">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="form-phone" className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Phone Number
          </label>
          <input
            id="form-phone"
            type="text"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
          {errors.phone && (
            <p className="ml-1 text-[10px] font-medium text-destructive font-mono">{errors.phone.message}</p>
          )}
        </div>

        {/* Service Interested In */}
        <div className="space-y-2">
          <label htmlFor="form-service" className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Service Category
          </label>
          <div className="relative">
            <select
              id="form-service"
              {...register("service")}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 text-sm text-[#1f2a44] outline-none transition-all duration-200 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10 cursor-pointer appearance-none"
            >
              <option>Select Service</option>
              <option>Civil Construction</option>
              <option>Mechanical</option>
              <option>Facade Engineering</option>
              <option>EPC Projects</option>
              <option>Consultation</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-slate-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Project Location */}
        <div className="space-y-2">
          <label htmlFor="form-location" className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Project Location
          </label>
          <input
            id="form-location"
            type="text"
            placeholder="City, State"
            {...register("location")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="form-message" className="ml-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Project Details & Message *
          </label>
          <textarea
            id="form-message"
            rows={5}
            placeholder="Tell us about your project scale, required timelines, and technical details..."
            {...register("message")}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10 resize-none"
          />
          {errors.message && (
            <p className="ml-1 text-[10px] font-medium text-destructive font-mono">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <SiteButton
            type="submit"
            disabled={submitting}
            variant="primary"
            className="w-full h-14 rounded-2xl shadow-md shadow-[#1a56a8]/25 hover:shadow-lg transition-all duration-200 uppercase tracking-widest text-[13px] font-bold"
          >
            {submitting ? "Sending..." : "Submit"}
          </SiteButton>
        </div>
      </div>
    </form>
  );
}

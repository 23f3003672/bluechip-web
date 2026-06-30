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
      className="relative rounded-[32px] border border-slate-100 bg-white p-8 shadow-xl md:p-12 hover:shadow-2xl hover:border-slate-200/50 transition-all duration-300"
    >
      <div className="absolute right-6 top-6 -z-10 h-24 w-24 rounded-full bg-[#1a56a8]/5 blur-xl" />

      <h3 className="text-2xl font-bold tracking-tight text-[#1f2a44] flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-[#1a56a8]" />
        <span>Request a Consultation</span>
      </h3>
      <p className="mt-2 text-xs text-[#64748b] leading-relaxed">
        Fill out the form below and our engineering estimators will review your requirements.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="form-name" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            <User className="h-3.5 w-3.5 text-slate-400" />
            <span>Full Name *</span>
          </label>
          <input
            id="form-name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
          {errors.name && (
            <p className="text-[10px] font-medium text-destructive font-mono mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="form-company" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            <Building className="h-3.5 w-3.5 text-slate-400" />
            <span>Company Name</span>
          </label>
          <input
            id="form-company"
            type="text"
            placeholder="Your Company"
            {...register("company_name")}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="form-email" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span>Email Address *</span>
          </label>
          <input
            id="form-email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
          {errors.email && (
            <p className="text-[10px] font-medium text-destructive font-mono mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="form-phone" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            <span>Phone Number</span>
          </label>
          <input
            id="form-phone"
            type="text"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
          {errors.phone && (
            <p className="text-[10px] font-medium text-destructive font-mono mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Service Interested In */}
        <div className="space-y-2">
          <label htmlFor="form-service" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            <Tag className="h-3.5 w-3.5 text-slate-400" />
            <span>Service Category</span>
          </label>
          <div className="relative">
            <select
              id="form-service"
              {...register("service")}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#1f2a44] outline-none transition-all duration-200 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10 cursor-pointer appearance-none"
            >
              <option>Select Service</option>
              <option>Civil Construction</option>
              <option>Mechanical</option>
              <option>Facade Engineering</option>
              <option>EPC Projects</option>
              <option>Consultation</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Project Location */}
        <div className="space-y-2">
          <label htmlFor="form-location" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>Project Location</span>
          </label>
          <input
            id="form-location"
            type="text"
            placeholder="City, State"
            {...register("location")}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10"
          />
        </div>

        {/* Message */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="form-message" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
            <span>Project Details & Message *</span>
          </label>
          <textarea
            id="form-message"
            rows={5}
            placeholder="Tell us about your project scale, required timelines, and technical details..."
            {...register("message")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-[#1f2a44] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1a56a8] focus:bg-white focus:ring-2 focus:ring-[#1a56a8]/10 resize-none"
          />
          {errors.message && (
            <p className="text-[10px] font-medium text-destructive font-mono mt-1">{errors.message.message}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-6">
        <p className="text-xs text-[#64748b]">
          We typically respond within 24 business hours.
        </p>

        <SiteButton
          type="submit"
          disabled={submitting}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto shadow-md shadow-[#1a56a8]/25 hover:shadow-lg transition-all duration-200 gap-2 uppercase tracking-wider text-xs font-bold"
        >
          <span>{submitting ? "Sending..." : "Send Inquiry"}</span>
          {!submitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
        </SiteButton>
      </div>
    </form>
  );
}

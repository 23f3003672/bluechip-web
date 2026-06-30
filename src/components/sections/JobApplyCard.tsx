"use client";

import { useState } from "react";
import { SiteButton } from "@/components/ui/site-button";
import { JobApplicationModal } from "@/components/forms/JobApplicationModal";
import { Phone, FileText } from "lucide-react";

interface JobApplyCardProps {
  jobId: string;
  jobTitle: string;
  contactPhone: string;
}

export function JobApplyCard({
  jobId,
  jobTitle,
  contactPhone,
}: JobApplyCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-3xl bg-[#1f2a44] text-white p-6 shadow-md relative overflow-hidden border border-slate-800">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#1a56a8]/20 blur-2xl" />

        <h3 className="text-lg font-bold text-white tracking-tight">How to Apply</h3>
        <p className="mt-3 text-xs leading-relaxed text-slate-300">
          If your credentials align with this opportunity, submit your application using our direct portal.
        </p>

        <div className="mt-6 space-y-4">
          <SiteButton
            onClick={() => setIsOpen(true)}
            variant="light"
            size="lg"
            className="w-full justify-center text-xs font-bold uppercase tracking-wider gap-2 shadow-xs cursor-pointer"
          >
            <FileText className="h-4 w-4 text-[#1a56a8]" />
            <span>Apply Now</span>
          </SiteButton>

          <div className="text-center text-[10px] text-slate-400 font-mono">
            OR CALL RECRUITMENT AT
          </div>

          <a
            href={`tel:${contactPhone.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/40 py-2.5 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-amber-500" />
            <span>{contactPhone}</span>
          </a>
        </div>
      </div>

      <JobApplicationModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        jobId={jobId}
        jobTitle={jobTitle}
      />
    </>
  );
}

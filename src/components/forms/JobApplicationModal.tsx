"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobApplicationSchema, type JobApplicationInput } from "@/lib/validations/career";
import { uploadResumeAction, submitJobApplicationAction } from "@/actions/careers";
import { Loader2, FileUp, FileText, CheckCircle2, X } from "lucide-react";

interface JobApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  jobId?: string | null;
  jobTitle?: string | null;
}

export function JobApplicationModal({
  isOpen,
  onOpenChange,
  jobId = null,
  jobTitle = null,
}: JobApplicationModalProps) {
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema) as Resolver<JobApplicationInput>,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      resume_url: "",
      cover_letter: "",
      job_id: jobId,
    },
  });

  const resumeUrlValue = watch("resume_url");

  // Handle uploading the resume file
  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadResumeAction(formData);
      if (!res.success) {
        toast.error(res.error || "Failed to upload resume.");
        return;
      }

      setValue("resume_url", res.data.url, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setUploadedFileName(file.name);
      toast.success("Resume uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleClearResume = () => {
    setValue("resume_url", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setUploadedFileName(null);
  };

  const onSubmit = async (values: JobApplicationInput) => {
    setSubmitting(true);
    try {
      // Ensure the correct job_id is bound
      const payload = { ...values, job_id: jobId };
      const res = await submitJobApplicationAction(payload);
      if (!res.success) {
        toast.error(res.error || "Failed to submit application.");
        return;
      }

      setSuccess(true);
      reset();
      setUploadedFileName(null);
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after transition completes
    setTimeout(() => {
      setSuccess(false);
      reset({
        name: "",
        email: "",
        phone: "",
        resume_url: "",
        cover_letter: "",
        job_id: jobId,
      });
      setUploadedFileName(null);
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? undefined : handleClose())}>
      <DialogContent className="sm:max-w-xl max-h-[95vh] overflow-y-auto rounded-3xl p-6 md:p-8">
        {success ? (
          <div className="py-8 text-center space-y-5">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold text-slate-900 md:text-2xl">
                Application Submitted!
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Thank you for applying {jobTitle ? `for the ${jobTitle} position` : "to join our Talent Network"}. Our Human Resources team will review your application and resume shortly.
              </DialogDescription>
            </div>
            <div className="pt-4">
              <Button
                onClick={handleClose}
                className="w-full sm:w-auto px-8 bg-[#1f2a44] hover:bg-[#1a56a8] text-white rounded-xl"
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="border-b border-slate-100 pb-4">
              <DialogTitle className="text-lg font-bold text-[#1f2a44] md:text-xl">
                {jobTitle ? `Apply for ${jobTitle}` : "Join the Talent Network"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                {jobTitle 
                  ? "Please submit your professional details below to apply for this opening." 
                  : "No suitable positions open? Submit your details to be prioritized for future roles."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="app-name">Full Name *</Label>
                <Input
                  id="app-name"
                  placeholder="John Doe"
                  {...register("name")}
                  className="rounded-xl h-11 border-slate-200 focus-visible:ring-[#1a56a8]/20 focus-visible:border-[#1a56a8]"
                />
                {errors.name && (
                  <p className="text-[10px] text-destructive font-mono">{errors.name.message}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="app-email">Email Address *</Label>
                  <Input
                    id="app-email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className="rounded-xl h-11 border-slate-200 focus-visible:ring-[#1a56a8]/20 focus-visible:border-[#1a56a8]"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-destructive font-mono">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="app-phone">Phone Number *</Label>
                  <Input
                    id="app-phone"
                    placeholder="+91 XXXXX XXXXX"
                    {...register("phone")}
                    className="rounded-xl h-11 border-slate-200 focus-visible:ring-[#1a56a8]/20 focus-visible:border-[#1a56a8]"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-destructive font-mono">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Resume Upload Box */}
              <div className="space-y-1.5">
                <Label>Attach Resume (PDF / Word) *</Label>
                
                {resumeUrlValue ? (
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-5 w-5 text-[#1a56a8] shrink-0" />
                      <span className="truncate text-slate-700 font-semibold max-w-[280px]">
                        {uploadedFileName || "Uploaded Resume Document"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearResume}
                      className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-destructive transition-colors shrink-0"
                      title="Remove Attachment"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-6 text-center transition hover:bg-slate-50">
                    {uploading ? (
                      <div className="flex flex-col items-center gap-1.5 text-xs text-slate-500">
                        <Loader2 className="h-5 w-5 text-[#1a56a8] animate-spin" />
                        <span>Uploading Resume...</span>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-1.5 cursor-pointer text-xs text-[#1a56a8] hover:text-[#1a56a8]/80 font-semibold w-full px-4">
                        <FileUp className="h-6 w-6 text-slate-400" />
                        <span>Upload Resume File (PDF, DOC, DOCX)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Max Size: 10MB</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}
                {errors.resume_url && (
                  <p className="text-[10px] text-destructive font-mono">{errors.resume_url.message}</p>
                )}
              </div>

              {/* Cover Letter */}
              <div className="space-y-1.5">
                <Label htmlFor="app-letter">Cover Letter / Additional Notes</Label>
                <Textarea
                  id="app-letter"
                  rows={4}
                  placeholder="Share a brief introduction or link your LinkedIn portfolio..."
                  {...register("cover_letter")}
                  className="rounded-xl border-slate-200 focus-visible:ring-[#1a56a8]/20 focus-visible:border-[#1a56a8] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="rounded-xl h-11 order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting || uploading}
                  className="rounded-xl h-11 bg-[#1f2a44] hover:bg-[#1a56a8] text-white font-semibold order-1 sm:order-2"
                >
                  {submitting ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

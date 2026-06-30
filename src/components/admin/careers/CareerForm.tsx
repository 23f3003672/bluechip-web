"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { careerFormSchema, type CareerFormValues } from "@/lib/validations/career";
import { slugify } from "@/lib/utils";
import { uploadMediaAction } from "@/actions/media";
import { FileUp, FileText, X, Eye, Loader2 } from "lucide-react";

interface CareerFormProps {
  initialValues?: Partial<CareerFormValues>;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (values: any) => Promise<void>;
}

const defaultValues: CareerFormValues = {
  title: "",
  slug: "",
  description: "",
  location: "",
  employment_type: "",
  department: "",
  responsibilities: "",
  qualifications: "",
  responsibilities_file_url: "",
  qualifications_file_url: "",
  posted_at: undefined,
  closing_date: undefined,
  published: true,
};

export function CareerForm({ initialValues, isSubmitting = false, submitLabel, onSubmit }: CareerFormProps) {
  const merged = useMemo(() => ({ ...defaultValues, ...initialValues }), [initialValues]);

  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema) as Resolver<CareerFormValues>,
    defaultValues: merged,
  });

  const [uploadingResp, setUploadingResp] = useState(false);
  const [uploadingQual, setUploadingQual] = useState(false);

  // Watch fields for dynamic slug updates and attachment views
  const titleValue = useWatch({ control, name: "title" });
  const respFileUrl = useWatch({ control, name: "responsibilities_file_url" });
  const qualFileUrl = useWatch({ control, name: "qualifications_file_url" });

  // Auto-generate slug from Job Title
  useEffect(() => {
    if (titleValue !== undefined) {
      setValue("slug", slugify(titleValue), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [titleValue, setValue]);

  useEffect(() => reset(merged), [merged, reset]);

  // Handle uploading doc/pdf attachments
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "responsibilities_file_url" | "qualifications_file_url"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const setLoader = field === "responsibilities_file_url" ? setUploadingResp : setUploadingQual;
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt_text", `${field === "responsibilities_file_url" ? "Responsibilities" : "Qualifications"} document`);

      const res = await uploadMediaAction(formData);

      if (!res.success) {
        alert(res.error || "Failed to upload file");
        return;
      }

      setValue(field, res.data.url, {
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred during upload.");
    } finally {
      setLoader(false);
    }
  };

  const handleClearFile = (field: "responsibilities_file_url" | "qualifications_file_url") => {
    setValue(field, "", {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(async (values) => await onSubmit(values))} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Job Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" placeholder="e.g. Senior Civil Engineer" {...register("title")} />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        {/* Auto-generated Slug */}
        <div className="space-y-1.5">
          <Label htmlFor="slug" className="flex items-center justify-between">
            <span>URL Slug</span>
            <span className="text-[10px] text-muted-foreground font-mono">Auto-generated</span>
          </Label>
          <Input
            id="slug"
            readOnly
            placeholder="slug-path-here"
            {...register("slug")}
            className="bg-slate-50 border-slate-200 cursor-not-allowed text-muted-foreground font-mono"
          />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Job Description</Label>
        <Textarea id="description" rows={4} placeholder="Provide an overview of this job role and daily expectations..." {...register("description")} />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Department Dropdown */}
        <div className="space-y-1.5">
          <Label htmlFor="department">Department</Label>
          <select
            id="department"
            {...register("department")}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
          >
            <option value="">Select Department</option>
            <option value="Engineering & Design">Engineering & Design</option>
            <option value="Civil Construction">Civil Construction</option>
            <option value="Mechanical & HVAC">Mechanical & HVAC</option>
            <option value="Facade Engineering">Facade Engineering</option>
            <option value="Project Management">Project Management</option>
            <option value="Operations & QA">Operations & QA</option>
            <option value="Safety & HSE">Safety & HSE</option>
            <option value="HR & Admin">HR & Admin</option>
            <option value="Finance & Accounts">Finance & Accounts</option>
          </select>
        </div>

        {/* Employment Type Dropdown */}
        <div className="space-y-1.5">
          <Label htmlFor="employment_type">Employment Type</Label>
          <select
            id="employment_type"
            {...register("employment_type")}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
          >
            <option value="">Select Employment Type</option>
            <option value="On-site (Full-time)">On-site (Full-time)</option>
            <option value="Remote (Full-time)">Remote (Full-time)</option>
            <option value="Hybrid (Full-time)">Hybrid (Full-time)</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Location */}
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. Surat, Gujarat, India" {...register("location")} />
        </div>

        {/* Posted At */}
        <div className="space-y-1.5">
          <Label htmlFor="posted_at">Posted At</Label>
          <Input id="posted_at" type="date" {...register("posted_at")} />
        </div>
      </div>

      {/* Responsibilities */}
      <div className="grid gap-4 md:grid-cols-2 border-t border-slate-100 pt-4">
        <div className="space-y-1.5">
          <Label htmlFor="responsibilities">Responsibilities (short summary)</Label>
          <Textarea
            id="responsibilities"
            rows={3}
            placeholder="Summarize key responsibilities (e.g. coordinating site safety, inspecting steel reinforcements...)"
            {...register("responsibilities")}
          />
        </div>

        {/* Responsibilities Attachment */}
        <div className="space-y-1.5">
          <Label>Responsibilities Attachment (PDF / Word)</Label>
          {respFileUrl ? (
            <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-2.5 text-xs">
              <div className="flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 text-[#1a56a8] shrink-0" />
                <span className="truncate text-slate-700 font-medium">Detailed PDF/Doc Attached</span>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={respFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                  title="View Document"
                >
                  <Eye className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => handleClearFile("responsibilities_file_url")}
                  className="rounded-md p-1 text-slate-500 hover:bg-slate-200 hover:text-destructive"
                  title="Remove Attachment"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50/50 py-5 text-center transition hover:bg-slate-50">
              {uploadingResp ? (
                <div className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground">
                  <Loader2 className="h-5 w-5 text-[#1a56a8] animate-spin" />
                  <span>Uploading file...</span>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-1.5 cursor-pointer text-xs text-[#1a56a8] hover:text-[#1a56a8]/80 font-medium w-full">
                  <FileUp className="h-5 w-5 text-slate-400" />
                  <span>Upload Detailed Document (PDF / Word)</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, "responsibilities_file_url")}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Qualifications */}
      <div className="grid gap-4 md:grid-cols-2 border-t border-slate-100 pt-4 pb-2">
        <div className="space-y-1.5">
          <Label htmlFor="qualifications">Qualifications (short summary)</Label>
          <Textarea
            id="qualifications"
            rows={3}
            placeholder="Summarize key qualifications (e.g. B.Tech in Civil Engineering, 5+ years experience...)"
            {...register("qualifications")}
          />
        </div>

        {/* Qualifications Attachment */}
        <div className="space-y-1.5">
          <Label>Qualifications Attachment (PDF / Word)</Label>
          {qualFileUrl ? (
            <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-2.5 text-xs">
              <div className="flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 text-[#1a56a8] shrink-0" />
                <span className="truncate text-slate-700 font-medium">Detailed PDF/Doc Attached</span>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={qualFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                  title="View Document"
                >
                  <Eye className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => handleClearFile("qualifications_file_url")}
                  className="rounded-md p-1 text-slate-500 hover:bg-slate-200 hover:text-destructive"
                  title="Remove Attachment"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50/50 py-5 text-center transition hover:bg-slate-50">
              {uploadingQual ? (
                <div className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground">
                  <Loader2 className="h-5 w-5 text-[#1a56a8] animate-spin" />
                  <span>Uploading file...</span>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-1.5 cursor-pointer text-xs text-[#1a56a8] hover:text-[#1a56a8]/80 font-medium w-full">
                  <FileUp className="h-5 w-5 text-slate-400" />
                  <span>Upload Detailed Document (PDF / Word)</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, "qualifications_file_url")}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-4">
        <Button type="submit" disabled={isSubmitting || uploadingResp || uploadingQual}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

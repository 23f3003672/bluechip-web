"use client";

import { useEffect, useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { careerFormSchema, type CareerFormValues } from "@/lib/validations/career";

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
  posted_at: undefined,
  closing_date: undefined,
  published: true,
};

export function CareerForm({ initialValues, isSubmitting = false, submitLabel, onSubmit }: CareerFormProps) {
  const merged = useMemo(() => ({ ...defaultValues, ...initialValues }), [initialValues]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema) as Resolver<CareerFormValues>,
    defaultValues: merged,
  });

  useEffect(() => reset(merged), [merged, reset]);

  return (
    <form onSubmit={handleSubmit(async (values) => await onSubmit(values))} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={4} {...register("description")} />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="department">Department</Label>
          <Input id="department" {...register("department")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="employment_type">Employment Type</Label>
          <Input id="employment_type" {...register("employment_type")} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="posted_at">Posted At</Label>
          <Input id="posted_at" type="date" {...register("posted_at")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="responsibilities">Responsibilities (short)</Label>
        <Textarea id="responsibilities" rows={3} {...register("responsibilities")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="qualifications">Qualifications (short)</Label>
        <Textarea id="qualifications" rows={3} {...register("qualifications")} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : submitLabel}</Button>
      </div>
    </form>
  );
}

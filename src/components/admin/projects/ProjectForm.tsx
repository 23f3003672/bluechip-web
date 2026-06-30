"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";
import {
  parseGalleryInput,
  projectFormSchema,
  type ProjectFormValues,
  type ProjectMutationInput,
} from "@/lib/validations/project";
import type { Category, Media } from "@/types";

interface ProjectFormProps {
  categories: Category[];
  mediaItems: Media[];
  initialValues?: Partial<ProjectFormValues>;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (values: ProjectMutationInput) => Promise<void>;
}

const defaultValues: ProjectFormValues = {
  title: "",
  slug: "",
  description: "",
  short_description: "",
  location: "",
  year: new Date().getFullYear(),
  category_id: "",
  subcategory: "",
  thumbnail_url: "",
  gallery: "",
  featured: false,
};

export function ProjectForm({
  categories,
  mediaItems,
  initialValues,
  isSubmitting = false,
  submitLabel,
  onSubmit,
}: ProjectFormProps) {
  const mergedDefaults = useMemo(() => {
    const defaults = { ...defaultValues, ...initialValues };
    
    // Map initial subcategory or category UUID back to a static slug
    if (initialValues?.subcategory) {
      const sub = PROJECT_SUBCATEGORIES.find((s) => s.slug === initialValues.subcategory);
      if (sub) {
        defaults.category_id = sub.megaKey;
      }
    } else if (initialValues?.category_id && categories.length > 0) {
      const cat = categories.find((c) => c.id === initialValues.category_id);
      if (cat) {
        defaults.category_id = cat.slug;
      }
    }
    
    return defaults;
  }, [initialValues, categories]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema) as Resolver<ProjectFormValues>,
    defaultValues: mergedDefaults,
  });

  useEffect(() => {
    reset(mergedDefaults);
  }, [mergedDefaults, reset]);

  const selectedCategoryId = useWatch({ control, name: "category_id" });
  const subcategoryValue = useWatch({ control, name: "subcategory" });
  const thumbnailValue = useWatch({ control, name: "thumbnail_url" });
  const galleryValue = useWatch({ control, name: "gallery" });

  const selectedCategorySlug = selectedCategoryId;

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategorySlug) {
      return []; // Return empty if no category is selected
    }
    return PROJECT_SUBCATEGORIES.filter(
      (sub) => sub.megaKey === selectedCategorySlug
    );
  }, [selectedCategorySlug]);

  const groupedSubcategories = useMemo(() => {
    const groups: Record<string, typeof PROJECT_SUBCATEGORIES> = {};
    for (const sub of filteredSubcategories) {
      if (!groups[sub.columnTitle]) {
        groups[sub.columnTitle] = [];
      }
      groups[sub.columnTitle].push(sub);
    }
    return groups;
  }, [filteredSubcategories]);

  // Clean subcategory selection if the active category changes to a mismatched one
  useEffect(() => {
    if (selectedCategorySlug && subcategoryValue) {
      const match = PROJECT_SUBCATEGORIES.find(
        (sub) => sub.slug === subcategoryValue && sub.megaKey === selectedCategorySlug
      );
      if (!match) {
        setValue("subcategory", "", { shouldDirty: true });
      }
    }
  }, [selectedCategorySlug, subcategoryValue, setValue]);

  const appendGalleryUrl = (url: string) => {
    const current = galleryValue?.trim() ?? "";
    const nextValue = current ? `${current}\n${url}` : url;
    setValue("gallery", nextValue, { shouldDirty: true, shouldTouch: true });
  };

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        // Map the static slug back to the DB UUID
        const dbCategory = categories.find((c) => c.slug === values.category_id);
        const actualCategoryId = dbCategory ? dbCategory.id : "";

        const payload: ProjectMutationInput = {
          title: values.title,
          slug: values.slug,
          description: values.description,
          short_description: values.short_description ?? "",
          location: values.location ?? "",
          year: values.year,
          category_id: actualCategoryId || "",
          subcategory: values.subcategory ?? "",
          thumbnail_url: values.thumbnail_url ?? "",
          gallery: parseGalleryInput(values.gallery ?? ""),
          featured: values.featured,
        };

        await onSubmit(payload);
      })}
      className="space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
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

      <div className="space-y-1.5">
        <Label htmlFor="short_description">Short Description</Label>
        <Textarea id="short_description" rows={2} {...register("short_description")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="year">Year</Label>
          <Input id="year" type="number" {...register("year", { valueAsNumber: true })} />
          {errors.year && <p className="text-xs text-destructive">{errors.year.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="category_id">Category</Label>
          <select
            id="category_id"
            {...register("category_id")}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Select category</option>
            <option value="business">Business</option>
            <option value="projects">Projects</option>
            <option value="innovations">Innovations</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subcategory">Subcategory</Label>
          <select
            id="subcategory"
            {...register("subcategory")}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Select subcategory</option>
            {Object.entries(groupedSubcategories).map(([groupTitle, items]) => (
              <optgroup key={groupTitle} label={groupTitle}>
                {items.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {errors.subcategory && <p className="text-xs text-destructive">{errors.subcategory.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
        <Input id="thumbnail_url" {...register("thumbnail_url")} />
        {errors.thumbnail_url && (
          <p className="text-xs text-destructive">{errors.thumbnail_url.message}</p>
        )}

        <div className="rounded-md border border-border bg-muted/20 p-2">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Pick from uploaded media</p>
          <select
            value={thumbnailValue ?? ""}
            onChange={(event) =>
              setValue("thumbnail_url", event.target.value, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="">Select image URL</option>
            {mediaItems.map((item) => (
              <option key={item.id} value={item.url}>
                {item.filename}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gallery">Gallery URLs (one per line or comma separated)</Label>
        <Textarea id="gallery" rows={4} {...register("gallery")} />
        {errors.gallery && <p className="text-xs text-destructive">{errors.gallery.message}</p>}

        <div className="rounded-md border border-border bg-muted/20 p-2">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Add uploaded image to gallery</p>
          <div className="flex gap-2">
            <select
              defaultValue=""
              onChange={(event) => {
                if (!event.target.value) return;
                appendGalleryUrl(event.target.value);
                event.target.value = "";
              }}
              className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">Select image URL</option>
              {mediaItems.map((item) => (
                <option key={item.id} value={item.url}>
                  {item.filename}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
        <input type="checkbox" {...register("featured")} className="size-4 rounded border-input" />
        Featured
      </label>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

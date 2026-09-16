"use client";

import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaSelector } from "../media/MediaSelector";
import {
  insidersItemFormSchema,
  type InsidersItemFormValues,
} from "@/lib/validations/insiders";
import type { Media, InsidersItem } from "@/types";

interface InsidersFormProps {
  initialValues?: InsidersItem | null;
  media: Media[];
  isSubmitting: boolean;
  onSubmit: (values: InsidersItemFormValues) => Promise<void>;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  { value: "the-people", label: "The People" },
  { value: "the-experience", label: "The Experience" },
] as const;

const SUBCATEGORIES_BY_CATEGORY: Record<
  "the-people" | "the-experience",
  { value: string; label: string }[]
> = {
  "the-people": [
    { value: "meetings-moments", label: "Meetings & Moments" },
    { value: "life-at-bluechip", label: "Life at BlueChip" },
  ],
  "the-experience": [
    { value: "aerial-views", label: "Aerial Views" },
    { value: "behind-the-scenes", label: "Behind the Scenes" },
    { value: "events-milestones", label: "Events & Milestones" },
  ],
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function InsidersForm({
  initialValues,
  media,
  isSubmitting,
  onSubmit,
  onCancel,
}: InsidersFormProps) {
  const isEditing = Boolean(initialValues?.id);
  const [imageMode, setImageMode] = useState<"library" | "url">("url");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsidersItemFormValues>({
    resolver: zodResolver(insidersItemFormSchema) as Resolver<InsidersItemFormValues>,
    defaultValues: {
      title: initialValues?.title ?? "",
      slug: initialValues?.slug ?? "",
      category: (initialValues?.category as any) ?? "the-people",
      subcategory: (initialValues?.subcategory as any) ?? "meetings-moments",
      description: initialValues?.description ?? "",
      image_url: initialValues?.image_url ?? "",
      location: initialValues?.location ?? "",
      year: initialValues?.year ?? "",
      published: initialValues?.published ?? true,
      sort_order: initialValues?.sort_order ?? 0,
    },
  });

  const selectedCategory = (watch("category") ?? "the-people") as
    | "the-people"
    | "the-experience";
  const selectedSubcategory = watch("subcategory");
  const imageUrl = watch("image_url");
  const currentTitle = watch("title");

  // Auto-slugify when creating new item
  useEffect(() => {
    if (!isEditing && currentTitle) {
      setValue("slug", slugify(currentTitle), { shouldValidate: true });
    }
  }, [currentTitle, isEditing, setValue]);

  // Adjust subcategory when category changes if current subcategory is invalid for new category
  useEffect(() => {
    const validSubcats = SUBCATEGORIES_BY_CATEGORY[selectedCategory] ?? [];
    const isValid = validSubcats.some((sub) => sub.value === selectedSubcategory);
    if (!isValid && validSubcats.length > 0) {
      setValue("subcategory", validSubcats[0].value as any, { shouldValidate: true });
    }
  }, [selectedCategory, selectedSubcategory, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Category & Subcategory */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-semibold">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={(val) => {
              if (val) {
                setValue("category", val as "the-people" | "the-experience", {
                  shouldValidate: true,
                });
              }
            }}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subcategory" className="text-sm font-semibold">
            Subcategory (Section) <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedSubcategory}
            onValueChange={(val) => {
              if (val) {
                setValue("subcategory", val as any, { shouldValidate: true });
              }
            }}
          >
            <SelectTrigger id="subcategory">
              <SelectValue placeholder="Select Subcategory" />
            </SelectTrigger>
            <SelectContent>
              {(SUBCATEGORIES_BY_CATEGORY[selectedCategory] ?? []).map((subcat) => (
                <SelectItem key={subcat.value} value={subcat.value}>
                  {subcat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subcategory && (
            <p className="text-xs text-red-500">{errors.subcategory.message}</p>
          )}
        </div>
      </div>

      {/* Title & Slug */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g. Strategic Annual Leadership Assembly"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm font-semibold">
            Slug <span className="text-red-500">*</span>
          </Label>
          <Input
            id="slug"
            placeholder="e.g. strategic-annual-leadership-assembly"
            {...register("slug")}
          />
          {errors.slug && (
            <p className="text-xs text-red-500">{errors.slug.message}</p>
          )}
        </div>
      </div>

      {/* Location & Year */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location" className="text-sm font-semibold">
            Location
          </Label>
          <Input
            id="location"
            placeholder="e.g. Surat Headquarters or Dahej, Gujarat"
            {...register("location")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year" className="text-sm font-semibold">
            Year
          </Label>
          <Input
            id="year"
            placeholder="e.g. 2025"
            {...register("year")}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold">
          Description / Caption
        </Label>
        <Textarea
          id="description"
          rows={3}
          placeholder="Brief narrative highlighting the significance of this moment or perspective..."
          {...register("description")}
        />
      </div>

      {/* Image Selection */}
      <div className="space-y-3 rounded-lg border border-border p-4 bg-muted/20">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">
            Feature Image <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              className={`px-2.5 py-1 rounded border ${
                imageMode === "url"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border"
              }`}
              onClick={() => setImageMode("url")}
            >
              Image URL / Path
            </button>
            <button
              type="button"
              className={`px-2.5 py-1 rounded border ${
                imageMode === "library"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border"
              }`}
              onClick={() => setImageMode("library")}
            >
              Media Library ({media.length})
            </button>
          </div>
        </div>

        {imageMode === "url" ? (
          <div className="space-y-2">
            <Input
              placeholder="e.g. /about/about-mission-1.webp or https://..."
              {...register("image_url")}
            />
            {errors.image_url && (
              <p className="text-xs text-red-500">{errors.image_url.message}</p>
            )}
          </div>
        ) : (
          <div className="max-h-60 overflow-y-auto pr-1">
            <MediaSelector
              media={media}
              value={media.find((m) => m.url === imageUrl)?.id}
              onChange={(mediaId) => {
                const item = media.find((m) => m.id === mediaId);
                if (item) {
                  setValue("image_url", item.url, { shouldValidate: true });
                }
              }}
            />
          </div>
        )}

        {/* Live Preview */}
        {imageUrl && (
          <div className="mt-3 flex items-center gap-4 rounded-md border border-border bg-background p-2">
            <div className="relative h-16 w-24 overflow-hidden rounded bg-muted">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 truncate text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Selected:</span> {imageUrl}
            </div>
          </div>
        )}
      </div>

      {/* Published & Sort Order */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            {...register("published")}
          />
          <Label htmlFor="published" className="text-sm font-medium cursor-pointer">
            Published (visible on public site)
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="sort_order" className="text-sm font-medium">
            Sort Order:
          </Label>
          <Input
            id="sort_order"
            type="number"
            className="w-20"
            {...register("sort_order")}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : isEditing
            ? "Update Feature"
            : "Create Feature"}
        </Button>
      </div>
    </form>
  );
}

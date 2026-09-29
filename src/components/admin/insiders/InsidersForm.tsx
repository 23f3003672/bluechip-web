"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as ImageIcon,
  ExternalLink,
  Link as LinkIcon,
  Search,
  Check,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  insidersItemFormSchema,
  type InsidersItemFormValues,
} from "@/lib/validations/insiders";
import { slugify } from "@/lib/utils";
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

export function InsidersForm({
  initialValues,
  media,
  isSubmitting,
  onSubmit,
  onCancel,
}: InsidersFormProps) {
  const isEditing = Boolean(initialValues?.id);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
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

  const selectedCategory = (useWatch({ control, name: "category" }) ?? "the-people") as
    | "the-people"
    | "the-experience";
  const selectedSubcategory = useWatch({ control, name: "subcategory" });
  const imageUrlValue = useWatch({ control, name: "image_url" });
  const currentTitle = useWatch({ control, name: "title" });

  // Auto-slugify when creating new item
  useEffect(() => {
    if (!isEditing && currentTitle) {
      setValue("slug", slugify(currentTitle), { shouldValidate: true });
    }
  }, [currentTitle, isEditing, setValue]);

  // Adjust subcategory when category changes
  useEffect(() => {
    const validSubcats = SUBCATEGORIES_BY_CATEGORY[selectedCategory] ?? [];
    const isValid = validSubcats.some((sub) => sub.value === selectedSubcategory);
    if (!isValid && validSubcats.length > 0) {
      setValue("subcategory", validSubcats[0].value as any, { shouldValidate: true });
    }
  }, [selectedCategory, selectedSubcategory, setValue]);

  const filteredMedia = useMemo(() => {
    if (!searchQuery.trim()) return media;
    const q = searchQuery.toLowerCase();
    return media.filter(
      (m) =>
        m.filename.toLowerCase().includes(q) ||
        (m.alt_text && m.alt_text.toLowerCase().includes(q))
    );
  }, [media, searchQuery]);

  const getMediaName = (url: string) => {
    const match = media.find((m) => m.url === url);
    if (match) return match.filename;
    try {
      return decodeURIComponent(new URL(url).pathname.split("/").pop() || url);
    } catch {
      return url;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* SCROLLABLE FORM BODY */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-5">
        {/* Category & Subcategory */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="category">
              Category <span className="text-destructive">*</span>
            </Label>
            <select
              id="category"
              {...register("category")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-medium"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subcategory">
              Subcategory <span className="text-destructive">*</span>
            </Label>
            <select
              id="subcategory"
              {...register("subcategory")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-medium"
            >
              {(SUBCATEGORIES_BY_CATEGORY[selectedCategory] ?? []).map((subcat) => (
                <option key={subcat.value} value={subcat.value}>
                  {subcat.label}
                </option>
              ))}
            </select>
            {errors.subcategory && (
              <p className="text-xs text-destructive">{errors.subcategory.message}</p>
            )}
          </div>
        </div>

        {/* Feature Story & Details */}
        <div className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                className="h-10 text-sm font-medium"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug">
                Slug <span className="text-destructive">*</span>
              </Label>
              <Input
                id="slug"
                className="h-10 text-xs font-mono"
                {...register("slug")}
              />
              {errors.slug && (
                <p className="text-xs text-destructive">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="location">
                Location
              </Label>
              <Input
                id="location"
                className="h-10 text-sm"
                {...register("location")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="year">
                Year / Date
              </Label>
              <Input
                id="year"
                className="h-10 text-sm font-medium"
                {...register("year")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              rows={3}
              className="resize-y text-sm leading-relaxed"
              {...register("description")}
            />
          </div>
        </div>

        {/* Feature Image Asset */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <Label>Feature Image</Label>
            <button
              type="button"
              onClick={() => setShowManualInput(!showManualInput)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
            >
              <LinkIcon className="size-3" />
              {showManualInput ? "Hide Manual URL" : "Enter URL manually"}
            </button>
          </div>

          {/* Active Image Preview / Empty State */}
          {imageUrlValue ? (
            <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-3">
              <div className="relative aspect-[4/3] w-32 sm:w-40 shrink-0 overflow-hidden rounded-md border border-border bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrlValue}
                  alt="Feature photo preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium text-foreground">
                  {getMediaName(imageUrlValue)}
                </p>
                <p className="truncate font-mono text-[11px] text-muted-foreground" title={imageUrlValue}>
                  {imageUrlValue}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPickerOpen(!isPickerOpen)}
                    className="h-7 text-xs font-medium"
                  >
                    <ImageIcon className="size-3 mr-1" />
                    {isPickerOpen ? "Close Picker" : "Change Image"}
                  </Button>

                  <a
                    href={imageUrlValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-7 items-center gap-1 rounded-md border border-input bg-background px-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-3" />
                    Preview
                  </a>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setValue("image_url", "", { shouldDirty: true, shouldTouch: true, shouldValidate: true })}
                    className="h-7 text-xs text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ImageIcon className="size-4" />
                </div>
                <p className="text-xs text-muted-foreground">No feature image selected</p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsPickerOpen(true)}
                className="h-8 gap-1.5 text-xs font-medium"
              >
                <ImageIcon className="size-3.5" />
                Select Image
              </Button>
            </div>
          )}

          {errors.image_url && (
            <p className="text-xs text-destructive">{errors.image_url.message}</p>
          )}

          {/* VISUAL MEDIA PICKER DRAWER */}
          {isPickerOpen && (
            <div className="rounded-lg border border-border bg-card p-3 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search media by filename..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-7 pl-8 text-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPickerOpen(false)}
                  className="h-7 px-2 text-xs"
                >
                  <X className="size-3.5" />
                </Button>
              </div>

              <div className="max-h-56 overflow-y-auto">
                {filteredMedia.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {filteredMedia.map((item) => {
                      const isSelected = imageUrlValue === item.url;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setValue("image_url", item.url, {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            });
                            setIsPickerOpen(false);
                          }}
                          className={`group relative flex flex-col overflow-hidden rounded-md border text-left transition-all ${
                            isSelected
                              ? "border-primary ring-2 ring-primary bg-primary/5"
                              : "border-border/80 bg-background hover:border-primary/60"
                          }`}
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden bg-black/5 relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.url}
                              alt={item.filename}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-white shadow-xs">
                                <Check className="size-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="p-1 bg-background border-t border-border/40">
                            <p className="truncate text-[10px] text-foreground" title={item.filename}>
                              {item.filename}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    No images found
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manual Input Fallback */}
          {showManualInput && (
            <div className="pt-1">
              <Input
                placeholder="Paste image URL here"
                className="h-8 text-xs font-mono"
                {...register("image_url")}
              />
            </div>
          )}
        </div>

        {/* Publishing & Sort Sequence */}
        <div className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2 items-center">
            <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground">
              <input
                id="published"
                type="checkbox"
                className="size-4 rounded border-border accent-primary cursor-pointer"
                {...register("published")}
              />
              <span>Published</span>
            </label>

            <div className="space-y-1.5">
              <Label htmlFor="sort_order">
                Sort Order
              </Label>
              <Input
                id="sort_order"
                type="number"
                className="h-10 text-sm font-semibold"
                {...register("sort_order")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PERMANENTLY FIXED FOOTER ACTION BAR */}
      <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-border bg-card flex items-center justify-between sm:justify-end gap-3 z-20">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
          className="h-10 px-5 text-sm font-medium"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 px-6 text-sm font-semibold shadow-sm"
        >
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

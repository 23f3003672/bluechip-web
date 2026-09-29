"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
  Search,
  Check,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PROJECT_SUBCATEGORIES, PRIMARY_PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";
import {
  parseGalleryInput,
  projectFormSchema,
  type ProjectFormValues,
  type ProjectMutationInput,
} from "@/lib/validations/project";
import { slugify } from "@/lib/utils";
import type { Category, Media } from "@/types";

interface ProjectFormProps {
  categories: Category[];
  mediaItems: Media[];
  initialValues?: Partial<ProjectFormValues>;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (values: ProjectMutationInput) => Promise<void>;
  onCancel?: () => void;
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
  onCancel,
}: ProjectFormProps) {
  // State for Visual Media Pickers & Raw input toggles
  const [isThumbnailPickerOpen, setIsThumbnailPickerOpen] = useState(false);
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false);
  const [thumbnailSearch, setThumbnailSearch] = useState("");
  const [gallerySearch, setGallerySearch] = useState("");
  const [showManualThumbnail, setShowManualThumbnail] = useState(false);
  const [showRawGallery, setShowRawGallery] = useState(false);

  const mergedDefaults = useMemo(() => {
    const defaults = { ...defaultValues, ...initialValues };

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
    formState: { errors, dirtyFields },
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
  const titleValue = useWatch({ control, name: "title" });
  const yearValue = useWatch({ control, name: "year" });
  const featuredValue = useWatch({ control, name: "featured" });

  // Auto slug generation from title
  useEffect(() => {
    if (titleValue && !dirtyFields.slug && !initialValues?.slug) {
      const words = titleValue.trim().split(/\s+/).slice(0, 6).join(" ");
      setValue("slug", slugify(words), { shouldValidate: true });
    }
  }, [titleValue, dirtyFields.slug, initialValues?.slug, setValue]);

  const selectedCategorySlug = selectedCategoryId;

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategorySlug) {
      return [];
    }
    return PRIMARY_PROJECT_SUBCATEGORIES.filter(
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

  // Clean subcategory selection if category changes
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

  // Parse Gallery URLs into an active array
  const galleryUrls = useMemo(() => {
    return parseGalleryInput(galleryValue ?? "");
  }, [galleryValue]);

  // Helper to extract clean filename
  const getMediaFilename = (url: string) => {
    const match = mediaItems.find((m) => m.url === url);
    if (match) return match.filename;
    try {
      const decoded = decodeURIComponent(new URL(url).pathname.split("/").pop() || url);
      return decoded.replace(/^\d+-/, ""); // clean up timestamp prefix if any
    } catch {
      return url;
    }
  };

  // Gallery manipulation handlers
  const handleAddGalleryUrl = (url: string) => {
    if (!url) return;
    if (galleryUrls.includes(url)) return; // Avoid duplicates
    const current = galleryValue?.trim() ?? "";
    const nextValue = current ? `${current}\n${url}` : url;
    setValue("gallery", nextValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const handleRemoveGalleryUrl = (urlToRemove: string) => {
    const updated = galleryUrls.filter((u) => u !== urlToRemove);
    setValue("gallery", updated.join("\n"), { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const handleToggleGalleryUrl = (url: string) => {
    if (galleryUrls.includes(url)) {
      handleRemoveGalleryUrl(url);
    } else {
      handleAddGalleryUrl(url);
    }
  };

  // Filter media items for visual search
  const filteredThumbnailMedia = useMemo(() => {
    if (!thumbnailSearch.trim()) return mediaItems;
    const term = thumbnailSearch.toLowerCase();
    return mediaItems.filter((item) =>
      item.filename.toLowerCase().includes(term) || (item.alt_text && item.alt_text.toLowerCase().includes(term))
    );
  }, [mediaItems, thumbnailSearch]);

  const filteredGalleryMedia = useMemo(() => {
    if (!gallerySearch.trim()) return mediaItems;
    const term = gallerySearch.toLowerCase();
    return mediaItems.filter((item) =>
      item.filename.toLowerCase().includes(term) || (item.alt_text && item.alt_text.toLowerCase().includes(term))
    );
  }, [mediaItems, gallerySearch]);

  // Timeline phase pill helper
  const getTimelinePhase = (yr: number | undefined) => {
    if (!yr || isNaN(yr)) return null;
    if (yr < 2013) return "Pre-2013 (Foundation)";
    if (yr <= 2020) return "2013–2020 (Expansion)";
    return "2021+ (Recent Projects)";
  };

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
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
      className="flex flex-col flex-1 min-h-0 overflow-hidden"
    >
      {/* ─── SCROLLABLE FORM BODY ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-5">
        {/* Project Basic Info */}
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                className="h-10 text-sm font-medium"
                {...register("title")}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug">
                Slug <span className="text-destructive">*</span>
              </Label>
              <Input
                id="slug"
                className="h-10 font-mono text-xs"
                {...register("slug")}
              />
              {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="short_description">
              Client / Organization
            </Label>
            <Input
              id="short_description"
              className="h-10 text-sm"
              {...register("short_description")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              rows={4}
              className="resize-y text-sm leading-relaxed"
              {...register("description")}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>
        </div>

        {/* Categorization & Schedule */}
        <div className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="category_id">
                Category
              </Label>
              <select
                id="category_id"
                {...register("category_id")}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-medium"
              >
                <option value="">Select category</option>
                <option value="business">Business</option>
                <option value="projects">Projects</option>
                <option value="innovations">Innovations</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subcategory">
                Subcategory
              </Label>
              <select
                id="subcategory"
                {...register("subcategory")}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-medium"
              >
                <option value="">Select subcategory</option>
                {Object.entries(groupedSubcategories).map(([groupTitle, items]) => (
                  <optgroup key={groupTitle} label={groupTitle} className="font-semibold text-foreground">
                    {items.map((item) => (
                      <option key={item.slug} value={item.slug} className="font-normal text-foreground">
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.subcategory && <p className="text-xs text-destructive">{errors.subcategory.message}</p>}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="year">
                  Completion Year
                </Label>
                {getTimelinePhase(yearValue) && (
                  <Badge variant="secondary" className="px-2 py-0 text-[10px] font-medium text-primary">
                    {getTimelinePhase(yearValue)}
                  </Badge>
                )}
              </div>
              <Input
                id="year"
                type="number"
                className="h-10 text-sm font-semibold"
                {...register("year", { valueAsNumber: true })}
              />
              {errors.year && <p className="text-xs text-destructive">{errors.year.message}</p>}
            </div>
          </div>

          <div className="pt-1">
            <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground">
              <input
                type="checkbox"
                {...register("featured")}
                checked={Boolean(featuredValue)}
                className="size-4 rounded border-border accent-primary cursor-pointer"
              />
              <span>Featured Project</span>
            </label>
          </div>
        </div>

        {/* Visual Media & Assets */}
        <div className="space-y-4 pt-2">
          {/* 1. COVER THUMBNAIL */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Cover Thumbnail</Label>
              <button
                type="button"
                onClick={() => setShowManualThumbnail(!showManualThumbnail)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
              >
                <LinkIcon className="size-3" />
                {showManualThumbnail ? "Hide Manual URL" : "Enter URL manually"}
              </button>
            </div>

            {thumbnailValue ? (
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-3">
                <div className="relative aspect-video w-32 sm:w-40 shrink-0 overflow-hidden rounded-md border border-border bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailValue}
                    alt="Project Thumbnail"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">
                    {getMediaFilename(thumbnailValue)}
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground" title={thumbnailValue}>
                    {thumbnailValue}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsThumbnailPickerOpen(!isThumbnailPickerOpen);
                        setIsGalleryPickerOpen(false);
                      }}
                      className="h-7 text-xs font-medium"
                    >
                      <ImageIcon className="size-3 mr-1" />
                      {isThumbnailPickerOpen ? "Close Picker" : "Change Image"}
                    </Button>

                    <a
                      href={thumbnailValue}
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
                      onClick={() => setValue("thumbnail_url", "", { shouldDirty: true, shouldTouch: true, shouldValidate: true })}
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
                  <p className="text-xs text-muted-foreground">No cover image selected</p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsThumbnailPickerOpen(true);
                    setIsGalleryPickerOpen(false);
                  }}
                  className="h-8 gap-1.5 text-xs font-medium"
                >
                  <ImageIcon className="size-3.5" />
                  Select Image
                </Button>
              </div>
            )}

            {errors.thumbnail_url && (
              <p className="text-xs text-destructive">{errors.thumbnail_url.message}</p>
            )}

            {/* Thumbnail Visual Picker Drawer */}
            {isThumbnailPickerOpen && (
              <div className="rounded-lg border border-border bg-card p-3 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search media by filename..."
                      value={thumbnailSearch}
                      onChange={(e) => setThumbnailSearch(e.target.value)}
                      className="h-7 pl-8 text-xs"
                    />
                    {thumbnailSearch && (
                      <button
                        type="button"
                        onClick={() => setThumbnailSearch("")}
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
                    onClick={() => setIsThumbnailPickerOpen(false)}
                    className="h-7 px-2 text-xs"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>

                <div className="max-h-56 overflow-y-auto">
                  {filteredThumbnailMedia.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {filteredThumbnailMedia.map((item) => {
                        const isSelected = thumbnailValue === item.url;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setValue("thumbnail_url", item.url, {
                                shouldDirty: true,
                                shouldTouch: true,
                                shouldValidate: true,
                              });
                              setIsThumbnailPickerOpen(false);
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

            {/* Manual URL Input */}
            {showManualThumbnail && (
              <div className="pt-1">
                <Input
                  placeholder="Paste thumbnail image URL here"
                  className="h-8 text-xs font-mono"
                  {...register("thumbnail_url")}
                />
              </div>
            )}
          </div>

          {/* 2. GALLERY SHOWCASE */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <div className="flex items-center justify-between">
              <Label>Gallery Images ({galleryUrls.length})</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsGalleryPickerOpen(!isGalleryPickerOpen);
                    setIsThumbnailPickerOpen(false);
                  }}
                  className="h-7 text-xs font-medium"
                >
                  <Plus className="size-3 mr-1" />
                  {isGalleryPickerOpen ? "Done Selecting" : "Add Images"}
                </Button>

                <button
                  type="button"
                  onClick={() => setShowRawGallery(!showRawGallery)}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
                >
                  <LinkIcon className="size-3" />
                  {showRawGallery ? "Hide Raw URLs" : "Edit Raw URLs"}
                </button>
              </div>
            </div>

            {/* Visual Gallery Grid */}
            {galleryUrls.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {galleryUrls.map((url, idx) => {
                  const fname = getMediaFilename(url);
                  return (
                    <div
                      key={`${url}-${idx}`}
                      className="group relative aspect-square overflow-hidden rounded-md border border-border/80 bg-background"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={fname}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute top-1 left-1 rounded bg-black/60 px-1 py-0.2 text-[9px] font-bold text-white">
                        #{idx + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryUrl(url)}
                        title="Remove from gallery"
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive"
                      >
                        <X className="size-3" />
                      </button>

                      <div className="absolute inset-x-0 bottom-0 bg-black/70 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="truncate text-[9px] text-white" title={fname}>
                          {fname}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <ImageIcon className="size-4" />
                  </div>
                  <p className="text-xs text-muted-foreground">No gallery images added</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsGalleryPickerOpen(true);
                    setIsThumbnailPickerOpen(false);
                  }}
                  className="h-8 gap-1.5 text-xs font-medium"
                >
                  <Plus className="size-3.5" />
                  Add Images
                </Button>
              </div>
            )}

            {errors.gallery && (
              <p className="text-xs text-destructive">{errors.gallery.message}</p>
            )}

            {/* Gallery Multi-Select Drawer */}
            {isGalleryPickerOpen && (
              <div className="rounded-lg border border-border bg-card p-3 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search gallery media..."
                      value={gallerySearch}
                      onChange={(e) => setGallerySearch(e.target.value)}
                      className="h-7 pl-8 text-xs"
                    />
                    {gallerySearch && (
                      <button
                        type="button"
                        onClick={() => setGallerySearch("")}
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
                    onClick={() => setIsGalleryPickerOpen(false)}
                    className="h-7 px-2 text-xs"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>

                <div className="max-h-56 overflow-y-auto">
                  {filteredGalleryMedia.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {filteredGalleryMedia.map((item) => {
                        const isAdded = galleryUrls.includes(item.url);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleToggleGalleryUrl(item.url)}
                            className={`group relative flex flex-col overflow-hidden rounded-md border text-left transition-all ${
                              isAdded
                                ? "border-green-600 ring-2 ring-green-600/70 bg-green-50/20"
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
                              {isAdded ? (
                                <div className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-green-600 text-white shadow-xs">
                                  <Check className="size-2.5 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Plus className="size-2.5" />
                                </div>
                              )}
                            </div>
                            <div className="p-1 bg-background border-t border-border/40 flex items-center justify-between">
                              <p className="truncate text-[10px] text-foreground" title={item.filename}>
                                {item.filename}
                              </p>
                              {isAdded && (
                                <span className="shrink-0 text-[9px] font-bold text-green-700 ml-1">Added</span>
                              )}
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

                <div className="flex items-center justify-between border-t border-border/60 pt-2">
                  <span className="text-xs text-muted-foreground">
                    Selected: <span className="font-semibold text-foreground">{galleryUrls.length}</span>
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsGalleryPickerOpen(false)}
                    className="h-7 text-xs"
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}

            {/* Raw Textarea Fallback */}
            {showRawGallery && (
              <div className="pt-1">
                <Textarea
                  id="gallery"
                  rows={3}
                  className="font-mono text-xs leading-relaxed"
                  placeholder="Paste URLs, one per line"
                  {...register("gallery")}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── PERMANENTLY FIXED FOOTER ACTION BAR ────────────────────────── */}
      <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-border bg-card flex items-center justify-between sm:justify-end gap-3 z-20">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-10 px-5 text-sm font-medium"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 px-6 text-sm font-semibold shadow-sm"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

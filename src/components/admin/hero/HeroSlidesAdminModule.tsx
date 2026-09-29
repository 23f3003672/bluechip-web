"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import NextImage from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Video,
  Eye,
  EyeOff,
  Image as ImageIcon,
  ExternalLink,
  Link as LinkIcon,
  Search,
  Check,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminEmptyState, AdminPageHeading } from "@/components/admin/layout/AdminUx";
import { heroSlideFormSchema, type HeroSlideFormValues } from "@/lib/validations/admin-crud";
import type { ActionResult, HeroSlide, Media } from "@/types";

interface HeroSlidesAdminModuleProps {
  rows: HeroSlide[];
  mediaItems: Media[];
  createHeroSlideAction: (
    payload: HeroSlideFormValues
  ) => Promise<ActionResult<{ id: string }>>;
  updateHeroSlideAction: (
    id: string,
    payload: HeroSlideFormValues
  ) => Promise<ActionResult>;
  deleteHeroSlideAction: (id: string) => Promise<ActionResult>;
  toggleHeroSlideAction: (id: string, is_active: boolean) => Promise<ActionResult>;
}

function SlideForm({
  initialValues,
  mediaItems,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: {
  initialValues?: HeroSlideFormValues;
  mediaItems: Media[];
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: HeroSlideFormValues) => Promise<void>;
  onCancel?: () => void;
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<HeroSlideFormValues>({
    resolver: zodResolver(heroSlideFormSchema) as Resolver<HeroSlideFormValues>,
    values: initialValues ?? {
      image_url: "",
      category: "",
      tagline: "",
      project_name: "",
      video_url: "",
      project_href: "/projects",
      sort_order: 1,
      is_active: true,
    },
  });

  const imageUrlValue = useWatch({ control, name: "image_url" });

  const filteredMedia = (searchQuery.trim() ? mediaItems.filter(
    (m) =>
      m.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.alt_text && m.alt_text.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : mediaItems);

  const getMediaName = (url: string) => {
    const match = mediaItems.find((m) => m.url === url);
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
        {/* HERO BACKGROUND VISUAL */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>
              Hero Background Image <span className="text-destructive">*</span>
            </Label>
            <button
              type="button"
              onClick={() => setShowManualInput(!showManualInput)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
            >
              <LinkIcon className="size-3" />
              {showManualInput ? "Hide Manual URL" : "Enter URL manually"}
            </button>
          </div>

          {/* Image Preview / Empty State */}
          {imageUrlValue ? (
            <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-3">
              <div className="relative aspect-video w-32 sm:w-44 shrink-0 overflow-hidden rounded-md border border-border bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrlValue}
                  alt="Hero slide preview"
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
                <p className="text-xs text-muted-foreground">No background image selected</p>
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
                          <div className="aspect-[16/9] w-full overflow-hidden bg-black/5 relative">
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

        {/* CONTENT FIELDS */}
        <div className="space-y-4 pt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                className="h-10 text-sm font-medium"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="project_name">
                Project Name & Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="project_name"
                className="h-10 text-sm font-medium"
                {...register("project_name")}
              />
              {errors.project_name && (
                <p className="text-xs text-destructive">{errors.project_name.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tagline">
              Tagline <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tagline"
              className="h-10 text-sm"
              {...register("tagline")}
            />
            {errors.tagline && (
              <p className="text-xs text-destructive">{errors.tagline.message}</p>
            )}
          </div>
        </div>

        {/* INTERACTIONS & CAROUSEL SETTINGS */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="video_url">
              Video Link (YouTube)
            </Label>
            <Input
              id="video_url"
              className="h-10 text-xs font-mono"
              {...register("video_url")}
            />
            {errors.video_url && (
              <p className="text-xs text-destructive">{errors.video_url.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="project_href">
                Projects Button Link
              </Label>
              <Input
                id="project_href"
                className="h-10 text-sm font-mono"
                {...register("project_href")}
              />
              {errors.project_href && (
                <p className="text-xs text-destructive">{errors.project_href.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sort_order">
                Display Order
              </Label>
              <Input
                id="sort_order"
                type="number"
                min={1}
                max={50}
                className="h-10 text-sm font-semibold"
                {...register("sort_order")}
              />
              {errors.sort_order && (
                <p className="text-xs text-destructive">{errors.sort_order.message}</p>
              )}
            </div>
          </div>

          <div className="pt-1">
            <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground">
              <input
                type="checkbox"
                id="is_active"
                className="size-4 rounded border-border accent-primary cursor-pointer"
                {...register("is_active")}
              />
              <span>Active Slide</span>
            </label>
          </div>
        </div>
      </div>

      {/* PERMANENTLY FIXED FOOTER */}
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

export function HeroSlidesAdminModule({
  rows,
  mediaItems,
  createHeroSlideAction,
  updateHeroSlideAction,
  deleteHeroSlideAction,
  toggleHeroSlideAction,
}: HeroSlidesAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);

  const handleCreate = async (values: HeroSlideFormValues) => {
    startTransition(async () => {
      const res = await createHeroSlideAction(values);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Hero slide created successfully");
      setCreateOpen(false);
      router.refresh();
    });
  };

  const handleUpdate = async (values: HeroSlideFormValues) => {
    if (!editing) return;
    startTransition(async () => {
      const res = await updateHeroSlideAction(editing.id, values);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Hero slide updated successfully");
      setEditing(null);
      router.refresh();
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this hero slide?")) return;
    startTransition(async () => {
      const res = await deleteHeroSlideAction(id);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Hero slide deleted");
      router.refresh();
    });
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await toggleHeroSlideAction(id, !currentStatus);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(!currentStatus ? "Slide activated" : "Slide deactivated");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <AdminPageHeading
        title="Hero Slides"
        description="Manage the 7 rotating slides displayed on the homepage hero section."
        action={
          <Button onClick={() => setCreateOpen(true)} className="gap-2">
            <Plus className="size-4" />
            Add Slide
          </Button>
        }
      />

      {rows.length === 0 ? (
        <AdminEmptyState
          title="No hero slides found"
          description="Create your first hero slide to customize the homepage slider."
          action={
            <Button onClick={() => setCreateOpen(true)} className="gap-2">
              <Plus className="size-4" />
              Add Hero Slide
            </Button>
          }
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Preview</TableHead>
                <TableHead className="w-[70px]">Order</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tagline & Project</TableHead>
                <TableHead className="w-[110px]">Walkthrough</TableHead>
                <TableHead className="w-[90px]">Status</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell>
                    <div className="relative h-12 w-20 overflow-hidden rounded border border-border bg-muted">
                      {slide.image_url ? (
                        <NextImage
                          src={slide.image_url}
                          alt={slide.project_name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                          No img
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-muted-foreground">
                    #{slide.sort_order}
                  </TableCell>
                  <TableCell>
                    <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      {slide.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{slide.tagline}</div>
                    <div className="text-xs text-muted-foreground">
                      {slide.project_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {slide.video_url ? (
                      <a
                        href={slide.video_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#c9962d] hover:underline"
                      >
                        <Video className="size-3.5" />
                        Video
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => handleToggle(slide.id, slide.is_active)}
                      disabled={isPending}
                      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                        slide.is_active
                          ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                      title={slide.is_active ? "Click to deactivate" : "Click to activate"}
                    >
                      {slide.is_active ? (
                        <>
                          <Eye className="size-3" /> Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="size-3" /> Inactive
                        </>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditing(slide)}
                        disabled={isPending}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="size-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(slide.id)}
                        disabled={isPending}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="flex flex-col h-[90vh] max-h-[92vh] sm:max-w-3xl lg:max-w-4xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="shrink-0 px-6 sm:px-8 py-5 border-b border-border/80 bg-muted/20">
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">Add Hero Slide</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Add a new slide for the homepage hero carousel.
            </DialogDescription>
          </DialogHeader>
          <SlideForm
            mediaItems={mediaItems}
            submitLabel="Create Slide"
            isSubmitting={isPending}
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="flex flex-col h-[90vh] max-h-[92vh] sm:max-w-3xl lg:max-w-4xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="shrink-0 px-6 sm:px-8 py-5 border-b border-border/80 bg-muted/20">
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">Edit Hero Slide</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">Update slide content, images, and links.</DialogDescription>
          </DialogHeader>
          {editing && (
            <SlideForm
              initialValues={{
                image_url: editing.image_url,
                category: editing.category,
                tagline: editing.tagline,
                project_name: editing.project_name,
                video_url: editing.video_url ?? "",
                project_href: editing.project_href,
                sort_order: editing.sort_order,
                is_active: editing.is_active,
              }}
              mediaItems={mediaItems}
              submitLabel="Save Changes"
              isSubmitting={isPending}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

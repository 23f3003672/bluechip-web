"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import { Plus, Pencil, Trash2, Video, Eye, EyeOff } from "lucide-react";

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
}: {
  initialValues?: HeroSlideFormValues;
  mediaItems: Media[];
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: HeroSlideFormValues) => Promise<void>;
}) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Background Image & Media Picker */}
      <div className="space-y-1.5">
        <Label>Background Image URL *</Label>
        <Input
          placeholder="/home/hero/hero-image-1.webp or Supabase storage URL"
          {...register("image_url")}
        />
        {errors.image_url && (
          <p className="text-xs text-destructive">{errors.image_url.message}</p>
        )}

        {imageUrlValue && (
          <div className="relative mt-2 h-28 w-full overflow-hidden rounded-md border border-border bg-muted">
            <Image
              src={imageUrlValue}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {mediaItems.length > 0 && (
          <div className="rounded-md border border-border bg-muted/20 p-2">
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              Or choose from Media Library:
            </p>
            <select
              value={imageUrlValue ?? ""}
              onChange={(event) =>
                setValue("image_url", event.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">Select an uploaded image</option>
              {mediaItems.map((item) => (
                <option key={item.id} value={item.url}>
                  {item.filename}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Category & Project Name */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Category * (e.g. Facade Engineering)</Label>
          <Input placeholder="EPC Infrastructure" {...register("category")} />
          {errors.category && (
            <p className="text-xs text-destructive">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Project Name / Location *</Label>
          <Input
            placeholder="Anand-Nadiad Bullet Train Station, Gujarat, India"
            {...register("project_name")}
          />
          {errors.project_name && (
            <p className="text-xs text-destructive">{errors.project_name.message}</p>
          )}
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <Label>Project Tagline *</Label>
        <Input
          placeholder="Engineering India's High-Speed Future."
          {...register("tagline")}
        />
        {errors.tagline && (
          <p className="text-xs text-destructive">{errors.tagline.message}</p>
        )}
      </div>

      {/* Video Walkthrough Link */}
      <div className="space-y-1.5">
        <Label>Project Walkthrough Video Link (YouTube)</Label>
        <Input
          placeholder="https://www.youtube.com/watch?v=ScMzIvxBSi4 or https://youtu.be/..."
          {...register("video_url")}
        />
        <p className="text-[11px] text-muted-foreground">
          Standard YouTube watch links will be automatically converted to embed format.
        </p>
        {errors.video_url && (
          <p className="text-xs text-destructive">{errors.video_url.message}</p>
        )}
      </div>

      {/* Destination Link & Sort Order */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>"View Our Projects" Button Link</Label>
          <Input placeholder="/projects" {...register("project_href")} />
          {errors.project_href && (
            <p className="text-xs text-destructive">{errors.project_href.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Display Order (1 to 7+)</Label>
          <Input type="number" min={1} max={50} {...register("sort_order")} />
          {errors.sort_order && (
            <p className="text-xs text-destructive">{errors.sort_order.message}</p>
          )}
        </div>
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="is_active"
          className="size-4 rounded border-border text-primary focus:ring-primary"
          {...register("is_active")}
        />
        <Label htmlFor="is_active" className="cursor-pointer font-normal">
          Active (Visible on homepage hero slider)
        </Label>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
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
                        <Image
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
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle>Add Hero Slide</DialogTitle>
            <DialogDescription>
              Add a new slide for the homepage hero carousel.
            </DialogDescription>
          </DialogHeader>
          <SlideForm
            mediaItems={mediaItems}
            submitLabel="Create Slide"
            isSubmitting={isPending}
            onSubmit={handleCreate}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle>Edit Hero Slide</DialogTitle>
            <DialogDescription>Update slide content, images, and links.</DialogDescription>
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
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

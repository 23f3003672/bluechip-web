"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Image as ImageIcon,
  Search,
  X,
  Check,
  Trash2,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { visionaryFormSchema, type VisionaryFormValues } from "@/lib/validations/admin-crud";
import type { ActionResult, Visionary, Media } from "@/types";

interface VisionariesAdminModuleProps {
  rows: Visionary[];
  mediaItems: Media[];
  createVisionaryAction: (
    payload: VisionaryFormValues
  ) => Promise<ActionResult<{ id: string }>>;
  updateVisionaryAction: (
    id: string,
    payload: VisionaryFormValues
  ) => Promise<ActionResult>;
  deleteVisionaryAction: (id: string) => Promise<ActionResult>;
}

function VisionaryForm({
  initialValues,
  mediaItems,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: {
  initialValues?: VisionaryFormValues;
  mediaItems: Media[];
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: VisionaryFormValues) => Promise<void>;
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
  } = useForm<VisionaryFormValues>({
    resolver: zodResolver(visionaryFormSchema) as Resolver<VisionaryFormValues>,
    values: initialValues ?? {
      name: "",
      role: "",
      image_url: "",
      bio: "",
    },
  });

  const imageUrlValue = useWatch({ control, name: "image_url" });

  const filteredMedia = searchQuery.trim()
    ? mediaItems.filter(
        (m) =>
          m.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (m.alt_text && m.alt_text.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mediaItems;

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Role</Label>
          <Input {...register("role")} />
          {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
        </div>
      </div>

      {/* Visual Photograph Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Photograph</Label>
          <button
            type="button"
            onClick={() => setShowManualInput(!showManualInput)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
          >
            <LinkIcon className="size-3" />
            {showManualInput ? "Hide Manual URL" : "Enter URL manually"}
          </button>
        </div>

        {imageUrlValue ? (
          <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md border border-border bg-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrlValue}
                alt="Selected photograph"
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
              <div className="mt-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPickerOpen(!isPickerOpen)}
                  className="h-7 text-xs"
                >
                  <ImageIcon className="size-3 mr-1" />
                  {isPickerOpen ? "Close Picker" : "Change Image"}
                </Button>
                <a
                  href={imageUrlValue}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-7 items-center gap-1 rounded-md border border-input bg-background px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="size-3" />
                  Preview
                </a>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setValue("image_url", "", {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
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
              <p className="text-xs text-muted-foreground">No photograph selected</p>
            </div>
            <div className="flex items-center gap-2">
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
          </div>
        )}

        {/* Visual Media Picker Drawer */}
        {isPickerOpen && (
          <div className="rounded-lg border border-border bg-card p-3 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search image filename..."
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

            <div className="max-h-52 overflow-y-auto">
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
                          });
                          setIsPickerOpen(false);
                        }}
                        className={`group relative flex flex-col overflow-hidden rounded-md border text-left transition-all ${
                          isSelected
                            ? "border-primary ring-2 ring-primary bg-primary/5"
                            : "border-border/80 bg-background hover:border-primary/60"
                        }`}
                      >
                        <div className="aspect-square w-full overflow-hidden bg-black/5 relative">
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
        {showManualInput && (
          <div className="pt-1">
            <Input
              placeholder="Paste image URL here"
              className="h-8 text-xs font-mono"
              {...register("image_url")}
            />
          </div>
        )}

        {errors.image_url && <p className="text-xs text-destructive">{errors.image_url.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Bio</Label>
        <Textarea rows={4} {...register("bio")} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export function VisionariesAdminModule({
  rows,
  mediaItems,
  createVisionaryAction,
  updateVisionaryAction,
  deleteVisionaryAction,
}: VisionariesAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Visionary | null>(null);

  return (
    <section>
      <AdminPageHeading
        title="Visionaries"
        description="Manage visionary profiles."
        pending={isPending}
        action={
          <Button onClick={() => setCreateOpen(true)} disabled={isPending}>
            Create Visionary
          </Button>
        }
      />

      {rows.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            title="No visionaries available"
            description="Create your first visionary profile to get started."
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-border bg-white p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Image URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{row.image_url ?? "-"}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditing(row)} disabled={isPending}>Edit</Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isPending}
                        onClick={() => {
                          if (!window.confirm(`Delete \"${row.name}\"?`)) return;
                          startTransition(async () => {
                            const result = await deleteVisionaryAction(row.id);
                            if (!result.success) {
                              toast.error(result.error);
                              return;
                            }
                            toast.success("Visionary deleted");
                            router.refresh();
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Visionary</DialogTitle>
            <DialogDescription>Add a new visionary profile.</DialogDescription>
          </DialogHeader>
          <VisionaryForm
            mediaItems={mediaItems}
            submitLabel="Create"
            isSubmitting={isPending}
            onCancel={() => setCreateOpen(false)}
            onSubmit={async (values) => {
              startTransition(async () => {
                const result = await createVisionaryAction(values);
                if (!result.success) {
                  toast.error(result.error);
                  return;
                }
                toast.success("Visionary created");
                setCreateOpen(false);
                router.refresh();
              });
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Visionary</DialogTitle>
            <DialogDescription>Update visionary details.</DialogDescription>
          </DialogHeader>
          {editing && (
            <VisionaryForm
              mediaItems={mediaItems}
              submitLabel="Save Changes"
              isSubmitting={isPending}
              onCancel={() => setEditing(null)}
              initialValues={{
                name: editing.name,
                role: editing.designation,
                image_url: editing.image_url ?? "",
                bio: editing.bio ?? "",
              }}
              onSubmit={async (values) => {
                startTransition(async () => {
                  const result = await updateVisionaryAction(editing.id, values);
                  if (!result.success) {
                    toast.error(result.error);
                    return;
                  }
                  toast.success("Visionary updated");
                  setEditing(null);
                  router.refresh();
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaSelector } from "./MediaSelector";
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

import {
  mediaArticleFormSchema,
  type MediaArticleFormValues,
} from "@/lib/validations/admin-crud";

import type { Media, MediaArticle } from "@/types";

interface MediaArticleFormProps {
  initialValues?: MediaArticleFormValues;

  media: Media[];

  isSubmitting: boolean;

  submitLabel: string;

  onSubmit: (values: MediaArticleFormValues) => Promise<void>;
}

export function MediaArticleForm({
  initialValues,
  media,
  isSubmitting,
  submitLabel,
  onSubmit,
}: MediaArticleFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MediaArticleFormValues>({
    resolver:
      zodResolver(mediaArticleFormSchema) as Resolver<MediaArticleFormValues>,

    values:
      initialValues ??
      {
        title: "",
        slug: "",
        short_description: "",
        content: "",
        featured_image_id: "",
        display_order: 1,
        published_at: new Date().toISOString().slice(0, 16),
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
      },
  });

  const selectedImage = watch("featured_image_id");

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-1.5">
        <Label>Title</Label>
        <Input {...register("title")} />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Slug</Label>
        <Input
          {...register("slug")}
          placeholder="germany-visit"
        />
        {errors.slug && (
          <p className="text-xs text-destructive">{errors.slug.message}</p>
        )}
      </div>
    </div>

    <div className="space-y-1.5">
      <Label>Short Description</Label>
      <Textarea
        rows={3}
        {...register("short_description")}
        placeholder="Short description shown on the Media & News listing page."
      />
      {errors.short_description && (
        <p className="text-xs text-destructive">
          {errors.short_description.message}
        </p>
      )}
    </div>

    <div className="space-y-1.5">
      <Label>Full Article Content</Label>
      <Textarea
        rows={14}
        {...register("content")}
        placeholder="Complete article content..."
      />
      {errors.content && (
        <p className="text-xs text-destructive">
          {errors.content.message}
        </p>
      )}
    </div>

        <div className="space-y-2">
      <Label>Featured Image</Label>

      <MediaSelector
        media={media}
        value={selectedImage}
        disabled={isSubmitting}
        onChange={(mediaId) => {
          setValue("featured_image_id", mediaId, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />

      {errors.featured_image_id && (
        <p className="text-xs text-destructive">
          {errors.featured_image_id.message}
        </p>
      )}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-1.5">
        <Label>Display Order</Label>

        <Select
          value={String(watch("display_order"))}
          onValueChange={(value) =>
            setValue("display_order", Number(value), {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {[1,2,3,4,5,6,7,8].map((slot) => (
              <SelectItem
                key={slot}
                value={String(slot)}
              >
                Position {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.display_order && (
          <p className="text-xs text-destructive">
            {errors.display_order.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Published Date</Label>

        <Input
          type="datetime-local"
          {...register("published_at")}
        />

        {errors.published_at && (
          <p className="text-xs text-destructive">
            {errors.published_at.message}
          </p>
        )}
      </div>
    </div>

        <div className="rounded-lg border border-border p-4">
      <h3 className="font-semibold">
        SEO Settings
      </h3>

      <div className="mt-4 space-y-4">
        <div className="space-y-1.5">
          <Label>Meta Title</Label>

          <Input
            {...register("meta_title")}
            placeholder="SEO title"
          />

          {errors.meta_title && (
            <p className="text-xs text-destructive">
              {errors.meta_title.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Meta Description</Label>

          <Textarea
            rows={3}
            {...register("meta_description")}
            placeholder="SEO description"
          />

          {errors.meta_description && (
            <p className="text-xs text-destructive">
              {errors.meta_description.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Meta Keywords</Label>

          <Input
            {...register("meta_keywords")}
            placeholder="engineering, bluechip, germany"
          />

          {errors.meta_keywords && (
            <p className="text-xs text-destructive">
              {errors.meta_keywords.message}
            </p>
          )}
        </div>
      </div>
    </div>

        <div className="flex justify-end">
      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </div>
  </form>
);
}
"use client";

import { useState } from "react";
import type { MediaGalleryItem } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

interface MediaFormProps {
  onCreate: (item: MediaGalleryItem) => void;
}

export function MediaForm({ onCreate }: MediaFormProps) {
  const [title, setTitle] = useState("Germany Visit");
  const [excerpt, setExcerpt] = useState("");
  const [year, setYear] = useState("2022");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !excerpt || !year || !imageUrl || !imageAlt) {
      return;
    }

    onCreate({
      id: `m-${Date.now()}`,
      slug: `${slugify(title)}-${Date.now().toString().slice(-4)}`,
      type: "image",
      title,
      excerpt,
      recordedYear: Number(year),
      imageUrl,
      imageAlt,
    });

    setExcerpt("");
    setImageUrl("");
    setImageAlt("");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg border border-border bg-white p-4">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#6f7788]">Add Media Item</p>

      <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Title" required />
      <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="min-h-20 rounded border border-border px-3 py-2 text-sm" placeholder="Excerpt" required />
      <input value={year} onChange={(e) => setYear(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Recorded Year" required />
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Image URL" required />
      <input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Image Alt" required />

      <button type="submit" className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white">
        Add Media
      </button>
    </form>
  );
}

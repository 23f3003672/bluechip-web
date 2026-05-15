"use client";

import { useState } from "react";
import type { RecognitionCategory, RecognitionItem } from "@/lib/mock-data";

interface RecognitionFormProps {
  onCreate: (item: RecognitionItem) => void;
}

const categories: Array<{ value: RecognitionCategory; label: string }> = [
  { value: "international", label: "International" },
  { value: "industry-awards", label: "Industry Awards" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "media", label: "Media" },
];

export function RecognitionForm({ onCreate }: RecognitionFormProps) {
  const [title, setTitle] = useState("Bluechip Technologies");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState<RecognitionCategory>("international");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [organisedBy, setOrganisedBy] = useState("");
  const [emblemImageUrl, setEmblemImageUrl] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!subtitle || !categoryLabel || !organisedBy || !emblemImageUrl) {
      return;
    }

    onCreate({
      id: `r-${Date.now()}`,
      title,
      subtitle,
      category,
      categoryLabel,
      organisedBy,
      emblemImageUrl,
    });

    setSubtitle("");
    setCategoryLabel("");
    setOrganisedBy("");
    setEmblemImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg border border-border bg-white p-4">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#6f7788]">Add Recognition</p>

      <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Title" />
      <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Subtitle" required />

      <select value={category} onChange={(e) => setCategory(e.target.value as RecognitionCategory)} className="rounded border border-border px-3 py-2 text-sm">
        {categories.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>

      <input value={categoryLabel} onChange={(e) => setCategoryLabel(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Category Label" required />
      <input value={organisedBy} onChange={(e) => setOrganisedBy(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Organised By" required />
      <input value={emblemImageUrl} onChange={(e) => setEmblemImageUrl(e.target.value)} className="rounded border border-border px-3 py-2 text-sm" placeholder="Emblem Image URL" required />

      <button type="submit" className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white">
        Add Recognition
      </button>
    </form>
  );
}

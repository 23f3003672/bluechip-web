"use client";

import { useEffect, useMemo, useState } from "react";
import { MEDIA_GALLERY_ITEMS, type MediaGalleryItem } from "@/lib/mock-data";
import { MediaForm } from "@/components/admin/forms/MediaForm";
import { MediaTable } from "@/components/admin/tables/MediaTable";

const STORAGE_KEY = "bluechip-dashboard-media";

export default function DashboardMediaPage() {
  const [rows, setRows] = useState<MediaGalleryItem[]>(() => {
    if (typeof window === "undefined") {
      return MEDIA_GALLERY_ITEMS;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as MediaGalleryItem[]) : MEDIA_GALLERY_ITEMS;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const total = useMemo(() => rows.length, [rows]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-[#202a40]">Manage Media</h1>
      <p className="mt-2 text-sm text-[#5f6a7f]">Total records: {total}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <MediaForm onCreate={(item) => setRows((prev) => [item, ...prev])} />
        <MediaTable rows={rows} onDelete={(id) => setRows((prev) => prev.filter((row) => row.id !== id))} />
      </div>
    </main>
  );
}

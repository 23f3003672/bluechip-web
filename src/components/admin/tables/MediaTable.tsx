"use client";

import type { MediaGalleryItem } from "@/lib/mock-data";

interface MediaTableProps {
  rows: MediaGalleryItem[];
  onDelete: (id: string) => void;
}

export function MediaTable({ rows, onDelete }: MediaTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border bg-[#f4f6fb] text-[#5c6578]">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Year</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/70">
              <td className="px-4 py-3">{row.title}</td>
              <td className="px-4 py-3 text-[#647089]">{row.slug}</td>
              <td className="px-4 py-3">{row.recordedYear}</td>
              <td className="px-4 py-3">
                <button type="button" onClick={() => onDelete(row.id)} className="rounded border border-[#d1d6e2] px-2 py-1 text-xs font-semibold text-[#2b3348]">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

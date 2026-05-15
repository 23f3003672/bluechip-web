"use client";

import type { RecognitionItem } from "@/lib/mock-data";

interface RecognitionsTableProps {
  rows: RecognitionItem[];
  onDelete: (id: string) => void;
}

export function RecognitionsTable({ rows, onDelete }: RecognitionsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border bg-[#f4f6fb] text-[#5c6578]">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Subtitle</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Organised By</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/70">
              <td className="px-4 py-3">{row.title}</td>
              <td className="px-4 py-3 text-[#647089]">{row.subtitle}</td>
              <td className="px-4 py-3">{row.category}</td>
              <td className="px-4 py-3 text-[#647089]">{row.organisedBy}</td>
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

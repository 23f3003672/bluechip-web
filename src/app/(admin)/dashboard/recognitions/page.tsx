"use client";

import { useEffect, useMemo, useState } from "react";
import { RECOGNITIONS, type RecognitionItem } from "@/lib/mock-data";
import { RecognitionForm } from "@/components/admin/forms/RecognitionForm";
import { RecognitionsTable } from "@/components/admin/tables/RecognitionsTable";

const STORAGE_KEY = "bluechip-dashboard-recognitions";

export default function DashboardRecognitionsPage() {
  const [rows, setRows] = useState<RecognitionItem[]>(() => {
    if (typeof window === "undefined") {
      return RECOGNITIONS;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as RecognitionItem[]) : RECOGNITIONS;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const total = useMemo(() => rows.length, [rows]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-[#202a40]">Manage Recognitions</h1>
      <p className="mt-2 text-sm text-[#5f6a7f]">Total records: {total}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <RecognitionForm onCreate={(item) => setRows((prev) => [item, ...prev])} />
        <RecognitionsTable rows={rows} onDelete={(id) => setRows((prev) => prev.filter((row) => row.id !== id))} />
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";

export function CareersTable({ rows = [], onEdit, onDelete, isBusy = false }: any) {
  return (
    <div className="overflow-hidden rounded-md border border-[#e6e9ef] bg-white">
      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="bg-[#fbfdff]">
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any) => (
            <tr key={r.id} className="border-t last:border-b">
              <td className="px-4 py-3">{r.title}</td>
              <td className="px-4 py-3">{r.department}</td>
              <td className="px-4 py-3">{r.employment_type}</td>
              <td className="px-4 py-3">{r.location}</td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => onEdit(r)} className="mr-2 text-sm font-medium text-primary">Edit</button>
                <button onClick={() => onDelete(r)} className="text-sm font-medium text-destructive">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

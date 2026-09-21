"use client";

import { useState } from "react";
import { Lock, ArrowRight, X } from "lucide-react";

export function BypassForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) return;
    // Redirects to current path with bypass parameter to let proxy.ts set the cookie
    window.location.href = `/?bypass=${encodeURIComponent(trimmed)}`;
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-400 transition-colors py-1 px-2.5 rounded hover:bg-neutral-900/50"
      >
        <Lock className="w-3 h-3 text-neutral-600" />
        <span>Staff Access</span>
      </button>
    );
  }

  return (
    <div className="max-w-xs mx-auto p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 shadow-xl text-left animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Staff Bypass Verification</span>
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-neutral-500 hover:text-neutral-300 p-0.5 rounded transition-colors"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="password"
          autoFocus
          placeholder="Enter bypass key..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="flex-1 text-xs px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span>Unlock</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = `/?bypass=clear`;
            }}
            className="text-[11px] px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 rounded-lg transition-colors"
            title="Clear any existing bypass cookie"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

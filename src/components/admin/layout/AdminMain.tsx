"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AdminMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <main ref={mainRef} className="flex-1 overflow-y-auto p-5 md:p-8">
      {children}
    </main>
  );
}

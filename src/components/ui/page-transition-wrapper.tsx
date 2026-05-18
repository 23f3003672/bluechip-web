"use client";

import { Suspense } from "react";
import { PageTransitionProvider } from "@/components/ui/page-transition-provider";

/**
 * Thin Suspense wrapper — required because PageTransitionProvider uses
 * `useSearchParams()`, which must be inside a Suspense boundary in
 * Next.js App Router.
 */
export function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <PageTransitionProvider>{children}</PageTransitionProvider>
    </Suspense>
  );
}

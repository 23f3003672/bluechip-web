"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";

const MIN_DISPLAY_MS = 1000; // show loading screen for at least 1 second

/**
 * Routes that have their own specialised loading screen.
 * The global loader is suppressed when navigating TO these paths.
 */
const CUSTOM_LOADER_ROUTES = ["/about"];

interface PageTransitionContextValue {
  startLoading: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  startLoading: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

/**
 * PageTransitionProvider
 *
 * - On first mount (hard refresh / initial load): shows loader for ≥1s
 *   UNLESS the current page is in CUSTOM_LOADER_ROUTES.
 * - On every client-side route change: shows loader for ≥1s,
 *   UNLESS destination is in CUSTOM_LOADER_ROUTES.
 */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCustomRoute = CUSTOM_LOADER_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  const [isLoading, setIsLoading] = useState(!isCustomRoute);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadStartRef = useRef<number>(Date.now());
  const routeChangeCountRef = useRef(0);

  const scheduleFinish = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const elapsed = Date.now() - loadStartRef.current;
    const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
    timerRef.current = setTimeout(() => setIsLoading(false), wait);
  };

  // ── Initial mount ──────────────────────────────────────────────────
  useEffect(() => {
    // Don't show global loader on routes with custom loaders
    if (isCustomRoute) {
      setIsLoading(false);
      return;
    }

    loadStartRef.current = Date.now();
    setIsLoading(true);

    if (document.readyState === "complete") {
      scheduleFinish();
    } else {
      window.addEventListener("load", scheduleFinish, { once: true });
      scheduleFinish();
    }

    return () => {
      window.removeEventListener("load", scheduleFinish);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Route changes ──────────────────────────────────────────────────
  useEffect(() => {
    routeChangeCountRef.current += 1;

    // Skip the very first invocation — handled by mount effect above
    if (routeChangeCountRef.current === 1) return;

    // Skip global loader for custom-loader routes
    if (isCustomRoute) {
      setIsLoading(false);
      return;
    }

    loadStartRef.current = Date.now();
    setIsLoading(true);
    scheduleFinish();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  const startLoading = () => {
    if (isCustomRoute) return;
    loadStartRef.current = Date.now();
    setIsLoading(true);
    scheduleFinish();
  };

  return (
    <PageTransitionContext.Provider value={{ startLoading }}>
      <LoadingScreen isVisible={isLoading} />
      {children}
    </PageTransitionContext.Provider>
  );
}

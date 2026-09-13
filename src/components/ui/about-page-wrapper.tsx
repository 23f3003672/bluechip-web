"use client";

import { useState, useEffect, useCallback } from "react";
import { AboutLoadingScreen } from "@/components/ui/about-loading-screen";

export function AboutPageWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const handleComplete = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    // Safety fallback in case animation is interrupted or tab is in background
    const fallback = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      <link rel="preload" as="image" href="/about/about-b-logo.webp" type="image/webp" />
      <AboutLoadingScreen onComplete={handleComplete} />
      <div
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: ready ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
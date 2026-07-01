"use client";

import { useState, useEffect } from "react";
import { AboutLoadingScreen } from "@/components/ui/about-loading-screen";

// assemble 1700 + buffer 200 + hold 1100 + exit 800 + 100 ≈ 3.9s
const TOTAL_ANIM_MS = 1700 + 200 + 1100 + 800 + 100;

export function AboutPageWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), TOTAL_ANIM_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AboutLoadingScreen />
      {/* Children are mounted immediately (good for SEO / server data),
          but invisible until the animation finishes */}
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
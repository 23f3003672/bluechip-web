"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  isVisible: boolean;
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsFadingOut(false);
    } else {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsFadingOut(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <>
      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes logo-in {
          0%   { opacity: 0; transform: scale(0.84); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes logo-out {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); }
        }
        @keyframes screen-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes screen-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>

      {/* ── Glassmorphism overlay ─────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.16) 100%)",
          animation: isFadingOut
            ? "screen-out 0.65s cubic-bezier(0.4,0,0.2,1) forwards"
            : "screen-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* ── Logo + spinning rings ─────────────────────────────── */}
        <div
          style={{
            position: "relative",
            width: "160px",
            height: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: isFadingOut
              ? "logo-out 0.55s cubic-bezier(0.4,0,1,1) forwards"
              : "logo-in 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          {/* Outer conic spinner */}
          <div
            style={{
              position: "absolute",
              inset: "-14px",
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, transparent 0%, transparent 50%, rgba(180,180,180,0.45) 68%, rgba(255,255,255,0.9) 80%, rgba(180,180,180,0.45) 92%, transparent 100%)",
              animation: "spin-cw 2s linear infinite",
            }}
          />

          {/* Inner counter-rotating shimmer */}
          <div
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              background:
                "conic-gradient(from 200deg, transparent 0%, rgba(220,220,220,0.3) 35%, transparent 60%)",
              animation: "spin-ccw 3.5s linear infinite",
            }}
          />

          {/*
            Circular mask — overflow:hidden clips to circle.
            objectFit:contain keeps the full logo at its natural ratio.
            Padding ensures it breathes inside the ring.
          */}
          <div
            style={{
              position: "relative",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "transparent",
              boxShadow:
                "0 8px 36px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
            }}
          >
            <Image
              src="/PhotoshopExtension_Image.png"
              alt="Bluechip Engineering & Technologies"
              width={136}
              height={136}
              priority
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

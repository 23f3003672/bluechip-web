"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Config ─────────────────────────────────────────────────────────── */
// Source PNG is the B logo (blue marble texture, transparent outside the glyph).
// We keep the same aspect ratio the original file uses.
const LOGO_W = 284;
const LOGO_H = 400;

// How many liquid "pebble" blobs make up the letter.
const BLOB_COLS = 5;
const BLOB_ROWS = 7;                        // ~35 cells; we keep the ones over the glyph
const BLOB_COUNT = BLOB_COLS * BLOB_ROWS;

const ASSEMBLE_MS = 1700; // blobs float in & merge into the B
const HOLD_MS     = 1100; // solid B holds (gentle float)
const EXIT_MS     = 800;  // fade / dissolve out
const BUFFER_MS   = 200;

// Image path — same asset your current version uses.
const IMG_SRC = "/PhotoshopExtension_Image.png";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Blob {
  cx: number;      // home position (px, in logo space)
  cy: number;
  rx: number;      // radius
  ry: number;
  dx: number;      // scattered start offset
  dy: number;
  rot: number;     // start rotation (deg)
  delay: number;   // stagger (s)
}

/* ─── Blob generation (client-only, avoids hydration mismatch) ───────── */
function buildBlobs(): Blob[] {
  const cellW = LOGO_W / BLOB_COLS;
  const cellH = LOGO_H / BLOB_ROWS;
  const blobs: Blob[] = [];

  for (let i = 0; i < BLOB_COUNT; i++) {
    const col = i % BLOB_COLS;
    const row = Math.floor(i / BLOB_COLS);

    // Home position: cell centre + a little organic jitter so it isn't a grid.
    const cx = col * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.5;
    const cy = row * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.5;

    // Blobs overlap heavily so the goo filter fuses them into a solid shape.
    const rx = cellW * (0.75 + Math.random() * 0.25);
    const ry = cellH * (0.75 + Math.random() * 0.25);

    // Scattered start: drift outward from centre, like the video.
    const angle = Math.random() * Math.PI * 2;
    const dist  = 60 + Math.random() * 140;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 30; // bias slightly upward (floaty feel)

    const rot = (Math.random() - 0.5) * 120;

    // Stagger from centre outward -> centre settles last, like the reference.
    const ncx = Math.abs(col - (BLOB_COLS - 1) / 2) / ((BLOB_COLS - 1) / 2);
    const ncy = Math.abs(row - (BLOB_ROWS - 1) / 2) / ((BLOB_ROWS - 1) / 2);
    const edge = Math.max(ncx, ncy); // 1 = outer, 0 = centre
    const delay = (1 - edge) * (ASSEMBLE_MS / 1000) * 0.45 + Math.random() * 0.12;

    blobs.push({ cx, cy, rx, ry, dx, dy, rot, delay });
  }
  return blobs;
}

/* ─── Main ───────────────────────────────────────────────────────────── */
type Phase = "hidden" | "assembling" | "holding" | "exiting" | "done";

export function AboutLoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const blobsRef = useRef<Blob[]>([]);
  // Stable-ish filter id (avoids collisions if mounted more than once).
  const uid = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  useEffect(() => {
    blobsRef.current = buildBlobs();
    setPhase("assembling");

    const t1 = setTimeout(() => setPhase("holding"),
      ASSEMBLE_MS + BUFFER_MS);
    const t2 = setTimeout(() => setPhase("exiting"),
      ASSEMBLE_MS + BUFFER_MS + HOLD_MS);
    const t3 = setTimeout(() => setPhase("done"),
      ASSEMBLE_MS + BUFFER_MS + HOLD_MS + EXIT_MS + 100);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "hidden" || phase === "done") return null;

  const isExiting = phase === "exiting";
  const isHolding = phase === "holding" || phase === "exiting";
  const blobs = blobsRef.current;

  const gooId   = `goo-${uid}`;
  const maskId  = `blobmask-${uid}`;
  const shadowId = `softshadow-${uid}`;

  return (
    <AnimatePresence>
      <motion.div
        key="about-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(30px) saturate(150%)",
          WebkitBackdropFilter: "blur(30px) saturate(150%)",
          background: "rgba(255, 255, 255, 0.4)",
        }}
      >
        {/* Soft radial glow behind the logo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Gentle float + exit scale on the whole letter */}
        <motion.div
          animate={
            isExiting
              ? { scale: 1.08, opacity: 0, y: 0 }
              : isHolding
              ? { scale: 1, opacity: 1, y: [0, -6, 0] }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={
            isExiting
              ? { duration: EXIT_MS / 1000, ease: "easeInOut" }
              : isHolding
              ? { duration: 3, ease: "easeInOut", repeat: Infinity }
              : { duration: 0.4 }
          }
          style={{
            position: "relative",
            width: LOGO_W,
            height: LOGO_H + 40, // room for the contact shadow
          }}
        >
          <svg
            width={LOGO_W}
            height={LOGO_H + 40}
            viewBox={`0 0 ${LOGO_W} ${LOGO_H + 40}`}
            style={{ overflow: "visible", display: "block" }}
          >
            <defs>
              {/* Metaball / "goo" filter — blurs then re-sharpens alpha so
                  overlapping blobs fuse into one liquid shape. */}
              <filter id={gooId}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 22 -11"
                  result="goo"
                />
                <feComposite in="goo" in2="goo" operator="atop" />
              </filter>

              {/* Soft ground shadow */}
              <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
              </filter>

              {/* The animated blob mask — white reveals the image. */}
              <mask id={maskId}>
                <g filter={`url(#${gooId})`}>
                  {blobs.map((b, i) => (
                    <motion.ellipse
                      key={i}
                      cx={b.cx}
                      cy={b.cy}
                      rx={b.rx}
                      ry={b.ry}
                      fill="#fff"
                      initial={{
                        opacity: 0,
                        scale: 0.15,
                        x: b.dx,
                        y: b.dy,
                        rotate: b.rot,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                      }}
                      transition={{
                        delay: b.delay,
                        duration: 1.0,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        // transform-box so scale/rotate pivot around the blob centre
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        willChange: "transform, opacity",
                      }}
                    />
                  ))}
                </g>
              </mask>
            </defs>

            {/* Contact shadow that fades in with the letter */}
            <motion.ellipse
              cx={LOGO_W / 2}
              cy={LOGO_H + 22}
              rx={LOGO_W * 0.32}
              ry={12}
              fill="rgba(30,45,90,0.20)"
              filter={`url(#${shadowId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isExiting ? 0 : 0.9 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />

            {/* The actual B image, revealed through the blob mask */}
            <image
              href={IMG_SRC}
              xlinkHref={IMG_SRC}
              x={0}
              y={0}
              width={LOGO_W}
              height={LOGO_H}
              mask={`url(#${maskId})`}
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
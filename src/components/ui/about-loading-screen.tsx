"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Config ─────────────────────────────────────────────────────────── */
// Original image is 1414x2000 (aspect ratio 0.707).
// Using LOGO_W=284 and LOGO_H=400 keeps it at roughly 0.71.
const LOGO_W = 284;
const LOGO_H = 400;
const COLS   = 4;
const ROWS   = 5;
const TILE_W = LOGO_W / COLS;   // 71px
const TILE_H = LOGO_H / ROWS;   // 80px

const ASSEMBLE_MS = 2500;  // slow 2.5s assemble
const HOLD_MS     = 1000;  // 1s hold
const EXIT_MS     = 800;   // 0.8s fade out

interface TileData {
  x: number;
  y: number;
  rotate: number;
}

/* ─── Tile ────────────────────────────────────────────────────────────── */
interface TileProps {
  col: number;
  row: number;
  delay: number;
  initial: TileData;   // pre-computed on client only
}

function Tile({ col, row, delay, initial }: TileProps) {
  return (
    <motion.div
      initial={{ x: initial.x, y: initial.y, opacity: 0, rotate: initial.rotate }}
      animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
      transition={{
        delay,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // smooth slow stop
      }}
      style={{
        position:   "absolute",
        width:      `${TILE_W}px`,
        height:     `${TILE_H}px`,
        left:       `${col * TILE_W}px`,
        top:        `${row * TILE_H}px`,
        overflow:   "hidden",
        willChange: "transform",
      }}
    >
      {/* 
        Full image positioned so only this tile's slice shows.
        maxWidth: "none" is critical to override Tailwind's img { max-width: 100% }
        which causes squishing inside small tile containers.
      */}
      <img
        src="/PhotoshopExtension_Image.png"
        alt=""
        draggable={false}
        style={{
          position:   "absolute",
          width:      `${LOGO_W}px`,
          height:     `${LOGO_H}px`,
          maxWidth:   "none", 
          left:       `-${col * TILE_W}px`,
          top:        `-${row * TILE_H}px`,
          display:    "block",
          userSelect: "none",
        }}
      />
    </motion.div>
  );
}

/* ─── Main ────────────────────────────────────────────────────────────── */
type Phase = "hidden" | "assembling" | "holding" | "exiting" | "done";

export function AboutLoadingScreen() {
  // Start hidden so nothing renders server-side (avoids hydration mismatch)
  const [phase, setPhase] = useState<Phase>("hidden");

  // All random values computed once, client-only
  const tilesRef = useRef<TileData[]>([]);

  useEffect(() => {
    const total = COLS * ROWS;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Edges: 0=left, 1=right, 2=top, 3=bottom
    tilesRef.current = Array.from({ length: total }, (_, i) => {
      const edge = i % 4;
      const r    = (Math.random() - 0.5) * 60; // rotation -30° to +30°
      switch (edge) {
        case 0: return { x: -(vw * 0.55 + Math.random() * vw * 0.45), y: (Math.random() - 0.5) * vh * 0.8, rotate: r };
        case 1: return { x:   vw * 0.55 + Math.random() * vw * 0.45,  y: (Math.random() - 0.5) * vh * 0.8, rotate: r };
        case 2: return { x: (Math.random() - 0.5) * vw * 0.8, y: -(vh * 0.55 + Math.random() * vh * 0.45), rotate: r };
        default:return { x: (Math.random() - 0.5) * vw * 0.8, y:   vh * 0.55 + Math.random() * vh * 0.45,  rotate: r };
      }
    });

    // Kick off phases
    setPhase("assembling");

    const t1 = setTimeout(() => setPhase("holding"),  ASSEMBLE_MS + 200);
    const t2 = setTimeout(() => setPhase("exiting"),  ASSEMBLE_MS + 200 + HOLD_MS);
    const t3 = setTimeout(() => setPhase("done"),     ASSEMBLE_MS + 200 + HOLD_MS + EXIT_MS + 100);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "hidden" || phase === "done") return null;

  // Stagger: corner tiles come first, centre tiles last
  const getDelay = (col: number, row: number) => {
    const cx   = Math.abs(col - (COLS - 1) / 2) / ((COLS - 1) / 2);
    const cy   = Math.abs(row - (ROWS - 1) / 2) / ((ROWS - 1) / 2);
    const edge = Math.max(cx, cy); // 1 = corner, 0 = centre
    // outer → first, centre → last; spread over most of ASSEMBLE_MS
    return (1 - edge) * (ASSEMBLE_MS / 1000) * 0.7;
  };

  const tiles = Array.from({ length: COLS * ROWS }, (_, i) => ({
    col:   i % COLS,
    row:   Math.floor(i / COLS),
    index: i,
  }));

  const isExiting = phase === "exiting";

  return (
    <AnimatePresence>
      <motion.div
        key="about-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position:             "fixed",
          inset:                0,
          zIndex:               9999,
          display:              "flex",
          alignItems:           "center",
          justifyContent:       "center",
          /* Perfect Glassmorphism */
          backdropFilter:       "blur(30px) saturate(150%)",
          WebkitBackdropFilter: "blur(30px) saturate(150%)",
          background:           "rgba(255, 255, 255, 0.4)",
          border:               "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow:            "0 8px 32px 0 rgba(31, 38, 135, 0.05)"
        }}
      >
        {/* Soft radial glow behind the assembly to pop the logo */}
        <div
          style={{
            position:      "absolute",
            inset:         0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)",
            pointerEvents: "none",
            zIndex:        -1,
          }}
        />

        {/* Logo tile grid */}
        <motion.div
          animate={isExiting ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "relative",
            width:    `${LOGO_W}px`,
            height:   `${LOGO_H}px`,
          }}
        >
          {tiles.map(({ col, row, index }) => (
            <Tile
              key={index}
              col={col}
              row={row}
              delay={getDelay(col, row)}
              initial={tilesRef.current[index] ?? { x: 0, y: 0, rotate: 0 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

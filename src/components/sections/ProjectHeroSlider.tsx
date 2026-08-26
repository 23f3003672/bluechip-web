"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProjectHeroSliderProps {
  images: string[];
  title: string;
}

export function ProjectHeroSlider({ images, title }: ProjectHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative h-full w-full">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${title} - image ${i + 1}`}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
            i === currentIndex ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
}

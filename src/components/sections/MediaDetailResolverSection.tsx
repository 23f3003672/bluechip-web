"use client";

import { useMemo } from "react";
import { type MediaGalleryItem } from "@/lib/mock-data";
import { MediaDetailSection } from "@/components/sections/MediaDetailSection";
import { Container } from "@/components/layout/Container";

interface MediaDetailResolverSectionProps {
  initialItem: MediaGalleryItem | null;
}

export function MediaDetailResolverSection({
  initialItem,
}: MediaDetailResolverSectionProps) {
  const content = useMemo(() => {
    if (initialItem) {
      return <MediaDetailSection item={initialItem} />;
    }

    return (
      <section className="bg-[#f4f6fa] py-20">
        <Container>
          <h1 className="text-4xl font-semibold text-[#222c40]">Media item not found</h1>
          <p className="mt-3 text-lg text-[#465067]">
            The requested media record is not available in the current dataset.
          </p>
        </Container>
      </section>
    );
  }, [initialItem]);

  return content;
}

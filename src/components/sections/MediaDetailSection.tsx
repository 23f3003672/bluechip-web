import Link from "next/link";
import type { MediaGalleryItem } from "@/lib/mock-data";

interface MediaDetailSectionProps {
  item: MediaGalleryItem;
}

export function MediaDetailSection({
  item,
}: MediaDetailSectionProps) {
  return (
    <section
      className="w-full overflow-hidden bg-[#f3f5f9]"
      aria-labelledby="media-detail-title"
    >
      <div className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
        
        {/* LEFT CONTENT */}
        <div className="relative flex items-center px-8 py-14 md:px-14 lg:px-24">
          
          {/* Background Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 max-w-[620px]">
            
            {/* Back Link */}
            <Link
              href="/media"
              className="inline-flex text-sm font-medium uppercase tracking-[0.24em] text-primary transition hover:opacity-70"
            >
              Back to Media
            </Link>

            {/* Year */}
            <p className="mt-20 text-[22px] font-medium text-[#c3912e] md:text-[28px]">
              Recd. in {item.recordedYear}
            </p>

            {/* Title */}
            <h1
              id="media-detail-title"
              className="mt-5 text-[56px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#1f2740] md:text-[74px]"
            >
              {item.title}
            </h1>

            {/* Divider */}
            <div className="mt-10 h-[1px] w-12 bg-[#b9bec9]" />

            {/* Description */}
            <p className="mt-10 max-w-[560px] text-[20px] leading-[1.8] text-[#30384b]/90">
              {item.excerpt}
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-[420px] lg:min-h-screen">
          <img
            src={item.imageUrl}
            alt={item.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
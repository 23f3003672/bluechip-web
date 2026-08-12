import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ABOUT_VISIONARIES } from "@/lib/mock-data";
import { mapVisionaryToAboutVisionary } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export default async function VisionaryProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data } = await supabase
    .from("visionaries")
    .select("id, name, designation, bio, image_url, linkedin_url, sort_order, created_at")
    .eq("id", id)
    .single();

  const visionary = data ? mapVisionaryToAboutVisionary(data) : ABOUT_VISIONARIES.find((v) => v.id === id);

  if (!visionary) {
    notFound();
  }

  return (
    <section className="w-full overflow-hidden bg-[#f3f4f7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT CONTENT SECTION */}
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#ececf1] px-8 py-16 md:px-16 lg:px-24">
          {/* Content Wrapper */}
          <div className="relative z-10 flex w-full items-center">
            <div className="max-w-[640px]">
              
              {/* Role */}
              <p className="text-[12px] uppercase tracking-[0.1em] font-medium text-[#c9962d] md:text-[14px]">
                {visionary.role}
              </p>

              {/* Main Heading */}
              <h1 className="mt-4 text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1d2740] md:text-[45px]">
                {visionary.name}
              </h1>

              {/* Bio */}
              <div className="mt-10 max-w-[580px] text-[16px] leading-[1.8] text-[#222b3d]/90 md:text-[17px] whitespace-pre-wrap">
                {visionary.bio}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative min-h-[500px] overflow-hidden lg:min-h-screen">
          <img
            src={visionary.imageUrl}
            alt={visionary.name}
            className="absolute inset-0 h-full w-full object-cover object-[center_top]"
          />
          {/* Optional subtle overlay */}
          <div className="absolute inset-0 bg-black/5" />
        </div>
      </div>
    </section>
  );
}

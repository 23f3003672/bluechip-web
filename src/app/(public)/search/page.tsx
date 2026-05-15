import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/layout/Container";
import { mapMediaListToGalleryItems } from "@/lib/public-content";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";
import {
  HOME_SERVICES,
  JOURNEY_PROJECTS,
  MEDIA_GALLERY_ITEMS,
  RECOGNITIONS,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across projects, services, media, and recognitions.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage(props: SearchPageProps) {
  const params = await props.searchParams;
  const query = (params.q ?? "").trim();

  if (!query) {
    return (
      <Container className="py-14">
        <h1 className="text-2xl font-semibold text-foreground">Search</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Enter a keyword from the search icon in the header.
        </p>
      </Container>
    );
  }

  const supabase = await createClient();
  const term = `%${query}%`;

  const [projectsRes, servicesRes, recognitionsRes, mediaRes] = await Promise.all([
    supabase
      .from("projects")
      .select("id, title, slug, location, year, description, excerpt, published")
      .eq("published", true)
      .or(`title.ilike.${term},description.ilike.${term},excerpt.ilike.${term},location.ilike.${term}`)
      .order("year", { ascending: false })
      .limit(8),
    supabase
      .from("services")
      .select("id, title, slug, description, published")
      .eq("published", true)
      .or(`title.ilike.${term},description.ilike.${term}`)
      .order("sort_order", { ascending: true })
      .limit(8),
    supabase
      .from("recognitions")
      .select("id, title, issuer, year, description, published")
      .eq("published", true)
      .or(`title.ilike.${term},issuer.ilike.${term},description.ilike.${term}`)
      .order("year", { ascending: false })
      .limit(8),
    supabase
      .from("media")
      .select("id, filename, url, storage_path, mime_type, size_bytes, alt_text, uploaded_at")
      .or(`filename.ilike.${term},alt_text.ilike.${term}`)
      .order("uploaded_at", { ascending: false })
      .limit(12),
  ]);

  const queryLower = query.toLowerCase();

  const projectsFromDb = projectsRes.data ?? [];
  const servicesFromDb = servicesRes.data ?? [];
  const recognitionsFromDb = recognitionsRes.data ?? [];
  const mediaFromDb = mapMediaListToGalleryItems(mediaRes.data ?? []).filter((item) => {
    const haystack = `${item.title} ${item.recordedYear} ${item.excerpt}`.toLowerCase();
    return haystack.includes(queryLower);
  });

  const projects =
    projectsFromDb.length > 0
      ? projectsFromDb
      : JOURNEY_PROJECTS.filter((item) => {
          const haystack = `${item.title} ${item.summary} ${item.category} ${item.projectType} ${item.locationYear}`.toLowerCase();
          return haystack.includes(queryLower);
        }).slice(0, 8).map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          location: item.locationYear,
          year: undefined,
        }));

  const services =
    servicesFromDb.length > 0
      ? servicesFromDb
      : HOME_SERVICES.filter((item) => {
          const haystack = `${item.title} ${item.description}`.toLowerCase();
          return haystack.includes(queryLower);
        }).slice(0, 8).map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.title.toLowerCase().replace(/\s+/g, "-"),
          description: item.description,
        }));

  const recognitions =
    recognitionsFromDb.length > 0
      ? recognitionsFromDb
      : RECOGNITIONS.filter((item) => {
          const haystack = `${item.title} ${item.subtitle} ${item.categoryLabel} ${item.organisedBy}`.toLowerCase();
          return haystack.includes(queryLower);
        }).slice(0, 8).map((item) => ({
          id: item.id,
          title: item.title,
          issuer: item.organisedBy,
          year: undefined,
        }));

  const media =
    mediaFromDb.length > 0
      ? mediaFromDb
      : MEDIA_GALLERY_ITEMS.filter((item) => {
          const haystack = `${item.title} ${item.excerpt} ${item.recordedYear}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
        }).slice(0, 12);

  const subcategoryMatches = PROJECT_SUBCATEGORIES.filter((item) => {
    const haystack = `${item.label} ${item.columnTitle}`.toLowerCase();
    return haystack.includes(queryLower);
  }).slice(0, 8);

  const totalResults =
    projects.length +
    services.length +
    recognitions.length +
    media.length +
    subcategoryMatches.length;

  return (
    <Container className="py-12 sm:py-14">
      <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Search results</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Query: <span className="font-medium text-foreground">{query}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{totalResults} result(s) found</p>

      {totalResults === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No matching records were found. Try another keyword.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground">Projects</h2>
              <ul className="mt-3 space-y-3">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm font-medium text-[#0e57a0] hover:underline"
                    >
                      {project.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {[project.location, project.year].filter(Boolean).join(" • ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {services.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground">Services</h2>
              <ul className="mt-3 space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href="/services"
                      className="text-sm font-medium text-[#0e57a0] hover:underline"
                    >
                      {service.title}
                    </Link>
                    {service.description ? (
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {service.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {subcategoryMatches.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground">Subcategories</h2>
              <ul className="mt-3 space-y-3">
                {subcategoryMatches.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/projects/subcategory/${item.slug}`}
                      className="text-sm font-medium text-[#0e57a0] hover:underline"
                    >
                      {item.label}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.columnTitle}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {recognitions.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground">Recognitions</h2>
              <ul className="mt-3 space-y-3">
                {recognitions.map((record) => (
                  <li key={record.id}>
                    <Link
                      href="/recognitions"
                      className="text-sm font-medium text-[#0e57a0] hover:underline"
                    >
                      {record.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {[record.issuer, record.year].filter(Boolean).join(" • ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {media.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground">Media</h2>
              <ul className="mt-3 space-y-3">
                {media.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/media/${item.slug}`}
                      className="text-sm font-medium text-[#0e57a0] hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.recordedYear}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </Container>
  );
}

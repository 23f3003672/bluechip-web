import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Eyebrow, Heading, Paragraph } from "@/components/ui/typography";
import { MOCK_PROJECTS, type MockProject } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/* ─── Project Card ──────────────────────────────────────────────── */
function ProjectCard({ project }: { project: MockProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        "transition-shadow duration-200 hover:shadow-md hover:shadow-foreground/5 hover:border-primary/25",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {/* ── Image placeholder ─────────────────────────────────── */}
      {/*
       * Swap this div for <CardImage src={project.thumbnail_url} … />
       * once real images are available in Supabase storage.
       */}
      <div
        className="relative aspect-video w-full overflow-hidden"
        style={{ backgroundColor: project.placeholderColor }}
      >
        {/* Subtle overlay pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(oklch(1 0 0 / 0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Category label inside the placeholder */}
        <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.excerpt}
        </p>
      </div>

      {/* ── Footer row ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          {project.location}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {project.year}
        </span>
      </div>
    </Link>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export function FeaturedProjectsSection() {
  // Show 6 projects on the homepage — first 6 from mock data
  const featured = MOCK_PROJECTS.slice(0, 6);

  return (
    <SectionWrapper alternate>
      <Container>

        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <Eyebrow>Our Work</Eyebrow>
          <Heading variant="h2" className="max-w-xl">
            Featured Projects
          </Heading>
          <Paragraph variant="lead" className="max-w-2xl">
            A selection of landmark infrastructure projects delivered across
            India — each one a testament to technical rigour and execution
            excellence.
          </Paragraph>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            View All Projects
            <ArrowRight className="size-4" />
          </Link>
        </div>

      </Container>
    </SectionWrapper>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  RECOGNITIONS,
  RECOGNITION_CATEGORY_LABELS,
  type RecognitionItem,
  type RecognitionCategory,
} from "@/lib/mock-data";
import { Container } from "@/components/layout/Container";

type FilterType = "all" | RecognitionCategory;

const FILTERS: Array<{ key: FilterType; label: string }> = [
  { key: "all", label: "All" },
  { key: "international", label: RECOGNITION_CATEGORY_LABELS.international },
  { key: "industry-awards", label: RECOGNITION_CATEGORY_LABELS["industry-awards"] },
  { key: "infrastructure", label: RECOGNITION_CATEGORY_LABELS.infrastructure },
  { key: "manufacturing", label: RECOGNITION_CATEGORY_LABELS.manufacturing },
  { key: "media", label: RECOGNITION_CATEGORY_LABELS.media },
];

const GROUP_ORDER: RecognitionCategory[] = [
  "international",
  "industry-awards",
  "infrastructure",
  "manufacturing",
  "media",
];

const INITIAL_ITEMS = 5;
const LOAD_STEP = 3;

function RecognitionRow({
  title,
  subtitle,
  categoryLabel,
  organisedBy,
  emblemImageUrl,
}: {
  title: string;
  subtitle: string;
  categoryLabel: string;
  organisedBy: string;
  emblemImageUrl: string;
}) {
  return (
    <article className="grid items-center gap-8 py-8 md:grid-cols-[240px_1fr_1.15fr] md:gap-10 md:py-10">
      <div className="flex justify-center md:justify-start">
        <div className="relative size-[170px] overflow-hidden rounded-full border-4 border-[#818ca3]/65 bg-[#eff2f8]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55 grayscale"
            style={{ backgroundImage: `url(${emblemImageUrl})` }}
            role="img"
            aria-label={title}
          />
          <div className="absolute inset-0 rounded-full ring-8 ring-[#f1f3f7]" />
        </div>
      </div>

      <div>
        <h3 className="text-4xl font-medium tracking-tight text-[#1f273b] md:text-5xl">
          {title}
        </h3>
        <p className="mt-2 text-3xl text-[#738096] md:text-4xl">{subtitle}</p>
      </div>

      <dl className="grid gap-3 text-3xl md:text-4xl">
        <div className="flex items-baseline gap-3">
          <dt className="text-[#8a95aa]">Category</dt>
          <dd className="text-[#2d374d]">{categoryLabel}</dd>
        </div>
        <div className="flex items-baseline gap-3">
          <dt className="text-[#8a95aa]">Organised by</dt>
          <dd className="text-[#2d374d]">{organisedBy}</dd>
        </div>
      </dl>
    </article>
  );
}

export function RecognitionsSection({
  initialRecords = RECOGNITIONS,
}: {
  initialRecords?: RecognitionItem[];
}) {
  const [records] = useState<RecognitionItem[]>(initialRecords);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);

  const filtered = useMemo(() => {
    if (activeFilter === "all") {
      return records;
    }

    return records.filter((item) => item.category === activeFilter);
  }, [activeFilter, records]);

  const visibleItems = filtered.slice(0, visibleCount);

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((category) => ({
      category,
      items: visibleItems.filter((item) => item.category === category),
    })).filter((group) => group.items.length > 0);
  }, [visibleItems]);

  const hasMore = visibleCount < filtered.length;

  const onChangeFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_ITEMS);
  };

  return (
    <section className="bg-[#f3f5f9] pb-14" aria-labelledby="recognitions-title">
      <div className="border-b border-[#dde2ea]">
        <Container>
          <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-3xl font-medium text-[#2b3243]">Recognitions</p>
            <div className="flex flex-wrap items-center gap-6">
              {FILTERS.map((filter) => {
                const isActive = filter.key === activeFilter;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => onChangeFilter(filter.key)}
                    className={isActive ? "text-base font-semibold uppercase tracking-wide text-primary" : "text-base font-medium uppercase tracking-wide text-[#3d4454] hover:text-primary"}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <h1
          id="recognitions-title"
          className="pt-10 text-6xl font-semibold tracking-tight text-[#20293d] md:pt-14 md:text-7xl"
        >
          Recognised for Excellence.
        </h1>

        <div className="mt-8 space-y-10 md:mt-12 md:space-y-12">
          {grouped.map((group) => (
            <section key={group.category} aria-labelledby={`recognitions-${group.category}`}>
              <div className="mb-2 flex items-center gap-4 md:mb-3">
                <h2
                  id={`recognitions-${group.category}`}
                  className="text-5xl font-semibold tracking-tight text-[#262f44] md:text-6xl"
                >
                  {RECOGNITION_CATEGORY_LABELS[group.category]}
                </h2>
                <div className="h-px flex-1 bg-[#d6dbe5]" aria-hidden="true" />
              </div>

              {group.items.map((item) => (
                <RecognitionRow key={item.id} {...item} />
              ))}
            </section>
          ))}
        </div>

        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + LOAD_STEP)}
              className="rounded border border-[#a8b0bf] bg-white px-8 py-3 text-3xl font-medium text-[#30384a] transition-colors hover:bg-[#f6f8fb]"
            >
              Load More
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

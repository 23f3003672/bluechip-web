"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  RECOGNITIONS,
  RECOGNITION_CATEGORY_LABELS,
  type RecognitionItem,
  type RecognitionCategory,
} from "@/lib/mock-data";

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

function LaurelBranch() {
  return (
    <div className="relative h-32 w-12 select-none">
      <Image
        src="/laurel-wreath.svg"
        alt="Laurel Branch"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

function LaurelWreath({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="shrink-0">
        <LaurelBranch />
      </div>

      <div
        className="
          w-[220px]
          px-2
          text-center
          text-[10.7px]
          font-normal
          uppercase
          tracking-[0.08em]
          leading-[1.7]
          text-[#222b3d]
        "
      >
        {text}
      </div>

      <div className="shrink-0 scale-x-[-1]">
        <LaurelBranch />
      </div>
    </div>
  );
}

function RecognitionRow({
  title,
  subtitle,
  categoryLabel,
  organisedBy,
}: {
  title: string;
  subtitle: string;
  categoryLabel: string;
  organisedBy: string;
  emblemImageUrl: string;
}) {
  const lines = subtitle.split("\n").map((l) => l.trim()).filter(Boolean);
  const mainText = lines[0] || "";
  const subText = lines.slice(1).join("\n");

  return (
    <article className="flex flex-col items-center gap-10 py-10 md:flex-row md:items-center md:justify-between md:gap-8 lg:gap-12">
      <div className="flex w-full shrink-0 justify-center md:w-[320px] md:justify-start">
        <LaurelWreath text={title} />
      </div>

      <div className="flex w-full flex-col gap-1 md:max-w-[480px]">
        <h3 className="text-[15px] font-normal text-[#222b3d] leading-[1.6]">
          {mainText}
        </h3>
        {subText && (
          <p className="text-[14px] font-normal text-[#78868e] leading-normal whitespace-pre-line">
            {subText}
          </p>
        )}
      </div>

      <dl className="grid w-full shrink-0 gap-2 text-[12.5px] md:w-[280px]">
        <div className="flex items-baseline gap-3">
          <dt className="text-[#78868e] min-w-[70px]">Category</dt>
          <dd className="font-normal text-[#222b3d]">{categoryLabel}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="text-[#78868e] min-w-[70px]">Organised by</dt>
          <dd className="font-normal text-[#222b3d]">{organisedBy}</dd>
        </div>
      </dl>
    </article>
  );
}

const GROUP_HEADING_LABELS: Record<RecognitionCategory, string> = {
  international: "International Delegations",
  "industry-awards": "Industry Awards",
  infrastructure: "National Infrastructure Projects",
  manufacturing: "Manufacturing",
  media: "Media Awards",
};

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
    <section className="bg-[#ffffff] pb-14" aria-labelledby="recognitions-title">
      <div className="border-b border-[#dde2ea]">
        <div className="mx-auto w-full max-w-[1300px] px-4 md:px-8">
          <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[12.5px] font-medium text-black">Recognitions</p>
            <div className="flex flex-wrap items-center gap-6">
              {FILTERS.map((filter) => {
                const isActive = filter.key === activeFilter;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => onChangeFilter(filter.key)}
                    className={`text-[11.5px] font-medium uppercase tracking-[0.08em] transition-colors ${isActive ? "text-[#78868e]" : "text-black hover:text-[#78868e]"
                      }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1300px] px-4 md:px-8">
        <h1
          id="recognitions-title"
          className="pt-10 text-[26.7px] font-semibold tracking-tight text-[#222b3d] md:pt-14"
        >
          Recognised for Excellence.
        </h1>

        <div className="mt-8 space-y-10 md:mt-12 md:space-y-12">
          {grouped.map((group) => (
            <section key={group.category} aria-labelledby={`recognitions-${group.category}`}>
              <div className="mb-2 flex items-center gap-4 md:mb-3">
                <h2
                  id={`recognitions-${group.category}`}
                  className="text-[19.4px] font-semibold tracking-tight text-[#222b3d]"
                >
                  {GROUP_HEADING_LABELS[group.category]}
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
      </div>
    </section>
  );
}

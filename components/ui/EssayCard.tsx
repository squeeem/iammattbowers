import Link from "next/link";
import Image from "next/image";
import { EssayMeta } from "@/lib/essays";
import { PillarTag } from "./PillarTag";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function EssayCard({ essay }: { essay: EssayMeta }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-soft">
      {essay.cover && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={essay.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="photo-warm object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <PillarTag pillar={essay.pillar} />
        <span className="text-sm text-ink-soft">{essay.readingTime}</span>
      </div>
      <h3 className="mb-2 text-xl font-semibold leading-tight text-ink">
        <Link
          href={`/essays/${essay.slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {essay.title}
        </Link>
      </h3>
      <p className="mb-5 flex-1 text-base text-ink-soft">{essay.excerpt}</p>
      <span className="text-sm text-ink-soft">{formatDate(essay.date)}</span>
      </div>
    </article>
  );
}

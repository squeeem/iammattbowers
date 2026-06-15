import Link from "next/link";
import { ESSAYS } from "@/lib/essays";
import { EssayCard } from "@/components/ui/EssayCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedWriting() {
  const featured = ESSAYS.slice(0, 3);
  return (
    <section className="mx-auto max-w-hub px-5 py-20 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl text-ink md:text-3xl">Latest writing</h2>
          <Link
            href="/writing"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-accent-deep hover:underline"
          >
            All writing
            <span className="nudge" aria-hidden>
              &rarr;
            </span>
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {featured.map((essay, i) => (
          <Reveal key={essay.slug} delay={i * 80}>
            <EssayCard essay={essay} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { NOW_NOTES, NOW_UPDATED } from "@/lib/now";
import { PILLARS } from "@/lib/pillars";
import { Reveal } from "@/components/ui/Reveal";

function formatUpdated(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function NowSection() {
  return (
    <section className="border-y border-line bg-sand">
      <div className="mx-auto max-w-hub px-5 py-20 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl text-ink md:text-3xl">
              Right <span className="accent-serif text-2xl md:text-3xl">now</span>
            </h2>
            <span className="text-sm text-ink-soft">
              as of {formatUpdated(NOW_UPDATED)}
            </span>
          </div>
          <p className="mt-2 max-w-prose text-base text-ink-soft">
            What I&apos;m building, tending, and enjoying this week. Updated by
            hand, not by algorithm.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {NOW_NOTES.map((note, i) => (
            <Reveal key={note.pillar} delay={i * 80} className="bg-surface">
              <div className="h-full p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-soft">
                  {PILLARS[note.pillar].name}
                </p>
                <p className="text-base text-ink">{note.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

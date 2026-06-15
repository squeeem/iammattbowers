import Image from "next/image";
import Link from "next/link";
import { PILLAR_ORDER, PILLARS } from "@/lib/pillars";
import { IMAGES } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";

const PILLAR_IMAGE = {
  building: IMAGES.pillarBuilding,
  tending: IMAGES.pillarTending,
  enjoying: IMAGES.pillarEnjoying,
} as const;

export function Pillars() {
  return (
    <section className="mx-auto max-w-hub px-5 py-20 lg:px-8">
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
          The three threads
        </p>
        <h2 className="max-w-2xl text-2xl text-ink md:text-3xl">
          One life, three things I keep coming back to.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PILLAR_ORDER.map((p, i) => {
          const meta = PILLARS[p];
          return (
            <Reveal key={p} delay={i * 80}>
              <Link
                href={meta.href}
                className="group block overflow-hidden rounded-card border border-line bg-surface shadow-soft-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={PILLAR_IMAGE[p]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="photo-warm object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="accent-serif text-2xl">{meta.name}</h3>
                  <p className="mt-2 text-base text-ink-soft">{meta.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-deep">
                    Read the stream
                    <span className="nudge" aria-hidden>
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

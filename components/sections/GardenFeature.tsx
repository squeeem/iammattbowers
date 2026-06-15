import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function GardenFeature() {
  return (
    <section className="mx-auto max-w-hub px-5 py-20 lg:px-8">
      <Reveal>
        <div className="grid items-center gap-10 overflow-hidden rounded-card border border-line bg-surface shadow-soft-sm md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[420px]">
            <Image
              src={IMAGES.garden}
              alt="The ten-bed garden in summer"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="photo-warm object-cover"
            />
          </div>
          <div className="p-8 md:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
              A home project
            </p>
            <h2 className="text-2xl text-ink md:text-3xl">
              Ten raised beds, built{" "}
              <span className="accent-serif text-2xl md:text-3xl">slowly</span>,
              in Zone 7b.
            </h2>
            <p className="mt-4 text-base text-ink-soft">
              One piece of building our dream home, documented as I go — the
              layout, the soil math, what I&apos;d redo, and the video
              walkthrough. The real version, not the highlight reel.
            </p>
            <ButtonLink href="/building" variant="accent" className="mt-7">
              Follow the build
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

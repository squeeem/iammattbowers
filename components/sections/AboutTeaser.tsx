import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-hub px-5 py-20 lg:px-8">
      <Reveal>
        <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              src={IMAGES.about}
              alt="Matt Bowers"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="photo-warm object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Who&apos;s writing this
            </p>
            <h2 className="text-2xl text-ink md:text-3xl">
              I&apos;m a founder who got tired of moving fast.
            </h2>
            <p className="mt-4 max-w-prose text-base text-ink-soft">
              I build companies for a living, which taught me how much I was
              skipping. So I started a garden, put down the phone more often, and
              began writing about doing things with attention instead of speed.
              I&apos;m an expert at none of it except the part where I keep
              showing up.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-deep hover:underline"
            >
              The longer version
              <span className="nudge" aria-hidden>
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

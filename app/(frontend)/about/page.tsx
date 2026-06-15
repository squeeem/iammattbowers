import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "A founder who got tired of moving fast — building a home, tending a garden, and writing about doing things with attention.",
};

export default function AboutPage() {
  return (
    <div className="bg-canvas">
      {/* Header + portrait */}
      <section className="mx-auto max-w-hub px-5 pt-24 pb-12 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
                About
              </p>
              <h1 className="text-3xl text-ink md:text-4xl">
                I&apos;m a founder who got tired of{" "}
                <span className="accent-serif text-3xl md:text-4xl">
                  moving fast
                </span>
                .
              </h1>
              <p className="mt-5 text-lg text-ink-soft">
                I build companies for a living. It taught me a lot — and it
                taught me how much I was skipping. So a few years ago I started
                paying attention to the rest of it: the house we&apos;re slowly
                turning into a home, the garden out back, the people I share both
                with.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Image
                src={IMAGES.about}
                alt="Matt Bowers"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="photo-warm object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* The longer version */}
      <section className="mx-auto max-w-2xl px-5 py-12 lg:px-8">
        <Reveal>
          <div className="space-y-5 text-lg text-ink-soft">
            <p>
              I&apos;m an expert at building systems and a beginner at almost
              everything else here — which is sort of the point. I&apos;d rather
              show the real version of learning to grow tomatoes than pretend
              I&apos;ve got it figured out.
            </p>
            <p>
              This site is where those two halves meet. I write about building
              things — both businesses and the literal projects around our place
              — and about slowing down enough to actually live in the result.
              Some of it&apos;s practical. Some of it&apos;s just a record of a
              good day.
            </p>
            <p>
              If any of that sounds like your kind of thing, the newsletter is
              the best way to follow along.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-hub px-5 py-12 lg:px-8">
        <Reveal>
          <div className="rounded-card bg-accent-deep px-6 py-16 text-center sm:px-12">
            <h2 className="text-2xl text-surface sm:text-3xl">
              One letter, every{" "}
              <span className="accent-serif text-accent">Sunday</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-base text-[#C9CFC0]">
              What I built, tended, and enjoyed that week — in one short note
              you&apos;ll actually read with your coffee.
            </p>
            <div className="mt-8 flex justify-center">
              <SubscribeForm tone="onDeep" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Start-here link */}
      <section className="mx-auto max-w-2xl px-5 pb-24 pt-4 text-center lg:px-8">
        <Reveal>
          <p className="text-base text-ink-soft">
            Not sure where to begin?{" "}
            <Link
              href="/start"
              className="font-semibold text-accent-deep hover:underline"
            >
              Start here
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}

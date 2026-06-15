import { Metadata } from "next";
import Link from "next/link";
import { PILLAR_ORDER, PILLARS } from "@/lib/pillars";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Start here",
  description:
    "New here? Here's what this is, who's writing it, and the best place to begin.",
};

export default function StartPage() {
  return (
    <div className="bg-canvas">
      {/* Intro */}
      <section className="mx-auto max-w-2xl px-5 pt-24 pb-12 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
            New here? Start here
          </p>
          <h1 className="text-3xl text-ink md:text-4xl">
            I build businesses and{" "}
            <span className="accent-serif text-3xl md:text-4xl">tend</span> a
            garden.
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            This is where I write about doing good work without rushing it —
            building our dream home, tending the space and the people in it, and
            actually enjoying the life we&apos;re making in East Tennessee. No
            hustle, no highlight reel. Just the honest version, one project and
            one Sunday letter at a time.
          </p>
        </Reveal>
      </section>

      {/* The three threads */}
      <section className="mx-auto max-w-hub px-5 py-12 lg:px-8">
        <Reveal>
          <h2 className="text-2xl text-ink md:text-3xl">
            Three threads to follow
          </h2>
          <p className="mt-2 max-w-prose text-base text-ink-soft">
            Everything here lives under one of three:
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PILLAR_ORDER.map((p, i) => {
            const meta = PILLARS[p];
            return (
              <Reveal key={p} delay={i * 80}>
                <Link
                  href={meta.href}
                  className="group block h-full rounded-card border border-line bg-surface p-6 shadow-soft-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  <h3 className="accent-serif text-2xl">{meta.name}</h3>
                  <p className="mt-2 text-base text-ink-soft">{meta.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-deep">
                    Start reading
                    <span className="nudge" aria-hidden>
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Newsletter — the primary ask */}
      <section className="mx-auto max-w-hub px-5 py-12 lg:px-8">
        <Reveal>
          <div className="rounded-card bg-accent-deep px-6 py-16 text-center sm:px-12">
            <h2 className="text-2xl text-surface sm:text-3xl">
              The best way to follow along
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-base text-[#C9CFC0]">
              One short letter every{" "}
              <span className="accent-serif text-accent">Sunday</span> — what I
              built, tended, and enjoyed that week. It&apos;s the one thing I ask
              you to do here.
            </p>
            <div className="mt-8 flex justify-center">
              <SubscribeForm tone="onDeep" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* About link */}
      <section className="mx-auto max-w-2xl px-5 pb-24 pt-4 text-center lg:px-8">
        <Reveal>
          <p className="text-base text-ink-soft">
            Want the longer story first?{" "}
            <Link
              href="/about"
              className="font-semibold text-accent-deep hover:underline"
            >
              Read about me
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Sunday Letter",
  description:
    "One short letter every Sunday — what I built, tended, and enjoyed that week. No noise, no upsells.",
};

const WHAT_YOU_GET = [
  {
    title: "What I built",
    body: "A real look at the home projects and the businesses — the wins, the redo's, and what I'd do differently.",
  },
  {
    title: "What I tended",
    body: "Notes from the garden and the house, plus the occasional photo from an ordinary good weekend.",
  },
  {
    title: "What I enjoyed",
    body: "A recipe, a small habit, a thing worth slowing down for. The part that makes the rest worth it.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="bg-canvas">
      {/* Hero / signup */}
      <section className="mx-auto max-w-2xl px-5 pt-24 pb-12 text-center lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
            The Sunday Letter
          </p>
          <h1 className="text-3xl text-ink md:text-4xl">
            One letter, every{" "}
            <span className="accent-serif text-3xl md:text-4xl">Sunday</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-prose text-lg text-ink-soft">
            What I built, tended, and enjoyed that week — in one short note
            you&apos;ll actually read with your coffee. No noise, no upsells,
            unsubscribe anytime.
          </p>
          <div className="mt-8 flex justify-center">
            <SubscribeForm />
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Free. Unsubscribe anytime.
          </p>
        </Reveal>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-hub px-5 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {WHAT_YOU_GET.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-card border border-line bg-surface p-6 shadow-soft-sm">
                <h2 className="accent-serif text-2xl">{item.title}</h2>
                <p className="mt-2 text-base text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reassurance band */}
      <section className="mx-auto max-w-hub px-5 py-12 lg:px-8">
        <Reveal>
          <div className="rounded-card bg-accent-deep px-6 py-16 text-center sm:px-12">
            <h2 className="text-2xl text-surface sm:text-3xl">
              Written by hand, not by{" "}
              <span className="accent-serif text-accent">algorithm</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-base text-[#C9CFC0]">
              No daily firehose, no growth-hacking. Just one person writing one
              honest note a week. If it&apos;s ever not worth your inbox, the
              unsubscribe link is right there.
            </p>
            <div className="mt-8 flex justify-center">
              <SubscribeForm tone="onDeep" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer link */}
      <section className="mx-auto max-w-2xl px-5 pb-24 pt-4 text-center lg:px-8">
        <Reveal>
          <p className="text-base text-ink-soft">
            Want a feel for it first?{" "}
            <Link
              href="/enjoying"
              className="font-semibold text-accent-deep hover:underline"
            >
              Read recent posts
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}

import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Reveal } from "@/components/ui/Reveal";

export function NewsletterBand() {
  return (
    <section className="mx-auto max-w-hub px-5 py-12 lg:px-8">
      <Reveal>
        <div className="rounded-card bg-accent-deep px-6 py-16 text-center sm:px-12">
          <h2 className="text-2xl text-surface sm:text-3xl">
            One letter, every{" "}
            <span className="accent-serif text-2xl text-accent sm:text-3xl">
              Sunday
            </span>
            .
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-base text-[#C9CFC0]">
            What I built, tended, and noticed that week — in one short note
            you&apos;ll actually read with your coffee. No noise, no upsells.
          </p>
          <div className="mt-8 flex justify-center">
            <SubscribeForm tone="onDeep" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

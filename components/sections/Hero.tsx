import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* full-bleed photo with warm gradient for text legibility */}
      <Image
        src={IMAGES.hero}
        alt="Raised garden beds in morning light"
        fill
        priority
        sizes="100vw"
        className="photo-warm -z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-darkest/85 via-green-darkest/45 to-green-darkest/30" />

      <div className="mx-auto flex min-h-[78vh] max-w-hub flex-col justify-end px-5 pb-16 pt-32 lg:px-8">
        <div className="stagger max-w-2xl">
          <p className="mb-5 inline-block rounded-full bg-accent px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-ink">
            Building · Tending · Enjoying
          </p>
          <h1 className="text-4xl text-[var(--canvas)] md:text-5xl">
            I build businesses and{" "}
            <span className="accent-serif text-4xl text-accent md:text-5xl">
              tend
            </span>{" "}
            a garden.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#E6E2D6]">
            Notes on doing good work without rushing it — from a founder learning
            to grow things slowly in East Tennessee. One short letter, every
            Sunday.
          </p>
          <div className="mt-8 max-w-md">
            <SubscribeForm tone="onDeep" buttonLabel="Subscribe" />
            <p className="mt-3 text-sm text-[#C9CFC0]">
              Free. No spam. Unsubscribe anytime.{" "}
              <Link href="/start" className="underline underline-offset-2">
                New here? Start here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { PILLAR_ORDER, PILLARS } from "@/lib/pillars";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

const CONNECT = [
  { label: "YouTube", href: "https://youtube.com/@iammattbowers" },
  { label: "Instagram", href: "https://instagram.com/iam.mattbowers" },
  { label: "Substack", href: "https://iammattbowers.substack.com" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="mx-auto max-w-hub px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="mb-3 text-xl font-semibold text-ink">
              One letter, every <span className="accent-serif text-xl">Sunday</span>.
            </p>
            <p className="mb-5 max-w-sm text-base text-ink-soft">
              What I built, tended, and noticed — in one short note you&apos;ll
              actually read with your coffee.
            </p>
            <SubscribeForm />
          </div>

          <nav aria-label="Writing">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-soft">
              Writing
            </h2>
            <ul className="space-y-2">
              {PILLAR_ORDER.map((p) => (
                <li key={p}>
                  <Link
                    href={PILLARS[p].href}
                    className="text-base text-ink transition-colors hover:text-accent-deep"
                  >
                    {PILLARS[p].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="text-base text-ink transition-colors hover:text-accent-deep"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Connect">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-soft">
              Connect
            </h2>
            <ul className="space-y-2">
              {CONNECT.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-ink transition-colors hover:text-accent-deep"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Matt Bowers</span>
          <span>Built slowly, in East Tennessee.</span>
        </div>
      </div>
    </footer>
  );
}

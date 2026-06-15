import Link from "next/link";
import { Pillar, PILLARS } from "@/lib/pillars";

interface PillarTagProps {
  pillar: Pillar;
  asLink?: boolean;
  className?: string;
}

const swatch: Record<Pillar, string> = {
  building: "bg-accent-deep",
  tending: "bg-accent",
  enjoying: "bg-ink",
};

export function PillarTag({
  pillar,
  asLink = false,
  className = "",
}: PillarTagProps) {
  const meta = PILLARS[pillar];
  const inner = (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${swatch[pillar]}`} aria-hidden />
      {meta.name}
    </span>
  );

  if (asLink) {
    return (
      <Link
        href={meta.href}
        className="rounded-full transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

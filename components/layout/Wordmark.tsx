import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`text-lg font-bold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
    >
      Matt <span className="accent-serif text-lg">Bowers</span>
    </Link>
  );
}

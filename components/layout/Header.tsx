"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PILLAR_ORDER, PILLARS } from "@/lib/pillars";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

const NAV_PILLARS = PILLAR_ORDER.map((p) => PILLARS[p]);

export function Header() {
  const [openPillar, setOpenPillar] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // §2 header gains soft elevation + tightens once scrolled
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenPillar(null);
        setDrawerOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  function openMenu(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenPillar(slug);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenPillar(null), 120);
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-canvas transition-all duration-300 ${
        scrolled
          ? "border-b border-line shadow-soft-sm"
          : "border-b border-line/60"
      }`}
    >
      <div
        className={`mx-auto flex max-w-hub items-center justify-between px-5 transition-all duration-300 lg:px-8 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <div className="flex items-center gap-8">
          <Wordmark />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_PILLARS.map((p) => {
              const isOpen = openPillar === p.slug;
              return (
                <div
                  key={p.slug}
                  className="relative"
                  onMouseEnter={() => openMenu(p.slug)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={p.href}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onFocus={() => openMenu(p.slug)}
                    className="flex items-center gap-1 rounded-full px-3 py-2 text-base font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep"
                  >
                    {p.name}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                  {isOpen && (
                    <div
                      className="absolute left-0 top-full w-80 pt-3"
                      onMouseEnter={() => openMenu(p.slug)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="origin-top animate-[fade-up_240ms_var(--ease-out)] rounded-card border border-line bg-surface p-5 shadow-soft">
                        <p className="mb-4 text-sm text-ink-soft">{p.blurb}</p>
                        <Link
                          href={p.href}
                          className="group inline-flex items-center gap-1 px-3 text-sm font-semibold text-accent-deep hover:underline"
                        >
                          All of {p.name}
                          <span className="nudge" aria-hidden>
                            &rarr;
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/about"
              className="rounded-full px-3 py-2 text-base font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink href="/newsletter" size="sm" className="hidden sm:inline-flex">
            Subscribe
          </ButtonLink>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="rounded-full p-2 text-ink lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile full-screen drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-canvas lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <Wordmark />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 py-8" aria-label="Mobile">
            {NAV_PILLARS.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                onClick={() => setDrawerOpen(false)}
                className="border-b border-line py-4"
              >
                <span className="text-2xl font-semibold text-ink">{p.name}</span>
                <span className="mt-1 block text-base text-ink-soft">{p.blurb}</span>
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setDrawerOpen(false)}
              className="border-b border-line py-4 text-2xl font-semibold text-ink"
            >
              About
            </Link>
            <ButtonLink
              href="/newsletter"
              className="mt-6 w-full"
              onClick={() => setDrawerOpen(false)}
            >
              Subscribe to the letter
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}

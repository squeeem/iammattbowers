"use client";

import { useEffect, useState } from "react";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

const DISMISS_KEY = "cta-dismissed";
const SHOW_AFTER = 600; // px scrolled before the bar appears

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // assume dismissed until we read storage

  // read dismissal once on mount
  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  // reveal past the scroll threshold
  useEffect(() => {
    if (dismissed) return;
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-accent-deep transition-transform duration-300 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-hub flex-col items-center gap-3 px-5 py-3 sm:flex-row sm:justify-between lg:px-8">
        <p className="text-center text-base text-surface sm:text-left">
          One short letter, every{" "}
          <span className="accent-serif text-accent">Sunday</span>. No noise.
        </p>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <SubscribeForm tone="onDeep" className="flex-1 sm:w-80" />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="shrink-0 rounded-full p-2 text-surface/70 transition-colors hover:bg-black/15 hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

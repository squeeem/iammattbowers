"use client";

import { FormEvent, useState } from "react";

type Tone = "light" | "onDeep";

interface SubscribeFormProps {
  /** "light" on canvas/sand; "onDeep" on the forest-green band */
  tone?: Tone;
  buttonLabel?: string;
  className?: string;
}

// Substack publication slug — wire to real endpoint in newsletter step.
const SUBSTACK_URL = "https://iammattbowers.substack.com";

export function SubscribeForm({
  tone = "light",
  buttonLabel = "Subscribe",
  className = "",
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Placeholder: hand off to Substack. Real API wiring lands in build step 6.
    window.open(
      `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setState("done");
  }

  const inputCls =
    tone === "onDeep"
      ? "bg-surface text-ink placeholder:text-ink-soft"
      : "bg-surface text-ink placeholder:text-ink-soft border border-line";

  if (state === "done") {
    return (
      <p
        className={`text-base ${tone === "onDeep" ? "text-surface" : "text-ink"} ${className}`}
      >
        Check the tab that just opened to confirm — see you Sunday.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-md flex-col gap-2 sm:flex-row ${className}`}
    >
      <label htmlFor="subscribe-email" className="sr-only">
        Email address
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={`flex-1 rounded-full px-5 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${inputCls}`}
      />
      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 text-base font-semibold text-ink transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

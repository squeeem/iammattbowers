import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,filter,box-shadow] duration-200 ease-out hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-60";

const sizes = {
  md: "px-6 py-3 text-base",
  sm: "px-4 py-2 text-sm",
} as const;

const variants: Record<Variant, string> = {
  // primary brand button — forest green fill, cream text
  primary: "bg-accent-deep text-surface hover:bg-ink",
  // lighter, friendlier — chartreuse fill, ink text
  accent: "bg-accent text-ink hover:brightness-95",
  ghost: "text-ink border border-line hover:bg-sand",
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonBaseProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

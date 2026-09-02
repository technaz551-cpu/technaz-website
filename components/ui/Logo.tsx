import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeStyles = {
  sm: "text-[17px]",
  md: "text-[20px]",
  lg: "text-[24px]",
  xl: "text-[28px]",
};

function LogoMark({ variant }: { variant: "dark" | "light" }) {
  const tech = variant === "light" ? "text-white" : "text-brand-dark";

  return (
    <>
      <span className={tech}>TECH</span>
      <span className="text-brand-green">
        N
        <span className="relative inline-block">
          <span className={tech}>A</span>
          <svg
            viewBox="0 0 12 10"
            className="absolute -bottom-1 left-1/2 h-2 w-2.5 -translate-x-1/2 fill-brand-green"
            aria-hidden
          >
            <path d="M6 0L11.2 9H0.8L6 0Z" />
          </svg>
        </span>
        Z
      </span>
    </>
  );
}

export function Logo({ className, variant = "dark", size = "lg" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center font-bold uppercase tracking-[0.02em] transition-opacity hover:opacity-85",
        sizeStyles[size],
        className,
      )}
    >
      <LogoMark variant={variant} />
    </Link>
  );
}

export function LogoWatermark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-bold uppercase tracking-wide",
        className,
      )}
    >
      <span className="text-white">TECH</span>
      <span className="text-brand-green">NAZ</span>
    </span>
  );
}

export function LogoLarge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-[clamp(3.5rem,16vw,10rem)] font-bold uppercase leading-none tracking-tight text-transparent",
        className,
      )}
      style={{ WebkitTextStroke: "1.5px rgba(148, 163, 184, 0.45)" }}
      aria-hidden
    >
      TECHNAZ
    </div>
  );
}

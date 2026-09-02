import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  variant?: "light" | "mint";
  className?: string;
  children: React.ReactNode;
};

export function GridBackground({
  variant = "light",
  className,
  children,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        variant === "mint" ? "bg-grid-mint" : "bg-grid-light",
        className,
      )}
    >
      {children}
    </div>
  );
}

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "../utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts, in milliseconds */
  delay?: number;
}

/** Wraps content in a smooth fade-up animation triggered on scroll */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

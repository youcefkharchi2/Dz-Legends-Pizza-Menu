import { RESTAURANT } from "../config";
import { cn } from "../utils/cn";

interface LogoProps {
  className?: string;
  /** Adds the yellow ring used in the navbar and footer */
  ring?: boolean;
  /** Loads the image eagerly (used for the hero) */
  priority?: boolean;
}

/** Official DZ LEGENDS PIZZA logo (served from /public/images/dz-logo.jpg) */
export function Logo({ className, ring = true, priority = false }: LogoProps) {
  return (
    <img
      src={RESTAURANT.logo}
      alt="Logo DZ LEGENDS PIZZA"
      width={512}
      height={512}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn(
        "aspect-square shrink-0 rounded-full object-cover",
        ring && "shadow-[0_0_24px_rgba(255,208,0,0.25)] ring-2 ring-brand/70",
        className,
      )}
    />
  );
}

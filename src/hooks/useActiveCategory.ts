import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently under the sticky
 * category bar. Uses requestAnimationFrame to keep scrolling smooth.
 */
export function useActiveSection(sectionIds: string[], offset = 180): string | undefined {
  const [active, setActive] = useState<string | undefined>(sectionIds[0]);
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = idsKey ? idsKey.split("|") : [];
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string | undefined = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [idsKey, offset]);

  return active;
}

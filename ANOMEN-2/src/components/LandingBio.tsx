import { useEffect, useRef } from "react";
import { aboutCopy } from "./aboutCopy";

export function LandingBio() {
  const bioRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const bio = bioRef.current!;
    const main = bio.closest("main")!;
    let lastCount = -1;
    const length = aboutCopy.reduce((sum, paragraph) => sum + paragraph.length, 0);
    const update = () => {
      const count = Math.floor(Math.min(1, Math.max(0, window.scrollY / 900)) * length);
      if (count === lastCount) return;
      lastCount = count;
      let remaining = count;
      aboutCopy.forEach((paragraph, index) => {
        if (textRefs.current[index]) textRefs.current[index]!.textContent = paragraph.slice(0, Math.max(0, remaining));
        remaining -= paragraph.length;
      });
    };
    const measure = () => {
      main.style.setProperty("--bio-bottom", `${bio.getBoundingClientRect().bottom + 24}px`);
    };
    update(); measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bio);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, []);
  return (
    <div ref={bioRef} className="landing-bio">
      <div className="sr-only">{aboutCopy.join("\n\n")}</div>
      <div aria-hidden="true">
        {aboutCopy.map((paragraph, index) => (
          <p key={index}>
            <span className="landing-bio-measure">{paragraph}</span>
            <span className="landing-bio-reveal" ref={(element) => { textRefs.current[index] = element; }} />
          </p>
        ))}
      </div>
    </div>
  );
}

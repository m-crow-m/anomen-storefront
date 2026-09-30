import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function WorkCarousel({ heading, children, workType, maxCardCount }: {
  heading: ReactNode;
  children: ReactNode;
  workType: string;
  maxCardCount: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardCount, setCardCount] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const sticky = stickyRef.current!;
    const viewport = viewportRef.current!;
    const track = viewport.firstElementChild as HTMLElement;
    const mobile = window.matchMedia("(max-width: 767px)");
    setCardCount(track.children.length);
    setActiveIndex(0);
    viewport.scrollLeft = 0;
    let distance = 0;
    let start = 0;

    // One vertical scroll pixel moves the cards one horizontal pixel.
    // No easing or delayed interpolation: reversing direction is immediate.
    const update = () => {
      if (mobile.matches) return;
      const offset = Math.max(0, Math.min(distance, window.scrollY - start));
      offsetRef.current = offset;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      viewport.style.setProperty("--edge-fade", `${Math.min(160, distance - offset)}px`);
    };
    const measure = () => {
      if (mobile.matches) {
        section.style.height = "auto";
        track.style.transform = "none";
        return;
      }
      viewport.scrollLeft = 0;
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      start = section.getBoundingClientRect().top + window.scrollY;
      // Reserve the same runway for both categories so switching to the
      // shorter list cannot clamp the document's current scroll position.
      const card = track.firstElementChild as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).columnGap);
      const runway = Math.max(0, (card.offsetWidth + gap) * maxCardCount - gap - viewport.clientWidth);
      section.style.height = `${sticky.offsetHeight + Math.max(distance, runway)}px`;
      update();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(sticky);
    observer.observe(track);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    mobile.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      mobile.removeEventListener("change", measure);
    };
  }, [workType, maxCardCount]);

  return (
    <section id="selected-work" ref={sectionRef} className="portfolio-carousel" aria-label="Selected work carousel">
      <div ref={stickyRef} className="portfolio-carousel-sticky">
        {heading}
        <div ref={viewportRef} className="portfolio-carousel-viewport"
          onScroll={() => {
            if (!window.matchMedia("(max-width: 767px)").matches) return;
            const viewport = viewportRef.current!;
            const track = viewport.firstElementChild as HTMLElement;
            const secondCard = track.children[1] as HTMLElement | undefined;
            const step = secondCard?.offsetLeft ?? viewport.clientWidth;
            setActiveIndex(Math.round(viewport.scrollLeft / step));
          }}
          onFocusCapture={(event) => {
            if (window.matchMedia("(max-width: 767px)").matches) return;
            const card = (event.target as HTMLElement).closest(".portfolio-carousel-track > button") as HTMLElement | null;
            const viewport = viewportRef.current;
            const section = sectionRef.current;
            if (!card || !viewport || !section || !card.matches(":focus-visible")) return;
            const track = viewport.firstElementChild as HTMLElement;
            const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
            const start = section.getBoundingClientRect().top + window.scrollY;
            const left = card.offsetLeft;
            if (left < offsetRef.current || left + card.offsetWidth > offsetRef.current + viewport.clientWidth) {
              window.scrollTo({ top: start + Math.min(left, distance), behavior: "instant" });
            }
          }}>
          {children}
        </div>
        <div className="portfolio-carousel-controls">
          <div>
            {([-1, 1] as const).map((direction) => (
              <button key={direction} type="button" aria-label={direction < 0 ? "Previous projects" : "Next projects"}
                onClick={() => {
                  const section = sectionRef.current!;
                  const viewport = viewportRef.current!;
                  const track = viewport.firstElementChild as HTMLElement;
                  const card = track.firstElementChild as HTMLElement;
                  const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
                  const start = section.getBoundingClientRect().top + window.scrollY;
                  const next = Math.max(0, Math.min(track.scrollWidth - viewport.clientWidth, offsetRef.current + direction * step));
                  window.scrollTo({ top: start + next, behavior: "instant" });
                }}><ChevronDown aria-hidden="true" strokeWidth={2.5} style={{ transform: `rotate(${direction < 0 ? 90 : -90}deg)` }} /></button>
            ))}
          </div>
        </div>
        <div className="portfolio-carousel-dots" aria-label="Choose project">
          {Array.from({ length: cardCount }, (_, index) => (
            <button key={index} type="button" aria-label={`Go to project ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => {
                const viewport = viewportRef.current!;
                const card = viewport.firstElementChild!.children[index] as HTMLElement;
                viewport.scrollTo({ left: card.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
              }}><span /></button>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import bird from "../assets/bird.svg";

export function WorkCarousel({ heading, children, workType, maxCardCount, printCardCount, onCategoryChange }: {
  heading: ReactNode;
  children: ReactNode;
  workType: string;
  maxCardCount: number;
  printCardCount: number;
  onCategoryChange: (category: "print" | "interactive") => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [cardCount, setCardCount] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const sticky = stickyRef.current!;
    const viewport = viewportRef.current!;
    const track = viewport.firstElementChild as HTMLElement;
    const mobile = window.matchMedia("(max-width: 767px)");
    setCardCount(track.children.length);
    setActiveIndex(-1);
    let distance = 0;
    let start = 0;
    const update = () => {
      if (mobile.matches) return;
      const progress = Math.max(0, Math.min(distance, window.scrollY - start));
      progressRef.current = progress;
      track.style.transform = `translate3d(${viewport.clientWidth - progress}px, 0, 0)`;
      section.dataset.entered = String(progress > 0);
      const cards = Array.from(track.children) as HTMLElement[];
      const center = progress - viewport.clientWidth / 2;
      const index = cards.reduce((best, card, i) => Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - center) ? i : best, 0);
      onCategoryChange(index < printCardCount ? "print" : "interactive");
      const reveal = Math.min(1, progress / 240);
      section.style.setProperty("--filter-reveal", String(reveal));
      section.style.setProperty("--filter-entry", `${(1 - reveal) * 100}px`);
    };
    const measure = () => {
      if (mobile.matches) {
        section.style.height = "auto";
        track.style.transform = "none";
        return;
      }
      if (viewport.scrollLeft) viewport.scrollLeft = 0;
      const lastCard = track.lastElementChild as HTMLElement;
      distance = viewport.clientWidth / 2 + lastCard.offsetLeft + lastCard.offsetWidth / 2;
      section.dataset.maxProgress = String(distance);
      start = section.getBoundingClientRect().top + window.scrollY;
      const card = track.firstElementChild as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const runway = (card.offsetWidth + gap) * maxCardCount - gap;
      section.style.height = `${sticky.offsetHeight + Math.max(distance, runway)}px`;
      update();
    };
    if (mobile.matches) {
      viewport.scrollLeft = (track.firstElementChild as HTMLElement).offsetLeft;
      setActiveIndex(0);
      section.style.setProperty("--filter-reveal", "1");
      section.style.setProperty("--filter-entry", "0px");
    } else {
      viewport.scrollLeft = 0;
    }
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
  }, [maxCardCount, printCardCount, onCategoryChange]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reducedMotion.matches) return;

    const name = document.querySelector<HTMLElement>(".site-name");
    let frame = 0;
    let previousTime = 0;
    let idleUntil = window.scrollY > 1 ? performance.now() + 5000 : 0;
    let entranceComplete = false;
    let running = false;
    let position = window.scrollY;
    let expectedY = position;
    let direction = 1;
    let speed = 0;

    const activity = () => {
      idleUntil = performance.now() + 5000;
      running = false;
      speed = 0;
    };
    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min((time - previousTime) / 1000, .064) : 0;
      previousTime = time;
      const overlayOpen = document.body.classList.contains("dialog-open") || document.querySelector(".nav-menu-open");
      if (document.hidden || overlayOpen) activity();
      if (!entranceComplete || time < idleUntil || !desktop.matches || reducedMotion.matches) {
        running = false;
        position = window.scrollY;
        expectedY = position;
        frame = requestAnimationFrame(tick);
        return;
      }
      const section = sectionRef.current;
      if (!section) return;
      const start = section.getBoundingClientRect().top + window.scrollY;
      const end = start + Number(section.dataset.maxProgress || 0);
      if (end <= start) { frame = requestAnimationFrame(tick); return; }
      if (!running) { position = window.scrollY; expectedY = position; speed = 0; running = true; }
      const remaining = Math.max(0, direction > 0 ? end - position : position - start);
      // Ease into each turn, retaining fractional progress at every refresh rate.
      const targetSpeed = Math.min(52, Math.sqrt(2 * 65 * remaining));
      speed += Math.max(-65 * elapsed, Math.min(65 * elapsed, targetSpeed - speed));
      position += direction * speed * elapsed;
      if (direction > 0 && end - position < .1) { position = end; direction = -1; speed = 0; }
      else if (direction < 0 && position - start < .1) { position = start; direction = 1; speed = 0; }
      expectedY = position;
      window.scrollTo({ top: position, behavior: "instant" });
      frame = requestAnimationFrame(tick);
    };
    const animationFinished = (event: AnimationEvent) => {
      if (event.animationName === "name-arrival") entranceComplete = true;
    };
    const unexpectedScroll = () => {
      if (!running || Math.abs(window.scrollY - expectedY) > 2) activity();
    };
    const entrance = name?.getAnimations().find((animation) =>
      "animationName" in animation && animation.animationName === "name-arrival");
    entranceComplete = !entrance || entrance.playState === "finished";
    name?.addEventListener("animationend", animationFinished);
    const inputs = ["wheel", "touchmove", "pointerdown", "keydown"] as const;
    inputs.forEach((type) => window.addEventListener(type, activity, { passive: true }));
    window.addEventListener("scroll", unexpectedScroll, { passive: true });
    desktop.addEventListener("change", activity);
    reducedMotion.addEventListener("change", activity);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      name?.removeEventListener("animationend", animationFinished);
      inputs.forEach((type) => window.removeEventListener(type, activity));
      window.removeEventListener("scroll", unexpectedScroll);
      desktop.removeEventListener("change", activity);
      reducedMotion.removeEventListener("change", activity);
    };
  }, []);

  useLayoutEffect(() => {
    const sticky = stickyRef.current!;
    const viewport = viewportRef.current!;
    const card = viewport.firstElementChild!.children[Math.max(0, activeIndex)] as HTMLElement;
    const dots = sticky.querySelector<HTMLElement>(".portfolio-carousel-dots");
    const bird = sticky.querySelector<HTMLElement>(".mobile-work-bird");
    if (!card || !dots || !bird) return;
    const measure = () => {
      if (!window.matchMedia("(max-width: 767px)").matches) return;
      const viewportRect = viewport.getBoundingClientRect();
      // Center the complete button (artwork plus caption) in the screen,
      // rather than in the smaller space left below the filters.
      sticky.style.setProperty("--mobile-card-shift", `${window.innerHeight / 2 - (viewportRect.top + viewportRect.height / 2)}px`);
      const origin = sticky.getBoundingClientRect().top;
      const midpoint = (card.getBoundingClientRect().bottom + dots.getBoundingClientRect().top) / 2;
      sticky.style.setProperty("--mobile-bird-top", `${midpoint - origin - bird.offsetHeight / 2}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    [sticky, viewport, card, bird].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeIndex, cardCount]);

  const go = (progress: number) => {
    const section = sectionRef.current!;
    const viewport = viewportRef.current!;
    const track = viewport.firstElementChild as HTMLElement;
    const start = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + Math.max(0, Math.min(Number(section.dataset.maxProgress) || track.scrollWidth, progress)), behavior: "instant" });
  };

  return (
    <section id="selected-work" ref={sectionRef} className="portfolio-carousel" aria-label="Selected work carousel"
      onClickCapture={(event) => {
        const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-category]");
        if (!button) return;
        const viewport = viewportRef.current!;
        const index = button.dataset.category === "interactive" ? printCardCount : 0;
        const card = viewport.firstElementChild!.children[index] as HTMLElement;
        const left = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
        if (window.matchMedia("(max-width: 767px)").matches) viewport.scrollTo({ left, behavior });
        else {
          const start = sectionRef.current!.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: start + viewport.clientWidth + left, behavior });
        }
      }}>
      <div ref={stickyRef} className="portfolio-carousel-sticky">
        {heading}
        <div ref={viewportRef} className="portfolio-carousel-viewport"
          onScroll={() => {
            if (!window.matchMedia("(max-width: 767px)").matches) return;
            const viewport = viewportRef.current!;
            const cards = Array.from(viewport.firstElementChild!.children) as HTMLElement[];
            const first = cards[0];
            const step = cards[1] ? cards[1].offsetLeft - first.offsetLeft : viewport.clientWidth;
            const index = viewport.scrollLeft < first.offsetLeft / 2 ? -1 : Math.max(0, Math.min(cards.length - 1, Math.round((viewport.scrollLeft - first.offsetLeft) / step)));
            setActiveIndex(index);
            if (index >= 0) onCategoryChange(index < printCardCount ? "print" : "interactive");
            const reveal = Math.min(1, viewport.scrollLeft / 100);
            sectionRef.current!.style.setProperty("--filter-reveal", String(reveal));
            sectionRef.current!.style.setProperty("--filter-entry", `${(1 - reveal) * 100}px`);
          }}
          onFocusCapture={(event) => {
            const card = (event.target as HTMLElement).closest(".portfolio-carousel-track > button") as HTMLElement | null;
            if (!card || !card.matches(":focus-visible")) return;
            const viewport = viewportRef.current!;
            if (window.matchMedia("(max-width: 767px)").matches) {
              viewport.scrollTo({ left: card.offsetLeft, behavior: "instant" });
              return;
            }
            const left = card.offsetLeft + viewport.clientWidth - progressRef.current;
            if (left < 0 || left + card.offsetWidth > viewport.clientWidth) go(viewport.clientWidth + card.offsetLeft);
          }}>
          {children}
        </div>
        <img className="mobile-work-bird" src={bird} alt="" aria-hidden="true" />
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

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoId: string;
}

export function VideoDialog({ isOpen, onClose, title, videoId }: VideoDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("dialog-open");
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key !== "Tab") return;
      const elements = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href], iframe");
      const first = elements?.[0];
      const last = elements?.[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("dialog-open");
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="video-dialog dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="motion-video-title"
      ref={dialogRef} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="video-dialog-panel">
        <header>
          <h2 id="motion-video-title">{title}</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close video"><X aria-hidden="true" /></button>
        </header>
        <div className="video-dialog-player">
          <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1`}
            title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
      </section>
    </div>
  );
}

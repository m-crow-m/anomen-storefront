import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs?url";
import resumePdf from "../assets/Jaeden_I-C_Resume-2026.pdf";

GlobalWorkerOptions.workerSrc = pdfWorker;

export function ResumePage() {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pdfDocRef = useRef<Awaited<ReturnType<typeof getDocument>>["promise"] extends Promise<infer T> ? T : never | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    const container = containerRef.current;
    if (!viewer || !container) return;

    let cancelled = false;
    let resizeTimer: number | null = null;
    let lastRenderedWidth = 0;
    let renderRunId = 0;

    const renderDocument = async (force = false) => {
      if (!viewer || !container || cancelled) return;
      const currentRunId = ++renderRunId;

      const containerWidth = Math.max(viewer.clientWidth - 48, 320);
      if (!force && Math.abs(containerWidth - lastRenderedWidth) < 8) {
        return;
      }

      setIsLoading(true);
      setError(null);
      container.replaceChildren();

      try {
        if (!pdfDocRef.current) {
          pdfDocRef.current = await getDocument(resumePdf).promise;
        }
        if (cancelled || currentRunId !== renderRunId) return;

        const pdfDoc = pdfDocRef.current;
        lastRenderedWidth = containerWidth;
        const deviceScale = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1) {
          if (cancelled || currentRunId !== renderRunId) return;
          const page = await pdfDoc.getPage(pageNumber);
          if (cancelled || currentRunId !== renderRunId) return;
          const baseViewport = page.getViewport({ scale: 1 });
          const targetWidth = Math.min(containerWidth, 1080);
          const fitScale = targetWidth / baseViewport.width;
          const renderScale = fitScale * deviceScale;
          const viewport = page.getViewport({ scale: renderScale });
          const displayWidth = Math.ceil(viewport.width / deviceScale);
          const displayHeight = Math.ceil(viewport.height / deviceScale);

          const pageShell = document.createElement("div");
          pageShell.className = "mx-auto mb-8 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]";
          pageShell.style.width = `${displayWidth}px`;

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) continue;

          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          canvas.style.width = `${displayWidth}px`;
          canvas.style.height = `${displayHeight}px`;
          canvas.className = "block";

          pageShell.appendChild(canvas);
          container.appendChild(pageShell);

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;
          if (cancelled || currentRunId !== renderRunId) return;
        }
      } catch (renderError) {
        if (!cancelled) {
          console.error(renderError);
          setError("Unable to render the resume.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    const queueRender = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        void renderDocument(false);
      }, 120);
    };

    void renderDocument(true);
    window.addEventListener("resize", queueRender);

    return () => {
      cancelled = true;
      renderRunId += 1;
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      window.removeEventListener("resize", queueRender);
      container.replaceChildren();
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
        pdfDocRef.current = null;
      }
    };
  }, []);

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-10 md:pb-16 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {isLoading ? (
          <div className="py-24 text-center text-xs uppercase tracking-[0.28em] text-neutral-500">
            Loading
          </div>
        ) : null}

        {error ? (
          <div className="py-24 text-center text-sm text-neutral-700">
            {error}
          </div>
        ) : null}

        <div ref={viewerRef} className="mx-auto flex min-h-[60vh] justify-center">
          <div
            ref={containerRef}
            className={`mx-auto flex flex-col items-center ${error ? "hidden" : ""} ${isLoading ? "opacity-0" : "opacity-100"}`}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition-colors hover:bg-black hover:text-white"
          >
            Download
          </a>
        </div>
      </div>
    </main>
  );
}

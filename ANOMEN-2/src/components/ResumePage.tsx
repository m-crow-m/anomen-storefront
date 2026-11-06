import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs?url";
import resumePdf from "../assets/JaedenCrow_Resume.pdf";

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
    let lastRenderedHeight = 0;
    let renderRunId = 0;

    const renderDocument = async (force = false) => {
      if (!viewer || !container || cancelled) return;
      const currentRunId = ++renderRunId;

      const containerWidth = Math.max(viewer.clientWidth, 1);
      const containerHeight = Math.max(viewer.clientHeight, 1);
      if (!force && Math.abs(containerWidth - lastRenderedWidth) < 2 && Math.abs(containerHeight - lastRenderedHeight) < 2) {
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
        lastRenderedHeight = containerHeight;
        const deviceScale = Math.min(4, Math.max(2, (window.devicePixelRatio || 1) * 1.5));

        for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1) {
          if (cancelled || currentRunId !== renderRunId) return;
          const page = await pdfDoc.getPage(pageNumber);
          if (cancelled || currentRunId !== renderRunId) return;
          const baseViewport = page.getViewport({ scale: 1 });
          const targetWidth = Math.min(containerWidth, 1080);
          const fitScale = Math.min(targetWidth / baseViewport.width, containerHeight / baseViewport.height);
          const displayWidth = Math.floor(baseViewport.width * fitScale);
          const displayHeight = displayWidth * baseViewport.height / baseViewport.width;
          const renderScale = (displayWidth / baseViewport.width) * deviceScale;
          const viewport = page.getViewport({ scale: renderScale });

          const pageShell = document.createElement("div");
          pageShell.className = "resume-sheet";
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
    const resizeObserver = new ResizeObserver(queueRender);
    resizeObserver.observe(viewer);
    window.addEventListener("resize", queueRender);

    return () => {
      cancelled = true;
      renderRunId += 1;
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", queueRender);
      container.replaceChildren();
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
        pdfDocRef.current = null;
      }
    };
  }, []);

  return (
    <main className="resume-page">
      <div className="resume-layout">
        <div className="resume-toolbar">
          <h1 className="sr-only">Résumé</h1>
          <a href={resumePdf} download="Jaeden-Crow-Resume.pdf" className="resume-download">
            Download
          </a>
        </div>
        <div ref={viewerRef} className="resume-viewer" aria-busy={isLoading}>
          {isLoading && <p className="resume-status" role="status">Loading résumé…</p>}
          {error && <p className="resume-status" role="alert">{error}</p>}
          <div ref={containerRef} className={`resume-pages ${error || isLoading ? "opacity-0" : "opacity-100"}`} role="img" aria-label="Jaeden Crow résumé. Download the PDF using the link above." />
        </div>
      </div>
    </main>
  );
}

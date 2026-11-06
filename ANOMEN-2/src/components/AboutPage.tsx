/**
 * About Page Component
 */

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { aboutCopy } from "./aboutCopy";
import jaedenPortrait from "../assets/JaedenCrow.jpeg";

export function AboutPage() {
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  if (desktop) return <Navigate to="/portfolio" replace />;
  return (
    <main className="about-page min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <section className="px-4 md:px-12 lg:px-20">
        <div className="about-layout mx-auto">
          <h1
            className="sr-only"
          >
            ABOUT ME
          </h1>
          <div className="about-portrait">
            <img
              src={jaedenPortrait}
              alt="Jaeden Ives-Crow Vaughankraska"
              className="w-full h-auto"
            />
          </div>
          <div className="about-copy text-sm md:text-base leading-relaxed text-neutral-700">
            {aboutCopy.map((paragraph, index) => <p className={index ? "mt-8" : "mt-0"} key={index}>{paragraph}</p>)}
          </div>
        </div>
      </section>
    </main>
  );
}

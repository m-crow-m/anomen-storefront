/**
 * ANOMEN Portfolio - Main Application
 * A brutalist design portfolio site
 */

import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import bird from "./assets/bird.svg";
import meadow from "./assets/Meadow.jpg";
import { useEffect, useState } from "react";

// Layout Components
import { Navigation } from "./components/Navigation";

// Page Components
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { ResumePage } from "./components/ResumePage";

/**
 * Root application component
 * Handles routing, global state, and custom cursor interactions
 */
export default function App() {
  const [workType, setWorkType] = useState<"print" | "interactive">("print");

  // Custom cursor effect for brutalist aesthetic
  useEffect(() => {
    const handleMouseDown = () => document.body.classList.add("cursor-active");
    const handleMouseUp = () => document.body.classList.remove("cursor-active");

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  return (
    <Router>
      <div className="site-shell min-h-screen">
        <div className="meadow-background" style={{ backgroundImage: `url(${meadow})` }} aria-hidden="true" />
        <Navigation workType={workType} setWorkType={setWorkType} />

        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route
            path="/portfolio"
            element={<HomePage workType={workType} setWorkType={setWorkType} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/portfolio" replace />} />
        </Routes>
        <img className="site-footer-bird" src={bird} alt="" aria-hidden="true" />
      </div>
    </Router>
  );
}

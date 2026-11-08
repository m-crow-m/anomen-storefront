/**
 * Navigation Component
 * Fixed header with site navigation
 */

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import bird from "../assets/bird.svg";
import portfolioPdf from "../assets/Portfolio_0626_JaedenCrow.pdf";
import { ChevronDown, Download, X } from "lucide-react";


interface NavigationProps {
  workType: "print" | "interactive" | "motion";
  setWorkType: (value: "print" | "interactive" | "motion") => void;
}

export function Navigation(_props: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("root")?.scrollTo({ top: 0, behavior: "instant" });
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.getElementById("root");
    const getScrollTop = () => {
      if (root && root.scrollHeight > root.clientHeight) {
        return root.scrollTop;
      }
      return (
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    const handleScroll = () => {
      setIsScrolled(getScrollTop() > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    root?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);
      root?.removeEventListener("scroll", handleScroll);
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !window.matchMedia("(max-width: 767px)").matches) return;
    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector("main");
    const wasInert = main?.hasAttribute("inert");
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(navRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])
        .filter((item) => getComputedStyle(item).visibility !== "hidden");
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (!wasInert) main?.removeAttribute("inert");
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    const root = document.getElementById("root");
    if (root) {
      root.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (location.pathname !== "/portfolio") {
      event.preventDefault();
      navigate("/portfolio");
      requestAnimationFrame(scrollToTop);
      return;
    }
    scrollToTop();
  };

  return (
    <nav ref={navRef} className={`nav-clear fixed top-0 left-0 right-0 z-50 bg-transparent border-none ${isScrolled ? "nav-scrolled" : ""} ${isMenuOpen ? "nav-menu-open" : ""}`}>
      <div className="nav-shell px-4 md:px-12 lg:px-20 py-4 md:py-6 lg:py-8 flex items-center justify-between relative">
        <div className="flex items-center gap-4 md:gap-8 text-xs md:text-sm">
          <Link
            to="/portfolio"
            aria-label="Jaeden Ives-Crow Vaughankraska — home"
            className={`site-name ${isScrolled ? "site-name-scrolled" : ""}`}
            onClick={handleLogoClick}
          >
            Jaeden Ives-crow Vaughankraska
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 text-xs md:text-sm">
          <div
            className="relative group"
            ref={menuRef}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches) return;
              if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
              setIsMenuOpen(true);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches) return;
              closeTimeoutRef.current = window.setTimeout(() => setIsMenuOpen(false), 180);
            }}

          >
            <button
              type="button"
              className=" tracking-wider  transition-colors flex items-center"
              ref={menuButtonRef}
              aria-controls="navigation-dropdown"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={(event) => {
                if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
                if (event.detail > 0 && window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches) setIsMenuOpen(true);
                else setIsMenuOpen((open) => !open);
              }}
            >
              <span className="sr-only">Menu</span>
              <ChevronDown className={`menu-toggle-icon menu-chevron ${isMenuOpen ? "menu-chevron-open" : ""}`} strokeWidth={3} aria-hidden="true" />
              {isMenuOpen && <X className="menu-toggle-icon menu-mobile-close" strokeWidth={2.5} aria-hidden="true" />}
            </button>
            <div
              id="navigation-dropdown"
              className={`navigation-dropdown absolute mt-3 border border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `block px-4 py-3 text-xs  tracking-wider   transition-colors ${
                    isActive ? "nav-active" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-4 py-3 text-xs  tracking-wider   transition-colors ${
                    isActive ? "nav-active" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `desktop-about-link block px-4 py-3 text-xs  tracking-wider   transition-colors ${
                    isActive ? "nav-active" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/resume"
                className={({ isActive }) =>
                  `block px-4 py-3 text-xs  tracking-wider   transition-colors ${
                    isActive ? "nav-active" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Resume
              </NavLink>
              <a href={portfolioPdf} download="Jaeden-Ives-Crow-Vaughankraska-Portfolio.pdf"
                className="block px-4 py-3 text-xs  tracking-wider"
                onClick={() => setIsMenuOpen(false)}>
                Portfolio <Download className="portfolio-menu-download-icon" aria-hidden="true" />
              </a>
              <img className="mobile-menu-bird" src={bird} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

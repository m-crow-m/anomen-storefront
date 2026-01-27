/**
 * Navigation Component
 * Fixed header with site navigation and cart access
 */

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface NavigationProps {
  onCartClick: () => void;
  workType: "print" | "interactive";
  setWorkType: (value: "print" | "interactive") => void;
}

export function Navigation({ onCartClick, workType, setWorkType }: NavigationProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimeoutRef = useRef<number | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const [logoOffset, setLogoOffset] = useState({ x: 0, y: 0, scale: 1 });
  const [logoReady, setLogoReady] = useState(false);
  const showWorkType = isScrolled && location.pathname === "/portfolio";

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

  useLayoutEffect(() => {
    const updateLogoOffset = () => {
      const logo = logoRef.current;
      if (!logo) return;
      const rect = logo.getBoundingClientRect();
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const targetLeft = isMobile ? 4 : 8;
      const targetTop = isMobile ? 4 : 6;
      setLogoOffset({
        x: rect.left - targetLeft,
        y: rect.top - targetTop,
        scale: 1,
      });
      setLogoReady(true);
    };

    updateLogoOffset();
    window.addEventListener("resize", updateLogoOffset);

    return () => window.removeEventListener("resize", updateLogoOffset);
  }, []);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
      closeTimeoutRef.current = null;
    }, 120);
  };

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
    <nav className="nav-clear fixed top-0 left-0 right-0 z-50 bg-transparent border-none">
      <div className="nav-shell px-4 md:px-12 lg:px-20 py-4 md:py-6 lg:py-8 flex items-center justify-between relative">
        <div className="flex items-center gap-4 md:gap-8 text-xs md:text-sm">
          <Link
            ref={logoRef}
            to="/portfolio"
            aria-label="CROW design"
            className={`font-heading tracking-wider text-xs md:text-sm ${
              isScrolled && isLogoHovered ? "logo-hover" : ""
            }`}
            onClick={handleLogoClick}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            style={{
              position: "relative",
              zIndex: 60,
              whiteSpace: "nowrap",
              lineHeight: 1,
              display: "inline-flex",
              alignItems: "baseline",
              transformOrigin: "top left",
              opacity: logoReady ? 1 : 0,
            transform: "translate(0, 0) scale(1)",
              transition:
                "transform 600ms ease, opacity 300ms ease, letter-spacing 600ms ease",
            }}
          >
            <span
              className="uppercase"
              style={{
                lineHeight: 1,
                display: "inline-block",
                transform: isScrolled ? "scale(2.6)" : "scale(1)",
                transformOrigin: "left center",
                transition: "transform 600ms ease",
              }}
            >
              C
            </span>
            <span
              className="inline-block overflow-hidden align-baseline"
              style={{
                maxWidth: isScrolled ? 0 : 200,
                opacity: isScrolled ? 0 : 1,
                marginLeft: isScrolled ? 0 : 1,
                transition: "max-width 600ms ease, opacity 400ms ease",
              }}
            >
              <span className="uppercase">ROW</span>{" "}
              <span className="lowercase" style={{ fontWeight: 100 }}>
                design
              </span>
            </span>
          </Link>
          {showWorkType ? (
            <div className="flex items-center gap-2">
              <span
                className="text-xs md:text-sm uppercase tracking-wider"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              >
                Viewing:
              </span>
              <Select
                value={workType}
                onValueChange={(value: "print" | "interactive") =>
                  setWorkType(value)
                }
              >
                <SelectTrigger
                  className="w-[150px] md:w-[180px] border-black bg-transparent text-xs md:text-sm uppercase tracking-wider px-4 py-3"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                  <SelectItem
                    value="print"
                    className="text-xs md:text-sm uppercase tracking-wider cursor-pointer px-4 py-3 hover:bg-black hover:text-white"
                    style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  >
                    print
                  </SelectItem>
                  <SelectItem
                    value="interactive"
                    className="text-xs md:text-sm uppercase tracking-wider cursor-pointer px-4 py-3 hover:bg-black hover:text-white"
                    style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  >
                    ux / ui
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 text-xs md:text-sm">
          <div
            className="relative group"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <button
              type="button"
              className="uppercase tracking-wider hover:text-red-600 transition-colors flex items-center"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              aria-label="Open navigation menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <ChevronDown
                className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2.5}
              />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-3 min-w-[200px] border border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] ${
                isMenuOpen ? "block" : "hidden group-hover:block"
              }`}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-red-600 transition-colors ${
                    isActive ? "nav-active" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </NavLink>
              <NavLink
                to="/store"
                className={({ isActive }) =>
                  `block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-red-600 transition-colors ${
                    isActive ? "nav-active" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Store
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-red-600 transition-colors ${
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
                  `block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-red-600 transition-colors ${
                    isActive ? "nav-active" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About me
              </NavLink>
            </div>
          </div>

          <button
            onClick={onCartClick}
            className="uppercase tracking-wider hover:text-red-600 transition-colors flex items-center gap-2 md:gap-3 relative"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">CART</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

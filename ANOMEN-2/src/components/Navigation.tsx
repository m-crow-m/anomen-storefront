/**
 * Navigation Component
 * Fixed header with site navigation and cart access
 */

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface NavigationProps {
  onCartClick: () => void;
}

export function Navigation({ onCartClick }: NavigationProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
      <div className="px-4 md:px-12 lg:px-20 py-4 md:py-6 lg:py-8 flex items-center justify-between">
        <div className="font-heading tracking-wider text-xs md:text-sm">
          <span className="uppercase">CROW</span>{" "}
          <span className="lowercase" style={{ fontWeight: 100 }}>
            design
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 text-xs md:text-sm">
          <div
            className="relative group"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <button
              type="button"
              className="uppercase tracking-wider hover:text-red-600 transition-colors flex items-center gap-2"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              MENU
              <span className="text-[10px]">▼</span>
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-3 min-w-[200px] border border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] ${
                isMenuOpen ? "block" : "hidden group-hover:block"
              }`}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <Link
                to="/portfolio"
                className="block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                to="/store"
                className="block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Store
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About me
              </Link>
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

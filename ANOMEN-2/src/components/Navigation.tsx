import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

interface NavigationProps {
  onCartClick: () => void;
}

export function Navigation({ onCartClick }: NavigationProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="border-b border-black bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs uppercase tracking-[0.2em] md:px-12">
        <Link to="/" className="font-heading">ANOMEN</Link>
        <div className="flex items-center gap-10">
          <Link to="/store" className="hover:opacity-60 transition-opacity">
            STORE
          </Link>
          <button
            onClick={onCartClick}
            className="hover:opacity-60 transition-opacity"
          >
            CART{itemCount > 0 ? ` (${itemCount})` : ""}
          </button>
        </div>
      </div>
    </nav>
  );
}

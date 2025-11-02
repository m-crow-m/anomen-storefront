import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { StorePageShopify } from "./components/StorePageShopify";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { CartDrawer } from "./components/CartDrawer";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white text-black">
          <Navigation onCartClick={() => setIsCartOpen(true)} />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePageShopify />} />
            <Route path="/product/:productHandle" element={<ProductDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </Router>
    </CartProvider>
  );
}

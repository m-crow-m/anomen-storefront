import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { StorePageShopify } from "./components/StorePageShopify";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { CartDrawer } from "./components/CartDrawer";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

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

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartDrawer } from "./components/CartDrawer";
import { ScrollToTop } from "./components/ScrollToTop";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { ProductPage } from "./pages/ProductPage";
import { ShopPage } from "./pages/ShopPage";
import type { Product } from "./types/product";

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const addToCart = (product: Product) => {
    setCart((items) => [...items, product]);
    setCartOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={(index) =>
          setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))
        }
      />
    </BrowserRouter>
  );
}

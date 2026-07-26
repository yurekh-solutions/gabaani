import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./store/cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import LegalPage from "./pages/LegalPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-service" element={<LegalPage />} />
        <Route path="/cookies" element={<LegalPage />} />
      </Routes>
      <Footer />

      <CartDrawer />
      <CheckoutModal />
    </CartProvider>
  );
}

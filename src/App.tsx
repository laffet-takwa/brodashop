import { useEffect, useState, type ReactNode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import SearchOverlay from "./components/SearchOverlay";
import Toasts from "./components/Toasts";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Marquee from "./components/Marquee";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Story from "./pages/Story";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import Contact from "./pages/Contact";
import SizeGuide from "./pages/SizeGuide";
import WishlistPage from "./pages/WishlistPage";
import Account from "./pages/Account";
import Lookbook from "./pages/Lookbook";
import NotFound from "./pages/NotFound";

function Page({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 80);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Page>
              <Home />
            </Page>
          }
        />
        <Route
          path="/shop"
          element={
            <Page>
              <Shop />
            </Page>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <Page>
              <ProductDetail />
            </Page>
          }
        />
        <Route
          path="/story"
          element={
            <Page>
              <Story />
            </Page>
          }
        />
        <Route
          path="/journal"
          element={
            <Page>
              <Journal />
            </Page>
          }
        />
        <Route
          path="/journal/:slug"
          element={
            <Page>
              <JournalPost />
            </Page>
          }
        />
        <Route
          path="/contact"
          element={
            <Page>
              <Contact />
            </Page>
          }
        />
        <Route
          path="/size-guide"
          element={
            <Page>
              <SizeGuide />
            </Page>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Page>
              <WishlistPage />
            </Page>
          }
        />
        <Route
          path="/account"
          element={
            <Page>
              <Account />
            </Page>
          }
        />
        <Route
          path="/lookbook"
          element={
            <Page>
              <Lookbook />
            </Page>
          }
        />
        <Route
          path="/checkout"
          element={
            <Page>
              <Checkout />
            </Page>
          }
        />
        <Route
          path="*"
          element={
            <Page>
              <NotFound />
            </Page>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(() => {
    if (reduced) return false;
    try {
      return !sessionStorage.getItem("brodashop-intro");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!loading) return;
    try {
      sessionStorage.setItem("brodashop-intro", "1");
    } catch {
      /* storage unavailable */
    }
    const t = window.setTimeout(() => setLoading(false), 2600);
    return () => window.clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const skipIntro = () => setLoading(false);

  useEffect(() => {
    if (!loading) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLoading(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading]);

  return (
    <ShopProvider>
      <BrowserRouter>
        <AnimatePresence>
          {loading && <Preloader onDone={skipIntro} />}
        </AnimatePresence>
        <ScrollToTop />
        <ScrollProgress />
        <Cursor />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Marquee dark />
          <Footer />
        </div>
        <CartDrawer />
        <WishlistDrawer />
        <SearchOverlay />
        <Toasts />
        <BackToTop />
      </BrowserRouter>
    </ShopProvider>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
} from "lucide-react";
import { useShop } from "../context/ShopContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "New Arrivals", to: "/#new-arrivals" },
  { label: "Women", to: "/shop?category=Women" },
  { label: "Men", to: "/shop?category=Men" },
  { label: "Collections", to: "/#collections" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/story" },
];

const MEGA: Record<string, { label: string; to: string }[]> = {
  Women: [
    { label: "Dresses", to: "/shop?category=Women" },
    { label: "Knitwear", to: "/shop?category=Tops" },
    { label: "Accessories", to: "/shop?category=Accessories" },
    { label: "All Women", to: "/shop?category=Women" },
  ],
  Men: [
    { label: "Outerwear", to: "/shop?category=Outerwear" },
    { label: "Tops", to: "/shop?category=Tops" },
    { label: "Bottoms", to: "/shop?category=Bottoms" },
    { label: "All Men", to: "/shop?category=Men" },
  ],
  Collections: [
    { label: "Effortless Elegance", to: "/shop?category=Women" },
    { label: "Modern Essentials", to: "/shop?category=Men" },
    { label: "Everyday Icons", to: "/shop?category=Tops" },
    { label: "View All", to: "/shop" },
  ],
};

const MESSAGES = [
  "Free shipping over 150 TND",
  "Autumn — Winter 2026 has arrived",
  "30-day returns, no questions asked",
  "Demo store — no real orders processed",
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="BrodaShop home">
      <span className="w-8 h-8 bg-ink text-ivory font-display italic text-xl flex items-center justify-center leading-none pb-0.5 transition-colors duration-300 group-hover:bg-burgundy">
        B
      </span>
      <span className="font-display text-[1.35rem] tracking-tight font-semibold">
        Broda<span className="italic text-burgundy">Shop</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, setWishlistOpen, setSearchOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const megaTimer = useRef<number | undefined>(undefined);
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const t = window.setInterval(
      () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
      4200
    );
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 170 && y > last + 3) setHidden(true);
      else if (y < last - 3) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
    setAccountOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (to: string) => {
    navigate(to);
    setMobileOpen(false);
    setMegaOpen(null);
  };

  const linkClass =
    "relative text-[0.8rem] tracking-[0.14em] uppercase font-medium transition-colors duration-300 hover:text-burgundy";

  return (
    <>
      <motion.header
        animate={{ y: hidden && !mobileOpen ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div className="bg-ink text-ivory h-9 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[0.6rem] tracking-[0.3em] uppercase"
            >
              {MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          className={`transition-colors duration-500 ${
            transparent
              ? "text-ivory"
              : "bg-ivory/95 backdrop-blur-md text-ink border-b border-line shadow-[0_1px_20px_rgba(23,23,23,0.05)]"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16 md:h-20">
              <div className="flex items-center gap-4">
                <button
                  className="md:hidden p-2 -ml-2"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>
                <Logo />
              </div>

              <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
                {NAV_LINKS.map((l) =>
                  MEGA[l.label] ? (
                    <div
                      key={l.label}
                      className="relative"
                      onMouseEnter={() => {
                        window.clearTimeout(megaTimer.current);
                        setMegaOpen(l.label);
                      }}
                      onMouseLeave={() => {
                        megaTimer.current = window.setTimeout(
                          () => setMegaOpen(null),
                          180
                        );
                      }}
                    >
                      <button
                        className={`${linkClass} flex items-center gap-1 py-2`}
                        aria-expanded={megaOpen === l.label}
                        onClick={() => go(l.to)}
                      >
                        {l.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-300 ${
                            megaOpen === l.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {megaOpen === l.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
                          >
                            <div className="bg-ivory text-ink border border-line shadow-xl w-60 p-2">
                              {MEGA[l.label].map((m) => (
                                <button
                                  key={m.label}
                                  onClick={() => go(m.to)}
                                  className="block w-full text-left px-4 py-2.5 text-sm text-mute hover:text-burgundy hover:bg-sand/60 transition-colors"
                                >
                                  {m.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      key={l.label}
                      to={l.to}
                      onClick={(e) => {
                        if (l.to.startsWith("/#")) {
                          e.preventDefault();
                          go(l.to);
                        }
                      }}
                      className={({ isActive }) =>
                        `${linkClass} group py-2 ${
                          isActive && !l.to.startsWith("/#")
                            ? "text-burgundy"
                            : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span className="relative">
                          {l.label}
                          <span
                            className={`absolute left-0 -bottom-0.5 h-px bg-burgundy transition-all duration-300 ${
                              isActive ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          />
                        </span>
                      )}
                    </NavLink>
                  )
                )}
              </nav>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  className="p-2 hover:text-burgundy transition-colors"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                >
                  <Search size={19} />
                </button>

                <div className="relative hidden sm:block">
                  <button
                    className="p-2 hover:text-burgundy transition-colors"
                    onClick={() => setAccountOpen((v) => !v)}
                    aria-label="Account"
                    aria-expanded={accountOpen}
                  >
                    <User size={19} />
                  </button>
                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-ivory text-ink border border-line shadow-xl p-2 z-50"
                      >
                        <p className="px-4 py-2 text-xs uppercase tracking-widest text-mute">
                          Demo account
                        </p>
                        <button
                          className="block w-full text-left px-4 py-2.5 text-sm hover:text-burgundy transition-colors"
                          onClick={() => {
                            setAccountOpen(false);
                            navigate("/account");
                          }}
                        >
                          Sign In
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2.5 text-sm hover:text-burgundy transition-colors"
                          onClick={() => {
                            setAccountOpen(false);
                            navigate("/account");
                          }}
                        >
                          Create Account
                        </button>
                        <p className="px-4 py-2 text-[11px] text-mute border-t border-line mt-1">
                          Sign-in is simulated in this demo.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  className="p-2 hover:text-burgundy transition-colors relative"
                  onClick={() => setWishlistOpen(true)}
                  aria-label={`Wishlist, ${wishlist.length} items`}
                >
                  <Heart size={19} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 min-w-[16px] h-4 px-0.5 bg-burgundy text-ivory text-[10px] font-semibold rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                <button
                  className="p-2 hover:text-burgundy transition-colors relative"
                  onClick={() => setCartOpen(true)}
                  aria-label={`Shopping bag, ${cartCount} items`}
                >
                  <ShoppingBag size={19} />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.4 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      className="absolute top-0 right-0 min-w-[16px] h-4 px-0.5 bg-ink text-ivory text-[10px] font-semibold rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-5 border-b border-line">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <button
                    onClick={() => go(l.to)}
                    className="w-full text-left font-display text-3xl py-4 border-b border-line hover:text-burgundy transition-colors"
                  >
                    {l.label}
                  </button>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-line text-sm text-mute">
              Free shipping over 150 TND — Demo store
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

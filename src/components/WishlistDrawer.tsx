import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { FALLBACK_IMAGE, formatPrice, getProductById } from "../data/products";
import { useShop } from "../context/ShopContext";

export default function WishlistDrawer() {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    setCartOpen,
  } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = wishlistOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setWishlistOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [wishlistOpen, setWishlistOpen]);

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[75] w-full max-w-md bg-ivory flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Wishlist"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <h2 className="font-display text-2xl">
                Wishlist{" "}
                <span className="text-sm text-mute font-sans">
                  ({wishlist.length})
                </span>
              </h2>
              <button
                onClick={() => setWishlistOpen(false)}
                className="w-9 h-9 flex items-center justify-center hover:bg-sand transition-colors"
                aria-label="Close wishlist"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="w-16 h-16 border border-line rounded-full flex items-center justify-center">
                    <Heart size={24} className="text-mute" />
                  </span>
                  <p className="font-display text-2xl mt-6">Nothing saved yet</p>
                  <p className="text-sm text-mute mt-2 max-w-[240px]">
                    Tap the heart on any piece to keep it here for later.
                  </p>
                  <button
                    onClick={() => {
                      setWishlistOpen(false);
                      navigate("/shop");
                    }}
                    className="mt-7 bg-ink text-ivory px-8 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
                  >
                    Discover Products
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {wishlist.map((id) => {
                    const p = getProductById(id);
                    if (!p) return null;
                    return (
                      <motion.li
                        layout
                        key={id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4"
                      >
                        <Link
                          to={`/products/${p.slug}`}
                          onClick={() => setWishlistOpen(false)}
                          className="w-20 h-24 shrink-0 bg-sand overflow-hidden"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold leading-snug">
                                {p.name}
                              </p>
                              <p className="text-xs text-mute mt-1">
                                {p.categories.join(" · ")}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleWishlist(id)}
                              className="text-burgundy p-1"
                              aria-label={`Remove ${p.name} from wishlist`}
                            >
                              <Heart size={15} fill="currentColor" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold mt-2">
                            {formatPrice(p.price)}
                          </p>
                          <button
                            onClick={() => {
                              addToCart(p.id, p.sizes[0], p.colors[0].name, 1);
                              setWishlistOpen(false);
                              setCartOpen(true);
                            }}
                            className="mt-3 inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.15em] uppercase font-semibold bg-ink text-ivory px-4 py-2 hover:bg-burgundy transition-colors"
                          >
                            <ShoppingBag size={12} />
                            Add to Bag
                          </button>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

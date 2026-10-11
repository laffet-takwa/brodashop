import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPrice, type Product } from "../data/products";
import { useShop } from "../context/ShopContext";
import SizeGuideModal from "./SizeGuideModal";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(null);
      setColor(0);
      setQty(1);
      setError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size before adding to bag.");
      return;
    }
    addToCart(product.id, size, product.colors[color].name, qty);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-ivory w-full max-w-3xl max-h-[92svh] overflow-y-auto grid sm:grid-cols-2 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 bg-ivory/90 flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors"
              aria-label="Close quick view"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[3/4] bg-sand">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-ink text-ivory text-[0.6rem] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
                  New
                </span>
              )}
            </div>

          <div className="p-6 sm:p-8 flex flex-col">
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-mute">
              {product.categories.join(" · ")}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl mt-2">{product.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-mute line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-sm text-mute leading-relaxed mt-4 line-clamp-3">
              {product.description}
            </p>

            <div className="mt-5">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-mute mb-2">
                Color — {product.colors[color].name}
              </p>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(i)}
                    aria-label={`Color ${c.name}`}
                    aria-pressed={i === color}
                    className={`w-7 h-7 border transition-all ${
                      i === color
                        ? "border-ink scale-110"
                        : "border-line hover:border-mute"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-mute">Size</p>
                <button
                  onClick={() => setGuideOpen(true)}
                  className="text-[0.65rem] tracking-[0.1em] uppercase text-burgundy underline underline-offset-2"
                >
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError("");
                    }}
                    aria-pressed={size === s}
                    className={`min-w-[2.5rem] h-9 px-2 border text-xs font-medium transition-colors ${
                      size === s
                        ? "border-ink bg-ink text-ivory"
                        : "border-line hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-burgundy mt-2"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center border border-line">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-10 flex items-center justify-center hover:bg-sand transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(10, qty + 1))}
                  className="w-9 h-10 flex items-center justify-center hover:bg-sand transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 bg-ink text-ivory h-10 text-[0.7rem] tracking-[0.18em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-burgundy transition-colors"
              >
                <ShoppingBag size={15} />
                Add to Bag — {formatPrice(product.price * qty)}
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`mt-4 text-[0.7rem] tracking-[0.15em] uppercase font-semibold py-2 transition-colors ${
                isWishlisted(product.id) ? "text-burgundy" : "text-ink hover:text-burgundy"
              }`}
            >
              {isWishlisted(product.id) ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
          </motion.div>
        </motion.div>
      )}
      {guideOpen && product && (
        <SizeGuideModal onClose={() => setGuideOpen(false)} />
      )}
    </AnimatePresence>
  );
}

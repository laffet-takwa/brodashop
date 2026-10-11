import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Heart,
} from "lucide-react";
import { PRODUCTS, formatPrice } from "../data/products";
import { useShop } from "../context/ShopContext";
import Reveal from "./Reveal";
import SizeGuideModal from "./SizeGuideModal";
import TiltImage from "./TiltImage";

export default function FeaturedProduct() {
  const product = PRODUCTS[0];
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useShop();
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const addTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setImgError(false);
  }, [color]);

  useEffect(
    () => () => {
      window.clearTimeout(addTimer.current);
    },
    []
  );

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size to continue.");
      return;
    }
    addToCart(product.id, size, product.colors[color].name, qty);
    setError("");
    setAdded(true);
    window.clearTimeout(addTimer.current);
    addTimer.current = window.setTimeout(() => setAdded(false), 1800);
    setCartOpen(true);
  };

  const wished = isWishlisted(product.id);

  return (
    <section className="py-20 sm:py-28 bg-sand/40">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
              Featured this week
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
              The Piece <span className="italic text-mute">Everyone Wants.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <Reveal mask>
            <TiltImage
              key={color}
              src={
                imgError
                  ? product.images[0]
                  : product.colors[color].image || product.images[0]
              }
              alt={`${product.name} in ${product.colors[color].name}`}
              onError={() => setImgError(true)}
            >
              {product.originalPrice && (
                <span className="absolute top-4 left-4 bg-burgundy text-ivory text-[0.62rem] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 z-10">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </TiltImage>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-mute">
                {product.categories.join(" · ")}
              </p>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-3">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-mute line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-mute leading-relaxed mt-5 max-w-lg">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-mute mb-2.5">
                  Color — {product.colors[color].name}
                </p>
                <div className="flex gap-2.5">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(i)}
                      aria-label={`Color ${c.name}`}
                      aria-pressed={i === color}
                      className={`w-9 h-9 border-2 transition-all duration-300 ${
                        i === color
                          ? "border-ink scale-110"
                          : "border-line hover:border-mute"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-7">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-mute">
                    Size
                  </p>
                  <button
                    onClick={() => setGuideOpen(true)}
                    className="text-[0.65rem] tracking-[0.1em] uppercase text-burgundy underline underline-offset-2 hover:text-ink transition-colors"
                  >
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSize(s);
                        setError("");
                      }}
                      aria-pressed={size === s}
                      className={`min-w-[2.75rem] h-10 px-3 border text-xs font-medium transition-all duration-200 ${
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
                    className="text-xs text-burgundy mt-2.5"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex items-center border border-line">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-12 flex items-center justify-center hover:bg-sand transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span
                    className="w-11 text-center text-sm font-semibold"
                    aria-live="polite"
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(10, qty + 1))}
                    className="w-10 h-12 flex items-center justify-center hover:bg-sand transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className={`flex-1 h-12 text-[0.72rem] tracking-[0.18em] uppercase font-semibold flex items-center justify-center gap-2.5 transition-colors duration-300 ${
                    added
                      ? "bg-olive text-ivory"
                      : "bg-ink text-ivory hover:bg-burgundy"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2.5"
                      >
                        <Check size={16} />
                        Added to Bag
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2.5"
                      >
                        <ShoppingBag size={16} />
                        Add to Bag — {formatPrice(product.price * qty)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={wished}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors duration-300 ${
                    wished
                      ? "border-burgundy text-burgundy"
                      : "border-line text-ink hover:border-burgundy hover:text-burgundy"
                  }`}
                >
                  <Heart size={17} fill={wished ? "currentColor" : "none"} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3 text-sm text-mute">
                <li className="flex items-center gap-3">
                  <Truck size={16} className="text-ink" />
                  Free shipping over 150 TND — 2–4 business days
                </li>
                <li className="flex items-center gap-3">
                  <RotateCcw size={16} className="text-ink" />
                  30-day returns, no questions asked
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-ink" />
                  Secure demo checkout — no real payment processed
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <Link
                to={`/products/${product.slug}`}
                className="inline-block mt-8 text-[0.7rem] tracking-[0.2em] uppercase font-semibold border-b border-ink pb-1 hover:border-burgundy hover:text-burgundy transition-colors"
              >
                View Full Details
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
      {guideOpen && <SizeGuideModal onClose={() => setGuideOpen(false)} />}
    </section>
  );
}

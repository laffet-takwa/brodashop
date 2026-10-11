import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  Heart,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  ZoomIn,
} from "lucide-react";
import {
  FALLBACK_IMAGE,
  PRODUCTS,
  formatPrice,
  getProduct,
} from "../data/products";
import { useShop } from "../context/ShopContext";
import Reveal from "../components/Reveal";
import SizeGuideModal from "../components/SizeGuideModal";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import type { Product } from "../data/products";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug ?? "");
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useShop();
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [canHover, setCanHover] = useState(false);

  const recentlyViewed = useMemo(() => {
    if (!product) return [];
    const ids: string[] = JSON.parse(
      localStorage.getItem("brodashop-recent") ?? "[]"
    );
    return [product.id, ...ids.filter((id) => id !== product.id)]
      .slice(0, 5)
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const ids: string[] = JSON.parse(
      localStorage.getItem("brodashop-recent") ?? "[]"
    );
    const next = [product.id, ...ids.filter((id) => id !== product.id)].slice(
      0,
      5
    );
    try {
      localStorage.setItem("brodashop-recent", JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, [product]);

  useEffect(() => {
    setActiveImg(0);
    setColor(0);
    setSize(null);
    setQty(1);
    setError("");
    setZoomed(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    setCanHover(
      typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches
    );
  }, []);

  const onImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center px-5">
        <p className="font-display text-4xl">This piece has sold out</p>
        <p className="text-mute mt-3">
          The product you're looking for doesn't exist.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-8 bg-ink text-ivory px-8 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const currentImage =
    product.colors[color].image || product.images[activeImg] || product.images[0];

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size before adding to bag.");
      return;
    }
    addToCart(product.id, size, product.colors[color].name, qty);
    setError("");
    setCartOpen(true);
  };

  return (
    <div className="pt-[100px] md:pt-[116px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
        <nav className="text-xs text-mute mb-8 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-burgundy transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-burgundy transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <Reveal>
              <div
                className={`relative aspect-[3/4] overflow-hidden bg-sand group ${
                  canHover ? "cursor-zoom-in" : ""
                }`}
                onMouseMove={onImageMove}
                onMouseEnter={() => canHover && setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
              >
                <div
                  className="w-full h-full transition-transform duration-300 ease-out will-change-transform"
                  style={{
                    transform: zoomed ? "scale(2.1)" : "scale(1)",
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                  }}
                >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt={`${product.name} — view ${activeImg + 1}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.isNew && (
                    <span className="bg-ink text-ivory text-[0.6rem] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
                      New
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-burgundy text-ivory text-[0.6rem] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
                      −{discount}%
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setLightbox(true)}
                  className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-ivory/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-ink hover:text-ivory"
                  aria-label="Open image lightbox"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.images.map((src, i) => (
                  <motion.button
                    key={src}
                    whileHover={canHover ? { scale: 1.05 } : undefined}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={activeImg === i}
                    className={`relative aspect-[3/4] overflow-hidden bg-sand border-2 transition-colors ${
                      activeImg === i ? "border-ink" : "border-transparent"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-mute">
                {product.categories.join(" · ")}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl mt-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-[0.85rem] ${
                        i < Math.round(product.rating)
                          ? "text-burgundy"
                          : "text-line"
                      }`}
                      aria-hidden
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-mute">
                  {product.rating.toFixed(1)} · {product.reviews} reviews
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-5">
                <span className="text-3xl font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-mute line-through text-lg">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-mute leading-relaxed mt-5">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-7">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-mute mb-2.5">
                  Color — {product.colors[color].name}
                </p>
                <div className="flex gap-2.5">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setColor(i);
                        setActiveImg(0);
                      }}
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

            <Reveal delay={0.1}>
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

            <Reveal delay={0.14}>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex items-center border border-line">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-12 flex items-center justify-center hover:bg-sand transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-11 text-center text-sm font-semibold" aria-live="polite">
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
                  className="flex-1 bg-ink text-ivory h-12 text-[0.72rem] tracking-[0.18em] uppercase font-semibold flex items-center justify-center gap-2.5 hover:bg-burgundy transition-colors duration-300"
                >
                  <ShoppingBag size={16} />
                  Add to Bag — {formatPrice(product.price * qty)}
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

            <Reveal delay={0.18}>
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

            <Reveal delay={0.22}>
              <div className="mt-9 border-t border-line pt-7 space-y-5">
                <div>
                  <h3 className="text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-2">
                    Materials & Care
                  </h3>
                  <p className="text-sm text-mute leading-relaxed">
                    {product.materials}
                  </p>
                </div>
                <div>
                  <h3 className="text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-2">
                    Delivery & Returns
                  </h3>
                  <p className="text-sm text-mute leading-relaxed">
                    Orders ship within 24 hours and arrive in 2–4 business
                    days. Returns are free within 30 days of delivery. Demo
                    policy — subject to client approval.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {recentlyViewed.length > 1 && (
          <div className="mt-24">
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl">
                  Recently <span className="italic text-mute">Viewed</span>
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {recentlyViewed.slice(1).map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onQuickView={setQuickView}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-24">
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl">
                You May Also <span className="italic text-mute">Like</span>
              </h2>
              <Link
                to="/shop"
                className="text-[0.7rem] tracking-[0.2em] uppercase font-semibold border-b border-ink pb-0.5 hover:border-burgundy hover:text-burgundy transition-colors"
              >
                View All
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
            {PRODUCTS.filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onQuickView={setQuickView}
                />
              ))}
          </div>
        </div>
      </div>

      {guideOpen && <SizeGuideModal onClose={() => setGuideOpen(false)} />}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Product image lightbox"
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-5 right-5 w-11 h-11 border border-ivory/40 text-ivory flex items-center justify-center hover:bg-ivory hover:text-ink transition-colors"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <button
              onClick={() => setActiveImg((activeImg + product.images.length - 1) % product.images.length)}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 border border-ivory/40 text-ivory flex items-center justify-center hover:bg-ivory hover:text-ink transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <motion.img
              key={product.images[activeImg]}
              src={product.images[activeImg]}
              alt={`${product.name} enlarged`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[85svh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setActiveImg((activeImg + 1) % product.images.length)}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 border border-ivory/40 text-ivory flex items-center justify-center hover:bg-ivory hover:text-ink transition-colors"
              aria-label="Next image"
            >
              <ChevronLeft size={20} className="rotate-180" />
            </button>
            <p className="absolute bottom-6 text-ivory/60 text-xs tracking-[0.2em] uppercase">
              {activeImg + 1} / {product.images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Maximize2, Plus, Star } from "lucide-react";
import {
  FALLBACK_IMAGE,
  formatPrice,
  type Product,
} from "../data/products";
import { useShop } from "../context/ShopContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [imgError, setImgError] = useState(false);
  const [burst, setBurst] = useState(false);
  const burstTimer = useRef<number | undefined>(undefined);
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleWish = () => {
    const wasWished = wished;
    toggleWishlist(product.id);
    if (!wasWished) {
      setBurst(true);
      window.clearTimeout(burstTimer.current);
      burstTimer.current = window.setTimeout(() => setBurst(false), 600);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.9,
          delay: (index % 4) * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative aspect-[3/4] overflow-hidden bg-sand"
      >
        <Link
          to={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          tabIndex={-1}
          className="block w-full h-full"
        >
          <img
            src={imgError ? FALLBACK_IMAGE : product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          {product.images[1] && (
            <img
              src={imgError ? FALLBACK_IMAGE : product.images[1]}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-ink text-ivory text-[0.6rem] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-burgundy text-ivory text-[0.6rem] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
              Best Seller
            </span>
          )}
          {discount > 0 && (
            <span className="bg-olive text-ivory text-[0.6rem] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
              −{discount}%
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleWish}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className={`absolute top-3 right-3 w-9 h-9 bg-ivory/95 backdrop-blur flex items-center justify-center transition-colors duration-300 ${
            wished ? "text-burgundy" : "text-ink hover:text-burgundy"
          }`}
        >
          {burst && (
            <span className="absolute inset-0 pointer-events-none" aria-hidden>
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: Math.cos(i * (Math.PI / 3)) * 24,
                    y: Math.sin(i * (Math.PI / 3)) * 24,
                    scale: 0.2,
                  }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-burgundy"
                />
              ))}
            </span>
          )}
          <motion.span
            key={String(wished)}
            initial={{ scale: wished ? 0.3 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 18 }}
            className="flex"
          >
            <Heart size={16} fill={wished ? "currentColor" : "none"} />
          </motion.span>
        </motion.button>

        <button
          onClick={() => onQuickView(product)}
          className="absolute left-3 right-3 bottom-3 bg-ivory/95 backdrop-blur text-ink text-[0.65rem] tracking-[0.18em] uppercase font-semibold py-2.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-ink hover:text-ivory sm:hidden"
        >
          <Maximize2 size={13} />
          Quick View
        </button>

        <div className="absolute bottom-3 left-3 right-3 hidden sm:flex gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {product.sizes.slice(0, 3).map((size) => (
            <button
              key={size}
              onClick={() => addToCart(product.id, size, product.colors[0].name, 1)}
              className="flex-1 bg-ink/90 backdrop-blur text-ivory text-[0.6rem] font-semibold py-2 hover:bg-burgundy transition-colors"
              aria-label={`Quick add ${product.name} size ${size}`}
            >
              {size}
            </button>
          ))}
          <button
            onClick={() => onQuickView(product)}
            className="w-9 shrink-0 bg-ink/90 backdrop-blur text-ivory flex items-center justify-center hover:bg-burgundy transition-colors"
            aria-label={`Quick view ${product.name}`}
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </motion.div>

      <div className="pt-4 flex items-start justify-between gap-3">
        <div>
          <Link to={`/products/${product.slug}`} className="hover:text-burgundy transition-colors">
            <h3 className="text-[0.95rem] font-medium leading-snug">{product.name}</h3>
          </Link>
          <p className="text-xs text-mute mt-1">{product.categories.join(" · ")}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={11} className="text-burgundy" fill="currentColor" />
            <span className="text-xs text-mute">
              {product.rating.toFixed(1)} ({product.reviews})
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[0.95rem] font-semibold">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="text-xs text-mute line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <button
            onClick={() =>
              onQuickView(product)
            }
            className="mt-1.5 text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-ink border border-line hover:border-burgundy hover:text-burgundy px-2.5 py-1.5 transition-colors inline-flex items-center gap-1"
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus size={11} /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}

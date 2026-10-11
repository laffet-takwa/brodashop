import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { FALLBACK_IMAGE, formatPrice, getProductById } from "../data/products";
import { useShop } from "../context/ShopContext";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";
import Magnetic from "../components/Magnetic";

export default function WishlistPage() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    setCartOpen,
  } = useShop();

  return (
    <div className="pt-[100px] md:pt-[116px] min-h-screen">
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        <Reveal mask>
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-burgundy mb-4">
            Saved Pieces
          </p>
        </Reveal>
        <StaggerWords
          text="Your Wishlist."
          as="h1"
          className="font-display text-5xl sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.3} y={20}>
          <p className="text-mute mt-5 max-w-md leading-relaxed">
            {wishlist.length === 0
              ? "Pieces you heart will live here — synced in your browser."
              : `${wishlist.length} ${
                  wishlist.length === 1 ? "piece" : "pieces"
                } saved in your browser.`}
          </p>
        </Reveal>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        {wishlist.length === 0 ? (
          <div className="border border-line bg-ivory py-24 text-center">
            <span className="w-16 h-16 border border-line rounded-full flex items-center justify-center mx-auto">
              <Heart size={24} className="text-mute" />
            </span>
            <h2 className="font-display text-3xl mt-7">Nothing saved yet</h2>
            <p className="text-sm text-mute mt-3 max-w-xs mx-auto">
              Tap the heart on any piece to keep it here for later.
            </p>
            <Magnetic strength={0.2} className="inline-block mt-8">
              <Link
                to="/shop"
                className="btn-shine inline-flex items-center gap-2.5 bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
              >
                Discover Products
              </Link>
            </Magnetic>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            <AnimatePresence initial={false}>
              {wishlist.map((id) => {
                const p = getProductById(id);
                if (!p) return null;
                return (
                  <motion.li
                    layout
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <Link
                      to={`/products/${p.slug}`}
                      className="relative block aspect-[3/4] overflow-hidden bg-sand"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                      />
                      {p.isNew && (
                        <span className="absolute top-4 left-4 bg-ink text-ivory text-[0.6rem] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
                          New
                        </span>
                      )}
                    </Link>
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to={`/products/${p.slug}`}
                          className="font-medium leading-snug hover:text-burgundy transition-colors"
                        >
                          {p.name}
                        </Link>
                        <p className="text-xs text-mute mt-1">
                          {p.categories.join(" · ")}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          {formatPrice(p.price)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => toggleWishlist(id)}
                          className="w-9 h-9 border border-line flex items-center justify-center text-burgundy hover:border-burgundy transition-colors"
                          aria-label={`Remove ${p.name} from wishlist`}
                        >
                          <Trash2 size={15} />
                        </button>
                        <button
                          onClick={() => {
                            addToCart(p.id, p.sizes[0], p.colors[0].name, 1);
                            setCartOpen(true);
                          }}
                          className="w-9 h-9 border border-line flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors"
                          aria-label={`Add ${p.name} to bag`}
                        >
                          <ShoppingBag size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </div>
  );
}

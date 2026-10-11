import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, X } from "lucide-react";
import { PRODUCTS, formatPrice } from "../data/products";
import { useShop } from "../context/ShopContext";

const POPULAR = ["Oversized shirt", "Denim", "Sneakers", "Cashmere", "Dress", "Leather"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  const openProduct = (slug: string) => {
    setSearchOpen(false);
    navigate(`/products/${slug}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[85] bg-ivory/98 backdrop-blur-md flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <div className="max-w-[900px] w-full mx-auto px-5 sm:px-8 pt-20 sm:pt-28">
            <div className="flex items-center gap-4 border-b-2 border-ink pb-4">
              <Search size={26} className="text-ink shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection…"
                aria-label="Search products"
                className="flex-1 bg-transparent font-display text-2xl sm:text-4xl placeholder:text-mute/50 focus:outline-none min-w-0"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="w-10 h-10 shrink-0 border border-line flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8">
              {!query.trim() && (
                <div>
                  <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-4">
                    <TrendingUp size={13} />
                    Popular searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-line text-sm text-mute hover:border-ink hover:text-ink transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && (
                <div>
                  <p className="text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-4">
                    {results.length} {results.length === 1 ? "result" : "results"} for
                    “{query.trim()}”
                  </p>
                  {results.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="font-display text-2xl">No matches found</p>
                      <p className="text-sm text-mute mt-2">
                        Try “denim”, “dress”, or “sneakers”.
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-line border-y border-line">
                      {results.map((p, i) => (
                        <motion.li
                          key={p.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <button
                            onClick={() => openProduct(p.slug)}
                            className="w-full flex items-center gap-4 py-4 text-left group"
                          >
                            <img
                              src={p.images[0]}
                              alt=""
                              loading="lazy"
                              className="w-14 h-16 object-cover bg-sand"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[0.95rem] font-medium group-hover:text-burgundy transition-colors truncate">
                                {p.name}
                              </p>
                              <p className="text-xs text-mute mt-0.5">
                                {p.categories.join(" · ")}
                              </p>
                            </div>
                            <span className="text-sm font-semibold shrink-0">
                              {formatPrice(p.price)}
                            </span>
                            <ArrowRight
                              size={16}
                              className="text-mute group-hover:text-burgundy group-hover:translate-x-1 transition-all shrink-0"
                            />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORIES, PRODUCTS, type Category } from "../data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import type { Product } from "../data/products";

const FILTERS: ("All" | Category)[] = ["All", ...CATEGORIES];

export default function NewArrivals({
  onQuickView,
}: {
  onQuickView: (p: Product) => void;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const navigate = useNavigate();

  const items = useMemo(() => {
    const sorted = [...PRODUCTS].sort((a, b) => b.dateAdded - a.dateAdded);
    if (filter === "All") return sorted.slice(0, 8);
    return sorted
      .filter((p) => p.categories.includes(filter))
      .slice(0, 8);
  }, [filter]);

  const selectFilter = (f: (typeof FILTERS)[number]) => {
    if (f === "All") {
      setFilter("All");
      return;
    }
    setFilter(f);
  };

  return (
    <section id="new-arrivals" className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
                Just landed
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                New Season.
                <br />
                <span className="italic text-mute">New Perspective.</span>
              </h2>
              <p className="text-mute mt-4 max-w-md">
                Explore the latest additions to your wardrobe.
              </p>
            </div>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase font-semibold border-b border-ink pb-1 hover:border-burgundy hover:text-burgundy transition-colors"
            >
              View All Products
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter products">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => selectFilter(f)}
                className={`px-4 sm:px-5 py-2 text-[0.68rem] tracking-[0.15em] uppercase font-medium border transition-all duration-300 ${
                  filter === f
                    ? "bg-ink text-ivory border-ink"
                    : "border-line text-mute hover:border-ink hover:text-ink"
                }`}
              >
                {f === "All" ? "All Products" : f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={onQuickView} />
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <button
            onClick={() => navigate("/shop")}
            className="group inline-flex items-center gap-2 bg-ink text-ivory px-10 py-4 text-[0.72rem] tracking-[0.2em] uppercase font-semibold hover:bg-burgundy transition-colors duration-300"
          >
            Shop the Full Collection
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

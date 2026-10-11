import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, RotateCcw, Search, SearchX } from "lucide-react";
import { CATEGORIES, PRODUCTS, type Category } from "../data/products";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import Reveal from "../components/Reveal";
import type { Product } from "../data/products";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const SIZE_OPTIONS = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
  "44",
  "One Size",
];

const PRICE_STEPS = [0, 50, 100, 150, 200, 250, 300];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") as Category | null) ?? "All";
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") as SortKey | null) ?? "featured";
  const minPrice = Number(params.get("min") ?? "0");
  const maxPrice = Number(params.get("max") ?? "300");
  const sizeParam = params.get("size") ?? "";

  const [localQ, setLocalQ] = useState(q);
  const [quickView, setQuickView] = useState<Product | null>(null);

  useEffect(() => setLocalQ(q), [q]);

  const updateParams = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === "" || v === "All" || (k === "sort" && v === "featured")) {
        next.delete(k);
      } else {
        next.set(k, v);
      }
    });
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "All") {
      list = list.filter((p) => p.categories.includes(category));
    }
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.categories.some((c) => c.toLowerCase().includes(query))
      );
    }
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    const sizes = sizeParam ? sizeParam.split(",") : [];
    if (sizes.length) {
      list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => b.dateAdded - a.dateAdded);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [category, q, minPrice, maxPrice, sizeParam, sort]);

  const hasFilters =
    category !== "All" ||
    q !== "" ||
    minPrice > 0 ||
    maxPrice < 300 ||
    sizeParam !== "";

  const clearAll = () => setParams({}, { replace: true });

  const toggleSize = (s: string) => {
    const current = sizeParam ? sizeParam.split(",") : [];
    const next = current.includes(s)
      ? current.filter((x) => x !== s)
      : [...current, s];
    updateParams({ size: next.join(",") });
  };

  return (
    <div className="pt-[100px] md:pt-[116px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
            The Collection
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl">
            Shop <span className="italic text-mute">All.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
            <div className="flex flex-col lg:flex-row gap-6 mt-10">
              <aside className="lg:w-64 shrink-0 space-y-8">
                <Reveal>
                  <div>
                    <h3 className="text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-3">
                      Search
                    </h3>
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"
                  />
                  <input
                    type="search"
                    value={localQ}
                    onChange={(e) => setLocalQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") updateParams({ q: localQ });
                    }}
                    onBlur={() => updateParams({ q: localQ })}
                    placeholder="Search products…"
                    aria-label="Search products"
                    className="w-full h-11 pl-10 pr-3 bg-ivory border border-line text-sm focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
                </div>
                </Reveal>

              <Reveal delay={0.05}>
              <div>
                <h3 className="text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-3">
                  Category
                </h3>
                <ul className="space-y-1">
                  {["All", ...CATEGORIES].map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => updateParams({ category: c })}
                        aria-pressed={category === c}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors border-l-2 ${
                          category === c
                            ? "border-burgundy text-burgundy font-medium"
                            : "border-transparent text-mute hover:text-ink"
                        }`}
                      >
                        {c === "All" ? "All Products" : c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              </Reveal>

              <Reveal delay={0.1}>
              <div>
                <h3 className="text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-3">
                  Price — {minPrice} to {maxPrice} TND
                </h3>
                <div className="space-y-4 px-1">
                  <div>
                    <label htmlFor="min-price" className="text-xs text-mute">
                      Min: {minPrice} TND
                    </label>
                    <input
                      id="min-price"
                      type="range"
                      min={0}
                      max={300}
                      step={10}
                      value={minPrice}
                      onChange={(e) =>
                        updateParams({
                          min: String(Math.min(Number(e.target.value), maxPrice)),
                        })
                      }
                      className="w-full accent-burgundy"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="text-xs text-mute">
                      Max: {maxPrice} TND
                    </label>
                    <input
                      id="max-price"
                      type="range"
                      min={0}
                      max={300}
                      step={10}
                      value={maxPrice}
                      onChange={(e) =>
                        updateParams({
                          max: String(Math.max(Number(e.target.value), minPrice)),
                        })
                      }
                      className="w-full accent-burgundy"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    {PRICE_STEPS.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateParams({ min: "0", max: String(s) })}
                        className={`flex-1 h-7 border text-[0.6rem] transition-colors ${
                          maxPrice === s && minPrice === 0
                            ? "border-ink bg-ink text-ivory"
                            : "border-line hover:border-ink"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              </Reveal>

              <Reveal delay={0.15}>
              <div>
                <h3 className="text-[0.65rem] tracking-[0.25em] uppercase text-mute mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      aria-pressed={sizeParam?.split(",").includes(s)}
                      className={`min-w-[2.4rem] h-8 px-2 border text-[0.68rem] transition-colors ${
                        sizeParam?.split(",").includes(s)
                          ? "border-ink bg-ink text-ivory"
                          : "border-line hover:border-ink"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              </Reveal>

              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.15em] uppercase font-semibold text-burgundy hover:text-ink transition-colors"
                >
                  <RotateCcw size={13} />
                  Clear all filters
                </button>
              )}
            </aside>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-line">
                <p className="text-sm text-mute" aria-live="polite">
                  <strong className="text-ink">{filtered.length}</strong>{" "}
                  {filtered.length === 1 ? "product" : "products"}
                  {category !== "All" ? ` in ${category}` : ""}
                </p>
                <div className="relative">
                  <label htmlFor="sort" className="sr-only">
                    Sort products
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => updateParams({ sort: e.target.value })}
                    className="appearance-none h-11 pl-4 pr-10 bg-ivory border border-line text-sm focus:outline-none focus:border-ink cursor-pointer"
                  >
                    {SORTS.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-mute"
                  />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <SearchX size={40} className="text-mute mx-auto" />
                  <p className="font-display text-3xl mt-6">
                    No pieces match
                  </p>
                  <p className="text-sm text-mute mt-3 max-w-xs mx-auto">
                    Try widening your price range or removing a filter.
                  </p>
                  <button
                    onClick={clearAll}
                    className="mt-7 bg-ink text-ivory px-8 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                  {filtered.map((p, i) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      index={i}
                      onQuickView={setQuickView}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function BestSellers({
  onQuickView,
}: {
  onQuickView: (p: Product) => void;
}) {
  const items = PRODUCTS.filter((p) => p.isBestSeller);
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
                Most loved
              </p>
              <h2 className="font-display text-4xl sm:text-5xl">
                Best <span className="italic text-mute">Sellers.</span>
              </h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="w-11 h-11 border border-line flex items-center justify-center hover:bg-ink hover:text-ivory hover:border-ink transition-colors"
                aria-label="Scroll best sellers left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="w-11 h-11 border border-line flex items-center justify-center hover:bg-ink hover:text-ivory hover:border-ink transition-colors"
                aria-label="Scroll best sellers right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div
          ref={scroller}
          className="flex gap-x-4 gap-y-10 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 sm:px-8 lg:px-12 pb-4 max-w-[1440px] mx-auto"
        >
          {items.map((p, i) => (
            <div
              key={p.id}
              className="min-w-[46vw] sm:min-w-[28vw] md:min-w-[22vw] lg:min-w-[17vw] snap-start"
            >
              <ProductCard product={p} index={i} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

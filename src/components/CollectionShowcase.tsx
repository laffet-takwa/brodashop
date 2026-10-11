import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLLECTION_TILES } from "../data/products";
import Reveal from "./Reveal";

function CollectionTile({
  tile,
  index,
}: {
  tile: (typeof COLLECTION_TILES)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 26);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Reveal
      delay={index * 0.12}
      className={index === 0 ? "md:col-span-7" : "md:col-span-5"}
    >
      <Link
        ref={ref}
        to={`/shop?category=${encodeURIComponent(tile.category)}`}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="group relative block overflow-hidden bg-ink"
        style={{ aspectRatio: "16/10" }}
        aria-label={`Discover ${tile.label} collection: ${tile.title}`}
      >
        <motion.img
          src={tile.image}
          alt={`${tile.title} — ${tile.label} collection`}
          loading="lazy"
          style={reduced ? undefined : { x: sx, y: sy }}
          whileHover={reduced ? undefined : { scale: 1.22 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover scale-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.12, duration: 0.7 }}
            className="text-ivory/70 text-[0.6rem] tracking-[0.35em] uppercase"
          >
            {tile.label}
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.12, duration: 0.7 }}
            className="font-display text-ivory text-3xl sm:text-4xl mt-2"
          >
            {tile.title}
          </motion.h3>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.12, duration: 0.7 }}
            className="mt-4 inline-flex items-center gap-2 text-ivory text-[0.68rem] tracking-[0.2em] uppercase font-semibold border-b border-ivory/40 pb-0.5 group-hover:border-ivory transition-colors"
          >
            Discover Collection
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function CollectionShowcase() {
  return (
    <section id="collections" className="py-20 sm:py-28 scroll-mt-20 bg-sand/40">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
              Curated collections
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
              Find Your Own <span className="italic text-mute">Uniform.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {COLLECTION_TILES.map((tile, i) => (
            <CollectionTile key={tile.label} tile={tile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

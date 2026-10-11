import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { img } from "../data/products";
import Magnetic from "./Magnetic";

const HERO_IMG = img("photo-1490481651871-ab68de25d43d", 2000);

function Word({ word, index }: { word: string; index: number }) {
  return (
    <span className="inline-block overflow-hidden pb-1 -mb-1 align-top">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.35 + index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
        {index < 2 ? "\u00A0" : ""}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const pxs = useSpring(mx, { stiffness: 55, damping: 20 });
  const pys = useSpring(my, { stiffness: 55, damping: 20 });
  const ix = useTransform(pxs, (v) => v * 20);
  const iy = useTransform(pys, (v) => v * 12);
  const txs = useTransform(pxs, (v) => v * -9);
  const tys = useTransform(pys, (v) => v * -6);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const goShop = () => navigate("/shop");

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink"
    >
      <motion.div style={reduced ? undefined : { y: imgY }} className="absolute inset-0">
        <motion.div
          style={reduced ? undefined : { x: ix, y: iy }}
          className="w-full h-full"
        >
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <img
              src={HERO_IMG}
              alt="Fashion model wearing a statement yellow coat — BrodaShop editorial campaign"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </motion.div>
          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 1.6, delay: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-ivory/15 to-transparent skew-x-[-20deg] pointer-events-none"
            aria-hidden
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/50 to-transparent" />

      <motion.div
        style={reduced ? undefined : { y: textY, opacity: fade }}
        className="relative z-10 h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center"
      >
        <motion.div style={reduced ? undefined : { x: txs, y: tys }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-ivory/80 text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase mb-5 sm:mb-7"
        >
          Autumn — Winter 2026 Collection
        </motion.p>

        <h1 className="font-display text-ivory font-medium leading-[0.95] text-[13.5vw] sm:text-7xl lg:text-[6.5rem] tracking-tight">
          {"STYLE THAT SPEAKS.".split(" ").map((w, i) => (
            <Word key={i} word={w} index={i} />
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-ivory/85 text-base sm:text-lg font-light mt-5 sm:mt-6 max-w-md"
        >
          Discover the pieces that define your next chapter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10"
        >
          <Magnetic strength={0.32}>
            <button
              onClick={goShop}
              className="group relative overflow-hidden bg-ivory text-ink px-8 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-semibold transition-colors duration-300 hover:bg-burgundy hover:text-ivory"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
          </Magnetic>
          <Magnetic strength={0.32}>
            <Link
              to="/#story"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block px-8 py-4 text-[0.75rem] tracking-[0.18em] uppercase font-semibold text-ivory border border-ivory/40 hover:border-ivory hover:bg-ivory/10 transition-all duration-300"
            >
              Discover Our Story
            </Link>
          </Magnetic>
        </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-ivory/70 text-[0.6rem] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span className="w-px h-10 bg-ivory/30 relative overflow-hidden">
          <span className="scroll-dot absolute top-0 left-0 w-full h-3 bg-ivory" />
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-10 right-8 lg:right-14 hidden md:flex items-center justify-center z-10"
        aria-hidden
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="relative w-28 h-28"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs>
              <path
                id="badge-circle"
                d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
              />
            </defs>
            <text
              className="fill-ivory/80"
              style={{
                fontSize: "9px",
                letterSpacing: "2.5px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            >
              <textPath href="#badge-circle">
                BRODASHOP • PREMIUM FASHION • EST 2026 •
              </textPath>
            </text>
          </svg>
        </motion.div>
        <span className="absolute inset-0 flex items-center justify-center">
          <ArrowDown size={15} className="text-ivory/80" />
        </span>
      </motion.div>
    </section>
  );
}

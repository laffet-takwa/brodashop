import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Home, Shirt } from "lucide-react";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

function Digit({ digit, index }: { digit: string; index: number }) {
  const reduced = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden" aria-hidden>
      <motion.span
        className="inline-block"
        initial={reduced ? undefined : { y: "110%", rotate: 6 }}
        animate={reduced ? undefined : { y: 0, rotate: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.15 + index * 0.14,
          type: "spring",
          stiffness: 120,
          damping: 16,
        }}
      >
        {digit}
      </motion.span>
    </span>
  );
}

export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-5 pt-[110px] md:pt-[130px] pb-16"
    >
      <motion.div
        style={reduced ? undefined : { x: drift }}
        className="absolute top-20 left-0 whitespace-nowrap pointer-events-none"
        aria-hidden
      >
        <p className="font-display text-[19vw] leading-none text-line/70">
          LOST IN THE WARDROBE · LOST IN THE WARDROBE ·
        </p>
      </motion.div>

      <motion.div
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mb-9"
        aria-hidden
      >
        <span className="w-20 h-20 border border-line rounded-full flex items-center justify-center bg-ivory shadow-[0_10px_30px_rgba(23,23,23,0.06)]">
          <Shirt size={30} className="text-burgundy" />
        </span>
      </motion.div>

      <motion.h1
        style={reduced ? undefined : { opacity: fade }}
        className="relative z-10 font-display font-medium text-[26vw] sm:text-[9rem] lg:text-[10rem] leading-[0.9] text-ink tracking-tight select-none"
        aria-label="404"
      >
        <Digit digit="4" index={0} />
        <Digit digit="0" index={1} />
        <Digit digit="4" index={2} />
      </motion.h1>

      <Reveal delay={0.5}>
        <h2 className="relative z-10 font-display text-2xl sm:text-3xl mt-5 text-center">
          This page <span className="italic text-burgundy">left the rack.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.65}>
        <p className="relative z-10 text-mute mt-4 max-w-sm text-center leading-relaxed">
          The piece you're looking for has been moved, sold out, or never
          existed. Let's get you back to the collection.
        </p>
      </Reveal>

      <Reveal delay={0.8}>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-9">
          <Magnetic strength={0.3}>
            <Link
              to="/"
              className="btn-shine inline-flex items-center gap-2 bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
            >
              <Home size={15} />
              Back to Home
            </Link>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-ink px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-ink hover:text-ivory transition-colors"
            >
              Shop the Collection
              <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  );
}

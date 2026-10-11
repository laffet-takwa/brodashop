import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { img } from "../data/products";
import Magnetic from "./Magnetic";

const PROMO_IMG = img("photo-1483985988355-763728e1935b", 1800);

export default function PromoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative h-[60svh] min-h-[420px] overflow-hidden bg-ink">
      <motion.div style={reduced ? undefined : { y }} className="absolute inset-0 -top-[15%] h-[130%]">
        <img
          src={PROMO_IMG}
          alt="Customer carrying shopping bags — BrodaShop promotional banner"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-ivory/75 text-[0.65rem] tracking-[0.35em] uppercase"
        >
          New season, new you
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-ivory text-4xl sm:text-6xl lg:text-7xl mt-4 leading-[1.05]"
        >
          YOUR NEXT FAVORITE
          <br />
          <span className="italic">PIECE IS HERE.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-9"
        >
          <Magnetic strength={0.32}>
            <Link
              to="/#new-arrivals"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-shine group inline-flex items-center gap-2.5 bg-ivory text-ink px-9 py-4 text-[0.72rem] tracking-[0.2em] uppercase font-semibold hover:bg-burgundy hover:text-ivory transition-colors duration-300"
            >
              Shop New Arrivals
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

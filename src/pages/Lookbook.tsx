import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LOOKBOOK, img } from "../data/products";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";
import Magnetic from "../components/Magnetic";

function Look({
  item,
  index,
}: {
  item: (typeof LOOKBOOK)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const captionY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[540px] overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -top-[15%] left-0 right-0 h-[130%]"
      >
        <img
          src={item.image}
          alt={item.alt}
          loading={index === 0 ? "eager" : "lazy"}
          onError={(e) => {
            (e.target as HTMLImageElement).src = img(
              "photo-1441986300917-64674bd600d8",
              1600
            );
          }}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div
        className={`absolute inset-0 ${
          index % 2 === 0
            ? "bg-gradient-to-r from-ink/60 via-ink/20 to-transparent"
            : "bg-gradient-to-l from-ink/60 via-ink/20 to-transparent"
        }`}
      />

      {/* Big outlined look number */}
      <motion.span
        style={{ opacity: useTransform(scrollYProgress, [0.15, 0.5], [0, 1]) }}
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 font-display text-[26vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(248,246,242,0.22)] select-none"
      >
        {item.look}
      </motion.span>

      <motion.div
        style={{ y: captionY, opacity }}
        className={`relative h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center ${
          index % 2 === 0 ? "items-start" : "items-end text-right"
        }`}
      >
        <Reveal mask>
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-ivory/80">
            {item.subtitle}
          </p>
        </Reveal>
        <StaggerWords
          text={item.title}
          as="h2"
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-ivory mt-4"
        />
        <Reveal delay={0.3} y={24}>
          <p className="text-ivory/80 max-w-sm mt-5 leading-relaxed text-sm">
            {item.quote}
          </p>
        </Reveal>
        <Reveal delay={0.42} y={24}>
          <Link
            to="/shop"
            className="btn-shine inline-flex items-center gap-2.5 bg-ivory text-ink px-7 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy hover:text-ivory transition-colors mt-8"
          >
            Shop the Look
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </motion.div>
    </section>
  );
}

export default function Lookbook() {
  return (
    <div className="pt-[100px] md:pt-[116px]">
      {/* Intro */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 text-center">
        <Reveal mask>
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-burgundy mb-4">
            AW26 Campaign
          </p>
        </Reveal>
        <StaggerWords
          text="The Lookbook."
          as="h1"
          className="font-display text-5xl sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.3} y={20}>
          <p className="text-mute mt-5 max-w-md mx-auto leading-relaxed">
            Six looks, shot on location. Scroll through the
            collection — every piece is available in the store.
          </p>
        </Reveal>
      </section>

      {/* Full-screen parallax looks */}
      {LOOKBOOK.map((item, i) => (
        <Look key={item.look} item={item} index={i} />
      ))}

      {/* Outro */}
      <section className="bg-ink text-ivory">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 text-center">
          <Reveal mask>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl">
              Wear the <span className="italic text-burgundy">light.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-ivory/60 mt-5 max-w-md mx-auto">
              The full AW26 collection is in the store now.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <Magnetic strength={0.2} className="inline-block mt-9">
              <Link
                to="/shop"
                className="btn-shine inline-flex items-center gap-2.5 bg-ivory text-ink px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy hover:text-ivory transition-colors"
              >
                Shop AW26
                <ArrowRight size={15} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

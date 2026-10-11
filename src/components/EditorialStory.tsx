import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { img } from "../data/products";
import Reveal from "./Reveal";
import Counter from "./Counter";

const STORY_IMG = img("photo-1441986300917-64674bd600d8", 1400);

const STATS = [
  { value: 22, decimals: 0, suffix: "", label: "Curated pieces" },
  { value: 4.8, decimals: 1, suffix: "/5", label: "Average rating" },
  { value: 30, decimals: 0, suffix: "", label: "Day returns" },
];

export default function EditorialStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="story"
      ref={ref}
      className="py-20 sm:py-32 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal mask>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <motion.img
              src={STORY_IMG}
              alt="Inside the BrodaShop atelier — curated clothing rail"
              loading="lazy"
              style={reduced ? undefined : { y: imgY }}
              className="w-full h-[115%] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-burgundy text-ivory px-6 py-4">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-ivory/70">
              Since
            </p>
            <p className="font-display text-3xl leading-none mt-1">2026</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="inline-block text-[0.65rem] tracking-[0.3em] uppercase text-ivory bg-ink px-3 py-1.5 mb-6">
              The BrodaShop Edit
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08]">
              Fashion Is More Than{" "}
              <span className="italic text-burgundy">What You Wear.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-mute text-lg leading-relaxed mt-6 max-w-lg">
              At BrodaShop, we believe great style begins with the details.
              Thoughtfully selected pieces, timeless silhouettes, and
              contemporary essentials come together to help you express who you
              are.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-mute leading-relaxed mt-4 max-w-lg">
              Every garment in our collection is chosen for its fabric, its
              construction, and the way it moves with you — season after season.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="grid grid-cols-3 gap-6 mt-10 max-w-lg border-t border-line pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl sm:text-4xl">
                    <Counter
                      to={s.value}
                      decimals={s.decimals}
                      suffix={s.suffix}
                    />
                  </p>
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-mute mt-1.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase font-semibold border-b border-ink pb-1 hover:border-burgundy hover:text-burgundy transition-colors"
              >
                Explore the Edit
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/story"
                className="group inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase font-semibold text-mute border-b border-line pb-1 hover:border-burgundy hover:text-burgundy transition-colors"
              >
                Read the Full Story
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

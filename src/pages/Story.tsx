import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Leaf, Scissors, Users } from "lucide-react";
import { img } from "../data/products";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";
import Counter from "../components/Counter";
import Magnetic from "../components/Magnetic";

const INTRO_IMG = img("photo-1544441893-675973e31985", 1800);

const CHAPTERS = [
  {
    num: "01",
    year: "2026",
    title: "The Vision",
    text: "BrodaShop began with a simple conviction: clothing should be considered, not disposable. We imagined a wardrobe where every piece earns its place — cut with intention, made to move, and designed to be worn season after season.",
    image: img("photo-1493106641515-6b5631de4bb9", 1200),
    alt: "Editorial fashion portrait in soft studio light",
  },
  {
    num: "02",
    year: "2026",
    title: "The Edit",
    text: "Every collection begins as an edit — hundreds of fabric swatches narrowed to a handful, silhouettes tested on real bodies, colors matched to the light of the coast. If a piece doesn't clear the bar, it doesn't ship.",
    image: img("photo-1525507119028-ed4c629a60a3", 1200),
    alt: "Minimal fashion editorial in neutral tones",
  },
  {
    num: "03",
    year: "2026",
    title: "The Craft",
    text: "We work with small ateliers that share our standards: reinforced seams, pre-shrunk fabrics, and hardware that outlasts trends. Each garment is pressed, inspected, and folded by hand before it leaves the studio.",
    image: img("photo-1516257984-b1b4d707412e", 1200),
    alt: "Folded cotton garments in a clothing atelier",
  },
  {
    num: "04",
    year: "Next",
    title: "The Future",
    text: "This is a demo store, and the road ahead belongs to the client. We plan to expand with repair services, recycling programs, and made-to-order tailoring — fashion that gives back more than it takes.",
    image: img("photo-1600091166971-7f9faad6c1e2", 1200),
    alt: "Menswear fashion campaign in soft light",
  },
];

const VALUES = [
  {
    icon: Leaf,
    title: "Considered Materials",
    text: "Natural, durable fabrics chosen for longevity over volume. (Demo copy — subject to client approval.)",
  },
  {
    icon: Scissors,
    title: "Tailored Craft",
    text: "Reinforced construction and hardware that outlasts every trend cycle.",
  },
  {
    icon: Users,
    title: "Community First",
    text: "Built for the people who wear it — your feedback shapes every new season.",
  },
];

const STATS = [
  { value: 22, decimals: 0, suffix: "", label: "Curated pieces" },
  { value: 4.8, decimals: 1, suffix: "/5", label: "Average rating" },
  { value: 100, decimals: 0, suffix: "%", label: "Demo passion" },
];

function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2"
        aria-hidden
      />
      <motion.div
        style={{ scaleY }}
        className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-burgundy -translate-x-1/2 origin-top"
        aria-hidden
      />
      {children}
    </div>
  );
}

function Chapter({
  chapter,
  flip,
}: {
  chapter: (typeof CHAPTERS)[number];
  flip: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="relative grid md:grid-cols-2 gap-10 md:gap-20 items-center py-14 sm:py-20">
      <span
        className="absolute left-5 sm:left-1/2 top-14 sm:top-20 -translate-x-1/2 w-5 h-5 rounded-full bg-ivory border-2 border-burgundy z-10 shadow-[0_0_0_6px_rgba(122,38,58,0.12)]"
        aria-hidden
      />
      <Reveal mask className={flip ? "md:order-2" : ""}>
        <div className="relative aspect-[4/3] overflow-hidden bg-sand group">
          <motion.img
            src={chapter.image}
            alt={chapter.alt}
            loading="lazy"
            whileHover={reduced ? undefined : { scale: 1.08 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-ivory/95 text-ink text-[0.6rem] tracking-[0.25em] uppercase font-semibold px-3 py-1.5">
            {chapter.year}
          </span>
        </div>
      </Reveal>
      <div className={flip ? "md:order-1" : ""}>
        <Reveal>
          <p
            className="font-display text-6xl sm:text-7xl text-line leading-none select-none"
            aria-hidden
          >
            {chapter.num}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="font-display text-3xl sm:text-4xl mt-3">
            <span className="italic text-burgundy">{chapter.title}</span>
          </h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-mute leading-relaxed mt-5 max-w-md">
            {chapter.text}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export default function Story() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="pt-[100px] md:pt-[116px]">
      <section
        ref={heroRef}
        className="relative h-[70svh] min-h-[480px] overflow-hidden bg-ink"
      >
        <motion.div
          style={reduced ? undefined : { y: imgY }}
          className="absolute inset-0 -top-[10%] h-[120%]"
        >
          <img
            src={INTRO_IMG}
            alt="Clothing rail inside the BrodaShop studio"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/60" />
        <motion.div
          style={reduced ? undefined : { y: textY, opacity: fade }}
          className="relative z-10 h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-ivory/75 text-[0.65rem] tracking-[0.35em] uppercase mb-5"
          >
            Our Story
          </motion.p>
          <h1 className="font-display text-ivory font-medium leading-[1.02] text-5xl sm:text-7xl lg:text-8xl tracking-tight">
            <StaggerWords
              text="Crafted with"
              delay={0.25}
              stagger={0.1}
            />
            <br />
            <StaggerWords
              text="intention."
              delay={0.5}
              stagger={0.1}
              className="italic text-burgundy"
            />
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-ivory/70 text-[0.6rem] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <span className="w-px h-10 bg-ivory/30 relative overflow-hidden">
            <span className="scroll-dot absolute top-0 left-0 w-full h-3 bg-ivory" />
          </span>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-6">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
              The journey
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              Four chapters,{" "}
              <span className="italic text-mute">one standard.</span>
            </h2>
          </Reveal>
          <Timeline>
            {CHAPTERS.map((c, i) => (
              <Chapter key={c.num} chapter={c} flip={i % 2 === 1} />
            ))}
          </Timeline>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-sand/40">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <p className="font-display text-3xl sm:text-5xl leading-snug">
              “Fashion is the armor to survive the reality of everyday
              life.”
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[0.62rem] tracking-[0.3em] uppercase text-mute mt-7">
              Studio note — demo attribution
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal className="text-center mb-14">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
              What we stand for
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              More than <span className="italic text-mute">a brand.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12} hoverLift>
                <div className="bg-ivory border border-line p-8 h-full">
                  <span className="w-12 h-12 bg-sand flex items-center justify-center">
                    <v.icon size={20} className="text-burgundy" />
                  </span>
                  <h3 className="font-display text-2xl mt-6">{v.title}</h3>
                  <p className="text-sm text-mute leading-relaxed mt-3">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto border-t border-line pt-10">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
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
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-ink text-ivory">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-6xl leading-[1.05]">
              The story continues{" "}
              <span className="italic text-burgundy">with you.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-ivory/70 mt-5 max-w-md mx-auto">
              Explore the collection and write the next chapter of your
              wardrobe.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Magnetic strength={0.32} className="inline-block mt-9">
              <Link
                to="/shop"
                className="btn-shine inline-flex items-center gap-2.5 bg-ivory text-ink px-10 py-4 text-[0.72rem] tracking-[0.2em] uppercase font-semibold hover:bg-burgundy hover:text-ivory transition-colors duration-300"
              >
                Shop the Collection
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300"
                />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

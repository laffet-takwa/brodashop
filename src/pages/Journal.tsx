import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { JOURNAL_POSTS } from "../data/products";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";
import Magnetic from "../components/Magnetic";

export default function Journal() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [featured, ...rest] = JOURNAL_POSTS;

  return (
    <div className="pt-[100px] md:pt-[116px]">
      {/* Parallax hero */}
      <section ref={heroRef} className="relative h-[62vh] min-h-[420px] overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={featured.image}
            alt={featured.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
        <motion.div
          style={{ opacity: fade }}
          className="relative h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16"
        >
          <Reveal mask>
            <p className="text-[0.65rem] tracking-[0.35em] uppercase text-ivory/80 mb-4">
              Stories &amp; Style
            </p>
          </Reveal>
          <StaggerWords
            text="The Journal."
            as="h1"
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-ivory"
          />
          <Reveal delay={0.35} y={20}>
            <p className="text-ivory/75 max-w-md mt-5 leading-relaxed">
              Editorial stories, styling guides, and behind-the-scenes notes
              from the studio.
            </p>
          </Reveal>
        </motion.div>
      </section>

      {/* Featured article */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal mask>
            <Link
              to={`/journal/${featured.slug}`}
              className="group block relative aspect-[4/3] overflow-hidden bg-sand"
            >
              <img
                src={featured.image}
                alt={featured.alt}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop";
                }}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute top-4 left-4 bg-ivory text-ink text-[0.6rem] tracking-[0.2em] uppercase font-semibold px-3 py-1.5">
                Featured
              </span>
            </Link>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-4">
                {featured.category} — {featured.date}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight">
                {featured.title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-mute leading-relaxed mt-5 max-w-lg">
                {featured.excerpt}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="flex items-center gap-6 mt-8">
                <Magnetic strength={0.2}>
                  <Link
                    to={`/journal/${featured.slug}`}
                    className="btn-shine inline-flex items-center gap-2.5 bg-ink text-ivory px-7 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
                  >
                    Read Story
                    <ArrowRight size={15} />
                  </Link>
                </Magnetic>
                <span className="text-xs text-mute tracking-widest uppercase">
                  {featured.readTime}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08} hoverLift>
              <Link to={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
                  />
                  <span className="absolute bottom-4 left-4 bg-ivory/95 text-ink text-[0.58rem] tracking-[0.2em] uppercase font-semibold px-2.5 py-1">
                    {post.category}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-3 text-[0.62rem] tracking-[0.18em] uppercase text-mute">
                  <span>{post.date}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-2xl mt-2.5 group-hover:text-burgundy transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-mute leading-relaxed mt-2.5 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-ink mt-4">
                  Read
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-sand border-y border-line">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
          <Reveal mask>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">
              Style that speaks <span className="italic text-mute">softly.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-mute mt-4 max-w-md mx-auto">
              The stories are free. The pieces are timeless. Explore the
              latest collection.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Magnetic strength={0.2} className="inline-block mt-8">
              <Link
                to="/shop"
                className="btn-shine inline-flex items-center gap-2.5 bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
              >
                Shop the Collection
                <ArrowRight size={15} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

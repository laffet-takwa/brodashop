import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { JOURNAL_POSTS, img } from "../data/products";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";
import Magnetic from "../components/Magnetic";

const BODY: Record<string, string[]> = {
  "the-autumn-edit": [
    "Autumn arrives quietly in the atelier. The light softens, the palettes deepen, and the fabric racks fill with camel, rust, and deep olive. This season's edit is built around those tones — pieces that feel like they have already lived a little.",
    "The key to the look is restraint. One statement piece — an overcoat, a tailored shirt — does the work. Everything else stays quiet: a fine knit, a clean denim, a leather sneaker that has seen a few miles.",
    "We shot the campaign at golden hour on a rooftop in Tunis, where the medina glows amber. The result is a collection that feels warm, worn-in, and effortless — exactly how we think clothes should be.",
  ],
  "quiet-luxury-loud-confidence": [
    "True luxury rarely announces itself. It is the weight of a fabric, the hang of a seam, the way a collar sits at the throat. The most powerful people in any room are rarely the loudest — they are the most considered.",
    "Building a quiet-luxury wardrobe means investing in fewer, better things. A wool blazer with a natural shoulder. A cashmere crewneck in ivory. A leather tote that ages like a good story.",
    "The rule we follow: if you cannot explain why you love it in one sentence, it does not belong. Confidence comes from certainty, and certainty comes from choosing well.",
  ],
  "building-a-capsule-wardrobe": [
    "A capsule wardrobe is not about deprivation — it is about clarity. Twelve considered pieces can produce thirty distinct outfits, provided every item works with at least three others.",
    "Start with a neutral base: a white tee, dark denim, a camel coat, leather sneakers, tailored trousers. Then add personality through texture and proportion — a stripe top here, a cropped jacket there.",
    "Our formula: four tops, three bottoms, two outerwear, two shoes, one accessory. Shop the full collection and mix freely — every piece in the store is designed to layer.",
  ],
  "denim-reimagined": [
    "Great denim begins at the loom. Japanese selvedge denim is woven on old shuttle looms, producing a tight, durable edge that raw hems are proud to show off. It fades beautifully — every crease becomes a story.",
    "We finished our denim with a mid-rise cut and a clean tapered leg, tested across real bodies in the studio. The result stretches where you need it and holds where you do not.",
    "Care matters: wash inside out, cold, and hang to dry. In a year, your jeans will be the most personal thing in your closet.",
  ],
  "street-style-tunisian-nights": [
    "At golden hour, the medina becomes a runway. Tailored coats pass sharp denim jackets; leather boots meet white sneakers. Tradition and contemporary style share the street without conflict.",
    "We captured the moment with a local photographer and three friends of the studio. The brief: wear BrodaShop pieces like you mean it — with your own twist, and no posing.",
    "The takeaway: style is a conversation between what you wear and where you wear it. Tunis at night provides the perfect backdrop.",
  ],
  "the-art-of-layering": [
    "Layering is the oldest trick in style: texture over texture, proportion over proportion. Done well, it adds depth; done poorly, bulk. The difference is restraint and order.",
    "Our framework: start light, end heavy. A fine tee, a knit over the shoulders, a coat that moves. Keep one element fitted, one oversized, one long. Limit the palette to three tones.",
    "Autumn is the best season to practice — the air is cool enough to justify every layer. Browse outerwear and tops to build yours.",
  ],
};

export default function JournalPost() {
  const { slug } = useParams();
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/journal" replace />;

  const related = JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const paragraphs = BODY[post.slug] ?? [post.excerpt];

  return (
    <div className="pt-[100px] md:pt-[116px]">
      <article className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <Reveal>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-mute hover:text-burgundy transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Journal
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mt-10 mb-4">
            {post.category}
          </p>
        </Reveal>
        <StaggerWords
          text={post.title}
          as="h1"
          className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight"
        />
        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-mute tracking-widest uppercase">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} />
              {post.readTime}
            </span>
            <span>By the BrodaShop Studio</span>
          </div>
        </Reveal>

        <Reveal mask delay={0.1} className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden bg-sand">
            <motion.img
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              src={post.image}
              alt={post.alt}
              onError={(e) => {
                (e.target as HTMLImageElement).src = img(
                  "photo-1441986300917-64674bd600d8",
                  1400
                );
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-12 space-y-7">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className={`text-lg leading-[1.9] text-ink/90 ${
                  i === 0
                    ? "first-letter:font-display first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-burgundy"
                    : ""
                }`}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex items-center gap-4 bg-sand border border-line p-6">
            <span className="w-12 h-12 rounded-full overflow-hidden bg-ivory shrink-0">
              <img
                src={img("photo-1524504388940-b1c1722653e1", 200)}
                alt="BrodaShop Studio"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </span>
            <div>
              <p className="font-semibold text-sm">The BrodaShop Studio</p>
              <p className="text-xs text-mute mt-0.5">
                Writing about style, craft, and considered fashion from Tunis.
              </p>
            </div>
          </div>
        </Reveal>
      </article>

      {/* Related */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl mb-10">
            Keep <span className="italic text-mute">reading.</span>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-10">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} hoverLift>
              <Link to={`/journal/${p.slug}`} className="group flex gap-5">
                <div className="w-32 sm:w-44 shrink-0 aspect-[3/4] overflow-hidden bg-sand">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = img(
                        "photo-1441986300917-64674bd600d8",
                        600
                      );
                    }}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07]"
                  />
                </div>
                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-mute">
                    {p.category} — {p.date}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl mt-2 group-hover:text-burgundy transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-mute leading-relaxed mt-2 line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-16">
          <Magnetic strength={0.2} className="inline-block">
            <Link
              to="/shop"
              className="btn-shine inline-flex items-center gap-2.5 bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
            >
              Shop the Collection
              <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}

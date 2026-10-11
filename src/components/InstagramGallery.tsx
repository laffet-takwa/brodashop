import { GALLERY_IMAGES } from "../data/products";
import Reveal from "./Reveal";

export default function InstagramGallery() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
              The feed
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              BrodaShop <span className="italic text-mute">in the wild.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.06}>
              <div className="group relative aspect-square overflow-hidden bg-sand">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../data/products";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-sand/40">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
              In their words
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              Worn. Loved. <span className="italic text-mute">Repeated.</span>
            </h2>
            <p className="text-xs text-mute mt-4 max-w-md mx-auto">
              Sample testimonials shown for demonstration purposes.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} hoverLift>
              <figure className="bg-ivory border border-line p-7 sm:p-8 h-full flex flex-col transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(23,23,23,0.08)]">
                <Quote size={26} className="text-burgundy" />
                <blockquote className="text-[0.95rem] leading-relaxed mt-4 flex-1">
                  “{t.quote}”
                </blockquote>
                <div className="flex gap-0.5 mt-5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={12} className="text-burgundy" fill="currentColor" />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3 mt-5 pt-5 border-t border-line">
                  <img
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-mute">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

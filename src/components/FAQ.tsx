import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../data/products";
import Reveal from "./Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 bg-sand/40">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-burgundy mb-3">
              Good to know
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              Questions, <span className="italic text-mute">Answered.</span>
            </h2>
            <p className="text-xs text-mute mt-4">
              Demo policies — placeholder information requiring client approval.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  >
                    <span className="text-[0.95rem] font-medium group-hover:text-burgundy transition-colors">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`shrink-0 w-8 h-8 border flex items-center justify-center transition-colors ${
                        isOpen
                          ? "border-burgundy text-burgundy"
                          : "border-line text-mute group-hover:border-ink group-hover:text-ink"
                      }`}
                    >
                      <Plus size={14} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-mute leading-relaxed pb-6 pr-10">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveHorizontal, Ruler, ScanLine } from "lucide-react";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";

const WOMEN = [
  { size: "XS", bust: "80–84", waist: "62–66", hip: "88–92" },
  { size: "S", bust: "84–88", waist: "66–70", hip: "92–96" },
  { size: "M", bust: "88–92", waist: "70–74", hip: "96–100" },
  { size: "L", bust: "92–96", waist: "74–78", hip: "100–104" },
  { size: "XL", bust: "96–100", waist: "78–82", hip: "104–108" },
];

const MEN = [
  { size: "S", chest: "86–91", waist: "71–76", hip: "91–96" },
  { size: "M", chest: "91–96", waist: "76–81", hip: "96–101" },
  { size: "L", chest: "96–102", waist: "81–87", hip: "101–107" },
  { size: "XL", chest: "102–108", waist: "87–93", hip: "107–113" },
  { size: "XXL", chest: "108–114", waist: "93–99", hip: "113–119" },
];

const DENIM = [
  { waist: "30", inseam: "76 cm", frontRise: "28 cm", legOpening: "40 cm" },
  { waist: "32", inseam: "78 cm", frontRise: "29 cm", legOpening: "41 cm" },
  { waist: "34", inseam: "80 cm", frontRise: "30 cm", legOpening: "42 cm" },
  { waist: "36", inseam: "82 cm", frontRise: "31 cm", legOpening: "43 cm" },
  { waist: "38", inseam: "84 cm", frontRise: "32 cm", legOpening: "44 cm" },
];

const STEPS = [
  {
    icon: Ruler,
    title: "Measure your body",
    text: "Use a soft tape measure over light clothing. Keep it snug but not tight, and stand naturally.",
  },
  {
    icon: ScanLine,
    title: "Match the numbers",
    text: "Find the closest row in the table. Between sizes? Size up for our relaxed fits, down for tailored.",
  },
  {
    icon: MoveHorizontal,
    title: "Check the garment",
    text: "Every product page lists its own measurements — always check those first, as fits vary by style.",
  },
];

type Tab = "women" | "men" | "denim";

const TABS: { key: Tab; label: string }[] = [
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "denim", label: "Denim" },
];

export default function SizeGuide() {
  const [tab, setTab] = useState<Tab>("women");

  return (
    <div className="pt-[100px] md:pt-[116px]">
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 text-center">
        <Reveal mask>
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-burgundy mb-4">
            Find Your Fit
          </p>
        </Reveal>
        <StaggerWords
          text="Size Guide."
          as="h1"
          className="font-display text-5xl sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.3} y={20}>
          <p className="text-mute mt-5 max-w-md mx-auto leading-relaxed">
            All measurements in centimetres. When in doubt, size up —
            our fits are designed with room to move.
          </p>
        </Reveal>
      </section>

      <section className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        {/* Tabs */}
        <Reveal>
          <div className="flex gap-1 border-b border-line" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`relative px-5 sm:px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase font-semibold transition-colors ${
                  tab === t.key ? "text-ink" : "text-mute hover:text-ink"
                }`}
              >
                {t.label}
                {tab === t.key && (
                  <motion.span
                    layoutId="size-tab"
                    className="absolute left-0 right-0 -bottom-px h-0.5 bg-burgundy"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 border border-line bg-ivory overflow-x-auto"
          >
            {tab === "women" && (
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-[0.62rem] tracking-[0.2em] uppercase text-mute border-b border-line">
                    <th className="px-5 py-4">Size</th>
                    <th className="px-5 py-4">Bust</th>
                    <th className="px-5 py-4">Waist</th>
                    <th className="px-5 py-4">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {WOMEN.map((r, i) => (
                    <motion.tr
                      key={r.size}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="border-b border-line last:border-0 hover:bg-sand/60 transition-colors"
                    >
                      <td className="px-5 py-4 font-semibold">{r.size}</td>
                      <td className="px-5 py-4 text-mute">{r.bust}</td>
                      <td className="px-5 py-4 text-mute">{r.waist}</td>
                      <td className="px-5 py-4 text-mute">{r.hip}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "men" && (
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-[0.62rem] tracking-[0.2em] uppercase text-mute border-b border-line">
                    <th className="px-5 py-4">Size</th>
                    <th className="px-5 py-4">Chest</th>
                    <th className="px-5 py-4">Waist</th>
                    <th className="px-5 py-4">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {MEN.map((r, i) => (
                    <motion.tr
                      key={r.size}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="border-b border-line last:border-0 hover:bg-sand/60 transition-colors"
                    >
                      <td className="px-5 py-4 font-semibold">{r.size}</td>
                      <td className="px-5 py-4 text-mute">{r.chest}</td>
                      <td className="px-5 py-4 text-mute">{r.waist}</td>
                      <td className="px-5 py-4 text-mute">{r.hip}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "denim" && (
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-[0.62rem] tracking-[0.2em] uppercase text-mute border-b border-line">
                    <th className="px-5 py-4">Waist</th>
                    <th className="px-5 py-4">Inseam</th>
                    <th className="px-5 py-4">Front Rise</th>
                    <th className="px-5 py-4">Leg Opening</th>
                  </tr>
                </thead>
                <tbody>
                  {DENIM.map((r, i) => (
                    <motion.tr
                      key={r.waist}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="border-b border-line last:border-0 hover:bg-sand/60 transition-colors"
                    >
                      <td className="px-5 py-4 font-semibold">{r.waist}</td>
                      <td className="px-5 py-4 text-mute">{r.inseam}</td>
                      <td className="px-5 py-4 text-mute">{r.frontRise}</td>
                      <td className="px-5 py-4 text-mute">{r.legOpening}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="text-xs text-mute mt-4">
          Demo measurements — subject to client approval.
        </p>
      </section>

      {/* How to measure */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl mb-10">
            How to <span className="italic text-mute">measure.</span>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} hoverLift>
              <div className="h-full border border-line bg-ivory p-7 group hover:border-ink transition-colors duration-300">
                <span className="w-11 h-11 bg-sand flex items-center justify-center text-burgundy group-hover:bg-burgundy group-hover:text-ivory transition-colors duration-300">
                  <Icon size={18} />
                </span>
                <p className="text-[0.62rem] tracking-[0.25em] uppercase text-burgundy mt-6">
                  Step {i + 1}
                </p>
                <h3 className="font-display text-xl mt-2">{title}</h3>
                <p className="text-sm text-mute leading-relaxed mt-3">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

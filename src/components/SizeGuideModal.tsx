import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const SIZE_TABLE: { size: string; chest: string; waist: string; hip: string }[] = [
  { size: "XS", chest: "80–84", waist: "62–66", hip: "88–92" },
  { size: "S", chest: "84–88", waist: "66–70", hip: "92–96" },
  { size: "M", chest: "88–92", waist: "70–74", hip: "96–100" },
  { size: "L", chest: "92–96", waist: "74–78", hip: "100–104" },
  { size: "XL", chest: "96–102", waist: "78–84", hip: "104–110" },
  { size: "XXL", chest: "102–108", waist: "84–90", hip: "110–116" },
];

const SHOE_TABLE: { size: string; cm: string }[] = [
  { size: "36", cm: "22.5" },
  { size: "37", cm: "23.0" },
  { size: "38", cm: "23.8" },
  { size: "39", cm: "24.5" },
  { size: "40", cm: "25.0" },
  { size: "41", cm: "25.8" },
  { size: "42", cm: "26.5" },
  { size: "43", cm: "27.0" },
  { size: "44", cm: "27.8" },
  { size: "45", cm: "28.5" },
];

export default function SizeGuideModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-ivory w-full max-w-2xl max-h-[85svh] overflow-y-auto p-6 sm:p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center hover:bg-sand transition-colors"
            aria-label="Close size guide"
          >
            <X size={18} />
          </button>
          <h3 className="font-display text-2xl sm:text-3xl">Size Guide</h3>
          <p className="text-sm text-mute mt-2">
            Measurements in centimetres. Demo reference — subject to client approval.
          </p>

          <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-mute mt-7 mb-3">
            Clothing
          </h4>
          <div className="overflow-x-auto border border-line">
            <table className="w-full text-sm min-w-[420px]">
              <thead>
                <tr className="bg-sand/70 text-left">
                  <th className="px-4 py-2.5 font-semibold">Size</th>
                  <th className="px-4 py-2.5 font-semibold">Chest</th>
                  <th className="px-4 py-2.5 font-semibold">Waist</th>
                  <th className="px-4 py-2.5 font-semibold">Hip</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_TABLE.map((r) => (
                  <tr key={r.size} className="border-t border-line">
                    <td className="px-4 py-2.5 font-medium">{r.size}</td>
                    <td className="px-4 py-2.5 text-mute">{r.chest}</td>
                    <td className="px-4 py-2.5 text-mute">{r.waist}</td>
                    <td className="px-4 py-2.5 text-mute">{r.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-mute mt-7 mb-3">
            Footwear — foot length
          </h4>
          <div className="overflow-x-auto border border-line">
            <table className="w-full text-sm min-w-[280px]">
              <thead>
                <tr className="bg-sand/70 text-left">
                  <th className="px-4 py-2.5 font-semibold">EU Size</th>
                  <th className="px-4 py-2.5 font-semibold">Foot length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {SHOE_TABLE.map((r) => (
                  <tr key={r.size} className="border-t border-line">
                    <td className="px-4 py-2 font-medium">{r.size}</td>
                    <td className="px-4 py-2 text-mute">{r.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

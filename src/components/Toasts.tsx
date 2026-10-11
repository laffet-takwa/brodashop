import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Toasts() {
  const { toasts } = useShop();
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[95] flex flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-ink text-ivory text-sm pl-3.5 pr-5 py-3 rounded-full flex items-center gap-2.5 shadow-2xl"
            role="status"
          >
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

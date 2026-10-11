import { motion } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const word = "BROTASHOP";

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center cursor-pointer"
      onClick={onDone}
      role="status"
      aria-label="Loading BrodaShop — tap to skip"
    >
      <motion.span
        initial={{ opacity: 0, y: 34, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-16 h-16 bg-ivory text-ink font-display italic text-5xl flex items-center justify-center leading-none pb-1"
      >
        B
      </motion.span>

      <div className="flex overflow-hidden mt-7" aria-hidden>
        {word.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.4 + i * 0.05,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-ivory text-3xl sm:text-4xl tracking-[0.28em]"
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-44 bg-burgundy mt-7 origin-center"
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.5 }}
        className="text-ivory/50 text-[0.58rem] tracking-[0.42em] uppercase mt-5"
      >
        Premium fashion · Est 2026
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 text-ivory/30 text-[0.56rem] tracking-[0.35em] uppercase"
      >
        Tap to skip
      </motion.p>
    </motion.div>
  );
}

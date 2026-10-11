import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  mask?: boolean;
  hoverLift?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
  mask = false,
  hoverLift = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={
        mask ? { clipPath: "inset(0 0 100% 0)", opacity: 0 } : { opacity: 0, y }
      }
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
      whileHover={hoverLift ? { y: -6 } : undefined}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: mask ? 1.1 : 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

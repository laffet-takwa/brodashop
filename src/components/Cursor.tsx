import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    let fine = false;
    try {
      fine = window.matchMedia("(hover: hover) and (pointer: fine)")
        .matches;
    } catch {
      fine = false;
    }
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(
        !!t?.closest(
          "a, button, input, select, textarea, label, [role='tab'], [role='button']"
        )
      );
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[300] pointer-events-none"
        style={{ x, y }}
      >
        <div className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[299] pointer-events-none"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          animate={{
            scale: pressed ? 0.75 : hovering ? 1.9 : 1,
            opacity: hovering ? 0.9 : 0.55,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-burgundy"
        />
      </motion.div>
    </>
  );
}

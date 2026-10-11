import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { FALLBACK_IMAGE } from "../data/products";

interface TiltImageProps {
  src: string;
  alt: string;
  children?: ReactNode;
  onError?: () => void;
}

export default function TiltImage({
  src,
  alt,
  children,
  onError,
}: TiltImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 140, damping: 16 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16 });
  const smx = useSpring(mx, { stiffness: 140, damping: 16 });
  const smy = useSpring(my, { stiffness: 140, damping: 16 });
  const sheen = useMotionTemplate`radial-gradient(550px circle at ${smx}% ${smy}%, rgba(248,246,242,0.16), transparent 45%)`;
  const [error, setError] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 7);
    rx.set((0.5 - py) * 7);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={
          reduced ? undefined : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }
        }
        className="relative aspect-[4/5] overflow-hidden bg-sand"
      >
        <motion.img
          key={src}
          src={error ? FALLBACK_IMAGE : src}
          alt={alt}
          loading="lazy"
          onError={(e) => {
            onError?.();
            const target = e.target as HTMLImageElement;
            if (!target.dataset.fbk) {
              target.dataset.fbk = "1";
              target.src = FALLBACK_IMAGE;
            }
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
        />
        <motion.div
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        />
        {children}
      </motion.div>
    </div>
  );
}

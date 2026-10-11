import { motion, useReducedMotion } from "framer-motion";

interface StaggerWordsProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function StaggerWords({
  text,
  delay = 0,
  stagger = 0.08,
  className,
  as = "span",
}: StaggerWordsProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-1 -mb-1 align-top"
        >
          <motion.span
            className="inline-block"
            initial={reduced ? undefined : { y: "115%" }}
            whileInView={reduced ? undefined : { y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

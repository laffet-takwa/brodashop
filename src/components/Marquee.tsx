const ITEMS = [
  "New Season — Autumn / Winter 2026",
  "Free Shipping Over 150 TND",
  "30-Day Returns",
  "Premium Natural Fabrics",
  "Curated Editorial Pieces",
  "Limited Quantities",
];

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className={`marquee-hover overflow-hidden border-y py-3.5 ${
        dark
          ? "bg-ink text-ivory border-ink"
          : "bg-ivory text-ink border-line"
      }`}
      aria-hidden
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-[0.62rem] tracking-[0.32em] uppercase font-medium whitespace-nowrap"
          >
            {item}
            <span className="w-1.5 h-1.5 rotate-45 bg-burgundy shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

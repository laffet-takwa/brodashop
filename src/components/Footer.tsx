import { Link, useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";
import Newsletter from "./Newsletter";
import Reveal from "./Reveal";

const socialIcons = [
  {
    label: "Instagram",
    path: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
  },
  {
    label: "Facebook",
    path: "M13.5 21.888v-7.638h2.565l.385-3h-2.95V9.29c0-.87.24-1.462 1.485-1.462h1.58V5.22a21.2 21.2 0 0 0-2.302-.118c-2.28 0-3.847 1.398-3.847 3.963v2.45H7.75v3h2.814v7.638h2.936Z",
  },
  {
    label: "X",
    path: "M17.53 3h3.17l-6.94 7.93L22 21h-6.4l-5.01-6.56L4.5 21H1.33l7.42-8.48L2 3h6.57l4.53 5.98L17.53 3Zm-1.11 16.1h1.76L7.68 4.8H5.8l10.62 14.3Z",
  },
  {
    label: "YouTube",
    path: "M23 12s0-3.85-.49-5.7a2.9 2.9 0 0 0-2.05-2.05C18.7 3.75 12 3.75 12 3.75s-6.7 0-8.46.5A2.9 2.9 0 0 0 1.49 6.3C1 8.15 1 12 1 12s0 3.85.49 5.7a2.9 2.9 0 0 0 2.05 2.05c1.76.5 8.46.5 8.46.5s6.7 0 8.46-.5a2.9 2.9 0 0 0 2.05-2.05C23 15.85 23 12 23 12ZM9.75 15.5v-7L15.5 12l-5.75 3.5Z",
  },
];

export default function Footer() {
  const navigate = useNavigate();

  const go = (to: string) => {
    navigate(to);
  };

  const shopLinks = [
    { label: "New Arrivals", to: "/#new-arrivals" },
    { label: "Women", to: "/shop?category=Women" },
    { label: "Men", to: "/shop?category=Men" },
    { label: "Outerwear", to: "/shop?category=Outerwear" },
    { label: "Shoes", to: "/shop?category=Shoes" },
    { label: "Accessories", to: "/shop?category=Accessories" },
    { label: "Our Story", to: "/story" },
    { label: "Journal", to: "/journal" },
    { label: "Lookbook", to: "/lookbook" },
  ];

  const supportLinks = [
    { label: "Delivery & Shipping", to: "/contact" },
    { label: "Returns & Exchanges", to: "/contact" },
    { label: "Size Guide", to: "/size-guide" },
    { label: "Payment", to: "/checkout" },
    { label: "Contact", to: "/contact" },
    { label: "FAQ", to: "/contact" },
    { label: "My Account", to: "/account" },
    { label: "My Wishlist", to: "/wishlist" },
  ];

  return (
    <footer className="bg-ink text-ivory">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <button onClick={() => go("/")} className="flex items-center gap-2.5">
              <span className="w-8 h-8 bg-ivory text-ink font-display italic text-xl flex items-center justify-center leading-none pb-0.5">
                B
              </span>
              <span className="font-display text-[1.35rem] tracking-tight font-semibold">
                Broda<span className="italic text-burgundy">Shop</span>
              </span>
            </button>
            <p className="text-ivory/60 text-sm leading-relaxed mt-5 max-w-xs">
              Premium fashion, timeless silhouettes, and contemporary
              essentials — curated for the way you live now.
            </p>
            <div className="flex gap-2.5 mt-7">
              {socialIcons.map(({ label, path }) => (
                <a
                  key={label}
                  href={`https://www.${label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} (demo link)`}
                  className="w-10 h-10 border border-ivory/25 flex items-center justify-center hover:bg-ivory hover:text-ink transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-2">
            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.to)}
                    className="text-sm text-ivory/75 hover:text-ivory transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-2">
            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50 mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.to)}
                    className="text-sm text-ivory/75 hover:text-ivory transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-4">
            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50 mb-5">
              A Little More Style in Your Inbox
            </h4>
            <Newsletter dark />
            <div className="mt-8">
              <p className="text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 mb-3">
                We accept
              </p>
              <div className="flex flex-wrap gap-2">
                {["VISA", "Mastercard", "PayPal", "Cash on Delivery"].map(
                  (p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1.5 border border-ivory/25 px-3 py-1.5 text-[0.62rem] tracking-widest text-ivory/70"
                    >
                      <CreditCard size={11} />
                      {p}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-ivory/15 mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} BrodaShop. All rights reserved. Demo
            store — no real orders are processed.
          </p>
          <div className="flex gap-6 text-xs text-ivory/50">
            <Link to="/" className="hover:text-ivory transition-colors">
              Privacy
            </Link>
            <Link to="/" className="hover:text-ivory transition-colors">
              Terms
            </Link>
            <Link to="/" className="hover:text-ivory transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

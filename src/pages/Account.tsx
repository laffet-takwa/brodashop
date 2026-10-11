import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Box,
  ChevronRight,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { formatPrice, getProductById } from "../data/products";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";
import Magnetic from "../components/Magnetic";

type Tab = "signin" | "signup";

const ORDERS = [
  {
    id: "BS-2026-0847",
    date: "Sep 12, 2026",
    total: 228,
    status: "Delivered",
    items: ["p01", "p06"],
  },
  {
    id: "BS-2026-0798",
    date: "Aug 28, 2026",
    total: 129,
    status: "Delivered",
    items: ["p18"],
  },
  {
    id: "BS-2026-0751",
    date: "Aug 03, 2026",
    total: 249,
    status: "In transit",
    items: ["p03"],
  },
];

const ADDRESSES = [
  { label: "Home", line: "12 Rue de la Kasbah, Tunis 1001", tag: "Default" },
  { label: "Work", line: "45 Avenue Habib Bourguiba, Tunis 1002", tag: "" },
];

const inputClass =
  "w-full h-12 px-4 bg-ivory border border-line text-sm focus:outline-none focus:border-ink transition-colors";

export default function Account() {
  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password needs at least 6 characters");
      return;
    }
    if (tab === "signup" && name.trim().length < 2) {
      setError("Please enter your name");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <div className="pt-[100px] md:pt-[116px] min-h-screen">
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16 text-center">
        <Reveal mask>
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-burgundy mb-4">
            Your Space
          </p>
        </Reveal>
        <StaggerWords
          text="Account."
          as="h1"
          className="font-display text-5xl sm:text-6xl lg:text-7xl"
        />
      </section>

      <section className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <Reveal>
          <div className="border border-line bg-ivory p-7 sm:p-10 relative overflow-hidden">
            <motion.div
              initial={false}
              animate={{ opacity: done ? 0 : 1 }}
              className={done ? "pointer-events-none" : ""}
            >
              {/* Tabs */}
              <div className="flex gap-8 border-b border-line" role="tablist">
                {(
                  [
                    { key: "signin", label: "Sign In" },
                    { key: "signup", label: "Create Account" },
                  ] as { key: Tab; label: string }[]
                ).map((t) => (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={tab === t.key}
                    onClick={() => {
                      setTab(t.key);
                      setError("");
                    }}
                    className={`relative pb-4 text-[0.7rem] tracking-[0.2em] uppercase font-semibold transition-colors ${
                      tab === t.key ? "text-ink" : "text-mute hover:text-ink"
                    }`}
                  >
                    {t.label}
                    {tab === t.key && (
                      <motion.span
                        layoutId="account-tab"
                        className="absolute left-0 right-0 -bottom-px h-0.5 bg-burgundy"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <motion.form
                key={tab}
                initial={{ opacity: 0, x: tab === "signin" ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={onSubmit}
                noValidate
                className="mt-8 space-y-5"
              >
                {tab === "signup" && (
                  <div>
                    <label
                      htmlFor="a-name"
                      className="block text-[0.62rem] tracking-[0.2em] uppercase text-mute mb-2"
                    >
                      Full name
                    </label>
                    <input
                      id="a-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Amira Benali"
                      autoComplete="name"
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="a-email"
                    className="block text-[0.62rem] tracking-[0.2em] uppercase text-mute mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="a-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="a-pass"
                    className="block text-[0.62rem] tracking-[0.2em] uppercase text-mute mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="a-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    placeholder="••••••••"
                    autoComplete={
                      tab === "signin" ? "current-password" : "new-password"
                    }
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-burgundy text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <Magnetic strength={0.15} className="inline-block">
                  <button
                    type="submit"
                    className="btn-shine inline-flex items-center gap-2.5 bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
                  >
                    {tab === "signin" ? "Sign In" : "Create Account"}
                    <ChevronRight size={14} />
                  </button>
                </Magnetic>

                <p className="text-xs text-mute pt-2">
                  Demo only — credentials are checked locally and never
                  sent anywhere.
                </p>
              </motion.form>
            </motion.div>

            {/* Success state */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              className={`${done ? "" : "pointer-events-none absolute inset-0"} py-14 text-center`}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={done ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-24 h-24 mx-auto"
              >
                <svg viewBox="0 0 52 52" className="w-full h-full">
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="24"
                    fill="none"
                    stroke="#7A263A"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={done ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M15 27l7 7 15-15"
                    fill="none"
                    stroke="#7A263A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={done ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>
              <h2 className="font-display text-3xl mt-8">
                {tab === "signin" ? "Welcome back." : "Account created."}
              </h2>
              <p className="text-mute mt-3 max-w-sm mx-auto text-sm leading-relaxed">
                This is a simulated {tab === "signin" ? "sign-in" : "registration"}{" "}
                for the demo — no real account exists. Your demo profile:{" "}
                <span className="font-semibold text-ink">
                  {name || email || "demo@brodashop.com"}
                </span>
                .
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-8 border border-ink px-7 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-ink hover:text-ivory transition-colors"
              >
                Back
              </button>
            </motion.div>
          </div>
        </Reveal>

        {/* Order history */}
        <Reveal delay={0.05}>
          <h2 className="font-display text-2xl sm:text-3xl mt-16 mb-8 flex items-center gap-3">
            <Package size={22} className="text-burgundy" />
            Order history
          </h2>
        </Reveal>
        <div className="space-y-5">
          {ORDERS.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.06} hoverLift>
              <div className="border border-line bg-ivory p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{o.id}</p>
                    <p className="text-xs text-mute mt-0.5">{o.date}</p>
                  </div>
                  <span
                    className={`text-[0.62rem] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 ${
                      o.status === "Delivered"
                        ? "bg-olive/15 text-olive"
                        : "bg-burgundy/10 text-burgundy"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-5">
                  <div className="flex -space-x-3">
                    {o.items.map((id) => {
                      const p = getProductById(id);
                      if (!p) return null;
                      return (
                        <span
                          key={id}
                          className="w-12 h-14 rounded-sm overflow-hidden bg-sand border-2 border-ivory"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-xs text-mute">
                    {o.items.length} {o.items.length === 1 ? "item" : "items"}
                  </p>
                  <p className="text-sm font-semibold ml-auto">
                    {formatPrice(o.total)}
                  </p>
                </div>
                {o.status === "In transit" && (
                  <div className="mt-5">
                    <div className="h-1 bg-sand overflow-hidden">
                      <motion.div
                        initial={{ width: "12%" }}
                        whileInView={{ width: "64%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-burgundy"
                      />
                    </div>
                    <p className="text-[0.62rem] tracking-[0.18em] uppercase text-mute mt-2 flex items-center gap-1.5">
                      <Truck size={12} />
                      On its way — estimated delivery Sep 15
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Saved addresses + payment */}
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          <Reveal hoverLift>
            <div className="h-full border border-line bg-ivory p-7">
              <span className="w-11 h-11 bg-sand flex items-center justify-center text-burgundy">
                <MapPin size={18} />
              </span>
              <h3 className="font-display text-xl mt-5">Addresses</h3>
              <ul className="mt-4 space-y-4">
                {ADDRESSES.map((a) => (
                  <li key={a.label} className="text-sm">
                    <p className="font-semibold">
                      {a.label}
                      {a.tag && (
                        <span className="ml-2 text-[0.6rem] tracking-[0.15em] uppercase text-burgundy">
                          {a.tag}
                        </span>
                      )}
                    </p>
                    <p className="text-mute mt-0.5">{a.line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} hoverLift>
            <div className="h-full border border-line bg-ivory p-7">
              <span className="w-11 h-11 bg-sand flex items-center justify-center text-burgundy">
                <CreditCard size={18} />
              </span>
              <h3 className="font-display text-xl mt-5">Payment</h3>
              <p className="text-sm text-mute mt-4 leading-relaxed">
                Visa ending in 4242, expires 12/28
              </p>
              <p className="text-xs text-mute mt-3">
                Payment details are mocked for this demo.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 border border-line px-3 py-1.5 text-[0.62rem] tracking-widest text-mute">
                <Box size={11} />
                Demo data
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

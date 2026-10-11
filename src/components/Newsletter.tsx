import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";

export default function Newsletter({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-start sm:items-center gap-4 ${
          dark ? "text-ivory" : "text-ink"
        }`}
      >
        <CheckCircle2 size={26} className="text-emerald-500 shrink-0" />
        <div>
          <p className="font-semibold text-lg">You're on the list.</p>
          <p className={`text-sm mt-1 ${dark ? "text-ivory/70" : "text-mute"}`}>
            A little more style is on its way. (Demo — subscription simulated locally, no email was sent.)
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
        <label htmlFor={dark ? "newsletter-footer" : "newsletter"} className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            size={16}
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              dark ? "text-ivory/50" : "text-mute"
            }`}
          />
          <input
            id={dark ? "newsletter-footer" : "newsletter"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className={`w-full h-12 pl-11 pr-4 bg-transparent border text-sm ${
              dark
                ? "border-ivory/30 placeholder:text-ivory/50 text-ivory"
                : "border-line placeholder:text-mute text-ink"
            } focus:outline-none focus:border-burgundy transition-colors`}
          />
        </div>
        <button
          type="submit"
          className={`h-12 px-8 text-[0.7rem] tracking-[0.18em] uppercase font-semibold transition-colors duration-300 ${
            dark
              ? "bg-ivory text-ink hover:bg-burgundy hover:text-ivory"
              : "bg-ink text-ivory hover:bg-burgundy"
          }`}
        >
          Subscribe
        </button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-xs mt-2.5 ${dark ? "text-ivory/80" : "text-burgundy"}`}
          role="alert"
        >
          {error}
        </motion.p>
      )}
      <p className={`text-[11px] mt-3 ${dark ? "text-ivory/50" : "text-mute"}`}>
        Demo only — your email stays in your browser.
      </p>
    </form>
  );
}

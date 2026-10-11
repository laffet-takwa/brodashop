import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Send,
} from "lucide-react";
import { FAQS } from "../data/products";
import Reveal from "../components/Reveal";
import StaggerWords from "../components/StaggerWords";
import Magnetic from "../components/Magnetic";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@brodashop.com",
    note: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+216 71 000 000",
    note: "Mon–Sat, 9:00–19:00",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Avenue Habib Bourguiba, Tunis",
    note: "Visits by appointment",
  },
  {
    icon: Clock3,
    label: "Hours",
    value: "9:00 — 19:00",
    note: "Sunday closed",
  },
];

const inputClass = (err?: string) =>
  `w-full h-12 px-4 bg-ivory border text-sm focus:outline-none transition-colors ${
    err ? "border-burgundy" : "border-line focus:border-ink"
  }`;

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const set = (key: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email";
    if (form.message.trim().length < 10)
      next.message = "Message needs at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <div className="pt-[100px] md:pt-[116px]">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 text-center">
        <Reveal mask>
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-burgundy mb-4">
            We Would Love to Hear From You
          </p>
        </Reveal>
        <StaggerWords
          text="Say Hello."
          as="h1"
          className="font-display text-5xl sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.3} y={20}>
          <p className="text-mute mt-5 max-w-md mx-auto leading-relaxed">
            Questions about orders, sizing, or collaborations — every
            message lands with our studio team.
          </p>
        </Reveal>
      </section>

      {/* Channels */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHANNELS.map(({ icon: Icon, label, value, note }, i) => (
            <Reveal key={label} delay={i * 0.07} hoverLift>
              <div className="h-full border border-line bg-ivory p-6 group hover:border-ink transition-colors duration-300">
                <span className="w-11 h-11 bg-sand flex items-center justify-center text-burgundy group-hover:bg-burgundy group-hover:text-ivory transition-colors duration-300">
                  <Icon size={18} />
                </span>
                <p className="text-[0.62rem] tracking-[0.25em] uppercase text-mute mt-5">
                  {label}
                </p>
                <p className="font-semibold mt-1.5">{value}</p>
                <p className="text-xs text-mute mt-1">{note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="border border-line bg-ivory p-7 sm:p-9 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
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
                          animate={{ pathLength: 1 }}
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
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
                        />
                      </svg>
                    </motion.div>
                    <h2 className="font-display text-3xl mt-8">
                      Message <span className="italic text-mute">sent.</span>
                    </h2>
                    <p className="text-mute mt-3 max-w-xs mx-auto text-sm leading-relaxed">
                      Thanks for reaching out, {form.name.split(" ")[0]}. This
                      demo simulates sending — no message was actually delivered.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm(initialForm);
                      }}
                      className="mt-8 bg-ink text-ivory px-7 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl">
                      Write to us
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5 mt-7">
                      <div>
                        <label
                          htmlFor="c-name"
                          className="block text-[0.62rem] tracking-[0.2em] uppercase text-mute mb-2"
                        >
                          Name
                        </label>
                        <input
                          id="c-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => set("name")(e.target.value)}
                          className={inputClass(errors.name)}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="text-burgundy text-xs mt-1.5">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="c-email"
                          className="block text-[0.62rem] tracking-[0.2em] uppercase text-mute mb-2"
                        >
                          Email
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email")(e.target.value)}
                          className={inputClass(errors.email)}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="text-burgundy text-xs mt-1.5">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor="c-subject"
                        className="block text-[0.62rem] tracking-[0.2em] uppercase text-mute mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="c-subject"
                        value={form.subject}
                        onChange={(e) => set("subject")(e.target.value)}
                        className={`${inputClass()} appearance-none cursor-pointer`}
                      >
                        <option value="">General enquiry</option>
                        <option value="orders">Orders &amp; shipping</option>
                        <option value="returns">Returns &amp; exchanges</option>
                        <option value="sizing">Sizing help</option>
                        <option value="press">Press &amp; collaboration</option>
                      </select>
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor="c-message"
                        className="block text-[0.62rem] tracking-[0.2em] uppercase text-mute mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="c-message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => set("message")(e.target.value)}
                        className={`${inputClass(errors.message)} h-auto py-3 resize-y`}
                        placeholder="How can we help?"
                      />
                      {errors.message && (
                        <p className="text-burgundy text-xs mt-1.5">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <Magnetic strength={0.15} className="inline-block mt-7">
                      <button
                        type="submit"
                        className="btn-shine inline-flex items-center gap-2.5 bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
                      >
                        Send Message
                        <Send size={14} />
                      </button>
                    </Magnetic>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* FAQ accordion */}
          <div>
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl flex items-center gap-3">
                <MessageSquare size={22} className="text-burgundy" />
                Common questions
              </h2>
            </Reveal>
            <div className="mt-7 border-t border-line">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.04}>
                  <div className="border-b border-line">
                    <button
                      onClick={() =>
                        setOpenFaq((o) => (o === i ? null : i))
                      }
                      aria-expanded={openFaq === i}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    >
                      <span className="font-medium group-hover:text-burgundy transition-colors">
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 text-mute"
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-mute leading-relaxed pb-5 pr-8">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

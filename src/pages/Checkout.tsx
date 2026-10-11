import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, ShoppingBag } from "lucide-react";
import { FALLBACK_IMAGE, formatPrice, getProductById } from "../data/products";
import { useShop } from "../context/ShopContext";
import Reveal from "../components/Reveal";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postal: string;
}

const EMPTY: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postal: "",
};

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [placed, setPlaced] = useState<string | null>(null);

  const shipping = cartTotal > 150 || cartTotal === 0 ? 0 : 12;
  const total = cartTotal + shipping;

  const items = useMemo(
    () =>
      cart
        .map((i) => ({ item: i, product: getProductById(i.productId) }))
        .filter((x) => x.product),
    [cart]
  );

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "Enter a valid email";
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.postal.trim()) e.postal = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (cart.length === 0) return;
    if (!validate()) return;
    const orderNo = `BS-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      Math.random() * 900 + 100
    )}`;
    setPlaced(orderNo);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const set = (key: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const inputClass = (hasError?: string) =>
    `w-full h-12 px-4 bg-ivory border text-sm focus:outline-none transition-colors ${
      hasError ? "border-burgundy" : "border-line focus:border-ink"
    }`;

  if (placed) {
    return (
      <div className="pt-24 pb-24 min-h-screen px-5">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 mx-auto"
          >
            <svg viewBox="0 0 52 52" className="w-full h-full">
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="#6B6B4E"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
              <motion.path
                d="M15 27l7 7 15-15"
                fill="none"
                stroke="#6B6B4E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl mt-8">
              Demo order <span className="italic text-mute">placed.</span>
            </h1>
            <p className="text-mute mt-4 leading-relaxed">
              Thank you for exploring BrodaShop. This was a demonstration
              checkout — no payment was processed and no order was sent.
            </p>
            <div className="border border-line mt-9 p-6 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-mute">Order number</span>
                <span className="font-semibold">{placed}</span>
              </div>
              <div className="flex justify-between text-sm mt-3">
                <span className="text-mute">Demo total</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm mt-3">
                <span className="text-mute">Delivery estimate</span>
                <span className="font-semibold">2–4 business days</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
              <Link
                to="/shop"
                className="bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[100px] md:pt-[116px] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <Reveal>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase font-semibold text-mute hover:text-burgundy transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <h1 className="font-display text-4xl sm:text-5xl mt-5">
            Checkout <span className="italic text-mute">Demo.</span>
          </h1>
          <p className="text-xs text-mute mt-3">
            Demonstration only — no real payment is processed and no order is
            placed.
          </p>
        </Reveal>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <span className="w-16 h-16 border border-line rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={24} className="text-mute" />
            </span>
            <p className="font-display text-3xl mt-6">Your bag is empty</p>
            <p className="text-sm text-mute mt-3">
              Add some pieces before checking out.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-8 bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
            >
              Shop Now
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 mt-10">
            <form onSubmit={submit} className="lg:col-span-7 space-y-10">
              <Reveal>
                <section>
                  <h2 className="text-[0.7rem] tracking-[0.25em] uppercase font-semibold mb-5 pb-3 border-b border-line">
                    Contact
                  </h2>
                  <div>
                    <label htmlFor="co-email" className="text-xs text-mute">
                      Email address
                    </label>
                    <input
                      id="co-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      placeholder="you@example.com"
                      className={`${inputClass(errors.email)} mt-2`}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-xs text-burgundy mt-1.5" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </section>
              </Reveal>

              <Reveal delay={0.05}>
                <section>
                  <h2 className="text-[0.7rem] tracking-[0.25em] uppercase font-semibold mb-5 pb-3 border-b border-line">
                    Shipping Address
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="co-fn" className="text-xs text-mute">
                        First name
                      </label>
                      <input
                        id="co-fn"
                        value={form.firstName}
                        onChange={(e) => set("firstName")(e.target.value)}
                        className={`${inputClass(errors.firstName)} mt-2`}
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-burgundy mt-1.5" role="alert">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="co-ln" className="text-xs text-mute">
                        Last name
                      </label>
                      <input
                        id="co-ln"
                        value={form.lastName}
                        onChange={(e) => set("lastName")(e.target.value)}
                        className={`${inputClass(errors.lastName)} mt-2`}
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <p className="text-xs text-burgundy mt-1.5" role="alert">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="co-addr" className="text-xs text-mute">
                        Street address
                      </label>
                      <input
                        id="co-addr"
                        value={form.address}
                        onChange={(e) => set("address")(e.target.value)}
                        placeholder="12, Avenue Habib Bourguiba"
                        className={`${inputClass(errors.address)} mt-2`}
                        autoComplete="street-address"
                      />
                      {errors.address && (
                        <p className="text-xs text-burgundy mt-1.5" role="alert">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="co-city" className="text-xs text-mute">
                        City
                      </label>
                      <input
                        id="co-city"
                        value={form.city}
                        onChange={(e) => set("city")(e.target.value)}
                        placeholder="Tunis"
                        className={`${inputClass(errors.city)} mt-2`}
                        autoComplete="address-level2"
                      />
                      {errors.city && (
                        <p className="text-xs text-burgundy mt-1.5" role="alert">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="co-postal" className="text-xs text-mute">
                        Postal code
                      </label>
                      <input
                        id="co-postal"
                        value={form.postal}
                        onChange={(e) => set("postal")(e.target.value)}
                        placeholder="1001"
                        className={`${inputClass(errors.postal)} mt-2`}
                        autoComplete="postal-code"
                      />
                      {errors.postal && (
                        <p className="text-xs text-burgundy mt-1.5" role="alert">
                          {errors.postal}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              </Reveal>

              <Reveal delay={0.1}>
                <section>
                  <h2 className="text-[0.7rem] tracking-[0.25em] uppercase font-semibold mb-5 pb-3 border-b border-line flex items-center gap-2">
                    <Lock size={13} />
                    Payment — Demo
                  </h2>
                  <div className="border border-dashed border-line p-5 bg-sand/40">
                    <p className="text-sm text-mute leading-relaxed">
                      This is a demonstration checkout. Card fields are
                      intentionally disabled — no real payment method is
                      collected or processed.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-5">
                      <input
                        disabled
                        placeholder="Card number (disabled)"
                        className="w-full h-12 px-4 bg-sand border border-line text-sm text-mute cursor-not-allowed"
                        aria-disabled="true"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          disabled
                          placeholder="MM/YY"
                          className="w-full h-12 px-4 bg-sand border border-line text-sm text-mute cursor-not-allowed"
                          aria-disabled="true"
                        />
                        <input
                          disabled
                          placeholder="CVC"
                          className="w-full h-12 px-4 bg-sand border border-line text-sm text-mute cursor-not-allowed"
                          aria-disabled="true"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </Reveal>
            </form>

            <aside className="lg:col-span-5">
              <Reveal delay={0.08}>
                <div className="border border-line bg-sand/40 p-6 sm:p-8 lg:sticky lg:top-24">
                  <h2 className="text-[0.7rem] tracking-[0.25em] uppercase font-semibold mb-6">
                    Order Summary
                  </h2>
                  <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
                    {items.map(({ item, product }) => (
                      <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                        <div className="w-16 h-20 bg-ivory overflow-hidden shrink-0 border border-line">
                          <img
                            src={
                              product!.colors.find((c) => c.name === item.color)
                                ?.image || product!.images[0]
                            }
                            alt={product!.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                FALLBACK_IMAGE;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-snug">
                            {product!.name}
                          </p>
                          <p className="text-xs text-mute mt-1">
                            {item.color} · Size {item.size} · Qty {item.qty}
                          </p>
                        </div>
                        <p className="text-sm font-semibold shrink-0">
                          {formatPrice(product!.price * item.qty)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-line mt-6 pt-5 space-y-2.5 text-sm">
                    <div className="flex justify-between text-mute">
                      <span>Subtotal</span>
                      <span className="text-ink">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-mute">
                      <span>Shipping</span>
                      <span className="text-ink">
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-mute">
                      <span>Taxes</span>
                      <span className="text-ink">Included</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-line mt-5 pt-5">
                    <span className="text-[0.7rem] tracking-[0.2em] uppercase font-semibold">
                      Total
                    </span>
                    <span className="text-2xl font-semibold">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    onClick={submit}
                    className="w-full mt-7 bg-ink text-ivory h-13 py-4 text-[0.72rem] tracking-[0.18em] uppercase font-semibold flex items-center justify-center gap-2.5 hover:bg-burgundy transition-colors duration-300"
                  >
                    Place Demo Order — {formatPrice(total)}
                  </button>
                  <p className="text-[11px] text-mute text-center mt-4">
                    Demo checkout — no real payment, no real order.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

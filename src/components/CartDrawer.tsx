import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { FALLBACK_IMAGE, formatPrice, getProductById } from "../data/products";
import { useShop } from "../context/ShopContext";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartTotal,
    removeFromCart,
    updateQty,
    clearCart,
  } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, setCartOpen]);

  const FREE_SHIPPING = 150;
  const remaining = Math.max(0, FREE_SHIPPING - cartTotal);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[75] w-full max-w-md bg-ivory flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <h2 className="font-display text-2xl">
                Your Bag{" "}
                <span className="text-sm text-mute font-sans">
                  ({cart.length} {cart.length === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 flex items-center justify-center hover:bg-sand transition-colors"
                aria-label="Close bag"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-4 border-b border-line">
                <div className="flex items-center gap-3 text-xs text-mute">
                  <Truck size={14} />
                  {remaining > 0 ? (
                    <span>
                      Add <strong className="text-ink">{formatPrice(remaining)}</strong> for free shipping
                    </span>
                  ) : (
                    <span className="text-olive font-semibold">
                      You've unlocked free shipping
                    </span>
                  )}
                </div>
                <div className="h-1 bg-sand mt-2.5 overflow-hidden">
                  <motion.div
                    animate={{
                      width: `${Math.min(100, (cartTotal / FREE_SHIPPING) * 100)}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-olive"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="w-16 h-16 border border-line rounded-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-mute" />
                  </span>
                  <p className="font-display text-2xl mt-6">Your bag is empty</p>
                  <p className="text-sm text-mute mt-2 max-w-[240px]">
                    Beautiful pieces are waiting. Start with our new arrivals.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/shop");
                    }}
                    className="mt-7 bg-ink text-ivory px-8 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-burgundy transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => {
                    const p = getProductById(item.productId);
                    if (!p) return null;
                    return (
                      <motion.li
                        layout
                        key={`${item.productId}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4"
                      >
                        <Link
                          to={`/products/${p.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="w-20 h-24 shrink-0 bg-sand overflow-hidden"
                        >
                          <img
                            src={
                              p.colors.find((c) => c.name === item.color)
                                ?.image || p.images[0]
                            }
                            alt={p.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold leading-snug">
                                {p.name}
                              </p>
                              <p className="text-xs text-mute mt-1">
                                {item.color} · Size {item.size}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                removeFromCart(item.productId, item.size, item.color)
                              }
                              className="text-mute hover:text-burgundy transition-colors p-1"
                              aria-label={`Remove ${p.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-line">
                              <button
                                onClick={() =>
                                  updateQty(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.qty - 1
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center hover:bg-sand transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-xs font-semibold">
                                {item.qty}
                              </span>
                              <button
                                onClick={() =>
                                  updateQty(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.qty + 1
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center hover:bg-sand transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="text-sm font-semibold">
                              {formatPrice(p.price * item.qty)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-line px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] tracking-[0.2em] uppercase text-mute">
                    Subtotal
                  </span>
                  <span className="text-xl font-semibold">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-xs text-mute">
                  Shipping and taxes calculated at checkout. Demo — no real payment.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/checkout");
                  }}
                  className="w-full bg-ink text-ivory h-12 text-[0.72rem] tracking-[0.18em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-burgundy transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </button>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/shop");
                    }}
                    className="text-[0.7rem] tracking-[0.15em] uppercase font-semibold text-ink border-b border-ink pb-0.5 hover:border-burgundy hover:text-burgundy transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-xs text-mute underline underline-offset-2 hover:text-burgundy transition-colors"
                  >
                    Clear bag
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

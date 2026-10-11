import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "../data/products";

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  qty: number;
}

interface Toast {
  id: number;
  message: string;
}

interface ShopContextValue {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  wishlistOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setWishlistOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  addToCart: (productId: string, size: string, color: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toasts: Toast[];
  pushToast: (message: string) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("brodashop-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("brodashop-wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem("brodashop-cart", JSON.stringify(cart));
    } catch {
      /* storage unavailable */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("brodashop-wishlist", JSON.stringify(wishlist));
    } catch {
      /* storage unavailable */
    }
  }, [wishlist]);

  const pushToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback(
    (productId: string, size: string, color: string, qty = 1) => {
      setCart((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === productId && i.size === size && i.color === color
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: Math.min(next[idx].qty + qty, 10) };
          return next;
        }
        return [...prev, { productId, size, color, qty }];
      });
      const product = getProductById(productId);
      pushToast(product ? `${product.name} added to bag` : "Added to bag");
    },
    [pushToast]
  );

  const removeFromCart = useCallback(
    (productId: string, size: string, color: string) => {
      setCart((prev) =>
        prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color))
      );
    },
    []
  );

  const updateQty = useCallback((productId: string, size: string, color: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, qty: Math.max(1, Math.min(10, qty)) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        const product = getProductById(productId);
        if (!exists && product) pushToast(`${product.name} saved to wishlist`);
        return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [pushToast]
  );

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, i) => {
        const p = getProductById(i.productId);
        return sum + (p ? p.price * i.qty : 0);
      }, 0),
    [cart]
  );

  const value: ShopContextValue = {
    cart,
    wishlist,
    cartCount,
    cartTotal,
    cartOpen,
    wishlistOpen,
    searchOpen,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isWishlisted,
    toasts,
    pushToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

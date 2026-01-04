import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

/* =======================
   TYPES
======================= */
export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  address: string;
  setAddress: (address: string) => void;

  totalItems: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;

  applyPromoCode: (code: string) => boolean;
  promoCode: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/* =======================
   CONSTANTS
======================= */
const PROMO_CODES = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  WELCOME15: 0.15,
} as const;

const BEIRUT_SHIPPING = 3;
const OUTSIDE_BEIRUT_SHIPPING = 5;

/* =======================
   PROVIDER
======================= */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /* =======================
     ACTIONS
  ======================= */
  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return removeItem(id);
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setAddress("");
  };

  const applyPromoCode = (code: string): boolean => {
    const upper = code.toUpperCase().trim();
    if (PROMO_CODES[upper as keyof typeof PROMO_CODES]) {
      setPromoCode(upper);
      toast.success(`Promo "${upper}" applied`);
      return true;
    }
    toast.error("Invalid promo code");
    return false;
  };

  /* =======================
     CALCULATIONS
  ======================= */
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const discountRate = promoCode
    ? PROMO_CODES[promoCode as keyof typeof PROMO_CODES]
    : 0;

  const discount = subtotal * discountRate;
  const subtotalAfterDiscount = subtotal - discount;

  const isBeirut =
    address.toLowerCase().includes("beirut") ||
    address.toLowerCase().includes("بيروت");

  const shipping = address
    ? isBeirut
      ? BEIRUT_SHIPPING
      : OUTSIDE_BEIRUT_SHIPPING
    : 0;

  const total = subtotalAfterDiscount + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        address,
        setAddress,
        totalItems,
        subtotal,
        shipping,
        discount,
        total,
        applyPromoCode,
        promoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =======================
   HOOK
======================= */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

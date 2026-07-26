import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, FREE_SHIPPING_THRESHOLD, type Product } from "../data/products";

export interface CartItem {
  productId: string;
  sizeLabel?: string;
  unitPrice: number;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  drawerOpen: boolean;
  checkoutOpen: boolean;
  subtotal: number;
  count: number;
  freeShippingRemaining: number;
  addItem: (product: Product, sizeLabel?: string, unitPrice?: number) => void;
  removeItem: (productId: string, sizeLabel?: string) => void;
  setQty: (productId: string, sizeLabel: string | undefined, qty: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function productById(id: string): Product {
  const p = PRODUCTS.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addItem = (product: Product, sizeLabel?: string, unitPrice?: number) => {
    setItems((prev) => {
      const key = (i: CartItem) =>
        i.productId === product.id && i.sizeLabel === sizeLabel;
      const existing = prev.find(key);
      if (existing) {
        return prev.map((i) => (key(i) ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          productId: product.id,
          sizeLabel,
          unitPrice: unitPrice ?? product.price,
          qty: 1,
        },
      ];
    });
    setDrawerOpen(true);
  };

  const removeItem = (productId: string, sizeLabel?: string) =>
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.sizeLabel === sizeLabel))
    );

  const setQty = (productId: string, sizeLabel: string | undefined, qty: number) => {
    if (qty <= 0) return removeItem(productId, sizeLabel);
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.sizeLabel === sizeLabel ? { ...i, qty } : i
      )
    );
  };

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const value: CartContextValue = {
    items,
    drawerOpen,
    checkoutOpen,
    subtotal,
    count,
    freeShippingRemaining,
    addItem,
    removeItem,
    setQty,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    openCheckout: () => {
      setDrawerOpen(false);
      setCheckoutOpen(true);
    },
    closeCheckout: () => setCheckoutOpen(false),
    clearCart: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

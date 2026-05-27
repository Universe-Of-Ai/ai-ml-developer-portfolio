import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  vendor: string;
  vendorSlug: string;
  qty: number;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getShipping: () => number;
  getGST: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variant === item.variant
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existing.id ? { ...i, qty: i.qty + item.qty } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 99 ? 0 : 12.99;
      },

      getGST: () => {
        const subtotal = get().getSubtotal();
        return Math.round(subtotal * 0.1 * 100) / 100;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShipping();
        const gst = get().getGST();
        return Math.round((subtotal + shipping + gst) * 100) / 100;
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

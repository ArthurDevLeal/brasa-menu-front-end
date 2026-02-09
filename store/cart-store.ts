import { create } from "zustand";
import { ProductWithRelations } from "@/types/product-type";

interface CartItem {
  id: string;
  product: ProductWithRelations;
  quantity: number;
  selectedAddons?: { id: string; name: string; price: number }[];
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: ProductWithRelations, quantity: number, selectedAddons?: { id: string; name: string; price: number }[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product, quantity, selectedAddons = []) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && JSON.stringify(item.selectedAddons) === JSON.stringify(selectedAddons)
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === existingItem.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
            selectedAddons,
          },
        ],
      };
    });
  },
  removeFromCart: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => ({
      items: state.items
        .map((item) => (item.id === itemId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    }));
  },
  clearCart: () => {
    set({ items: [] });
  },
  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },
  getTotalPrice: () => {
    return get().items.reduce((acc, item) => {
      const addonPrice = item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
      return acc + (item.product.price + addonPrice) * item.quantity;
    }, 0);
  },
}));
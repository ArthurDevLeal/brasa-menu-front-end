"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingButton() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const cartItemCount = getTotalItems();
  const cartTotal = getTotalPrice();

  return (
    <AnimatePresence>
      {cartItemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-linear-to-t from-background via-background to-transparent pt-8"
        >
          <Sheet>
            <SheetTrigger asChild>
              <div className="w-full h-14 bg-primary text-primary-foreground rounded-lg flex items-center justify-center px-4 cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
                <ShoppingBag className="w-5 h-5 mr-3" />
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-semibold">Mostrar pedido ao garçom</span>
                  <span className="text-xs opacity-90">{cartItemCount} {cartItemCount === 1 ? "item" : "itens"} • R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-background border-border flex flex-col ">
              <SheetHeader>
                <SheetTitle className="text-foreground">Seu Pedido</SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4 p-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-card rounded-lg p-4 border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm">{item.product.name}</h4>
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.selectedAddons.map((a) => a.name).join(", ")}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-primary">
                          R${" "}
                          {(
                            (item.product.price +
                              (item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0)) *
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t border-border pt-4 mt-auto px-6 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="bg-primary border rounded-lg p-4">
                  <p className="font-medium text-sm text-center">
                    Mostre este pedido ao garçom para que ele confirme o seu pedido.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
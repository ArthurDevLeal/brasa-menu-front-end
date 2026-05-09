"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, ChevronRight } from "lucide-react";
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
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none" />
          
          <Sheet>
            <SheetTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full max-w-lg mx-auto"
              >
                <div className="w-full h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-between px-5 cursor-pointer shadow-xl shadow-primary/20 border border-primary-foreground/10 transition-all duration-200 hover:shadow-2xl hover:shadow-primary/30">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 flex items-center justify-center backdrop-blur-sm">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary-foreground text-primary text-xs font-bold rounded-full flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold tracking-tight">Ver pedido</span>
                      <span className="text-xs text-primary-foreground/70">{cartItemCount} {cartItemCount === 1 ? "item" : "itens"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">R$ {cartTotal.toFixed(2)}</span>
                    <ChevronRight className="w-5 h-5 text-primary-foreground/70" />
                  </div>
                </div>
              </motion.div>
            </SheetTrigger>
            
            <SheetContent className="w-full sm:max-w-md bg-background border-l border-border flex flex-col p-0">
              <SheetHeader className="p-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-foreground text-lg">Seu Pedido</SheetTitle>
                    <p className="text-sm text-muted-foreground">{cartItemCount} {cartItemCount === 1 ? "item" : "itens"}</p>
                  </div>
                </div>
              </SheetHeader>
              
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                  {items.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{item.product.name}</h4>
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              + {item.selectedAddons.map((a) => a.name).join(", ")}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-md hover:bg-background"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold text-foreground text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-md hover:bg-background"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-primary text-lg">
                          R${" "}
                          {(
                            (item.product.price +
                              (item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0)) *
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="border-t border-border p-6 bg-card/50 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-muted-foreground">Total do pedido</span>
                  <span className="text-3xl font-bold text-foreground">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-lg">👨‍🍳</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      Mostre este pedido ao garçom para que ele confirme o seu pedido.
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

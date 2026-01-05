import { useState } from "react";
import { Minus, Plus, Trash2, Tag, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Reveal from "@/components/ui/Reveal";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const navigate = useNavigate();

  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    discount,
    total,
    applyPromoCode,
    promoCode,
    totalItems,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput("");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg flex flex-col px-3 sm:px-6"
      >
        {/* HEADER */}
        <SheetHeader className="pb-2">
          <SheetTitle className="flex items-center gap-2 text-lg sm:text-2xl">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-gold" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <ShoppingBag className="h-16 w-16 text-muted mb-3" />
              <p className="text-base font-semibold mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Add some luxury perfumes to get started!
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-gold text-black text-sm"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <Reveal key={item.id} stagger={60} index={index}>
                  <div className="bg-card rounded-lg p-3 border border-gold/20">
                    <div className="flex gap-3">
                      {/* IMAGE */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-xs sm:text-sm leading-tight">
                            {item.name}
                          </h4>

                          <Button
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-7 w-7 sm:h-8 sm:w-8 text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        <p className="text-sm sm:text-lg font-bold text-gold mt-1">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="icon"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-7 w-7 sm:h-8 sm:w-8 bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40 disabled:opacity-40"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <Button
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-7 w-7 sm:h-8 sm:w-8 bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* SUMMARY */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-3 text-sm">
            {!promoCode && (
              <div className="space-y-1">
                <label className="text-xs font-medium">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="CODE"
                    className="h-9 text-sm"
                    value={promoInput}
                    onChange={(e) =>
                      setPromoInput(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleApplyPromo()
                    }
                  />
                  <Button
                    onClick={handleApplyPromo}
                    variant="outline"
                    size="sm"
                  >
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full bg-gold text-black text-sm h-10"
              onClick={() => {
                onOpenChange(false);
                navigate("/checkout");
              }}
            >
              Summary
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

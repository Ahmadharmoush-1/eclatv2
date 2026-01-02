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

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const navigate = useNavigate(); // ✅ MUST be inside component

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
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="h-6 w-6 text-accent" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <ShoppingBag className="h-24 w-24 text-muted mb-4" />
              <p className="text-xl font-semibold mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-6">
                Add some luxury perfumes to get started!
              </p>
              <Button onClick={() => onOpenChange(false)} className="bg-accent">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl p-4 border border-border shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-semibold">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-lg font-bold mb-3">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUMMARY */}
        {items.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            {!promoCode && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoInput}
                    onChange={(e) =>
                      setPromoInput(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleApplyPromo()
                    }
                  />
                  <Button onClick={handleApplyPromo} variant="outline">
                    <Tag className="h-4 w-4 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-accent">
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

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* ✅ SUMMARY BUTTON */}
            <Button
              size="lg"
              className="w-full bg-gold text-black"
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

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { sendWhatsAppOrder } from "@/lib/whatsapp";
import { ShoppingBag, Truck, User, Phone } from "lucide-react";

const Checkout = () => {
  const { items, total, shipping, address, setAddress } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = () => {
    sendWhatsAppOrder({
      items,
      total,
      fullName,
      phone,
      address,
      shipping,
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-black px-4 py-10">
        <div className="max-w-3xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gold">
              Checkout
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete your luxury order ✨
            </p>
          </div>

          {/* ORDER CARD */}
          <div className="bg-card border border-gold/30 rounded-2xl p-6 shadow-xl mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="text-gold" />
              <h2 className="text-xl font-semibold text-gold">
                Order Summary
              </h2>
            </div>

            <div className="space-y-3 text-sm">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-gold/10 pb-2"
                >
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gold font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  Delivery
                </span>
                <span className="text-gold font-semibold">
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t border-gold/20 pt-3">
                <span className="text-gold">Total</span>
                <span className="text-gold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* CUSTOMER INFO */}
          <div className="bg-card border border-gold/30 rounded-2xl p-6 shadow-xl mb-10">
            <h2 className="text-xl font-semibold text-gold mb-4">
              Customer Information
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gold/60 h-4 w-4" />
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="pl-9 bg-black border-gold/30 text-gold placeholder:text-muted-foreground"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gold/60 h-4 w-4" />
                <Input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="pl-9 bg-black border-gold/30 text-gold placeholder:text-muted-foreground"
                />
              </div>

              <Textarea
                placeholder="Address (Beirut = $3 • Outside Beirut = $5)"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="bg-black border-gold/30 text-gold placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* WHATSAPP BUTTON */}
          <Button
            size="lg"
            className="w-full bg-gold text-black font-semibold text-lg hover:bg-gold/90 active:scale-95 transition rounded-xl shadow-lg"
            onClick={handleOrder}
          >
            Order via WhatsApp
          </Button>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;

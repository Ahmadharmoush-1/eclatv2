import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";

import { sendWhatsAppOrder } from "@/lib/whatsapp";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();


  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleOrder = () => {
    sendWhatsAppOrder({
      items,
      total,
      fullName,
      phone,
      address,
    });
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

        {/* CART ITEMS */}
        {items.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <p className="font-bold mt-4">Total: ${total.toFixed(2)}</p>

        {/* USER INFO */}
        <div className="mt-8 space-y-4">
          <Input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
          <Input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
          <Textarea placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        <Button
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
          onClick={handleOrder}
        >
          Order via WhatsApp
        </Button>
        
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

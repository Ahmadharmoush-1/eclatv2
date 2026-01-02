import { useCart } from "@/contexts/CartContext";
import { WhatsAppOrderData } from "@/hooks/use-toast";

export const generateWhatsAppMessage = ({
  items,
  fullName,
  phone,
  address,
  total,
}: WhatsAppOrderData) => {
  let message = "🛒 *New Order*%0A%0A";

  message += `👤 Name: ${fullName}%0A`;
  message += `📞 Phone: ${phone}%0A`;
  message += `📍 Address: ${address}%0A%0A`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x${item.quantity} — $${(
      item.price * item.quantity
    ).toFixed(2)}%0A`;
  });

  message += `%0A💰 *Total: $${total.toFixed(2)}*`;

  return message;
};

export const sendWhatsAppOrder = (data: WhatsAppOrderData) => {
  const phoneNumber = "96178700373"; // 🇱🇧 YOUR NUMBER
  const message = generateWhatsAppMessage(data);

  window.open(
    `https://wa.me/${phoneNumber}?text=${message}`,
    "_blank"
  );
};

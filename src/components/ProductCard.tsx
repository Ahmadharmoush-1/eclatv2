import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddSizeToCart = (
    e: React.MouseEvent,
    size: { ml: number; price: number; oldPrice: number }
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: Number(`${product.id}${size.ml}`), // unique per size
      name: `${product.name} - ${size.ml}ml`,
      image: product.image,
      price: size.price,
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="relative bg-card rounded-lg overflow-hidden border border-gold/20 shadow-lg hover:-translate-y-2 transition-all group">

        {/* Discount */}
        <Badge className="absolute top-3 left-3 z-10 bg-gold text-black font-bold">
          -{product.discount}%
        </Badge>

        {/* Image */}
        <div className="relative aspect-square p-6 bg-black/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition"
          />
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          {/* Rating */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-gold text-gold"
                    : "text-muted"
                }`}
              />
            ))}
          </div>

          <h3 className="font-semibold text-gold-light">
            {product.name}
          </h3>

          {/* 🔥 SIZE BUTTONS */}
          {/* SIZE SELECTOR */}
<div className="flex gap-2 mt-2">
  {product.sizes.map((size) => (
    <button
      key={size.ml}
      onClick={(e) => handleAddSizeToCart(e, size)}
      className="
        flex-1
        rounded-xl
        border border-gold/30
        px-2 py-2
        text-center
        bg-black/40
        hover:bg-gold/10
        active:scale-95
        transition
      "
    >
      <p className="text-xs font-semibold text-gold tracking-wide">
        {size.ml}ml
      </p>

      <div className="flex items-center justify-center gap-1 mt-0.5">
        <span className="text-sm font-bold text-gold">
          ${size.price.toFixed(2)}
        </span>
        <span className="text-[10px] text-muted line-through">
          ${size.oldPrice.toFixed(2)}
        </span>
      </div>
    </button>
  ))}
</div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

const ProductCard = memo(
  ({ product, priority = false, index = 0 }: ProductCardProps) => {
    const { addItem } = useCart();

    const handleAddSizeToCart = (
      e: React.MouseEvent,
      size: { ml: number; price: number; oldPrice: number }
    ) => {
      e.preventDefault();
      e.stopPropagation();

      addItem({
        id: `${product.id}-${size.ml}`,
        name: `${product.name} - ${size.ml}ml`,
        image: product.image,
        price: size.price,
      });
    };

    return (
      <Link to={`/product/${product.id}`}>
        <div
          className="
            group relative bg-card rounded-lg overflow-hidden
            border border-gold/20 shadow-lg
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-gold/10
            animate-fade-in-up
          "
          style={{ animationDelay: `${index * 40}ms` }}
        >
          {/* DISCOUNT BADGE */}
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 z-10 bg-gold text-black text-xs">
              -{product.discount}%
            </Badge>
          )}

          {/* IMAGE */}
          <div className="relative aspect-square bg-black/40 p-2 flex items-center justify-center">
            <OptimizedImage
              src={product.image}
              alt={product.name}
              priority={priority}
              aspectRatio="square"
              className="
                !object-contain
                w-[90%] h-[90%]
                transition-transform duration-500
                group-hover:scale-105
              "
            />
          </div>

          {/* INFO */}
          <div className="p-3 space-y-2">
            <h3 className="text-sm font-semibold text-gold-light truncate">
              {product.name}
            </h3>

            {/* SIZE BUTTONS */}
            <div className="grid grid-cols-2 gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size.ml}
                  onClick={(e) => handleAddSizeToCart(e, size)}
                  className="
                    rounded-md border border-gold/25 bg-black/40
                    px-1 py-1
                    hover:bg-gold/10
                    active:scale-95
                    transition
                  "
                >
                  <p className="text-[10px] font-semibold text-gold">
                    {size.ml}ml
                  </p>
                  <div className="flex justify-center gap-1 leading-none">
                    <span className="text-[11px] font-bold text-gold">
                      ${size.price}
                    </span>
                    <span className="text-[9px] text-muted line-through">
                      ${size.oldPrice}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

ProductCard.displayName = "ProductCard";
export default ProductCard;

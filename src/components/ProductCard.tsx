import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import Reveal from "@/components/ui/Reveal";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard = memo(({ product, priority = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isLowMemoryDevice } = useDeviceDetect();

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
    <Reveal variant="fade-up">
      <Link to={`/product/${product.id}`}>
        <div
          className={
            isLowMemoryDevice
              ? "relative bg-card rounded-lg overflow-hidden border border-gold/20"
              : "relative bg-card rounded-lg overflow-hidden border border-gold/20 shadow-lg transition-all duration-300 hover:shadow-gold/10"
          }
        >
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 z-10 bg-gold text-black text-xs">
              -{product.discount}%
            </Badge>
          )}

          <div className="aspect-[3/4] bg-black/40 overflow-hidden">
            <OptimizedImage
              src={product.image}
              alt={product.name}
              priority={priority}
              aspectRatio="3/4"
              className={
                isLowMemoryDevice
                  ? "w-full h-full"
                  : "w-full h-full transition-transform duration-300 hover:scale-[1.03]"
              }
            />
          </div>

          <div className="p-3 space-y-2">
            <h3 className="text-sm font-semibold text-gold truncate">
              {product.name}
            </h3>

            <div className="grid grid-cols-2 gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size.ml}
                  onClick={(e) => handleAddSizeToCart(e, size)}
                  className="rounded-md border border-gold/25 bg-black/40 px-1 py-1"
                >
                  <p className="text-[10px] font-semibold text-gold">
                    {size.ml}ml
                  </p>
                  <div className="flex justify-center gap-1 leading-none">
                    <span className="text-[11px] font-bold text-gold">
                      ${size.price}
                    </span>
                    <span className="text-[9px] line-through text-muted">
                      ${size.oldPrice}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;

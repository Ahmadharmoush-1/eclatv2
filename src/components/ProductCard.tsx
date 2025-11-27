import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  discount: number;
}

const ProductCard = ({ id, name, image, price, oldPrice, rating, reviews, discount }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, image, price });
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="relative bg-card rounded-lg overflow-hidden border border-gold/20 shadow-lg shadow-gold/5 hover:shadow-2xl hover:shadow-gold/20 transition-all hover:-translate-y-2 cursor-pointer group">
        <Badge className="absolute top-3 left-3 z-10 bg-gold text-black font-bold px-3 py-1.5 rounded-md uppercase text-xs tracking-wider">
          -{discount}%
        </Badge>
        
        <div className="relative aspect-square p-6 bg-gradient-to-br from-secondary to-black/50">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
          
          <Button 
            size="icon"
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-gold hover:bg-gold-light text-black shadow-xl hover:scale-110 transition-all active:scale-95 z-10 font-bold"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 bg-gradient-to-b from-card to-secondary">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-gold text-gold' : 'text-muted'}`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({reviews})</span>
          </div>
          
          <h3 className="font-semibold text-base text-gold-light mb-2 line-clamp-2">{name}</h3>
          
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold text-xl">${price.toFixed(2)}</span>
            <span className="text-price-old line-through text-sm">${oldPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

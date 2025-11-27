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
      <div className="relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
        <Badge className="absolute top-3 left-3 z-10 bg-save-badge text-accent-foreground font-bold px-3 py-1 rounded-lg">
          SAVE {discount}%
        </Badge>
        
        <div className="relative aspect-square p-4 bg-white">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain"
          />
          
          <Button 
            size="icon"
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:scale-110 transition-all active:scale-95 z-10"
          >
            <ShoppingBag className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-rating-star text-rating-star' : 'text-muted'}`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({reviews})</span>
          </div>
          
          <h3 className="font-semibold text-lg text-foreground mb-2">{name}</h3>
          
          <div className="flex items-center gap-2">
            <span className="text-price-sale font-bold text-xl">From ${price.toFixed(2)}</span>
            <span className="text-price-old line-through text-sm">${oldPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

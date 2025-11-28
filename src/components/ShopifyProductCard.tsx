import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

export const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const image = node.images.edges[0]?.node;
  const defaultVariant = node.variants.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (defaultVariant) {
      addItem({
        product,
        variantId: defaultVariant.id,
        variantTitle: defaultVariant.title,
        price: defaultVariant.price,
        quantity: 1,
        selectedOptions: defaultVariant.selectedOptions,
      });
    }
  };

  return (
    <Link to={`/product/${node.handle}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative overflow-hidden aspect-square">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          <Button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{node.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {node.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">
              {currency} {price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

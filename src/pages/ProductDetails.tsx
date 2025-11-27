import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingBag, Clock, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import ProductCard from "@/components/ProductCard";
import SizeSelector from "@/components/SizeSelector";

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === Number(id));
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] || product?.sizes[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/">
            <Button className="bg-accent hover:bg-accent/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: `${product.name} (${selectedSize?.ml}ml)`,
      image: product.image,
      price: selectedSize?.price || product.price,
    });
  };

  const recommendedProducts = products.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        {/* Product Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl overflow-hidden border border-border shadow-lg aspect-square">
              <Badge className="absolute top-4 left-4 z-10 bg-save-badge text-accent-foreground font-bold px-3 py-1">
                SAVE {product.discount}%
              </Badge>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-foreground mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-rating-star text-rating-star"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-foreground leading-relaxed mb-6">{product.description}</p>
              
              <div className="bg-accent/10 rounded-xl p-4 border border-accent/20 mb-6">
                <p className="text-sm font-semibold text-foreground">
                  Inspired by: <span className="text-accent">{product.inspiredBy}</span>
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-price-sale">
                  ${selectedSize?.price.toFixed(2)}
                </span>
                <span className="text-xl text-price-old line-through">
                  ${selectedSize?.oldPrice.toFixed(2)}
                </span>
              </div>

              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize!}
                onSizeChange={setSelectedSize}
              />
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 rounded-xl text-lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 bg-secondary rounded-xl p-4">
                <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Longevity</p>
                  <p className="font-semibold text-foreground">{product.longevity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-secondary rounded-xl p-4">
                <Waves className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Sillage</p>
                  <p className="font-semibold text-foreground">{product.sillage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Scent Notes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Scent Notes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Top Notes
              </h3>
              <ul className="space-y-2">
                {product.notes.top.map((note) => (
                  <li key={note} className="text-foreground">• {note}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Middle Notes
              </h3>
              <ul className="space-y-2">
                {product.notes.middle.map((note) => (
                  <li key={note} className="text-foreground">• {note}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Base Notes
              </h3>
              <ul className="space-y-2">
                {product.notes.base.map((note) => (
                  <li key={note} className="text-foreground">• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Customer Reviews */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-rating-star text-rating-star"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {product.customerReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* You May Also Like */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4">
            {recommendedProducts.map((rec) => (
              <ProductCard
                key={rec.id}
                id={rec.id}
                name={rec.name}
                image={rec.image}
                price={rec.price}
                oldPrice={rec.oldPrice}
                rating={rec.rating}
                reviews={rec.reviews}
                discount={rec.discount}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;

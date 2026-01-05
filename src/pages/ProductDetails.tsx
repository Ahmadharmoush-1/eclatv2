import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Reveal from "@/components/ui/Reveal";

type SizeOption = {
  label: string;
  ml: number;
  price: number;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-3">
            Product Not Found
          </h1>
          <Link to="/">
            <Button size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sizes: SizeOption[] = [
    { label: "50ml", ml: 50, price: product.sizes[0].price },
    { label: "100ml", ml: 100, price: product.sizes[1].price },
  ];

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizes[0]);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize.ml}`,
      name: `${product.name} - ${selectedSize.label}`,
      image: product.image,
      price: selectedSize.price,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* BACK */}
        <Link
          to="/"
          className="inline-flex items-center mb-4 text-sm text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
          {/* IMAGE */}
          <Reveal variant="fade-up">
            <div className="bg-white rounded-xl border aspect-[3/4] sm:aspect-square p-2 sm:p-5 flex items-center justify-center max-h-[300px] sm:max-h-none">
              <OptimizedImage
                src={product.image}
                alt={product.name}
                priority
                aspectRatio="3/4"
                className="w-full h-full"
              />
            </div>
          </Reveal>

          {/* INFO */}
          <Reveal variant="fade-up" delay={150}>
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-xl sm:text-3xl font-bold leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground">
                {product.description}
              </p>

              {/* SIZE */}
              <div>
                <p className="text-sm font-semibold mb-2">Select Size</p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border text-sm transition ${
                        selectedSize.ml === size.ml
                          ? "bg-gold text-black border-gold"
                          : "border-muted text-muted-foreground hover:border-gold"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE */}
              <p className="text-2xl sm:text-4xl font-bold text-gold">
                ${selectedSize.price}
              </p>

              {/* CTA */}
              <Reveal variant="scale" delay={300}>
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="
                    w-full bg-gold text-black
                    py-4 sm:py-6
                    text-base sm:text-lg
                  "
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;

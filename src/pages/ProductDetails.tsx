import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

type SizeOption = {
  label: string;
  ml: number;
  price: number;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id);

  // ✅ Define available sizes
  const sizes: SizeOption[] = [
    { label: "50ml", ml: 50, price: product?.price ?? 0 },
    { label: "100ml", ml: 100, price: (product?.price ?? 0) * 1.7 },
  ];

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizes[0]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/">
            <Button>
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
      id: `${product.id}-${selectedSize.ml}`, // unique per size
      name: `${product.name} - ${selectedSize.label}`,
      image: product.image,
      price: selectedSize.price,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-white rounded-2xl p-6 border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>

            {/* Size Selector */}
            <div>
              <p className="font-semibold mb-2">Select Size</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.ml}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border font-medium transition ${
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

            {/* Price */}
            <p className="text-4xl font-bold text-gold">
              ${selectedSize.price.toFixed(2)}
            </p>

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-gold hover:bg-gold/90 text-black py-6 text-lg"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const ProductDetails = () => {
  const { id: handle } = useParams();
  const addItem = useCartStore(state => state.addItem);
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        setIsLoading(true);
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          const productData = { node: data.data.product };
          setProduct(productData);
          setSelectedVariant(data.data.product.variants.edges[0]?.node);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
    window.scrollTo(0, 0);
  }, [handle]);

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem({
        product,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity: 1,
        selectedOptions: selectedVariant.selectedOptions,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/">
            <Button className="bg-gold hover:bg-gold/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const mainImage = node.images.edges[0]?.node;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-gold transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        {/* Product Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl overflow-hidden border border-border shadow-lg aspect-square">
              {mainImage ? (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || node.title}
                  className="w-full h-full object-contain p-8"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>
            {/* Additional images */}
            <div className="grid grid-cols-4 gap-2">
              {node.images.edges.slice(1, 5).map((img, idx) => (
                <div key={idx} className="aspect-square bg-white rounded-lg overflow-hidden border border-border">
                  <img
                    src={img.node.url}
                    alt={img.node.altText || `${node.title} ${idx + 2}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-3">{node.title}</h1>
              <p className="text-foreground leading-relaxed mb-6">{node.description}</p>
              
              {node.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {node.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm border border-gold/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-gold">
                  {currency} {price.toFixed(2)}
                </span>
              </div>

              {/* Variant selector */}
              {node.variants.edges.length > 1 && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Select Option:</label>
                  <div className="flex flex-wrap gap-2">
                    {node.variants.edges.map(({ node: variant }) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.availableForSale}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedVariant?.id === variant.id
                            ? 'bg-gold text-black border-gold'
                            : variant.availableForSale
                            ? 'border-border hover:border-gold'
                            : 'border-border opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {variant.title}
                        {!variant.availableForSale && ' (Out of stock)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                disabled={!selectedVariant?.availableForSale}
                className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-6 rounded-xl text-lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;

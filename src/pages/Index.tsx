import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import RecommendedSection from "@/components/RecommendedSection";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import Footer from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

type SortOption = "best-selling" | "price-low" | "price-high" | "name";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState<"all" | "men" | "women">("all");
  const [sortBy, setSortBy] = useState<SortOption>("best-selling");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handle URL parameters
  useEffect(() => {
    const genderParam = searchParams.get("gender");
    if (genderParam === "men" || genderParam === "women") {
      setSelectedGender(genderParam);
    }
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Load products from Shopify
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = searchQuery === "" || 
        product.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.node.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
      
      switch (sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "name":
          return a.node.title.localeCompare(b.node.title);
        case "best-selling":
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <RecommendedSection />
      <FilterBar 
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <div id="products-section" className="px-4 pb-8">
        {searchQuery && (
          <div className="max-w-7xl mx-auto mb-4">
            <p className="text-muted-foreground">
              Search results for "{searchQuery}" ({filteredProducts.length} products)
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
          {isLoading ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ShopifyProductCard 
                key={product.node.id} 
                product={product}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                No products found
              </p>
              <p className="text-sm text-muted-foreground">
                Create your first product by telling me what you'd like to sell and the price!
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

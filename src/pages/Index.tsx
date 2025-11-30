import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import RecommendedSection from "@/components/RecommendedSection";
import PrivateCollectionSection from "@/components/PrivateCollectionSection";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import Footer from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

type SortOption = "best-selling" | "price-low" | "price-high" | "name";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [privateCollectionTag, setPrivateCollectionTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("best-selling");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handle URL parameters
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setSelectedTag(tagParam);
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

  // Get all unique tags from products
  const availableTags = Array.from(
    new Set(products.flatMap(product => product.node.tags))
  ).sort();

  // Filter and sort products for main section
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = searchQuery === "" || 
        product.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.node.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "all" || product.node.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
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

  // Filter products for private collection
  const privateCollectionProducts = products
    .filter((product) => {
      const matchesTag = privateCollectionTag === "all" || product.node.tags.includes(privateCollectionTag);
      return matchesTag;
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
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availableTags={availableTags}
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

      {selectedTag === "all" && (
        <>
          <PrivateCollectionSection 
            selectedTag={privateCollectionTag}
            onTagChange={setPrivateCollectionTag}
            availableTags={availableTags}
          />
          
          <div className="px-4 pb-8">
            <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
              {isLoading ? (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">Loading private collection...</p>
                </div>
              ) : privateCollectionProducts.length > 0 ? (
                privateCollectionProducts.map((product) => (
                  <ShopifyProductCard 
                    key={product.node.id} 
                    product={product}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground text-lg mb-2">
                    No products in private collection
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;

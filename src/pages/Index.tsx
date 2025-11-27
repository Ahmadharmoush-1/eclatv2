import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import RecommendedSection from "@/components/RecommendedSection";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

type SortOption = "best-selling" | "price-low" | "price-high" | "name";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState<"all" | "men" | "women">("all");
  const [sortBy, setSortBy] = useState<SortOption>("best-selling");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesGender = selectedGender === "all" || product.gender === selectedGender;
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGender && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "best-selling":
        default:
          return b.reviews - a.reviews;
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                oldPrice={product.oldPrice}
                rating={product.rating}
                reviews={product.reviews}
                discount={product.discount}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found. Try adjusting your filters.
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

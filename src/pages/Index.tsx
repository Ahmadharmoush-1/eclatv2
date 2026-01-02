import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import OfferBanner from "@/components/OfferBanner";
import Hero from "@/components/Hero";
import BenefitsBar from "@/components/BenefitsBar";
import FilterBar from "@/components/FilterBar";
import RecommendedSection from "@/components/RecommendedSection";
import PrivateCollectionSection from "@/components/PrivateCollectionSection";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

import products from "@/data/products";


const Index = () => {
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState("all");
  const [privateCollectionTag, setPrivateCollectionTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle URL params
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    const searchParam = searchParams.get("search");

    if (tagParam) setSelectedTag(tagParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);

  // Collect available tags from local products
  const availableTags = Array.from(
    new Set(products.flatMap((product) => product.tags ?? []))
  )
    .filter(tag => !["Exclusive", "Luxury", "Oud"].includes(tag))
    .sort();

  // Main products filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === "all" || product.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Private collection filter
  const privateCollectionProducts = products.filter((product) => {
    return (
      product.isPrivateCollection &&
      (privateCollectionTag === "all" ||
        product.tags?.includes(privateCollectionTag))
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />

      <Header
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        availableTags={availableTags}
      />

      <Hero />
      <BenefitsBar />
      <RecommendedSection />

      <FilterBar
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        availableTags={availableTags}
      />

      {/* PRODUCTS */}
      {/* PRODUCTS */}
<div id="products-section" className="px-4 pb-8">
  {searchQuery && (
    <div className="max-w-7xl mx-auto mb-4">
      <p className="text-muted-foreground">
        Search results for "{searchQuery}" ({filteredProducts.length})
      </p>
    </div>
  )}

  <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <div className="col-span-2 text-center py-12">
        <p className="text-muted-foreground text-lg">
          No products found
        </p>
      </div>
    )}
  </div>
</div>


      {/* PRIVATE COLLECTION */}
      {selectedTag === "all" && (
        <>
          <PrivateCollectionSection
            selectedTag={privateCollectionTag}
            onTagChange={setPrivateCollectionTag}
            availableTags={availableTags}
          />

         
        </>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

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
import HomeSection from "@/components/HomeSection";

import products from "@/data/products";
import { usePagination } from "@/hooks/usePagination";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState("all");
  const [privateCollectionTag, setPrivateCollectionTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- URL PARAMS ---------------- */
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    const searchParam = searchParams.get("search");

    if (tagParam) setSelectedTag(tagParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);

  /* ---------------- TAGS ---------------- */
  const availableTags = Array.from(
    new Set(products.flatMap((product) => product.tags ?? []))
  )
    .filter((tag) => !["Exclusive", "Luxury", "Oud"].includes(tag))
    .sort();

  /* ---------------- MAIN FILTER ---------------- */
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === "all") return matchesSearch;

    if (selectedTag === "bestsellers") {
      return matchesSearch && product.isPrivateCollection;
    }

    // men / women
    return matchesSearch && product.gender === selectedTag;
  });

  /* ---------------- PAGINATION ---------------- */
  const {
    currentItems: paginatedProducts,
    hasMore,
    loadMore,
    reset,
  } = usePagination({
    items: filteredProducts,
    itemsPerPage: 4,
  });

  // Reset pagination when filter/search changes
  useEffect(() => {
    reset();
  }, [selectedTag, searchQuery, reset]);

  /* ---------------- HOME SECTIONS ---------------- */
  const bestsellers = products
    .filter((p) => p.isPrivateCollection)
    .slice(0, 6);

  const menProducts = products
    .filter((p) => p.gender === "men")
    .slice(0, 6);

  const womenProducts = products
    .filter((p) => p.gender === "women")
    .slice(0, 6);

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

      {/* ---------------- HOME SECTIONS ---------------- */}
      <HomeSection
        title="Bestsellers"
        products={bestsellers}
        viewAllTag="bestsellers"
      />

      <HomeSection title="For Him" products={menProducts} viewAllTag="men" />

      <HomeSection title="For Her" products={womenProducts} viewAllTag="women" />

      <RecommendedSection />

      <FilterBar
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        availableTags={availableTags}
      />

      {/* ---------------- PRODUCTS GRID (PAGINATED) ---------------- */}
      <div id="products-section" className="px-4 pb-8">
        {searchQuery && (
          <div className="max-w-7xl mx-auto mb-4">
            <p className="text-muted-foreground">
              Search results for "{searchQuery}" ({filteredProducts.length})
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4} // LCP optimization
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found
              </p>
            </div>
          )}
        </div>

        {/* LOAD MORE */}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="px-6 py-2 rounded-md bg-gold text-black font-medium hover:bg-gold/90 transition"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {/* ---------------- PRIVATE COLLECTION ---------------- */}
      {selectedTag === "all" && (
        <PrivateCollectionSection
          selectedTag={privateCollectionTag}
          onTagChange={setPrivateCollectionTag}
          availableTags={availableTags}
        />
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

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
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();

  const [selectedTag, setSelectedTag] = useState("all");
  const [privateCollectionTag, setPrivateCollectionTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* URL PARAMS */
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    const searchParam = searchParams.get("search");

    if (tagParam) setSelectedTag(tagParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);

  /* TAGS */
  const availableTags = Array.from(
    new Set(products.flatMap((p) => p.tags ?? []))
  )
    .filter((tag) => !["Exclusive", "Luxury", "Oud"].includes(tag))
    .sort();

  /* FILTER */
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === "all") return matchesSearch;
    if (selectedTag === "bestsellers") {
      return matchesSearch && product.isPrivateCollection;
    }

    return matchesSearch && product.gender === selectedTag;
  });

  /* PAGINATION (SAFE FOR iOS) */
  const {
    currentItems: paginatedProducts,
    hasMore,
    loadMore,
    reset,
  } = usePagination({
    items: filteredProducts,
    itemsPerPage: 4,
  });

  useEffect(() => {
    reset();
  }, [selectedTag, searchQuery, reset]);

  /* HOME DATA */
  const bestsellers = products.filter(p => p.isPrivateCollection);
  const menProducts = products.filter(p => p.gender === "men");
  const womenProducts = products.filter(p => p.gender === "women");

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

      {/* DESKTOP-ONLY SECTIONS (CRITICAL FIX) */}
      {!isMobile && (
        <>
          <HomeSection title="Bestsellers" products={bestsellers} viewAllTag="bestsellers" />
          <HomeSection title="For Him" products={menProducts} viewAllTag="men" />
          <HomeSection title="For Her" products={womenProducts} viewAllTag="women" />
          <RecommendedSection />
        </>
      )}

      <FilterBar
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        availableTags={availableTags}
      />

      {/* PRODUCTS GRID */}
      <div id="products-section" className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
          {paginatedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="px-6 py-2 rounded-md bg-gold text-black font-medium"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {/* PRIVATE COLLECTION – DESKTOP ONLY */}
      {!isMobile && selectedTag === "all" && (
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

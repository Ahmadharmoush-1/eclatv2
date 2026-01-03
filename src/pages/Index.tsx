import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import BenefitsBar from "@/components/BenefitsBar";
import FilterBar from "@/components/FilterBar";
import HomeSection from "@/components/HomeSection";
import RecommendedSection from "@/components/RecommendedSection";
import PrivateCollectionSection from "@/components/PrivateCollectionSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

import products from "@/data/products";
import { usePagination } from "@/hooks/usePagination";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const { isMobile, isLowMemoryDevice } = useDeviceDetect();
  const [searchParams] = useSearchParams();

  const [selectedTag, setSelectedTag] = useState("all");
  const [privateCollectionTag, setPrivateCollectionTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- URL PARAMS ---------------- */
  useEffect(() => {
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    if (tag) setSelectedTag(tag);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  /* ---------------- TAGS ---------------- */
  const availableTags = Array.from(
    new Set(products.flatMap((p) => p.tags ?? []))
  ).filter((tag) => !["Exclusive", "Luxury", "Oud"].includes(tag));

  /* ---------------- FILTER ---------------- */
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

  /* ---------------- MEMORY-SAFE LIMITS ---------------- */
  const maxProductsPerSection = isLowMemoryDevice
    ? 4
    : isMobile
    ? 6
    : 8;

  /* ---------------- PAGINATION (CRITICAL) ---------------- */
  const {
    currentItems,
    hasMore,
    loadMore,
    reset,
  } = usePagination({
    items: filteredProducts,
    itemsPerPage: 4, // ALWAYS 4 on initial render
  });

  useEffect(() => {
    reset();
  }, [selectedTag, searchQuery, reset]);

  /* ---------------- HOME DATA ---------------- */
  const bestsellers = products
    .filter((p) => p.isPrivateCollection)
    .slice(0, maxProductsPerSection);

  const menProducts = products
    .filter((p) => p.gender === "men")
    .slice(0, maxProductsPerSection);

  const womenProducts = products
    .filter((p) => p.gender === "women")
    .slice(0, maxProductsPerSection);

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Eclat Parfum Beirut | Premium Fragrances</title>
        <meta
          name="description"
          content="Discover luxury perfumes for men and women. Affordable prices, premium quality, and fast delivery across Lebanon."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          availableTags={availableTags}
        />

        {/* HERO — hidden on low memory devices */}
        {!isLowMemoryDevice && <Hero />}

        {!isLowMemoryDevice && <BenefitsBar />}

        {/* Fallback header for iOS Safari */}
        {isLowMemoryDevice && (
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold text-gold">Éclat Parfum</h1>
            <p className="text-muted-foreground">Premium Fragrances</p>
          </div>
        )}

        {/* COLLECTIONS */}
        <HomeSection
          title="Bestsellers"
          products={bestsellers}
          viewAllTag="bestsellers"
        />

        {!isLowMemoryDevice && (
          <>
            <HomeSection
              title="For Him"
              products={menProducts}
              viewAllTag="men"
            />

            <HomeSection
              title="For Her"
              products={womenProducts}
              viewAllTag="women"
            />

            <RecommendedSection />
          </>
        )}

        <FilterBar
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          availableTags={availableTags}
        />

        {/* PRODUCT GRID */}
        <div id="products-section" className="px-4 pb-8">
          <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
            {currentItems.map((product, index) => (
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

        {/* PRIVATE COLLECTION */}
        {!isLowMemoryDevice && selectedTag === "all" && (
          <PrivateCollectionSection
            selectedTag={privateCollectionTag}
            onTagChange={setPrivateCollectionTag}
            availableTags={availableTags}
          />
        )}

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;

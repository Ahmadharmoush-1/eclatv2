import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import BenefitsBar from "@/components/BenefitsBar";
import HomeSection from "@/components/HomeSection";
import PrivateCollectionSection from "@/components/PrivateCollectionSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";

import products from "@/data/products";
import { usePagination } from "@/hooks/usePagination";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import ProductSearchBar from "@/components/home/ProductSearchBar";

const Index = () => {
  const { isMobile, isLowMemoryDevice, isIOS } = useDeviceDetect();
  const [searchParams] = useSearchParams();

  const [selectedTag, setSelectedTag] = useState("all");
  const [privateCollectionTag, setPrivateCollectionTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- URL PARAMS ---------------- */
  useEffect(() => {
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    setSelectedTag(tag ?? "all");
    setSearchQuery(search ?? "");
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
      return matchesSearch && product.isBestseller === true;
    }

    return matchesSearch && product.gender === selectedTag;
  });

  /* ---------------- MEMORY SAFE LIMITS ---------------- */
  const maxProductsPerSection = isLowMemoryDevice
    ? 4
    : isMobile
    ? 6
    : 8;

  /* ---------------- PAGINATION ---------------- */
  const { currentItems, hasMore, loadMore, reset } = usePagination({
    items: filteredProducts,
    itemsPerPage: 6,
  });

  useEffect(() => {
    reset();
  }, [selectedTag, searchQuery, reset]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    if (selectedTag !== "all" || searchQuery !== "") {
      setTimeout(() => {
        document
          .getElementById("products-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [selectedTag, searchQuery]);

  /* ---------------- HOME DATA ---------------- */
  const bestsellers = products
    .filter((p) => p.isBestseller === true)
    .slice(0, maxProductsPerSection);

  const menProducts = products
    .filter((p) => p.gender === "men" && !p.isPrivateCollection)
    .slice(0, maxProductsPerSection);

  const womenProducts = products
    .filter((p) => p.gender === "women" && !p.isPrivateCollection)
    .slice(0, maxProductsPerSection);

  return (
    <>
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

        <Hero isLowMemoryDevice={isLowMemoryDevice} />
        <BenefitsBar isLowMemoryDevice={isLowMemoryDevice} />

        <div className="relative z-50 isolate">
          <ProductSearchBar />
        </div>

        {/* HOME SECTIONS ONLY ON TRUE HOME */}
        {selectedTag === "all" && searchQuery === "" && (
          <>
            <HomeSection
              title="Bestsellers"
              products={bestsellers}
              viewAllTag="bestsellers"
            />

            {(!isLowMemoryDevice || isIOS) && (
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
              </>
            )}
          </>
        )}

        {/* PRODUCT GRID */}
        <div id="products-section" className="px-4 pb-8">
          {/* SEARCH SEPARATOR */}
          {searchQuery !== "" && (
            <div className="max-w-7xl mx-auto mb-6 mt-6">
              <div className="h-px bg-gold/30 w-full" />
              <p className="text-sm text-gold/70 mt-3">
                Search results for “{searchQuery}”
              </p>
            </div>
          )}

          {/* TAG TITLE */}
          {selectedTag !== "all" && (
            <div className="max-w-7xl mx-auto mb-4">
              <h2 className="text-2xl font-semibold capitalize">
                {selectedTag === "bestsellers"
                  ? "Bestsellers"
                  : selectedTag === "men"
                  ? "Men's Collection"
                  : selectedTag === "women"
                  ? "Women's Collection"
                  : selectedTag}
              </h2>
              <div className="h-1 w-16 bg-gold mt-2 rounded-full" />
            </div>
          )}

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

        {/* PRIVATE COLLECTION SECTION */}
        {selectedTag === "all" && searchQuery === "" && (
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

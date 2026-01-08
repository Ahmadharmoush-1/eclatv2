import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import products from "@/data/products";
import { usePagination } from "@/hooks/usePagination";
import { useEffect } from "react";

const PrivateCollection = () => {
  const privateProducts = products.filter(
    (p) => p.isPrivateCollection
  );

  const { currentItems, hasMore, loadMore, reset } = usePagination({
    items: privateProducts,
    itemsPerPage: 6,
  });

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <Helmet>
        <title>Private Collection | Éclat Parfum Beirut</title>
        <meta
          name="description"
          content="Discover Éclat Parfum’s exclusive private collection. Rare, luxurious, and premium fragrances."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold text-gold">
            Private Collection
          </h1>
          <div className="h-1 w-24 bg-gold mt-2 rounded-full" />
        </div>

        <div className="px-4 pb-10">
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

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default PrivateCollection;

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Product } from "@/data/products";

interface HomeSectionProps {
  title: string;
  products: Product[];
  viewAllTag: string;
}

const HomeSection = ({ title, products, viewAllTag }: HomeSectionProps) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    // 1️⃣ navigate with tag
    navigate(`/?tag=${viewAllTag}`);

    // 2️⃣ wait for render, then scroll
    setTimeout(() => {
      const section = document.getElementById("products-section");
      section?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gold">{title}</h2>

        <Button
          variant="outline"
          className="border-gold text-gold"
          onClick={handleViewAll}
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default HomeSection;

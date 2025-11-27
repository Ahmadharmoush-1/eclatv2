import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-perfume-lab.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-[400px] overflow-hidden">
      <img 
        src={heroImage} 
        alt="Perfume laboratory workspace"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 tracking-tight">
          Making Luxury Affordable
        </h2>
        <Button 
          onClick={scrollToProducts}
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105"
        >
          SHOP NOW <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;

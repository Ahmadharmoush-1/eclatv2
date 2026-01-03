import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-luxury-boutique.jpg";

interface HeroProps {
  isLowMemoryDevice?: boolean;
}

const Hero = ({ isLowMemoryDevice = false }: HeroProps) => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* IMAGE — always rendered (iOS safe) */}
      <img
        src={heroImage}
        alt="Perfume laboratory workspace"
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 flex flex-col items-center justify-center px-4 text-center">
        {/* TOP LABEL */}
        <div
          className={`flex items-center gap-2 mb-4 ${
            isLowMemoryDevice ? "" : "animate-fade-in"
          }`}
        >
          <Sparkles className="h-6 w-6 text-gold" />
          <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
            Luxury Redefined
          </span>
          <Sparkles className="h-6 w-6 text-gold" />
        </div>

        {/* TITLE */}
        <h2
          className={`text-5xl md:text-7xl font-luxury font-bold text-gold mb-2 ${
            isLowMemoryDevice ? "" : "animate-fade-in"
          }`}
        >
          Éclat Parfum
        </h2>

        <h3
          className={`text-5xl md:text-7xl font-luxury font-bold text-gold mb-6 ${
            isLowMemoryDevice ? "" : "animate-fade-in"
          }`}
        >
          BEIRUT
        </h3>

        {/* SUBTITLE */}
        <p
          className={`text-gold-light text-xl md:text-2xl mb-8 font-light tracking-wide ${
            isLowMemoryDevice ? "" : "animate-fade-in"
          }`}
        >
          Where Elegance Meets Affordability
        </p>

        {/* CTA */}
        <Button
          onClick={scrollToProducts}
          size="lg"
          className="bg-gold hover:bg-gold-light text-black font-semibold px-10 py-7 text-lg uppercase tracking-wider shadow-2xl shadow-gold/30 border-2 border-gold"
        >
          Discover Collection <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;

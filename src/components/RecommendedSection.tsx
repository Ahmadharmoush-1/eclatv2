import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecommendedSection = () => {
  return (
    <div className="px-4 py-8 bg-gradient-to-b from-black to-background">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <p className="text-xs text-gold uppercase tracking-[0.3em] font-medium">Curated For You</p>
          </div>
          <h2 className="text-3xl font-luxury font-bold text-gold">
            Featured Collection
            <div className="h-1 w-32 bg-gradient-to-r from-gold to-gold-light mt-2 rounded-full"></div>
          </h2>
        </div>
        <Button variant="ghost" className="text-gold hover:text-gold-light hover:bg-gold/10 font-semibold border border-gold/20 hover:border-gold/50">
          VIEW ALL <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendedSection;

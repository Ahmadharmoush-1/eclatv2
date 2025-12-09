import { Sparkles } from "lucide-react";

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
      </div>
    </div>
  );
};

export default RecommendedSection;

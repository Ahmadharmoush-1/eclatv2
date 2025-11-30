import { Gift, Sparkles } from "lucide-react";

const OfferBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-gold via-gold-light to-gold text-black overflow-hidden">
      {/* Animated sliding text */}
      <div className="animate-[slide-in-right_20s_linear_infinite] whitespace-nowrap py-3">
        <div className="inline-flex items-center gap-8 px-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="inline-flex items-center gap-3">
              <Gift className="h-5 w-5 text-black animate-pulse" />
              <span className="text-sm md:text-base font-black uppercase tracking-wider">
                🎁 FREE TESTER WITH EVERY ORDER
              </span>
              <Sparkles className="h-4 w-4 text-black" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;

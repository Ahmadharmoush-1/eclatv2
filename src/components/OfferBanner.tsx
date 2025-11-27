import { Gift, Sparkles } from "lucide-react";

const OfferBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-gold via-gold-light to-gold text-black overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-black rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-black rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Main offer text */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-black animate-pulse" />
            <h3 className="text-lg font-black tracking-tight text-center uppercase">
              Exclusive Luxury Offer
            </h3>
            <Sparkles className="h-5 w-5 text-black animate-pulse" />
          </div>

          {/* Offer details */}
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-5 w-5 text-black flex-shrink-0" />
              <p className="text-sm font-bold">
                Buy <span className="text-black underline">2</span> 100ml Perfumes → Get <span className="text-black underline">1 FREE</span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-5 w-5 text-black flex-shrink-0" />
              <p className="text-sm font-bold">
                Buy <span className="text-black underline">3</span> 100ml Perfumes → Get <span className="text-black underline">2 FREE</span>
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-3 text-center">
            <p className="text-xs font-semibold opacity-90">
              🎁 Choose your FREE perfumes at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;

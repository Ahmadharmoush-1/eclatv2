import { Gift, BadgeCheck, Clock, Truck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

interface BenefitsBarProps {
  isLowMemoryDevice?: boolean;
}

const BenefitsBar = ({ isLowMemoryDevice = false }: BenefitsBarProps) => {
  const benefits = [
    {
      icon: Gift,
      title: "Free Tester",
      description: "With Every Order",
      highlight: true,
    },
    {
      icon: BadgeCheck,
      title: "High Quality",
      description: "Same As Original",
    },
    {
      icon: Clock,
      title: "Long Lasting",
      description: "Premium Fragrance",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick Shipping",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            const highlightClasses = benefit.highlight
              ? isLowMemoryDevice
                ? "bg-gold/20 border-2 border-gold"
                : "bg-gold/20 border-2 border-gold animate-pulse shadow-lg shadow-gold/30"
              : isLowMemoryDevice
              ? ""
              : "hover:bg-gold/5 transition-all";

            return (
              <Reveal
                key={index}
                stagger={100}
                index={index}
                variant="fade-up"
              >
                <div
                  className={`flex flex-col items-center text-center gap-2 p-3 rounded-lg ${highlightClasses}`}
                >
                  <div
                    className={`p-3 rounded-full ${
                      benefit.highlight ? "bg-gold" : "bg-gold/20"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        benefit.highlight ? "text-black" : "text-gold"
                      }`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-bold text-sm md:text-base uppercase tracking-wide ${
                        benefit.highlight
                          ? isLowMemoryDevice
                            ? "text-gold"
                            : "text-gold animate-pulse"
                          : "text-gold"
                      }`}
                    >
                      {benefit.title}
                    </h3>

                    <p className="text-gold-light text-xs md:text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BenefitsBar;

import { Gift, BadgeCheck, Clock, Truck } from "lucide-react";

const BenefitsBar = () => {
  const benefits = [
    {
      icon: Gift,
      title: "Free Tester",
      description: "With Every Order"
    },
    {
      icon: BadgeCheck,
      title: "High Quality",
      description: "Same As Original"
    },
    {
      icon: Clock,
      title: "Long Lasting",
      description: "Premium Fragrance"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Express Shipping"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center gap-2 p-3 rounded-lg hover:bg-gold/5 transition-all"
              >
                <div className="bg-gold/20 p-3 rounded-full">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-gold text-sm md:text-base uppercase tracking-wide">
                    {benefit.title}
                  </h3>
                  <p className="text-gold-light text-xs md:text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BenefitsBar;

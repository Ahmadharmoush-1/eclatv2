import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Size {
  ml: number;
  price: number;
  oldPrice: number;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size;
  onSizeChange: (size: Size) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground">Select Size</label>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map((size) => {
          const isSelected = selectedSize.ml === size.ml;
          return (
            <button
              key={size.ml}
              onClick={() => onSizeChange(size)}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all hover:scale-105",
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card hover:border-accent/50"
              )}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{size.ml}ml</p>
                <p className="text-sm font-semibold text-price-sale mt-1">
                  ${size.price.toFixed(2)}
                </p>
                <p className="text-xs text-price-old line-through">
                  ${size.oldPrice.toFixed(2)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;

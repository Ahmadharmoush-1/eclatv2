import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterBarProps {
  selectedGender: "all" | "men" | "women";
  onGenderChange: (gender: "all" | "men" | "women") => void;
  sortBy: string;
  onSortChange: (sort: any) => void;
}

const FilterBar = ({ selectedGender, onGenderChange, sortBy, onSortChange }: FilterBarProps) => {
  const getSortLabel = () => {
    switch (sortBy) {
      case "price-low": return "Price: Low to High";
      case "price-high": return "Price: High to Low";
      case "name": return "Name";
      default: return "Best Selling";
    }
  };

  const getGenderLabel = () => {
    switch (selectedGender) {
      case "men": return "Men's";
      case "women": return "Women's";
      default: return "All";
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-6 bg-background border-y border-gold/20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default" 
            className="bg-gold text-black rounded-md px-6 py-5 font-bold hover:bg-gold-light uppercase tracking-wider"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {getGenderLabel()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-card border-gold/20">
          <DropdownMenuItem onClick={() => onGenderChange("all")} className="text-foreground hover:bg-gold/10">
            All Products
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenderChange("men")} className="text-foreground hover:bg-gold/10">
            Men's Perfumes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenderChange("women")} className="text-foreground hover:bg-gold/10">
            Women's Perfumes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="text-gold font-semibold hover:bg-gold/10 border border-gold/20"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {getSortLabel()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-card border-gold/20">
          <DropdownMenuItem onClick={() => onSortChange("best-selling")} className="text-foreground hover:bg-gold/10">
            Best Selling
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("price-low")} className="text-foreground hover:bg-gold/10">
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("price-high")} className="text-foreground hover:bg-gold/10">
            Price: High to Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("name")} className="text-foreground hover:bg-gold/10">
            Name (A-Z)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterBar;

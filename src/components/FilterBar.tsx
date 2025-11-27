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
    <div className="flex items-center justify-between px-4 py-4 bg-background">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default" 
            className="bg-primary text-primary-foreground rounded-full px-6 py-5 font-semibold hover:bg-primary/90"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {getGenderLabel()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => onGenderChange("all")}>
            All Products
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenderChange("men")}>
            Men's Perfumes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenderChange("women")}>
            Women's Perfumes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="text-foreground font-semibold hover:bg-secondary"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {getSortLabel()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onSortChange("best-selling")}>
            Best Selling
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("price-low")}>
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("price-high")}>
            Price: High to Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("name")}>
            Name (A-Z)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterBar;

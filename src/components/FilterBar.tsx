import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterBarProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
  availableTags: string[];
}

const FilterBar = ({ selectedTag, onTagChange, availableTags }: FilterBarProps) => {
  const getTagLabel = () => {
    return selectedTag === "all" ? "All Products" : selectedTag;
  };

  const openSearch = () => {
    window.dispatchEvent(new Event("open-search"));
  };

  return (
    <div className="flex items-center justify-between px-4 py-6 bg-background border-y border-gold/20 gap-3">
      
      {/* FILTER */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default" 
            className="bg-gold text-black rounded-md px-6 py-5 font-bold hover:bg-gold-light uppercase tracking-wider"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {getTagLabel()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-card border-gold/20">
          <DropdownMenuItem onClick={() => onTagChange("all")} className="hover:bg-gold/10">
            All Products
          </DropdownMenuItem>
          {availableTags.map((tag) => (
            <DropdownMenuItem 
              key={tag} 
              onClick={() => onTagChange(tag)} 
              className="hover:bg-gold/10"
            >
              {tag}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* SEARCH BUTTON */}
      <Button
        variant="outline"
        onClick={openSearch}
        className="border-gold/40 text-gold hover:bg-gold/10 px-5 py-5 font-semibold uppercase tracking-wider"
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
};

export default FilterBar;

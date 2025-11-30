import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface PrivateCollectionSectionProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
  availableTags: string[];
}

const PrivateCollectionSection = ({ 
  selectedTag, 
  onTagChange, 
  availableTags 
}: PrivateCollectionSectionProps) => {
  const getTagLabel = () => {
    if (selectedTag === "all") return "All Tags";
    return selectedTag;
  };

  return (
    <div className="px-4 py-8 bg-gradient-to-b from-background to-black">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-4 w-4 text-gold" />
            <p className="text-xs text-gold uppercase tracking-[0.3em] font-medium">Exclusive Access</p>
          </div>
          <h2 className="text-3xl font-luxury font-bold text-gold">
            Private Collection
            <div className="h-1 w-32 bg-gradient-to-r from-gold to-gold-light mt-2 rounded-full"></div>
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="text-gold hover:text-gold-light hover:bg-gold/10 font-semibold border border-gold/20 hover:border-gold/50"
            >
              {getTagLabel()} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black border-gold/20">
            <DropdownMenuItem 
              onClick={() => onTagChange("all")}
              className="text-gold hover:text-gold-light hover:bg-gold/10 cursor-pointer"
            >
              All Tags
            </DropdownMenuItem>
            {availableTags.map((tag) => (
              <DropdownMenuItem
                key={tag}
                onClick={() => onTagChange(tag)}
                className="text-gold hover:text-gold-light hover:bg-gold/10 cursor-pointer"
              >
                {tag}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PrivateCollectionSection;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Reset input when opened
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  if (!open) return null;

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/?search=${encodeURIComponent(query)}`);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="relative bg-background w-full max-w-md rounded-xl p-5 border border-gold/20">
        
        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-gold"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Input */}
        <div className="flex gap-2">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search perfumes..."
            className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <Button
            onClick={handleSearch}
            className="bg-gold text-black hover:bg-gold/90"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;

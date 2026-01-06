import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Reveal from "@/components/ui/Reveal";
import products from "@/data/products";

const ProductSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  /* ---------------- SEARCH SUBMIT ---------------- */
  const handleSearch = (query?: string) => {
    const finalQuery = query ?? searchQuery;
    if (!finalQuery.trim()) return;

    navigate(`/?search=${encodeURIComponent(finalQuery.trim())}`);

    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 120);

    setSearchQuery("");
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  /* ---------------- SUGGESTIONS ---------------- */
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 6);
  }, [searchQuery]);

  /* ---------------- UX HELPERS ---------------- */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  }, [searchQuery]);

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <Reveal variant="fade-up">
      <div className="flex justify-center py-6 md:py-8">
        <div className="w-full max-w-md px-4 relative">
          {isExpanded ? (
            <div className="relative">
              {/* INPUT */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search perfumes..."
                    className="pl-10 h-11 bg-card"
                    autoFocus
                  />
                </div>

                <Button type="submit" size="sm" className="h-11">
                  Search
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="h-11 w-11"
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>

              {/* SUGGESTIONS */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-card border rounded-lg shadow-lg overflow-hidden">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSearch(product.name)}
                      className="w-full text-left px-4 py-3 hover:bg-muted flex gap-3 items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.gender === "men"
                            ? "For Him"
                            : product.gender === "women"
                            ? "For Her"
                            : "Bestseller"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={toggleSearch}
              variant="secondary"
              className="w-full h-11 gap-2"
            >
              <Search className="h-4 w-4" />
              Search All Products
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default ProductSearchBar;

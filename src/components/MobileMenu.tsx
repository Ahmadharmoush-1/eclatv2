import { Home, Mail, HelpCircle, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTag?: string;
  onTagChange?: (tag: string) => void;
  availableTags?: string[];
}

const MobileMenu = ({ open, onOpenChange, selectedTag = "all", onTagChange, availableTags = [] }: MobileMenuProps) => {
  const mainMenuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: HelpCircle, label: "FAQ", path: "/faq" },
    { icon: Mail, label: "Contact", path: "/contact" },
  ];

  const handleTagClick = (tag: string) => {
    onTagChange?.(tag);
    onOpenChange(false);
    // Scroll to products section
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-luxury font-bold text-gold">Menu</SheetTitle>
        </SheetHeader>

        <nav className="space-y-2">
          {mainMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-gold/10 transition-colors border border-gold/20"
            >
              <item.icon className="h-5 w-5 text-gold" />
              <span className="font-semibold text-foreground">{item.label}</span>
            </Link>
          ))}
        </nav>

        {availableTags.length > 0 && (
          <>
            <Separator className="my-6 bg-gold/20" />
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-gold" />
                <h3 className="font-bold text-gold uppercase tracking-wide text-sm">Filter by Category</h3>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleTagClick("all")}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedTag === "all" 
                      ? "bg-gold text-black font-bold" 
                      : "bg-gold/10 hover:bg-gold/20 text-foreground"
                  }`}
                >
                  All Products
                </button>
                
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedTag === tag 
                        ? "bg-gold text-black font-bold" 
                        : "bg-gold/10 hover:bg-gold/20 text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator className="my-6 bg-gold/20" />

        <div className="mt-6">
          <p className="text-sm text-gold-light mb-4">
            Making Luxury Affordable
          </p>
          <p className="text-xs text-muted-foreground">
            © 2012 Éclat Parfum Beirut
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

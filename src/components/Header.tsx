import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyCartDrawer } from "./ShopifyCartDrawer";
import MobileMenu from "./MobileMenu";
import SearchDialog from "./SearchDialog";
import logo from "@/assets/eclat-logo.png";

interface HeaderProps {
  selectedTag?: string;
  onTagChange?: (tag: string) => void;
  availableTags?: string[];
}

const Header = ({ selectedTag = "all", onTagChange, availableTags = [] }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gold/10 text-gold hover:text-gold"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Éclat Parfum Beirut" 
              className="h-16 object-contain"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-gold/10 text-gold hover:text-gold"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <ShopifyCartDrawer />
          </div>
        </div>
      </header>
      
      <MobileMenu 
        open={menuOpen} 
        onOpenChange={setMenuOpen}
        selectedTag={selectedTag}
        onTagChange={onTagChange}
        availableTags={availableTags}
      />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;

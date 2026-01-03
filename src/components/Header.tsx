import { useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";
import SearchDialog from "./SearchDialog";
import logo from "@/assets/eclat-logo.png";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

interface HeaderProps {
  selectedTag?: string;
  onTagChange?: (tag: string) => void;
  availableTags?: string[];
}

const Header = ({
  selectedTag = "all",
  onTagChange,
  availableTags = [],
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { totalItems } = useCart();

  useEffect(() => {
    const openSearch = () => setSearchOpen(true);
    window.addEventListener("open-search", openSearch);
    return () => window.removeEventListener("open-search", openSearch);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          
          {/* Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gold/10 text-gold"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Éclat Parfum Beirut"
              className="h-24 object-contain"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gold/10 text-gold"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gold/10 text-gold"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Drawers */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      <MobileMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        selectedTag={selectedTag}
        onTagChange={onTagChange}
      />

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;

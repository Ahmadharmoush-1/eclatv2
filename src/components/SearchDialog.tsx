import ProductSearchBar from "@/components/home/ProductSearchBar";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center px-4 pt-24"
      onClick={() => onOpenChange(false)}
    >
      {/* STOP CLICK PROPAGATION */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        {/* SAME SEARCH COMPONENT USED EVERYWHERE */}
        <ProductSearchBar autoOpen />
      </div>
    </div>
  );
};

export default SearchDialog;

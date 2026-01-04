import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: "square" | "4/3" | "3/4" | "16/9";
}

const OptimizedImage = ({
  src,
  alt,
  priority = false,
  aspectRatio = "square",
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    square: "aspect-square",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "16/9": "aspect-video",
  };

  return (
    <div className={cn("relative overflow-hidden bg-muted", aspectClasses[aspectRatio], className)}>
      {!isLoaded && <div className="absolute inset-0 bg-gradient-to-br from-muted to-card" />}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
  "h-full w-full transition-all duration-300 scale-[1.05]",
  isLoaded ? "opacity-100" : "opacity-0"
)}
       style={{ objectFit: 'cover' }}

        {...props}
      />
    </div>
  );
};

export default OptimizedImage;

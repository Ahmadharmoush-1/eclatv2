import { useState, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: 'square' | '4/3' | '3/4' | '16/9';
  placeholderColor?: string;
}

const OptimizedImage = ({
  src,
  alt,
  priority = false,
  aspectRatio = 'square',
  className,
  placeholderColor,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/4': 'aspect-[3/4]',
    '16/9': 'aspect-video',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted',
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-muted to-card"
          style={placeholderColor ? { backgroundColor: placeholderColor } : undefined}
        />
      )}

      {/* Image — ALWAYS PRESENT */}
      <img
  src={src}
  alt={alt}
  loading={priority ? "eager" : "lazy"}
  decoding="async"
  onLoad={() => setIsLoaded(true)}
  className={`h-full w-full transition-opacity duration-300 ${
    isLoaded ? "opacity-100" : "opacity-0"
  }`}
  style={{
    objectFit: "cover",
    objectPosition: "center bottom",
  }}
/>

    </div>
  );
};

export default OptimizedImage;

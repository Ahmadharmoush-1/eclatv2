import { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';
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
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  const aspectClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/4': 'aspect-[3/4]',
    '16/9': 'aspect-video',
  };

  useEffect(() => {
    // Always render immediately on mobile
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      setIsInView(true);
      return;
    }

    if (priority) {
      setIsInView(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '400px',
        threshold: 0,
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
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

      {/* Image — ALWAYS MOUNTED */}
      <img
        src={isInView ? src : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'h-full w-full transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          objectFit: 'cover',
          objectPosition: 'center bottom',
        }}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;

import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'scale' | 'slide-up';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  stagger?: number;
  index?: number;
}

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getInitialStyles = (variant: RevealVariant): CSSProperties => {
  if (prefersReducedMotion()) {
    return { opacity: 1 };
  }

  const base: CSSProperties = { opacity: 0 };
  
  switch (variant) {
    case 'fade-up':
      return { ...base, transform: 'translateY(24px)' };
    case 'fade-down':
      return { ...base, transform: 'translateY(-24px)' };
    case 'fade-left':
      return { ...base, transform: 'translateX(-24px)' };
    case 'fade-right':
      return { ...base, transform: 'translateX(24px)' };
    case 'scale':
      return { ...base, transform: 'scale(0.95)' };
    case 'slide-up':
      return { ...base, transform: 'translateY(40px)' };
    case 'fade':
    default:
      return base;
  }
};

const getVisibleStyles = (): CSSProperties => ({
  opacity: 1,
  transform: 'translateY(0) translateX(0) scale(1)',
});

const Reveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 500,
  className = '',
  once = true,
  threshold = 0.1,
  stagger = 0,
  index = 0,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // If reduced motion is preferred, show immediately
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.unobserve(element);
          }
        } else if (!once && !hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, threshold, hasAnimated]);

  const totalDelay = delay + (stagger * index);
  
  const style: CSSProperties = {
    ...(isVisible ? getVisibleStyles() : getInitialStyles(variant)),
    transition: prefersReducedMotion() 
      ? 'none' 
      : `opacity ${duration}ms ease-out ${totalDelay}ms, transform ${duration}ms ease-out ${totalDelay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default Reveal;
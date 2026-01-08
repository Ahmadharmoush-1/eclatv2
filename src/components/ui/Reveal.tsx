import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "slide-up";

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

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getInitialStyles = (variant: RevealVariant): CSSProperties => {
  if (prefersReducedMotion()) return { opacity: 1 };

  const base: CSSProperties = { opacity: 0 };

  switch (variant) {
    case "fade-up":
      return { ...base, transform: "translateY(24px)" };
    case "fade-down":
      return { ...base, transform: "translateY(-24px)" };
    case "fade-left":
      return { ...base, transform: "translateX(-24px)" };
    case "fade-right":
      return { ...base, transform: "translateX(24px)" };
    case "scale":
      return { ...base, transform: "scale(0.95)" };
    case "slide-up":
      return { ...base, transform: "translateY(40px)" };
    default:
      return base;
  }
};

const getVisibleStyles = (): CSSProperties => ({
  opacity: 1,
  transform: "none",
});

const Reveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 500,
  className = "",
  once = true,
  threshold = 0.1,
  stagger = 0,
  index = 0,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const totalDelay = delay + stagger * index;

  const style: CSSProperties = {
    ...(isVisible ? getVisibleStyles() : getInitialStyles(variant)),
    transition: prefersReducedMotion()
      ? "none"
      : `opacity ${duration}ms ease-out ${totalDelay}ms,
         transform ${duration}ms ease-out ${totalDelay}ms`,
    willChange: "opacity, transform",

    /* 🔥 KEY FIX */
    position: "relative",
    zIndex: 0,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default Reveal;

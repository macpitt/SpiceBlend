
import { useEffect, useRef, type ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface VirtualizedProps {
  children: ReactNode;
  onIntersect?: () => void;
}

export function Virtualized({ children, onIntersect }: VirtualizedProps): JSX.Element {
  const hasIntersected = useRef(false);
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '100px', // Start loading a bit before the element comes into view
    root: null, // Use viewport as root
  });

  useEffect(() => {
    if (isIntersecting && !hasIntersected.current && onIntersect) {
      hasIntersected.current = true;
      onIntersect();
    }
  }, [isIntersecting, onIntersect]);

  return (
    <div ref={ref} className="min-h-[100px]">
      {children}
    </div>
  );
}

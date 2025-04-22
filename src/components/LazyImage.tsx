
import { type ImgHTMLAttributes } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function LazyImage({ src, alt, className, fallback, ...props }: LazyImageProps): JSX.Element {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLImageElement>();

  return (
    <img
      ref={ref}
      src={isIntersecting ? src : fallback}
      alt={alt}
      className={cn('transition-opacity duration-300', className)}
      {...props}
    />
  );
}

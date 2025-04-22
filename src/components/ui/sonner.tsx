
import { useSyncExternalStore } from "react";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps } from "sonner";

const subscribe = (callback: (matches: boolean) => void) => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', () => callback(media.matches));
  return () => media.removeEventListener('change', () => callback(media.matches));
};

const Toaster = ({ ...props }: ToasterProps) => {
  const isDark = useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    () => false
  );

  return (
    <Sonner
      theme={isDark ? 'dark' : 'light'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        duration: 3000
      }}
      {...props}
    />
  );
};

export { Toaster };

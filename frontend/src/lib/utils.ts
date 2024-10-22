import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSystemTheme = (): 'light' | 'dark' => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = () => {
    return mediaQuery.matches ? 'dark' : 'light';
  };

  if (mediaQuery) {
    mediaQuery.addEventListener('change', handleThemeChange);
  }
  return 'light';
};


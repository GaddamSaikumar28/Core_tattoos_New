import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This single function safely merges all your Tailwind classes!
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
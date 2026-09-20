import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    const cr = (price / 10000000).toFixed(2);
    return `₹${cr.replace(/\.00$/, "")} Cr`;
  } else if (price >= 100000) {
    const l = (price / 100000).toFixed(1);
    return `₹${l.replace(/\.0$/, "")} Lakh`;
  } else {
    return `₹${price.toLocaleString("en-IN")}`;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

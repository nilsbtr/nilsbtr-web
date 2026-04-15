import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const LOCALHOST_URL = "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL?.trim() || LOCALHOST_URL).replace(/\/$/, "");
}

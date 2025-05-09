import { openUrl } from "@tauri-apps/plugin-opener";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleLinkClick = async (url: string) => {
  try {
    await openUrl(url);
  } catch (error) {
    console.error("Failed to open URL:", error);
  }
};

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toFormData(data: object) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, JSON.stringify(value));
  });
  return formData;
}
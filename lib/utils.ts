import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { techMap } from "@/constants/tacMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDivIconClassName = (techName : string) => {
  const normalaizedTechName = techName.replace(/[.]/g,"").toLowerCase();
  return techMap[normalaizedTechName]
    ? `${techMap[normalaizedTechName]} colored`
    : "devicon-devicon-plain";
}    
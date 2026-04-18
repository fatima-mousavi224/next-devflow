import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { techMap } from "@/constants/tacMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDivIconClassName = (techName: string) => {
  const normalaizedTechName = techName.replace(/[.]/g, "").toLowerCase();
  return techMap[normalaizedTechName]
    ? `${techMap[normalaizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getTimeStamp = (input: Date | string | number): string => {
  // Convert input to Date
  const date = new Date(input);

  // 🛑 Invalid date protection
  if (isNaN(date.getTime())) {
    return "invalid date";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 🟢 Just now
  if (diffInSeconds < 5) return "just now";

  const intervals: { label: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const interval of intervals) {
    const value = Math.floor(diffInSeconds / interval.seconds);
    if (value >= 1) {
      return rtf.format(-value, interval.label);
    }
  }

  return "just now";
};
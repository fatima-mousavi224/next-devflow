import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { techMap } from "@/constants/tacMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechDescription(techName: string): string {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  // Mapping technology names to descriptions
  const techDescriptionMap: { [key: string]: string } = {
    javascript:
      "JavaScript is a powerful language for building dynamic, interactive, and modern web applications.",
    typescript:
      "TypeScript adds strong typing to JavaScript, making it great for scalable and maintainable applications.",
    react:
      "React is a popular library for building fast, component-based user interfaces and web applications.",
    nextjs:
      "Next.js is a React framework for building fast, SEO-friendly, and production-grade web applications.",
    nodejs:
      "Node.js is a runtime for building fast and scalable server-side applications using JavaScript.",
    python:
      "Python is a beginner-friendly language known for its versatility and simplicity in various fields.",
    java: "Java is a versatile, cross-platform language widely used in enterprise and Android development.",
    "c++":
      "C++ is a high-performance language ideal for system programming, games, and large-scale applications.",
    git: "Git is a version control system that helps developers track changes and collaborate on code efficiently.",
    docker:
      "Docker simplifies app deployment by containerizing environments, ensuring consistency across platforms.",
    mongodb:
      "MongoDB is a flexible NoSQL database ideal for handling unstructured data and scalable applications.",
    mysql:
      "MySQL is a popular open-source relational database management system known for its stability and performance.",
    postgresql:
      "PostgreSQL is a powerful open-source SQL database known for its scalability and robustness.",
    aws: "Amazon Web Services (AWS) is a cloud computing platform that offers a wide range of services for building, deploying, and managing web and mobile applications.",
  };

  return (
    techDescriptionMap[normalizedTech] ||
    `${techName} is a technology or tool widely used in software development, providing valuable features and capabilities.`
  );
}

export const getDivIconClassName = (techName: string) => {
  const normalaizedTechName = techName.replace(/[.]/g, "").toLowerCase();
  return techMap[normalaizedTechName]
    ? `${techMap[normalaizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getTimeStamp = (createdAt: Date)=> {
  // Convert input to Date
  const date = new Date(createdAt);

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
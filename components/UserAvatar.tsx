import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Fallback } from "next/dist/client/components/segment-cache/cache-map";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string; 
  fallbackClassName?: string// ✅ optional now
}

function UserAvatar({
  id,
  name,
  imageUrl,
  className = "h-9 w-9",
  
}: Props) {

  // ✅ fix initials (words not letters)
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={36}
            height={36}
            className="object-cover rounded-full"
          />
        ) : (
          <AvatarFallback className={cn("primary-gradient font-space-grotesk font-bold tracking-wider text-white", fallbackClassName)}>
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}

export default UserAvatar;
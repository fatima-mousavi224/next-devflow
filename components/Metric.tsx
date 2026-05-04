import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
  imageStyles?: string;
  titleStyles?: string
}

function Metric({
  imgUrl,
  value,
  title,
  href,
  textStyles,
  alt,
  isAuthor,
  imageStyles,
  titleStyles
}: Props) {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        className={`rounded-full object-contain ${imageStyles}`}
        width={18}
        height={18}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        {title ? (
          <span
            className={cn(`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`, titleStyles)}
          >
            {title}
          </span>
        ) : null}
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div>{metricContent}</div>
  );
}

export default Metric;

// import ROUTES from "@/constants/routes";
// import Link from "next/link";
// import { Badge } from "../ui/badge";
// import { getDivIconClassName } from "@/lib/utils";
// import Image from "next/image";

// interface Props {
//   _id: string;
//   name: string;
//   questions?: number;
//   showCount?: boolean;
//   compact?: boolean;
//   remove?: boolean;
//   isButton?: boolean;
//   handelRemov?: () => void;
// }

// const TagCard = ({
//   _id,
//   name,
//   questions,
//   showCount,
//   compact,
//   remove,
//   isButton,
//   handelRemov,
// }: Props) => {
//   const handelClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//   }
//   const iconClassName = getDivIconClassName(name);
//   const Content = (
//     <>
//       <Badge className="flex flex-row gap-2 subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2">
//         <div className="flex-center space-x-2">
//           <i className={`${iconClassName} text-sm`}></i>
//           <span>{name}</span>
//         </div>
//         {remove && (
//           <Image src="/icons/close.svg" width={12} height={12} alt="close icon" className="cursor-pointer object-contain invert-0 dark:invert" onClick={handelRemove} />
//         )}
//       </Badge>
//       {showCount && (
//         <p className="small-medium text-dark500_light500">{questions}</p>
//       )}
//     </>
//   );

//   if(compact) {
//     return isButton ? (
//       <button onClick={handelClick} className="flex justify-between gap-2">{Content}</button>
//     ) : (
//       <Link href={ROUTES.Tags(_id)} className="flex justify-between gap-2">{Content}</Link>
//     )
//   }
// };

// export default TagCard;

"use client";

import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn, getDivIconClassName, getTechDescription } from "@/lib/utils";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void; // ✅ fixed name
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const iconClassName = getDivIconClassName(name);
  const iconDescription = getTechDescription(name);
  const Content = (
    <>
      <Badge className="flex flex-row gap-2 subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2">
        <div className="flex-center space-x-2">
          <i className={`${iconClassName} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove} // ✅ fixed
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light500">{questions}</p>
      )}
    </>
  );

  // ✅ compact mode
  if (compact) {
    return isButton ? (
      <button
        type="button" // ✅ important
        onClick={handleClick}
        className="flex justify-between gap-2"
      >
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
      {Content}
    </Link>
  );

  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-65">
        <div className="flex items-center justify-between gap-3 ">
          <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5 ">
            <p className="paragraph-semibold text-dark300_light900 ">{name}</p>
          </div>
          <i className={cn(iconClassName, "text-2xl")} aria-hidden="true" />
        </div>
        <p className="small-regular text-dark500_light700 mt-5 line-clamp-3 w-full ">
          {iconDescription}
        </p>
        <p className="small-medium text-dark400_light500 mt-3.5 ">
          <span className="body-semibold primary-text-gradient mr-2.5 ">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;

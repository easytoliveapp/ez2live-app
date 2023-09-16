import { _getTagNameRd } from "@/contains/fakeData";
import Link from "next/link";
import React, { FC } from "react";

export interface TagProps {
  className?: string;
  hideCount?: boolean;
}

const Tag: FC<TagProps> = ({ className = "", hideCount = false }) => {
  // DEMO DATA
  return (
    <Link
      className={`nc-Tag inline-block bg-white text-sm text-neutral-600  py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4   hover:border-neutral-200${className}`}
      data-nc-id="Tag"
      href={"/"}
    >
      {`${_getTagNameRd()}`}
      {!hideCount && <span className="text-xs font-normal"> (22)</span>}
    </Link>
  );
};

export default Tag;

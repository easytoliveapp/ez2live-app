import { CustomLink } from "@/data/types";
import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";

export interface PaginationProps {
  className?: string;
  totalPages?: number;
  currentPage?: number;
  totalItems?: number;
  handleOnClick: (index: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  totalPages = 1,
  currentPage = 1,
  totalItems = 1,
  handleOnClick,
}) => {
  const renderItem = (index: number) => {
    if (index + 1 === currentPage) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-main text-white ${twFocusClass()}`}
        >
          {index}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000     ${twFocusClass()}`}
        href="#"
        onClick={() => handleOnClick(index + 1)}
      >
        {index}
      </Link>
    );
  };

  return (
    <nav
      className={`mx-auto w-full text-center justify-center flex py-5 mt-5 nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {totalPages > 1 && (
        <>{[...Array(totalPages)].map((_, idx) => renderItem(idx))}</>
      )}
    </nav>
  );
};

export default Pagination;

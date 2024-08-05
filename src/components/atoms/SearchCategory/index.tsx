"use client";
import React, { FC } from "react";
import { Input } from "@/components";
import Image from "next/image";
import Search from "@/images/easytolive/icons/search.svg";

interface SearchCategoryProps {
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  onSubmit?: (e: any) => void;
  value?: string | number | readonly string[];
  isLoading?: boolean;
}

const SearchCategory: FC<SearchCategoryProps> = ({
  value,
  onChange,
  onClick,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <div className="w-full flex gap-4">
      <div className="w-full bg-white h-fit p-6 rounded-2xl flex items-center">
        <Image
          src={"/lupa.svg"}
          width={25}
          height={25}
          alt={"Lupa"}
          className="mr-4"
        />
        <p className="text-[#383839]/40">Buscar desconto ou parceiro</p>
      </div>
      <div className="bg-main-purple px-14 py-4 flex items-center rounded-2xl">
        <p className="text-white font-bold text-xl">BUSCAR</p>
      </div>
    </div>
  );
};

export default SearchCategory;

import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import classNames from "@/utils/classNames";

export interface ICategorieProps {
  active: boolean;
  title: string;
  id: string;
}

export interface ICategoryProps {
  image: string | StaticImageData;
  isActive: boolean;
  name: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CategoryCard: FC<ICategoryProps> = ({
  image,
  isActive,
  name,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "bg-white border-2 focus:border-secondary-main active:shadow-sm rounded-lg p-1 py-2 w-20 min-w-[80px] flex flex-col gap-1 items-center cursor-pointer",
        isActive ? "border-secondary-main" : "border-transparent",
      )}
      onClick={onClick}
    >
      <Image className="w-8 h-auto" src={image} alt="Category Image" />
      <p className="text-[10px] font-semibold">{name}</p>
    </div>
  );
};

export default CategoryCard;

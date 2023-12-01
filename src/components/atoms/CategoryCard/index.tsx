import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import classNames from "@/utils/classNames";
import AestheticsImage from "@/images/easytolive/categories/estetica.svg";
import NutritionImage from "@/images/easytolive/categories/nutricao.svg";
import SupplementsImage from "@/images/easytolive/categories/suplementos.svg";
import RestaurantsImage from "@/images/easytolive/categories/restaurantes.svg";

export interface ICategorieProps {
  active: boolean;
  title: string;
  id: string;
}

interface ICategoryProps {
  image: string | StaticImageData;
  isActive: boolean;
  name: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const categoryImages = new Map([
  ["Restaurantes", RestaurantsImage],
  ["Suplementos", SupplementsImage],
  ["Estética", AestheticsImage],
  ["Nutrição", NutritionImage],
]);

const CategoryCard: FC<ICategoryProps> = ({ isActive, name, onClick }) => {
  const imageSource = categoryImages.get(name);
  const altText = `Category Image - ${name}`;

  return (
    <div
      className={classNames(
        "bg-white border-2 focus:border-secondary-main active:shadow-sm rounded-lg p-1 py-2 min-w-[80px] w-full flex flex-col gap-1 items-center cursor-pointer",
        isActive ? "border-secondary-main" : "border-transparent",
      )}
      onClick={onClick}
    >
      <Image className="w-8 h-8" src={imageSource || ""} alt={altText} />
      <p className="text-[10px] font-semibold">{name}</p>
    </div>
  );
};

export default CategoryCard;

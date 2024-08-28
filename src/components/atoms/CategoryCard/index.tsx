import React, { FC } from "react";
import Image from "next/image";
import classNames from "@/utils/classNames";
import { CATEGORIES } from "@/constants/categories";

export interface ICategorieProps {
	active: boolean;
	title: string;
	id: string;
}

interface ICategoryProps {
	image: string;
	id: string;
	isActive: boolean;
	name: string;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CategoryCard: FC<ICategoryProps> = ({ isActive, name, onClick, id }) => {
	const { image, altImage } = CATEGORIES[id as keyof typeof CATEGORIES] || {
		image: "",
	};

	return (
		<div
			className={classNames(
				"bg-white border-2 focus:border-secondary-main active:shadow-sm rounded-lg p-1 py-2 min-w-[80px] w-full flex flex-col gap-1 items-center cursor-pointer",
				isActive ? "border-secondary-main" : "border-transparent",
			)}
			onClick={onClick}
		>
			{image && <Image className="w-8 h-8" src={image} alt={altImage} />}
			<p className="text-[10px] font-semibold">{name}</p>
		</div>
	);
};

export default CategoryCard;

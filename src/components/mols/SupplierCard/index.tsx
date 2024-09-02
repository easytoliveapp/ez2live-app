"use client";

import React, { FC } from "react";
import { Avaliation, CouponsAvaible } from "@/components";
import Image from "next/image";
import ArrowRight from "@/images/easytolive/icons/arrow-next-right-black.svg";
import { useRouter } from "next/navigation";

interface SupplierCardProps {
	minimalSupplierCard?: boolean;
	couponsAvailableCount: number;
	supplierCategory: string;
	supplierImage: string;
	name: string;
	rating?: string;
	id: string;
	saveLastPagePosition: () => void;
}

const SupplierCard: FC<SupplierCardProps> = ({
	minimalSupplierCard = false,
	couponsAvailableCount,
	supplierCategory,
	name,
	supplierImage,
	rating,
	id,
	saveLastPagePosition,
}) => {
	const router = useRouter();

	function handleClick(e: string) {
		saveLastPagePosition?.();
		router.push(`/app/parceiro/${e}`);
	}

	if (minimalSupplierCard) {
		return (
			<div
				className="w-full h-full gap-2 mr-2 cursor-pointer flex items-center justify-center"
				onClick={() => handleClick(id)}
			>
				<div className="flex flex-col items-center justify-between w-14 h-full">
					<Image
						width={80}
						height={80}
						className="rounded-full max-h-14"
						alt="Supplier-logo"
						src={supplierImage}
					/>

					<p className="text-center overflow-hidden ">{name}</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className="w-full h-auto rounded-lg p-3 grid grid-cols-5 gap-2 bg-generic-backgroundLigther cursor-pointer"
			onClick={() => handleClick(id)}
		>
			<div className="col-span-1 flex items-center justify-center w-14 h-auto">
				<Image
					width={80}
					height={80}
					className="rounded-full max-h-14"
					alt="Supplier-logo"
					src={supplierImage}
				/>
			</div>
			<div className="col-span-3 max-sm:pl-5 h-auto w-auto grid-rows-3 gap-3">
				<p className="font-medium whitespace-nowrap text-ellipsis text-base overflow-hidden">
					{name}
				</p>
				<p className="text-xs pb-1 font-medium text-primary-main">
					{supplierCategory}
				</p>
				<CouponsAvaible couponsAvailableCount={couponsAvailableCount} />
			</div>
			<div className=" col-span-1 relative">
				<Avaliation rating={rating} />
				<button className="w-auto h-6 absolute right-0 bottom-2">
					<Image className="w-auto h-6" alt="Next Button" src={ArrowRight} />
				</button>
			</div>
		</div>
	);
};

export default SupplierCard;

"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import classNames from "classnames";

import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import ShoppingCartGreen from "@/images/easytolive/icons/shopping_cart_green.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import getExpirateTime from "@/utils/getExpirateTime";
import { getColorByDiscountValue } from "@/utils/getColorByDiscountValue";

import cx from "classnames";
import { getDateFormater } from "@/utils/getDateFormater";
import { getCouponsRemaining } from "@/utils/getCouponsRemaining";
import {
	InformationCircleIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/solid";

interface ICouponCardProps {
	isOwnSupplier?: boolean;
	discount: string;
	couponTitle: string;
	remainingUnits?: number;
	activationDate?: string;
	expirationUseDate?: string;
	mainImage?: string | StaticImageData;
	icon: string | StaticImageData;
	setShowCouponModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponCard: React.FC<ICouponCardProps> = ({
	isOwnSupplier,
	discount,
	couponTitle,
	remainingUnits,
	activationDate,
	expirationUseDate,
	mainImage,
	icon,
	setShowCouponModal,
}) => {
	return (
		<div
			onClick={() => setShowCouponModal && setShowCouponModal(true)}
			className="h-auto  rounded-2xl flex items-center justify-between gap-2 cursor-pointer bg-gradient-to-r from-[#CCEF16] to-[#B0CB04]"
		>
			<div className="w-[25%] lg:w-[15%] flex items-center flex-col">
				<h2 className="text-white font-semibold text-4xl drop-shadow-sm">
					{discount}%
				</h2>
				<p className="text-white text-4xl">OFF</p>
			</div>
			<div
				className={classNames(
					"rounded-2xl px-4 py-6 bg-white w-[75%] lg:w-[85%] hover:w-[70%] lg:hover:w-[80%] transition-all gap-1 -m-[1px] bg-primary hover:shadow-md",
				)}
			>
				<div className="rounded-full flex items-center gap-3 pr-4 pl-3 w-full">
					<div className="flex-auto">
						<div className="flex items-center justify-between gap-3">
							<div className="flex flex-col sm:gap-0.5 text-[10px] sm:text-xs">
								<p className="text-xl font-bold text-black">{couponTitle}</p>
								{remainingUnits !== undefined && !isNaN(remainingUnits) && (
									<p className="flex  items-center text-black">
										<ShoppingCartIcon className="w-6 mr-2" />
										{getCouponsRemaining(remainingUnits, isOwnSupplier)}
									</p>
								)}
								{activationDate && (
									<p className="flex font-semibold items-center text-generic-alertGreen">
										utilizado em {getDateFormater(activationDate)}
									</p>
								)}
								{expirationUseDate && (
									<p className="flex items-center text-[#a6a6a6]">
										<InformationCircleIcon className="w-6 mr-2" />
										{getExpirateTime(expirationUseDate)}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CouponCard;

import React from "react";
import Image, { StaticImageData } from "next/image";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import { AccordionInfo } from "@/components/atoms";
import useDateFormater from "@/hooks/useDateFormater";
import getDateDiffInDays from "@/utils/getDiffInDays";

interface CouponProps {
  id: string;
  couponTitle: string;
  unintsAmount: number;
  expirateTime: string;
  supplierLogo: string | StaticImageData;
  supplierName: string;
  couponDiscount: string;
  supplierCategory: string;
}

const CouponContent: React.FC<CouponProps> = ({
  unintsAmount,
  couponDiscount,
  expirateTime,
  supplierLogo,
  supplierName,
  supplierCategory,
  couponTitle,
}) => {
  return (
    <div className="flex flex-col p-2 w-full pb-20 text-black">
      <h1 className=" text-2xl py-1 px-3 mb-6 font-bold text-black">
        {couponTitle}
      </h1>
      <div className="flex mb-8 gap-4 justify-between">
        <div className="flex flex-col gap-1.5 text-sm">
          <p className="flex font-semibold items-center text-generic-alertGreen">
            <Image
              className="h-5 pr-2 w-auto"
              alt="coupon-green"
              src={CouponGreen}
              color="white"
            />
            faltam {unintsAmount} unidades
          </p>
          <p className="flex font-semibold items-center text-generic-alertRed">
            <Image
              className="h-4 pr-2 w-auto"
              alt="coupon-black"
              src={ClockCircleRed}
            />
            termina em {getDateDiffInDays(expirateTime)} dias
          </p>
        </div>
        <span className="relative text-3xl font-medium w-32 h-16 text-white bg-primary-main flex items-center justify-center px-6 rounded-full">
          {couponDiscount}%
          <span className="absolute z-50 -top-7 -left-7 w-14 h-14 rounded-full bg-gradient-to-r from-secondary-dark to-secondary-lighter"></span>
        </span>
      </div>
      <hr className="border-neutral-100 border-[1.5px] mb-6"></hr>
      <div className="flex flex-col m-1 h-auto">
        <div className="flex gap-3 item-center">
          <Image
            className="w-14 h-14 rounded-full"
            src={supplierLogo}
            alt="supplier-logo"
          />
          <div className="m-1 px-1">
            <p className=" font-semibold">estabelecimento</p>
            <p className=" text-lg">{supplierName}</p>
          </div>
        </div>
        <div className="flex flex-col mx-2 gap-5 my-3">
          <div className="flex flex-col">
            <p className="font-semibold">categoria</p>
            <p className="mb-4">{supplierCategory}</p>
            <p className="font-semibold">validade</p>
            <p>{useDateFormater(expirateTime)}</p>
          </div>
        </div>
        <AccordionInfo
          data={[
            {
              name: "Regras de uso",
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, dolorem. Quae debitis hic ipsum inventore assumenda laborum reprehenderit, asperiores nostrum, molestiae odio excepturi maiores possimus ad cum quia et doloremque?",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CouponContent;
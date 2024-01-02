"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { AccordionInfo } from "@/components";
import { getDateFormater } from "@/utils/getDateFormater";
import { getColorByDiscountValue } from "@/utils/getColorByDiscountValue";
import QRCode from "react-qr-code";
import cx from "classnames";

interface CouponProps {
  couponActivateCode: string;
  couponTitle: string;
  expirateTime: string;
  supplierLogo: string | StaticImageData;
  supplierName: string;
  couponDiscount: string;
  supplierCategory: string;
}

const CouponActivated: React.FC<CouponProps> = ({
  couponDiscount,
  expirateTime,
  supplierLogo,
  supplierName,
  couponTitle,
  supplierCategory,
  couponActivateCode,
}) => {
  return (
    <div className="pb-4 pt-2 px-2 w-full flex flex-col text-black">
      <div className="flex my-2 gap-2 justify-between items-center">
        <h1 className="text-2xl py-1 px-3 mb-2 font-bold overflow-hidden text-ellipsis text-black">
          {couponTitle}
        </h1>
        <div className="flex justify-end mb-1 mt-2 p-0.5 gap-4">
          <span
            className={cx(
              getColorByDiscountValue(couponDiscount),
              "relative text-xl w-32 text-white flex items-center justify-center px-6 py-3 rounded-full",
            )}
          >
            {couponDiscount}%
            <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-secondary-dark to-secondary-lighter"></span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-4 items-center">
        <QRCode
          style={{ height: "140px", width: "140px" }}
          value={couponActivateCode}
        ></QRCode>
        <p className="rounded-full text-white text-2xl font-semibold px-12 py-2 bg-generic-dark">
          {couponActivateCode}
        </p>
      </div>
      <div className="flex items-center justify-between mb-2 gap-3">
        <hr className="border-neutral-100 rounded-full border-[1px] w-full"></hr>
        <p
          className=" flex items-center justify-center w-full text-generic-alertGreen font-semibold text-xl min-w-[200px]
      "
        >
          Cupom ativo
        </p>
        <hr className="border-neutral-100 rounded-full border-[1px] w-full"></hr>
      </div>
      <div className="flex flex-col h-auto">
        <div className="flex items-center justify-center">
          <Image
            className="w-16 h-16 rounded-full"
            width={64}
            height={64}
            src={supplierLogo}
            alt="supplier-logo"
          />
          <div className="m-4 px-1">
            <p className=" font-semibold">estabelecimento</p>
            <p className=" text-lg">{supplierName}</p>
          </div>
        </div>
        <div className="flex justify-evenly items-center gap-2 m-2 mb-6">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">categoria</p>
            <p>{supplierCategory}</p>
          </div>
          <hr className="border-neutral-100 rounded-full border-[1px] w-10 rotate-90"></hr>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">validade</p>
            <p>{getDateFormater(expirateTime)}</p>
          </div>
        </div>
        <AccordionInfo
          data={[
            {
              name: "Regras de uso",
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,Lorem ipsum dolor dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit. Ipsa,Lorem  amet consectetur adipisicing elit. Ipsa,Lorem   amet consectetur adipisicing elit. Ipsa,Lorem  ",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CouponActivated;

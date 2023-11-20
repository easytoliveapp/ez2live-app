"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { AccordionInfo } from "@/components/atoms";
import { getDateFormater } from "@/utils/getDateFormater";
import QRCode from "react-qr-code";

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
    <div className="pb-4 p-2 w-full flex flex-col text-black">
      <h1 className=" text-3xl py-1 px-3 mb-2 font-bold text-black">
        {couponTitle}
      </h1>
      <div className="flex justify-end mb-8 gap-4">
        <span className="relative text-xl w-32 text-white bg-primary-main flex items-center justify-center px-6 py-3 rounded-full">
          {couponDiscount}%
          <span className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-secondary-dark to-secondary-lighter"></span>
        </span>
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
        <div className="flex item-center">
          <Image
            className="w-16 h-16 rounded-full"
            src={supplierLogo}
            alt="supplier-logo"
          />
          <div className="m-4 px-1">
            <p className=" font-semibold">estabelecimento</p>
            <p className=" text-lg">{supplierName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 m-3">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">categoria</p>
            <p>{supplierCategory}</p>
            <p className="font-semibold">validade</p>
            <p>{getDateFormater(expirateTime)}</p>
          </div>
        </div>
        <AccordionInfo
          data={[
            {
              name: "Regras de uso",
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CouponActivated;

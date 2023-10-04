"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";
import { ICouponsByUser } from "@/types/coupons";
import { showToastify } from "@/hooks/showToastify";
import { SupplierCoupons, FloatButtonNav } from "@/components/atoms/index";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import CouponBlack from "@/images/easytolive/icons/couponblack.svg";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import CurrencyDropdown from "@/components/atoms/CurrencyDropdown";
import Image, { StaticImageData } from "next/image";

interface filterOptions {
  id: string;
  name: string;
  icon: StaticImageData;
}

const filterOptions = [
  {
    id: "active",
    name: "cupons ativos",
    icon: CouponGreen,
  },
  {
    id: "used",
    name: "cupons utilizados",
    icon: CouponBlack,
  },
  {
    id: "expired",
    name: "cupons expirados",
    icon: CouponRed,
  },
];

const ArrayCoupons = [
  {
    id: 12312312312,
    status: "active",
    title: "Creatina 40%",
    discount: 40,
    maxTotal: 20,
    maxPerUser: 5,
    expirationGenerationDate: "2024-01-01",
    expirationUseDate: "2024-02-02",
  },
  {
    id: 12312312312,
    status: "active",
    title: "Whey 20%",
    discount: 20,
    maxTotal: 20,
    maxPerUser: 5,
    expirationGenerationDate: "2024-01-01",
    expirationUseDate: "2024-02-02",
  },
  {
    id: 2312312,
    status: "used",
    usageDate: "2023-10-02",
    title: "Creatina 40%",
    discount: 40,
    maxTotal: 20,
    maxPerUser: 5,
    expirationGenerationDate: "2024-01-01",
    expirationUseDate: "2024-02-02",
  },
  {
    id: 1231234124312,
    status: "used",
    usageDate: "2023-10-02",
    title: "Whey 20%",
    discount: 20,
    maxTotal: 20,
    maxPerUser: 5,
    expirationGenerationDate: "2024-01-01",
    expirationUseDate: "2024-02-02",
  },
  {
    id: 223124123412312,
    status: "expired",
    title: "Creatina 40%",
    discount: 40,
    maxTotal: 20,
    maxPerUser: 5,
    expirationGenerationDate: "2024-01-01",
    expirationUseDate: "2024-02-02",
  },
  {
    id: 123141123124312,
    status: "expired",
    title: "Whey 20%",
    discount: 20,
    maxTotal: 20,
    maxPerUser: 5,
    expirationGenerationDate: "2024-01-01",
    expirationUseDate: "2024-02-02",
  },
];

const MyCouponsPage = () => {
  const { data: session } = useSession();
  const [couponsFilter, setCouponsFilter] = useState<filterOptions>(
    filterOptions[0],
  );
  const [coupons, setCoupons] = useState<ICouponsByUser>();

  const handleGetCouponsByUser = async () => {
    //TODO - API request to Get user coupons
    const res: any = await ArrayCoupons;
    return res;
  };

  useEffect(() => {
    handleGetCouponsByUser()
      .then((res) => setCoupons(res))
      .catch((error) =>
        showToastify({ type: "error", label: `Ocorreu um erro: ${error}` }),
      );
  }, [couponsFilter]);

  return (
    <div className="relative md:w-[500px] h-full w-full mx-auto">
      <FloatButtonNav href="/" icon={CouponPrimary} backGround="secondary" />
      <div className="mt-8 mb-16 flex items-center justify-between">
        <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
          {session?.user.name}
        </h2>
        <div>
          <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-dark to-secondary-lighter">
            <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-dark to-secondary-lighter"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-full gap-4">
        <div
          className={`${
            couponsFilter?.id === "used"
              ? "text-black"
              : couponsFilter?.id === "expired"
              ? "text-generic-alertRed"
              : "text-generic-alertGreen"
          } text-lg font-semibold`}
        >
          {couponsFilter?.name}
        </div>
        <CurrencyDropdown>
          {filterOptions.map((option, key) => (
            <div
              onClick={() => setCouponsFilter(option)}
              key={key}
              className={`${
                option.id == "used"
                  ? "text-black"
                  : option.id == "active"
                  ? "text-generic-alertGreen"
                  : "text-generic-alertRed"
              } flex gap-2`}
            >
              <Image
                className="w-8 h-auto"
                alt="coupon-image"
                src={option.icon}
              />
              {option.name}
            </div>
          ))}
        </CurrencyDropdown>
      </div>
      <div className="mt-6 pb-16 m-4 flex flex-col gap-4">
        {coupons && Array.isArray(coupons) && coupons.length > 0 ? (
          coupons.map((coupon: ICouponsByUser, key) => (
            <SupplierCoupons
              title={coupon.title}
              usageDate={coupon.usageDate}
              status={coupon.status}
              icon={Arrow}
              discount={coupon.discount}
              expirateTime={coupon.expirationUseDate}
              unintsAmount={coupon.maxTotal}
              key={key}
            />
          ))
        ) : (
          <em className="text-sm">nenhum cupom encontrado...</em>
        )}
      </div>
      <span className="fixed ring-0 bottom-0 text-neutral-400 w-full md:max-w-[500px] flex justify-center items-center h-16 bg-generic-dark">
        Todos os direitos reservados
      </span>
    </div>
  );
};

export default MyCouponsPage;

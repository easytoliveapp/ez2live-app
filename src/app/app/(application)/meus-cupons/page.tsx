"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ICouponCodesByUser } from "@/types/coupons";
import { showToastify } from "@/hooks/showToastify";
import {
  FloatButtonNav,
  CurrencyDropdown,
  UserCoupons,
  EmptyCoupons,
} from "@/components";
import CouponGray from "@/images/easytolive/icons/coupongray.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import CouponBlack from "@/images/easytolive/icons/couponblack.svg";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import Shop from "@/images/easytolive/icons/shop.svg";
import Image, { StaticImageData } from "next/image";
import couponsService from "@/service/coupons.service";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";

interface IFilterOptions {
  id: string;
  name: string;
  emptyText: string;
  icon: StaticImageData;
  textColor: string;
  href?: string;
  label?: string;
}

const filterOptions = [
  {
    id: "ACTIVE",
    name: "Cupons ativos",
    emptyText: "Nenhum cupom ativo disponível",
    href: "/app",
    label: "Buscar descontos",
    icon: CouponGreen,
    textColor: "text-generic-alertGreen",
  },
  {
    id: "USED",
    name: "Cupons utilizados",
    emptyText: "nenhum cupom foi usado ainda",
    icon: CouponBlack,
    textColor: "text-black",
  },
  {
    id: "EXPIRED",
    name: "Cupons expirados",
    emptyText: "nenhum cupom xpirou",
    icon: CouponRed,
    textColor: "text-generic-alertRed",
  },
];

const MyCouponsPage = () => {
  const { data: session } = useSession();
  const [couponsFilter, setCouponsFilter] = useState<IFilterOptions>(
    filterOptions[0],
  );
  const [couponCodes, setCouponCodes] = useState(Array<ICouponCodesByUser>);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(true);
  const handleGetCouponCodesByUser = async () => {
    const res: any = await couponsService.getCouponCodesByUser();
    return res;
  };

  useEffect(() => {
    handleGetCouponCodesByUser()
      .then((res) => setCouponCodes(res.data.coupons))
      .catch((error) =>
        showToastify({ type: "error", label: `Ocorreu um erro: ${error}` }),
      )
      .finally(() => setIsLoadingCoupons(false));
  }, []);

  const isShowingCoupons =
    !isLoadingCoupons &&
    Array.isArray(couponCodes) &&
    couponCodes.length > 0 &&
    couponCodes.filter((t) => t.status === couponsFilter.id).length > 0;

  const isEmptyResult =
    !isLoadingCoupons &&
    Array.isArray(couponCodes) &&
    couponCodes.length >= 0 &&
    couponCodes.filter((t) => t.status === couponsFilter.id).length === 0;

  const renderCoupons = () =>
    couponCodes.map(
      (couponCode: ICouponCodesByUser, key) =>
        couponCode.status === couponsFilter.id &&
        couponCode.coupon.supplier?.name &&
        couponCode.coupon.supplier.supplierInfo?.supplierCategory?.title && (
          <UserCoupons icon={Arrow} couponCodeData={couponCode} key={key} />
        ),
    );

  return (
    <div className="relative md:w-[500px] h-full w-full mx-auto">
      <FloatButtonNav
        href="/app"
        icon={Shop}
        backgroundStyle="main"
        label="Parceiros"
      />
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
      <div className="flex justify-end items-center w-full gap-1">
        <div className={`${couponsFilter.textColor} text-md font-semibold`}>
          {couponsFilter?.name}
        </div>
        <CurrencyDropdown>
          {filterOptions.map((option, key) => (
            <div
              onClick={() => setCouponsFilter(option)}
              key={key}
              className={`${option.textColor} flex gap-2 cursor-pointer items-center hover:font-semibold text-sm transition-all`}
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
      <div className="mt-10 pb-16 m-4 flex flex-col gap-4 text-center">
        {isLoadingCoupons && <div>Carregando seus cupons...</div>}
        {isShowingCoupons && renderCoupons()}
        {isEmptyResult && (
          <EmptyCoupons
            icon={CouponGray}
            label={couponsFilter.label ?? " "}
            title={couponsFilter.emptyText}
            href={couponsFilter.href}
          />
        )}
      </div>
    </div>
  );
};

export default MyCouponsPage;

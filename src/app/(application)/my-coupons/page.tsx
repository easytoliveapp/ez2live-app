"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ICouponCodesByUser } from "@/types/coupons";
import { showToastify } from "@/hooks/showToastify";
import { FloatButtonNav } from "@/components/atoms/index";
import { UserCoupons } from "@/components/mols/index";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import CouponBlack from "@/images/easytolive/icons/couponblack.svg";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import Shop from "@/images/easytolive/icons/shop.svg";
import CurrencyDropdown from "@/components/atoms/CurrencyDropdown";
import Image, { StaticImageData } from "next/image";
import couponsService from "@/service/coupons.service";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";

interface IfilterOptions {
  id: string;
  name: string;
  icon: StaticImageData;
  textColor: string;
}

const filterOptions = [
  {
    id: "ACTIVE",
    name: "cupons ativos",
    icon: CouponGreen,
    textColor: "text-generic-alertGreen",
  },
  {
    id: "USED",
    name: "cupons utilizados",
    icon: CouponBlack,
    textColor: "text-black",
  },
  {
    id: "EXPIRED",
    name: "cupons expirados",
    icon: CouponRed,
    textColor: "text-generic-alertRed",
  },
];

const MyCouponsPage = () => {
  const { data: session } = useSession();
  const [couponsFilter, setCouponsFilter] = useState<IfilterOptions>(
    filterOptions[0],
  );
  const [couponCodes, setCouponCodes] = useState(Array<ICouponCodesByUser>);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

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
      .finally(() => setLoadingCoupons(false));
  }, []);

  return (
    <div className="relative md:w-[500px] h-full w-full mx-auto">
      <FloatButtonNav href="/" icon={Shop} backgroundStyle="main" />
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
        <div className={`${couponsFilter.textColor} text-lg font-semibold`}>
          {couponsFilter?.name}
        </div>
        <CurrencyDropdown>
          {filterOptions.map((option, key) => (
            <div
              onClick={() => setCouponsFilter(option)}
              key={key}
              className={`${option.textColor} flex gap-2 cursor-pointer items-center hover:font-regular`}
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
        {loadingCoupons && <div>Carregando seus cupons...</div>}
        {!loadingCoupons &&
          Array.isArray(couponCodes) &&
          couponCodes.length > 0 &&
          couponCodes.filter((t) => t.status === couponsFilter.id).length > 0 &&
          couponCodes.map(
            (couponCode: ICouponCodesByUser, key) =>
              couponCode.status === couponsFilter.id &&
              couponCode.coupon.supplier?.name &&
              couponCode.coupon.supplier.supplierInfo?.supplierCategory
                ?.title && (
                <UserCoupons
                  icon={Arrow}
                  couponCodeData={couponCode}
                  key={key}
                />
              ),
          )}
        {!loadingCoupons &&
          Array.isArray(couponCodes) &&
          couponCodes.length > 0 &&
          couponCodes.filter((t) => t.status === couponsFilter.id).length ===
            0 && <em> Nenhum cupom encontrado...</em>}
      </div>
      <span className="fixed ring-0 bottom-0 text-neutral-400 w-full md:max-w-[500px] flex justify-center items-center h-16 bg-generic-dark">
        Todos os direitos reservados
      </span>
    </div>
  );
};

export default MyCouponsPage;

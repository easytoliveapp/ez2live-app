"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import ShoppingCartGreen from "@/images/easytolive/icons/shopping_cart_green.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import classNames from "@/utils/classNames";
import { ModalEdit, Coupon, CouponActived } from "@/components/mols/index";
import { ButtonPrimary, ButtonThird } from "@/components/atoms/index";
import useDateDiffInDays from "@/hooks/useDateDifferenceInDays";
import CouponGenerating from "@/components/atoms/CouponLoading";
import couponsService from "@/service/coupons.service";
import { showToastify } from "@/hooks/showToastify";

interface SupplierCouponsProps {
  discount: string;
  unintsAmount: number;
  expirateTime: string;
  expirationUseDate: string;
  id: string;
  supplierLogo: string | StaticImageData;
  supplierCategory: string;
  supplierName: string;
  icon: string | StaticImageData;
}

const SupplierCoupons: React.FC<SupplierCouponsProps> = ({
  discount,
  unintsAmount,
  supplierLogo,
  expirateTime,
  expirationUseDate,
  supplierCategory,
  id,
  supplierName,
  icon,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponModal, setShowCouponModal] = useState(false);

  const COUPON_STEPS = {
    primary: (
      <div className="flex flex-col h-auto items-center">
        <Coupon
          id={id}
          couponDiscount={discount}
          expirateTime={expirateTime}
          unintsAmount={10}
          supplierCategory={supplierCategory}
          supplierLogo={supplierLogo}
          supplierName={supplierName}
        />
        <ButtonPrimary
          onClick={() => handleActiveCoupon()}
          className="w-full mx-4 max-w-md"
        >
          Eu quero!
        </ButtonPrimary>
        <ButtonThird
          className="w-full mx-4 max-w-md"
          onClick={() => setShowCouponModal(false)}
        >
          não quero mais
        </ButtonThird>
      </div>
    ),
    loading: (
      <CouponGenerating
        title="Gerando cupom de desconto"
        subTitle="esse processo pode levar alguns segundos!"
        backGround="primary"
        couponAnimation={true}
        couponColor="secondary"
      />
    ),
    loadComplete: (
      <CouponGenerating
        title="Cupom ativo"
        subTitle="aproveite esse desconto incrível!"
        backGround="secondary"
        couponAnimation={false}
        couponColor="primary"
      />
    ),
    couponActived: (
      <CouponActived
        couponDiscount={discount}
        expirateTime={expirationUseDate}
        couponActivateCode={couponCode}
        supplierCategory={supplierCategory}
        supplierLogo={supplierLogo}
        supplierName={supplierName}
      />
    ),
  };

  const ActiveCounpon = async () => {
    const res: any = await await couponsService.generateCouponCode(id);
    return res;
  };

  const [couponSteps, setCouponSteps] = useState(COUPON_STEPS.primary);
  const handleActiveCoupon = async () => {
    setCouponSteps(COUPON_STEPS.loading);
    ActiveCounpon()
      .then((res) => {
        setCouponCode(res?.data?.coupon?.code);
        setTimeout(() => {
          setCouponSteps(COUPON_STEPS.loadComplete);
          setTimeout(() => {
            if (couponCode) {
              setCouponSteps(COUPON_STEPS.couponActived);
            }
          }, 1500);
        }, 3000);
      })
      .catch((error) => {
        setCouponSteps(COUPON_STEPS.primary);
        if (error?.response?.data?.code === 400) {
          showToastify({
            label:
              "O Coupon que está tentando ativar não é mais válido, atualize a página.",
            type: "error",
          });
        }
        if (error?.response?.data?.code === 500) {
          showToastify({
            label: "Ocorreu um erro interno. Por favor, tente novamente.",
            type: "error",
          });
        }
        if (error?.response?.data?.code === 404) {
          showToastify({
            label: "Nenhum dado encontrado. Por favor, tente novamente.",
            type: "error",
          });
        }
      });
  };

  return (
    <div className="bg-primary-main h-auto pl-4 max-h-14 rounded-full flex items-center gap-3">
      <ModalEdit
        closeOnBlur={true}
        show={showCouponModal}
        onCloseModalEdit={() => setShowCouponModal(false)}
      >
        {couponSteps}
      </ModalEdit>

      <h2 className=" fon t-bold text-white text-xl">{discount}%</h2>
      <div
        className={classNames(
          "rounded-full bg-white w-full py-2 gap-4 -m-[1px] hover:shadow-md cursor-pointer",
        )}
        onClick={() => setShowCouponModal(true)}
      >
        <div className="Rounded-full flex items-center justify-evenly w-full">
          <Image
            className="h-10 w-auto"
            alt="Coupons Image"
            src={CouponPrimary}
          />

          <span className="bg-gray-300 w-0.5 h-12"></span>
          <div className="flex flex-col gap-1.5 text-xs">
            <p className="flex font-semibold items-center text-generic-alertGreen">
              <Image
                className="h-3.5 pr-2 w-auto"
                alt="coupon-black"
                src={ShoppingCartGreen}
                color="white"
              />
              faltam {unintsAmount} unidades
            </p>
            <p className="flex font-semibold items-center text-generic-alertRed">
              <Image
                className="h-3.5 pr-2 w-auto"
                alt="coupon-black"
                src={ClockCircleRed}
              />
              termina em {useDateDiffInDays(expirateTime)} dias
            </p>
          </div>
          <div onClick={() => setShowCouponModal(true)}>
            <Image className="h-6 w-auto" alt="arrow right" src={icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierCoupons;

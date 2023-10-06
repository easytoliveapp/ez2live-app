"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import ShoppingCartGreen from "@/images/easytolive/icons/shopping_cart_green.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import classNames from "@/utils/classNames";
import {
  ModalEdit,
  Coupon,
  CouponActivatedPage,
} from "@/components/mols/index";
import { ButtonPrimary, ButtonThird } from "@/components/atoms/index";
import CouponGenerating from "@/components/atoms/CouponLoading";
import couponsService from "@/service/coupons.service";
import { showToastify } from "@/hooks/showToastify";
import { AxiosResponse } from "axios";
import DateDifferenceInDays from "@/components/atoms/DateDifferenceInDays";

interface SupplierCouponsProps {
  couponTitle: string;
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

const STEPS = {
  SHOWING_COUPON: 0,
  LOADING_COUPON: 1,
  COUPON_ACTIVE: 2,
  SHOWING_COUPON_CODE: 3,
};

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
  couponTitle,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(STEPS.SHOWING_COUPON);

  const handleNextStep = (step: number) => setCurrentStep(step);

  useEffect(() => {
    if (couponCode) {
      handleNextStep(STEPS.COUPON_ACTIVE);
    }
  }, [couponCode]);

  useEffect(() => {
    if (showCouponModal) {
      handleNextStep(STEPS.SHOWING_COUPON);
    }
  }, [showCouponModal]);

  useEffect(() => {
    if (currentStep === STEPS.COUPON_ACTIVE) {
      setTimeout(() => {
        handleNextStep(STEPS.SHOWING_COUPON_CODE);
      }, 1500);
    }
  }, [currentStep]);

  const StepOne = () => {
    return (
      <div className="flex flex-col h-auto items-center">
        <Coupon
          id={id}
          couponTitle={couponTitle}
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
    );
  };

  const StepTwo = () => {
    return (
      <CouponGenerating
        title="Gerando cupom de desconto"
        subTitle="esse processo pode levar alguns segundos!"
        backGround="primary"
        couponAnimation={true}
        couponColor="secondary"
      />
    );
  };

  const StepThree = () => {
    return (
      <CouponGenerating
        title="Cupom ativo"
        subTitle="aproveite esse desconto incrível!"
        backGround="secondary"
        couponAnimation={false}
        couponColor="primary"
      />
    );
  };

  interface StepFour {
    couponCode: string;
  }

  const StepFour: React.FC<StepFour> = ({ couponCode }) => {
    return (
      <div className="flex flex-col h-auto items-center">
        <CouponActivatedPage
          couponTitle={couponTitle}
          couponDiscount={discount}
          expirateTime={expirationUseDate}
          couponActivateCode={couponCode}
          supplierCategory={supplierCategory}
          supplierLogo={supplierLogo}
          supplierName={supplierName}
        />
        <ButtonPrimary
          onClick={() => setShowCouponModal(false)}
          className="w-full mx-4 max-w-md"
        >
          Ok, entendi!
        </ButtonPrimary>
        <ButtonPrimary
          className="w-full mx-4 max-w-md !bg-white !text-primary-main !shadow-none"
          onClick={() => setShowCouponModal(false)}
        >
          voltar
        </ButtonPrimary>
      </div>
    );
  };

  const renderStep = (step: number) => {
    switch (step) {
      case STEPS.SHOWING_COUPON:
        return <StepOne />;
      case STEPS.LOADING_COUPON:
        return <StepTwo />;
      case STEPS.COUPON_ACTIVE:
        return <StepThree />;
      case STEPS.SHOWING_COUPON_CODE:
        return <StepFour couponCode={couponCode} />;
      default:
        return <StepOne />;
    }
  };

  const activateCoupon = async () => {
    const res: AxiosResponse = await couponsService.generateCouponCode(id);
    return res;
  };

  const handleActiveCoupon = async () => {
    handleNextStep(STEPS.LOADING_COUPON);

    activateCoupon()
      .then((res) => {
        if (res?.data?.coupon?.code) {
          return setTimeout(() => {
            setCouponCode(res?.data?.coupon?.code);
          }, 2500);
        }

        setCurrentStep(STEPS.SHOWING_COUPON);
        showToastify({
          label: "Ocorreu um erro interno. Por favor, tente novamente.",
          type: "error",
        });
      })
      .catch((error) => {
        setCurrentStep(STEPS.SHOWING_COUPON);
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
      {showCouponModal && (
        <ModalEdit
          show
          closeOnBlur={true}
          onCloseModalEdit={() => setShowCouponModal(false)}
        >
          {renderStep(currentStep)}
        </ModalEdit>
      )}

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
              termina em {DateDifferenceInDays(expirateTime)} dias
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

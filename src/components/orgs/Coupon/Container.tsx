"use client";

import React, { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import {
  Modal,
  Coupon,
  CouponActivated,
  CreateAndUpdateCoupon,
  ButtonPrimary,
  ButtonThird,
  CouponCard,
  CouponGenerating,
} from "@/components";
import couponsService from "@/service/coupons.service";
import { showToastify } from "@/hooks/showToastify";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ICoupon } from "@/types/coupons";

interface CouponContainerProps {
  supplierId: string;
  couponTitle: string;
  discount: string;
  maxUnitsTotal: number;
  expirateTime: string;
  expirationUseDate: string;
  couponId: string;
  supplierLogo: string | StaticImageData;
  supplierCategory: string;
  supplierName: string;
  icon: string | StaticImageData;
  isOwnSupplier: boolean;
  handleCouponUpdate: (
    updatedCouponId: ICoupon,
    action: "CREATE" | "UPDATE" | "DELETE",
  ) => void;
}

const STEPS = {
  SHOWING_COUPON: 0,
  LOADING_COUPON: 1,
  COUPON_ACTIVE: 2,
  SHOWING_COUPON_CODE: 3,
  REDIRECT_TO_LOGIN: 4,
};

const CouponContainer: React.FC<CouponContainerProps> = ({
  supplierId,
  isOwnSupplier = false,
  discount,
  maxUnitsTotal,
  supplierLogo,
  expirateTime,
  expirationUseDate,
  supplierCategory,
  couponId,
  supplierName,
  icon,
  couponTitle,
  handleCouponUpdate,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(STEPS.SHOWING_COUPON);
  const searchParams = useSearchParams();
  const couponIdParam = searchParams.get("coupon");
  const router = useRouter();
  const { data: session } = useSession();

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

  useEffect(() => {
    if (couponId === couponIdParam) {
      setShowCouponModal(true);
    }
  }, [couponId, couponIdParam]);

  const StepOne = () => {
    return (
      <div className="flex flex-col h-auto items-center">
        <Coupon
          id={couponId}
          couponTitle={couponTitle}
          couponDiscount={discount}
          expirateTime={expirateTime}
          unintsAmount={maxUnitsTotal}
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
          className="w-full !text-generic-dark mx-4 max-w-md"
          onClick={() => setShowCouponModal(false)}
        >
          não quero agora
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
      <div className="flex flex-col h-auto max-h-[90vh] overflow-y-auto items-center">
        <CouponActivated
          couponTitle={couponTitle}
          couponDiscount={discount}
          expirateTime={expirationUseDate}
          couponActivateCode={couponCode}
          supplierCategory={supplierCategory}
          supplierLogo={supplierLogo}
          supplierName={supplierName}
        />
        <ButtonPrimary
          onClick={() => router.push("/my-coupons")}
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
    const res: AxiosResponse =
      await couponsService.generateCouponCode(couponId);
    return res;
  };

  const handleActiveCoupon = async () => {
    if (session?.user) {
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
    } else {
      router.push(
        `/auth/pre-login?callbackUrl=${`/supplier-dashboard/${supplierId}/?coupon=${couponId}`}`,
      );
    }
  };

  return (
    <div>
      {showCouponModal && (
        <Modal
          show={showCouponModal}
          closeOnBlur={true}
          onCloseModal={() => setShowCouponModal(false)}
        >
          {isOwnSupplier ? (
            <CreateAndUpdateCoupon
              isUpdatingCoupon={true}
              couponId={couponId}
              handleCouponUpdate={handleCouponUpdate}
            />
          ) : (
            renderStep(currentStep)
          )}
        </Modal>
      )}

      <CouponCard
        couponTitle={couponTitle}
        discount={discount}
        maxUnitsTotal={maxUnitsTotal}
        expirationUseDate={expirateTime}
        setShowCouponModal={setShowCouponModal}
        icon={icon}
      />
    </div>
  );
};

export default CouponContainer;

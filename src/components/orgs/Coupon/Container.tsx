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
import { Route } from "next";
import { ISupplier } from "@/types/supplier";
import getSubscriptionPageURL from "@/utils/getSubscriptionPageUrl";
import userService from "@/service/users.service";
import { SUBSCRIPTION_STATUS } from "@/constants/payment";
import isPremiumUser from "@/utils/isPremiumUser";
import isTrialUser from "@/utils/isTrialUser";
import { setItemToLocalStorage } from "@/utils/localStorageHelper";
interface CouponContainerProps {
  couponRules: string;
  couponTitle: string;
  discount: string;
  remainingUnits?: number;
  expirateTime: string;
  expirationUseDate: string;
  couponId: string;
  supplier: ISupplier;
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
  isOwnSupplier = false,
  discount,
  remainingUnits,
  expirateTime,
  expirationUseDate,
  couponRules,
  couponId,
  supplier,
  icon,
  couponTitle,
  handleCouponUpdate,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(STEPS.SHOWING_COUPON);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const couponIdParam = searchParams.get("coupon");
  const router = useRouter();
  const { data: session, update } = useSession();

  const {
    id: supplierId,
    whatsappPhoneNumber: phoneNumber,
    name: supplierName,
    supplierInfo: {
      supplierCategory: { title: supplierCategory },
      supplierLogo,
    },
  } = supplier;

  const handleNextStep = (step: number) => setCurrentStep(step);

  const getUserInfo = async () => {
    if (session && session.user.id) {
      const res: any = await userService.getUser(session.user.id);
      return res;
    }
  };

  const updateSession = async (responseData: any) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        subscriptionStatus: responseData.subscriptionStatus,
        iuguCustomerId: responseData.iuguCustomerId,
        iuguPaymentMethodId: responseData.iuguPaymentMethodId,
        iuguSubscriptionId: responseData.iuguSubscriptionId,
      },
    });
    return session;
  };

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
      if (isPremiumUser(session) || isTrialUser(session)) {
        setShowCouponModal(true);
        setLoading(true);
        setTimeout(
          () =>
            handleActiveCoupon(
              SUBSCRIPTION_STATUS.PREMIUM,
              SUBSCRIPTION_STATUS.TRIAL,
            ),
          2000,
        );
      } else {
        setShowCouponModal(false);
      }
    }
  }, [couponId, couponIdParam, session?.user.subscriptionStatus]);

  const StepOne = () => {
    return (
      <div className="flex p-6 flex-col h-auto items-center">
        <Coupon
          couponRules={couponRules}
          isOwnSupplier={isOwnSupplier}
          id={couponId}
          couponTitle={couponTitle}
          couponDiscount={discount}
          expirateTime={expirateTime}
          remainingUnits={remainingUnits}
          supplierCategory={supplierCategory}
          supplierLogo={supplierLogo ?? ""}
          supplierName={supplierName}
        />
        <button
          onClick={() =>
            handleActiveCoupon(
              SUBSCRIPTION_STATUS.PREMIUM,
              SUBSCRIPTION_STATUS.TRIAL,
            )
          }
          className="w-full min-h-[2rem] bg-main-purple p-4 mt-2 rounded-2xl text-white font-bold text-lg"
        >
          {loading
            ? "Gerando cupom...".toUpperCase()
            : "Eu quero!".toUpperCase()}
        </button>

        <button
          onClick={() => setShowCouponModal(false)}
          className="w-full min-h-[2rem] bg-[#9C9C9F] mt-4 p-4 rounded-2xl text-white font-bold text-lg"
        >
          {"Não quero agora".toUpperCase()}
        </button>
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
          supplierPhoneNumber={phoneNumber}
          couponTitle={couponTitle}
          couponDiscount={discount}
          expirateTime={expirationUseDate}
          couponActivateCode={couponCode}
          supplierCategory={supplierCategory}
          supplierLogo={supplierLogo ?? ""}
          supplierName={supplierName}
        />
        <ButtonThird
          onClick={() => router.push("/app/meus-cupons" as Route)}
          className="w-full mx-4 max-w-md !text-black !py-0 !bg-none Third-main !shadow-none"
        >
          Ver meus cupons
        </ButtonThird>
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

  const handleActiveCoupon = async (
    premiumStatus: string,
    trialStatus: string,
  ) => {
    if (session?.user) {
      setLoading(true);
      await getUserInfo()
        .then((res) => {
          updateSession(res.data);

          if (
            res.data.subscriptionStatus === premiumStatus ||
            res.data.subscriptionStatus === trialStatus
          ) {
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
                    label:
                      "Ocorreu um erro interno. Por favor, tente novamente.",
                    type: "error",
                  });
                }
                if (error?.response?.data?.code === 404) {
                  showToastify({
                    label:
                      "Nenhum dado encontrado. Por favor, tente novamente.",
                    type: "error",
                  });
                }
              });
          } else {
            showToastify({
              type: "info",
              label:
                "Você precisa ser premium para utilizar este cupom. Iremos lhe direcionar para página de assinatura",
            });
            return setTimeout(
              () => router.push(getSubscriptionPageURL(supplierId, couponId)),
              3000,
            );
          }
        })
        .catch(() =>
          showToastify({
            type: "error",
            label: "Ocorreu um erro ao buscar dados da sessão.",
          }),
        )
        .finally(() => setLoading(false));
    } else {
      setItemToLocalStorage(
        "callbackCouponUrl",
        `/app/parceiro/${supplierId}/?coupon=${couponId}`,
      );
      router.push(
        `/app/conta/entrar?callbackUrl=${encodeURIComponent(
          `/app/parceiro/${supplierId}/?coupon=${couponId}`,
        )}` as Route,
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
              supplier={supplier}
              setCouponModal={setShowCouponModal}
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
        isOwnSupplier={isOwnSupplier}
        discount={discount}
        remainingUnits={remainingUnits}
        expirationUseDate={expirateTime}
        setShowCouponModal={setShowCouponModal}
        icon={icon}
      />
    </div>
  );
};

export default CouponContainer;

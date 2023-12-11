"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ButtonPrimary, ButtonThird } from "@/components";
import Modal from "../Modal";
import Image from "next/image";
import LogoImage from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";
import useService from "@/service/users.service";
import { showToastify } from "@/hooks/showToastify";
import { useSession } from "next-auth/react";
import usersService from "@/service/users.service";

interface IPremiumConversionModal {
  isPremiumExpired: boolean;
  setIsPremiumExpired: Dispatch<SetStateAction<boolean>>;
  isNewUser: boolean;
  userId: string;
}

const PremiumConversionModal: React.FC<IPremiumConversionModal> = ({
  isNewUser,
  isPremiumExpired,
  setIsPremiumExpired,
  userId,
}) => {
  const { data: session, update } = useSession();

  const getSubscriptionDays = async (userId: string) => {
    return await usersService.getSubscriptionDays(userId);
  };

  async function updateSession(newSubscriptionDate: string) {
    await update({
      ...session,
      user: {
        ...session?.user,
        subscriptionEndDate: newSubscriptionDate,
      },
    });
  }

  const updateUserSessionSubscriptionDate = async () => {
    getSubscriptionDays(userId)
      .then((res: any) => {
        updateSession(res.data.subscriptionDays);
      })
      .catch((err) => {
        showToastify({
          label: `Ocorreu um erro ao carregar vencimento do premium. Errp:${err}`,
          type: "error",
        });
      });
  };

  const addSubscriptionDays = async (days: number) => {
    await useService
      .addSubscriptionDays(userId, days)
      .then(() => {
        showToastify({
          label: `Parabens! Você agora tem acesso a Cupons Exclusivos por mais ${days} dias! ✅`,
          type: "success",
        });

        setIsPremiumExpired(false);
      })
      .then(() => updateUserSessionSubscriptionDate())
      .catch((err) =>
        showToastify({ label: `ocorreu um erro: ${err}`, type: "error" }),
      );
  };

  return (
    <Modal
      contentExtraClass="max-w-lg"
      closeOnBlur={false}
      hasCloseButton={false}
      show={isPremiumExpired}
      onCloseModal={() => null}
    >
      {isNewUser ? (
        <div className="flex flex-col gap-3 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              className="h-14 w-auto my-6"
              alt="easy-to-live-logo"
              src={LogoImage}
            />
            <h2 className="text-2xl font-semibold">
              {isNewUser
                ? "FINALMENTE VOCÊ CHEGOU! 🥳"
                : "BEM-VINDO DE VOLTA! 🥳"}
            </h2>
          </div>
          <div className="flex px-4 flex-col gap-3">
            <p className="text-center">
              Para deixar sua vida mais Easy, viemos entregar gratuitamente 28
              dias de Assinatura Premium para você aproveitar os melhores
              cupons! Resgate no botão abaixo!
            </p>
            <ButtonPrimary
              onClick={() => {
                addSubscriptionDays(28);
              }}
            >
              {"[RESGATAR MINHA ASSINATURA PREMIUM!]"}
            </ButtonPrimary>
            <ButtonThird onClick={() => addSubscriptionDays(14)}>
              Prefiro perder o presente!
            </ButtonThird>
          </div>
        </div>
      ) : (
        <div className="flex flex-col pb-8 min-h-[90vh]  justify-between gap-3 text-center">
          <Image
            className="h-14 w-auto my-4"
            alt="easy-to-live-logo"
            src={LogoImage}
          />
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold">
              Seu tempo de premium expirou {":("}
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            <p className="p-2 text-center">
              Deseja receber mais 30 dias de premium free?
            </p>
            <ButtonPrimary onClick={() => addSubscriptionDays(30)}>
              Claro !
            </ButtonPrimary>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default PremiumConversionModal;

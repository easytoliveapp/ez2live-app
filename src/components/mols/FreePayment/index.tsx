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

interface IFreePaymentComponent {
  showModal: boolean;
  setModalFreePayment: Dispatch<SetStateAction<boolean>>;
  newUser: boolean;
  userId: string;
}

const FreePaymentComponent: React.FC<IFreePaymentComponent> = ({
  showModal,
  setModalFreePayment,
  newUser,
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
      .then(() =>
        showToastify({
          label: `Parabens! você recebeu mais ${days} dias de premium`,
          type: "success",
        }),
      )
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
      show={showModal}
      onCloseModal={() => setModalFreePayment(false)}
    >
      {newUser ? (
        <div className="flex flex-col gap-3 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              className="h-14 w-auto my-6"
              alt="easy-to-live-logo"
              src={LogoImage}
            />
            <h2 className="text-2xl font-semibold">Bem-Vindo ao EasyToLive!</h2>
          </div>
          <div className="flex px-4 flex-col gap-3">
            <p className="text-center">
              Você tem 28 dias como usuário premium ⭐ para usar nosso app e
              encontrar as melhores ofertas para você. <br />
              Aproveite!
            </p>
            <ButtonPrimary
              onClick={() => {
                addSubscriptionDays(28);
              }}
            >
              Aceito! Começar a usar agora
            </ButtonPrimary>
            <ButtonThird onClick={() => addSubscriptionDays(14)}>
              Quero testar apenas por 14 dias
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
export default FreePaymentComponent;

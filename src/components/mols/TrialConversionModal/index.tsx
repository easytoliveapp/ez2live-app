"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ButtonPrimary } from "@/components";
import Image from "next/image";
import LogoImage from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import useService from "@/service/users.service";
import { showToastify } from "@/hooks/showToastify";
import { useSession } from "next-auth/react";
import usersService from "@/service/users.service";

interface ITrialConversionModal {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

const TrialConversionModal: React.FC<ITrialConversionModal> = ({
  setShowModal,
  userId,
}) => {
  const { data: session, update } = useSession();

  const getSubscriptionDays = async (userId: string) => {
    return await usersService.getSubscriptionDays(userId);
  };

  const updateSession = async (newSubscriptionDate: string) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        subscriptionTrialEndDate: newSubscriptionDate,
      },
    });
  };

  const updateUserSessionSubscriptionDate = async () => {
    getSubscriptionDays(userId)
      .then((res: any) => {
        session && updateSession(res.data.subscriptionDays);
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

        setShowModal(false);
      })
      .then(() => updateUserSessionSubscriptionDate())
      .catch((err) =>
        showToastify({ label: `ocorreu um erro: ${err}`, type: "error" }),
      );
  };

  return (
    <div className="flex flex-col gap-1 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full flex justify-end pr-6">
          <Image
            className="h-12 w-auto my-6"
            alt="easy-to-live-logo"
            src={LogoImage}
          />
        </div>
        <h2 className="text-2xl font-semibold">FINALMENTE VOCÊ CHEGOU! 🥳</h2>
      </div>
      <div className="flex px-4 flex-col gap-3">
        <p className="text-center">
          Para deixar sua vida mais Easy, viemos entregar gratuitamente 28 dias
          de Assinatura Premium para você aproveitar os melhores cupons! Resgate
          no botão abaixo!
        </p>
        <ButtonPrimary
          onClick={() => {
            addSubscriptionDays(30);
          }}
        >
          {"RESGATAR MINHA ASSINATURA PREMIUM!"}
        </ButtonPrimary>
      </div>
    </div>
  );
};
export default TrialConversionModal;

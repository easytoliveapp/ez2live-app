import React, { useState } from "react";
import isDateBeforeToday from "@/utils/isDateBeforeToday";
import Image from "next/image";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonThird,
  Modal,
  CreditCard,
} from "@/components";
import userService from "@/service/users.service";
import { showToastify } from "@/hooks/showToastify";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { getDateFormater } from "@/utils/getDateFormater";

interface SubscriptionProps {
  session: Session | null;
}

export const Subscription: React.FC<SubscriptionProps> = ({ session }) => {
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const userSubscription = isDateBeforeToday(
    session?.user.subscriptionTrialEndDate,
  );

  const { update } = useSession();

  const updateSession = async (newSubscriptionDate: string) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        subscriptionTrialEndDate: newSubscriptionDate,
      },
    });
  };

  const handleCancelSubscription = () => {
    setLoading(true);
    // TODO: CONECTAR ENDPOINT PARA CANCELAR
    setLoading(false);
  };
  //TODO:REMOVE THIS CODE BEFORE IT GOES LIVE--------------------------
  const handleCancelFreeTrial = async () => {
    session &&
      (await userService
        .removeSubscriptionDays(session?.user.id, 30)
        .then((res: any) => {
          updateSession(res.data.user.subscriptionTrialEndDate);
        })
        .catch(() => {
          showToastify({
            label: "Ocorreu um erro ao remover seu período grátis",
            type: "error",
          });
        }));
  };
  //----------------------------------------------------------------------
  return session?.user.iuguCustomerId !== null ? (
    <div className="px-4">
      <Modal
        closeOnBlur={true}
        hasCloseButton={true}
        show={isCancelSubscriptionModalOpen}
        onCloseModal={() => setIsCancelSubscriptionModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center space-y-3 text-center px-6 pt-6">
          <h2 className="text-xl font-extrabold m-1">
            Tem certeza que você quer <br /> deixar de economizar?
          </h2>
          <p className="text-sm font-medium">
            {"Se você cancelar a assinatura "}
            <strong>
              perderá <br /> o acesso aos melhores descontos
            </strong>
            que <br /> selecionamos para você!
          </p>
          <p className="text-sm font-medium">
            Você pode cancelar a qualquer <br /> momento e encerrar a
            recorrência do <br />
            ciclo em <strong>10/05/2025</strong>
          </p>
          <p className="text-sm font-medium">
            <strong>Até lá, você ainda pode aproveitar</strong>
            <br /> nossos melhores descontos.
          </p>
          <ButtonPrimary
            onClick={() => handleCancelSubscription}
            className="!bg-generic-alertRed !text-xs !py-2 !px-4 font-extrabold"
          >
            {loading ? "cancelando  (...)" : "Cancelar assinatura"}
          </ButtonPrimary>
          <ButtonThird
            className="!text-generic-limeGreen mt-2 !text-sm font-extrabold"
            onClick={() => setIsCancelSubscriptionModalOpen(false)}
          >
            Permanecer Assinante Easy
          </ButtonThird>
        </div>
      </Modal>
      <div className="text-sm grid items-center grid-cols-2 gap-4">
        <div>
          <p className="font-extrabold mb-1">Status Assiantura</p>
          {userSubscription ? (
            <span className="text-generic-limeGreen font-semibold">Ativa</span>
          ) : (
            <span className="font-semibold text-generic-dark">Inativa</span>
          )}
        </div>
        <div>
          <p className="font-extrabold mb-1">Última cobrança</p>
          <span className="font-semibold text-generic-dark">
            04/05/2024 as 10:23
          </span>
        </div>
        <div>
          <p className="font-extrabold mb-1">Plano</p>
          <span className="font-semibold text-generic-dark">
            EasyToLive Mensal
          </span>
        </div>
        <div>
          <p className="font-extrabold mb-1">ID da assinatura</p>
          <span className="font-semibold text-generic-dark">
            LASK001-02NDKKS-190SDKND-293KD
          </span>
        </div>
        <div>
          <p className="font-bold">ID da assinatura</p>
          <span>{session?.user.iuguSubscriptionId}</span>
        </div>
        <div>
          <p className="font-bold">Próxima cobrança</p>
          <span>{getDateFormater(session?.user.subscriptionTrialEndDate)}</span>
        </div>
        <ButtonThird
          className="!text-generic-alertRed !p-0 mt-8"
          onClick={() => setIsCancelSubscriptionModalOpen(true)}
        >
          Cancelar Assinatura
        </ButtonThird>
      </div>
      <CreditCard
        cardFlag="master-card"
        expirationDate="10/26"
        lastNumbers="4111"
        nameOnCard="Felipe M F Henrique"
      />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-center">
      <Image src={EasyLogo} width={40} height={40} alt="logo-image" />
      <h2 className="text-lg font-semibold mb-2 mt-4">
        Você está a um passo de <br /> economizar ainda mais!
      </h2>
      <p className="text-sm font-medium">
        Seja um assinante Easy To Live e tenha acesso <br />
        aos melhores descontos em nosso app
      </p>
      <ButtonPrimary
        href="/app/pagamento"
        className="!bg-generic-limeGreen mt-8 !px-4 !py-2 !text-xs !font-extraboldbold"
      >
        Quero os melhores descontos
      </ButtonPrimary>
      {session?.user.subscriptionTrialEndDate !== null &&
        session?.user.iuguCustomerId === null && (
          <div className="mt-10">
            <ButtonSecondary onClick={() => handleCancelFreeTrial()}>
              Cancelar período grátis
            </ButtonSecondary>
          </div>
        )}
    </div>
  );
};

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
    <div className="px-4 max-w-lg mx-auto">
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
      <div className="text-sm grid items-center grid-cols-2 gap-3 md:gap-2 md:flex md:flex-col md:justify-center md:text-center">
        <div>
          <p className="font-extrabold mb-1 md:mb-0">Status Assiantura</p>
          {userSubscription ? (
            <span className="text-generic-limeGreen font-bold">Ativa</span>
          ) : (
            <span className="font-semibold text-generic-dark">Inativa</span>
          )}
        </div>
        <div>
          <p className="font-extrabold mb-1 md:mb-0">Última cobrança</p>
          <span className="font-semibold text-generic-dark">
            04/05/2024 as 10:23
          </span>
        </div>
        <div>
          <p className="font-extrabold mb-1 md:mb-0">Plano</p>
          <span className="font-semibold text-generic-dark">
            EasyToLive Mensal
          </span>
        </div>
        <div>
          <p className="font-extrabold mb-1 md:mb-0">ID da assinatura</p>
          <span className="break-words font-semibold text-generic-dark">
            {session?.user.iuguSubscriptionId}
          </span>
        </div>
        <div>
          <p className="font-bold mb-1 md:mb-0">Próxima cobrança</p>
          <span className="font-semibold text-generic-dark">{getDateFormater(session?.user.subscriptionTrialEndDate)}</span>
        </div>
        <ButtonThird
          className="!text-generic-alertRed !font-bold md:!font-semibold !text-sm !py-1 md:!px-3 mt-2 md:!bg-generic-alertRed md:!text-white"
          onClick={() => setIsCancelSubscriptionModalOpen(true)}
        >
          Cancelar Assinatura
        </ButtonThird>
      </div>
      <div className="w-full mx-auto flex flex-col md:max-w-80 max-w-lg px-4 md:px-3 justify-center text-center items-center space-y-2 mt-12">
        <p className="font-bold">Meio de pagamento salvo</p>
        <p className="text-generic-grayLighter text-xs">
          Nós não salvamos dados sensíveis do cartão de crédito, apenas o dado
          criptografado necessário para realizar o pagamento.
        </p>
        <div className="py-2 w-full flex justify-center">
          <CreditCard
            cardFlag="master-card"
            expirationDate="10/26"
            lastNumbers="4111"
            nameOnCard="Felipe M F Henrique"
          />
        </div>
        <ButtonThird className="!text-generic-alertRed !p-0">
          Excluir cartão principal
        </ButtonThird>
        <p className="text-generic-grayLighter text-xs italic">
          Ao remover o cartão principal de pagamento, suas próximas faturas
          terão que ser pagas manualmente.
        </p>
      </div>
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

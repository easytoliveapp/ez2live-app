import React, { useState } from "react";
import Image from "next/image";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonThird,
  LoadingComponent,
  Modal,
} from "@/components";
import userService from "@/service/users.service";
import { showToastify } from "@/hooks/showToastify";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { getDateFormater } from "@/utils/getDateFormater";
import { IGetSubscriptionResponse } from "@/types/subscription/response/index";
import subscriptionService from "@/service/subscription.service";
import { SUBSCRIPTION_STATUS } from "@/constants/payment";

interface SubscriptionProps {
  session: Session | null;
  subscriptionInfo?: IGetSubscriptionResponse;
}

export const SubscriptionTab: React.FC<SubscriptionProps> = ({
  session,
  subscriptionInfo,
}) => {
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSubscriptionSuspensed, setHasSubscriptionSuspensed] =
    useState(false);
  const { update } = useSession();

  const updateSession = async (newSubscriptionTrialEndDate: string) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        subscriptionTrialEndDate: newSubscriptionTrialEndDate,
        subscriptionStatus: SUBSCRIPTION_STATUS.TRIAL_ENDED,
      },
    });
  };

  const suspendSubscription = async () => {
    const res = await subscriptionService.suspendSubscription();
    return res;
  };

  const handleCancelSubscription = () => {
    setLoading(true);
    suspendSubscription()
      .then(() => {
        showToastify({
          label: `O ciclo da sua fatura será encerrado no dia ${subscriptionInfo?.expiresAt}. Até lá você pode aproveitar nossos descontos!`,
          type: "success",
        });
      })
      .then(() => setHasSubscriptionSuspensed(true))
      .then(() => setIsCancelSubscriptionModalOpen(false));
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
        .then(() => {
          showToastify({ label: "Trial removido", type: "success" });
        })
        .catch(() => {
          showToastify({
            label: "Ocorreu um erro ao remover seu período grátis",
            type: "error",
          });
        }));
  };
  //----------------------------------------------------------------------
  const hasSubscriptionId = session?.user.iuguSubscriptionId;
  const hasIuguId = !!session?.user?.iuguCustomerId;

  return hasIuguId && hasSubscriptionId ? (
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
            ciclo em{" "}
            <strong>{getDateFormater(subscriptionInfo?.expiresAt)}</strong>
          </p>
          <p className="text-sm font-medium">
            <strong>Até lá, você ainda pode aproveitar</strong>
            <br /> nossos melhores descontos.
          </p>
          <ButtonPrimary
            onClick={() => handleCancelSubscription()}
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
      {subscriptionInfo ? (
        <div className=" grid grid-cols-2 items-center space-y-3">
          <div>
            <p className="font-bold">Status Assiantura</p>
            <span>
              {subscriptionInfo?.active ? (
                <p className="text-generic-alertGreen font-semibold">Ativa</p>
              ) : (
                <p className="font-semibold"> Inativa</p>
              )}
            </span>
          </div>
          <div>
            <p className="font-bold">Última cobrança</p>
            <span>{getDateFormater(subscriptionInfo?.cycledAt)}</span>
          </div>
          <div>
            <p className="font-bold">Plano</p>
            <span>{subscriptionInfo?.planName}</span>
          </div>
          <div>
            <p className="font-bold">ID da assinatura</p>
            <span>{subscriptionInfo?.id}</span>
          </div>
          <div>
            <p className="font-bold">Vencimento da mensalidade</p>
            <span>{getDateFormater(subscriptionInfo?.expiresAt)}</span>
          </div>
          {subscriptionInfo?.suspended || hasSubscriptionSuspensed ? (
            <p className="font-bold">Sua assinatura foi suspensa </p>
          ) : (
            <ButtonThird
              className="!text-generic-alertRed !p-0 mt-8"
              onClick={() => setIsCancelSubscriptionModalOpen(true)}
            >
              Cancelar Assinatura
            </ButtonThird>
          )}
        </div>
      ) : (
        <LoadingComponent size="large" fullSize={false} />
      )}
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

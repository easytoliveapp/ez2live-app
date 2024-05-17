import React, { useState } from "react";
import isDateBeforeToday from "@/utils/isDateBeforeToday";
import Image from "next/image";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonThird,
  Modal,
} from "@/components";
import userService from "@/service/users.service";
import { showToastify } from "@/hooks/showToastify";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { getDateFormater } from "@/utils/getDateFormater";

interface SignatureProps {
  session: Session | null;
}

export const Signature: React.FC<SignatureProps> = ({ session }) => {
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const userSubscription = isDateBeforeToday(session?.user.subscriptionEndDate);

  const { update } = useSession();

  const updateSession = async (newSubscriptionDate: string) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        subscriptionEndDate: newSubscriptionDate,
      },
    });
  };

  const handleCancelSubscription = () => {
    setLoading(true);
    // TODO: CONECTAR ENDPOINT PARA CANCELAR
    setLoading(false);
  };

  const handleCancelFreeTrial = async () => {
    session &&
      (await userService
        .removeSubscriptionDays(session?.user.id, 30)
        .then((res: any) => {
          console.log(res);
          updateSession(res.data.user.subscriptionEndDate);
        })
        .catch(() => {
          showToastify({
            label: "Ocorreu um erro ao remover seu período grátis",
            type: "error",
          });
        }));
  };

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
      <div className=" grid grid-cols-2 items-center space-y-3">
        <div>
          <p className="font-bold">Status Assiantura</p>
          <span>
            {userSubscription ? (
              <p className="text-generic-alertGreen font-semibold">Ativa</p>
            ) : (
              <p className="font-semibold"> Inativa</p>
            )}
          </span>
        </div>
        <div>
          <p className="font-bold">Última cobrança</p>
          <span>04/05/2024 as 10:23</span>
        </div>
        <div>
          <p className="font-bold">Plano</p>
          <span>EasyToLive Mensal</span>
        </div>
        <div>
          <p className="font-bold">ID da assinatura</p>
          <span>{session?.user.iuguSubscriptionId}</span>
        </div>
        <div>
          <p className="font-bold">Próxima cobrança</p>
          <span>{getDateFormater(session?.user.subscriptionEndDate)}</span>
        </div>
        <ButtonThird
          className="!text-generic-alertRed !p-0 mt-8"
          onClick={() => setIsCancelSubscriptionModalOpen(true)}
        >
          Cancelar Assinatura
        </ButtonThird>
      </div>

      {session?.user.subscriptionEndDate !== null &&
        session?.user.iuguCustomerId === null && (
          <div className="mt-10">
            <ButtonSecondary onClick={() => handleCancelFreeTrial()}>
              Cancelar período grátis
            </ButtonSecondary>
          </div>
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
    </div>
  );
};

import React, { useEffect, useState } from "react";
import CheckIcon from "@/images/easytolive/icons/checkIcon.svg";
import { getDateFormater } from "@/utils/getDateFormater";
import { ButtonPrimary, ButtonThird, SimpleModal } from "@/components";
import Image from "next/image";
import { useSession } from "next-auth/react";
import subscriptionService from "@/service/subscription.service";

export const AcceptedPaymentStep = () => {
  const { data: session } = useSession();
  const [expiredSubscriptionData, setExpiredSubscriptionData] = useState();

  const getSubscriptionEndDate = async () => {
    const subscriptionResponse: any =
      await subscriptionService.getSubscriptionInfo();
    return setExpiredSubscriptionData(subscriptionResponse.expires_at);
  };

  useEffect(() => {
    if (session?.user) getSubscriptionEndDate();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <SimpleModal className="px-4">
        <Image alt="accept-icon" src={CheckIcon} width={70} height={70} />
        <p className="text-xl font-extrabold">Pagamento Aprovado</p>
        <p className="text-center text-sm p-x3">
          Agora você pode aproveitar os melhores <br />
          <strong>descontos</strong> e tornar sua rotina saudável mais{" "}
          <strong className="text-primary-main">Easy!</strong>
        </p>
      </SimpleModal>
      <SimpleModal className="space-y-4 py-1 text-center">
        <div>
          <p>Nome</p>
          <p>
            <strong>{session?.user.name}</strong>
          </p>
        </div>
        <div>
          <p>E-mail</p>
          <p>
            <strong>{session?.user.email}</strong>
          </p>
        </div>
        <div>
          <p>Status Assinatura</p>
          <p>
            <strong className="text-generic-alertGreen">Ativa</strong>
          </p>
        </div>
        <div>
          <p>Próxima cobrança</p>
          <p>
            <strong>{getDateFormater(expiredSubscriptionData)}</strong>
          </p>
        </div>
      </SimpleModal>
      <div className="flex flex-col w-full max-w-xs md:max-w-sm">
        <ButtonPrimary href="/app/meus-cupons">
          Quero meu desconto
        </ButtonPrimary>
        <ButtonThird
          className="!text-generic-dark w-full"
          href="/app/minha-conta"
        >
          Visitar perfil
        </ButtonThird>
      </div>
    </div>
  );
};

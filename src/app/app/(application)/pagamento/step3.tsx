import React from "react";
import CheckIcon from "@/images/easytolive/icons/checkIcon.svg";
import { getDateFormater } from "@/utils/getDateFormater";
import { ButtonPrimary, ButtonThird, SimpleModal } from "@/components";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const StepThree = () => {
  const { data: session } = useSession();
  return (
    <div className="max-w-sm w-full">
      <SimpleModal className="px-4">
        <Image alt="accept-icon" src={CheckIcon} width={84} height={84} />
        <p className="text-lg font-bold">Pagamento Aprovado</p>
        <p className="text-center text-sm p-x3">
          Sua assinatura está confirmada! <br />
          Você agora é um <strong>assinante EasyToLive</strong> e já possui
          acesso aos melhores descontos
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
            <strong>
              {getDateFormater(session?.user.subscriptionEndDate)}
            </strong>
          </p>
        </div>
      </SimpleModal>
      <div className="flex flex-col">
        <ButtonPrimary href="/app/meus-cupons">
          Quero meu desconto
        </ButtonPrimary>
        <ButtonThird className="!text-generic-dark" href="/app/minha-conta">
          Visitar perfil
        </ButtonThird>
      </div>
    </div>
  );
};

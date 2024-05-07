import React, { useState } from "react";
import isDateValid from "@/utils/isDateValid";
import Image from "next/image";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import { Session } from "next-auth";
import { ButtonPrimary, ButtonThird, Modal } from "@/components";

interface SignatureProps {
  session: Session | null;
}

export const Signature: React.FC<SignatureProps> = ({ session }) => {
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const hasSignature = isDateValid(session?.user.subscriptionEndDate);

  const handleCancelSubscription = () => {
    setLoading(true);
    // END-POINT CANCEL SUBSCRIPTION
    setLoading(false);
  };

  return hasSignature ? (
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
  ) : (
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
            {hasSignature ? (
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
          <span>LASK001-02NDKKS-190SDKND-293KD</span>
        </div>
        <div>
          <p className="font-bold">Próxima cobrança</p>
          <span>04/06/2024</span>
        </div>
      </div>
      <ButtonThird
        className="!text-generic-alertRed !p-0 mt-8"
        onClick={() => setIsCancelSubscriptionModalOpen(true)}
      >
        Cancelar Assinatura
      </ButtonThird>
    </div>
  );
};

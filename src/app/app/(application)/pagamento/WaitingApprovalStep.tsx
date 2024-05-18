import React, { useEffect } from "react";
import { ButtonFourth, LoadingPayment, SimpleModal } from "@/components";
import Image from "next/image";
import QrCodeSimpleIcon from "@/images/easytolive/payment/qr-code-simple-icon.svg";
import PixSimpleIcon from "@/images/easytolive/payment/pix-simple-icon.svg";
import PixImage from "@/images/easytolive/payment/pix-image.svg";
import { PAYMENT } from "@/constants/paymentMethods";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import subscriptionService from "@/service/subscription.service";
import { showToastify } from "@/hooks/showToastify";
import { IPixResponseData } from "@/types/payment";
import { useSession } from "next-auth/react";

interface IWaitingApprovalStepProps {
  PaymentTab: string;
  pixData: IPixResponseData;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const WaitingApprovalStep: React.FC<IWaitingApprovalStepProps> = ({
  PaymentTab,
  pixData,
  setCurrentStep,
}) => {
  const { data: session, update } = useSession();

  const updateSession = async (responseData: any) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        iuguSubscriptionId: responseData.subscriptionId,
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getInvoiceStatus();
    }, 5000);

    const timeout = setTimeout(
      () => {
        setCurrentStep(3);
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const getInvoiceStatus = async () => {
    await subscriptionService
      .getInvoiceById(pixData.invoiceId)
      .then((res: any) => {
        if (res.data.status === "paid") {
          updateSession(res.data);
          setCurrentStep(2);
        }
      })
      .catch(() => {
        showToastify({
          label: "Ocorreu um erro ao atualizar dados do pagamento",
          type: "error",
        });
      });
  };

  return (
    <div>
      <LoadingPayment paymentMethod={PaymentTab} />
      {PaymentTab === PAYMENT.pix && (
        <div>
          <SimpleModal className="pb-6">
            <div className="w-full flex justify-center my-1">
              <Image alt="Pix Image" src={PixImage} width={82} height={33} />
            </div>
            <p className="font-bold text-xs text-generic-dark">QR Code</p>
            <Image
              src={pixData.qrCodeValue.image}
              alt="pix-image"
              className="w-32 h-32"
              height={128}
              width={128}
            />

            <div>
              <p className="font-bold text-center pb-1 text-generic-dark mt-5 text-xs">
                Copia e Cola
              </p>
              <p className="text-xs max-w-[280px] mb-2 break-words md:max-w-[340px]">
                {pixData.qrCodeValue.text}
              </p>
            </div>

            <ButtonFourth
              onClick={() => copyTextToClipboard(pixData.qrCodeValue.text)}
              className="!border-generic-limeGreen !border-[1px] !py-1 !text-xs  !text-generic-limeGreen"
            >
              Copiar Código PIX
            </ButtonFourth>
          </SimpleModal>
          <SimpleModal className="flex text-xs flex-col px-5 justify-start items-baseline">
            <p className="text-sm font-bold">
              Você tem duas formas de fazer a transferência:
            </p>
            <Image
              alt="qr-code-simple-icon"
              src={QrCodeSimpleIcon}
              width={13}
              height={21}
            />
            <h4 className="font-bold">PIX QR code</h4>
            <ol className="list-decimal px-3">
              <li>
                Abra o site ou aplicativo do seu banco e selecione a opção PIX
              </li>
              <li>Escolha pagar com QR code</li>
              <li>Aponte sua câmera para o QR code exibido na tela</li>
              <li>Tudo certo! Confira os dados e finalize o pagamento</li>
            </ol>
            <Image
              alt="qr-code-simple-icon"
              src={PixSimpleIcon}
              width={13}
              height={21}
            />
            <h4 className="font-bold">Instruções de pagamento PIX</h4>
            <ol className="list-decimal px-3">
              <li>Clique no botão “copiar código”</li>
              <li>
                Abra o site ou aplicativo do seu banco e selecione a opção PIX
              </li>
              <li>Selecione a opção “Copia e cola” e insira o código</li>
              <li>Tudo certo! Confira os dados e finalize o pagamento</li>
            </ol>
          </SimpleModal>
        </div>
      )}
    </div>
  );
};

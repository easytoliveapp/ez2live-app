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
import { IPaymentResponseData } from "@/types/payment";
import { useSession } from "next-auth/react";
import { INVOICE_STATUS, SUBSCRIPTION_STATUS } from "@/constants/payment";

interface IWaitingApprovalStepProps {
  paymentTab: string;
  paymentResponseData: IPaymentResponseData;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const WaitingApprovalStep: React.FC<IWaitingApprovalStepProps> = ({
  paymentTab,
  paymentResponseData,
  setCurrentStep,
}) => {
  const { data: session, update } = useSession();

  const handleClickCopyText = (textToCopy: string) => {
    try {
      copyTextToClipboard(textToCopy);
      showToastify({
        label: "Texto copiado com sucesso para area de transferencia",
        type: "success",
      });
    } catch (error) {
      showToastify({
        label: "Falha ao copiar texto para aréa de transferência.",
        type: "error",
      });
    }
  };
  useEffect(() => {
    console.log(paymentResponseData.invoiceId);
  }, []);

  const updateSession = async (responseData: any) => {
    return await update({
      ...session,
      user: {
        ...session?.user,
        subscriptionStatus: SUBSCRIPTION_STATUS.PREMIUM,
        iuguSubscriptionId: responseData.subscriptionId,
      },
    });
  };

  useEffect(() => {
    const interval =
      paymentResponseData.invoiceId &&
      setInterval(() => {
        getInvoiceStatus();
      }, 30 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [paymentResponseData.invoiceId]);

  const getInvoiceStatus = async () => {
    await subscriptionService
      .getInvoiceById(paymentResponseData.invoiceId)
      .then((res: any) => {
        if (res.data.status === INVOICE_STATUS.PAID) {
          updateSession(res.data);
          setCurrentStep(2);
        }
        if (res.data.status === INVOICE_STATUS.EXPIRED) {
          setCurrentStep(3);
        }
        if (res.data.status === INVOICE_STATUS.CANCELLED) {
          setCurrentStep(3);
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
      <LoadingPayment paymentMethod={paymentTab} />
      {paymentTab === PAYMENT.pix && paymentResponseData.qrCodeValue && (
        <div>
          <SimpleModal className="pb-6">
            <div className="w-full flex justify-center my-1">
              <Image alt="Pix Image" src={PixImage} width={82} height={33} />
            </div>
            <p className="font-bold text-xs text-generic-dark">QR Code</p>
            <Image
              src={paymentResponseData.qrCodeValue.image}
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
                {paymentResponseData.qrCodeValue.text}
              </p>
            </div>

            <ButtonFourth
              onClick={() => {
                if (paymentResponseData?.qrCodeValue?.text) {
                  handleClickCopyText(paymentResponseData.qrCodeValue.text);
                }
              }}
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

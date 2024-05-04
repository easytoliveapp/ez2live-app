import React from "react";
import { ButtonFourth, LoadingPayment, SimpleModal } from "@/components";
import Image from "next/image";
import QrCodeSimpleIcon from "@/images/easytolive/payment/qr-code-simple-icon.svg";
import PixSimpleIcon from "@/images/easytolive/payment/pix-simple-icon.svg";
import QRCode from "react-qr-code";
import PixImage from "@/images/easytolive/payment/pix-image.svg";
import { PAYMENT } from "@/constants/paymentMethods";

interface IStepTwoProps {
  PaymentTab: "creditCard" | "pix";
}

export const StepTwo: React.FC<IStepTwoProps> = ({ PaymentTab }) => {
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
            <QRCode
              value="123123123123123"
              className="w-32 h-32"
              height={128}
              width={128}
            />
            <div>
              <p className="font-bold text-center pb-1 text-generic-dark mt-5 text-xs">
                Copia e Cola
              </p>
              <p className="text-xs overflow-hidden mb-2 max-w-xs">
                00020101021226990014br.gov.bcb.pix2577pix.bpp.com.br/14796606/qrdaksldkalsdkamdl,KDl123
                KmIYgzfr3AZ38E8vQbnYv6xqDPenH0KehYAyWeXfjF5204000053039865802BR591{" "}
              </p>
            </div>

            <ButtonFourth className="!border-generic-limeGreen !border-[1px] !py-1 !text-xs  !text-generic-limeGreen">
              Copiar Código PIX
            </ButtonFourth>
          </SimpleModal>
          <SimpleModal className="flex text-xs flex-col justify-start items-baseline">
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
              <li>Aperte o botão “copiar código”</li>
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

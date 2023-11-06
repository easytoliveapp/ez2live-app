import React, { Dispatch, SetStateAction } from "react";
import { ButtonPrimary, ButtonThird } from "@/components/atoms";
import Modal from "../Modal";
import Image from "next/image";
import LogoImage from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";

interface IFreePaymentComponent {
  showModal: boolean;
  setModalFreePayment: Dispatch<SetStateAction<boolean>>;
  newUser: boolean;
}

const FreePaymentComponent: React.FC<IFreePaymentComponent> = ({
  showModal,
  setModalFreePayment,
  newUser,
}) => {
  return (
    <Modal
      contentExtraClass="max-h-[95vh] max-w-xl"
      closeOnBlur={false}
      hasCloseButton={false}
      show={showModal}
      onCloseModal={() => setModalFreePayment(false)}
    >
      {newUser ? (
        <div className="flex flex-col min-h-[90vh]  justify-between gap-3 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              className="h-14 w-auto my-6"
              alt="easy-to-live-logo"
              src={LogoImage}
            />
            <h2 className="text-2xl font-semibold">Parabéns !</h2>
            <h3 className="text-lg font-semibold">
              Você recebeu 14 dias como usuário premium ⭐
            </h3>
          </div>
          <div className="flex  flex-col gap-3">
            <p className="p-2 text-center">
              Deseja receber mais 14 dias de premium free?
            </p>
            <ButtonPrimary>Aceito!</ButtonPrimary>
            <ButtonThird onClick={() => setModalFreePayment(false)}>
              cancelar
            </ButtonThird>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-[90vh]  justify-between gap-3 text-center">
          <Image
            className="h-14 w-auto my-4"
            alt="easy-to-live-logo"
            src={LogoImage}
          />
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold">
              Seu tempo de premium expirou {":("}
            </h3>
          </div>
          <div className="flex  flex-col gap-3">
            <p className="p-2 text-center">
              Deseja receber mais 30 dias de premium free?
            </p>
            <ButtonPrimary>Claro !</ButtonPrimary>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default FreePaymentComponent;

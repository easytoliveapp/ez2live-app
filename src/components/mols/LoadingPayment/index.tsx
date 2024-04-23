import { LoadingComponent, SimpleModal } from "@/components/atoms";
import React from "react";

interface LoadingPaymentModalComponentProps {
  paymentMethod: string;
}

const LoadingPaymentModal: React.FC<LoadingPaymentModalComponentProps> = ({
  paymentMethod = "cartao",
}) => {
  return (
    <SimpleModal className="text-center">
      <LoadingComponent fullSize={false} size="medium" bgStyle="none" />
      <p className="text-lg text-center font-bold">Aguardando Pagamento</p>
      <p className="text-center">
        Sua assinatura será confirmada após a identificação{" "}
        {paymentMethod === "cartao"
          ? "do pagamento pelo nosso sistema."
          : "da transferência pelo nosso sistema."}
      </p>
      {paymentMethod === "cartao" && (
        <div>
          <p className="text-sm my-4">
            Seu pagamento está sendo processado. Isso pode levar alguns minutos.
            Não atualize nem feche esta página até que o processo seja
            concluído.
          </p>
          <p className="text-sm">Agradecemos sua paciência!</p>
        </div>
      )}
    </SimpleModal>
  );
};

export default LoadingPaymentModal;

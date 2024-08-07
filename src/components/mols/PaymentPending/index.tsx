import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InvoiceWarningIcon from "@/images/easytolive/icons/invoice-warning.svg";

const PaymentPending = () => {
  const route = useRouter();

  return (
    <div
      className="flex justify-center items-center"
      onClick={() => route.push("/app/aguardando-pagamento")}
    >
      <Image
        src={InvoiceWarningIcon}
        alt="payment-warning-icon"
        data-tip="Você tem pagamentos pendentes"
      />
    </div>
  );
};

export default PaymentPending;

"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { ButtonPrimary } from "@/components";
import { getDateFormater } from "@/utils/getDateFormater";
import { getColorByDiscountValue } from "@/utils/getColorByDiscountValue";
import whatsapp from "@/images/socials/whatsapp.svg";
import QRCode from "react-qr-code";
import { useSession } from "next-auth/react";
import cx from "classnames";
import { showToastify } from "@/hooks/showToastify";

interface CouponProps {
  couponActivateCode: string;
  couponTitle: string;
  expirateTime: string;
  supplierLogo: string | StaticImageData;
  supplierPhoneNumber: string;
  supplierName: string;
  couponDiscount: string;
  supplierCategory: string;
}

const CouponActivated: React.FC<CouponProps> = ({
  couponDiscount,
  expirateTime,
  supplierLogo,
  supplierName,
  couponTitle,
  supplierCategory,
  couponActivateCode,
  supplierPhoneNumber,
}) => {
  const { data: session } = useSession();
  const user = session?.user;

  function goToWhatsApp() {
    if (!supplierPhoneNumber) {
      return showToastify({
        label:
          "Telefone do fornecedor não disponível no cadastro. Tente o contato por e-mail/telefone",
        type: "error",
      });
    }

    const userMessage = `Olá *${supplierName}*, meu nome é *${user?.name}* e gostaria de resgatar uma reserva que fiz na *EasyToLive*.\n\n`;
    const couponDetails = `Detalhes:\n- Título do cupom: *${couponTitle}*\n- Desconto: *${couponDiscount}%*\n- Código do cupom: *${couponActivateCode}*`;

    const whatsappMessage = `${userMessage}${couponDetails}`;
    const phoneNumber = `+55${supplierPhoneNumber.replace(/\D/g, "")}`;
    const whatsappUrl = `http://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    return window.open(whatsappUrl, "_blank")?.focus();
  }

  return (
    <div className="pb-4 pt-2 px-2 w-full flex flex-col text-black">
      <div className="flex my-2 gap-2 justify-between items-center">
        <h1 className="text-2xl py-1 px-3 mb-2 font-bold overflow-hidden text-ellipsis text-black">
          {couponTitle}
        </h1>
        <div className="flex justify-end mb-1 mt-2 p-0.5 gap-4">
          <span
            className={cx(
              getColorByDiscountValue(couponDiscount),
              "relative text-xl w-32 text-white flex items-center justify-center px-6 py-3 rounded-full",
            )}
          >
            {couponDiscount}%
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-4 items-center">
        <QRCode
          style={{ height: "140px", width: "140px" }}
          value={couponActivateCode}
        ></QRCode>
        <p className="rounded-full text-white text-2xl font-semibold px-12 py-2 bg-generic-dark">
          {couponActivateCode}
        </p>
      </div>
      <div className="flex items-center justify-between mb-2 gap-3">
        <hr className="border-neutral-100 rounded-full border-[1px] w-full"></hr>
        <p
          className=" flex items-center justify-center w-full text-generic-alertGreen font-semibold text-xl min-w-[200px]
      "
        >
          Cupom ativo
        </p>
        <hr className="border-neutral-100 rounded-full border-[1px] w-full"></hr>
      </div>
      <div className="flex flex-col h-auto">
        <div className="flex items-center justify-center">
          <Image
            className="w-16 h-16 rounded-full"
            width={64}
            height={64}
            src={supplierLogo}
            alt="supplier-logo"
          />
          <div className="m-4 px-1">
            <p className=" font-semibold">Estabelecimento</p>
            <p className=" text-lg">{supplierName}</p>
          </div>
        </div>
        <div className="flex justify-evenly items-center gap-2 m-2 mb-6">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Categoria</p>
            <p>{supplierCategory}</p>
          </div>
          <hr className="border-neutral-100 rounded-full border-[1px] w-10 rotate-90"></hr>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Validade</p>
            <p>{getDateFormater(expirateTime)}</p>
          </div>
        </div>
        {supplierPhoneNumber && (
          <ButtonPrimary
            className="mt-4 relative"
            onClick={() => goToWhatsApp()}
          >
            {`Entre em contato com a loja`}
            <Image
              src={whatsapp}
              className="w-4 h-auto absolute right-5"
              alt="wpp-image"
            />
          </ButtonPrimary>
        )}
      </div>
    </div>
  );
};

export default CouponActivated;

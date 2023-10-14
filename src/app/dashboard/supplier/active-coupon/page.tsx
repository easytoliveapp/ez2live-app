"use client";

import { QRCodeReader } from "@/components";
import { useRouter } from "next/navigation";
import { Result } from "@zxing/library";

import React from "react";
import ActiveCouponCode from "@/components/mols/ActiveCouponCode";

const ActiveCouponPage = () => {
  const [showCodeValidationModal, setShowCodeValidationModal] =
    React.useState<boolean>(false);

  const [couponCode, setCouponCode] = React.useState<string>("");

  const router = useRouter();

  const handleWithCodeValidation = () =>
    setShowCodeValidationModal(!showCodeValidationModal);

  return (
    <>
      <div className="md:w-screen-xl md:max-w-screen-xl sm:mx-auto">
        {!showCodeValidationModal && (
          <QRCodeReader
            onResultCallback={async (result: Result) => {
              if (result.getText()) {
                console.log(result.getText());
                setCouponCode(result?.getText());
                setShowCodeValidationModal(true);
              }
            }}
            onClose={() => {
              router.push("/dashboard");
            }}
            textOverlay="Aproxime a câmera para ler o QR Code de validação"
            aditionalElements={
              <div className="w-full flex flex-col gap-5 max-w-[350px]">
                <button
                  onClick={handleWithCodeValidation}
                  className="bg-white text-black p-2 w-full rounded-full"
                >
                  Validar com o código
                </button>
              </div>
            }
          />
        )}
      </div>
      {showCodeValidationModal && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center md:w-[500px] w-full p-2">
            <ActiveCouponCode code={couponCode} />
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveCouponPage;

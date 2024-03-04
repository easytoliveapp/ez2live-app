"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Checked from "@/images/easytolive/icons/checked-success.svg";
import { ButtonPrimary } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getItemByLocalStorage } from "@/utils/localStorageHelper";
import authService from "@/service/auth.service";
import { showToastify } from "@/hooks/showToastify";

const SupplierRegistered = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [textEmaiVerification, setTextEmaiVerification] = useState(
    "Não recebeu nenhum email?",
  );
  async function sendVerificationEmail() {
    const localStorageUser = getItemByLocalStorage("LastUserCreated");
    const currentDate = new Date();
    const emailSentDate = localStorage.getItem("VERIFICATION_EMAIL_SENT");
    if (emailSentDate !== null) {
      const storedDate = new Date(emailSentDate);
      currentDate.setMinutes(currentDate.getMinutes() - 1);
      if (storedDate >= currentDate) {
        setTextEmaiVerification(
          "Por favor, aguarde 1 minuto antes de enviar outro e-mail de verificação.",
        );
      } else {
        await authService
          .resendEmailVerification(localStorageUser)
          .then(() => {
            setTextEmaiVerification(
              "Foi enviado uma mensagem de verificação para o seu email.",
            );
            const dateString = currentDate.toString();
            localStorage.setIem("VERIFICATION_EMAIL_SENT", dateString);
          })
          .catch(() =>
            showToastify({
              label: "Ocorreu um erro ao reenviar email de verificação",
              type: "error",
            }),
          );
      }
    } else {
      await authService
        .resendEmailVerification(localStorageUser)
        .then(() => {
          setTextEmaiVerification(
            "Foi enviado uma mensagem de verificação para o seu email.",
          );
          const dateString = currentDate.toString();
          localStorage.setIem("VERIFICATION_EMAIL_SENT", dateString);
        })
        .catch(() =>
          showToastify({
            label: "Ocorreu um erro ao reenviar email de verificação",
            type: "error",
          }),
        );
    }
  }

  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user.supplierInfo?.isVerified === true) {
      router.push("/app/dashboard");
    }
  }, []);
  // by url query param
  const isSupplier = params.get("isSupplier") === "1";
  const message = isSupplier
    ? "Sua conta foi criada para análise do nosso time. Quando for aprovada você receberá um e-mail com as instruções para acessar sua conta."
    : "Cadastro criado com sucesso! Verifique seu e-mail para acessar sua conta.";
  return (
    <div className="flex flex-col items-center justify-between pt-24 gap-8">
      <span></span>
      <Image alt="Ez-2-live-logo" src={Checked} className="w-auto h-14" />
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <h2 className="pt-2 text-lg font-semibold">Bem-vindo a EasyToLive</h2>
        <p className="p-4 max-w-xl text-center">{message}</p>
      </div>

      <p className="m-0">{textEmaiVerification}</p>
      <ButtonPrimary onClick={() => sendVerificationEmail()}>
        Enviar email de confirmação
      </ButtonPrimary>
      <ButtonPrimary
        onClick={() => {
          router.push("/");
        }}
      >
        Visite nosso site
      </ButtonPrimary>
    </div>
  );
};

export default SupplierRegistered;
